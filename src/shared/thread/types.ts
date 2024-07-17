import type { Thread, User } from "@prisma/client";

export enum ReplyPrivacyType {
  ANYONE = "ANYONE",
  FOLLOWING = "FOLLOWING",
  MENTION = "MENTION",
}
export type ThreadType = Thread & {
  saved: boolean;
  liked: boolean;
  reposted: boolean;
  likesCount: number;
  repostsCount: number;
  repliesCount?: number;
  user: Pick<User, "id" | "username" | "image">;
  parentThread?: any;
};
