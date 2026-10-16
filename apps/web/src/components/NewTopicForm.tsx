import { startTopic } from "@/app/actions";

export function NewTopicForm({ parentId, parentTitle }: { parentId?: string; parentTitle?: string }) {
  return (
    <form action={startTopic} className="new-topic">
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <label>
        <span>{parentTitle ? `New branch under ${parentTitle}` : "New branch of the library"}</span>
        <input name="title" required placeholder={parentTitle ? "e.g. Endometrial receptivity testing" : "e.g. Ocean acidification and coral reefs"} />
      </label>
      <label>
        <span>What do you want to know? (optional)</span>
        <textarea name="brief" rows={2} placeholder="The question behind the topic helps the scout aim its searches." />
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
