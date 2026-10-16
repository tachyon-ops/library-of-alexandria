import Link from "next/link";
import { usageSummary } from "@lib/db";
import { Tree } from "@/components/Tree";
import { TopicGraph3D } from "@/components/TopicGraph3D";
import { NewTopicForm } from "@/components/NewTopicForm";
import { AutoRefresh } from "@/components/AutoRefresh";
import {
  AUTHOR_SITE_URL,
  GITHUB_PROFILE_URL,
  GITHUB_SPONSORS_URL,
  PAYPAL_DONATE_URL,
  anyBusy,
  loadTree,
  sql,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [roots, usage] = await Promise.all([loadTree(), usageSummary(sql())]);
  const busy = anyBusy(roots);
  const calls = usage.reduce((n, u) => n + u.calls, 0);
  const searches = usage.reduce((n, u) => n + u.webSearches, 0);

  return (
    <main className="home">
      <AutoRefresh active={busy} />
      <section className="home-tree">
        <h1>The Tree of Knowledge</h1>
        <p className="lede">
          We ask, and it is gathered from humanity&rsquo;s scientific archive. Autonomous research workers search the
          open literature, clinical trial registries, and the web; organise fields by canonical scientific taxonomy;
          grade every finding by study design; and keep frontier and disputed ideas visible.{" "}
          <Link href="/about">Read the chronicle of the quest →</Link>
        </p>
        {roots.length > 0 && <TopicGraph3D roots={roots} />}
        <h2 className="index-heading">Catalogue of scientific disciplines</h2>
        <Tree roots={roots} />
      </section>
      <aside className="home-side">
        <NewTopicForm />
        <section className="legend">
          <h2>How claims are graded</h2>
          <ol className="tier-legend">
            <li data-tier="T1">Synthesis of trials: meta-analyses, systematic reviews, guidelines</li>
            <li data-tier="T2">Randomised trials, at least two</li>
            <li data-tier="T3">Large observational studies, or a single trial</li>
            <li data-tier="T4">Small studies, case series and reports</li>
            <li data-tier="T5">Animal, cell and mechanistic work</li>
            <li data-tier="T6">Opinion, news and unverified claims</li>
          </ol>
          <p className="muted small">Frontier and contested ideas stay in the library, labelled rather than removed.</p>
        </section>
        <section className="support-box">
          <h2>Support the library</h2>
          <p className="muted small">
            Each branch researched uses paid model and web-search calls. Contributions help keep the library open and fund new
            research runs.
          </p>
          <div className="support-actions">
            <a
              href={PAYPAL_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="donate-button"
            >
              Donate via PayPal
            </a>
            <a
              href={GITHUB_SPONSORS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="support-link"
            >
              GitHub Sponsors
            </a>
          </div>
          <p className="muted small">
            By Nuno Ribeiro ·{" "}
            <a href={AUTHOR_SITE_URL} target="_blank" rel="noopener noreferrer">
              nuuno.art
            </a>{" "}
            ·{" "}
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              @tachyon-ops
            </a>
          </p>
        </section>
        <p className="muted small">
          Last 30 days: {calls} model calls, {searches} web searches.
        </p>
      </aside>
    </main>
  );
}
