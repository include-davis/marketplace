import './_globals/globals.scss';
import React from 'react';
import { Poppins } from 'next/font/google';
import Footer from '../components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font1',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
