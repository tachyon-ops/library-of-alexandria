import type { Metadata, Viewport } from "next";
import Link from "next/link";
import {
  CORE_SEO_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@lib/core";
import { LibrarySearchForm } from "@/components/LibrarySearchForm";
import { WordSynopsis } from "@/components/WordSynopsis";
import {
  AUTHOR_SITE_URL,
  GITHUB_PROFILE_URL,
  GITHUB_SPONSORS_URL,
  PAYPAL_DONATE_URL,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#121417" },
  ],
};

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const defaultTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: "Nuno Ribeiro", url: AUTHOR_SITE_URL }],
    creator: "Nuno Ribeiro (@tachyon-ops)",
    publisher: SITE_NAME,
    category: "science",
    keywords: CORE_SEO_KEYWORDS,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": [
          {
            url: "/feed.xml",
            title: `${SITE_NAME} — Scientific Branches & Monographs RSS Feed`,
          },
        ],
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: siteUrl,
      title: defaultTitle,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      creator: "@tachyon_ops",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

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
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title={SITE_NAME}
          href="/opensearch.xml"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt Machine-Readable Scientific Index"
          href="/llms.txt"
        />
      </head>
      <body>
        <header className="masthead">
          <div className="masthead-brand">
            <Link href="/" className="wordmark">
              Alexander&rsquo;s Library
            </Link>
            <p className="masthead-note">
              The search for the elixir of youth — what the record says, and how strongly.{" "}
              <span className="synopsis-hint">Double-click any word for an instant dictionary or scientific synopsis.</span>
            </p>
          </div>
          <nav aria-label="Primary and support" className="masthead-actions">
            <LibrarySearchForm variant="masthead" />
            <Link href="/about" className="masthead-link">
              The Chronicle
            </Link>
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
        <WordSynopsis />
        <footer className="site-footer">
          <p className="muted small">
            Organises published research; not medical, legal, or financial advice. Bibliographic metadata &amp;
            transformative synthesis only (no full-text hosting).{" "}
            <Link href="/privacy">Privacy, Copyright &amp; Disclaimer</Link> · Built by{" "}
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
