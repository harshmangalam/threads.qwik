import { component$ } from "@builder.io/qwik";
import ReplyIcon from "~/assets/icons/reply.svg?jsx";
import { CreateThread } from "../create-thread";
import { type ThreadType } from "~/shared/thread";
export const Reply = component$(({ thread }: { thread: ThreadType }) => {
  return (
    <CreateThread isReply thread={thread}>
      <button title="Reply" class="btn btn-circle btn-ghost btn-sm">
        <ReplyIcon class="h-5 w-5" />
      </button>
    </CreateThread>
  );
});
