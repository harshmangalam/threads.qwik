import { component$ } from "@builder.io/qwik";
import { ActionsDropdown } from "./actions-dropdown";
import { Like } from "./like";

export const ThreadCard = component$(() => {
  return (
    <article>
      <header class="flex gap-3">
        <div class="mt-2 flex-none">
          <div class="avatar">
            <div class="w-9 rounded-full">
              <img
                width={36}
                height={36}
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col">
          <div class="flex items-center justify-between">
            <h3 class="font-medium">harshmangalam_</h3>
            <div class="flex items-center gap-3">
              <div class="opacity-50">1 w</div>
              <ActionsDropdown />
            </div>
          </div>
          <p class="text-sm">
            Ok so I’m telling you all before I post on ~the other app~ tomorrow
            but I rearranged my whole desk setup so that I’m facing the window
            and not the wall and I kinda love it 😍
          </p>

          <picture class="mt-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1705091981811-d75606c22ab8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
              alt="mewtru"
              width={400}
              height={400}
              class="aspect-square rounded-lg"
            />
          </picture>

          <div class="mt-4 flex items-center gap-2">
            <Like />
          </div>
        </div>
      </header>
    </article>
  );
});
