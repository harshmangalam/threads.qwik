import { component$ } from "@builder.io/qwik";
import { Avatar } from "../ui/avatar";
import { type ThreadType } from "~/shared/thread";
import { getRelativeTime } from "~/utils/date";

export const SimpleThread = component$(({ thread }: { thread: ThreadType }) => {
  return (
    <article class="mt-4 rounded-lg border border-base-300 p-4">
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Avatar rounded="rounded-full" size="xs" src={thread.user.image} />
          <h4 class="font-medium">{thread.user.username}</h4>
        </div>
        <p class="text-sm opacity-60">{getRelativeTime(thread.createdAt)}</p>
      </header>
      <p class="mt-3 text-sm">{thread.text}</p>
    </article>
  );
});
