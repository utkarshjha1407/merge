import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeStreak - Train Your Coding",
  description: "Compete. Commit. Ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
