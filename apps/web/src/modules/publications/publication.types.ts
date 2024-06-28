import type { Time } from '../../shared.types';
import type { Media, MediaDto } from '../media/media.types';

export enum PublicationVisibility {
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface IFacet {
  name: string;

  path?: string[];
}

export interface IPublication {
  id?: string;
  listingId?: string;
  title?: string;
  description?: string;
  created?: Time;
  modified?: Time;
  deleted?: Time;
  media?: Media[];
  visibility?: PublicationVisibility | string;
}

export interface IPublicationDto {
  id?: string;
  listingId?: string;
  title?: string;
  description?: string;
  created?: Time;
  modified?: Time;
  deleted?: Time;
  media?: MediaDto[];
  visibility?: PublicationVisibility | string;
}
