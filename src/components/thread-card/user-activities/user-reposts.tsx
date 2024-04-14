import { component$, useSignal } from "@builder.io/qwik";
import { type ThreadType, getThreadsReposts } from "~/shared/thread";
import { Avatar } from "~/components/ui/avatar";
import { getRelativeTime } from "~/utils/date";
import { UserCard } from "./user-card";

export const UserReposts = component$(
  ({ thread, repostCount }: { thread: ThreadType; repostCount: number }) => {
    const modal = useSignal<HTMLDialogElement>();
    const reposts = useSignal<Awaited<ReturnType<typeof getThreadsReposts>>>();
    return (
      <div>
        <button
          class="opacity-50"
          onClick$={async () => {
            modal.value?.showModal();
            reposts.value = await getThreadsReposts(thread.id);
          }}
        >
          {repostCount} reposts
        </button>

        <dialog ref={modal} class="modal">
          <div class="modal-box w-full max-w-md">
            <h3 class="text-center font-semibold">{repostCount} reposts</h3>
            <article class="mt-4 rounded-lg border border-base-300 p-4">
              <header class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Avatar
                    rounded="rounded-full"
                    size="xs"
                    src={thread.user.image}
                  />
                  <h4 class="font-medium">{thread.user.username}</h4>
                </div>
                <p class="text-sm opacity-60">
                  {getRelativeTime(thread.createdAt)}
                </p>
              </header>
              <p class="mt-3 text-sm">{thread.text}</p>
            </article>
            <ul class="mt-4 flex flex-col gap-2">
              {reposts.value?.map((repost) => (
                <li key={repost.userId}>
                  <UserCard
                    activityType="repost"
                    date={repost.repostedAt}
                    user={repost.user}
                  />
                </li>
              ))}
            </ul>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    );
  },
);
