import type { Session } from "@auth/core/types";
import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { BottomNavigation } from "~/components/bottom-navigation";
import { Navbar } from "~/components/navbar";

export const onRequest: RequestHandler = async ({
  next,
  sharedMap,
  redirect,
}) => {
  const session: Session | null = sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(302, "/login/");
  }
  await next();
};
export {
  useCreateThread,
  useDeleteThread,
  useUpdateReplyPrivacy,
  useSaveThread,
  useLikeThread,
  getThreadsLikes,
  useRepostThreads,
} from "~/shared/thread";

export { useFollowUser } from "~/shared/users";

export default component$(() => {
  return (
    <div>
      <Navbar />
      <main class="mx-auto min-h-screen max-w-2xl px-4 py-20">
        <Slot />
      </main>
      <BottomNavigation />
    </div>
  );
});
