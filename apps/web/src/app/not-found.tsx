import type { Metadata } from "next";
import Link from "next/link";
import { LibrarySearchForm } from "@/components/LibrarySearchForm";

export const metadata: Metadata = {
  title: "Branch Not Found (404)",
  description:
    "This branch or scroll could not be found in Alexander's Library. Search the scientific record or return to the Tree of Knowledge.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="chronicle">
      <article className="chronicle-folio">
        <header className="chronicle-header">
          <p className="chronicle-kicker">404 · Uncatalogued Scroll</p>
          <h1>Branch Not Found in the Archive</h1>
          <p className="chronicle-subtitle">
            The path you followed does not match an existing discipline or monograph in the Tree of Knowledge — or the
            branch has been reorganised under a canonical parent discipline.
          </p>
        </header>

        <LibrarySearchForm variant="hero" />

        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/">← Return to the Tree of Knowledge</Link> · <Link href="/search">Search the Archive</Link> ·{" "}
          <Link href="/about">Read the Chronicle</Link>
        </p>
      </article>
    </main>
  );
}
