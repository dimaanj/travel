import Link from 'next/link';
import styles from './layout.module.css';

export default function ItinerariesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className={styles.nav}>
        <Link href="/itineraries" className={styles.backLink}>
          ← Back to list
        </Link>
      </nav>
      {children}
    </div>
  );
}
