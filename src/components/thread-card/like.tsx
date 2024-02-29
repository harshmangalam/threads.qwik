import { component$ } from "@builder.io/qwik";
import LikeIcon from "~/assets/icons/heart.svg?jsx";
export const Like = component$(() => {
  return (
    <button title="Like" class="btn btn-circle btn-ghost btn-sm">
      <LikeIcon class="h-5 w-5 fill-none" />
    </button>
  );
});
