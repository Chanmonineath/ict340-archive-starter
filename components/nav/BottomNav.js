import Link from "next/link";
import HomeIcon from "./icons/HomeIcon.js";
import ArchiveIcon from "./icons/ArchiveIcon.js";
import ContributeIcon from "./icons/ContributeIcon.js";
import ReviewIcon from "./icons/ReviewIcon.js";
import BottomNavAccountTab from "./BottomNavAccountTab.js";
import isTabActive from "./isTabActive.js";

const baseTabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/contribute", label: "Contribute", Icon: ContributeIcon },
];
const myEntriesTab = { href: "/my-entries", label: "My Entries", Icon: ArchiveIcon };
const reviewTab = { href: "/review", label: "Review", Icon: ReviewIcon };

export default function BottomNav({ pathname, user, isReviewer, isHidden }) {
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
        return (
          <Link
            key={href}
            href={href}
            className={"bottom-nav-item" + (isActive ? " bottom-nav-item-active" : "")}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        );
      })}
      <BottomNavAccountTab user={user} />
    </nav>
  );
}
