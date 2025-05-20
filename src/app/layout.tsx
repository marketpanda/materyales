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
       <head>
        {/* Microsoft Clarity Script */}
        {process.env.NODE_ENV === 'production' && (
          <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rkvc36hqm0");`,
          }}
        />
        )}
      </head>
         
        <body className={inter.className}>
          <Theme accentColor="crimson"> 
            {children}
          </Theme>
        </body>
    </html>
  );
}
