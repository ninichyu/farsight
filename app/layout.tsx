import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farsight Command",
  description: "Private campus incident response dashboard demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}