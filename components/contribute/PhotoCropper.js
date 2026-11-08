"use client";

import React from "react";
import { cropToFile } from "./cropToFile.js";
import CropWindow from "./CropWindow.js";
import useCropDrag from "./useCropDrag.js";

const colors = { teak: "#2E3B2A" };

export default function PhotoCropper({ imageUrl, originalFile, onConfirm }) {
  const imgRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [natural, setNatural] = React.useState(null);
  const { crop, initCrop, handlePointerDown, handlePointerMove, handlePointerUp } = useCropDrag(containerRef, natural);

  const attachCrop = React.useCallback(
    async (nextCrop) => {
      const cropped = await cropToFile(imgRef.current, nextCrop, originalFile);
      onConfirm(cropped);
    },
    [originalFile, onConfirm]
  );

  const handleImageLoad = () => {
    const img = imgRef.current;
    setNatural({ width: img.naturalWidth, height: img.naturalHeight });
    initCrop(img.naturalWidth, img.naturalHeight);
  };

  // The initial centered crop attaches as soon as it's known, so a photo is
  // saved even if the user never touches the crop box.
  React.useEffect(() => {
    if (crop) attachCrop(crop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [natural]);

  const handleDragEnd = () => {
    handlePointerUp();
    if (crop) attachCrop(crop);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handleDragEnd}
        onPointerLeave={handleDragEnd}
        style={{ position: "relative", width: "100%", maxWidth: 420, userSelect: "none", touchAction: "none" }}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Photo to crop"
          onLoad={handleImageLoad}
          style={{ display: "block", width: "100%", height: "auto", borderRadius: 10 }}
          draggable={false}
        />
        {crop && natural && (
          <CropWindow
            crop={crop}
            natural={natural}
            onPointerDownMove={handlePointerDown("move")}
            onPointerDownResize={handlePointerDown("resize")}
          />
        )}
      </div>

      <p style={{ margin: 0, fontSize: 12, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
        Drag inside the box to move it, drag the corner handle to resize. Your photo is saved automatically.
      </p>
    </div>
  );
}
