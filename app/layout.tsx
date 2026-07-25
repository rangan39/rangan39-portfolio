import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "rangan39-portfolio.gaurav-ranganath.chatgpt.site";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "rangan39 / home",
      template: "%s · rangan39",
    },
    description:
      "The personal filesystem of rangan39 — small software, strange ideas, useful edges.",
    applicationName: "rangan39",
    openGraph: {
      title: "rangan39 / home",
      description: "Small software, strange ideas, useful edges.",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 1024,
          alt: "The rangan39 filesystem",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "rangan39 / home",
      description: "Small software, strange ideas, useful edges.",
      images: ["/og.png"],
    },
  };
}

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
