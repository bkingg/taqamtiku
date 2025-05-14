import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: {
    template: "%s | FKT Consulting",
    default: "FKT Consulting",
  },
  description: "FKT Consulting est un cabinet de conseil en actuariat",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair_display.variable}>
      <body className={`${montserrat.className}`}>
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
