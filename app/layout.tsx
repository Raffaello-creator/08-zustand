import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import css from "./Home.module.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

type ChildrenType = {
  children: React.ReactNode;
  modal: React.ReactNode;
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a tool for writing and managing special notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is a tool for writing and managing special notes.",
    url: "https://08-zustand-lake-chi.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub is a tool for writing and managing special notes.",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<ChildrenType>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main className={css.main}>
            {children}
            {modal}
          </main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
