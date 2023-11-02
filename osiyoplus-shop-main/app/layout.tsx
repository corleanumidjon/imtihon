import "./globals.css";
import 'aos/dist/aos.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "./layout/header";
import Footer from "./layout/footer";
import AOS from "./components/aos";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "OsiyoPlus",
  description: "Online shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <AOS>{children}</AOS>
        <Footer />
      </body>
    </html>
  );
}
