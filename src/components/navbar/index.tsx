import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { NavLinks } from "./nav-links";
import { NavDropdown } from "./nav-dropdown";

export const Navbar = component$(() => {
  return (
    <header class="sticky top-0 z-50 bg-base-100">
      <nav class="container mx-auto h-[74px] w-full">
        <div class="grid h-full grid-cols-12">
          <section class=" col-span-3 flex items-center">
            <Logo />
          </section>

          <section class="col-span-6">
            <NavLinks />
          </section>

          <section class="col-span-3 flex items-center justify-end">
            <NavDropdown />
          </section>
        </div>
      </nav>
    </header>
  );
});
