import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "@/styles/globals.scss";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NHub — Notification Hub",
  description: "Enterprise notification management platform for Salesforce events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className={ibmPlexSans.className}>{children}</body>
    </html>
  );
}
