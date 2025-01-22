import "./globals.scss";
import type { Metadata } from "next";
import { Roboto, Manrope } from "next/font/google";

const geistRoboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});
const geistManrope = Manrope({
  weight: ["500", "600"],
  variable: "--font-manrope",
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
