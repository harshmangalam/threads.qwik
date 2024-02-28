import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import LogoIcon from "~/assets/icons/logo.svg?jsx";
export const Logo = component$(() => (
  <Link href="/">
    <LogoIcon class="h-8 w-8" />
  </Link>
));
