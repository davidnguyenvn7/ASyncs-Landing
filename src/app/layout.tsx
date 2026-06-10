import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASync — Nền tảng vận hành & tự động hoá doanh nghiệp đa lĩnh vực",
  description:
    "ASync là nền tảng vận hành & tự động hoá toàn diện cho doanh nghiệp — hợp nhất công việc, tài chính, nhân sự, bán hàng và dữ liệu trên một hệ thống duy nhất.",
};

export const viewport: Viewport = {
  themeColor: "#0a0c0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
