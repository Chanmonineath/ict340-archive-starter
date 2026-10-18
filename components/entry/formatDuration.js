export default function formatDuration(duration) {
  const match = /^(\d{0,2})h (\d{1,2})mn$/.exec(duration || "");
  if (!match) return duration;

  const hours = Number(match[1] || 0);
  const minutes = match[2];

  return hours > 0 ? `${hours}h ${minutes}mn` : `${minutes}mn`;
}
