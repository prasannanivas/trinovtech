import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRINOVTECH | End-to-End Technology Consulting",
  description:
    "We provide end-to-end technical consulting across embedded systems, IoT, cloud platforms, and data-driven applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
