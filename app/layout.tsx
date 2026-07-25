import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "rangan39 — Independent product studio",
    template: "%s · rangan39",
  },
  description:
    "The portfolio of rangan39, an independent builder creating clear and reliable digital products.",
  applicationName: "rangan39 portfolio",
  openGraph: {
    title: "rangan39 — Independent product studio",
    description:
      "A filesystem-style portfolio for an independent product builder.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "rangan39 — Independent product studio",
    description:
      "A filesystem-style portfolio for an independent product builder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
