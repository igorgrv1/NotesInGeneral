import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Auth Demo",
  description: "Demo de autenticação com Better Auth + GitHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
