"use client";

import React from "react";

// Hides the header on scroll-down and shows it again on scroll-up, but only
// below the mobile breakpoint (desktop/tablet nav always stays visible).
// `pauseWhile` (e.g. the mobile menu being open) suspends the hide behavior
// so the header can't disappear out from under an open menu.
export default function useAutoHideHeader({ pauseWhile }) {
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!mobileQuery.matches) {
        setIsHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (pauseWhile) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 80) {
        setIsHidden(false);
      } else if (delta > 0) {
        setIsHidden(true);
      } else if (delta < 0) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    const handleQueryChange = () => {
      if (!mobileQuery.matches) setIsHidden(false);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    mobileQuery.addEventListener("change", handleQueryChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileQuery.removeEventListener("change", handleQueryChange);
    };
  }, [pauseWhile]);

  return isHidden;
}
