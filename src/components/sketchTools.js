// OzaBay image-to-sketch engine.
// Turns a photo into clean black line art on white, then fills enclosed areas with flat colour.
// The pixel functions are DOM-free so they can be unit-tested; the async helpers handle canvas I/O.

const MAX_SIDE = 1400;

/* ---------- pixel helpers (pure) ---------- */

const gaussianKernel = (sigma) => {
  const radius = Math.max(1, Math.ceil(sigma * 3));
  const kernel = new Float32Array(radius * 2 + 1);
  let sum = 0;
  for (let i = -radius; i <= radius; i++) {
    const v = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel[i + radius] = v;
    sum += v;
  }
  for (let i = 0; i < kernel.length; i++) kernel[i] /= sum;
  return { kernel, radius };
};

const blur = (src, w, h, sigma) => {
  const { kernel, radius } = gaussianKernel(sigma);
  const tmp = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        const xx = x + k < 0 ? 0 : x + k >= w ? w - 1 : x + k;
        acc += src[row + xx] * kernel[k + radius];
      }
      tmp[row + x] = acc;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        const yy = y + k < 0 ? 0 : y + k >= h ? h - 1 : y + k;
        acc += tmp[yy * w + x] * kernel[k + radius];
      }
      out[y * w + x] = acc;
    }
  }
  return out;
};

// Square dilation of a 0/1 mask by `r` pixels (separable max filter).
export const dilate = (mask, w, h, r) => {
  if (r <= 0) return mask.slice();
  const tmp = new Uint8Array(w * h);
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let on = 0;
      for (let k = -r; k <= r && !on; k++) {
        const xx = x + k;
        if (xx >= 0 && xx < w && mask[row + xx]) on = 1;
      }
      tmp[row + x] = on;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let on = 0;
      for (let k = -r; k <= r && !on; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < h && tmp[yy * w + x]) on = 1;
      }
      out[y * w + x] = on;
    }
  }
  return out;
};

// Remove connected line fragments smaller than `minSize` pixels (dust, texture noise).
const removeSpecks = (mask, w, h, minSize) => {
  if (minSize <= 1) return mask;
  const seen = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || seen[start]) continue;
    let head = 0, tail = 0;
    queue[tail++] = start;
    seen[start] = 1;
    while (head < tail) {
      const p = queue[head++];
      const x = p % w, y = (p - x) / w;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const n = ny * w + nx;
          if (mask[n] && !seen[n]) { seen[n] = 1; queue[tail++] = n; }
        }
      }
    }
    if (tail < minSize) for (let i = 0; i < tail; i++) mask[queue[i]] = 0;
  }
  return mask;
};

/**
 * Convert RGBA pixels into a binary line mask (1 = ink).
 * detail 1–10: how many edges to keep. weight 1–4: line thickness. cleanup 0–10: noise removal.
 */
export const sketchMaskFromPixels = (rgba, w, h, { detail = 5, weight = 2, cleanup = 4 } = {}) => {
  const gray = new Float32Array(w * h);
  for (let i = 0, p = 0; i < w * h; i++, p += 4) {
    const a = rgba[p + 3] / 255; // transparent pixels count as white paper
    gray[i] = (0.299 * rgba[p] + 0.587 * rgba[p + 1] + 0.114 * rgba[p + 2]) * a + 255 * (1 - a);
  }
  // Smooth texture first: more cleanup = softer image = fewer tiny wood-grain lines.
  const scale = Math.max(w, h) / 1000;
  const smooth = blur(gray, w, h, Math.max(0.8, (0.9 + cleanup * 0.22) * scale));

  // Sobel gradients.
  const mag = new Float32Array(w * h);
  const dir = new Uint8Array(w * h); // 0: horizontal edge normal, 1: 45°, 2: vertical, 3: 135°
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = -smooth[i - w - 1] - 2 * smooth[i - 1] - smooth[i + w - 1] + smooth[i - w + 1] + 2 * smooth[i + 1] + smooth[i + w + 1];
      const gy = -smooth[i - w - 1] - 2 * smooth[i - w] - smooth[i - w + 1] + smooth[i + w - 1] + 2 * smooth[i + w] + smooth[i + w + 1];
      mag[i] = Math.sqrt(gx * gx + gy * gy);
      let angle = (Math.atan2(gy, gx) * 180) / Math.PI;
      if (angle < 0) angle += 180;
      dir[i] = angle < 22.5 || angle >= 157.5 ? 0 : angle < 67.5 ? 1 : angle < 112.5 ? 2 : 3;
    }
  }

  // Non-maximum suppression: keep only the crest of each edge so lines come out thin and clean.
  const thin = new Float32Array(w * h);
  const floor = 18;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const m = mag[i];
      if (m < floor) continue;
      const d = dir[i];
      const a = d === 0 ? mag[i - 1] : d === 1 ? mag[i - w - 1] : d === 2 ? mag[i - w] : mag[i - w + 1];
      const b = d === 0 ? mag[i + 1] : d === 1 ? mag[i + w + 1] : d === 2 ? mag[i + w] : mag[i + w - 1];
      if (m >= a && m >= b) thin[i] = m;
    }
  }

  // Hysteresis thresholds taken from this photo's own edge strengths (adapts to every image).
  const strengths = [];
  for (let i = 0; i < thin.length; i++) if (thin[i] > 0) strengths.push(thin[i]);
  strengths.sort((p, q) => p - q);
  const keep = Math.min(0.92, 0.18 + detail * 0.07); // share of candidate edges kept: detail 1 → 25 %, 10 → 88 %
  const high = strengths.length ? strengths[Math.floor(strengths.length * (1 - keep))] : 255;
  const low = high * 0.45;

  let mask = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;
  for (let i = 0; i < thin.length; i++) if (thin[i] >= high) { mask[i] = 1; queue[tail++] = i; }
  while (head < tail) {
    const p = queue[head++];
    const x = p % w, y = (p - x) / w;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const n = ny * w + nx;
        if (!mask[n] && thin[n] >= low) { mask[n] = 1; queue[tail++] = n; }
      }
    }
  }

  // Remove isolated specks (wood grain, dust), then thicken to the chosen line weight.
  mask = removeSpecks(mask, w, h, Math.round((4 + cleanup * cleanup * 2.5) * scale));
  if (weight > 1) mask = dilate(mask, w, h, weight - 1);
  return mask;
};

/**
 * Flood-fill an enclosed area of a sketch with a flat colour.
 * colourRgba: current coloured sketch (modified in place). lineMask: 1 where ink is.
 * gap: pixels of line gap to bridge so paint doesn't leak through small breaks.
 * Returns the number of filled pixels, or 0 when the click landed on a line.
 */
export const fillSketchPixels = (colourRgba, lineMask, w, h, x, y, rgb, gap = 2) => {
  const barrier = gap > 0 ? dilate(lineMask, w, h, gap) : lineMask;
  let start = y * w + x;
  if (lineMask[start]) return 0;
  if (barrier[start]) {
    // Clicked inside the gap-bridging margin: step to the nearest open pixel.
    let best = -1;
    for (let r = 1; r <= gap + 2 && best < 0; r++) {
      for (let dy = -r; dy <= r && best < 0; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const n = ny * w + nx;
          if (!barrier[n]) { best = n; break; }
        }
      }
    }
    if (best < 0) return 0;
    start = best;
  }
  const sp = start * 4;
  const tr = colourRgba[sp], tg = colourRgba[sp + 1], tb = colourRgba[sp + 2];
  if (Math.abs(tr - rgb[0]) < 2 && Math.abs(tg - rgb[1]) < 2 && Math.abs(tb - rgb[2]) < 2) return 0;
  const same = (p) => {
    const q = p * 4;
    return Math.abs(colourRgba[q] - tr) <= 10 && Math.abs(colourRgba[q + 1] - tg) <= 10 && Math.abs(colourRgba[q + 2] - tb) <= 10;
  };

  const region = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;
  queue[tail++] = start;
  region[start] = 1;
  while (head < tail) {
    const p = queue[head++];
    const px = p % w;
    const neighbours = [px > 0 ? p - 1 : -1, px < w - 1 ? p + 1 : -1, p - w, p + w];
    for (const n of neighbours) {
      if (n < 0 || n >= w * h || region[n] || barrier[n] || !same(n)) continue;
      region[n] = 1;
      queue[tail++] = n;
    }
  }
  // Grow back into the bridging margin (up to the real line) so no white halo is left at the edges.
  for (let pass = 0; pass < gap + 1; pass++) {
    const grown = [];
    for (let p = 0; p < w * h; p++) {
      if (region[p] || lineMask[p] || !barrier[p] || !same(p)) continue;
      const px = p % w;
      if ((px > 0 && region[p - 1]) || (px < w - 1 && region[p + 1]) || (p >= w && region[p - w]) || (p + w < w * h && region[p + w])) grown.push(p);
    }
    if (!grown.length) break;
    for (const p of grown) region[p] = 1;
  }
  let filled = 0;
  for (let p = 0; p < w * h; p++) {
    if (!region[p]) continue;
    const q = p * 4;
    colourRgba[q] = rgb[0]; colourRgba[q + 1] = rgb[1]; colourRgba[q + 2] = rgb[2]; colourRgba[q + 3] = 255;
    filled++;
  }
  return filled;
};

/* ---------- photo quality check ---------- */

/**
 * Product-agnostic quality check (works the same for wood, stone or any material).
 * rgba/w/h: the photo scaled to at most 800 px. shortSide: the original photo's shorter side in pixels.
 * Returns { errors: [...], warnings: [...] } with customer-facing messages.
 */
export const assessPhotoPixels = (rgba, w, h, shortSide) => {
  const errors = [], warnings = [];
  const n = w * h;
  const gray = new Float32Array(n);
  let mean = 0;
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const a = rgba[p + 3] / 255;
    gray[i] = (0.299 * rgba[p] + 0.587 * rgba[p + 1] + 0.114 * rgba[p + 2]) * a + 255 * (1 - a);
    mean += gray[i];
  }
  mean /= n;
  const sorted = Float32Array.from(gray).sort();
  const at = (arr, q) => arr[Math.min(arr.length - 1, Math.floor(arr.length * q))];
  const range = at(sorted, 0.99) - at(sorted, 0.01);

  if (shortSide < 400) {
    errors.push({ code: "small", text: `The photo is too small (${shortSide}px). Please upload one that is at least 400px on its shorter side — ideally the original from your camera.` });
  }
  if (range < 50) {
    if (mean < 70) errors.push({ code: "dark", text: "The photo is too dark to trace. Take it again in daylight or with more light on the piece." });
    else if (mean > 200) errors.push({ code: "bright", text: "The photo is washed out (too bright). Avoid direct flash or sunlight glare and try again." });
    else errors.push({ code: "flat", text: "The photo has too little contrast for the outlines to be found. Use even lighting and a plain background." });
  }

  const mag = new Float32Array(n);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = -gray[i - w - 1] - 2 * gray[i - 1] - gray[i + w - 1] + gray[i - w + 1] + 2 * gray[i + 1] + gray[i + w + 1];
      const gy = -gray[i - w - 1] - 2 * gray[i - w] - gray[i - w + 1] + gray[i + w - 1] + 2 * gray[i + w] + gray[i + w + 1];
      mag[i] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  // Plain background: the outer frame of the photo (where the background is) should be nearly free of edges.
  // Plain white sheets, light walls and soft gradients score ~0–1 %; grass, gravel, rooms and clutter score 20 %+.
  const band = Math.round(Math.min(w, h) * 0.08);
  let busy = 0, frame = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      if (x > band && x < w - band && y > band && y < h - band) continue;
      frame++;
      if (mag[y * w + x] > 48) busy++;
    }
  }
  if (frame && busy / frame > 0.06) {
    errors.push({ code: "background", text: "The background is too busy (or the photo is very grainy), so it would be traced into the sketch. Place the piece on a plain white sheet or in front of a plain light wall, with nothing else in the photo." });
  }

  // Sharpness: strongest edge gradients relative to the photo's own contrast.
  // Blurry or heavily enlarged photos have soft edges and score low regardless of material.
  if (range >= 50) {
    const sharpness = at(Float32Array.from(mag).sort(), 0.995) / range;
    if (sharpness < 1.0) errors.push({ code: "blurry", text: "The photo is blurry. Hold the camera steady, tap to focus on the carving, and take the photo again." });
    else if (sharpness < 1.3) warnings.push({ code: "soft", text: "The photo is slightly soft, so some fine lines may be missed. A sharper photo gives a cleaner sketch." });
  }
  return { errors, warnings };
};

export class PhotoQualityError extends Error {
  constructor(report) {
    super("Photo quality check failed");
    this.name = "PhotoQualityError";
    this.report = report;
  }
}

const assessImage = (image) => {
  const ratio = Math.min(1, 800 / Math.max(image.naturalWidth, image.naturalHeight));
  const w = Math.max(1, Math.round(image.naturalWidth * ratio));
  const h = Math.max(1, Math.round(image.naturalHeight * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, w, h);
  return assessPhotoPixels(ctx.getImageData(0, 0, w, h).data, w, h, Math.min(image.naturalWidth, image.naturalHeight));
};

/* ---------- canvas I/O (browser) ---------- */

export const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

const hexToRgb = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];

const maskToCanvases = (mask, w, h) => {
  const lines = document.createElement("canvas");
  lines.width = w; lines.height = h;
  const coloured = document.createElement("canvas");
  coloured.width = w; coloured.height = h;
  const lctx = lines.getContext("2d");
  const cctx = coloured.getContext("2d");
  const lineData = lctx.createImageData(w, h);
  const colourData = cctx.createImageData(w, h);
  for (let i = 0, p = 0; i < w * h; i++, p += 4) {
    const ink = mask[i] === 1;
    // Line layer: opaque black ink on transparent. Colour layer starts as white paper with black ink.
    lineData.data[p] = 0; lineData.data[p + 1] = 0; lineData.data[p + 2] = 0; lineData.data[p + 3] = ink ? 255 : 0;
    const v = ink ? 17 : 255;
    colourData.data[p] = v; colourData.data[p + 1] = v; colourData.data[p + 2] = v; colourData.data[p + 3] = 255;
  }
  lctx.putImageData(lineData, 0, 0);
  cctx.putImageData(colourData, 0, 0);
  return { lineHref: lines.toDataURL("image/png"), href: coloured.toDataURL("image/png") };
};

/** Photo (data URL or same-origin URL) → { href, lineHref, width, height, report }. Throws PhotoQualityError for unclear photos. */
export const imageToSketch = async (src, options = {}, { skipQualityCheck = false } = {}) => {
  const image = await loadImage(src);
  const report = assessImage(image);
  if (report.errors.length && !skipQualityCheck) throw new PhotoQualityError(report);
  const ratio = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const w = Math.max(1, Math.round(image.naturalWidth * ratio));
  const h = Math.max(1, Math.round(image.naturalHeight * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h); // throws for cross-origin images without CORS
  const mask = sketchMaskFromPixels(data, w, h, options);
  let ink = 0;
  for (let i = 0; i < mask.length; i++) ink += mask[i];
  // A very dense sketch is hard to colour; suggest more Clean-up rather than rejecting textured wood or stone.
  if (ink / mask.length > 0.18) report.warnings.push({ code: "busy", text: "This photo has a lot of fine texture, so the sketch is busy. Raise “Clean-up” and press Regenerate for bigger areas to colour." });
  return { ...maskToCanvases(mask, w, h), width: w, height: h, report };
};

/** Fill the area under (x, y) of a sketch item. Returns the new coloured data URL, or null if nothing changed. */
export const fillSketch = async (href, lineHref, x, y, hexColour, gap) => {
  const [colourImg, lineImg] = await Promise.all([loadImage(href), loadImage(lineHref)]);
  const w = colourImg.naturalWidth, h = colourImg.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(lineImg, 0, 0);
  const lineData = ctx.getImageData(0, 0, w, h).data;
  const lineMask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) lineMask[i] = lineData[i * 4 + 3] > 127 ? 1 : 0;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(colourImg, 0, 0);
  const colourData = ctx.getImageData(0, 0, w, h);
  const filled = fillSketchPixels(colourData.data, lineMask, w, h, x, y, hexToRgb(hexColour), gap);
  if (!filled) return null;
  ctx.putImageData(colourData, 0, 0);
  return canvas.toDataURL("image/png");
};
