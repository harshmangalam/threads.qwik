import { formatDistanceToNowStrict } from "date-fns";

export function getRelativeTime(date: Date) {
  return formatDistanceToNowStrict(date);
}
