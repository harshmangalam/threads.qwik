import { component$ } from "@builder.io/qwik";
import { type ThreadType } from "~/shared/thread";
import { ThreadCard } from ".";

export const RepliesTimeline = component$(
  ({ thread }: { thread: ThreadType }) => {
    return (
      <article class="card card-bordered">
        <div class="card-body p-4">
          {thread.parentThread && <ThreadCard thread={thread.parentThread} />}
          <div class="ml-12">
            <ThreadCard thread={thread} />
          </div>
        </div>
      </article>
    );
  },
);
