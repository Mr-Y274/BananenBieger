import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BananenTube – Warum ist die Banane krumm?",
  description:
    "Interactive video platform powered by Remotion – Bananenbieger Studios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
