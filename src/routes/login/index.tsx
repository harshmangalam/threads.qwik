import { component$ } from "@builder.io/qwik";
import { useAuthSignin } from "../plugin@auth";
import { Form, type RequestHandler } from "@builder.io/qwik-city";
import { type Session } from "@auth/core/types";

export const onRequest: RequestHandler = async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  if (session && new Date(session.expires) > new Date()) {
    throw event.redirect(302, `/`);
  }
  await event.next();
};
export default component$(() => {
  const signIn = useAuthSignin();
  return (
    <div class="flex h-full min-h-screen flex-col items-center justify-center">
      <div class="max-w-max">
        <Form action={signIn}>
          <input type="hidden" name="providerId" value="github" />
          <button type="submit" class="btn btn-lg btn-block gap-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              />
            </svg>
            <span> Continue with Github</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="opacity-60"
            >
              <path
                fill="currentColor"
                d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
              />
            </svg>
          </button>
        </Form>
      </div>
    </div>
  );
});