import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAuthSignout } from "~/routes/plugin@auth";

export const Logout = component$(() => {
  const logout = useAuthSignout();
  return (
    <Form action={logout}>
      <input type="hidden" name="callbackUrl" value="/" />
      <button
        type="submit"
        class="flex  w-full justify-start px-4 py-1 font-medium"
      >
        Logout
      </button>
    </Form>
  );
});
