import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import QueryProvider from "@/components/QueryProvider";

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
      <body>
        <QueryProvider>
          <Navigation />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
