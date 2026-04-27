import type { Metadata } from "next";
import { instrumentSerif, stack } from "@/lib/fonts";
import { config } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${instrumentSerif.variable} ${stack.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
