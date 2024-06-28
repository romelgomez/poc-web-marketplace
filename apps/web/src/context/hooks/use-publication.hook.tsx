import { useMutation } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { CREATE_PUBLICATION } from '../../modules/publications/graphql/create-publication.mutation';
import { UPDATE_PUBLICATION } from '../../modules/publications/graphql/update-publication.mutation';
import Publication from '../../modules/publications/publication.entity';
import {
  type IPublication,
  PublicationVisibility,
} from '../../modules/publications/publication.types';
import { ActionEnum } from '../types';
import { useAppContext } from './use-app-context';
import { useMedia } from './use-media.hook';

export const usePublication = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const isEditMode = router.pathname === '/edit-publication';

  const [publication, setPublication] = useState<Partial<Publication>>();

  const { mediaList, onRemoveMedia, onChangesMedia, beforeUploadMedia } =
    useMedia();

  const [createPublication] = useMutation(CREATE_PUBLICATION);
  const [updatePublication] = useMutation(UPDATE_PUBLICATION);

  useEffect(() => {
    if (
      publication &&
      !isEqual(publication.media, mediaList) &&
      mediaList.length > 0
    ) {
      const updatedPublication = new Publication({
        ...publication,
        media: mediaList,
      });

      setPublication(updatedPublication);
    }
  }, [mediaList, publication]);

  useEffect(() => {
    if (!state.publication) {
      return;
    }

    let publicationMedia: Publication['media'] = [];

    publicationMedia = state.publication?.media?.map((media) => {
      return {
        uid: media.id || media.uid,
        size: media.size,
        version: media.version,
        name: media.name || '',
        // TODO: load from server
        type: 'image/jpeg',
      };
    });

    const publciationData = {
      ...state.publication,
      visibility: PublicationVisibility.DRAFT,
      media: publicationMedia,
    };

    setPublication(publciationData);
  }, [state.publication]);

  const clearPublication = useCallback(() => {
    dispatch({ type: ActionEnum.SetPublication, data: undefined });

    setPublication(undefined);
  }, [dispatch]);

  const modifyPublication = useCallback(
    (data: Partial<IPublication>) => {
      const updatedPublication = new Publication({
        ...publication,
        ...data,
      });

      setPublication(updatedPublication);
      return updatedPublication;
    },
    [publication],
  );

  const savePublication = useCallback(
    async (data: Publication) => {
      const publication = new Publication({
        ...data,
        visibility: PublicationVisibility.PUBLIC,
      });

      const { created, modified, ...filteredPublication } = publication.dto();

      if (isEditMode) {
        await updatePublication({
          variables: {
            data: filteredPublication,
          },
        });
      } else {
        await createPublication({
          variables: {
            data: filteredPublication,
          },
        });
      }
    },
    [isEditMode, createPublication, updatePublication], // Specify dependencies here
  );

  return {
    publication,
    modifyPublication,
    savePublication,
    clearPublication,
    onRemoveMedia,
    onChangesMedia,
    beforeUploadMedia,
  };
};
