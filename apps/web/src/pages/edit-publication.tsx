import { Layout } from 'antd';
import type React from 'react';
import { SimpleHeader } from '../components/header/simple';
import { usePublication } from '../context/hooks/use-publication.hook';
import { PublicationForm } from '../modules/publications/components/publication-form';
import styles from '../modules/publications/publications.module.scss';

const { Content } = Layout;

const EditPublication: React.FunctionComponent = () => {
  const { publication } = usePublication();

  if (!publication) {
    return <b>Error.</b>;
  }

  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <SimpleHeader />
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <div className={styles.publicationContainer}>
          <PublicationForm />
        </div>
      </Content>
    </Layout>
  );
};

export default EditPublication;
