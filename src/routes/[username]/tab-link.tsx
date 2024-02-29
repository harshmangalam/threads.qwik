import { Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import { useActiveRoute } from "~/hooks/use-active-route";
type NavLinkProps = LinkProps & { activeClass?: string };

export const TabLink = component$(({ href, ...props }: NavLinkProps) => {
  const isActive = useActiveRoute(href);

  return (
    <Link
      role="tab"
      {...props}
      href={href}
      class={[
        "tab font-medium opacity-60 ",
        { "tab-active opacity-100": isActive },
      ]}
    >
      <Slot />
    </Link>
  );
});
