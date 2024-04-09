import { component$ } from "@builder.io/qwik";
import { ActionsDropdown } from "./actions-dropdown";
import { Like } from "./like";
import { Reply } from "./reply";
import { Repost } from "./repost";
import { Share } from "./share";
import { formatDistanceToNow } from "date-fns";
import { type ThreadType } from "~/shared/thread";
import { LikesModal } from "./likes-modal";

type ThreadCardProps = {
  thread: ThreadType;
};

export const ThreadCard = component$(({ thread }: ThreadCardProps) => {
  return (
    <article>
      <header class="flex gap-3">
        <div class="mt-2 flex-none">
          {thread.user.image && (
            <div class="avatar">
              <div class="w-9 rounded-full">
                <img width={36} height={36} src={thread.user.image} />
              </div>
            </div>
          )}
        </div>
        <div class="flex flex-1 flex-col">
          <div class="flex items-center justify-between">
            <h3 class="font-medium">{thread.user.username}</h3>
            <div class="flex items-center gap-3">
              <div class="text-sm opacity-50">
                {formatDistanceToNow(thread.createdAt)}
              </div>
              <ActionsDropdown thread={thread} />
            </div>
          </div>
          <p>{thread.text}</p>

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
            <Like threadId={thread.id} isLiked={thread.isLiked} />
            <Reply thread={thread} />
            <Repost threadId={thread.id} reposted={thread.reposted} />
            <Share username={thread.user.username} threadId={thread.id} />
          </div>
          <div class="mt-2">
            {thread.likesCount ? <LikesModal thread={thread} /> : null}
          </div>
        </div>
      </header>
    </article>
  );
});
