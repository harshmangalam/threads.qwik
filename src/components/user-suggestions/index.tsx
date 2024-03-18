import { component$ } from "@builder.io/qwik";
import type { User } from "@prisma/client";

type UserSuggesionsProps = {
  users: User[];
};
export const UserSuggestions = component$(({ users }: UserSuggesionsProps) => {
  return (
    <div>
      <h2 class="text-lg font-semibold">Suggested for you</h2>
      <div class="mt-4">
        <div class="carousel carousel-center rounded-box">
          {users.map((user) => (
            <div key={user.id} class="carousel-item">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.username}
                  width={200}
                  height={200}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
