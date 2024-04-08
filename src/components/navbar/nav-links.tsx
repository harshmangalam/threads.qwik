import { component$ } from "@builder.io/qwik";
import HomeIcon from "~/assets/icons/home.svg?jsx";
import SearchIcon from "~/assets/icons/search.svg?jsx";
import CreateIcon from "~/assets/icons/create.svg?jsx";
import NotificationIcon from "~/assets/icons/heart.svg?jsx";
import ProfileIcon from "~/assets/icons/profile.svg?jsx";
import { NavLink } from "./nav-link";
import { CreateThread } from "../create-thread";
import { useAuthSession } from "~/routes/plugin@auth";

export const NavLinks = component$(() => {
  const session = useAuthSession();
  return (
    <div class="grid grid-cols-5 items-center justify-center md:flex">
      <NavLink href="/">
        <HomeIcon q:slot="icon" class="h-7 w-7 fill-none opacity-40" />
        <HomeIcon q:slot="activeIcon" class="h-7 w-7 " />
      </NavLink>
      <NavLink href="/search/">
        <SearchIcon q:slot="icon" class="h-7 w-7 opacity-40" />
        <SearchIcon q:slot="activeIcon" class="h-7 w-7" />
      </NavLink>
      <CreateThread>
        <button class="grid h-full w-full place-items-center rounded-lg bg-base-100 px-4 py-2 hover:bg-base-200 md:px-8 md:py-5">
          <CreateIcon class="h-7 w-7 opacity-40" />
        </button>
      </CreateThread>
      <NavLink href="/activity/">
        <NotificationIcon q:slot="icon" class="h-7 w-7 fill-none opacity-40" />
        <NotificationIcon q:slot="activeIcon" class="h-7 w-7" />
      </NavLink>
      <NavLink href={`/${session.value?.user.username}/`}>
        <ProfileIcon q:slot="icon" class="h-7 w-7 fill-none opacity-40" />
        <ProfileIcon q:slot="activeIcon" class="h-7 w-7 fill-current" />
      </NavLink>
    </div>
  );
});
