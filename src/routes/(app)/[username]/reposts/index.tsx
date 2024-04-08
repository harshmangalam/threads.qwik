import { component$ } from "@builder.io/qwik";
import { ThreadCard } from "~/components/thread-card";
import { useGetRepostedThreads } from "~/shared/thread";
export { useGetRepostedThreads };

export default component$(() => {
  const threads = useGetRepostedThreads();
  return (
    <div>
      <div class="grid grid-cols-1 gap-4">
        {threads.value.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
});
