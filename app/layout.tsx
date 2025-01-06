import "styles/global.css";
import { ThemeProvider } from "./theme-provider";
import { Nunito } from "next/font/google";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import { Metadata } from "next";
import { config } from "../config";
import { Providers } from "./providers";

const typeFace = Nunito({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: {
    default: config.title,
    template: `%s · ${config.title}`
  },
  description: config.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: [
      {
        type: "image/png",
        sizes: "48x48",
        url: "/static/favicon/favicon-48x48.png"
      },
      {
        type: "image/svg+xml",
        url: "/static/favicon/favicon.svg"
      }
    ],
    apple: "/static/favicon/apple-touch-icon.png"
  }
};

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={typeFace.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR-ID');
        `}
      </Script>
    </html>
  );
}
