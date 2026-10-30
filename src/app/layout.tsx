import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luminary — A Sanctuary for Ideas",
  description:
    "Share your thoughts, insights, poems, and articles. No algorithms. No brainrot. Just ideas that illuminate.",
  keywords: ["articles", "poetry", "insights", "writing", "community", "deep reading"],
  openGraph: {
    title: "Luminary",
    description: "A sanctuary for ideas that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-[#050508] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
