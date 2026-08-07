import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOVEN | Wholesale Collection",
  description: "HOVEN Wholesale Collection — a premium mattress profile for hospitality, retail, and projects.",
  openGraph: {
    title: "HOVEN | Wholesale Collection",
    description: "Premium mattress solutions for hospitality, retail, and projects.",
    images: [{ url: "/og.png", width: 1734, height: 907 }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
