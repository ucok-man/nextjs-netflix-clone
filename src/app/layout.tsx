import ContextProviders from "@/context";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netflix",
  description: "Netflix clone Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ContextProviders>
        <body className={`antialiased`}>{children}</body>
      </ContextProviders>
    </html>
  );
}
