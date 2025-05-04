import { Geist, Geist_Mono, Imprima } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "我的網站",
  description: "請在此寫入你的網站敘述",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* TODO: Navbar */}
        <NavBar />
        {/* Navbar end */}
        <main className="pt-16">
          {children}
        </main>
        {/* TODO: Footer */}

        {/* Footer end */}
      </body>
    </html>
  );
}
