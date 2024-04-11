import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useGetPost = routeLoader$(({ params }) => {
  const threadId = params.threadId;
  // const isSaved = await isSavedThread(thread.id, session?.user.id);
  // const isLiked = await isLikedThread(thread.id, session?.user.id);
  // const likesCount = await getThreadLikesCount(thread.id);
  // const reposted = await hasRepostedThread(thread.id, session?.user.id);
  // const repostsCount = await getRepostsCount(thread.id);
});
export default component$(() => {
  return <div>Thread id</div>;
});
