import { Card, Col, Grid, Layout, Row } from 'antd';
import React from 'react';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { useAccount } from '../../context/hooks/use-account.hook';
const { Meta } = Card;
import { useRouter } from 'next/router';
import styles from './dashboard.module.scss';
const { useBreakpoint } = Grid;
import { useAppContext } from '../../context/hooks/use-app-context';
import { ListingCard } from '../../modules/listings/components/listing-card';
import { clearListing } from '../../modules/listings/listings.actions';

const { Content } = Layout;

export default function Dashboard() {
  const { dispatch } = useAppContext();
  const { account } = useAccount();
  const router = useRouter();
  const screens = useBreakpoint();

  const newListing = () => {
    clearListing(dispatch);

    router.push('/new-listing');
  };

  return (
    <Layout style={{ minHeight: 'calc(100vh)' }}>
      <Header />
      <Content
        className='site-layout'
        style={{ padding: '0 50px', backgroundColor: 'white' }}
      >
        <div className={styles.viewTitleContainer}>
          <h2
            style={{
              margin: 0,
            }}
          >
            Tus Listados
          </h2>
        </div>

        <div>
          <Row gutter={[16, 16]} wrap={true} style={{ marginBottom: 20 }}>
            <Col md={24} span={screens.md ? 18 : 24}>
              <div className={styles.contentContainer}>
                <div>
                  <Row gutter={[16, 16]} wrap={true}>
                    <Col lg={6} md={12}>
                      <Card
                        bordered={true}
                        hoverable={true}
                        className={styles.card}
                        cover={<div className={styles.cardCoverContainer} />}
                        onClick={newListing}
                        key={'new-listing'}
                      >
                        <Meta title={'+ Nuevo listado'} />
                      </Card>
                    </Col>

                    {account?.listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
