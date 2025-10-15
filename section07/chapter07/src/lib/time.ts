export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (secondDiff < 60) return "방금 전";

  const minuteDiff = Math.floor(secondDiff / 60);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
}
