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
} from "~/shared/thread";
export default component$(() => {
  return (
    <div>
      <Navbar />
      <main class="mx-auto max-w-[620px] px-6">
        <Slot />
      </main>
    </div>
  );
});
