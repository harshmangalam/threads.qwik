import type { Session } from "@auth/core/types";
import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
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
} from "~/shared/thread";

export { useFollowUser } from "~/shared/user";

export default component$(() => {
  return (
    <div>
      <Navbar />
      <main class="mx-auto max-w-[620px] px-6 py-4">
        <Slot />
      </main>
    </div>
  );
});
