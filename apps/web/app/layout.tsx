import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SOS OPS",
  description: "Kelly Grappe Campaign Operating System"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
