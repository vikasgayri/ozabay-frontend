import { useRef, useState } from "react";
import "./CNCDesignStudio.css";

const COLORS = ["#071a36", "#c9a45c", "#f6f1e8", "#8c6b4f", "#7f8f72", "#a94f45", "#d8bca0", "#ffffff"];

const CATEGORIES = [
  { id: "cabinet", title: "Cabinet & Wardrobe Panels", subtitle: "Carved doors, drawer fronts", icon: "▤" },
  { id: "headboard", title: "Bed & Headboard Designs", subtitle: "Carved headboards, bed panels", icon: "▰" },
  { id: "jali", title: "Furniture Jali & Partitions", subtitle: "Wooden lattice, screen panels", icon: "▦" },
  { id: "stonepanels", title: "Stone Furniture Panels", subtitle: "Stone reliefs and carved details", icon: "◇" },
];

const SKETCHES = [
  { id: "mandir", category: "devotional", name: "Mandir Back Panel", note: "Ornamental temple-inspired panel", items: [
    { type: "path", d: "M 245 420 L 245 245 Q 245 120 400 105 Q 555 120 555 245 L 555 420 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 6 },
    { type: "path", d: "M 285 420 L 285 255 Q 285 160 400 145 Q 515 160 515 255 L 515 420", fill: "none", stroke: "#c9a45c", strokeWidth: 3 },
    { type: "text", x: 400, y: 300, text: "ॐ", fill: "#071a36", fontSize: 76, fontFamily: "Georgia", anchor: "middle" },
  ]},
  { id: "jewellery", category: "jewellery", name: "Pendant Design", note: "Custom charm or pendant outline", items: [
    { type: "path", d: "M 400 145 C 345 195 305 240 305 295 C 305 365 350 410 400 430 C 450 410 495 365 495 295 C 495 240 455 195 400 145 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 6 },
    { type: "circle", cx: 400, cy: 285, r: 52, fill: "none", stroke: "#071a36", strokeWidth: 4 },
    { type: "text", x: 400, y: 300, text: "D", fill: "#071a36", fontSize: 42, fontFamily: "Georgia", anchor: "middle" },
  ]},
  { id: "nameplate", category: "nameplates", name: "Arch Nameplate", note: "A classic framed plaque", items: [
    { type: "path", d: "M 210 390 L 210 210 Q 210 115 305 115 L 495 115 Q 590 115 590 210 L 590 390 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "text", x: 400, y: 260, text: "YOUR NAME", fill: "#071a36", fontSize: 34, fontFamily: "Georgia", anchor: "middle" },
    { type: "text", x: 400, y: 305, text: "EST. 2026", fill: "#8c6b4f", fontSize: 15, fontFamily: "Arial", anchor: "middle" },
  ]},
  { id: "botanical", category: "homedecor", name: "Botanical Wall Art", note: "Nature-inspired wall motif", items: [
    { type: "path", d: "M 400 420 C 390 340 415 255 400 150 M 400 330 C 330 325 300 270 310 230 C 365 240 395 280 400 330 M 403 270 C 470 260 505 210 495 170 C 445 180 410 220 403 270 M 400 380 C 455 375 480 340 478 310 C 438 318 410 345 400 380", fill: "none", stroke: "#7f8f72", strokeWidth: 5 },
    { type: "circle", cx: 400, cy: 145, r: 13, fill: "#c9a45c", stroke: "#c9a45c", strokeWidth: 2 },
  ]},
  { id: "geometric", category: "furniture", name: "Geometric Jali", note: "Symmetrical cut-out panel concept", items: [
    { type: "rect", x: 230, y: 135, width: 340, height: 290, fill: "none", stroke: "#c9a45c", strokeWidth: 4 },
    { type: "path", d: "M 230 135 L 400 280 L 570 135 M 230 425 L 400 280 L 570 425 M 230 135 L 400 425 L 570 135 L 230 425 Z", fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "circle", cx: 400, cy: 280, r: 38, fill: "none", stroke: "#c9a45c", strokeWidth: 4 },
  ]},
  { id: "gift-tag", category: "gifts", name: "Personalised Gift Tag", note: "Custom tag with initials", items: [
    { type: "path", d: "M 300 175 L 475 175 L 530 230 L 530 385 Q 530 405 510 405 L 300 405 Q 280 405 280 385 L 280 195 Q 280 175 300 175 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "circle", cx: 475, cy: 220, r: 12, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "text", x: 395, y: 305, text: "YOUR INITIAL", fill: "#071a36", fontSize: 25, fontFamily: "Georgia", anchor: "middle" },
  ]},
];

// Additional ready-made vector templates for the category gallery.
const EXTRA_SKETCHES = [
  { id: "ganesh-panel", category: "devotional", name: "Ganesh Motif Panel", note: "Decorative motif for wood or suitable stone", materials: ["Wood", "Stone"], items: [
    { type: "circle", cx: 400, cy: 280, r: 115, fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "circle", cx: 400, cy: 280, r: 92, fill: "none", stroke: "#c9a45c", strokeWidth: 2 },
    { type: "text", x: 400, y: 300, text: "ॐ", fill: "#071a36", fontSize: 72, fontFamily: "Georgia", anchor: "middle" },
    { type: "path", d: "M 400 155 L 410 175 L 432 178 L 416 194 L 420 216 L 400 205 L 380 216 L 384 194 L 368 178 L 390 175 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 2 }
  ]},
  { id: "mandir-jaali", category: "devotional", name: "Mandir Jali Panel", note: "Geometric temple screen pattern", materials: ["Wood", "Stone"], items: [
    { type: "rect", x: 230, y: 115, width: 340, height: 330, fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "path", d: "M 230 170 L 400 280 L 570 170 M 230 390 L 400 280 L 570 390 M 285 115 L 400 445 L 515 115 M 285 445 L 400 115 L 515 445", fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "circle", cx: 400, cy: 280, r: 38, fill: "none", stroke: "#c9a45c", strokeWidth: 4 }
  ]},
  { id: "stone-relief", category: "devotional", name: "Stone Relief Frame", note: "Relief-style ornamental border concept", materials: ["Stone"], items: [
    { type: "rect", x: 225, y: 120, width: 350, height: 320, fill: "none", stroke: "#8c6b4f", strokeWidth: 8 },
    { type: "rect", x: 250, y: 145, width: 300, height: 270, fill: "none", stroke: "#c9a45c", strokeWidth: 3 },
    { type: "text", x: 400, y: 290, text: "शुभ", fill: "#071a36", fontSize: 52, fontFamily: "Georgia", anchor: "middle" }
  ]},
  { id: "wood-earring", category: "jewellery", name: "Wooden Earring Pair", note: "Lightweight cut-out concept", materials: ["Wood"], items: [
    { type: "path", d: "M 315 190 C 270 235 270 315 315 360 C 360 315 360 235 315 190 Z M 485 190 C 440 235 440 315 485 360 C 530 315 530 235 485 190 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "circle", cx: 315, cy: 180, r: 10, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "circle", cx: 485, cy: 180, r: 10, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "text", x: 315, y: 292, text: "D", fill: "#071a36", fontSize: 32, fontFamily: "Georgia", anchor: "middle" },
    { type: "text", x: 485, y: 292, text: "D", fill: "#071a36", fontSize: 32, fontFamily: "Georgia", anchor: "middle" }
  ]},
  { id: "stone-nameplate", category: "nameplates", name: "Stone Family Nameplate", note: "Engraved stone plaque concept", materials: ["Stone"], items: [
    { type: "rect", x: 205, y: 180, width: 390, height: 205, rx: 8, fill: "none", stroke: "#8c6b4f", strokeWidth: 8 },
    { type: "rect", x: 225, y: 200, width: 350, height: 165, rx: 5, fill: "none", stroke: "#c9a45c", strokeWidth: 2 },
    { type: "text", x: 400, y: 275, text: "YOUR FAMILY", fill: "#071a36", fontSize: 30, fontFamily: "Georgia", anchor: "middle" },
    { type: "text", x: 400, y: 315, text: "EST. 2026", fill: "#8c6b4f", fontSize: 16, fontFamily: "Arial", anchor: "middle" }
  ]},
  { id: "wood-nameplate", category: "nameplates", name: "Wooden Nameplate", note: "Classic wooden plaque", materials: ["Wood"], items: [
    { type: "path", d: "M 230 200 L 270 155 L 530 155 L 570 200 L 570 360 L 230 360 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 6 },
    { type: "text", x: 400, y: 270, text: "YOUR NAME", fill: "#071a36", fontSize: 34, fontFamily: "Georgia", anchor: "middle" },
    { type: "text", x: 400, y: 310, text: "WELCOME HOME", fill: "#8c6b4f", fontSize: 15, fontFamily: "Arial", anchor: "middle" }
  ]},
  { id: "stone-mandala", category: "homedecor", name: "Stone Mandala Relief", note: "Circular stone relief artwork concept", materials: ["Stone"], items: [
    { type: "circle", cx: 400, cy: 280, r: 130, fill: "none", stroke: "#8c6b4f", strokeWidth: 7 },
    { type: "circle", cx: 400, cy: 280, r: 95, fill: "none", stroke: "#c9a45c", strokeWidth: 3 },
    { type: "circle", cx: 400, cy: 280, r: 48, fill: "none", stroke: "#8c6b4f", strokeWidth: 4 },
    { type: "path", d: "M 400 150 L 425 235 L 510 190 L 445 260 L 530 280 L 445 300 L 510 370 L 425 325 L 400 410 L 375 325 L 290 370 L 355 300 L 270 280 L 355 260 L 290 190 L 375 235 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 3 }
  ]},
  { id: "wood-wall-flower", category: "homedecor", name: "Floral Wall Art", note: "Floral cut-out wall decoration", materials: ["Wood"], items: [
    { type: "circle", cx: 400, cy: 280, r: 35, fill: "none", stroke: "#c9a45c", strokeWidth: 4 },
    { type: "ellipse", cx: 400, cy: 220, rx: 28, ry: 52, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "ellipse", cx: 400, cy: 340, rx: 28, ry: 52, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "ellipse", cx: 340, cy: 280, rx: 52, ry: 28, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "ellipse", cx: 460, cy: 280, rx: 52, ry: 28, fill: "none", stroke: "#071a36", strokeWidth: 3 }
  ]},
  { id: "stone-jaali", category: "furniture", name: "Stone Geometric Panel", note: "Stone-carving pattern concept", materials: ["Stone"], items: [
    { type: "rect", x: 220, y: 130, width: 360, height: 300, fill: "none", stroke: "#8c6b4f", strokeWidth: 6 },
    { type: "path", d: "M 220 130 L 400 280 L 580 130 M 220 430 L 400 280 L 580 430 M 220 130 L 580 430 M 580 130 L 220 430", fill: "none", stroke: "#c9a45c", strokeWidth: 4 },
    { type: "circle", cx: 400, cy: 280, r: 45, fill: "none", stroke: "#071a36", strokeWidth: 4 }
  ]},
  { id: "wood-partition", category: "furniture", name: "Wooden Partition Jali", note: "Repeating geometric screen", materials: ["Wood"], items: [
    { type: "rect", x: 225, y: 120, width: 350, height: 330, fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "path", d: "M 225 200 L 310 120 L 400 200 L 490 120 L 575 200 M 225 365 L 310 450 L 400 365 L 490 450 L 575 365 M 225 200 L 225 365 M 310 120 L 310 450 M 400 200 L 400 365 M 490 120 L 490 450 M 575 200 L 575 365", fill: "none", stroke: "#071a36", strokeWidth: 3 }
  ]},
  { id: "stone-keepsake", category: "gifts", name: "Stone Keepsake Plaque", note: "Small engraved stone gift concept", materials: ["Stone"], items: [
    { type: "path", d: "M 270 170 L 530 170 L 560 205 L 560 355 L 530 390 L 270 390 L 240 355 L 240 205 Z", fill: "none", stroke: "#8c6b4f", strokeWidth: 6 },
    { type: "text", x: 400, y: 260, text: "WITH LOVE", fill: "#071a36", fontSize: 28, fontFamily: "Georgia", anchor: "middle" },
    { type: "text", x: 400, y: 310, text: "♡", fill: "#c9a45c", fontSize: 38, fontFamily: "Georgia", anchor: "middle" }
  ]},
  { id: "wood-gift-tag", category: "gifts", name: "Wooden Gift Tag", note: "Custom engraved tag concept", materials: ["Wood"], items: [
    { type: "path", d: "M 300 160 L 470 160 L 530 220 L 530 390 L 280 390 L 280 180 Z", fill: "none", stroke: "#c9a45c", strokeWidth: 5 },
    { type: "circle", cx: 470, cy: 205, r: 11, fill: "none", stroke: "#071a36", strokeWidth: 3 },
    { type: "text", x: 400, y: 300, text: "YOUR INITIAL", fill: "#071a36", fontSize: 25, fontFamily: "Georgia", anchor: "middle" }
  ]}
];

const IMAGE_TEMPLATES = [
  { id: "cabinet-jali-1", category: "cabinet", name: "Haveli Jali Cabinet Front", note: "Carved wooden furniture panel reference", materials: ["Wood"], imageUrl: "https://chairish-prod.freetls.fastly.net/image/product/sized/7402a11a-7b2d-43ec-9e0b-f013180662bd/artisan-haveli-jali-small-cabinet-5059?aspect=fit&height=900&width=900" },
  { id: "cabinet-floral-1", category: "cabinet", name: "Floral Mandala Cabinet Door", note: "Raised floral carving on a wooden door panel", materials: ["Wood"], imageUrl: "https://i.etsystatic.com/52092311/r/il/9e1163/7306197447/il_794xN.7306197447_on2t.jpg" },
  { id: "cabinet-geometric-1", category: "cabinet", name: "Geometric Carved Cupboard Front", note: "Geometric cut-outs for a furniture shutter", materials: ["Wood"], imageUrl: "https://www.grahamandgreen.co.uk/media/catalog/product/b/r/bra1018-azalea-4-door-sideboard---detail-5.jpg?bg-color=255%2C255%2C255&canvas=950%3A950&fit=bounds&height=950&quality=80&width=950" },
  { id: "cabinet-wardrobe-1", category: "cabinet", name: "Traditional Wardrobe Jali", note: "Repeating lattice and floral carved doors", materials: ["Wood"], imageUrl: "https://om-home-garden.com/cdn/shop/files/Swarali_hand_carved_mango_wood_wardrobe.jpg?v=1763391139&width=1200" },
  { id: "headboard-floral-1", category: "headboard", name: "Floral Relief Furniture Panel", note: "Carved panel detail that can inspire a headboard", materials: ["Wood"], imageUrl: "https://www.krvn.com.tr/dahalia-yatak2-komodin-160x200x185cm-new-04-03-2665389-55-B.jpg" },
  { id: "headboard-jali-1", category: "headboard", name: "Ornamental Timber Panel", note: "Traditional carved wood detail for a bed panel", materials: ["Wood"], imageUrl: "https://makemypiece.com.au/cdn/shop/files/AH-37-032-Orange-Tree-meble-indyjskie-4_jpg.webp?v=1709549090" },
  { id: "jali-wave-1", category: "jali", name: "Wave & Floral CNC Jali", note: "CNC-cut openwork pattern reference", materials: ["Wood"], imageUrl: "https://image.made-in-china.com/2f0j00laSGEiUrIMqP/Decorative-Wood-Partition-Carved-by-CNC.webp" },
  { id: "jali-sideboard-1", category: "jali", name: "Arabesque Furniture Jali", note: "Deep geometric cut-outs on a wooden furniture front", materials: ["Wood"], imageUrl: "https://www.kashidadesign.com/cdn/shop/products/Arabesque-Sideboard-3.jpg?v=1776080035&width=1200" },
  { id: "jali-cabinet-1", category: "jali", name: "Carved Sheesham Furniture Front", note: "Floral jali pattern on solid wood furniture", materials: ["Wood"], imageUrl: "https://makemypiece.com.au/cdn/shop/files/AH-37-032-Orange-Tree-meble-indyjskie-4_jpg.webp?v=1709549090" },
  { id: "stone-panel-1", category: "stonepanels", name: "Stone Relief Panel Concept", note: "Illustrative panel pattern; stone suitability needs review", materials: ["Stone"], items: [{ type: "rect", x: 220, y: 105, width: 360, height: 350, fill: "none", stroke: "#8c6b4f", strokeWidth: 8 }, { type: "rect", x: 245, y: 130, width: 310, height: 300, fill: "none", stroke: "#c9a45c", strokeWidth: 3 }, { type: "path", d: "M400 145 C330 190 310 235 400 280 C490 235 470 190 400 145 M400 280 C330 325 310 370 400 415 C490 370 470 325 400 280 M270 280 L530 280 M400 145 L400 415", fill: "none", stroke: "#8c6b4f", strokeWidth: 4 }] },
  { id: "stone-panel-2", category: "stonepanels", name: "Geometric Stone Furniture Detail", note: "Stone carving concept for a furniture insert", materials: ["Stone"], items: [{ type: "rect", x: 220, y: 120, width: 360, height: 320, fill: "none", stroke: "#8c6b4f", strokeWidth: 7 }, { type: "path", d: "M220 120 L400 280 L580 120 M220 440 L400 280 L580 440 M220 120 L580 440 M580 120 L220 440", fill: "none", stroke: "#c9a45c", strokeWidth: 4 }, { type: "circle", cx: 400, cy: 280, r: 42, fill: "none", stroke: "#8c6b4f", strokeWidth: 5 }] },
].map((design) => design.imageUrl ? ({ ...design, items: [{ type: "image", href: design.imageUrl, x: 190, y: 100, width: 420, height: 360, opacity: 1 }] }) : design);

const ALL_SKETCHES = IMAGE_TEMPLATES;

const uid = () => `design-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const hueFromHex = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  if (!delta) return 0;
  let hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return Math.round(hue * 60 + (hue < 0 ? 360 : 0));
};

const floodFillImage = (dataUrl, x, y, hexColor) => new Promise((resolve, reject) => {
  const image = new Image();
  // Allow pixel access for remote gallery images only when their host sends CORS headers.
  image.crossOrigin = "anonymous";
  image.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const start = (y * canvas.width + x) * 4;
      const target = [pixels[start], pixels[start + 1], pixels[start + 2], pixels[start + 3]];
      const color = [parseInt(hexColor.slice(1, 3), 16), parseInt(hexColor.slice(3, 5), 16), parseInt(hexColor.slice(5, 7), 16), 255];
      const tolerance = 34;
      if (target.every((v, i) => Math.abs(v - color[i]) < 3)) { resolve(dataUrl); return; }
      const matches = (idx) => Math.abs(pixels[idx] - target[0]) <= tolerance && Math.abs(pixels[idx + 1] - target[1]) <= tolerance && Math.abs(pixels[idx + 2] - target[2]) <= tolerance && Math.abs(pixels[idx + 3] - target[3]) <= tolerance;
      const stack = [[x, y]];
      const visited = new Uint8Array(canvas.width * canvas.height);
      while (stack.length) {
        const [px, py] = stack.pop();
        if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) continue;
        const pos = py * canvas.width + px;
        if (visited[pos]) continue;
        visited[pos] = 1;
        const idx = pos * 4;
        if (!matches(idx)) continue;
        // Tint the selected connected region instead of replacing it with a flat opaque colour.
        // Retain each source pixel's luminance/texture so printed motifs, highlights and shading remain visible.
        const sourceR = pixels[idx], sourceG = pixels[idx + 1], sourceB = pixels[idx + 2];
        const sourceLuma = 0.299 * sourceR + 0.587 * sourceG + 0.114 * sourceB;
        const colorLuma = 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
        const shade = Math.max(0.42, Math.min(1.45, sourceLuma / Math.max(1, colorLuma)));
        const tintedR = Math.min(255, color[0] * shade);
        const tintedG = Math.min(255, color[1] * shade);
        const tintedB = Math.min(255, color[2] * shade);
        // Blend tint with the original pixel to preserve fine surface detail.
        const tintStrength = 0.68;
        pixels[idx] = Math.round(sourceR * (1 - tintStrength) + tintedR * tintStrength);
        pixels[idx + 1] = Math.round(sourceG * (1 - tintStrength) + tintedG * tintStrength);
        pixels[idx + 2] = Math.round(sourceB * (1 - tintStrength) + tintedB * tintStrength);
        pixels[idx + 3] = color[3];
        stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    } catch (error) { reject(error); }
  };
  image.onerror = reject;
  image.src = dataUrl;
});

export default function CNCDesignStudio() {
  const svgRef = useRef(null);
  const fileRef = useRef(null);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("cabinet");
  const [studioView, setStudioView] = useState("editor");
  const [galleryMaterial, setGalleryMaterial] = useState("Wood");
  const [finish, setFinish] = useState("Natural finish");
  const [engraving, setEngraving] = useState("Raised / engraved look");
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [tool, setTool] = useState("select");
  const [color, setColor] = useState("#071a36");
  const [selectedId, setSelectedId] = useState(null);
  const [textValue, setTextValue] = useState("Your text");
  const [activePath, setActivePath] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [material, setMaterial] = useState("Wood");
  const [width, setWidth] = useState("300");
  const [height, setHeight] = useState("200");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const commit = (next) => {
    setPast((prev) => [...prev, items].slice(-40));
    setItems(next);
    setFuture([]);
    setSelectedId(null);
    setMessage("");
  };

  const undo = () => {
    if (!past.length) return;
    setFuture((prev) => [items, ...prev]);
    setItems(past[past.length - 1]);
    setPast((prev) => prev.slice(0, -1));
    setSelectedId(null);
  };

  const redo = () => {
    if (!future.length) return;
    setPast((prev) => [...prev, items].slice(-40));
    setItems(future[0]);
    setFuture((prev) => prev.slice(1));
    setSelectedId(null);
  };

  const pointFromEvent = (event) => {
    const bounds = svgRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(800, ((event.clientX - bounds.left) / bounds.width) * 800)),
      y: Math.max(0, Math.min(560, ((event.clientY - bounds.top) / bounds.height) * 560)),
    };
  };

  const onPointerDown = (event) => {
    if (tool !== "draw") return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const point = pointFromEvent(event);
    setDrawing(true);
    setActivePath(`M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`);
  };

  const onPointerMove = (event) => {
    if (!drawing || tool !== "draw") return;
    const point = pointFromEvent(event);
    setActivePath((path) => `${path} L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`);
  };

  const onPointerUp = () => {
    if (!drawing) return;
    setDrawing(false);
    if (activePath) commit([...items, { id: uid(), type: "path", d: activePath, fill: "none", stroke: color, strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" }]);
    setActivePath("");
  };

  const addText = () => {
    const value = textValue.trim();
    if (!value) return;
    commit([...items, { id: uid(), type: "text", x: 400, y: 280, text: value, fill: color, fontSize: 34, fontFamily: "Georgia", anchor: "middle" }]);
    setTool("select");
  };

  const addShape = (type) => {
    const base = type === "circle"
      ? { type, cx: 400, cy: 280, r: 65, fill: "none", stroke: color, strokeWidth: 4 }
      : type === "line"
        ? { type: "path", d: "M 250 280 L 550 280", fill: "none", stroke: color, strokeWidth: 4 }
        : { type: "rect", x: 280, y: 190, width: 240, height: 180, fill: "none", stroke: color, strokeWidth: 4 };
    commit([...items, { id: uid(), ...base }]);
  };

  const applySketch = (sketch) => {
    setActiveCategory(sketch.category);
    setGalleryMaterial(sketch.materials?.includes(galleryMaterial) ? galleryMaterial : (sketch.materials?.[0] || "Wood"));
    setStudioView("editor");
    commit(sketch.items.map((item) => ({ ...item, id: uid() })));
    setMessage(`${sketch.name} added to your canvas. Edit the text, colours, dimensions and finish to make it yours.`);
  };

  const uploadImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file (PNG, JPG or WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMessage("Please choose an image under 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      commit([...items, { id: uid(), type: "image", href: reader.result, x: 250, y: 160, width: 300, height: 240, opacity: 1 }]);
      setTool("select");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const fillImageAtClick = (item, event) => {
    event.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;
    const bounds = svg.getBoundingClientRect();
    const canvasX = ((event.clientX - bounds.left) / bounds.width) * 800;
    const canvasY = ((event.clientY - bounds.top) / bounds.height) * 560;
    const image = new Image();
    // Set CORS before src; without this, canvas pixel reads fail for cross-origin images.
    image.crossOrigin = "anonymous";
    image.onload = async () => {
      // The uploaded image is displayed inside its SVG box using preserveAspectRatio="meet".
      const scale = Math.min(item.width / image.naturalWidth, item.height / image.naturalHeight);
      const drawnWidth = image.naturalWidth * scale;
      const drawnHeight = image.naturalHeight * scale;
      const left = item.x + (item.width - drawnWidth) / 2;
      const top = item.y + (item.height - drawnHeight) / 2;
      const px = Math.floor(((canvasX - left) / drawnWidth) * image.naturalWidth);
      const py = Math.floor(((canvasY - top) / drawnHeight) * image.naturalHeight);
      if (px < 0 || py < 0 || px >= image.naturalWidth || py >= image.naturalHeight) return;
      try {
        const href = await floodFillImage(item.href, px, py, color);
        commit(items.map((current) => current.id === item.id ? { ...current, href, opacity: 1, filter: undefined } : current));
        setSelectedId(item.id);
        setMessage("Area recoloured. If the fill crosses boundaries, undo and try a more clearly outlined area.");
      } catch {
        setMessage("This image cannot be colour-filled by the browser (often because its host blocks CORS). Download the image and upload it here, then try Paint fill again. Best results come from images with clearly separated areas.");
      }
    };
    image.onerror = () => setMessage("Could not read this image. Please upload a PNG or JPG.");
    image.src = item.href;
  };

  const updateSelectedColor = (nextColor) => {
    setColor(nextColor);
    if (!selectedId) return;
    commit(items.map((item) => item.id === selectedId
      ? { ...item, ...(item.type === "image" ? { opacity: 1, filter: `sepia(1) saturate(2.5) hue-rotate(${hueFromHex(nextColor)}deg)` } : { fill: item.type === "text" ? nextColor : item.fill, stroke: item.type === "text" ? item.stroke : nextColor }) }
      : item));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    commit(items.filter((item) => item.id !== selectedId));
  };

  const renderItem = (item) => {
    const common = {
      key: item.id,
      onClick: (event) => {
        event.stopPropagation();
        if (tool === "fill" && item.type === "image") { fillImageAtClick(item, event); return; }
        setSelectedId(item.id);
      },
      className: selectedId === item.id ? "cnc-svg-item is-selected" : "cnc-svg-item",
    };
    if (item.type === "path") return <path {...common} d={item.d} fill={item.fill || "none"} stroke={item.stroke || color} strokeWidth={item.strokeWidth || 3} strokeLinecap={item.strokeLinecap || "round"} strokeLinejoin={item.strokeLinejoin || "round"} />;
    if (item.type === "rect") return <rect {...common} x={item.x} y={item.y} width={item.width} height={item.height} rx={item.rx || 0} fill={item.fill || "none"} stroke={item.stroke || color} strokeWidth={item.strokeWidth || 3} />;
    if (item.type === "circle") return <circle {...common} cx={item.cx} cy={item.cy} r={item.r} fill={item.fill || "none"} stroke={item.stroke || color} strokeWidth={item.strokeWidth || 3} />;
    if (item.type === "text") return <text {...common} x={item.x} y={item.y} fill={item.fill || color} fontSize={item.fontSize || 28} fontFamily={item.fontFamily || "Georgia"} textAnchor={item.anchor || "middle"}>{item.text}</text>;
    if (item.type === "image") return <image {...common} href={item.href} x={item.x} y={item.y} width={item.width} height={item.height} preserveAspectRatio="xMidYMid meet" opacity={item.opacity ?? 1} style={item.filter ? { filter: item.filter } : undefined} />;
    return null;
  };

  const downloadDesign = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.querySelectorAll(".cnc-svg-item.is-selected").forEach((node) => node.classList.remove("is-selected"));
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ozabay-custom-design.svg";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Design exported as SVG. CNC production suitability will need a separate review.");
  };

  const saveRequest = (event) => {
    event.preventDefault();
    const payload = {
      createdAt: new Date().toISOString(),
      category: activeCategory,
      finish,
      engraving,
      material,
      dimensions: { widthMm: width, heightMm: height },
      quantity,
      notes,
      designSvg: svgRef.current ? new XMLSerializer().serializeToString(svgRef.current) : "",
    };
    try {
      localStorage.setItem("ozabay-cnc-request-draft", JSON.stringify(payload));
      setMessage("Your design request draft has been saved in this browser. Connect a backend to receive customer submissions online.");
    } catch {
      setMessage("This design is too large to save locally. Export the SVG and attach it to your request.");
    }
  };

  return (
    <div className="cnc-studio">
      <div className="cnc-studio__intro">
        <div>
          <p className="eyebrow">OZABAY / CUSTOM CNC STUDIO</p>
          <h2>Bring your idea <em>to life.</em></h2>
          <p className="cnc-studio__lead">Upload your own furniture image and customise its colours. You can also draw, add text, and export your design.</p>
        </div>
        <div className="cnc-studio__stamp"><span>DESIGNED BY YOU</span><strong>01—03</strong><small>Custom · Considered · Crafted</small></div>
      </div>

      {studioView === "gallery" && <section className="cnc-category-section" aria-label="Choose a product category">
        <div className="cnc-category-heading"><div><p className="eyebrow">READY-MADE STARTING DESIGNS</p><h3>Choose a category, then a <em>design.</em></h3><p>Browse visual templates for wooden and stone products. Select any design to open it in the editor.</p></div><span className="cnc-category-count">{ALL_SKETCHES.length} STARTER DESIGNS</span></div>
        <div className="cnc-category-grid">
          {CATEGORIES.map((category) => <button type="button" key={category.id} className={`cnc-category-card ${activeCategory === category.id ? "is-active" : ""}`} onClick={() => { setActiveCategory(category.id); setMessage(""); }}>
            <span className="cnc-category-icon" aria-hidden="true">{category.icon}</span><span className="cnc-category-copy"><b>{category.title}</b><small>{category.subtitle}</small></span><span className="cnc-category-arrow">↗</span>
          </button>)}
        </div>
        <div className="cnc-gallery-toolbar"><div><b>{CATEGORIES.find((category) => category.id === activeCategory)?.title || "Designs"}</b><span>Choose the material you want to work with.</span></div><div className="cnc-material-toggle" role="group" aria-label="Filter designs by material">{["Wood", "Stone"].map((value) => <button type="button" key={value} className={galleryMaterial === value ? "is-active" : ""} onClick={() => setGalleryMaterial(value)}>{value}</button>)}</div></div>
        <div className="cnc-template-grid">
          {ALL_SKETCHES.filter((sketch) => sketch.category === activeCategory && sketch.materials.includes(galleryMaterial)).map((sketch) => <button type="button" key={sketch.id} className="cnc-template-card" onClick={() => applySketch(sketch)}>
            <span className="cnc-template-preview">{sketch.imageUrl ? <img className="cnc-template-photo" src={sketch.imageUrl} alt={sketch.name} loading="lazy" /> : <svg viewBox="0 0 800 560" aria-hidden="true"><rect width="800" height="560" fill="#fffdf9" />{sketch.items.map((item, index) => { const props = { key: `${sketch.id}-${index}`, fill: item.fill ?? "none", stroke: item.stroke ?? (galleryMaterial === "Stone" ? "#8c6b4f" : "#c9a45c"), strokeWidth: item.strokeWidth ?? 4, strokeLinecap: item.strokeLinecap ?? "round", strokeLinejoin: item.strokeLinejoin ?? "round" }; if (item.type === "path") return <path {...props} d={item.d} />; if (item.type === "rect") return <rect {...props} x={item.x} y={item.y} width={item.width} height={item.height} rx={item.rx || 0} />; if (item.type === "circle") return <circle {...props} cx={item.cx} cy={item.cy} r={item.r} />; if (item.type === "ellipse") return <ellipse {...props} cx={item.cx} cy={item.cy} rx={item.rx} ry={item.ry} />; if (item.type === "text") return <text {...props} x={item.x} y={item.y} fontSize={item.fontSize} fontFamily={item.fontFamily} textAnchor={item.anchor}>{item.text}</text>; return null; })}</svg>}<span className="cnc-template-material">{galleryMaterial}</span><span className="cnc-template-choose">Use this reference ↗</span></span>
            <span className="cnc-template-info"><b>{sketch.name}</b><small>{sketch.note}</small></span>
          </button>)}
        </div>
        {!ALL_SKETCHES.some((sketch) => sketch.category === activeCategory && sketch.materials.includes(galleryMaterial)) && <div className="cnc-gallery-empty">No templates for this material in this category yet. Choose the other material or add compatible designs later.</div>}
      </section>}

      {studioView === "editor" && <div className="cnc-editor-heading"><div><b>Upload & customise your image</b><span>Choose an image, select a colour, then click a connected area to fill it.</span></div></div>}

      {studioView === "editor" && <div className="cnc-studio__layout">
        <aside className="cnc-studio__sidebar">
          <div className="cnc-tool-group">
            <span className="cnc-tool-label">START WITH</span>
            <button className="cnc-tool-button" onClick={() => fileRef.current?.click()}><span>↥</span><b>Upload image</b><small>PNG, JPG, WEBP · up to 8 MB</small></button>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={uploadImage} hidden />

          </div>
          <div className="cnc-tool-group">
            <span className="cnc-tool-label">DRAWING TOOLS</span>
            <div className="cnc-tool-grid">
              <button className={tool === "select" ? "is-active" : ""} onClick={() => setTool("select")}><span>↖</span>Select</button>
              <button className={tool === "draw" ? "is-active" : ""} onClick={() => setTool("draw")}><span>✎</span>Pencil</button>
              <button className={tool === "fill" ? "is-active" : ""} onClick={() => { setTool("fill"); setMessage("Choose a colour, then click an enclosed area of an uploaded image."); }}><span>▰</span>Paint fill</button>
              <button onClick={() => addShape("rect")}><span>□</span>Rectangle</button>
              <button onClick={() => addShape("circle")}><span>○</span>Circle</button>
              <button onClick={() => addShape("line")}><span>／</span>Line</button>
              <button onClick={addText}><span>T</span>Add text</button>
            </div>
            <label className="cnc-field">Text to add<input value={textValue} onChange={(e) => setTextValue(e.target.value)} maxLength={70} placeholder="Type your text" /></label>
          </div>
          <div className="cnc-tool-group">
            <span className="cnc-tool-label">COLOUR PALETTE</span>
            <div className="cnc-colours">{COLORS.map((swatch) => <button key={swatch} type="button" aria-label={`Choose ${swatch}`} title={swatch} className={color === swatch ? "is-active" : ""} style={{ "--swatch": swatch }} onClick={() => updateSelectedColor(swatch)} />)}<label className="cnc-custom-colour" title="Choose custom colour"><span>＋</span><input aria-label="Choose custom colour" type="color" value={color} onChange={(e) => updateSelectedColor(e.target.value)} /></label></div>
            <p className="cnc-helper">Select an element to recolour it, or choose Paint fill and click an enclosed area of an uploaded image.</p>
          </div>
        </aside>

        <section className="cnc-studio__workarea">
          <div className="cnc-workbar">
            <div><span className="cnc-live-dot" /> DESIGN CANVAS <small>800 × 560</small></div>
            <div className="cnc-workbar__actions"><button onClick={undo} disabled={!past.length} title="Undo">↶</button><button onClick={redo} disabled={!future.length} title="Redo">↷</button><button onClick={deleteSelected} disabled={!selectedId} title="Delete selected">Delete</button><button onClick={() => { commit([]); setActivePath(""); }} title="Clear canvas">Clear</button></div>
          </div>
          <div className="cnc-canvas-wrap">
            <svg ref={svgRef} className={`cnc-canvas ${tool === "draw" ? "is-drawing" : ""}`} viewBox="0 0 800 560" role="img" aria-label="Custom design canvas" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClick={(e) => { if (e.target === svgRef.current) setSelectedId(null); }}>
              <rect width="800" height="560" fill="#fffdf9" />
              <defs><pattern id="cnc-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#e8e3d9" strokeWidth="1" /></pattern></defs>
              <rect width="800" height="560" fill="url(#cnc-grid)" />
              {items.map(renderItem)}
              {activePath && <path d={activePath} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />}
              {!items.length && !activePath && <g pointerEvents="none"><rect x="160" y="160" width="480" height="240" rx="4" fill="none" stroke="#c9a45c" strokeDasharray="5 8" strokeWidth="1.5"/><text x="400" y="265" textAnchor="middle" fill="#071a36" fontFamily="Georgia" fontSize="29">Your canvas awaits.</text><text x="400" y="300" textAnchor="middle" fill="#8b8e93" fontFamily="Arial" fontSize="14">Upload an image, choose a sketch, or start drawing.</text></g>}
            </svg>
          </div>
          <div className="cnc-canvas-footer"><span>{items.length} design element{items.length === 1 ? "" : "s"}</span><span>Click an element to select it · Pencil tool draws freely</span><button onClick={downloadDesign}>Export design ↗</button></div>
        </section>
      </div>}

      {studioView === "editor" && <form className="cnc-request" onSubmit={saveRequest}>
        <div className="cnc-request__heading"><p className="eyebrow">NEXT STEP</p><h3>Make it <em>real.</em></h3><p>Share a few details so the OzaBay team can review your custom request.</p></div>
        <div className="cnc-request__fields">
          <label className="cnc-field">Material<select value={material} onChange={(e) => setMaterial(e.target.value)}><option>Wood</option><option>Stone</option></select></label>
          <label className="cnc-field">Finish<select value={finish} onChange={(e) => setFinish(e.target.value)}><option>Natural finish</option><option>Polished</option><option>Matte</option><option>Antique look</option><option>Painted finish</option></select></label>
          <label className="cnc-field">Detail style<select value={engraving} onChange={(e) => setEngraving(e.target.value)}><option>Raised / engraved look</option><option>Fine line engraving</option><option>Decorative cut-out</option><option>Minimal clean edges</option></select></label>
          <label className="cnc-field">Width (mm)<input type="number" min="1" max="5000" required value={width} onChange={(e) => setWidth(e.target.value)} /></label>
          <label className="cnc-field">Height (mm)<input type="number" min="1" max="5000" required value={height} onChange={(e) => setHeight(e.target.value)} /></label>
          <label className="cnc-field">Quantity<input type="number" min="1" max="10000" required value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
          <label className="cnc-field cnc-field--wide">Additional instructions<textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} placeholder="Tell us about the finish, details, or anything else we should know." /></label>
        </div>
        <div className="cnc-request__bottom"><p>Custom designs are reviewed for manufacturability before a quote is confirmed.</p><button type="submit" className="cnc-submit">Save request draft <span>↗</span></button></div>
      </form>}
      {message && <p className="cnc-status" role="status">{message}</p>}
      <p className="cnc-studio__disclaimer">Prototype editor: requests are saved locally in this browser only. Online submissions and CNC-ready file generation require a connected backend and production workflow.</p>
    </div>
  );
}

