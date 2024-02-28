import { Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import { useActiveRoute } from "~/hooks/use-active-route";
type NavLinkProps = LinkProps & { activeClass?: string };

export const NavLink = component$(({ href, ...props }: NavLinkProps) => {
  const isActive = useActiveRoute(href);

  return (
    <Link
      {...props}
      href={href}
      class={`hover:bg-base-200 bg-base-100 mx-0.5 my-1 rounded-lg px-8 py-5`}
    >
      {isActive ? <Slot name="activeIcon" /> : <Slot name="icon" />}
    </Link>
  );
});
