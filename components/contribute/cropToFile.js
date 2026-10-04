const ALLOWED_OUTPUT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 900;

// Draws the selected crop region onto a fixed-size 4:3 canvas and returns a
// real File, same shape the native file input already produces, so nothing
// downstream (validation, upload) needs to know cropping happened.
export function cropToFile(imgEl, crop, originalFile) {
  const outputType = ALLOWED_OUTPUT_TYPES.has(originalFile.type) ? originalFile.type : "image/jpeg";

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_WIDTH;
  canvas.height = OUTPUT_HEIGHT;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgEl, crop.x, crop.y, crop.width, crop.height, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(new File([blob], originalFile.name, { type: outputType })),
      outputType,
      0.9
    );
  });
}
