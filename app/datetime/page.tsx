import styles from '../page.module.css';

import dayjs from 'dayjs';
import 'dayjs/locale/my';

import ClientComponent from '@/app/datetime/_components/ClientComponent';

export default function DateTimePage() {
  const date = new Date();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <p>Server Component(Date): {date.toLocaleString()}</p>
          <p>Server Component(Dayjs): {dayjs().toDate().toLocaleString()}</p>
        </div>
        <div>
          <ClientComponent />
        </div>
      </div>
    </main>
  );
}
