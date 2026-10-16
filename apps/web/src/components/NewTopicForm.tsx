import { startTopic } from "@/app/actions";

export function NewTopicForm({ parentId, parentTitle }: { parentId?: string; parentTitle?: string }) {
  return (
    <form action={startTopic} className="new-topic">
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <label>
        <span>{parentTitle ? `New sub-discipline under ${parentTitle}` : "New scientific discipline"}</span>
        <input
          name="title"
          required
          placeholder={
            parentTitle
              ? "e.g. Endometrial Receptivity & Implantation"
              : "e.g. Cellular Senescence & Longevity Biology"
          }
        />
      </label>
      <label>
        <span>Research scope (optional)</span>
        <textarea
          name="brief"
          rows={2}
          placeholder="Population-wide scientific questions, mechanisms, and clinical outcomes to investigate."
        />
      </label>
      <div className="form-row">
        <label className="check">
          <input type="checkbox" name="research" defaultChecked /> Start research now
        </label>
        <button type="submit">Add branch</button>
      </div>
    </form>
  );
}
