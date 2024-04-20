import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  return (
    <div>
      <div role="tablist" class="tabs tabs-bordered">
        <Link
          href={`/${location.params.username}/followers`}
          role="tab"
          class={`tab ${location.url.pathname.includes("followers") ? "tab-active" : ""}`}
        >
          Followers
        </Link>
        <Link
          href={`/${location.params.username}/followings`}
          role="tab"
          class={`tab ${location.url.pathname.includes("followings") ? "tab-active" : ""}`}
        >
          Followings
        </Link>
      </div>

      <div class="mt-6 flex flex-col gap-2">
        <Slot />
      </div>
    </div>
  );
});
