import { component$ } from "@builder.io/qwik";
import { ThreadCard } from "~/components/thread-card";
import { useGetProfileThreds } from "~/shared/thread";
export { useGetProfileThreds };

export default component$(() => {
  const threads = useGetProfileThreds();
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
