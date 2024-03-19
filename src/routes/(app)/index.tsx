import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { UserSuggestions } from "~/components/user/user-suggestions";
import { prisma } from "~/utils/prisma";

export const useGetThreads = routeLoader$(async () => {
  const threads = await prisma.thread.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });
  return threads;
});
export const useGetUsers = routeLoader$(async () => {
  const users = await prisma.user.findMany();
  return users;
});
export default component$(() => {
  const thredas = useGetThreads();
  const users = useGetUsers();

  return (
    <div>
      <UserSuggestions users={users.value} />
      <div class="mt-4 grid grid-cols-1 gap-4">
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
