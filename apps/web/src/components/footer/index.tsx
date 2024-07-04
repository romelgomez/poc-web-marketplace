import { Layout } from 'antd';
import React, { useState } from 'react';
import styles from './footer.module.scss';

export const Footer = () => {
  const [year, _] = useState(new Date().getFullYear());

  return (
    <Layout.Footer className={styles.footerContainer}>
      <span style={{ color: 'white' }}>©{year} - MercadoChevere</span>
      <span style={{ fontStyle: 'italic', color: 'aquamarine' }}>.com</span> 
      <span style={{ color: 'white' }} > - RUC: 20612290602</span>
    </Layout.Footer>
  );
};
