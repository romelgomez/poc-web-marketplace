import styles from "./page.module.css";
import { Particles } from "./particles";

export default function Home() {
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
}
