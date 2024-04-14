import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button } from "../ui/button";
import { useFollowUser } from "~/shared/users";

type FollowActionProps = {
  id: string;
  isFollowing: boolean;
  shouldFollowBack: boolean;
};
export const FollowAction = component$(
  ({ id, isFollowing, shouldFollowBack }: FollowActionProps) => {
    const followUser = useFollowUser();
    return (
      <Form action={followUser} class="w-full">
        <input type="hidden" name="userId" value={id} />
        <Button
          onClick$={async (ev) => {
            await ev.stopPropagation();
          }}
          fullWidth
          size="btn-sm"
          colorScheme={isFollowing ? "btn-ghost" : "btn-neutral"}
          loading={followUser.isRunning}
          type="submit"
          outline={isFollowing}
        >
          {isFollowing
            ? "Unfollow"
            : shouldFollowBack
              ? "Follow back"
              : "Follow"}
        </Button>
      </Form>
    );
  },
);
