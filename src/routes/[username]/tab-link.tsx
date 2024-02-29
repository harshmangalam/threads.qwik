import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation, type LinkProps } from "@builder.io/qwik-city";

type NavLinkProps = LinkProps;

export const TabLink = component$(({ href, ...props }: NavLinkProps) => {
  const location = useLocation();

  return (
    <Link
      role="tab"
      {...props}
      href={href}
      class={`tab ${location.url.pathname.endsWith(href!) ? "tab-active" : ""}`}
    >
      <Slot />
    </Link>
  );
});
