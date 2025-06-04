import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["cyrillic"],
});


export const metadata: Metadata = {
  title: "Тестовое задание",
  description: "Тествое задание от Kiryl Yushkevich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={interSans.className}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body>
        {children}
      </body>
    </html>
  );
}
