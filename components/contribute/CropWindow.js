export default function CropWindow({ crop, natural, onPointerDownMove, onPointerDownResize }) {
  const pct = {
    left: (crop.x / natural.width) * 100,
    top: (crop.y / natural.height) * 100,
    width: (crop.width / natural.width) * 100,
    height: (crop.height / natural.height) * 100,
  };
  const clip = `polygon(0 0, 0 100%, ${pct.left}% 100%, ${pct.left}% ${pct.top}%, ${pct.left + pct.width}% ${pct.top}%, ${pct.left + pct.width}% ${pct.top + pct.height}%, ${pct.left}% ${pct.top + pct.height}%, ${pct.left}% 100%, 100% 100%, 100% 0)`;

  return (
    <>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(29, 54, 39, 0.5)", pointerEvents: "none", clipPath: clip }} />
      <div
        onPointerDown={onPointerDownMove}
        style={{ position: "absolute", left: pct.left + "%", top: pct.top + "%", width: pct.width + "%", height: pct.height + "%", border: "2px solid #B88C4B", cursor: "move", boxSizing: "border-box" }}
      >
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            onPointerDownResize(e);
          }}
          style={{ position: "absolute", right: -8, bottom: -8, width: 18, height: 18, borderRadius: "50%", backgroundColor: "#B88C4B", border: "2px solid #FAF7F0", cursor: "nwse-resize" }}
        />
      </div>
    </>
  );
}
