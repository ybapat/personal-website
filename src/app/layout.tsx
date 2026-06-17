import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Bapat — Software Engineer",
  description:
    "Software engineer and CS student at Purdue University. Building fast, beautiful products from frontend to backend.",
  keywords: ["Yash Bapat", "Software Engineer", "Purdue", "Full Stack", "Developer"],
  openGraph: {
    title: "Yash Bapat — Software Engineer",
    description: "Building things for the web. CS @ Purdue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050a0e] text-[#e8f4f1]" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
