import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import RepostIcon from "~/assets/icons/repost.svg?jsx";
import RepostCheckIcon from "~/assets/icons/repost-check.svg?jsx";
import { useRepostThreads } from "~/routes/(app)/layout";

export const Repost = component$(
  ({ threadId, reposted }: { threadId: string; reposted: boolean }) => {
    const repostThread = useRepostThreads();
    return (
      <Form action={repostThread}>
        <input hidden type="hidden" name="threadId" value={threadId} />
        <button
          disabled={repostThread.isRunning}
          aria-disabled={repostThread.isRunning}
          type="submit"
          title="Reply"
          class="btn btn-circle btn-ghost btn-sm"
        >
          {reposted ? (
            <RepostCheckIcon class="h-5 w-5" />
          ) : (
            <RepostIcon class="h-5 w-5" />
          )}
        </button>
      </Form>
    );
  },
);
