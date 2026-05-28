import type { Metadata } from "next";
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
  metadataBase: new URL("https://krxproducepl.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://krxproducepl.vercel.app",
    siteName: "KRX Produce",
    title: "KRX Produce — Filmowanie & Projektowanie Graficzne",
    description:
      "Profesjonalne usługi filmowania, montażu, projektowania graficznego i identyfikacji wizualnej.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KRX Produce — Filmowanie & Projektowanie Graficzne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRX Produce — Filmowanie & Projektowanie Graficzne",
    description:
      "Profesjonalne usługi filmowania, montażu, projektowania graficznego i identyfikacji wizualnej.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: "#050505",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KRX Produce",
  },
  other: {
    "msapplication-TileColor": "#22d3ee",
    "msapplication-TileImage": "/android-chrome-192x192.png",
    "msapplication-config": "none",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
