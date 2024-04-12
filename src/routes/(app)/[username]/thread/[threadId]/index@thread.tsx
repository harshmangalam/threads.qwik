import type { Session } from "@auth/core/types";
import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { formatDistanceToNowStrict } from "date-fns";
import { ThreadCard } from "~/components/thread-card";
import { Like } from "~/components/thread-card/like";
import { Reply } from "~/components/thread-card/reply";
import { Repost } from "~/components/thread-card/repost";
import { Share } from "~/components/thread-card/share";
import { UserLikes } from "~/components/thread-card/user-activities/user-likes";
import { UserReposts } from "~/components/thread-card/user-activities/user-reposts";
import { Avatar } from "~/components/ui/avatar";
import {
  type ThreadType,
  getRepliesCount,
  getRepostsCount,
  getThreadLikesCount,
  hasRepostedThread,
  isLikedThread,
  isSavedThread,
} from "~/shared/thread";
import { prisma } from "~/utils/prisma";

export const useGetThread = routeLoader$(
  async ({ params, sharedMap, error }) => {
    const session: Session | null = sharedMap.get("session");
    const threadId = params.threadId;
    const saved = await isSavedThread(threadId, session?.user.id);
    const liked = await isLikedThread(threadId, session?.user.id);
    const likesCount = await getThreadLikesCount(threadId);
    const reposted = await hasRepostedThread(threadId, session?.user.id);
    const repostsCount = await getRepostsCount(threadId);
    const repliesCount = await getRepliesCount(threadId);

    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!thread) {
      throw error(404, "Thread not found");
    }

    const data = {
      ...thread,
      saved,
      liked,
      likesCount,
      reposted,
      repostsCount,
      repliesCount,
    } satisfies ThreadType;

    return data;
  },
);
export const useGetThreadReplies = routeLoader$(
  async ({ sharedMap, params }) => {
    const session: Session | null = sharedMap.get("session");
    const threadId = params.threadId;

    const replies = await prisma.thread.findMany({
      where: {
        isReply: true,
        parentThreadId: threadId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });
    const data: ThreadType[] = [];

    for await (const thread of replies) {
      const saved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      const repliesCount = await getRepliesCount(thread.id);

      data.push({
        ...thread,
        saved,
        liked,
        likesCount,
        reposted,
        repostsCount,
        repliesCount,
      });
    }

    return data;
  },
);
export default component$(() => {
  const thread = useGetThread();
  const replies = useGetThreadReplies();

  return (
    <div class="flex flex-col gap-4">
      <header class="flex items-center gap-3">
        <Avatar
          src={thread.value.user.image}
          size="md"
          rounded="rounded-full"
        />
        <Link
          href={`/${thread.value.user.username}`}
          class="font-medium hover:underline"
        >
          {thread.value.user.username}
        </Link>
        <div class="text-sm opacity-50">
          {formatDistanceToNowStrict(thread.value.createdAt)}
        </div>
      </header>
      <p>{thread.value.text}</p>
      <div class="flex items-center gap-3">
        <Like liked={thread.value.liked} threadId={thread.value.id} />
        <Reply thread={thread.value} />
        <Repost threadId={thread.value.id} reposted={thread.value.reposted} />
        <Share
          username={thread.value.user.username}
          threadId={thread.value.id}
        />
      </div>
      <div class="mt-2 flex items-center gap-2">
        {thread.value.repliesCount ? (
          <Link
            href={`/${thread.value.user.username}/thread/${thread.value.id}`}
            class="opacity-50"
          >
            {thread.value.repliesCount} replies
          </Link>
        ) : null}

        {thread.value.repliesCount && thread.value.likesCount ? (
          <span class="opacity-50">·</span>
        ) : null}

        {thread.value.likesCount ? (
          <UserLikes
            likesCount={thread.value.likesCount}
            thread={thread.value}
          />
        ) : null}
        {(thread.value.likesCount || thread.value.repliesCount) &&
        thread.value.repostsCount ? (
          <span class="opacity-50">·</span>
        ) : null}
        {thread.value.repostsCount ? (
          <UserReposts
            repostCount={thread.value.repostsCount}
            thread={thread.value}
          />
        ) : null}
      </div>

      <div class="divider"></div>

      <div class="grid grid-cols-1 gap-4">
        {replies.value.map((reply) => (
          <ThreadCard key={reply.id} thread={reply} />
        ))}
      </div>
    </div>
  );
});
