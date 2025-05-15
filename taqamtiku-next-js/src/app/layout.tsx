import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BackToTop from "@/components/BackToTop";
import { Suspense } from "react";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-josefin",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Restaurant Taqamtiku",
    default: "Restaurant Taqamtiku",
  },
  description: "Restaurant Taqamtiku est un restaurant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair_display.variable}>
      <body
        className={`${josefin_sans.className}`}
        style={{ backgroundImage: 'url("/bg.jpg.webp")' }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Suspense>
          <AnimateOnScroll />
        </Suspense>
        <BackToTop />
      </body>
    </html>
  );
}
