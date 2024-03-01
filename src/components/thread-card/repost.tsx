import { component$ } from "@builder.io/qwik";
import RepostIcon from "~/assets/icons/repost.svg?jsx";
export const Repost = component$(() => {
  return (
    <button title="Reply" class="btn btn-circle btn-ghost btn-sm">
      <RepostIcon class="h-5 w-5" />
    </button>
  );
});
