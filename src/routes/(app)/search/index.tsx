import { component$ } from "@builder.io/qwik";
import { SearchForm } from "./search-form";
import { User } from "./user";
import { useSearchUsers } from "~/shared/users";
export { useSearchUsers };
export default component$(() => {
  const searchUsers = useSearchUsers();
  return (
    <div>
      <SearchForm />
      <ul class="mt-6 flex flex-col">
        {searchUsers.value.map((user) => (
          <li key={user.id}>
            <User user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
});
