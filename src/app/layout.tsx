import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-temp-one.vercel.app"), // Replace with your final domain later
  title: {
    default: "Othmane El Rhareg — Digital Marketing Portfolio",
    template: "%s | Othmane El Rhareg",
  },
  description:
    "Digital marketing portfolio of Othmane El Rhareg, ENCG Beni Mellal graduate. SEO specialist, marketing strategist, and content creator with experience at Banque Populaire HQ, FORASE Agency, and Organicum. Skilled in WordPress, Google Analytics, SEMrush, n8n automation, and brand identity design.",
  keywords: [
    "Othmane El Rhareg",
    "digital marketing portfolio",
    "ENCG marketing graduate",
    "SEO specialist",
    "marketing strategist",
    "content strategy",
    "social media management",
    "n8n automation",
    "brand identity Morocco",
    "digital marketing Morocco",
    "Google Analytics",
    "SEMrush",
    "WordPress",
  ],
  openGraph: {
    title: "Othmane El Rhareg — Digital Marketing Portfolio",
    description:
      "SEO specialist & marketing strategist. ENCG Beni Mellal graduate with hands-on experience in digital strategy, content marketing, and marketing automation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Othmane El Rhareg — Digital Marketing Portfolio",
    description:
      "Digital marketing portfolio — SEO, content strategy, social media management, and marketing automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}
