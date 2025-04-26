import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-[1000]">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            John Doe
          </Link>
          <div className="space-x-6 flex items-center">
            <Link href="/about" className="hover:text-gray-300">
              關於本站
            </Link>
            <Link href="/faq" className="hover:text-gray-300">
              常見問題
            </Link>
            <Link
              href="/admin"
              className="ml-6 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
            >
              管理後台
            </Link>
          </div>
        </nav>
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
