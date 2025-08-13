import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: '--font-josefin',
});

export const metadata: Metadata = {
  title: "Gabin Guérin",
  description: "Portfolio Gabin Guérin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`h-full ${josefin.variable}`}>
      <body className="h-full w-full">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
