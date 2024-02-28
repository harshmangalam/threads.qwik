import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { NavLink } from "./nav-link";
import HomeOutlineIcon from "~/components/icons/home-outline.svg?jsx";
import HomeIcon from "~/components/icons/home.svg?jsx";
export const Navbar = component$(() => {
  return (
    <header class="">
      <nav class="mx-auto h-[74px] w-full max-w-[1230px]">
        <div class="grid h-full grid-cols-12">
          <section class=" col-span-3 flex items-center">
            <Logo />
          </section>

          <section class=" col-span-6 flex items-center">
            <NavLink href="/">
              <HomeOutlineIcon q:slot="icon" class="h-7 w-7 opacity-40" />
              <HomeIcon q:slot="activeIcon" class="h-7 w-7 " />
            </NavLink>
          </section>

          <section class=" col-span-3"></section>
        </div>
      </nav>
    </header>
  );
});
