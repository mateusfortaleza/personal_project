import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "IGN Brasil Clone",
  description: "Static Next.js recreation of an IGN Brasil news layout.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
