import { server$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

export const getThreadsLikes = server$(async (threadId: string) => {
  const likes = await prisma.likedThreads.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  return likes;
});

export const getThreadsReposts = server$(async (threadId: string) => {
  const reposts = await prisma.reposts.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  return reposts;
});
