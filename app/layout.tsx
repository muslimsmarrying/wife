import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wife4life | Find Your Ideal Muslim Life Partner",
  description: "Wife4life is a trusted matrimonial platform helping Muslims find their ideal marriage partners with privacy, sincerity, and faith.",
  keywords: ["Muslim marriage", "Islamic matrimony", "Muslim partner", "Nikah app", "Halal dating", "Muslim matrimonial"],
  authors: [{ name: "Wife4life Team", url: "https://wife4life.com" }],
  generator: "Next.js",
  metadataBase: new URL("https://wife4life.com"),
  openGraph: {
    title: "Wife4life | Muslim Matrimonial Platform",
    description: "Join Wife4life to find sincere Muslim marriage partners. 100% privacy. Faith-based matches.",
    url: "https://wife4life.com",
    siteName: "Wife4life",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Wife4life - Find Your Ideal Muslim Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wife4life | Muslim Matrimonial App",
    description: "Helping Muslims worldwide find compatible marriage partners with sincerity and privacy.",
    images: ["/og-image.jpg"],
    creator: "@wife4life", // If you have a Twitter handle
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}>
          <Toaster richColors/>
        {children}
      </body>
    </html>
  );
}
