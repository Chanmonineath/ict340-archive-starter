import Link from "next/link";
import HomeIcon from "./icons/HomeIcon.js";
import CuratedIcon from "./icons/CuratedIcon.js";
import ArchiveIcon from "./icons/ArchiveIcon.js";
import ContributeIcon from "./icons/ContributeIcon.js";
import BottomNavAccountTab from "./BottomNavAccountTab.js";

const tabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/discover", label: "Curated", Icon: CuratedIcon },
  { href: "/archive", label: "Archive", Icon: ArchiveIcon },
  { href: "/contribute", label: "Contribute", Icon: ContributeIcon },
];

export default function BottomNav({ pathname, user, isHidden }) {
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
