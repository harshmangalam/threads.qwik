import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import ShareIcon from "~/assets/icons/share.svg?jsx";
export const Share = component$(
  ({ threadId, username }: { threadId: string; username: string }) => {
    const show = useSignal(false);
    const location = useLocation();
    const handleShare = $(async () => {
      try {
        await navigator.clipboard.writeText(
          `${location.url.href}${username}/thread/${threadId}`,
        );
        show.value = true;
      } catch (error) {
        console.log(error);
      }
    });

    useTask$(({ track, cleanup }) => {
      track(() => show.value);
      const id = setTimeout(() => {
        if (show.value) {
          show.value = false;
        }
      }, 3000);

      cleanup(() => {
        clearTimeout(id);
      });
    });
    return (
      <>
        <button
          onClick$={handleShare}
          title="Reply"
          class="btn btn-circle btn-ghost btn-sm"
        >
          <ShareIcon class="h-5 w-5" />
        </button>

        {show.value && (
          <div class="toast z-50">
            <div class="alert alert-info">
              <span>Thread link copied!</span>
            </div>
          </div>
        )}
      </>
    );
  },
);
