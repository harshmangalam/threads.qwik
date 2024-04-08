import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { NavLinks } from "./nav-links";
import { NavDropdown } from "./nav-dropdown";

export const Navbar = component$(() => {
  return (
    <header class="fixed left-0 right-0 top-0 z-50 bg-base-100">
      <nav class="container mx-auto h-16 w-full px-6">
        <div class="grid h-full grid-cols-12">
          <section class="col-span-3 flex items-center">
            <div class="hidden md:block">
              <Logo />
            </div>
          </section>

          <section class="col-span-6 flex items-center justify-center">
            <div class="hidden md:block">
              <NavLinks />
            </div>
            <div class="flex items-center justify-center md:hidden">
              <Logo />
            </div>
          </section>

          <section class="col-span-3 flex items-center justify-end">
            <NavDropdown />
          </section>
        </div>
      </nav>
    </header>
  );
});
