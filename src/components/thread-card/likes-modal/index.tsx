import { component$, useSignal } from "@builder.io/qwik";
import { getThreadsLikes } from "~/routes/(app)/layout";
import type { ThreadType } from "~/shared/thread";
import { Avatar } from "~/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { User } from "./user";

export const LikesModal = component$(({ thread }: { thread: ThreadType }) => {
  const modal = useSignal<HTMLDialogElement>();
  const likes = useSignal<Awaited<ReturnType<typeof getThreadsLikes>>>();
  return (
    <div>
      <button
        onClick$={async () => {
          modal.value?.showModal();
          likes.value = await getThreadsLikes(thread.id);
        }}
      >
        {thread.likesCount} like
      </button>

      <dialog ref={modal} class="modal">
        <div class="modal-box w-full max-w-md">
          <h3 class="text-center font-semibold"> {thread.likesCount} likes</h3>
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
                {formatDistanceToNow(thread.createdAt)}
              </p>
            </header>
            <p class="mt-3 text-sm">{thread.text}</p>
          </article>
          <ul class="mt-4 flex flex-col gap-2">
            {likes.value?.map((like) => (
              <li key={like.userId}>
                <User likedAt={like.likedAt} user={like.user} />
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
});
