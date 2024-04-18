import type { User } from "@prisma/client";

export type UserSuggestionType = User & {
  isFollowing: boolean;
  shouldFollowBack: boolean;
};
export type UserSearchType = Pick<
  User,
  "id" | "name" | "username" | "image"
> & {
  followersCount: number;
  isFollowing: boolean;
  shouldFollowBack: boolean;
};

export type UserListType = Pick<User, "id" | "username" | "image"> & {
  isFollowing: boolean;
  shouldFollowBack: boolean;
};
