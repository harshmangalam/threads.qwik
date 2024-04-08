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
      class={`grid h-full w-full place-items-center rounded-lg bg-base-100 px-4 py-2 hover:bg-base-200 md:px-8 md:py-5`}
    >
      {isActive ? <Slot name="activeIcon" /> : <Slot name="icon" />}
    </Link>
  );
});
