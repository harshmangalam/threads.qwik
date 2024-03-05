import { component$ } from "@builder.io/qwik";
import MoreIcon from "~/assets/icons/more-bordered.svg?jsx";

export const MoreDropdown = component$(() => {
  return (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="btn btn-circle btn-ghost">
        <MoreIcon class="h-6 w-6" />
      </div>
      <ul
        tabIndex={0}
        class="menu  dropdown-content z-[1] w-44  rounded-xl   bg-base-100 shadow-md"
      >
        <li>
          <button>About this profile</button>
        </li>
        <li>
          <button>Mute</button>
        </li>
        <li>
          <button>Restrict</button>
        </li>
        <li>
          <button class="font-medium text-error">Block</button>
        </li>
      </ul>
    </div>
  );
});
