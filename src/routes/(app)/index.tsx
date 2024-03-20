import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ThreadCard } from "~/components/thread-card";
import { UserSuggestions } from "~/components/user/user-suggestions";

import { useGetUsers } from "~/shared/user";
import { useGetThreads } from "~/shared/thread";

export { useGetUsers } from "~/shared/user";
export { useGetThreads } from "~/shared/thread";

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
