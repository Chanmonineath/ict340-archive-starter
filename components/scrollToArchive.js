export default function scrollToArchive() {
  const target = document.getElementById("archive");
  if (!target) return false;

  const navHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-height")
  ) || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
