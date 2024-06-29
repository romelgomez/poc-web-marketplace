import { Layout } from 'antd';
import type React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ListinForm } from '../modules/listings/components/listing-form';
import styles from '../modules/publications/publications.module.scss';

const { Content } = Layout;

const EditListing: React.FunctionComponent = () => {
  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <Header />
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <div className={styles.publicationContainer}>
          <ListinForm />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default EditListing;
