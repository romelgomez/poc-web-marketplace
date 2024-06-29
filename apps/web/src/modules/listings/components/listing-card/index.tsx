import { Card, Col } from 'antd';
import type React from 'react';
const { Meta } = Card;
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../../context/hooks/use-app-context';
import { editListing } from '../../listings.actions';
import type { IListing } from '../../listings.types';
import styles from './listing-card.module.scss';

interface PublicationCardProps {
  listing: IListing;
}

export const ListingCard: React.FunctionComponent<PublicationCardProps> = ({
  listing,
}) => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const imageWebp =
    'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1700837535/0091ce31-670d-47b1-87ae-564c1a75b814.webp';
  const imageJpg =
    'https://res.cloudinary.com/berlin/image/upload/b_auto,c_lpad,h_159,w_262/v1700837535/0091ce31-670d-47b1-87ae-564c1a75b814.jpg';

  const viewListing = (id: string) => {
    router.push(`/listing?i=${id}`);
  };

  const edit = () => {
    editListing(dispatch, listing);
    router.push('/edit-listing');
  };

  const view = () => {
    if (!listing.id) {
      return;
    }

    viewListing(listing.id);
  };

  return (
    <Col lg={6} md={12} key={`col-${listing.id}`}>
      <Card
        bordered={true}
        hoverable={true}
        className={styles.card}
        key={listing.id}
        cover={
          <div className={styles.cardCoverContainer}>
            <picture>
              <source srcSet={imageWebp} type='image/webp' />
              <img
                src={imageJpg}
                alt='publication'
                className={styles.cardImage}
              />
            </picture>
          </div>
        }
        onClick={() => {}}
        actions={[
          <EditOutlined key='edit' onClick={edit} />,
          <EyeOutlined key='view' onClick={view} />,
        ]}
      >
        <Meta title={listing.name || 'Mis Publicaciones'} />
      </Card>
    </Col>
  );
};
