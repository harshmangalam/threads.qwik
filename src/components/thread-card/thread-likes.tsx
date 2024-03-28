import { component$ } from "@builder.io/qwik";
export const ThreadLikes = component$(
  ({ likesCount }: { likesCount: number }) => {
    return (
      <button title="Like" class="opacity-60">
        {likesCount} like
      </button>
    );
  },
);
