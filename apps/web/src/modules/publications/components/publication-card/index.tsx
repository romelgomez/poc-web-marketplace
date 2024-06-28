import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col } from 'antd';
import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../../context/hooks/use-app-context';
import type { Account } from '../../../accounts/accounts.entity';
import type { Media } from '../../../media/media.types';
import { editPublication, viewPublication } from '../../publication.actions';
import type { IPublication } from '../../publication.types';
import styles from './styles.module.scss';

const imageDimensions = {
  small: { height: 159, width: 262 },
  medium: { height: 430, width: 790 },
};

const defaultImage = {
  name: 'No image',
  version: 'v1660971681',
  uid: 'no_image_iuh2cp',
  webp: 'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1660971681/no_image_iuh2cp.webp',
  jpg: 'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1660971681/no_image_iuh2cp.jpg',
};

interface FileList {
  webp: string;
  jpg: string;
  uid: string;
  name: string;
}

interface PublicationCardProps {
  publication: IPublication;
  account?: Account | null;
}

const { Meta } = Card;

export const PublicationCard: React.FunctionComponent<PublicationCardProps> = ({
  publication,
  account,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const { dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (account?.listings) {
      setIsEditable(
        account.listings.some(
          (listing) => listing.id === publication.listingId,
        ),
      );
    }
  }, [account, publication]);

  const view = () => {
    viewPublication(dispatch, publication);
  };

  const edit = () => {
    if (isEditable) {
      editPublication(dispatch, publication);
      router.push('/edit-publication');
    }
  };

  const getMedia = (
    media: Media,
    size: 'small' | 'medium',
    dimensions: { width?: number; height?: number } = {},
  ) => {
    const {
      height = imageDimensions[size].height,
      width = imageDimensions[size].width,
    } = dimensions;
    const version = media.version || defaultImage.version;
    const uid = media.id || defaultImage.uid;
    const [imageError, setImageError] = useState(false);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!imageError) {
        setImageError(true);
      }
    };

    const mediaFile: FileList = {
      uid,
      name: media.name || defaultImage.name,
      webp: `https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_${height},w_${width}/v${version}/${uid}.webp`,
      jpg: `https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_${height},w_${width}/v${version}/${uid}.jpg`,
    };

    return (
      <div key={mediaFile.uid} className={styles.carouselItem}>
        {!imageError && (
          <picture>
            <source srcSet={mediaFile.webp} type='image/webp' />
            <img
              src={mediaFile.jpg}
              alt='publication'
              className={styles.publicationCardImage}
              onError={handleError}
            />
          </picture>
        )}

        {imageError && (
          <picture>
            <source
              srcSet={`https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_${height},w_${width}/v1660971681/no_image_iuh2cp.webp`}
              type='image/webp'
            />
            <img
              src={`https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_${height},w_${width}/v1660971681/no_image_iuh2cp.jpg`}
              alt='publication'
              className={styles.publicationCardImage}
            />
          </picture>
        )}
      </div>
    );
  };

  const media = publication?.media ? publication?.media[0] : false;

  return (
    <Col lg={6} md={12}>
      <div>
        <Card
          onClick={() => {
            if (!isEditable) {
              view();
            }
          }}
          bordered={true}
          hoverable={true}
          className={styles.publicationCard}
          cover={
            <div className={styles.coverContainer}>
              {media && getMedia(media, 'small')}
            </div>
          }
          actions={
            isEditable
              ? [
                  <EditOutlined key='edit' onClick={edit} />,
                  <EyeOutlined key='view' onClick={view} />,
                ]
              : []
          }
        >
          <Meta title={publication.title} />
        </Card>
      </div>
    </Col>
  );
};
