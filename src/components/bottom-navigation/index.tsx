import { component$ } from "@builder.io/qwik";
import { NavLinks } from "../navbar/nav-links";

export const BottomNavigation = component$(() => {
  return (
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-base-100 py-3 md:hidden">
      <div class="flex h-12 w-full items-center ">
        <div class="mx-auto w-full max-w-2xl px-4">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
});
