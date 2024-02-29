import { component$ } from "@builder.io/qwik";
import MenuIcon from "~/assets/icons/menu-horiz.svg?jsx";

export const ActionsDropdown = component$(() => {
  return (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="btn btn-circle btn-ghost btn-sm">
        <MenuIcon class="h-6 w-6" />
      </div>
      <ul
        tabIndex={0}
        class="menu  dropdown-content z-[1] w-44  rounded-xl   bg-base-100 shadow-md"
      >
        <li>
          <button>Save</button>
        </li>
        <li>
          <button>Hide</button>
        </li>
        <li>
          <button>Mute</button>
        </li>
        <li>
          <button class="font-medium text-error">Unfollow</button>
        </li>
      </ul>
    </div>
  );
});
