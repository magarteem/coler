import type { Metadata } from "next";
import { Roboto, Manrope } from "next/font/google";
import "./globals.css";

//const geistSans = Geist({
//  variable: "--font-geist-sans",
//  subsets: ["latin"],
//});

//const geistMono = Geist_Mono({
//  variable: "--font-geist-mono",
//  subsets: ["latin"],
//});

const geistRoboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const geistManrope = Manrope({
  weight: ["500", "600"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Account",
  description: "Personal Account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistRoboto.variable}  ${geistManrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
