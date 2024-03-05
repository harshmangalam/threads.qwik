import { component$ } from "@builder.io/qwik";
import { ThreadCard } from "~/components/thread-card";

export default component$(() => {
  return (
    <div>
      <div class="grid grid-cols-1 gap-4">
        {[...new Array(6)].map(() => (
          <ThreadCard />
        ))}
      </div>
    </div>
  );
});
