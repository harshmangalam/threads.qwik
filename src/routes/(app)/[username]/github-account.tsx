import { component$ } from "@builder.io/qwik";
import GithubIcon from "~/assets/icons/github.svg?jsx";
export const GithubAccount = component$(
  ({ username }: { username: string }) => {
    const link = `https://github.com/${username}`;

    return (
      <div>
        <a target="_blank" href={link} class="btn btn-circle btn-ghost btn-sm">
          <GithubIcon class="h-6 w-6" />
        </a>
      </div>
    );
  },
);
