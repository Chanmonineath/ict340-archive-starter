import Link from "next/link";
import HomeIcon from "./icons/HomeIcon.js";
import ArchiveIcon from "./icons/ArchiveIcon.js";
import ContributeIcon from "./icons/ContributeIcon.js";
import ReviewIcon from "./icons/ReviewIcon.js";
import BottomNavAccountTab from "./BottomNavAccountTab.js";
import isTabActive from "./isTabActive.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function BottomNav({ pathname, user, isReviewer, isHidden }) {
  const { t } = useLanguage();

  const baseTabs = [
    { href: "/", label: t.nav.home, Icon: HomeIcon },
    { href: "/contribute", label: t.nav.contribute, Icon: ContributeIcon },
  ];
  const myEntriesTab = { href: "/my-entries", label: t.nav.myEntries, Icon: ArchiveIcon };
  const reviewTab = { href: "/review", label: t.nav.review, Icon: ReviewIcon };

  const tabs = user
    ? [...baseTabs, myEntriesTab, ...(isReviewer ? [reviewTab] : [])]
    : baseTabs;

  return (
    <nav
      className={"bottom-nav" + (isHidden ? " bottom-nav-hidden" : "")}
      aria-label="Primary mobile"
    >
      {tabs.map(({ href, label, Icon }) => {
        const isActive = isTabActive(href, pathname);
        const handleClick = (e) => {
          if (href === "/" && isActive) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        };
        return (
          <Link
            key={href}
            href={href}
            onClick={handleClick}
            className={"bottom-nav-item" + (isActive ? " bottom-nav-item-active" : "")}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        );
      })}
      <BottomNavAccountTab user={user} pathname={pathname} />
    </nav>
  );
}
