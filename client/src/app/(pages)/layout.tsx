import "./_globals/globals.scss";
import React from "react";
import { Poppins } from "next/font/google";
import Navbar from "@/app/components/Navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font1",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
