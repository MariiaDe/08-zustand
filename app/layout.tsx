import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

/* =========================
   ROBOTO FONT
========================= */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

/* =========================
   SEO METADATA
========================= */
export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a simple and efficient application designed for managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://notehub.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
