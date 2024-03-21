import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import MoreIcon from "~/assets/icons/more.svg?jsx";
import { Logout } from "./logout";

const NavLink = component$(
  ({ href, label }: { href: string; label: string }) => (
    <li>
      <Link class="block w-full px-4 py-1 font-medium" href={href}>
        {label}
      </Link>
    </li>
  ),
);
export const NavDropdown = component$(() => {
  return (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="m-1 opacity-40 hover:opacity-100">
        <MoreIcon />
      </div>
      <ul
        tabIndex={0}
        class="dropdown-content z-[1] mt-4 w-44  rounded-xl   bg-base-100 shadow-md last:pb-2"
      >
        <NavLink href="/" label="Appearance" />
        <div class="divider m-0"></div>
        <NavLink href="/" label="Settings" />
        <div class="divider m-0"></div>
        <NavLink href="/saved/" label="Saved" />
        <div class="divider m-0"></div>
        <NavLink href="/" label="Your likes" />
        <div class="divider m-0"></div>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
});
