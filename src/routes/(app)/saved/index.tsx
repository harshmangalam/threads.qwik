import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { useGetSavedThreads } from "~/shared/thread";
export { useGetSavedThreads };

export default component$(() => {
  const threads = useGetSavedThreads();

  return (
    <div class="mt-4 grid grid-cols-1 gap-4">
      {threads.value.length ? (
        threads.value.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))
      ) : (
        <p class="text-center opacity-50">
          Posts that you save will appear here.
        </p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Saved",
};
