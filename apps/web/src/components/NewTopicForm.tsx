export function NewTopicForm({ parentId, parentTitle }: { parentId?: string; parentTitle?: string }) {
  return (
    <form action="/search" method="get" className="new-topic" data-parent-id={parentId}>
      <div className="new-topic-header">
        <span className="new-topic-kicker">AI Tree Organiser</span>
        <strong>{parentTitle ? `Expand ${parentTitle}` : "Grow the Tree of Knowledge"}</strong>
      </div>
      <p className="muted small" style={{ margin: 0 }}>
        Branches are never named or placed manually. Ask any scientific question — AI decomposes multi-part inquiries
        into one, two, three, or more canonical sub-branches and places each under its proper discipline.
      </p>
      <label>
        <span>Scientific or clinical inquiry</span>
        <input
          type="search"
          name="q"
          required
          placeholder={
            parentTitle
              ? `Ask a question to organise under ${parentTitle}…`
              : "e.g. BB/AA, 1PN/2PN — what grading methods exist for oocytes and embryos?"
          }
        />
      </label>
      <div className="form-row">
        <span className="muted small">Auto-classifies taxonomy &amp; cross-links</span>
        <button type="submit">Analyse &amp; organise →</button>
      </div>
    </form>
  );
}

