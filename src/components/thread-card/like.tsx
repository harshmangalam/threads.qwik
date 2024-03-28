import { component$ } from "@builder.io/qwik";
import LikeIcon from "~/assets/icons/heart.svg?jsx";
import { useLikeThread } from "~/routes/(app)/layout";
export const Like = component$(
  ({ isLiked, threadId }: { threadId: string; isLiked: boolean }) => {
    const likeThread = useLikeThread();
    const likeClass = isLiked ? "fill-error text-error" : "fill-none";
    return (
      <button
        disabled={likeThread.isRunning}
        title="Like"
        class="btn btn-circle btn-ghost btn-sm"
        type="submit"
        onClick$={() => likeThread.submit({ threadId })}
      >
        <LikeIcon class={["h-5 w-5", likeClass]} />
      </button>
    );
  },
);
