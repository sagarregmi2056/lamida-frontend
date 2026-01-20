import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lamidaglobal.com"),
  title: "Lamida | Invest, Build & Scale on Bittensor",
  description:
    "Lamida partners with investors and builders to accelerate growth on the Bittensor network.",
  keywords: ["Bittensor", "TAO", "Blockchain", "AI", "Web3", "Investment", "Subnet"],
  authors: [{ name: "Lamida" }],
  creator: "Lamida",
  publisher: "Lamida",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/icons/site.webmanifest",
      },
    ],
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lamida.com",
    title: "Lamida | Invest, Build & Scale on Bittensor",
    description:
      "Lamida partners with investors and builders to accelerate growth on the Bittensor network.",
    siteName: "Lamida",
    images: [
      {
        url: "/icons/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Lamida Logo",
      },
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Lamida - Invest, Build & Scale on Bittensor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamida | Invest, Build & Scale on Bittensor",
    description:
      "Lamida partners with investors and builders to accelerate growth on the Bittensor network.",
    images: ["/logo.png"],
    creator: "@lamida",
    site: "@lamida",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
