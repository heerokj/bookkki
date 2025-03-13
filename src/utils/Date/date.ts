import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const getDistanceToNow = (createdTime: string) => {
  const timeAgo = formatDistanceToNow(new Date(createdTime), {
    addSuffix: true,
    locale: ko,
  });

  return timeAgo;
};
