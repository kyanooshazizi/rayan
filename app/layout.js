// import Head from "next/head";
import Nextui from "@/components/nextui/nextprovider";
import QeuryProvider from "@/components/TanstakQury/Quryprovider";
import "./globals.css";
// redux
import { Providers } from "@/components/Redux/provider";
import { ThemeContextProvider } from "@/components/context/store";
// import { Suspense } from 'react'

export const metadata = {
  title: "رایان پست",
  description: "رایان راه حل هوشمندانه برای کسب و کار های آنلاین",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en" className="bg-[#F3F6FB]">
      <body>
        <Nextui>
          <QeuryProvider>
            <ThemeContextProvider>
              <Providers>
                {children}
                </Providers>
            </ThemeContextProvider>
          </QeuryProvider>
        </Nextui>
      </body>
    </html>
  );
}
