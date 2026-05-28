import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://krxproducepl.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.png?v=2`;

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "KRX Produce — Filmowanie & Projektowanie Graficzne",
  description:
    "Profesjonalne usługi filmowania, montażu, projektowania graficznego i identyfikacji wizualnej. KRX Produce to doświadczenie, kreatywność i dbałość o detale.",
  keywords: [
    "filmowanie",
    "montaż video",
    "projektowanie graficzne",
    "identyfikacja wizualna",
    "logo",
    "banery",
    "reklamy video",
    "postprodukcja",
    "KRX Produce",
  ],
  authors: [{ name: "KRX Produce" }],
  creator: "KRX Produce",
  publisher: "KRX Produce",
  robots: "index, follow",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "KRX Produce",
    title: "KRX Produce — Filmowanie & Projektowanie Graficzne",
    description:
      "Profesjonalne usługi filmowania, montażu, projektowania graficznego i identyfikacji wizualnej.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "KRX Produce — Filmowanie & Projektowanie Graficzne",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRX Produce — Filmowanie & Projektowanie Graficzne",
    description:
      "Profesjonalne usługi filmowania, montażu, projektowania graficznego i identyfikacji wizualnej.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: `${SITE_URL}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${SITE_URL}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${SITE_URL}/apple-touch-icon.png`,
    shortcut: `${SITE_URL}/favicon.ico`,
  },
  manifest: `${SITE_URL}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KRX Produce",
  },
  other: {
    "msapplication-TileColor": "#22d3ee",
    "msapplication-TileImage": `${SITE_URL}/android-chrome-192x192.png`,
    "msapplication-config": "none",
    "og:image:secure_url": OG_IMAGE,
    "og:image:type": "image/png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
