import { component$ } from "@builder.io/qwik";
import InstagramIcon from "~/assets/icons/instagram.svg?jsx";
export default component$(() => {
  return (
    <div>
      {/* profile details section  */}
      <section class="py-4">
        <div class="flex items-center gap-1">
          <div class="flex-1">
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl font-bold">Harsh Mangalam</h2>
              <div class="flex items-center gap-2">
                <div class="opacity-80">harshmangalam_</div>
                <div class="badge badge-ghost text-xs opacity-60">
                  threads.qwik
                </div>
              </div>
            </div>
          </div>

          <div class="flex-none">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img
                  width={96}
                  height={96}
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm opacity-90">
            All about graphic design, logo design, web design, UI/UX,
            photography, advertising, and art direction.
          </p>
        </div>
        <div class="mt-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm opacity-60">
            <div>13K followers</div>
            <div>·</div>
            <div>harshmangalam.dev</div>
          </div>
          <div>
            <a href="/" class="btn btn-circle btn-ghost btn-sm">
              <InstagramIcon class="h-5 w-5 fill-current" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
});