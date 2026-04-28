import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Ahmad Faseeh — Full-Stack & Backend Developer",
  description:
    "Full-stack and backend developer from Lahore, Pakistan. Scalable systems, APIs, AI pipelines, and polished web experiences.",
  openGraph: {
    title: "Muhammad Ahmad Faseeh — Developer Portfolio",
    description:
      "Backend architect, AI builder, and full-stack engineer. Lahore, Pakistan.",
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
      className={`${orbitron.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
