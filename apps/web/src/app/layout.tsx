import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexander's Library",
  description: "A tree of knowledge filled from the open scientific record, with the strength of every claim shown.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Public+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <header className="masthead">
          <Link href="/" className="wordmark">
            Alexander&rsquo;s Library
          </Link>
          <p className="masthead-note">What the record says, and how strongly.</p>
        </header>
        {children}
      </body>
    </html>
  );
}
