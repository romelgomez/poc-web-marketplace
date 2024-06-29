import { Layout } from 'antd';
import React from 'react';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { useAppContext } from '../../context/hooks/use-app-context';
import ListingBanner from '../../modules/listings/components/listings-banner';
import ListingName from '../../modules/listings/components/listings-name';
import { ViewPublication } from '../../modules/publications/components/view-publication';
import { SearchComponent } from '../../modules/search/components/search.component';

const { Content } = Layout;

export default function Dashboard() {
  const { state } = useAppContext();

  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <Header />
      <Content
        className='site-layout'
        style={{ padding: '0 50px', backgroundColor: 'white' }}
      >
        <ListingBanner />

        <ListingName />

        <div style={{}}>
          <SearchComponent />

          {state.publication && state.drawerPublication && <ViewPublication />}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
