import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { useGetLikedThreads } from "~/shared/thread";
export { useGetLikedThreads };

export default component$(() => {
  const threads = useGetLikedThreads();

  return (
    <div class="mt-4 grid grid-cols-1 gap-4">
      {threads.value.length ? (
        threads.value.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))
      ) : (
        <p class="text-center opacity-50">Posts you like will appear here.</p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Saved",
};
