import "./globals.scss";
import type { Metadata } from "next";
import { Roboto, Manrope } from "next/font/google";
import { Providers } from "./core/provider/Providers";
import { Modal } from "./shared/modals/Modal";

const geistRoboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});
const geistManrope = Manrope({
  weight: ["500", "600"],
  variable: "--font-manrope",
  subsets: ["greek"],
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
      <Providers>
        <body className={` ${geistRoboto.variable}  ${geistManrope.variable}`}>
          {children}
          <Modal />
        </body>
      </Providers>
    </html>
  );
}
