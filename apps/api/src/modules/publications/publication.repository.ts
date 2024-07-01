import { Injectable, NotFoundException } from '@nestjs/common';
// import type { Prisma } from '@prisma/client';
import { validate as validateUUID } from 'uuid';
import type { Media } from '../media/media.entity';
import type { MediaInput } from '../media/media.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { MeiliSearchService } from '../meilisearch/meilisearch.service';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { Publication } from './publication.entity';
import type { PublicationInput } from './publication.input';

// type MediaConnectOrCreateInput = {
//   media: {
//     connectOrCreate?: {
//       where: Prisma.MediaWhereUniqueInput;
//       create: Prisma.MediaCreateInput;
//     };
//   };
// };

// type MediaDataArray = MediaConnectOrCreateInput[];

@Injectable()
export class PublicationRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meiliSearchService: MeiliSearchService,
  ) {}

  async create(createPublicationDto: PublicationInput) {
    const { media, ...rest } = createPublicationDto;

    const publication = await this.prisma.$transaction(async (prisma) => {
      // let mediaData: MediaDataArray = [];
      let mediaData = [];

      if (media && media.length > 0) {
        const existingMediaIds = media.map((m) => m.id);

        const existingMedia = await prisma.media.findMany({
          where: {
            id: { in: existingMediaIds },
          },
        });

        const existingMediaMap = new Map(existingMedia.map((m) => [m.id, m]));

        mediaData = media.map((m) => {
          const connectOrCreate = existingMediaMap.has(m.id)
            ? undefined
            : {
                where: { id: m.id },
                create: { ...m },
              };

          return {
            media: {
              ...(connectOrCreate && { connectOrCreate }),
            },
          };
        });
      }

      const exists = await prisma.publication.findUnique({
        where: {
          id: rest.id,
        },
        include: {
          listing: true,
          publicationMedia: {
            include: {
              media: true,
            },
          },
        },
      });

      if (exists) {
        return exists;
      }

      return await prisma.publication.create({
        data: {
          ...rest,
          publicationMedia: {
            create: mediaData,
          },
        },
        include: {
          listing: true,
          publicationMedia: {
            include: {
              media: true,
            },
          },
        },
      });
    });

    if (publication) {
      await this.syncMeiliSearch(publication);
    }

    return publication;
  }

  async findOne(id: string): Promise<Publication | null> {
    const publication = await this.prisma.publication.findUnique({
      where: { id },
      include: {
        listing: true,
        publicationMedia: {
          include: {
            media: true,
          },
        },
      },
    });

    return publication;
  }

  async count(listingId: string): Promise<number> {
    if (!validateUUID(listingId)) {
      throw new Error(`Invalid listingId: ${listingId}`);
    }

    return this.prisma.publication.count({
      where: {
        listingId: listingId,
        deleted: null,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }

  async update(data: PublicationInput) {
    const { id, media, ...rest } = data;

    const publication = await this.prisma.$transaction(async (prisma) => {
      await prisma.publication.update({
        where: { id },
        data: { ...rest },
      });

      if (media) {
        const currentMediaLinks = await prisma.publicationMedia.findMany({
          where: { publicationId: id },
          include: { media: true },
        });

        const currentMedia = currentMediaLinks.map((cml) => cml.media);

        const { mediaToAdd, mediaToRemove } = this.determineMediaChanges(
          media,
          currentMedia,
        );

        // Add new media links
        await Promise.all(
          mediaToAdd.map(async (mediaItem) => {
            let mediaRecord = await prisma.media.findUnique({
              where: { id: mediaItem.id },
            });
            if (!mediaRecord) {
              mediaRecord = await prisma.media.create({ data: mediaItem });
            }

            await prisma.publicationMedia.create({
              data: {
                publicationId: id,
                mediaId: mediaRecord.id,
              },
            });
          }),
        );

        await prisma.publicationMedia.deleteMany({
          where: {
            AND: [
              { publicationId: id },
              { mediaId: { in: mediaToRemove.map((m) => m.id) } },
            ],
          },
        });
      }

      const publication = await prisma.publication.findUnique({
        where: { id },
        include: {
          listing: true,
          publicationMedia: {
            include: {
              media: true,
            },
          },
        },
      });

      return publication;
    });

    if (publication) {
      await this.syncMeiliSearch(publication);
    }

    return publication;
  }

  async deleteMedia(mediaId: string): Promise<Publication | null> {
    return await this.prisma.$transaction(async (prisma) => {
      // Find the publication with the given mediaId
      const publications = await prisma.publication.findMany({
        where: {
          publicationMedia: {
            some: {
              mediaId: mediaId,
            },
          },
        },
        include: {
          publicationMedia: {
            include: {
              media: true,
            },
          },
        },
      });

      const publication = publications[0]; // Assuming mediaId is unique to a publication

      if (!publication) {
        throw new NotFoundException('Publication not found');
      }

      const publicationMedia = publication.publicationMedia.find(
        (pm) => pm.media.id === mediaId,
      );

      if (!publicationMedia) {
        throw new NotFoundException('Publication media not found');
      }

      // Soft delete operation (assuming you have a deletedAt field)
      await prisma.publicationMedia.update({
        where: { id: publicationMedia.id },
        data: { deleted: new Date() }, // Soft delete
      });

      // Refetch the publication to update the state

      const updatedPublication = await prisma.publication.findUnique({
        where: { id: publication.id },
        include: {
          listing: true,
          publicationMedia: {
            include: {
              media: true,
            },
          },
        },
      });

      if (!updatedPublication) {
        throw new NotFoundException(
          'Publication not found after media deletion',
        );
      }

      await this.syncMeiliSearch(updatedPublication);

      return updatedPublication;
    });
  }

  determineMediaChanges(newMedia: MediaInput[], currentMediaLinks: Media[]) {
    const mediaToAdd = newMedia.filter(
      (nm) => !currentMediaLinks.some((cml) => cml.id === nm.id),
    );
    const mediaToRemove = currentMediaLinks.filter(
      (cml) => !newMedia.some((nm) => nm.id === cml.id),
    );

    return { mediaToAdd, mediaToRemove };
  }

  async syncMeiliSearch(publication: Publication) {
    const media = publication.publicationMedia?.map((pm) => pm.media) || [];

    const { publicationMedia, ...publicationData } = publication;

    const record = {
      ...publicationData,
      media,
    };

    const listingId = record?.listing?.id;

    if (!listingId) {
      console.warn('Listing db record not found');

      return;
    }

    try {
      await this.meiliSearchService.findIndex(listingId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn(`${error.message}`);
      } else {
        console.error(error);
      }

      await this.meiliSearchService.initializeIndex(listingId);

      console.log(`Listing index ${listingId} created.`);
    }

    await this.meiliSearchService.addDocuments(listingId, [record], {
      primaryKey: 'id',
    });

    console.log(`record ${record.id} synced with meilisearch`);
  }
}
