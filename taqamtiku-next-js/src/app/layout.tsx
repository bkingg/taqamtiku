import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-josefin",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
    <html
      lang="fr"
      className={`${playfair_display.variable} ${josefin_sans.variable}`}
    >
      <body
        className={`${josefin_sans.className}`}
        style={{ backgroundImage: 'url("/bg.jpg.webp")' }}
      >
        {children}
      </body>
    </html>
  );
}
