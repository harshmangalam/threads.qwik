import { component$ } from "@builder.io/qwik";
import { ActionsDropdown } from "./actions-dropdown";
import { Like } from "./like";
import { Reply } from "./reply";
import { Repost } from "./repost";
import { Share } from "./share";
import { ThreadLikes } from "./thread-likes";
import { type Thread } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

type ThreadCardProps = {
  thread: Thread & {
    user: {
      username: string;
    };
  };
};
export const ThreadCard = component$(({ thread }: ThreadCardProps) => {
  return (
    <article>
      <header class="flex gap-3">
        <div class="mt-2 flex-none">
          <div class="avatar">
            <div class="w-9 rounded-full">
              <img
                width={36}
                height={36}
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col">
          <div class="flex items-center justify-between">
            <h3 class="font-medium">{thread.user.username}</h3>
            <div class="flex items-center gap-3">
              <div class="text-sm opacity-50">
                {formatDistanceToNow(thread.createdAt)}
              </div>
              <ActionsDropdown userId={thread.userId} threadId={thread.id} />
            </div>
          </div>
          <p class="text-sm">{thread.text}</p>

          {/* <picture class="mt-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1705091981811-d75606c22ab8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
              alt="mewtru"
              width={400}
              height={400}
              class="aspect-square rounded-lg"
            />
          </picture> */}

          <div class="mt-4 flex items-center gap-2">
            <Like />
            <Reply />
            <Repost />
            <Share />
          </div>
          <div class="mt-2">
            <ThreadLikes />
          </div>
        </div>
      </header>
    </article>
  );
});
