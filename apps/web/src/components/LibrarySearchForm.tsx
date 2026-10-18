import Link from "next/link";

const EXAMPLE_QUERIES = [
  "Rapamycin & mTOR ovarian reserve",
  "Natural-cycle vs programmed FET",
  "Vitrified oocyte thaw survival",
  "ZyMōt sperm DNA fragmentation",
  "In vitro gametogenesis (IVG)",
  "Pre-eclampsia aspirin prophylaxis",
];

export function LibrarySearchForm({
  variant = "hero",
  defaultQuery = "",
}: {
  variant?: "hero" | "masthead";
  defaultQuery?: string;
}) {
  if (variant === "masthead") {
    return (
      <form action="/search" method="GET" role="search" className="masthead-search">
        <label htmlFor="masthead-search-input" className="sr-only">
          Search articles, findings, and ideas
        </label>
        <input
          type="search"
          id="masthead-search-input"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search papers, findings, ideas…"
          required
          className="masthead-search-input"
        />
        <button type="submit" className="masthead-search-btn">
          Search
        </button>
      </form>
    );
  }

  return (
    <section className="library-search-hero" aria-label="AI library search and research inquiry">
      <form action="/search" method="GET" role="search" className="library-search-form">
        <label htmlFor="library-hero-search" className="library-search-label">
          Ask the library or search for specific articles, clinical trials, and scientific ideas
        </label>
        <div className="library-search-bar">
          <input
            type="search"
            id="library-hero-search"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Ask a question, enter a paper title, author, DOI, or concept (e.g. rapamycin ovarian reserve, COMPETE trial, CoQ10)…"
            required
            className="library-search-input"
          />
          <button type="submit" className="library-search-submit">
            Ask &amp; search
          </button>
        </div>
      </form>
      <div className="library-search-examples">
        <span className="muted small">Try asking:</span>
        <ul className="library-search-pills" aria-label="Example research queries">
          {EXAMPLE_QUERIES.map((example) => (
            <li key={example}>
              <Link href={`/search?q=${encodeURIComponent(example)}`} className="search-example-pill">
                {example}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
