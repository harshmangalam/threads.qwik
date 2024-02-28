import { component$ } from "@builder.io/qwik";
import HomeOutlineIcon from "~/assets/icons/home-outline.svg?jsx";
import HomeIcon from "~/assets/icons/home.svg?jsx";
import SearchOutlineIcon from "~/assets/icons/search-outline.svg?jsx";
import SearchIcon from "~/assets/icons/search-outline.svg?jsx";
import CreateIcon from "~/assets/icons/create.svg?jsx";
import NotificationOutlineIcon from "~/assets/icons/notification-outline.svg?jsx";
import NotificationIcon from "~/assets/icons/notification.svg?jsx";
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
      <button class="mx-0.5 my-1 rounded-lg bg-base-100 px-8 py-5 hover:bg-base-200">
        <CreateIcon class="h-7 w-7 opacity-40" />
      </button>
      <NavLink href="/activity/">
        <NotificationOutlineIcon q:slot="icon" class="h-7 w-7 opacity-40" />
        <NotificationIcon q:slot="activeIcon" class="h-7 w-7" />
      </NavLink>
    </div>
  );
});
