// import Head from "next/head";
import Nextui from "@/components/nextui/nextprovider";
import QeuryProvider from "@/components/TanstakQury/Quryprovider";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
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
                <NextTopLoader
                  color="#283764"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={4}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  showAtBottom={false}
                  zIndex={1600}
                  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                />
                {children}
              </Providers>
            </ThemeContextProvider>
          </QeuryProvider>
        </Nextui>
      </body>
    </html>
  );
}
