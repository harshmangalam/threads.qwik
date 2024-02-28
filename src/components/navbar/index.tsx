import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { NavLinks } from "./nav-links";

export const Navbar = component$(() => {
  return (
    <header class="">
      <nav class="mx-auto h-[74px] w-full max-w-[1230px]">
        <div class="grid h-full grid-cols-12">
          <section class=" col-span-3 flex items-center">
            <Logo />
          </section>

          <section class=" col-span-6 flex items-center">
            <NavLinks />
          </section>

          <section class=" col-span-3"></section>
        </div>
      </nav>
    </header>
  );
});
