
import { Layout } from 'antd';
import type { NextPage } from 'next';
import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
const { Content } = Layout;

const Home: NextPage = () => {
  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <Header />
      <Content className='site-layout' style={{ padding: '20px 50px' }}>
        <div>some cool view that sells</div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
