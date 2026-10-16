import { usageSummary } from "@lib/db";
import { Tree } from "@/components/Tree";
import { NewTopicForm } from "@/components/NewTopicForm";
import { AutoRefresh } from "@/components/AutoRefresh";
import { anyBusy, loadTree, sql } from "@/lib/data";

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
        <h1>The tree of knowledge</h1>
        <p className="lede">
          Each branch is read by research workers: they search the literature, trial registries and the web, extract findings,
          grade them by study design, and flag what is disputed.
        </p>
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
        <p className="muted small">
          Last 30 days: {calls} model calls, {searches} web searches.
        </p>
      </aside>
    </main>
  );
}
