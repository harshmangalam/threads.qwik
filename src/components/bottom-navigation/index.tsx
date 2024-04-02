import { component$ } from "@builder.io/qwik";
import { NavLinks } from "../navbar/nav-links";

export const BottomNavigation = component$(() => {
  return (
    <nav class="fixed bottom-0 z-50  flex h-16 w-full items-center bg-base-100 md:hidden ">
      <div class="mx-auto w-full max-w-2xl px-4">
        <NavLinks />
      </div>
    </nav>
  );
});
