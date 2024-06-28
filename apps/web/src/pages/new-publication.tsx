import { Layout } from 'antd';
import type React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { PublicationForm } from '../modules/publications/components/publication-form';
import styles from '../modules/publications/publications.module.scss';

const { Content } = Layout;

const NewPublication: React.FunctionComponent = () => {
  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <Header />
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <div className={styles.publicationContainer}>
          <PublicationForm />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default NewPublication;
