import { component$ } from "@builder.io/qwik";
import { UserCard } from "./user-card";
import { type UserSuggestionType } from "~/shared/users";

type UserSuggesionsProps = {
  users: UserSuggestionType[];
};
export const UserSuggestions = component$(({ users }: UserSuggesionsProps) => {
  return (
    <div>
      <h2 class="text-lg font-semibold">Suggested for you</h2>
      <div class="mt-4">
        <div class="carousel-center carousel gap-2 rounded-box">
          {users.map((user) => (
            <div key={user.id} class="carousel-item">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
