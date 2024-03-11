import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { prisma } from "~/utils/prisma";

export const useGetThreads = routeLoader$(async () => {
  const threads = await prisma.thread.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return threads;
});
export default component$(() => {
  const thredas = useGetThreads();

  return (
    <div>
      <div class="grid grid-cols-1 gap-4">
        {thredas.value.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
