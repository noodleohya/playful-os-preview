import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playful OS — Imagine the Moment",
  description: "Describe a space, add its dimensions and atmosphere, and watch your first stage concept appear with Playful OS.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
