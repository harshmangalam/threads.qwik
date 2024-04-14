import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { NavLinks } from "./nav-links";
import { NavDropdown } from "./nav-dropdown";

export const Navbar = component$(() => {
  return (
    <header class="fixed left-0 right-0 top-0 z-50 bg-base-100">
      <nav class="container mx-auto h-16 w-full px-4 md:px-0">
        <div class="flex h-full items-center justify-between">
          <section class="flex flex-1 items-center justify-center md:flex-initial">
            <Logo />
          </section>

          <section class="hidden w-full max-w-md flex-1 px-4 md:flex">
            <NavLinks />
          </section>

          <section class="flex items-center justify-end">
            <NavDropdown />
          </section>
        </div>
      </nav>
    </header>
  );
});
