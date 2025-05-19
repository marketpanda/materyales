import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Materyales",
  description: "Estimates Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         
        <body className={inter.className}>
          <Theme accentColor="crimson"> 
            {children}
          </Theme>
        </body>
    </html>
  );
}
