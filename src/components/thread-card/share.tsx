import { component$ } from "@builder.io/qwik";
import ShareIcon from "~/assets/icons/share.svg?jsx";
export const Share = component$(() => {
  return (
    <button title="Reply" class="btn btn-circle btn-ghost btn-sm">
      <ShareIcon class="h-5 w-5" />
    </button>
  );
});
