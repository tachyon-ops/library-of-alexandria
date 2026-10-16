import type { Metadata } from "next";
import Link from "next/link";
import {
  AUTHOR_SITE_URL,
  GITHUB_PROFILE_URL,
  GITHUB_SPONSORS_URL,
  PAYPAL_DONATE_URL,
} from "@/lib/data";
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
          <div className="masthead-brand">
            <Link href="/" className="wordmark">
              Alexander&rsquo;s Library
            </Link>
            <p className="masthead-note">What the record says, and how strongly.</p>
          </div>
          <nav aria-label="Support and author" className="masthead-actions">
            <a
              href={AUTHOR_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="masthead-link"
            >
              nuuno.art
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="masthead-link"
            >
              @tachyon-ops
            </a>
            <a
              href={GITHUB_SPONSORS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="masthead-link"
            >
              GitHub Sponsors
            </a>
            <a
              href={PAYPAL_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="donate-button"
            >
              Donate via PayPal
            </a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p className="muted small">
            Organises published research; not medical advice. Built by{" "}
            <a href={AUTHOR_SITE_URL} target="_blank" rel="noopener noreferrer">
              nuuno.art
            </a>{" "}
            (
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              @tachyon-ops
            </a>
            ) ·{" "}
            <a href={PAYPAL_DONATE_URL} target="_blank" rel="noopener noreferrer">
              Donate via PayPal
            </a>{" "}
            ·{" "}
            <a href={GITHUB_SPONSORS_URL} target="_blank" rel="noopener noreferrer">
              GitHub Sponsors
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
