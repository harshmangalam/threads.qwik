import type { User } from "@prisma/client";

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
export enum StatusEnum {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  IDLE = "IDLE",
}

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

export type UserListType = Pick<User, "id" | "username" | "image" | "name"> & {
  isFollowing: boolean;
  shouldFollowBack: boolean;
};
