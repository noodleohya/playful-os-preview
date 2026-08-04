import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playful OS — Show Intelligence",
  description: "Describe your next show. Playful OS turns creative intent into coordinated, reviewable production outputs.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
