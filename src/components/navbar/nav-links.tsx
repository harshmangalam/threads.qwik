import { component$ } from "@builder.io/qwik";
import HomeOutlineIcon from "~/components/icons/home-outline.svg?jsx";
import HomeIcon from "~/components/icons/home.svg?jsx";
import SearchOutlineIcon from "~/components/icons/search-outline.svg?jsx";
import SearchIcon from "~/components/icons/search-outline.svg?jsx";
import CreateIcon from "~/components/icons/create.svg?jsx";
import { NavLink } from "./nav-link";

export const NavLinks = component$(() => {
  return (
    <div class="flex items-center">
      <NavLink href="/">
        <HomeOutlineIcon q:slot="icon" class="h-7 w-7 opacity-40" />
        <HomeIcon q:slot="activeIcon" class="h-7 w-7 " />
      </NavLink>
      <NavLink href="/search/">
        <SearchOutlineIcon q:slot="icon" class="h-7 w-7 opacity-40" />
        <SearchIcon q:slot="activeIcon" class="h-7 w-7" />
      </NavLink>
      <button class="hover:bg-base-200 bg-base-100 mx-0.5 my-1 rounded-lg px-8 py-5">
        <CreateIcon class="h-7 w-7 opacity-40" />
      </button>
    </div>
  );
});
