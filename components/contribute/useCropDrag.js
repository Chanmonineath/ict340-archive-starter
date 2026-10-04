"use client";

import React from "react";

const RATIO = 4 / 3;
const MIN_SIZE = 80;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Owns the crop window's position/size and the pan/resize pointer
// interactions. containerRef must point at the element the crop overlay is
// positioned against; natural is the image's { width, height } in pixels.
export default function useCropDrag(containerRef, natural) {
  const [crop, setCrop] = React.useState(null);
  const dragRef = React.useRef(null);

  const initCrop = (w, h) => {
    let cropW = w;
    let cropH = cropW / RATIO;
    if (cropH > h) {
      cropH = h;
      cropW = cropH * RATIO;
    }
    setCrop({ x: (w - cropW) / 2, y: (h - cropH) / 2, width: cropW, height: cropH });
  };

  const toImagePoint = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (natural.width / rect.width),
      y: (clientY - rect.top) * (natural.height / rect.height),
    };
  };

  const handlePointerDown = (mode) => (e) => {
    e.preventDefault();
    dragRef.current = { mode, start: toImagePoint(e.clientX, e.clientY), crop };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current || !natural) return;
    const { mode, start, crop: startCrop } = dragRef.current;
    const point = toImagePoint(e.clientX, e.clientY);
    const dx = point.x - start.x;
    const dy = point.y - start.y;

    if (mode === "move") {
      setCrop({
        ...startCrop,
        x: clamp(startCrop.x + dx, 0, natural.width - startCrop.width),
        y: clamp(startCrop.y + dy, 0, natural.height - startCrop.height),
      });
      return;
    }

    const maxWidth = Math.min(natural.width - startCrop.x, (natural.height - startCrop.y) * RATIO);
    const width = clamp(startCrop.width + dx, MIN_SIZE, maxWidth);
    setCrop({ ...startCrop, width, height: width / RATIO });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return { crop, initCrop, handlePointerDown, handlePointerMove, handlePointerUp };
}
