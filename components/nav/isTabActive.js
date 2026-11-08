export default function isTabActive(href, pathname) {
  if (href === "/") return pathname === href;
  if (pathname.startsWith(href)) return true;
  if (href === "/my-entries" && pathname.startsWith("/entries/")) return true;
  return false;
}
