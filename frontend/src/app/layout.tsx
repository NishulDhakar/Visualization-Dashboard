import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visualization Dashboard Dashboard",
  description: "Interactive analytics dashboard for backend-driven global data.",
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
      </body>
    </html>
  );
}
