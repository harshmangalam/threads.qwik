import { component$ } from "@builder.io/qwik";
import { UserFollow } from "~/components/user/user-follow";
import { useGetFollowers } from "~/shared/users/loaders";
export { useGetFollowers };
export default component$(() => {
  const users = useGetFollowers();
  return (
    <>
      {users.value.map((user) => (
        <UserFollow user={user} key={user.id} />
      ))}
    </>
  );
});
