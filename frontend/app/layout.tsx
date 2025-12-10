import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/magic-cursor";

export const metadata: Metadata = {
  title: "Piyusha - UI/UX Designer",
  description: "Explore Piyusha's UI/UX design portfolio showcasing user-centered design solutions and digital experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SmoothCursor />
      </body>
    </html>
  );
}