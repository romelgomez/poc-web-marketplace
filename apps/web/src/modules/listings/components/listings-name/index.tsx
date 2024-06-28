import React from 'react';
import { useListing } from '../../../../context/hooks/use-listing.hook';
import styles from './styles.module.scss';

export default function ListingName() {
  const { listing } = useListing();

  return (
    <div className={styles.listingContainer}>
      <h2 className={styles.listingTitle}>
        Listado: <b>{listing?.name}</b>
      </h2>
    </div>
  );
}
