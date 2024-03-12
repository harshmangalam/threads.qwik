import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { prisma } from "~/utils/prisma";

export const useGetProfileThreds = routeLoader$(async ({ params }) => {
  const threads = await prisma.thread.findMany({
    where: {
      user: {
        username: params.username.slice(1),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return threads;
});
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
