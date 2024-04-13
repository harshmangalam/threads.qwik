import { component$ } from "@builder.io/qwik";
import { RepliesTimeline } from "~/components/thread-card/replies-timeline";
import { useGetProfileReplies } from "~/shared/thread";
export { useGetProfileReplies };
export default component$(() => {
  const threads = useGetProfileReplies();
  return (
    <div>
      {threads.value.length ? (
        <div class="grid grid-cols-1 gap-4">
          {threads.value.map((thread) => (
            <RepliesTimeline key={thread.id} thread={thread} />
          ))}
        </div>
      ) : (
        <div>
          <p class="text-center opacity-60">No replies yet.</p>
        </div>
      )}
    </div>
  );
});
