import { component$ } from "@builder.io/qwik";
import ReplyIcon from "~/assets/icons/reply.svg?jsx";
export const Reply = component$(() => {
  return (
    <button title="Reply" class="btn btn-circle btn-ghost btn-sm">
      <ReplyIcon class="h-5 w-5" />
    </button>
  );
});
