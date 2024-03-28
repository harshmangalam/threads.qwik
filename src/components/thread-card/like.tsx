import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import LikeIcon from "~/assets/icons/heart.svg?jsx";
import { useLikeThread } from "~/routes/(app)/layout";
export const Like = component$(({ threadId }: { threadId: string }) => {
  const likeThread = useLikeThread();
  return (
    <Form action={likeThread}>
      <button
        disabled={likeThread.isRunning}
        title="Like"
        class="btn btn-circle btn-ghost btn-sm"
        type="submit"
      >
        <input type="hidden" name="threadId" value={threadId} />
        <LikeIcon class="h-5 w-5 fill-none" />
      </button>
    </Form>
  );
});
