import React from 'react';
import styles from './layout.module.scss';
import Navbar from '@/app/_components/Navbar/Navbar';
import Footer from '@/app/_components/Footer/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
