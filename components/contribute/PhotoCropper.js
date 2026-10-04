"use client";

import React from "react";
import { cropToFile } from "./cropToFile.js";
import CropWindow from "./CropWindow.js";
import useCropDrag from "./useCropDrag.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", cream: "#FAF7F0", button: "#2E5B3A" };

export default function PhotoCropper({ imageUrl, originalFile, onConfirm, onCancel }) {
  const imgRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [natural, setNatural] = React.useState(null);
  const { crop, initCrop, handlePointerDown, handlePointerMove, handlePointerUp } = useCropDrag(containerRef, natural);

  const handleImageLoad = () => {
    const img = imgRef.current;
    setNatural({ width: img.naturalWidth, height: img.naturalHeight });
    initCrop(img.naturalWidth, img.naturalHeight);
  };

  const handleConfirm = async () => {
    const cropped = await cropToFile(imgRef.current, crop, originalFile);
    onConfirm(cropped);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
        Drag inside the box to move it, drag the corner handle to resize.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: colors.teak, backgroundColor: colors.cream, border: "1px solid " + colors.silk, padding: "8px 16px", borderRadius: 9999, cursor: "pointer" }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!crop}
          style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: colors.cream, backgroundColor: colors.button, border: "none", padding: "8px 16px", borderRadius: 9999, cursor: "pointer" }}
        >
          Use This Crop
        </button>
      </div>
    </div>
  );
}
