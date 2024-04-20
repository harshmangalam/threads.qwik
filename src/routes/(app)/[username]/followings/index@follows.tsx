import { component$ } from "@builder.io/qwik";
import { UserFollow } from "~/components/user/user-follow";
import { useGetFollowings } from "~/shared/users/loaders";
export { useGetFollowings };

export default component$(() => {
  const users = useGetFollowings();
  return (
    <>
      {users.value.map((user) => (
        <UserFollow user={user} key={user.id} />
      ))}
    </>
  );
});
