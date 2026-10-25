import Link from "next/link";
import HomeIcon from "./icons/HomeIcon.js";
import ArchiveIcon from "./icons/ArchiveIcon.js";
import ContributeIcon from "./icons/ContributeIcon.js";
import BottomNavAccountTab from "./BottomNavAccountTab.js";

const baseTabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/contribute", label: "Contribute", Icon: ContributeIcon },
];
const myEntriesTab = { href: "/my-entries", label: "My Entries", Icon: ArchiveIcon };

export default function BottomNav({ pathname, user, isHidden }) {
  const tabs = user ? [...baseTabs, myEntriesTab] : baseTabs;

  return (
    <nav
      className={"bottom-nav" + (isHidden ? " bottom-nav-hidden" : "")}
      aria-label="Primary mobile"
    >
      {tabs.map(({ href, label, Icon }) => {
        const isActive = pathname === href;
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
