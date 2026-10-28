import type { Metadata } from "next";
import Link from "next/link";
import { buildPrivacyJsonLd, serializeJsonLd } from "@lib/core";
import { AUTHOR_SITE_URL, GITHUB_PROFILE_URL } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

const PRIVACY_TITLE = "Legal, Copyright & Privacy Notice";
const PRIVACY_DESCRIPTION =
  "Open-access bibliographic compliance, non-hosting of copyrighted full texts, medical disclaimer, and GDPR / Swiss FADP privacy notice for Library of Alexandria.";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: `${PRIVACY_TITLE} — Library of Alexandria`,
    description: PRIVACY_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIVACY_TITLE} — Library of Alexandria`,
    description: PRIVACY_DESCRIPTION,
  },
};

export default function PrivacyPage() {
  const jsonLd = buildPrivacyJsonLd({ siteUrl: getSiteUrl() });

  return (
    <main className="chronicle">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <article className="chronicle-folio">
        <nav aria-label="Breadcrumb" className="trail">
          <Link href="/">Library</Link>
          <span> / Legal, Copyright &amp; Privacy Notice</span>
        </nav>

        <header className="chronicle-header">
          <p className="chronicle-kicker">Public Archive Governance · Compliance &amp; Provenance</p>
          <h1>Legal, Copyright &amp; Privacy Notice</h1>
          <p className="chronicle-subtitle">
            How Library of Alexandria synthesises the open scientific record legally, respects publisher copyright
            and official API terms, and protects visitor privacy.
          </p>
        </header>

        <section className="chronicle-chapter">
          <h2>1. Not Medical, Legal, or Financial Advice</h2>
          <p>
            <strong>Library of Alexandria</strong> is an open-source encyclopaedic synthesis tool that organises
            published, peer-reviewed scientific literature, preprints, and registered clinical trials by canonical
            academic taxonomy and deterministic study-design tier (<code>T1</code> meta-analyses and clinical guidelines
            through <code>T6</code> commentary).
          </p>
          <p>
            Nothing on this website constitutes medical diagnosis, clinical treatment advice, prescription, legal
            counsel, or financial recommendation. Findings are aggregated at the general population or published study
            subgroup level to help readers and researchers evaluate the weight of published evidence and prepare better
            questions for qualified professionals. Always consult a licensed physician or qualified specialist before
            acting on any biomedical or clinical information.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>2. Copyright Compliance &amp; Open-Access API Provenance</h2>
          <p>
            Unlike shadow libraries, Library of Alexandria <strong>never downloads, hosts, mirrors, or redistributes
            copyrighted full-text PDFs, books, or paywalled articles</strong>, nor does it bypass publisher access
            controls.
          </p>
          <ul>
            <li>
              <strong>Official programmatic APIs only:</strong> Literature and trial records are harvested exclusively
              through official public REST APIs designed for automated scholarly indexing:{" "}
              <a href="https://europepmc.org/RestfulWebService" target="_blank" rel="noopener noreferrer">
                Europe PMC RESTful Web Service
              </a>{" "}
              (EMBL-EBI),{" "}
              <a href="https://openalex.org" target="_blank" rel="noopener noreferrer">
                OpenAlex
              </a>{" "}
              (CC0 public-domain scholarly index), and the{" "}
              <a href="https://clinicaltrials.gov/data-api/api" target="_blank" rel="noopener noreferrer">
                ClinicalTrials.gov API v2
              </a>{" "}
              (U.S. National Library of Medicine public registry). All API requests identify the service via a polite{" "}
              <code>User-Agent</code> header and honour rate limits.
            </li>
            <li>
              <strong>Transformative factual synthesis &amp; no verbatim abstract mirroring:</strong> Automated reader
              and skeptic agents extract non-copyrightable scientific facts—study design classifications, sample sizes,
              measured effect sizes, and short factual findings—and compute an objective evidence grade in code. Raw
              publisher abstracts are never reproduced verbatim on public search or discipline pages.
            </li>
            <li>
              <strong>Direct outbound attribution:</strong> Every graded claim, milestone, and source record links
              directly to the original publisher URL or Digital Object Identifier (<code>https://doi.org/…</code>) so
              readers access the primary work at its official source.
            </li>
          </ul>
        </section>

        <section className="chronicle-chapter">
          <h2>3. Privacy &amp; Data Minimization (GDPR / Swiss FADP)</h2>
          <p>
            Library of Alexandria is built on strict data minimization principles under the EU General Data
            Protection Regulation (GDPR) and the Swiss Federal Act on Data Protection (FADP):
          </p>
          <ul>
            <li>
              <strong>No accounts, tracking cookies, or ad pixels:</strong> The public library requires no sign-in, sets
              no advertising or cross-site tracking cookies, and does not fingerprint devices.
            </li>
            <li>
              <strong>Do not submit personal health data (PHI / PII):</strong> Search queries and research inquiries
              submitted through the search bar or AI Tree Organiser are processed via large language model APIs
              (Google Gemini / Anthropic Claude) to classify canonical scientific branches and may be stored as public
              topic briefs in the shared Tree of Knowledge.{" "}
              <strong>
                Never enter names, dates of birth, email addresses, phone numbers, medical record numbers, or personal
                patient identifiers into any search or inquiry field.
              </strong>
            </li>
            <li>
              <strong>Automated PII scrubbing:</strong> Before any public query or custom brief is sent to an AI model
              or persisted in the database, deterministic server-side filters (<code>sanitizePublicInquiry</code>)
              automatically scrub accidental email addresses, phone numbers, dates of birth, and patient identifier
              patterns while preserving scientific nomenclature and DOIs.
            </li>
          </ul>
        </section>

        <section className="chronicle-chapter">
          <h2>4. Contact &amp; Takedown / Attribution Inquiries</h2>
          <p>
            If you believe any indexed citation, external link, or public branch brief contains inaccurate attribution
            or inadvertently submitted personal information, please open an issue or contact the maintainer via{" "}
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              GitHub (@tachyon-ops)
            </a>{" "}
            or{" "}
            <a href={AUTHOR_SITE_URL} target="_blank" rel="noopener noreferrer">
              nuuno.art
            </a>{" "}
            for prompt removal.
          </p>
        </section>
      </article>
    </main>
  );
}
