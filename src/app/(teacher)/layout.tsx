import type { Metadata } from "next";
// import localFont from "next/font/local";
import "@/lib/globals.css";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Recsys",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100`}
      >
        <div className="fixed right-0 w-[80%] ml-auto">
            <Navbar/>
        </div>
        <Sidenav/>
        
        {children}
      </body>
    </html>
  );
}
