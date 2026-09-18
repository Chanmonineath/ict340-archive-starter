"use client";

import React from "react";

// Owns everything about *turning pages* — which spread/leaf is showing, the
// page-flip animation state, and the next/prev/jump handlers — independent
// of what actually renders on a page. `spreads` is the already-measured
// layout from useMeasuredSpreads.
export default function useBookNavigation(spreads, initialRemedyId) {
  const totalSpreads = spreads.length;

  const [isOpen, setIsOpen] = React.useState(false);
  const [currentSpread, setCurrentSpread] = React.useState(0);
  const [turningDirection, setTurningDirection] = React.useState(null);
  const [isFlipping, setIsFlipping] = React.useState(false);
  // On phones only one leaf is shown at a time: "left" or "right" of the spread.
  const [side, setSide] = React.useState("left");
  const [isPhone, setIsPhone] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (initialRemedyId) {
      const target = spreads.findIndex(
        (s) => s.kind === "remedy" && s.entry.id === initialRemedyId && s.page === 0
      );
      if (target !== -1) {
        setIsOpen(true);
        setCurrentSpread(target);
        setSide("left");
      }
    }
  }, [initialRemedyId, spreads]);

  // A continuation sheet can have nothing on its right leaf; on phones that
  // leaf is skipped rather than shown blank.
  const hasRightLeaf = spreads[currentSpread].kind !== "remedy" || !!spreads[currentSpread].right;

  const atLastPage =
    currentSpread >= totalSpreads - 1 && (!isPhone || side === "right" || !hasRightLeaf);
  const atFirstPage = currentSpread <= 0 && (!isPhone || side === "left");

  const handleNextPage = React.useCallback(() => {
    if (isFlipping || atLastPage) return;

    // Phone: advance to the facing leaf before turning the sheet.
    if (isPhone && side === "left" && hasRightLeaf) {
      setSide("right");
      return;
    }

    setIsFlipping(true);
    setTurningDirection("next");

    setTimeout(() => {
      setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
      setSide("left");
      setIsFlipping(false);
      setTurningDirection(null);
    }, 400);
  }, [atLastPage, isFlipping, isPhone, side, totalSpreads, hasRightLeaf]);

  const handlePrevPage = React.useCallback(() => {
    if (isFlipping || atFirstPage) return;

    if (isPhone && side === "right") {
      setSide("left");
      return;
    }

    setIsFlipping(true);
    setTurningDirection("prev");

    const target = Math.max(currentSpread - 1, 0);
    const targetSpread = spreads[target];
    const targetHasRight = targetSpread.kind !== "remedy" || !!targetSpread.right;

    setTimeout(() => {
      setCurrentSpread(target);
      setSide(isPhone && targetHasRight ? "right" : "left");
      setIsFlipping(false);
      setTurningDirection(null);
    }, 400);
  }, [atFirstPage, currentSpread, isFlipping, isPhone, side, spreads]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNextPage, handlePrevPage]);

  const jumpToSpread = (spreadIndex) => {
    if (isFlipping || spreadIndex === currentSpread) return;
    setIsFlipping(true);
    setTurningDirection(spreadIndex > currentSpread ? "next" : "prev");

    setTimeout(() => {
      setCurrentSpread(spreadIndex);
      setSide("left");
      setIsFlipping(false);
      setTurningDirection(null);
    }, 380);
  };

  return {
    totalSpreads,
    isOpen,
    setIsOpen,
    currentSpread,
    turningDirection,
    isFlipping,
    side,
    isPhone,
    atLastPage,
    atFirstPage,
    handleNextPage,
    handlePrevPage,
    jumpToSpread,
  };
}
