import { Carousel, Drawer } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useAppContext } from '../../../../context/hooks/use-app-context';
import type { Media } from '../../../media/media.types';
import { clearPublication } from '../../publication.actions';
import styles from './styles.module.scss';

const defaultImage = {
  name: 'No image',
  version: 'v1660971681',
  uid: 'no_image_iuh2cp',
  webp: 'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1660971681/no_image_iuh2cp.webp',
  jpg: 'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1660971681/no_image_iuh2cp.jpg',
};

const imageDimensions = {
  small: { height: 159, width: 262 },
  medium: { height: 430, width: 790 },
};

interface FileList {
  webp: string;
  jpg: string;
  uid: string;
  name: string;
}

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

export const ViewPublication: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const carouselRef = useRef<CarouselRef | null>(null);

  const mediaList = state.publication?.media || [];

  const handleOnCancel = useCallback(
    () => clearPublication(dispatch),
    [dispatch],
  );

  const handlePrev = useCallback(() => carouselRef.current?.prev(), []);

  const handleNext = useCallback(() => carouselRef.current?.next(), []);

  return (
    <Drawer
      title=''
      width={820}
      closable={false}
      onClose={handleOnCancel}
      open
      style={{ paddingBottom: 80, backgroundColor: 'whitesmoke' }}
    >
      <div className={styles.carouselContainer}>
        <Carousel ref={carouselRef}>
          {mediaList.map((file) => getMedia(file, 'medium', {}))}
        </Carousel>
      </div>

      {mediaList.length > 1 && (
        <div className={styles.carouselControllersContainer}>
          <button
            className={styles.nextPrevButtons}
            onClick={handlePrev}
            type={'button'}
          >
            {'<<'}
          </button>
          <button
            className={styles.nextPrevButtons}
            onClick={handleNext}
            type={'button'}
          >
            {'>>'}
          </button>
        </div>
      )}

      <div className={styles.titleContainer}>
        <span style={{ fontSize: 24 }}>{state.publication?.title}</span>
      </div>

      <div className={styles.descriptionContainer}>
        {state.publication?.description}
      </div>
    </Drawer>
  );
};
