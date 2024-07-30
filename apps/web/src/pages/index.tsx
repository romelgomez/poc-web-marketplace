import styles from "./page.module.scss";
import { Particles } from '../components/particles';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return (
    <Particles>
      <main className={styles.main}>
        <div className={styles.description} />
        <div className={styles.center} style={{
          marginBottom: 40
        }}>
          <span>MercadoChevere.com</span>
        </div>

        <div className={styles.grid} />
      </main>
    </Particles>
  );
};

export default Home;
