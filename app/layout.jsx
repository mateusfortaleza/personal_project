import "./globals.css";

export const metadata = {
  title: "IGN Brasil Clone",
  description: "Static Next.js recreation of an IGN Brasil news layout.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
