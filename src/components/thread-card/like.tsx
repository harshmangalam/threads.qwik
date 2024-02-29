import { component$ } from "@builder.io/qwik";
import LikeIcon from "~/assets/icons/heart.svg?jsx";
export const Like = component$(() => {
  return (
    <button title="Like" class="btn btn-circle btn-ghost btn-sm">
      <LikeIcon class="h-6 w-6 fill-none" />
    </button>
  );
});
