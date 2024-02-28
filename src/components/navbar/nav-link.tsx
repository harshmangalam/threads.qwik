import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

type NavLinkProps = {
  href: string;
};
export const NavLink = component$((props: NavLinkProps) => {
  const { href } = props;

  const locationSig = useLocation();

  return (
    <Link
      href={href}
      class="hover:bg-base-200 bg-base-100 mx-0.5 my-1 rounded-lg px-8 py-5"
    >
      {locationSig.url.pathname.includes(href) ? (
        <Slot name="activeIcon" />
      ) : (
        <Slot name="icon" />
      )}
    </Link>
  );
});
