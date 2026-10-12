import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import "./index.css";
import "./premium-upgrades.css";

const IMG = {
  terracotta: "/images/handmade-terracotta.jpg",
  blue: "/images/hero-vase.jpg",
  indigo: "/images/handmade-indigo-bowls.jpg",
  bowls: "/images/handmade-bowls.jpg",
  sculptural: "/images/handmade-sculptural-vase.jpg",
};

// Product images from public/images, organized by category.
const PRODUCT_IMAGES = {
  bluePottery: [
    "/images/bp1.jpg",
    "/images/bp2.jpg",
    "/images/bp3.jpg",
    "/images/bp4.jpg",
    "/images/bp5.jpg",
    "/images/bp6.jpg",
  ],
  ceramics: [
    "/images/ceramics1.jpg",
    "/images/ceramics2.jpg",
    "/images/ceramics3.jpg",
    "/images/ceramics4.jpg",
    "/images/ceramics5.jpg",
    "/images/ceramic6.jpg",
  ],
  metalcraft: [
    "/images/metalcraft1.jpg",
    "/images/mc2.jpg",
    "/images/mc3.jpg",
    "/images/mc4.jpg",
    "/images/mc5.jpg",
  ],
  terracotta: [
    "/images/teracotta1.jpg",
    "/images/teracotta2.jpg",
    "/images/teracotta3.jpg",
    "/images/teracotta4.jpg",
    "/images/teracotta5.jpg",
  ],
  textiles: [
    "/images/textile1.jpg",
    "/images/textile2.jpg",
    "/images/textile3.jpg",
    "/images/textile4.jpg",
    "/images/textile5.jpg",
    "/images/textile6.jpg",
  ],
  woodcraft: [
    "/images/wc1.jpg",
    "/images/wc2.jpg",
    "/images/wc3.jpg",
    "/images/wc4.jpg",
    "/images/wc5.jpg",
    "/images/wc6.jpg",
  ],
  homeDecor: [
    "/images/hd1.jpg",
    "/images/hd2.jpg",
    "/images/hd3.jpg",
    "/images/hd4.jpg",
    "/images/hd5.jpg",
    "/images/hd6.jpg",
    "/images/hd7.jpg",
    "/images/hd8.jpg",
  ],
};

const VIDEOS = {
  craft: "/videos/ozabay-craft-film.mp4",
  detail: "/videos/ozabay-detail-film.mp4",
  artisanA: "https://videos.pexels.com/video-files/37306917/15802972_1920_1080_25fps.mp4",
  artisanB: "https://videos.pexels.com/video-files/9363486/9363486-hd_1920_1080_25fps.mp4",
};

const BASE_PRODUCTS = [
  ["Mitti Sculptural Vase", "Ceramics", 3800, PRODUCT_IMAGES.ceramics[0], "Jaipur", "Meera Kumari"],
  ["Jaipur Blue Pottery Vase", "Blue Pottery", 6900, PRODUCT_IMAGES.bluePottery[0], "Jaipur", "Aarav Khan"],
  ["Neel Indigo Bowl Set", "Ceramics", 4200, PRODUCT_IMAGES.ceramics[1], "Khurja", "Farida Ansari"],
  ["Mitti Hand-Finished Bowl", "Ceramics", 3250, PRODUCT_IMAGES.ceramics[2], "Jaipur", "Meera Kumari"],
  ["Rekh Artisan Bowl", "Ceramics", 1650, PRODUCT_IMAGES.ceramics[3], "Khurja", "Raghav Sharma"],
  ["Aaroh Sculptural Vessel", "Terracotta", 2950, PRODUCT_IMAGES.terracotta[0], "Molela", "Devendra Prajapat"],
  ["Surya Blue Serving Platter", "Blue Pottery", 4800, PRODUCT_IMAGES.bluePottery[1], "Jaipur", "Aarav Khan"],
  ["Neel Lotus Dessert Plate", "Blue Pottery", 2200, PRODUCT_IMAGES.bluePottery[2], "Jaipur", "Aarav Khan"],
  ["Gulabi Hand-Painted Jar", "Blue Pottery", 3600, PRODUCT_IMAGES.bluePottery[3], "Jaipur", "Meera Kumari"],
  ["Chandni Indigo Carafe", "Ceramics", 3900, PRODUCT_IMAGES.ceramics[4], "Khurja", "Farida Ansari"],
  ["Dhoop Terracotta Planter", "Terracotta", 2400, PRODUCT_IMAGES.terracotta[1], "Molela", "Devendra Prajapat"],
  ["Mitti Ripple Planter", "Terracotta", 2800, PRODUCT_IMAGES.terracotta[2], "Molela", "Devendra Prajapat"],
  ["Kansa Dawn Tumbler Set", "Metalcraft", 5200, PRODUCT_IMAGES.metalcraft[0], "Moradabad", "Raghav Sharma"],
  ["Rekh Hammered Brass Bowl", "Metalcraft", 4400, PRODUCT_IMAGES.metalcraft[1], "Moradabad", "Raghav Sharma"],
  ["Suraj Brass Candle Holder", "Metalcraft", 3100, PRODUCT_IMAGES.metalcraft[2], "Moradabad", "Raghav Sharma"],
  ["Noor Kansa Thali", "Metalcraft", 7600, PRODUCT_IMAGES.metalcraft[3], "Moradabad", "Raghav Sharma"],
  ["Ganga Handloom Runner", "Textiles", 2850, PRODUCT_IMAGES.textiles[0], "Varanasi", "Farida Ansari"],
  ["Mogra Block-Print Cushion", "Textiles", 1450, PRODUCT_IMAGES.textiles[1], "Jaipur", "Sana Sheikh"],
  ["Neel Indigo Table Runner", "Textiles", 2350, PRODUCT_IMAGES.textiles[2], "Bagru", "Sana Sheikh"],
  ["Kashvi Handwoven Throw", "Textiles", 4900, PRODUCT_IMAGES.textiles[3], "Kutch", "Farida Ansari"],
  ["Rangrez Cotton Napkin Set", "Textiles", 1250, PRODUCT_IMAGES.textiles[4], "Bagru", "Sana Sheikh"],
  ["Gulnaar Loom Cushion Pair", "Textiles", 2100, PRODUCT_IMAGES.textiles[5], "Varanasi", "Farida Ansari"],
  ["Neem Carved Serving Board", "Woodcraft", 3300, PRODUCT_IMAGES.woodcraft[0], "Saharanpur", "Imran Qureshi"],
  ["Aranya Teak Tray", "Woodcraft", 4200, PRODUCT_IMAGES.woodcraft[1], "Saharanpur", "Imran Qureshi"],
  ["Koyal Carved Candle Stand", "Woodcraft", 1950, PRODUCT_IMAGES.woodcraft[2], "Saharanpur", "Imran Qureshi"],
  ["Vanam Wooden Bowl", "Woodcraft", 2700, PRODUCT_IMAGES.woodcraft[3], "Kerala", "Anil Menon"],
  ["Sandalwood Keepsake Box", "Woodcraft", 3650, PRODUCT_IMAGES.woodcraft[4], "Mysuru", "Anil Menon"],
  ["Kashish Carved Mirror Frame", "Woodcraft", 5800, PRODUCT_IMAGES.woodcraft[5], "Saharanpur", "Imran Qureshi"],
  ["Aangan Stoneware Lamp", "Home Décor", 6200, PRODUCT_IMAGES.homeDecor[0], "Khurja", "Farida Ansari"],
  ["Chaand Ceramic Incense Holder", "Home Décor", 1350, PRODUCT_IMAGES.homeDecor[1], "Jaipur", "Meera Kumari"],
  ["Raat Indigo Table Lamp", "Home Décor", 5400, PRODUCT_IMAGES.homeDecor[2], "Khurja", "Farida Ansari"],
  ["Mitti Sculptural Candle Trio", "Home Décor", 2400, PRODUCT_IMAGES.homeDecor[3], "Molela", "Devendra Prajapat"],
  ["Gulab Stoneware Vase", "Home Décor", 4550, PRODUCT_IMAGES.homeDecor[4], "Khurja", "Meera Kumari"],
  ["Aaranya Reed Basket", "Home Décor", 3150, PRODUCT_IMAGES.homeDecor[5], "Assam", "Sana Sheikh"],
  ["Neel Hand-Painted Urn", "Home Décor", 5900, PRODUCT_IMAGES.homeDecor[6], "Jaipur", "Aarav Khan"],
  ["Dastkaar Wall Plate", "Home Décor", 2750, PRODUCT_IMAGES.homeDecor[7], "Jaipur", "Meera Kumari"],
  ["Mitti Hand-Thrown Urn", "Ceramics", 4100, PRODUCT_IMAGES.ceramics[5], "Jaipur", "Meera Kumari"],
  ["Jal Neel Lotus Bowl", "Blue Pottery", 2950, PRODUCT_IMAGES.bluePottery[4], "Jaipur", "Aarav Khan"],
  ["Moradabad Hammered Lota", "Metalcraft", 3950, PRODUCT_IMAGES.metalcraft[4], "Moradabad", "Raghav Sharma"],
  ["Molela Earth Planter", "Terracotta", 2600, PRODUCT_IMAGES.terracotta[3], "Molela", "Devendra Prajapat"],
  ["Molela Sun Vessel", "Terracotta", 3450, PRODUCT_IMAGES.terracotta[4], "Molela", "Devendra Prajapat"],
  ["Blue Pottery Accent Plate", "Blue Pottery", 3200, PRODUCT_IMAGES.bluePottery[5], "Jaipur", "Aarav Khan"],
].map(([name, category, price, image, city, artisan], i) => ({
  id: i + 1,
  name,
  category,
  priceValue: price,
  price: `₹${price.toLocaleString("en-IN")}`,
  image,
  city,
  artisan,
  material:
    category === "Metalcraft"
      ? "Brass / Kansa"
      : category === "Textiles"
      ? "Handwoven cotton"
      : category === "Woodcraft"
      ? "Indian hardwood"
      : category === "Terracotta"
      ? "Fired earth"
      : category === "Home Décor"
      ? "Mixed natural materials"
      : "Ceramic clay",
  description:
    "A small-batch handmade piece from an independent Indian maker. Natural variation is part of its character.",
  rating: (4.6 + (i % 4) * 0.1).toFixed(1),
  dimensions: ["12 × 8 in", "10 × 10 in", "16 × 16 in"][i % 3],
  care: category === "Textiles" ? "Gentle dry clean" : "Wipe with a soft dry cloth",
  story: `Shaped in ${city} and finished by ${artisan}. The piece carries small marks of the hand, making every edition subtly different.`,
}));


// Product data supplied in the Gninee Gems Web Upload workbook.
const BANGLES_PRODUCTS = [
  {
    "id": 2001,
    "name": "Meenakari Peacock Design 22 Carat Gold Plated Bangles – Set of Two",
    "sku": "JB-001",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 650.0,
    "price": "₹650",
    "regularPriceValue": 812.0,
    "regularPrice": "₹812",
    "image": "/images/bangles/bangle-01.png",
    "galleryImage": "/images/bangles/bangle-01-2.png",
    "viewerImage": "/images/bangles/bangle-01-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Add elegance to your traditional jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Bangles – Set of Two. Featuring detailed hand-painted meenakari enamel work, these bangles highlight beautiful peacock and floral designs inspired by Indian heritage craftsmanship.\n\nCrafted with a rich 22 carat gold plated finish, this bangle set offers a luxurious appearance along with excellent durability. The high-quality enamel work helps maintain colour and shine for 5 to 10 years with proper care, making them perfect for long-term festive and occasion wear.\n\nIdeal for weddings, festivals, and ethnic celebrations, these bangles pair effortlessly with sarees, lehengas, and traditional outfits. Their refined design and lasting beauty make them a timeless addition to any jewellery collection.",
    "shortDescription": "●Premium Gold Finish\n22 carat gold plated for a rich, radiant traditional look\n\n●Hand-Painted Meenakari Art\nIntricate enamel detailing featuring graceful peacock and floral motifs\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as single bangle or pair",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Add elegance to your traditional jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Bangles – Set of Two. Featuring detailed hand-painted meenakari enamel work, these bangles highlight beautiful peacock and floral designs inspired by Indian heritage craftsmanship.\n\nCrafted with a rich 22 carat gold plated finish, this bangle set offers a luxurious appearance along with excellent durability. The high-quality enamel work helps maintain colour and shine for 5 to 10 years with proper care, making them perfect for long-term festive and occasion wear.\n\nIdeal for weddings, festivals, and ethnic celebrations, these bangles pair effortlessly with sarees, lehengas, and traditional outfits. Their refined design and lasting beauty make them a timeless addition to any jewellery collection.",
    "metaDescription": "Premium meenakari peacock design 22 carat gold plated bangles set of two with hand painted enamel work and long lasting shine.",
    "seoTitle": "Meenakari Peacock Design Gold Plated Bangles (Set of Two)"
  },
  {
    "id": 2002,
    "name": "Meenakari Peacock Design Purple 22 Carat Gold Plated Bangles – Set of Two",
    "sku": "JB-002",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 650.0,
    "price": "₹650",
    "regularPriceValue": 812.0,
    "regularPrice": "₹812",
    "image": "/images/bangles/bangle-02.png",
    "galleryImage": "/images/bangles/bangle-02-2.png",
        "viewerImage": "/images/bangles/bangle-02-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Add a vibrant touch of tradition to your jewellery collection with our Meenakari Peacock Design Purple 22 Carat Gold Plated Bangles – Set of Two. Crafted with intricate hand-painted meenakari enamel work, these bangles showcase elegant peacock and floral designs on a rich purple base, reflecting timeless Indian artistry.\n\nFinished with a premium 22 carat gold plated layer, this bangle set offers a luxurious traditional appearance along with excellent durability. The high-quality enamel detailing is designed to retain its colour and brilliance for 5 to 10 years with proper care, making it perfect for long-term festive and occasion wear.\n\nIdeal for weddings, festivals, and ethnic celebrations, these bangles beautifully complement sarees, lehengas, and traditional outfits. Their colourful craftsmanship and lasting shine make them a standout addition to any traditional jewellery collection.",
    "shortDescription": "●Premium Gold Finish\n22 carat gold plated for a rich and elegant traditional appearance\n\n●Hand-Painted Meenakari Art\nDetailed enamel work featuring colourful peacock and floral designs on a vibrant purple base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Add a vibrant touch of tradition to your jewellery collection with our Meenakari Peacock Design Purple 22 Carat Gold Plated Bangles – Set of Two. Crafted with intricate hand-painted meenakari enamel work, these bangles showcase elegant peacock and floral designs on a rich purple base, reflecting timeless Indian artistry.\n\nFinished with a premium 22 carat gold plated layer, this bangle set offers a luxurious traditional appearance along with excellent durability. The high-quality enamel detailing is designed to retain its colour and brilliance for 5 to 10 years with proper care, making it perfect for long-term festive and occasion wear.\n\nIdeal for weddings, festivals, and ethnic celebrations, these bangles beautifully complement sarees, lehengas, and traditional outfits. Their colourful craftsmanship and lasting shine make them a standout addition to any traditional jewellery collection.",
    "metaDescription": "Shop meenakari peacock design purple 22 carat gold plated bangles set of two with hand painted enamel work and long lasting shine.",
    "seoTitle": "Meenakari Peacock Design Purple Gold Plated Bangles (Set of Two)"
  },
  {
    "id": 2003,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Bangles – White (Set of Two)",
    "sku": "JB-003",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-03.png",
    "galleryImage": "/images/bangles/bangle-03-2.png",
            "viewerImage": "/images/bangles/bangle-03-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Add timeless elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Bangles – White (Set of Two). Featuring intricate hand-painted meenakari artistry, these bangles showcase beautifully detailed multicolour floral patterns set against a refined white colour base.\n\nFinished with premium 22 carat gold plating, this bangle set offers a luxurious traditional appearance along with excellent durability. The meenakari work is crafted to retain its colour and shine for 5 to 10 years with proper care, making it ideal for festive occasions and everyday ethnic wear.\n\nPerfect for weddings, celebrations, and traditional styling, these bangles pair effortlessly with sarees, lehengas, and ethnic outfits. Their soft white base combined with vibrant floral detailing creates a graceful and heritage-inspired jewellery statement.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nDelicate multicolour floral patterns crafted on an elegant white colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Add timeless elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Bangles – White (Set of Two). Featuring intricate hand-painted meenakari artistry, these bangles showcase beautifully detailed multicolour floral patterns set against a refined white colour base.\n\nFinished with premium 22 carat gold plating, this bangle set offers a luxurious traditional appearance along with excellent durability. The meenakari work is crafted to retain its colour and shine for 5 to 10 years with proper care, making it ideal for festive occasions and everyday ethnic wear.\n\nPerfect for weddings, celebrations, and traditional styling, these bangles pair effortlessly with sarees, lehengas, and ethnic outfits. Their soft white base combined with vibrant floral detailing creates a graceful and heritage-inspired jewellery statement.",
    "metaDescription": "Shop meenakari floral 22 carat gold plated bangles in white colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Floral Gold Plated Bangles – White (Set of Two)"
  },
  {
    "id": 2004,
    "name": "Meenakari Peacock Design 22 Carat Gold Plated Bangles – White (Set of Two)",
    "sku": "JB-004",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 650.0,
    "price": "₹650",
    "regularPriceValue": 812.0,
    "regularPrice": "₹812",
    "image": "/images/bangles/bangle-04.png",
    "galleryImage": "/images/bangles/bangle-04-2.png",
            "viewerImage": "/images/bangles/bangle-04-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Add timeless elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Bangles – White (Set of Two). Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock and floral detailing beautifully highlighted on a refined white colour base.\n\nFinished with premium 22 carat gold plating, this bangle set offers a luxurious traditional appearance along with excellent durability. The detailed meenakari work is crafted to retain its colour and shine for 5 to 10 years with proper care, making it ideal for festive occasions and long-term wear.\n\nPerfect for weddings, celebrations, and ethnic styling, these bangles pair effortlessly with sarees, lehengas, and traditional outfits. Their elegant white base combined with vibrant peacock designs creates a sophisticated and heritage-inspired jewellery statement.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nIntricate peacock and floral designs crafted on an elegant white colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Add timeless elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Bangles – White (Set of Two). Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock and floral detailing beautifully highlighted on a refined white colour base.\n\nFinished with premium 22 carat gold plating, this bangle set offers a luxurious traditional appearance along with excellent durability. The detailed meenakari work is crafted to retain its colour and shine for 5 to 10 years with proper care, making it ideal for festive occasions and long-term wear.\n\nPerfect for weddings, celebrations, and ethnic styling, these bangles pair effortlessly with sarees, lehengas, and traditional outfits. Their elegant white base combined with vibrant peacock designs creates a sophisticated and heritage-inspired jewellery statement.",
    "metaDescription": "Shop meenakari peacock design 22 carat gold plated bangles in white colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Peacock Design Gold Plated Bangles – White (Set of Two)"
  },
  {
    "id": 2005,
    "name": "Meenakari Elephant Design 22 Carat Gold Plated Openable Bangles – Green (Set of Two)",
    "sku": "JB-005",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-05.png",
    "galleryImage": "/images/bangles/bangle-05-2.png",
    "viewerImage": "/images/bangles/bangle-05-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Bring heritage charm to your jewellery collection with our Meenakari Elephant Design 22 Carat Gold Plated Openable Bangles in a rich green finish. Featuring intricate hand-painted meenakari work, these bangles showcase beautifully detailed elephant motifs blended with floral accents, reflecting classic Indian artistry.\n\nCrafted with premium 22 carat gold plating, the meenakari elephant design bangles offer both luxurious appeal and everyday comfort through the practical openable clasp style. This construction ensures easy wear while maintaining a secure and elegant traditional look.\n\nDesigned to retain colour and brilliance for 5 to 10 years with proper care, these bangles are perfect for weddings, festive occasions, and cultural celebrations. The vibrant green base paired with heritage-inspired detailing makes them a timeless statement piece in any traditional jewellery collection.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nTraditional elephant and floral patterns crafted on a deep green colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Bring heritage charm to your jewellery collection with our Meenakari Elephant Design 22 Carat Gold Plated Openable Bangles in a rich green finish. Featuring intricate hand-painted meenakari work, these bangles showcase beautifully detailed elephant motifs blended with floral accents, reflecting classic Indian artistry.\n\nCrafted with premium 22 carat gold plating, the meenakari elephant design bangles offer both luxurious appeal and everyday comfort through the practical openable clasp style. This construction ensures easy wear while maintaining a secure and elegant traditional look.\n\nDesigned to retain colour and brilliance for 5 to 10 years with proper care, these bangles are perfect for weddings, festive occasions, and cultural celebrations. The vibrant green base paired with heritage-inspired detailing makes them a timeless statement piece in any traditional jewellery collection.",
    "metaDescription": "Shop meenakari elephant design 22 carat gold plated openable bangles in green colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Elephant Design Bangles – Openable 22 Carat Gold Plated Set"
  },
  {
    "id": 2006,
    "name": "Meenakari Elephant Floral Design 22 Carat Gold Plated Openable Bangles – White (Set of Two)",
    "sku": "JB-006",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-06.png",
    "galleryImage": "/images/bangles/bangle-06-2.png",
            "viewerImage": "/images/bangles/bangle-06-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Bring timeless charm to your jewellery collection with our Meenakari Elephant Floral Design 22 Carat Gold Plated Openable Bangles in an elegant white finish. Featuring intricate hand-painted meenakari work, these bangles showcase graceful elephant motifs paired with vibrant floral detailing inspired by traditional Indian artistry.\n\nCrafted with premium 22 carat gold plating, the meenakari elephant floral bangles offer a luxurious traditional appearance while ensuring easy wear through the practical openable clasp design. The sturdy construction allows comfortable daily use without compromising on classic elegance.\n\nWith proper care, these meenakari elephant floral bangles maintain their colour and brilliance for 5 to 10 years, making them ideal for weddings, festive occasions, and cultural celebrations. Their striking design and heritage appeal make them a standout addition to any traditional jewellery collection.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nElegant elephant and floral designs crafted on a soft white colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Bring timeless charm to your jewellery collection with our Meenakari Elephant Floral Design 22 Carat Gold Plated Openable Bangles in an elegant white finish. Featuring intricate hand-painted meenakari work, these bangles showcase graceful elephant motifs paired with vibrant floral detailing inspired by traditional Indian artistry.\n\nCrafted with premium 22 carat gold plating, the meenakari elephant floral bangles offer a luxurious traditional appearance while ensuring easy wear through the practical openable clasp design. The sturdy construction allows comfortable daily use without compromising on classic elegance.\n\nWith proper care, these meenakari elephant floral bangles maintain their colour and brilliance for 5 to 10 years, making them ideal for weddings, festive occasions, and cultural celebrations. Their striking design and heritage appeal make them a standout addition to any traditional jewellery collection.",
    "metaDescription": "Shop meenakari elephant floral 22 carat gold plated openable bangles in white colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Elephant Floral Bangles – Openable Gold Plated"
  },
  {
    "id": 2007,
    "name": "Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles – Blue (Set of Two)",
    "sku": "JB-007",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-07.png",
    "galleryImage": "/images/bangles/bangle-07-2.png",
    "viewerImage": "/images/bangles/bangle-07-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Celebrate classic Indian elegance with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a striking royal blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock design motifs framed with delicate floral accents, creating a refined and heritage-inspired appearance.\n\nCrafted with premium 22 carat gold plating, the meenakari peacock design bangles combine timeless beauty with functional comfort through the secure openable clasp structure. This thoughtful design allows effortless wear while preserving a polished traditional look.\n\nDesigned to retain colour depth and brilliance for 5 to 10 years with proper care, these meenakari peacock design bangles are ideal for weddings, festive celebrations, and statement ethnic styling. The rich blue base paired with gold detailing adds a regal touch to any jewellery collection.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Artistry\nDetailed peacock design panels with floral accents on a royal blue colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Celebrate classic Indian elegance with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a striking royal blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock design motifs framed with delicate floral accents, creating a refined and heritage-inspired appearance.\n\nCrafted with premium 22 carat gold plating, the meenakari peacock design bangles combine timeless beauty with functional comfort through the secure openable clasp structure. This thoughtful design allows effortless wear while preserving a polished traditional look.\n\nDesigned to retain colour depth and brilliance for 5 to 10 years with proper care, these meenakari peacock design bangles are ideal for weddings, festive celebrations, and statement ethnic styling. The rich blue base paired with gold detailing adds a regal touch to any jewellery collection.",
    "metaDescription": "Shop meenakari peacock design 22 carat gold plated openable bangles in blue colour set of two with hand painted traditional artistry and lasting shine.",
    "seoTitle": "Meenakari Peacock Design Bangles – Openable Gold Plated"
  },
  {
    "id": 2008,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Openable Bangles – Black (Set of Two)",
    "sku": "JB-008",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-08.png",
    "galleryImage": "/images/bangles/bangle-08-2.png",
            "viewerImage": "/images/bangles/bangle-08-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Elevate your traditional jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a striking black finish. Showcasing intricate hand-painted meenakari artistry, these bangles feature delicate white floral design motifs enhanced with fine gold detailing for a sophisticated heritage look.\n\nCrafted with premium 22 carat gold plating, the meenakari floral design bangles combine elegance with functionality through their convenient openable clasp structure. This ensures effortless wear while maintaining a secure and comfortable fit for festive and formal occasions.\n\nDesigned to preserve colour richness and shine for 5 to 10 years with proper care, these meenakari floral design bangles are ideal for weddings, evening celebrations, and statement ethnic styling. The bold black base paired with refined floral design accents creates a timeless and graceful jewellery piece.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich and refined traditional finish\n\n●Hand-Painted Meenakari Artistry\nElegant white floral design patterns detailed on a deep black colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Elevate your traditional jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a striking black finish. Showcasing intricate hand-painted meenakari artistry, these bangles feature delicate white floral design motifs enhanced with fine gold detailing for a sophisticated heritage look.\n\nCrafted with premium 22 carat gold plating, the meenakari floral design bangles combine elegance with functionality through their convenient openable clasp structure. This ensures effortless wear while maintaining a secure and comfortable fit for festive and formal occasions.\n\nDesigned to preserve colour richness and shine for 5 to 10 years with proper care, these meenakari floral design bangles are ideal for weddings, evening celebrations, and statement ethnic styling. The bold black base paired with refined floral design accents creates a timeless and graceful jewellery piece.",
    "metaDescription": "Shop meenakari floral design 22 carat gold plated openable bangles in black colour set of two with hand painted traditional artistry and lasting shine.",
    "seoTitle": "Meenakari Floral Design Bangles – Openable Gold Plated"
  },
  {
    "id": 2009,
    "name": "Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles – Green (Set of Two)",
    "sku": "JB-009",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-09.png",
    "galleryImage": "/images/bangles/bangle-09-2.png",
            "viewerImage": "/images/bangles/bangle-09-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Bring subtle elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a refreshing pastel green finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase refined peacock design panels paired with soft floral detailing, creating a graceful and balanced traditional look.\n\nCrafted with premium 22 carat gold plating, the meenakari peacock design bangles offer a comfortable and secure fit through the openable clasp structure, making them ideal for extended wear during festive and cultural occasions.\n\nDesigned to retain colour richness and shine for 5 to 10 years with proper care, these meenakari peacock design bangles pair beautifully with sarees, lehengas, and classic ethnic outfits. Their gentle green tone and elegant detailing make them a timeless addition to any jewellery collection.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Artistry\nGraceful peacock design motifs with floral accents on a soft green colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Bring subtle elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a refreshing pastel green finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase refined peacock design panels paired with soft floral detailing, creating a graceful and balanced traditional look.\n\nCrafted with premium 22 carat gold plating, the meenakari peacock design bangles offer a comfortable and secure fit through the openable clasp structure, making them ideal for extended wear during festive and cultural occasions.\n\nDesigned to retain colour richness and shine for 5 to 10 years with proper care, these meenakari peacock design bangles pair beautifully with sarees, lehengas, and classic ethnic outfits. Their gentle green tone and elegant detailing make them a timeless addition to any jewellery collection.",
    "metaDescription": "Shop meenakari peacock design 22 carat gold plated openable bangles in green colour set of two with hand painted traditional artistry and lasting shine.",
    "seoTitle": "Meenakari Peacock Design Bangles – Openable Gold Plated"
  },
  {
    "id": 2010,
    "name": "Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles – Blue (Set of Two)",
    "sku": "JB-010",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-10.png",
    "galleryImage": "/images/bangles/bangle-10-2.png",
            "viewerImage": "/images/bangles/bangle-10-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Bring vibrant elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a striking blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock design panels enriched with floral accents and refined gold detailing for a regal traditional look.\n\nCrafted with premium 22 carat gold plating, the blue peacock design bangles offer a secure yet comfortable fit through the convenient openable clasp style, making them ideal for festive wear and special occasions.\n\nDesigned to retain colour brilliance and shine for 5 to 10 years with proper care, these blue peacock design bangles pair beautifully with sarees, lehengas, and ethnic outfits, adding a timeless charm to every celebration.",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Artistry\nPeacock design motifs with floral accents detailed on a vibrant blue colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Bring vibrant elegance to your jewellery collection with our Meenakari Peacock Design 22 Carat Gold Plated Openable Bangles in a striking blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase graceful peacock design panels enriched with floral accents and refined gold detailing for a regal traditional look.\n\nCrafted with premium 22 carat gold plating, the blue peacock design bangles offer a secure yet comfortable fit through the convenient openable clasp style, making them ideal for festive wear and special occasions.\n\nDesigned to retain colour brilliance and shine for 5 to 10 years with proper care, these blue peacock design bangles pair beautifully with sarees, lehengas, and ethnic outfits, adding a timeless charm to every celebration.",
    "metaDescription": "Shop meenakari blue peacock design 22 carat gold plated openable bangles set of two with hand painted traditional artistry and lasting shine.",
    "seoTitle": "Meenakari Blue Peacock Design Bangles – Openable Gold Plated"
  },
  {
    "id": 2011,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Openable Bangles – Red (Set of Two)",
    "sku": "JB-011",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-11.png",
    "galleryImage": "/images/bangles/bangle-11-2.png",
            "viewerImage": "/images/bangles/bangle-11-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Bring festive elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a vibrant red finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase delicate white floral design patterns enhanced with graceful gold vine detailing for a refined traditional look.",
    "shortDescription": "● Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n● Hand-Painted Meenakari Artistry\nWhite floral design patterns beautifully detailed on a deep red colour base\n\n● Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n● Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Bring festive elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a vibrant red finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase delicate white floral design patterns enhanced with graceful gold vine detailing for a refined traditional look.",
    "metaDescription": "Shop meenakari red floral design 22 carat gold plated openable bangles set of two with hand painted traditional artistry and long lasting shine.",
    "seoTitle": "Meenakari Red Floral Bangles – Openable Gold Plated"
  },
  {
    "id": 2012,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Openable Bangles – Soft White (Set of Two)",
    "sku": "JB-012",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-12.png",
    "galleryImage": "/images/bangles/bangle-12-2.png",
            "viewerImage": "/images/bangles/bangle-12-3d.png",

    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Add graceful elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a soft white finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase rich red floral design patterns enhanced with fine gold vine detailing for a refined traditional look.\n\nCrafted with premium 22 carat gold plating, the white floral design bangles offer comfort and durability through the secure openable clasp structure, making them perfect for weddings, festive occasions, and everyday ethnic wear.\n\nDesigned to retain colour richness and shine for 5 to 10 years with proper care, these white floral design bangles pair beautifully with sarees, lehengas, and classic Indian outfits, adding timeless charm to every celebration.",
    "shortDescription": "● Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n● Hand-Painted Meenakari Artistry\nRed floral design patterns delicately detailed on a soft white colour base\n\n● Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n● Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Add graceful elegance to your jewellery collection with our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a soft white finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase rich red floral design patterns enhanced with fine gold vine detailing for a refined traditional look.\n\nCrafted with premium 22 carat gold plating, the white floral design bangles offer comfort and durability through the secure openable clasp structure, making them perfect for weddings, festive occasions, and everyday ethnic wear.\n\nDesigned to retain colour richness and shine for 5 to 10 years with proper care, these white floral design bangles pair beautifully with sarees, lehengas, and classic Indian outfits, adding timeless charm to every celebration.",
    "metaDescription": "Shop meenakari white floral design 22 carat gold plated openable bangles set of two with hand painted traditional artistry and lasting shine.",
    "seoTitle": "Meenakari Floral Design Bangles – Openable Gold Plated"
  },
  {
    "id": 2013,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Openable Bangles – White (Set of Two)",
    "sku": "JB-013",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-13.png",
    "galleryImage": "/images/bangles/bangle-13-2.png",
    "viewerImage": "/images/bangles/bangle-13-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Enhance your jewellery collection with these Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a classic white colour finish. Featuring refined hand-painted meenakari artistry, the bangles display elegant floral design patterns highlighted with fine gold detailing for a graceful traditional appeal.\n\nCrafted with premium 22 carat gold plating, the white floral design bangles offer secure comfort through the openable clasp structure, making them perfect for weddings, festive celebrations, and daily ethnic styling.\n\nDesigned to maintain brilliance and durability for 5 to 10 years with proper care, these white floral design bangles beautifully complement sarees, lehengas, and traditional outfits.",
    "shortDescription": "● Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n● Hand-Painted Meenakari Artistry\nElegant floral design patterns detailed on a white colour base\n\n● Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n● Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Enhance your jewellery collection with these Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a classic white colour finish. Featuring refined hand-painted meenakari artistry, the bangles display elegant floral design patterns highlighted with fine gold detailing for a graceful traditional appeal.\n\nCrafted with premium 22 carat gold plating, the white floral design bangles offer secure comfort through the openable clasp structure, making them perfect for weddings, festive celebrations, and daily ethnic styling.\n\nDesigned to maintain brilliance and durability for 5 to 10 years with proper care, these white floral design bangles beautifully complement sarees, lehengas, and traditional outfits.",
    "metaDescription": "Shop meenakari white floral design 22 carat gold plated openable bangles set of two with hand painted traditional artistry and long lasting shine.",
    "seoTitle": "Meenakari White Floral Bangles – Openable Gold Plated"
  },
  {
    "id": 2014,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Bangles – Pink (Set of Two)",
    "sku": "JB-014",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-14.png",
    "viewerImage": "/images/bangles/bangle-14-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nElegant floral patterns crafted on a vibrant pink colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "shortDescription": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nElegant floral patterns crafted on a vibrant pink colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "●Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n●Hand-Painted Meenakari Art\nElegant floral patterns crafted on a vibrant pink colour base\n\n●Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n●Purchase Options\nAvailable as a single bangle or set of two",
    "metaDescription": "Shop meenakari floral 22 carat gold plated bangles in pink colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Floral Gold Plated Bangles – Pink (Set of Two)"
  },
  {
    "id": 2015,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Bangles – Green (Set of Two)",
    "sku": "JB-015",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-15.png",
    "galleryImage": "/images/bangles/bangle-15-2.png",
    "viewerImage": "/images/bangles/bangle-15-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Designed to retain colour richness and shine for 5 to 10 years with proper care, these red floral design bangles pair beautifully with sarees, lehengas, and classic Indian outfits, adding timeless charm to every occasion.",
    "shortDescription": "● Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n● Hand-Painted Meenakari Art\nElegant floral patterns crafted on a deep green colour base with vibrant accents\n\n● Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n● Purchase Options\nAvailable as a single bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Designed to retain colour richness and shine for 5 to 10 years with proper care, these red floral design bangles pair beautifully with sarees, lehengas, and classic Indian outfits, adding timeless charm to every occasion.",
    "metaDescription": "Shop meenakari floral 22 carat gold plated bangles in green colour set of two with hand painted traditional craftsmanship and lasting shine.",
    "seoTitle": "Meenakari Floral Gold Plated Bangles – Green (Set of Two)"
  },
  {
    "id": 2016,
    "name": "Meenakari Floral Design 22 Carat Gold Plated Openable Bangles – Navy Blue (Set of Two)",
    "sku": "JB-016",
    "category": "Bangles",
    "subCategory": "Bangles",
    "priceValue": 840.0,
    "price": "₹840",
    "regularPriceValue": 1050.0,
    "regularPrice": "₹1,050",
    "image": "/images/bangles/bangle-16.png",
    "galleryImage": "/images/bangles/bangle-16-2.png",
    "viewerImage": "/images/bangles/bangle-16-3d.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "22 Carat Gold Plated",
    "description": "Enhance your jewellery collection with the timeless elegance of our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a luxurious navy blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase delicate white floral design patterns highlighted with graceful gold vine accents for a refined traditional look.\n\nCrafted with premium 22 carat gold plating, the navy floral design bangles offer both durability and comfort through the secure openable clasp style, making them ideal for festive occasions and special celebrations.\n\nDesigned to retain colour depth and shine for 5 to 10 years with proper care, these navy floral design bangles pair beautifully with sarees, lehengas, and elegant ethnic outfits, adding sophistication to every ensemble.",
    "shortDescription": "● Premium Gold Plating\n22 carat gold plated for a rich traditional finish\n\n● Hand-Painted Meenakari Artistry\nWhite floral design patterns detailed beautifully on a deep navy blue colour base\n\n● Long-Lasting Beauty\nColour and shine maintained for 5–10 years with proper care\n\n● Purchase Options\nAvailable as a single openable bangle or set of two",
    "rating": null,
    "dimensions": "Set of Two",
    "care": "Colour and shine maintained for 5–10 years with proper care",
    "story": "Enhance your jewellery collection with the timeless elegance of our Meenakari Floral Design 22 Carat Gold Plated Openable Bangles in a luxurious navy blue finish. Featuring intricate hand-painted meenakari artistry, these bangles showcase delicate white floral design patterns highlighted with graceful gold vine accents for a refined traditional look.\n\nCrafted with premium 22 carat gold plating, the navy floral design bangles offer both durability and comfort through the secure openable clasp style, making them ideal for festive occasions and special celebrations.\n\nDesigned to retain colour depth and shine for 5 to 10 years with proper care, these navy floral design bangles pair beautifully with sarees, lehengas, and elegant ethnic outfits, adding sophistication to every ensemble.",
    "metaDescription": "Shop meenakari navy floral design 22 carat gold plated openable bangles set of two with hand painted traditional artistry and long lasting shine.",
    "seoTitle": "Meenakari Navy Floral Design Bangles – Openable Gold Plated"
  }
];


// Blades data from the Gninee Gems Web Upload workbook (rows 3–15, MH-001 to MH-013).
const BLADES_PRODUCTS = [
  {
    "id": 3001,
    "name": "Premium Damascus Steel Dagger Featuring Silver Lamb Face Handle and Hand-Engraved Silver Sheath – 12 Inch (30.5 cm)",
    "sku": "MH-001",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 9000.0,
    "price": "₹9,000",
    "regularPriceValue": 13500.0,
    "regularPrice": "₹13,500",
    "image": "/images/blades/blade-01.png",
    "galleryImage": "/images/blades/blade-01-2.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This striking handcrafted dagger features a beautifully curved Damascus steel blade, known for its flowing patterns and timeless strength. The handle is intricately carved with a lamb face, giving the piece a bold yet symbolic character, while both the handle and matching cover are richly engraved in silver, showcasing fine artisan detail. Measuring 12 inches (approximately 30.5 cm) in total length, this piece balances elegance and edge perfectly. A unique collectible that blends tradition, craftsmanship, and standout design in one unforgettable form.",
    "shortDescription": "●Handcrafted Damascus steel blade(blunt, non-sharpened)\n●Silver-carved handle\n●Lamb face carved on handle\n●Length: 12 inch/ 30.48 cm",
    "rating": null,
    "dimensions": "12 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This striking handcrafted dagger features a beautifully curved Damascus steel blade, known for its flowing patterns and timeless strength. The handle is intricately carved with a lamb face, giving the piece a bold yet symbolic character, while both the handle and matching cover are richly engraved in silver, showcasing fine artisan detail. Measuring 12 inches (approximately 30.5 cm) in total length, this piece balances elegance and edge perfectly. A unique collectible that blends tradition, craftsmanship, and standout design in one unforgettable form.",
    "metaDescription": "Discover a stunning handcrafted Damascus steel dagger with an intricate silver-carved handle and sheath, featuring a rare lamb face design. A 12-inch (30.5 cm) masterpiece perfect for collectors and luxury blade enthusiasts.",
    "seoTitle": "Damascus Steel Decorative Knife, Silver Carved Lamb Handle, 12 Inch Blu Blade, Handcrafted"
  },
  {
    "id": 3002,
    "name": "Handcrafted Indo-Persian Ceremonial Dagger with Mother of Pearl Handle & Silver Koftgiri Work – 17.5 Inch",
    "sku": "MH-002",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 10000.0,
    "price": "₹10,000",
    "regularPriceValue": 13500.0,
    "regularPrice": "₹13,500",
    "image": "/images/blades/blade-02.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Indo-Persian–inspired ceremonial dagger is a fine example of traditional craftsmanship and historical elegance. Measuring 17.5 inches (≈ 44.5 cm) in length, it features a gracefully curved, Blunt Damascus steel bladeblade, making it ideal for display, collection, or ceremonial use.\n\nThe handle is beautifully adorned with mother of pearl inlay, highlighted by star-pattern detailing along the center line, reflecting classic Mughal-Persian design aesthetics. Enhanced with traditional silver Koftgiri work, the dagger showcases the age-old art of precious metal inlay on steel.\n\nFully handcrafted by skilled artisans, this piece is not just a weapon replica but a heritage collectible, perfect for interior décor, private collections, or gifting to history and art enthusiasts.",
    "shortDescription": "●Indo-Persian–inspired ceremonial dagger\n●Length: 17.5 inches (≈ 44.5 cm)\n●Gracefully curved, Blunt Damascus steel blade \n●Fully handcrafted by skilled artisans\n●Mother-of-pearl inlaid handle with star-pattern center line\n●Traditional silver Koftgiri work enhancing its elegance\n●An ideal collectible and heritage décor piece",
    "rating": null,
    "dimensions": "17.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Indo-Persian–inspired ceremonial dagger is a fine example of traditional craftsmanship and historical elegance. Measuring 17.5 inches (≈ 44.5 cm) in length, it features a gracefully curved, Blunt Damascus steel bladeblade, making it ideal for display, collection, or ceremonial use.\n\nThe handle is beautifully adorned with mother of pearl inlay, highlighted by star-pattern detailing along the center line, reflecting classic Mughal-Persian design aesthetics. Enhanced with traditional silver Koftgiri work, the dagger showcases the age-old art of precious metal inlay on steel.\n\nFully handcrafted by skilled artisans, this piece is not just a weapon replica but a heritage collectible, perfect for interior décor, private collections, or gifting to history and art enthusiasts.",
    "metaDescription": "Discover a handcrafted Indo-Persian ceremonial dagger featuring silver Koftgiri work, a mother-of-pearl handle, star detailing, and a curved Damascus steel blade. Ideal for collectors and décor lovers.",
    "seoTitle": "Indo-Persian Koftgiri Dagger with Mother of Pearl Handle | Handcrafted Ceremonial Dagger"
  },
  {
    "id": 3003,
    "name": "Handcrafted Khukri with Mother of Pearl Handle & Silver Koftgiri Work – 15.5 Inch",
    "sku": "MH-003",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 9500.0,
    "price": "₹9,500",
    "regularPriceValue": 14500.0,
    "regularPrice": "₹14,500",
    "image": "/images/blades/blade-03.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This handcrafted Khukri is a striking representation of traditional blade craftsmanship and cultural heritage. Measuring 15.5 inches (39.4 cm) in overall length, it features a bold, forward-curved blunt Damascus steel blade, making it ideal for ceremonial display and collectible purposes.\n\nThe handle is beautifully finished with mother-of-pearl inlay, offering a refined and luxurious appearance. Both the blade and handle are enhanced with traditional silver Koftgiri work, showcasing skilled artisanal detailing and timeless design.\n\nPerfect for collectors, heritage décor, cultural displays, and luxury gifting, this Khukri blends strength, artistry, and elegance in a single piece.",
    "shortDescription": "●Traditional Khukri blade\n●Length: 15.5 inches (≈ 39.4 cm)\n●Blunt forward-curved Damascus steel blade for display and ceremonial use\n●Mother-of-pearl inlaid handle\n●Silver Koftgiri work on blade and handle\n●Fully handcrafted\n●Ideal for collectors and heritage décor",
    "rating": null,
    "dimensions": "15.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This handcrafted Khukri is a striking representation of traditional blade craftsmanship and cultural heritage. Measuring 15.5 inches (39.4 cm) in overall length, it features a bold, forward-curved blunt Damascus steel blade, making it ideal for ceremonial display and collectible purposes.\n\nThe handle is beautifully finished with mother-of-pearl inlay, offering a refined and luxurious appearance. Both the blade and handle are enhanced with traditional silver Koftgiri work, showcasing skilled artisanal detailing and timeless design.\n\nPerfect for collectors, heritage décor, cultural displays, and luxury gifting, this Khukri blends strength, artistry, and elegance in a single piece.",
    "metaDescription": "Handcrafted Khukri with a blunt forward-curved Damascus steel blade, mother of pearl handle, and silver Koftgiri work. Ideal for collectors.",
    "seoTitle": "Handcrafted Khukri Damascus Steel Blade with Silver Koftgiri Work"
  },
  {
    "id": 3004,
    "name": "Handcrafted Straight Damascus Steel Dagger with Camel Bone Handle & Silver Koftgiri Work – 15.5 Inch",
    "sku": "MH-004",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 9000.0,
    "price": "₹9,000",
    "regularPriceValue": 13500.0,
    "regularPrice": "₹13,500",
    "image": "/images/blades/blade-04.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This handcrafted straight dagger features a traditional Damascus steel blade with a clean, timeless profile. Measuring 15.5 inches (39.4 cm) in overall length, it is designed for ceremonial display and collectible purposes.\n\nThe handle is crafted from smoothly finished camel bone, offering a refined and classic appearance. Delicate silver Koftgiri work on both the blade and handle highlights the skill and artistry involved in its creation.\n\nAn elegant piece well suited for collectors, heritage décor, cultural displays, and luxury gifting.",
    "shortDescription": "● Traditional straight Damascus steel blade\n● Length: 15.5 inches (≈ 39.4 cm)\n● Blunt blade for display and ceremonial use\n● Camel bone handle, smoothly finished\n● Silver Koftgiri work on both blade and handle\n● Ideal for collectors and heritage décor",
    "rating": null,
    "dimensions": "15.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This handcrafted straight dagger features a traditional Damascus steel blade with a clean, timeless profile. Measuring 15.5 inches (39.4 cm) in overall length, it is designed for ceremonial display and collectible purposes.\n\nThe handle is crafted from smoothly finished camel bone, offering a refined and classic appearance. Delicate silver Koftgiri work on both the blade and handle highlights the skill and artistry involved in its creation.\n\nAn elegant piece well suited for collectors, heritage décor, cultural displays, and luxury gifting.",
    "metaDescription": "Handcrafted straight dagger with Damascus steel blade, camel bone handle, and silver Koftgiri work. Ideal for collectors and heritage décor.",
    "seoTitle": "Handcrafted Straight Damascus Steel Dagger with Camel Bone Handle & Silver Koftgiri Work"
  },
  {
    "id": 3005,
    "name": "Black Curved Damascus Steel Dagger with Silver Koftgiri – 6 Inch",
    "sku": "MH-005",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 1550.0,
    "price": "₹1,550",
    "regularPriceValue": 2250.0,
    "regularPrice": "₹2,250",
    "image": "/images/blades/blade-05.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "Curved Damascus steel dagger craftsmanship is showcased in this finely handcrafted piece, created for collectors who value traditional artistry and heritage design. The blunt Damascus steel blade displays classic patterning, complemented by detailed silver Koftgiri work on the handle and matching sheath.\n\nDesigned as a collectible and décor piece, this 6-inch dagger reflects skilled metalwork traditions and timeless elegance. Its balanced form, refined detailing, and artisanal finish make it a distinguished addition to any curated collection or heritage display.",
    "shortDescription": "●Curved Damascus steel blade (blunt, non-sharpened)\n●Length: 6 inches (≈ 15.2 cm)\n●Handcrafted metal handle with silver Koftgiri work\n●Matching sheath with silver Koftgiri detailing\n●Traditional dagger, ideal for collectors and heritage décor",
    "rating": null,
    "dimensions": "6 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "Curved Damascus steel dagger craftsmanship is showcased in this finely handcrafted piece, created for collectors who value traditional artistry and heritage design. The blunt Damascus steel blade displays classic patterning, complemented by detailed silver Koftgiri work on the handle and matching sheath.\n\nDesigned as a collectible and décor piece, this 6-inch dagger reflects skilled metalwork traditions and timeless elegance. Its balanced form, refined detailing, and artisanal finish make it a distinguished addition to any curated collection or heritage display.",
    "metaDescription": "Curved Damascus steel dagger with silver Koftgiri work, handcrafted with a blunt blade and matching sheath. Ideal for collectors and heritage décor.",
    "seoTitle": "Curved Damascus Steel Dagger with Silver Koftgiri"
  },
  {
    "id": 3006,
    "name": "Damascus Steel Dagger with Camel Bone Handle & Silver Koftgiri – 9 Inch",
    "sku": "MH-006",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 5000.0,
    "price": "₹5,000",
    "regularPriceValue": 7500.0,
    "regularPrice": "₹7,500",
    "image": "/images/blades/blade-06.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Damascus steel dagger reflects traditional craftsmanship and refined material selection. The curved Damascus steel blade features a blunt ceremonial finish, allowing its natural patterning to be appreciated while remaining suitable for display.\n\nThe handle is crafted from camel bone, carefully shaped and smoothly polished to provide balance and visual harmony. Silver Koftgiri work decorates the blade and fittings, showcasing classical metal inlay techniques that add depth and cultural character. Each piece is handcrafted by skilled artisans, resulting in a unique collectible.\n\nWith an overall length of 9 inches (≈ 22.9 cm), this dagger is designed for collectors seeking heritage-inspired décor and fine craftsmanship.",
    "shortDescription": "●Camel bone handle paired with refined silver Koftgiri work\n●Damascus steel blade, curved and blunt for ceremonial use\n●Handcrafted by skilled artisans\n●Overall length: 9 inches (≈ 22.9 cm)\n●Ideal for collectors and heritage déco",
    "rating": null,
    "dimensions": "9 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Damascus steel dagger reflects traditional craftsmanship and refined material selection. The curved Damascus steel blade features a blunt ceremonial finish, allowing its natural patterning to be appreciated while remaining suitable for display.\n\nThe handle is crafted from camel bone, carefully shaped and smoothly polished to provide balance and visual harmony. Silver Koftgiri work decorates the blade and fittings, showcasing classical metal inlay techniques that add depth and cultural character. Each piece is handcrafted by skilled artisans, resulting in a unique collectible.\n\nWith an overall length of 9 inches (≈ 22.9 cm), this dagger is designed for collectors seeking heritage-inspired décor and fine craftsmanship.",
    "metaDescription": "Damascus steel dagger with camel bone handle, silver Koftgiri work, and a handcrafted blunt blade. A refined collectible for heritage décor and serious collectors.",
    "seoTitle": "Damascus Steel Dagger with Camel Bone Handle & Silver Koftgiri"
  },
  {
    "id": 3007,
    "name": "Deccan Style Chilanum Steel Heritage Dagger – 16 Inch",
    "sku": "MH-007",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 2250.0,
    "price": "₹2,250",
    "regularPriceValue": 4400.0,
    "regularPrice": "₹4,400",
    "image": "/images/blades/blade-07.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Steel",
    "description": "This Deccan style Chilanum dagger reflects the bold forms and historical character traditionally associated with Deccan-region blades. Its distinctive silhouette is defined by a strongly forward-curved steel blade, crafted with a blunt, non-sharpened finish that emphasizes form and craftsmanship.\n\nThe dagger features a traditional all-metal hilt, shaped in classic Deccan fashion to create a balanced and commanding presence. Subtle ornamental detailing enhances its visual depth while maintaining an authentic and refined appearance.\n\nWith an overall length of 16 inches (≈ 40.6 cm), this handcrafted piece is designed for heritage display, collectors, and curated décor settings, representing timeless artisanal metalwork.",
    "shortDescription": "●Deccan-style Chilanum dagger\n●Overall length: 16 inches (≈ 40.6 cm)\n●Strongly forward-curved steel blade (blunt, non-sharpened)\n●Traditional all-metal hilt reflecting classic Deccan form\n●Handcrafted ceremonial piece, ideal for collectors and heritage décor",
    "rating": null,
    "dimensions": "16 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Deccan style Chilanum dagger reflects the bold forms and historical character traditionally associated with Deccan-region blades. Its distinctive silhouette is defined by a strongly forward-curved steel blade, crafted with a blunt, non-sharpened finish that emphasizes form and craftsmanship.\n\nThe dagger features a traditional all-metal hilt, shaped in classic Deccan fashion to create a balanced and commanding presence. Subtle ornamental detailing enhances its visual depth while maintaining an authentic and refined appearance.\n\nWith an overall length of 16 inches (≈ 40.6 cm), this handcrafted piece is designed for heritage display, collectors, and curated décor settings, representing timeless artisanal metalwork.",
    "metaDescription": "Deccan style Chilanum dagger with a forward-curved steel blade and traditional all-metal hilt. A 16-inch handcrafted heritage piece for collectors and refined décor.",
    "seoTitle": "Deccan Style Chilanum Dagger – Curved Steel Heritage Blade"
  },
  {
    "id": 3008,
    "name": "Damascus Steel Dagger with Elephant Head Camel Bone Handle – 13 Inch",
    "sku": "MH-008",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 16200.0,
    "price": "₹16,200",
    "regularPriceValue": 24500.0,
    "regularPrice": "₹24,500",
    "image": "/images/blades/blade-08.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Damascus steel dagger showcases refined craftsmanship and traditional detailing, making it a striking addition for collectors of fine blades. The gently curved blade is forged from patterned Damascus steel and finished with a blunt edge, emphasizing its role as a collectible and display piece.\n\nThe handle is carved from camel bone and features a distinctive elephant head motif, adding character and cultural depth to the design. Enhancing its visual appeal, silver Koftgiri work is carefully applied to the blade fittings as well as the matching scabbard, reflecting skilled handwork and attention to detail.\n\nMeasuring 13 inches in overall length, this dagger balances elegance with presence. It is well-suited for collectors, heritage décor, and those who appreciate traditional blade artistry with authentic materials and craftsmanship.",
    "shortDescription": "●Damascus steel blade, blunt finish\n●Length: 13 inches (≈ 33 cm)\n●Camel bone handle with elephant head carving\n●Silver Koftgiri work on the blade fittings\n●Matching scabbard with silver work\n●Crafted as a collectible heritage piece",
    "rating": null,
    "dimensions": "13 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Damascus steel dagger showcases refined craftsmanship and traditional detailing, making it a striking addition for collectors of fine blades. The gently curved blade is forged from patterned Damascus steel and finished with a blunt edge, emphasizing its role as a collectible and display piece.\n\nThe handle is carved from camel bone and features a distinctive elephant head motif, adding character and cultural depth to the design. Enhancing its visual appeal, silver Koftgiri work is carefully applied to the blade fittings as well as the matching scabbard, reflecting skilled handwork and attention to detail.\n\nMeasuring 13 inches in overall length, this dagger balances elegance with presence. It is well-suited for collectors, heritage décor, and those who appreciate traditional blade artistry with authentic materials and craftsmanship.",
    "metaDescription": "Discover a 13-inch Damascus steel dagger featuring an elephant-head camel bone handle and silver Koftgiri work on both dagger and scabbard—crafted for collectors.",
    "seoTitle": "Damascus Steel Dagger with Camel Bone Handle & Silver Koftgiri – 13 Inch"
  },
  {
    "id": 3009,
    "name": "Green Aventurine Lamb-Face Dagger with Damascus Steel Blade – 15.5 Inch",
    "sku": "MH-009",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 31500.0,
    "price": "₹31,500",
    "regularPriceValue": 42500.0,
    "regularPrice": "₹42,500",
    "image": "/images/blades/blade-09.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Damascus steel dagger with green aventurine handle reflects refined craftsmanship and traditional decorative artistry. The blade is forged from patterned Damascus steel, offering visual depth and a balanced profile that enhances its presentation appeal.\n\nThe handle is carved from green aventurine stone, shaped into a distinctive lamb-face form that adds symbolic and artistic character. Accentuating the handle, semi-precious Kundan inlay work is carefully set by hand, creating subtle contrast and an elevated ornamental finish without overpowering the design.\n\nCompleting the piece is a velvet-covered scabbard, designed to protect the blade while enhancing its display value. Measuring 15.5 inches (≈ 39.4 cm) in total length, this dagger is well suited for collectors, curated displays, and heritage décor settings where craftsmanship and material quality matter.",
    "shortDescription": "●Handcrafted Damascus steel blade, refined and well-balanced\n●Length: 15.5 inches (≈ 39.4 cm)\n●Green aventurine stone handle, finely carved with a distinct lamb-face motif\n●Semi-precious Kundan inlay work on the handle, adding rich ornamental detail\n●Velvet-covered scabbard, enhancing presentation and protection\n●A refined collector’s dagger, ideal for heritage display and luxury décor",
    "rating": null,
    "dimensions": "15.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Damascus steel dagger with green aventurine handle reflects refined craftsmanship and traditional decorative artistry. The blade is forged from patterned Damascus steel, offering visual depth and a balanced profile that enhances its presentation appeal.\n\nThe handle is carved from green aventurine stone, shaped into a distinctive lamb-face form that adds symbolic and artistic character. Accentuating the handle, semi-precious Kundan inlay work is carefully set by hand, creating subtle contrast and an elevated ornamental finish without overpowering the design.\n\nCompleting the piece is a velvet-covered scabbard, designed to protect the blade while enhancing its display value. Measuring 15.5 inches (≈ 39.4 cm) in total length, this dagger is well suited for collectors, curated displays, and heritage décor settings where craftsmanship and material quality matter.",
    "metaDescription": "Discover a handcrafted Damascus steel dagger featuring a green aventurine lamb-face handle with semi-precious Kundan inlay and a velvet scabbard. A refined collectible piece.",
    "seoTitle": "Damascus Steel Dagger with Green Aventurine Lamb-Face Handle"
  },
  {
    "id": 3010,
    "name": "Horse Head Damascus Steel Dagger with Silver Koftgiri Work",
    "sku": "MH-010",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 11700.0,
    "price": "₹11,700",
    "regularPriceValue": 18500.0,
    "regularPrice": "₹18,500",
    "image": "/images/blades/blade-10.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This horse head Damascus steel dagger is a striking example of traditional craftsmanship combined with artistic detailing. Designed as a collectible and display piece, it reflects heritage aesthetics through form, material, and ornamentation.\n\nThe Damascus steel blade features a graceful curve and distinctive surface pattern, offering visual depth and historical character. Its proportions and finish make it suitable for collectors who value authenticity and refined presentation.\n\nThe handle is carved in the form of a horse head, symbolizing strength and elegance. Enhanced with silver koftgiri work, the detailing highlights the skill of the artisan while adding contrast and texture to the overall design.\n\nComplementing the dagger is a velvet-covered scabbard, also finished with silver koftgiri fittings, creating a cohesive and premium appearance. Together, the dagger and scabbard form a balanced piece ideal for heritage décor, private collections, or curated displays.",
    "shortDescription": "●Overall length: 17.5 inches\n●Curved Damascus steel blade with a traditional profile\n●Horse-head carved handle, finely detailed for a distinctive look\n●Silver koftgiri work on the handle, showcasing skilled craftsmanship\n●Matching velvet-covered scabbard with silver koftgiri fittings\n●Ideal as a collector’s piece, display item, or heritage décor",
    "rating": null,
    "dimensions": "17.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This horse head Damascus steel dagger is a striking example of traditional craftsmanship combined with artistic detailing. Designed as a collectible and display piece, it reflects heritage aesthetics through form, material, and ornamentation.\n\nThe Damascus steel blade features a graceful curve and distinctive surface pattern, offering visual depth and historical character. Its proportions and finish make it suitable for collectors who value authenticity and refined presentation.\n\nThe handle is carved in the form of a horse head, symbolizing strength and elegance. Enhanced with silver koftgiri work, the detailing highlights the skill of the artisan while adding contrast and texture to the overall design.\n\nComplementing the dagger is a velvet-covered scabbard, also finished with silver koftgiri fittings, creating a cohesive and premium appearance. Together, the dagger and scabbard form a balanced piece ideal for heritage décor, private collections, or curated displays.",
    "metaDescription": "17.5 inch Damascus steel dagger featuring a horse head handle, silver koftgiri work, and velvet scabbard. A refined collectible for blade enthusiasts.",
    "seoTitle": "Horse Head Damascus Steel Dagger with Silver Koftgiri | 17.5 Inch"
  },
  {
    "id": 3011,
    "name": "Curved Damascus Steel Sword with Silver Koftgiri & Velvet Scabbard (40 Inch)",
    "sku": "MH-011",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 22500.0,
    "price": "₹22,500",
    "regularPriceValue": 33100.0,
    "regularPrice": "₹33,100",
    "image": "/images/blades/blade-11.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Damascus steel sword showcases refined craftsmanship and traditional design, created as a statement piece for collectors and display enthusiasts. Its proportions and finish reflect classical sword aesthetics with a strong visual presence.\n\nThe blunt Damascus steel blade features a graceful curve and a distinctive layered pattern, emphasizing material character while remaining suitable for decorative and collection purposes. With an overall length of 40 inches, the sword offers a commanding yet balanced profile.\n\nThe hilt and fittings are enhanced with intricate silver koftgiri work, applied with precision to highlight ornamental detailing and artisanal skill. Complementing the sword is a rich red velvet scabbard, finished with matching silver mounts that elevate the overall presentation.\n\nDesigned for heritage décor, private collections, and luxury display, this sword represents a blend of traditional form, material quality, and decorative craftsmanship.",
    "shortDescription": "●Blunt Damascus steel blade with a distinct layered pattern\n●Overall length: 40 inches (approx. 102 cm)\n●Silver koftgiri work on the hilt and fittings\n●Red velvet scabbard with handcrafted silver work\n●Crafted as a collectible and display piece\n●Ideal for heritage décor and arms collections",
    "rating": null,
    "dimensions": "40 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Damascus steel sword showcases refined craftsmanship and traditional design, created as a statement piece for collectors and display enthusiasts. Its proportions and finish reflect classical sword aesthetics with a strong visual presence.\n\nThe blunt Damascus steel blade features a graceful curve and a distinctive layered pattern, emphasizing material character while remaining suitable for decorative and collection purposes. With an overall length of 40 inches, the sword offers a commanding yet balanced profile.\n\nThe hilt and fittings are enhanced with intricate silver koftgiri work, applied with precision to highlight ornamental detailing and artisanal skill. Complementing the sword is a rich red velvet scabbard, finished with matching silver mounts that elevate the overall presentation.\n\nDesigned for heritage décor, private collections, and luxury display, this sword represents a blend of traditional form, material quality, and decorative craftsmanship.",
    "metaDescription": "40 inch curved Damascus steel sword with silver koftgiri work and velvet scabbard. A refined collectible designed for display and heritage décor.",
    "seoTitle": "Curved Damascus Steel Sword with Silver Koftgiri | 40 Inch"
  },
  {
    "id": 3012,
    "name": "Damascus Steel Talwar Sword with Silver Wire Koftgari – 38 Inch",
    "sku": "MH-012",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 31500.0,
    "price": "₹31,500",
    "regularPriceValue": 45000.0,
    "regularPrice": "₹45,000",
    "image": "/images/blades/blade-12.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This Damascus steel Talwar sword showcases the elegance of traditional Indian sword craftsmanship combined with refined decorative artistry. Designed primarily as a display and collectible piece, it reflects the historic form and presence of the classic Talwar.\n\nThe blunt Damascus steel blade features a subtle patterned surface that enhances its visual depth while maintaining authenticity. Its elongated form and balanced proportions give the sword a commanding appearance, ideal for collectors seeking heritage weapons with character.\n\nThe hilt is adorned with silver wire Koftgari work, applied with care to create intricate contrast against the metal surface. This traditional embellishment adds sophistication without overwhelming the sword’s classic silhouette.\n\nWith an overall length of 38 inches (≈ 96.5 cm), this Talwar sword stands out as a statement piece for interiors, private collections, or cultural displays. Crafted for appreciation rather than combat, it represents enduring artistry and historic design in a refined collectible form.",
    "shortDescription": "●Damascus steel blade with blunt edge, crafted mainly for display and collection\n●Traditional Talwar sword design, reflecting classic Indian sword heritage\n●Silver wire Koftgari work on the hilt, adding refined handcrafted detailing\n●Overall length: 38 inches (≈ 96.5 cm), giving the sword a commanding presence\n●Ideal collectible and décor piece, suited for heritage displays and premium interiors",
    "rating": null,
    "dimensions": "38 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This Damascus steel Talwar sword showcases the elegance of traditional Indian sword craftsmanship combined with refined decorative artistry. Designed primarily as a display and collectible piece, it reflects the historic form and presence of the classic Talwar.\n\nThe blunt Damascus steel blade features a subtle patterned surface that enhances its visual depth while maintaining authenticity. Its elongated form and balanced proportions give the sword a commanding appearance, ideal for collectors seeking heritage weapons with character.\n\nThe hilt is adorned with silver wire Koftgari work, applied with care to create intricate contrast against the metal surface. This traditional embellishment adds sophistication without overwhelming the sword’s classic silhouette.\n\nWith an overall length of 38 inches (≈ 96.5 cm), this Talwar sword stands out as a statement piece for interiors, private collections, or cultural displays. Crafted for appreciation rather than combat, it represents enduring artistry and historic design in a refined collectible form.",
    "metaDescription": "Discover a 38-inch Damascus steel Talwar sword with silver wire Koftgari detailing. A refined collectible blade crafted for display and heritage décor.",
    "seoTitle": "Damascus Steel Talwar Sword with Silver Wire Koftgari | 38 Inch"
  },
  {
    "id": 3013,
    "name": "Damascus Steel Dagger with Elephant Head Handle & Silver Koftgiri (13.5 Inch)",
    "sku": "MH-013",
    "category": "Blades",
    "subCategory": "Metal Handicrafts",
    "priceValue": 4500.0,
    "price": "₹4,500",
    "regularPriceValue": 6500.0,
    "regularPrice": "₹6,500",
    "image": "/images/blades/blade-13.png",
    "artisan": "Gninee Gems",
    "city": "",
    "material": "Damascus steel",
    "description": "This finely crafted dagger reflects the elegance and symbolism found in traditional Indian arms. The Damascus steel blade displays a subtle flowing pattern and a refined curved form, giving the piece both visual depth and historical character.\n\nThe handle is distinguished by a sculpted elephant head design, a symbol of strength and nobility, carefully shaped to create a striking focal point. Enhancing its presence, the handle is adorned with intricate silver koftgiri work, applied with precision to highlight traditional craftsmanship.\n\nComplementing the dagger is a matching scabbard featuring coordinated silver detailing, creating a cohesive and balanced presentation. With a total length of 13.5 inches, this piece is well-proportioned, making it ideal for collectors seeking authenticity, refined artistry, and display appeal.\n\nDesigned primarily for collection and decorative display, this dagger stands as a representation of skilled metalwork and heritage design, suitable for private collections, curated interiors, or as a distinctive statement piece.",
    "shortDescription": "●Damascus steel blade with a graceful curved profile\n●Elephant head–shaped handle, finely detailed for a distinctive look\n●Silver koftgiri work on the handle and matching fittings\n●Total length: 13.5 inches\n●Comes with a decorative scabbard featuring silver work\n●Ideal for collectors, display, and heritage weapon enthusiasts",
    "rating": null,
    "dimensions": "13.5 inch",
    "care": "Wipe with a soft dry cloth; keep away from moisture",
    "story": "This finely crafted dagger reflects the elegance and symbolism found in traditional Indian arms. The Damascus steel blade displays a subtle flowing pattern and a refined curved form, giving the piece both visual depth and historical character.\n\nThe handle is distinguished by a sculpted elephant head design, a symbol of strength and nobility, carefully shaped to create a striking focal point. Enhancing its presence, the handle is adorned with intricate silver koftgiri work, applied with precision to highlight traditional craftsmanship.\n\nComplementing the dagger is a matching scabbard featuring coordinated silver detailing, creating a cohesive and balanced presentation. With a total length of 13.5 inches, this piece is well-proportioned, making it ideal for collectors seeking authenticity, refined artistry, and display appeal.\n\nDesigned primarily for collection and decorative display, this dagger stands as a representation of skilled metalwork and heritage design, suitable for private collections, curated interiors, or as a distinctive statement piece.",
    "metaDescription": "Discover a 13.5 inch Damascus steel dagger featuring an elephant head handle and detailed silver koftgiri work. A refined collectible for display and heritage arms enthusiasts.",
    "seoTitle": "Damascus Steel Dagger – Elephant Head Handle & Silver Koftgiri"
  }
];

const COLLECTIONS = [
  {id:"ceramics",name:"Ceramics",filter:"Ceramics",image:IMG.bowls,copy:"Quiet forms, hand-finished in small studios."},
  {id:"blue-pottery",name:"Blue Pottery",filter:"Blue Pottery",image:IMG.blue,copy:"Jaipur colour, contemporary silhouettes."},
  {id:"metalcraft",name:"Metalcraft",filter:"Metalcraft",image:IMG.terracotta,copy:"Hammer marks, warm brass and Kansa."},
  {id:"terracotta",name:"Terracotta",filter:"Terracotta",image:IMG.terracotta,copy:"Fired earth, sculpted and left honest."},
  {id:"textiles",name:"Textiles",filter:"Textiles",image:IMG.indigo,copy:"Loom-made textures for slower rooms."},
  {id:"woodcraft",name:"Woodcraft",filter:"Woodcraft",image:IMG.sculptural,copy:"Carved grain and useful forms."},
  {id:"home-decor",name:"Home Décor",filter:"Home Décor",image:IMG.terracotta,copy:"Small objects that change the atmosphere."},
];


const POPULAR_THEMES = [
  { id:"earthy", name:"Earthy", copy:"Terracotta, raw clay and carved grain.", query:"earth" },
  { id:"indigo", name:"Indigo", copy:"Deep blue pottery and loom-made texture.", query:"indigo" },
  { id:"quiet-home", name:"Quiet Home", copy:"Objects with a softer, slower presence.", query:"home" },
  { id:"tabletop", name:"Tabletop", copy:"Bowls, trays, runners and everyday rituals.", query:"bowl" },
  { id:"statement", name:"Statement Pieces", copy:"Sculptural forms made to anchor a room.", query:"vase" },
  { id:"gifting", name:"Thoughtful Gifting", copy:"Handmade pieces chosen to be remembered.", query:"" },
];

const INDIA_CRAFTS = [
  {name:"Andhra Pradesh", code:"IN-AP", capital:"Amaravati", crafts:["Kalamkari", "Kondapalli Toys", "Uppada Jamdani"], image:IMG.indigo, cities:"Srikalahasti · Kondapalli · Uppada"},
  {name:"Arunachal Pradesh", code:"IN-AR", capital:"Itanagar", crafts:["Cane & Bamboo", "Monpa Carpets", "Handwoven Textiles"], image:IMG.sculptural, cities:"Tawang · Bomdila · Itanagar"},
  {name:"Assam", code:"IN-AS", capital:"Dispur", crafts:["Muga Silk", "Cane & Bamboo", "Traditional Weaving"], image:"/images/hd6.jpg", cities:"Sualkuchi · Guwahati · Majuli"},
  {name:"Bihar", code:"IN-BR", capital:"Patna", crafts:["Madhubani Painting", "Sikki Grass Craft", "Sujuni Embroidery"], image:IMG.indigo, cities:"Madhubani · Darbhanga · Patna"},
  {name:"Chhattisgarh", code:"IN-CT", capital:"Raipur", crafts:["Dhokra", "Bell Metal", "Terracotta"], image:IMG.terracotta, cities:"Bastar · Kondagaon · Raipur"},
  {name:"Goa", code:"IN-GA", capital:"Panaji", crafts:["Coconut Shell Craft", "Bamboo Craft", "Pottery"], image:IMG.bowls, cities:"Panaji · Bicholim · Margao"},
  {name:"Gujarat", code:"IN-GJ", capital:"Gandhinagar", crafts:["Kutch Embroidery", "Bandhani", "Rogan Art"], image:"/images/textile4.jpg", cities:"Kutch · Patan · Ahmedabad"},
  {name:"Haryana", code:"IN-HR", capital:"Chandigarh", crafts:["Durrie Weaving", "Hand Embroidery", "Terracotta"], image:"/images/textile5.jpg", cities:"Panipat · Ambala · Panchkula"},
  {name:"Himachal Pradesh", code:"IN-HP", capital:"Shimla", crafts:["Chamba Rumal", "Kullu Shawls", "Wood Carving"], image:"/images/wc4.jpg", cities:"Chamba · Kullu · Shimla"},
  {name:"Jharkhand", code:"IN-JH", capital:"Ranchi", crafts:["Sohrai Painting", "Dhokra", "Bamboo Craft"], image:IMG.terracotta, cities:"Hazaribagh · Ranchi · Khunti"},
  {name:"Karnataka", code:"IN-KA", capital:"Bengaluru", crafts:["Mysore Painting", "Sandalwood Carving", "Kasuti Embroidery"], image:"/images/wc5.jpg", cities:"Mysuru · Channapatna · Bengaluru"},
  {name:"Kerala", code:"IN-KL", capital:"Thiruvananthapuram", crafts:["Coir Craft", "Aranmula Metal Mirror", "Wood Carving"], image:"/images/wc4.jpg", cities:"Alappuzha · Aranmula · Thrissur"},
  {name:"Madhya Pradesh", code:"IN-MP", capital:"Bhopal", crafts:["Gond Painting", "Chanderi Weaving", "Bagh Print"], image:"/images/textile3.jpg", cities:"Bhopal · Chanderi · Dhar"},
  {name:"Maharashtra", code:"IN-MH", capital:"Mumbai", crafts:["Warli Painting", "Paithani", "Sawantwadi Craft"], image:"/images/textile6.jpg", cities:"Palghar · Paithan · Sawantwadi"},
  {name:"Manipur", code:"IN-MN", capital:"Imphal", crafts:["Wangkhei Phee", "Cane & Bamboo", "Handloom Weaving"], image:"/images/textile2.jpg", cities:"Imphal · Andro · Bishnupur"},
  {name:"Meghalaya", code:"IN-ML", capital:"Shillong", crafts:["Cane & Bamboo", "Eri Silk", "Khasi Weaving"], image:"/images/hd6.jpg", cities:"Shillong · Jaintia Hills · Tura"},
  {name:"Mizoram", code:"IN-MZ", capital:"Aizawl", crafts:["Bamboo Craft", "Puan Textiles", "Cane Weaving"], image:"/images/textile4.jpg", cities:"Aizawl · Lunglei · Serchhip"},
  {name:"Nagaland", code:"IN-NL", capital:"Kohima", crafts:["Naga Shawls", "Cane & Bamboo", "Wood Carving"], image:"/images/textile5.jpg", cities:"Kohima · Dimapur · Mon"},
  {name:"Odisha", code:"IN-OR", capital:"Bhubaneswar", crafts:["Pattachitra", "Appliqué", "Silver Filigree"], image:IMG.bowls, cities:"Raghurajpur · Pipili · Cuttack"},
  {name:"Punjab", code:"IN-PB", capital:"Chandigarh", crafts:["Phulkari", "Punjabi Jutti", "Durrie Weaving"], image:"/images/textile1.jpg", cities:"Patiala · Amritsar · Ludhiana"},
  {name:"Rajasthan", code:"IN-RJ", capital:"Jaipur", crafts:["Blue Pottery", "Hand Block Printing", "Lac Craft", "Miniature Painting"], image:IMG.blue, cities:"Jaipur · Jodhpur · Udaipur"},
  {name:"Sikkim", code:"IN-SK", capital:"Gangtok", crafts:["Carpet Weaving", "Thangka Painting", "Cane & Bamboo"], image:"/images/textile6.jpg", cities:"Gangtok · Namchi · Pelling"},
  {name:"Tamil Nadu", code:"IN-TN", capital:"Chennai", crafts:["Tanjore Painting", "Bronze Icons", "Kanchipuram Silk"], image:"/images/metalcraft1.jpg", cities:"Thanjavur · Kanchipuram · Swamimalai"},
  {name:"Telangana", code:"IN-TG", capital:"Hyderabad", crafts:["Pochampally Ikat", "Cheriyal Painting", "Bidri Craft"], image:"/images/textile3.jpg", cities:"Pochampally · Hyderabad · Nirmal"},
  {name:"Tripura", code:"IN-TR", capital:"Agartala", crafts:["Bamboo Craft", "Cane Weaving", "Handloom Textiles"], image:"/images/hd6.jpg", cities:"Agartala · Kailashahar · Udaipur"},
  {name:"Uttar Pradesh", code:"IN-UP", capital:"Lucknow", crafts:["Chikankari", "Moradabad Metalcraft", "Saharanpur Woodcraft", "Khurja Pottery"], image:"/images/wc1.jpg", cities:"Lucknow · Moradabad · Saharanpur · Khurja"},
  {name:"Uttarakhand", code:"IN-UT", capital:"Dehradun", crafts:["Ringaal Bamboo Craft", "Aipan Art", "Wool Weaving"], image:"/images/wc2.jpg", cities:"Almora · Nainital · Dehradun"},
  {name:"West Bengal", code:"IN-WB", capital:"Kolkata", crafts:["Kantha", "Bankura Terracotta", "Dokra", "Patachitra"], image:IMG.terracotta, cities:"Bishnupur · Bankura · Kolkata"},
];

const INDIA_UTS = [
  {name:"Andaman & Nicobar Islands", code:"IN-AN", crafts:["Cane & Bamboo", "Shell Craft"]},
  {name:"Chandigarh", code:"IN-CH", crafts:["Phulkari", "Durrie Weaving"]},
  {name:"Dadra & Nagar Haveli and Daman & Diu", code:"IN-DN", crafts:["Warli-inspired Art", "Bamboo Craft"]},
  {name:"Delhi", code:"IN-DL", crafts:["Zari Zardozi", "Hand Embroidery"]},
  {name:"Jammu & Kashmir", code:"IN-JK", crafts:["Kashmiri Embroidery", "Sozni", "Papier-mâché"]},
  {name:"Ladakh", code:"IN-LA", crafts:["Wool Weaving", "Thangka", "Carpet Weaving"]},
  {name:"Lakshadweep", code:"IN-LD", crafts:["Coir Craft", "Coconut Craft"]},
  {name:"Puducherry", code:"IN-PY", crafts:["Papier-mâché", "Terracotta", "Handmade Textiles"]},
];

const INDIA_MAP_POSITIONS = {
  "Jammu & Kashmir":[31,12], "Himachal Pradesh":[36,20], "Punjab":[30,24], "Uttarakhand":[42,28], "Haryana":[30,29], "Rajasthan":[23,36], "Uttar Pradesh":[43,35], "Sikkim":[69,32], "Arunachal Pradesh":[87,32], "Assam":[84,38], "Nagaland":[91,38], "Meghalaya":[80,42], "Bihar":[62,40], "West Bengal":[67,47], "Gujarat":[17,48], "Madhya Pradesh":[41,46], "Jharkhand":[60,47], "Tripura":[77,49], "Mizoram":[87,49], "Chhattisgarh":[49,52], "Maharashtra":[27,58], "Odisha":[50,55], "Telangana":[46,66], "Goa":[19,70], "Karnataka":[26,75], "Andhra Pradesh":[38,70], "Tamil Nadu":[34,83], "Kerala":[23,87]
};



const REGIONAL_CRAFT_IMAGE_RULES = [
  { keys:["pottery","ceramic","terracotta","clay","toy"], category:"Ceramics", images:PRODUCT_IMAGES.ceramics },
  { keys:["metal","brass","bronze","bidri","dhokra","filigree","mirror"], category:"Metalcraft", images:PRODUCT_IMAGES.metalcraft },
  { keys:["wood","carving","sandalwood","lacquer","furniture","toy"], category:"Woodcraft", images:PRODUCT_IMAGES.woodcraft },
  { keys:["textile","silk","weaving","weave","embroidery","ikat","kantha","phulkari","shawl","rumal","jamdani","bandhani","print","jutti","leather"], category:"Textiles", images:PRODUCT_IMAGES.textiles },
  { keys:["painting","art","pattachitra","kalamkari","thangka","madhubani","warli","gond","sohrai","aipan","rogan"], category:"Home Décor", images:PRODUCT_IMAGES.homeDecor },
  { keys:["bamboo","cane","coir","grass","basket","shell","fiber","fibre"], category:"Home Décor", images:PRODUCT_IMAGES.homeDecor },
];

const regionalImageFor = (craft, index) => {
  const normalized = craft.toLowerCase();
  const rule = REGIONAL_CRAFT_IMAGE_RULES.find(r=>r.keys.some(k=>normalized.includes(k))) || REGIONAL_CRAFT_IMAGE_RULES[4];
  return { category:rule.category, image:rule.images[index % rule.images.length] };
};

const REGIONAL_CRAFT_PRODUCTS = INDIA_CRAFTS.flatMap((state, stateIndex) => state.crafts.map((craft, craftIndex) => {
  const {category,image}=regionalImageFor(craft, stateIndex + craftIndex);
  const price = 1650 + ((stateIndex * 577 + craftIndex * 911) % 5600);
  return {
    id:1000 + stateIndex * 10 + craftIndex,
    name:`${craft} · ${state.name}`,
    category,
    priceValue:price,
    price:`₹${price.toLocaleString("en-IN")}`,
    image,
    city:state.cities.split(" · ")[craftIndex % state.cities.split(" · ").length],
    artisan:`OzaBay ${state.name} Craft Edit`,
    material: category === "Textiles" ? "Handcrafted textile" : category === "Metalcraft" ? "Hand-finished metal" : category === "Woodcraft" ? "Carved Indian wood" : category === "Ceramics" ? "Hand-shaped clay" : "Natural craft materials",
    description:`A regional OzaBay craft edit inspired by ${craft} from ${state.name}. Each piece celebrates the material, technique and visual language of the region.`,
    rating:(4.7 + ((stateIndex + craftIndex) % 3) * 0.1).toFixed(1),
    dimensions:["12 × 8 in","10 × 10 in","16 × 16 in"][craftIndex % 3],
    care: category === "Textiles" ? "Gentle dry clean" : "Wipe with a soft dry cloth",
    story:`Regional craft edit · ${craft} · ${state.name}. This listing is part of OzaBay's state-wise craft discovery catalogue.`,
    regional:true,
    state:state.name,
    craft,
  };
}));

const PRODUCTS = [...BASE_PRODUCTS, ...BANGLES_PRODUCTS, ...BLADES_PRODUCTS, ...REGIONAL_CRAFT_PRODUCTS];

const PRICE_BANDS = [
  { label:"Under ₹2,000", max:2000 },
  { label:"₹2,000 – ₹3,500", min:2000, max:3500 },
  { label:"₹3,500 – ₹5,000", min:3500, max:5000 },
  { label:"₹5,000+", min:5000 },
];

const CRAFT_REGIONS = [
  { name:"Jaipur", state:"Rajasthan", image:IMG.blue, filters:["Blue Pottery","Ceramics","Home Décor","Textiles"] },
  { name:"Molela", state:"Rajasthan", image:IMG.terracotta, filters:["Terracotta"] },
  { name:"Saharanpur", state:"Uttar Pradesh", image:IMG.sculptural, filters:["Woodcraft"] },
  { name:"Moradabad", state:"Uttar Pradesh", image:IMG.terracotta, filters:["Metalcraft"] },
  { name:"Khurja", state:"Uttar Pradesh", image:IMG.bowls, filters:["Ceramics","Home Décor"] },
  { name:"Kutch", state:"Gujarat", image:IMG.indigo, filters:["Textiles"] },
];

const CURATED_EDITS = [
  { title:"The Indigo Table", copy:"Blue pottery, indigo cloth and tactile forms for an evening table.", image:IMG.indigo, filters:["Blue Pottery","Textiles","Ceramics"] },
  { title:"A Quiet Home", copy:"Small handmade objects that bring texture without visual noise.", image:IMG.sculptural, filters:["Home Décor","Ceramics","Woodcraft"] },
  { title:"Made for Gifting", copy:"Considered pieces for housewarmings, celebrations and thank-yous.", image:IMG.terracotta, filters:["Terracotta","Home Décor","Textiles"] },
];

const ARTISANS = [
  {id:"meera",name:"Meera Kumari",craft:"Blue Pottery · Jaipur",city:"Jaipur, Rajasthan",story:"A contemporary blue-pottery maker building on a family studio practice, with each motif painted by hand.",image:"https://images.pexels.com/photos/19179113/pexels-photo-19179113.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Blue Pottery",portraitNote:"Representative artisan workshop portrait"},
  {id:"raghav",name:"Raghav Sharma",craft:"Brass & Kansa · Moradabad",city:"Moradabad, Uttar Pradesh",story:"A metalworker who keeps the rhythm of hand-hammering visible in every small-batch vessel.",image:"https://images.pexels.com/photos/25945094/pexels-photo-25945094.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Metalcraft",portraitNote:"Representative artisan workshop portrait"},
  {id:"sana",name:"Sana Sheikh",craft:"Block Print · Jaipur",city:"Jaipur, Rajasthan",story:"A textile artist working with carved blocks, layered dyes and naturally inspired palettes.",image:"https://images.pexels.com/photos/7037689/pexels-photo-7037689.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Textiles",portraitNote:"Representative artisan workshop portrait"},
  {id:"devendra",name:"Devendra Prajapat",craft:"Terracotta · Molela",city:"Molela, Rajasthan",story:"A terracotta sculptor working with local earth and traditional firing methods to create contemporary vessels.",image:"https://images.pexels.com/photos/20887995/pexels-photo-20887995.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Terracotta",portraitNote:"Representative artisan workshop portrait"},
  {id:"imran",name:"Imran Qureshi",craft:"Woodcraft · Saharanpur",city:"Saharanpur, Uttar Pradesh",story:"A wood carver balancing useful everyday forms with detailed hand-carved surfaces.",image:"https://images.pexels.com/photos/37011185/pexels-photo-37011185.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Woodcraft",portraitNote:"Representative artisan workshop portrait"},
  {id:"farida",name:"Farida Ansari",craft:"Stoneware & Loom · Khurja",city:"Khurja, Uttar Pradesh",story:"A maker combining tactile stoneware with textile traditions for quiet, contemporary homes.",image:"https://images.pexels.com/photos/31019536/pexels-photo-31019536.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Ceramics",portraitNote:"Representative artisan workshop portrait"},
];

const MAKER_STORIES = [
  {id:"meera-film",maker:"Meera Kumari",craft:"Pottery / Ceramics",place:"Jaipur · Rajasthan",chapter:"01 · EARTH → FORM",story:"A quiet study of clay becoming form — pressure, water, wheel and the patience behind a finished vessel.",video:"https://videos.pexels.com/video-files/37185415/15752935_1920_1080_60fps.mp4",fallback:VIDEOS.artisanA,source:"Representative pottery workshop footage"},
  {id:"raghav-film",maker:"Raghav Sharma",craft:"Metalcraft",place:"Moradabad · Uttar Pradesh",chapter:"02 · HEAT → HAMMER",story:"Metal changes character through rhythm: heat, hand tools and hundreds of small decisions shape the final surface.",video:"https://videos.pexels.com/video-files/35755402/15157536_1440_3364_24fps.mp4",fallback:VIDEOS.detail,source:"Representative Indian jewelry / metalcraft footage"},
  {id:"sana-film",maker:"Sana Sheikh",craft:"Textiles",place:"Jaipur · Rajasthan",chapter:"03 · PATTERN → CLOTH",story:"From workshop table to finished textile, the craft is built from repetition, touch and carefully placed pattern.",video:"https://videos.pexels.com/video-files/18883016/18883016-uhd_3840_2160_30fps.mp4",fallback:VIDEOS.detail,source:"Representative Indian tailoring workshop footage"},
  {id:"imran-film",maker:"Imran Qureshi",craft:"Woodcraft",place:"Saharanpur · Uttar Pradesh",chapter:"04 · GRAIN → OBJECT",story:"The grain decides the first move. The maker follows it, cuts slowly and lets the surface keep evidence of the hand.",video:"https://videos.pexels.com/video-files/35323776/14966671_1920_1080_50fps.mp4",fallback:VIDEOS.detail,source:"Representative woodcraft workshop footage"},
];

const REVIEWS=[
  ["Aarohi S.","The blue pottery piece feels genuinely handmade and the finish is even better in person.",5],
  ["Kabir M.","The 3D view made it much easier to understand the scale before adding it to my bag.",5],
  ["Naina P.","Beautiful packaging concept and a very thoughtful maker story.",4],
];

const CUSTOM_PRICES={form:{Vessel:3200,Bowl:2400,Lamp:4800,Planter:2800},material:{Clay:0,Stoneware:700,Brass:1900,Wood:900},finish:{Natural:0,Speckled:350,Indigo:500,"Hand-painted":900},size:{Small:0,Medium:700,Large:1500},tone:{Earth:0,Indigo:150,Sand:100,Forest:200}};

function money(v){return `₹${v.toLocaleString("en-IN")}`;}
function Reveal({children,className="",id}){const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("is-visible");obs.disconnect();}}, {threshold:.06});obs.observe(el);return()=>obs.disconnect();},[]);return <div ref={ref} id={id} className={`reveal ${className}`}>{children}</div>}
function TiltCard({children,className=""}){
  const ref=useRef(null);
  const target=useRef({x:0,y:0,lift:0,mx:50,my:50});
  const current=useRef({x:0,y:0,lift:0});
  useEffect(()=>{
    let frame;
    const tick=()=>{
      const el=ref.current;
      if(el){
        current.current.x+=(target.current.x-current.current.x)*.075;
        current.current.y+=(target.current.y-current.current.y)*.075;
        current.current.lift+=(target.current.lift-current.current.lift)*.08;
        el.style.transform=`perspective(1400px) translate3d(0,${-current.current.lift}px,0) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`;
      }
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  },[]);
  const move=e=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const px=(e.clientX-r.left)/r.width;const py=(e.clientY-r.top)/r.height;target.current={x:(px-.5)*2.6,y:(py-.5)*-2.6,lift:2,mx:px*100,my:py*100};el.style.setProperty("--pointer-x",`${px*100}%`);el.style.setProperty("--pointer-y",`${py*100}%`)};
  const leave=()=>{const el=ref.current;target.current={x:0,y:0,lift:0,mx:50,my:50};if(el){el.style.setProperty("--pointer-x","50%");el.style.setProperty("--pointer-y","50%")}};
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</div>
}
function BuilderGroup({label,value,options,onChange}){return <div className="builder-group"><span>{label}</span><div>{options.map(o=><button key={o} type="button" className={value===o?"is-selected":""} onClick={()=>onChange(o)}>{o}</button>)}</div></div>}

function CustomLivePreview({custom,price,image,onPrice}){
  const sizeLabel={Small:"Compact",Medium:"Balanced",Large:"Statement"}[custom.size];
  return <div className="custom-live-preview">
    <div className="custom-preview-topline"><span><i/> LIVE CRAFT FILM</span><small>Watch the making, in real time</small></div>
    <div className="custom-preview-stage custom-preview-stage--video">
      <video className="custom-preview-video" src="/videos/OZABAY.mp4" autoPlay muted loop playsInline preload="metadata"/>
      <div className="custom-preview-video-veil"/>
      <div className="custom-preview-spec"><span>{custom.form}</span><b>{custom.material}</b><em>{custom.finish}</em></div>
    </div>
    <div className="custom-preview-summary">
      <div><span>YOUR CONFIGURATION</span><strong>{custom.form} · {sizeLabel}</strong></div>
      <div className="custom-preview-price"><small>Estimated from</small><strong>{money(price)}</strong></div>
    </div>
    <div className="custom-preview-note"><span>Visual concept preview</span><p>This film shows our artisans at work. Colours, finish and proportions of your own piece are confirmed with you after design review.</p></div>
  </div>
}

function CustomDesignUpload({onConfirm}){
  const inputRef=useRef(null);
  const [stage,setStage]=useState("idle");
  const [fileName,setFileName]=useState("");
  const [previewUrl,setPreviewUrl]=useState(null);
  const [note,setNote]=useState("");
  const [dragOver,setDragOver]=useState(false);
  const [artisan,setArtisan]=useState(null);
  const [budget,setBudget]=useState(0);

  const ARTISANS=[
    {name:"Meera Joshi",craft:"Blue Pottery · Jaipur"},
    {name:"Raghav Sen",craft:"Metal Repoussé · Moradabad"},
    {name:"Ila Verma",craft:"Hand-block Textiles · Bhuj"},
    {name:"Devendra Patil",craft:"Terracotta · Pune"},
  ];

  const handleFile=file=>{
    if(!file||!file.type.startsWith("image/"))return;
    const reader=new FileReader();
    reader.onload=()=>{setPreviewUrl(reader.result);setFileName(file.name);setStage("preview")};
    reader.readAsDataURL(file);
  };
  const onInputChange=e=>handleFile(e.target.files?.[0]);
  const onDrop=e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files?.[0])};

  const submit=()=>{
    setStage("verifying");
    setTimeout(()=>{
      setStage("assigning");
      setArtisan(ARTISANS[Math.floor(Math.random()*ARTISANS.length)]);
      setTimeout(()=>{
        setStage("budget");
        setBudget(4200+Math.floor(Math.random()*2600));
        setTimeout(()=>setStage("done"),1300);
      },1500);
    },1600);
  };

  const reset=()=>{
    setStage("idle");setPreviewUrl(null);setFileName("");setNote("");setArtisan(null);setBudget(0);
    if(inputRef.current)inputRef.current.value="";
  };

  return <div className="design-upload">
    <div className="custom-preview-topline"><span><i/> UPLOAD YOUR DESIGN</span><small>Turn any reference into a made piece</small></div>
    <div className="custom-studio-flow custom-studio-flow--inside"><span><b>01</b> Upload</span><i>→</i><span><b>02</b> Verify</span><i>→</i><span><b>03</b> Artisan</span><i>→</i><span><b>04</b> Budget</span></div>
    {stage==="idle"&&(
      <div className={`design-upload__drop ${dragOver?"is-drag":""}`}
        onDragOver={e=>{e.preventDefault();setDragOver(true)}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={onDrop}
        onClick={()=>inputRef.current?.click()}
        role="button" tabIndex={0}
        onKeyDown={e=>e.key==="Enter"&&inputRef.current?.click()}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M12 4l-4 4M12 4l4 4"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"/></svg>
        <p>Upload a photo or sketch of your idea</p>
        <small>Drag & drop, or click to browse — JPG or PNG</small>
        <input ref={inputRef} type="file" accept="image/*" onChange={onInputChange} hidden/>
      </div>
    )}

    {stage==="preview"&&(
      <div className="design-upload__review">
        <div className="design-upload__thumb" style={{backgroundImage:`url(${previewUrl})`}}/>
        <p className="design-upload__filename">{fileName}</p>
        <textarea className="design-upload__note" rows="2" placeholder="Material, size, colour, occasion…" value={note} onChange={e=>setNote(e.target.value)}/>
        <div className="design-upload__actions">
          <button type="button" className="text-link" onClick={reset}>Change Image</button>
          <button type="button" className="hero-action" onClick={submit}>Submit for Review ↗</button>
        </div>
      </div>
    )}

    {(stage==="verifying"||stage==="assigning"||stage==="budget")&&(
      <div className="design-upload__status">
        <span className="design-upload__spinner"/>
        <p>{stage==="verifying"&&"Verifying your design…"}{stage==="assigning"&&"Matching you with an artisan…"}{stage==="budget"&&"Estimating your budget…"}</p>
        <div className="design-upload__trail">
          <i className={stage==="verifying"?"is-active":"is-done"}/>
          <i className={stage==="assigning"?"is-active":stage==="budget"?"is-done":""}/>
          <i className={stage==="budget"?"is-active":""}/>
        </div>
      </div>
    )}

    {stage==="done"&&(
      <div className="design-upload__done">
        <span className="design-upload__check"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg></span>
        <p className="design-upload__done-title">Your request is ready for review</p>
        <div className="design-upload__result">
          <div><small>Artisan assigned</small><strong>{artisan?.name}</strong><em>{artisan?.craft}</em></div>
          <div><small>Estimated budget</small><strong>{money(budget)} – {money(budget+1800)}</strong></div>
        </div>
        <div className="design-upload__actions">
          <button type="button" className="text-link" onClick={reset}>Upload Another</button>
          <button type="button" className="hero-action" onClick={onConfirm}>Confirm & Start ↗</button>
        </div>
      </div>
    )}
  </div>
}

function GiftBuilder({gift,setGift,onCreate}){
  const budgetMax={"₹5,000":5000,"₹10,000":10000,"₹20,000+":20000}[gift.budget]||5000;
  const styleCategories={
    Earthy:["Terracotta","Ceramics","Woodcraft"],
    Indigo:["Blue Pottery","Textiles","Ceramics"],
    "Warm metal":["Metalcraft","Woodcraft","Home Décor"],
    Textured:["Textiles","Woodcraft","Home Décor"],
  };
  const pool=PRODUCTS.filter(p=>styleCategories[gift.style]?.includes(p.category));
  const ranked=pool.slice().sort((a,b)=>{
    const da=Math.abs(budgetMax/Math.max(1,3)-a.priceValue);
    const db=Math.abs(budgetMax/Math.max(1,3)-b.priceValue);
    return da-db;
  });
  const selected=[];
  let total=0;
  for(const item of ranked){
    if(selected.length>=3) break;
    if(total+item.priceValue<=budgetMax || selected.length===0){selected.push(item);total+=item.priceValue;}
  }
  const display=selected.length?selected:ranked.slice(0,3);
  const displayTotal=display.reduce((n,p)=>n+p.priceValue,0);
  const remaining=Math.max(0,budgetMax-displayTotal);
  const setGiftValue=(key,value)=>setGift(g=>({...g,[key]:value}));
  return 
}


function StateCraftMarketplace({state, products, onBack, onProduct, onAdd, onToggleWish, wish}){
  const [craftFilter,setCraftFilter]=useState(new URLSearchParams(window.location.search).get("craft")||"All");
  const [sort,setSort]=useState("featured");
  const available=products.filter(p=>craftFilter==="All"||p.craft===craftFilter);
  const shown=[...available].sort((a,b)=>sort==="low"?a.priceValue-b.priceValue:sort==="high"?b.priceValue-a.priceValue:0);
  return <section className="state-market-page"><div className="state-market-orbit" aria-hidden="true"/><div className="oz-container">
    <button className="state-market-back" onClick={onBack}>← Back to India Craft Atlas</button>
    <div className="state-market-hero"><div><p className="eyebrow">OZABAY · REGIONAL CRAFT EDIT</p><span className="state-market-kicker">CRAFTED IN INDIA · {state.code}</span><h1>{state.name}<em> craft.</em></h1><p>Explore handmade traditions from {state.name}, brought together in one dedicated edit.</p><div className="state-market-meta"><span>CRAFT CENTRES</span><strong>{state.cities}</strong></div></div><div className="state-market-hero-art"><img src={state.image} alt={`${state.name} craft inspiration`}/><span>THE REGIONAL EDIT · 01</span></div></div>
    <div className="state-market-toolbar"><div><p className="eyebrow">SHOP BY TRADITION</p><div className="state-market-filters"><button className={craftFilter==="All"?"active":""} onClick={()=>setCraftFilter("All")}>All crafts</button>{state.crafts.map(c=><button key={c} className={craftFilter===c?"active":""} onClick={()=>setCraftFilter(c)}>{c}</button>)}</div></div><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
    <div className="state-market-count"><span>{state.name.toUpperCase()} · {shown.length} PIECES</span><span>HANDMADE · SMALL BATCH · MAKER FIRST</span></div>
    {shown.length?<div className="state-market-grid">{shown.map((p,i)=><article className="state-market-card" key={p.id} style={{"--card-index":i}}><button className="state-market-image" onClick={()=>onProduct(p)}><img src={p.image} alt={p.name}/><span>VIEW PIECE ↗</span></button><div className="state-market-card-copy"><small>{p.craft} · {p.city}</small><button className="state-market-name" onClick={()=>onProduct(p)}>{p.name}</button><div><strong>{p.price}</strong><button className={`state-market-wish ${wish.includes(p.id)?"liked":""}`} onClick={()=>onToggleWish(p)} aria-label="Toggle wishlist">♡</button></div><button className="state-market-add" onClick={()=>onAdd(p)}>Add to bag <span>↗</span></button></div></article>)}</div>:<div className="state-market-empty">No products in this craft edit yet. Choose another tradition.</div>}
    <div className="state-market-footnote">A considered collection inspired by {state.name}. Dedicated regional pieces can be expanded as authentic products and photography are added.</div>
  </div></section>
}

function RegionalCrafts({onRegion,onProduct}){
  const [selected,setSelected]=useState(INDIA_CRAFTS.find(s=>s.name==="Rajasthan")||INDIA_CRAFTS[0]);
  const [hovered,setHovered]=useState(null);
  const choose=state=>setSelected(state);
  const selectedProducts=REGIONAL_CRAFT_PRODUCTS.filter(p=>p.state===selected.name);
  return <section className="oz-section regional-crafts" id="crafts-india">
    <div className="oz-container">
      <Reveal><div className="section-head"><div><p className="eyebrow">Craft across India</p><h2>Every state. <em>Its craft.</em></h2></div><p>Hover or click a state to reveal its signature crafts. Every craft is connected to an OzaBay product edit so the map becomes a simple way to discover and shop India, state by state.</p></div></Reveal>
      <div className="india-craft-explorer">
        <div className="india-map-panel">
          <div className="india-map-top"><span>INDIA · CRAFT ATLAS</span><small>{INDIA_CRAFTS.length} states · {INDIA_UTS.length} union territories</small></div>
          <div className="india-map-stage">
            <div className="india-map-aura"/>
            <div className="india-map-sheen"/>
            <img className="india-map-image" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/India_states_and_union_territories_map.svg" alt="Map of India showing states and union territories" loading="lazy"/>
            <div className="india-map-overlay">
              {INDIA_CRAFTS.map(state=>{
                const [left,top]=INDIA_MAP_POSITIONS[state.name]||[50,50];
                const active=selected.code===state.code;
                const visible=hovered===state.code||active;
                return <button key={state.code} className={`india-state-pin ${active?"is-active":""} ${hovered===state.code?"is-hovered":""}`} style={{left:`${left}%`,top:`${top}%`}} onMouseEnter={()=>setHovered(state.code)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(state.code)} onBlur={()=>setHovered(null)} onClick={()=>choose(state)} aria-label={`Explore crafts of ${state.name}`}>
                  <i/>{visible&&<span>{state.name}<small>{state.crafts.length} craft edits</small></span>}
                </button>;
              })}
            </div>
            <div className="india-map-legend"><span><i/>Craft state</span><span><b>01</b> Hover</span><span><b>02</b> Click</span></div>
          </div>
          <div className="india-map-help"><span>● Hover a state</span><span>↗ Click to explore</span><span>⌁ Product edits open on the right</span></div>
        </div>
        <aside className="india-craft-detail">
          <div className="india-craft-detail__image"><img src={selected.image} alt=""/><div className="india-craft-detail__image-wash"/><span>{selected.name.toUpperCase()}</span></div>
          <div className="india-craft-detail__body">
            <div className="india-craft-detail__meta"><span>{selected.code}</span><small>{selected.capital}</small></div>
            <p className="eyebrow">Selected state</p>
            <h3>{selected.name}</h3>
            <p className="india-craft-cities">Craft centres · {selected.cities}</p>
            <div className="india-craft-list">{selected.crafts.map((craft,i)=><button key={craft} onClick={()=>onRegion?.({name:selected.name,filters:[],query:craft})}><span>0{i+1}</span><strong>{craft}</strong><i>↗</i></button>)}</div>
            <div className="india-product-rail-head"><span>AVAILABLE ON OZABAY</span><small>{selectedProducts.length} regional edits</small></div>
            <div className="india-product-rail">{selectedProducts.map(product=><button key={product.id} onClick={()=>onProduct?.(product)}><img src={product.image} alt=""/><span>{product.craft}</span><strong>{product.price}</strong></button>)}</div>
            <button className="hero-action india-shop-state" onClick={()=>onRegion?.({name:selected.name,filters:[],query:null})}>Shop {selected.name} craft ↗</button>
          </div>
        </aside>
      </div>
    </div>
  </section>
}

function CuratedEdits({onExplore}){
  return 
}

function TrustStrip(){
  const items=[["AUTHENTIC","Handmade pieces"],["MAKER FIRST","Stories behind every object"],["SECURE BAG","Frontend checkout flow"],["INDIA","Crafted across regions"]];
  return <section className="trust-strip"><div className="oz-container trust-strip__grid">{items.map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section>
}

function CraftFilm(){
  const sectionRef=useRef(null);
  const [stage,setStage]=useState(0);
  const [videoFailed,setVideoFailed]=useState({a:false,b:false});
  const stages=[
    {eyebrow:"01 · MATERIAL",title:"It begins with earth.",copy:"Raw clay meets the hands that know exactly how it should move.",image:IMG.terracotta,video:"a"},
    {eyebrow:"02 · HANDS",title:"Made by hand.",copy:"Pressure, rhythm and patience shape every curve of the piece.",image:IMG.sculptural,video:"a"},
    {eyebrow:"03 · DETAIL",title:"Finished slowly.",copy:"Every turn of the wheel leaves behind a detail no machine can repeat.",image:IMG.blue,video:"b"},
    {eyebrow:"04 · OBJECT",title:"From hands to home.",copy:"A workshop gesture becomes an object made to live with you.",image:IMG.indigo,video:"b"},
  ];
  useEffect(()=>{
    const el=sectionRef.current;if(!el)return;
    const update=()=>{
      const r=el.getBoundingClientRect();
      const total=Math.max(1,r.height-window.innerHeight);
      const progress=Math.min(1,Math.max(0,-r.top/total));
      setStage(Math.min(stages.length-1,Math.floor(progress*stages.length)));
    };
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
    return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  const jumpStage=(index)=>{
    setStage(index);
    const el=sectionRef.current;if(!el)return;
    const maxScroll=Math.max(0,el.offsetHeight-window.innerHeight);
    const target=el.getBoundingClientRect().top+window.scrollY+(maxScroll*(index/(stages.length-1)));
    window.scrollTo({top:target,behavior:"smooth"});
  };
  const active=stages[stage];
  const srcA=videoFailed.a?VIDEOS.craft:VIDEOS.artisanA;
  const srcB=videoFailed.b?VIDEOS.detail:VIDEOS.artisanB;
  return <section ref={sectionRef} className="oz-section craft-film craft-film--story">
    <div className="craft-story-pin">
      <div className="craft-story-frame">
        <video className={`craft-story-video craft-story-video--a ${active.video==="a"?"is-active":""}`} src={srcA} autoPlay muted loop playsInline preload="metadata" poster={IMG.terracotta} onError={()=>setVideoFailed(v=>({...v,a:true}))} aria-label="Artisan shaping clay by hand on a pottery wheel"/>
        <video className={`craft-story-video craft-story-video--b ${active.video==="b"?"is-active":""}`} src={srcB} autoPlay muted loop playsInline preload="metadata" poster={IMG.sculptural} onError={()=>setVideoFailed(v=>({...v,b:true}))} aria-label="Close-up of an artisan molding clay on a pottery wheel"/>
        <div className="craft-story-wash"/>
        <div className="craft-story-filmgrain" aria-hidden="true"/>
        <div className="craft-story-product"><img src={active.image} alt=""/><span>HANDMADE / INDIA</span></div>
        <div className="craft-story-copy" key={stage}>
          <p className="eyebrow">{active.eyebrow}</p><h2>{active.title}</h2><p>{active.copy}</p>
          <button className="hero-action" onClick={()=>document.getElementById("artisans")?.scrollIntoView({behavior:"smooth"})}>Meet the makers ↗</button>
        </div>
        <div className="craft-story-steps" aria-label="Craft story progress">{stages.map((s,i)=><button key={s.eyebrow} className={i===stage?"is-active":""} onClick={()=>jumpStage(i)} aria-label={`Go to ${s.eyebrow}`}><span/></button>)}</div>
        <div className="craft-story-caption"><span>OZABAY / CRAFT FILM · REAL MAKER FOOTAGE</span><strong>FROM HANDS <i>→</i> HOME</strong></div>
        <div className="craft-story-live"><i/> LIVE CRAFT FILM</div>
      </div>
    </div>
  </section>
}

function MakerStories(){
  return <section className="maker-stories oz-section">
    <div className="oz-container">
      <Reveal><div className="section-head maker-stories__head"><div><p className="eyebrow">The making / moving image</p><h2>Stories that <em>start with the hands.</em></h2></div><p>Meet the craft through motion — wheel, hammer, thread and grain. These films are representative workshop footage used to bring the craft story to life until OzaBay has its own commissioned maker films.</p></div></Reveal>
      <div className="maker-stories__rail">
        {MAKER_STORIES.map((story,i)=><article className="maker-story-card" key={story.id}>
          <div className="maker-story-card__media">
            <video src={story.video} autoPlay muted loop playsInline preload="metadata" poster={i===0?IMG.terracotta:i===1?IMG.blue:i===2?IMG.indigo:IMG.sculptural} onError={e=>{if(e.currentTarget.src!==story.fallback)e.currentTarget.src=story.fallback}} aria-label={`${story.craft} workshop footage`}/>
            <div className="maker-story-card__wash"/>
            <span className="maker-story-card__index">{story.chapter}</span>
            <span className="maker-story-card__sound"><i/> SOUND OFF · CINEMATIC LOOP</span>
          </div>
          <div className="maker-story-card__copy"><p>{story.craft} · {story.place}</p><h3>{story.maker}</h3><span>{story.story}</span><small>{story.source}</small></div>
        </article>)}
      </div>
    </div>
  </section>
}

function Product3DViewer({product,onClose,onAdd,onSpace}){
  const [rotation,setRotation]=useState(-18);
  const [pitch,setPitch]=useState(3);
  const [zoom,setZoom]=useState(1);
  const [autoSpin,setAutoSpin]=useState(true);
  const [light,setLight]=useState({x:50,y:42});
  const viewerSrc=product.viewerImage||product.image;
  const dragging=useRef(false);
  const last=useRef({x:0,y:0});
  const reset=()=>{setRotation(-18);setPitch(3);setZoom(1);setAutoSpin(true);setLight({x:50,y:42});};
  useEffect(()=>{if(!autoSpin)return;const id=setInterval(()=>setRotation(v=>(v+.42)%360),32);return()=>clearInterval(id)},[autoSpin]);
  const down=e=>{if(e.button!==undefined&&e.button!==0)return;dragging.current=true;last.current={x:e.clientX,y:e.clientY};setAutoSpin(false);e.currentTarget.setPointerCapture?.(e.pointerId)};
  const move=e=>{const r=e.currentTarget.getBoundingClientRect();setLight({x:Math.max(8,Math.min(92,((e.clientX-r.left)/r.width)*100)),y:Math.max(8,Math.min(88,((e.clientY-r.top)/r.height)*100))});if(!dragging.current)return;const dx=e.clientX-last.current.x;const dy=e.clientY-last.current.y;last.current={x:e.clientX,y:e.clientY};setRotation(v=>v+dx*.62);setPitch(v=>Math.max(-16,Math.min(18,v-dy*.34)))};
  const stop=()=>{dragging.current=false};
  const zoomIn=()=>setZoom(v=>Math.min(1.55,Number((v+.1).toFixed(2))));
  const zoomOut=()=>setZoom(v=>Math.max(.72,Number((v-.1).toFixed(2))));
  return <div className="viewer-shell">
    <button className="modal-close" onClick={onClose} aria-label="Close 3D viewer">×</button>
    <div className="viewer-copy">
      <p className="eyebrow">Interactive product studio</p>
      <h2>See it from <em>every angle.</em></h2>
      <p>Explore the piece like you are holding it in your hands. Drag in any direction, zoom into the silhouette and switch to the room preview when you are ready.</p>
      <div className="viewer-status"><span className={autoSpin?"is-live":""}><i/> {autoSpin?"Auto orbiting":"Manual inspection"}</span><span>Drag · Pinch / scroll · Arrow keys</span></div>
      <div className="viewer-actions"><button className="hero-action" onClick={()=>setAutoSpin(v=>!v)}>{autoSpin?"Pause rotation":"Auto rotate"} ↻</button><button className="text-link" onClick={()=>onSpace(product)}>View in your space ↗</button><button className="text-link" onClick={()=>onAdd(product)}>Add to bag ↗</button></div>
    </div>
    <div className="viewer-stage" style={{"--viewer-light-x":`${light.x}%`,"--viewer-light-y":`${light.y}%`}} onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onDoubleClick={reset} onWheel={e=>e.deltaY<0?zoomIn():zoomOut()} tabIndex="0" onKeyDown={e=>{if(e.key==="ArrowLeft")setRotation(v=>v-10);if(e.key==="ArrowRight")setRotation(v=>v+10);if(e.key==="ArrowUp")setPitch(v=>Math.max(-16,v-7));if(e.key==="ArrowDown")setPitch(v=>Math.min(18,v+7));if(e.key==="+")zoomIn();if(e.key==="-")zoomOut();if(e.key==="0")reset();}} aria-label={`Interactive 3D presentation of ${product.name}`}>
      <div className="viewer-halo"/><div className="viewer-floor"/><div className="viewer-grid"/>
      <div className="viewer-object" style={{transform:`translateZ(0) scale(${zoom}) rotateX(${pitch}deg) rotateY(${rotation}deg)`}}>
        <span className="viewer-layer viewer-layer--back"><img src={viewerSrc} alt="" draggable="false"/></span>
        <span className="viewer-layer viewer-layer--mid"><img src={viewerSrc} alt="" draggable="false"/></span>
        <span className="viewer-layer viewer-layer--front"><img src={viewerSrc} alt={product.name} draggable="false"/></span>
        <span className="viewer-specular"/>
      </div>
      <div className="viewer-controls" onPointerDown={e=>e.stopPropagation()}><button onClick={zoomIn} aria-label="Zoom in">+</button><button onClick={reset} aria-label="Reset 3D view">Reset</button><button onClick={zoomOut} aria-label="Zoom out">−</button></div>
      <span className="viewer-hint">Drag to orbit · Double click to reset</span>
    </div>
    <div className="viewer-meta"><strong>{product.name}</strong><span>{product.category} · {money(product.priceValue)} · {product.city}</span></div>
  </div>
}

function ProductDetail({product,onClose,onAdd,onView3D,onSpace,onReview}){
  const [tab,setTab]=useState("story");
  return <div><button className="modal-close" onClick={onClose}>×</button><div className="pdp-grid"><div className="pdp-media"><div className="pdp-main-image"><img src={product.image} alt={product.name}/><span className="media-badge">Handmade{product.rating ? ` · ${product.rating} ★` : ""}</span></div><div className="pdp-media-row"><img src={product.image} alt="Product detail"/>{product.category === "Bangles" ? <img src={product.galleryImage || product.image} alt={`${product.name} second view`}/> : <video src={VIDEOS.detail} autoPlay muted loop playsInline poster={product.image}/>}</div><div className="pdp-media-actions"><button onClick={()=>onView3D(product)}>3D view ↗</button><button onClick={()=>onSpace(product)}>View in your space ↗</button></div></div><div className="pdp-copy"><p className="eyebrow">{product.category}{product.city ? ` · ${product.city}` : ""}</p><h2>{product.name}</h2><div className="pdp-price-row"><strong>{product.price}</strong>{product.rating&&<span>★ {product.rating}</span>}</div><p>{product.description}</p><div className="pdp-maker"><span>Made by</span><strong>{product.artisan}</strong><small>{product.story}</small></div><div className="pdp-tabs"><button className={tab==="story"?"is-active":""} onClick={()=>setTab("story")}>Story</button><button className={tab==="details"?"is-active":""} onClick={()=>setTab("details")}>Details</button><button className={tab==="reviews"?"is-active":""} onClick={()=>setTab("reviews")}>Reviews</button></div>{tab==="story"&&<div className="tab-panel"><p>{product.story}</p><div className="craft-note"><span>Craft passport</span><strong>Handmade in {product.city}</strong><small>Small-batch edition · maker verified · natural variation expected</small></div></div>}{tab==="details"&&<div className="tab-panel product-facts"><span>Material <b>{product.material}</b></span><span>Dimensions <b>{product.dimensions}</b></span><span>Care <b>{product.care}</b></span><span>Maker <b>{product.artisan}</b></span>{product.sku&&<span>SKU <b>{product.sku}</b></span>}{product.regularPrice&&<span>Regular price <b>{product.regularPrice}</b></span>}</div>}{tab==="reviews"&&<div className="tab-panel review-list">{REVIEWS.map(([n,t,r])=><div key={n}><strong>{n} <span>{"★".repeat(r)}</span></strong><p>{t}</p></div>)}<button className="text-link" onClick={()=>onReview(product)}>Write a review ↗</button></div>}<button className="hero-action" onClick={()=>onAdd(product)}>Add to bag · {product.price} ↗</button></div></div></div>
}

export default function App(){
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-cart")||"[]")}catch{return []}});
  const [wish,setWish]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-wishlist")||"[]")}catch{return []}});
  const [recentlyViewed,setRecentlyViewed]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-recently-viewed")||"[]")}catch{return []}});
  const [filter,setFilter]=useState("All");const [sort,setSort]=useState("featured");const [query,setQuery]=useState("");const [priceBand,setPriceBand]=useState(null);const [modal,setModal]=useState(null);const [page,setPage]=useState(1);
  const [custom,setCustom]=useState({form:"Vessel",material:"Clay",finish:"Natural",size:"Medium",tone:"Earth",engraving:"",notes:""});
  const [orderForm,setOrderForm]=useState({name:"",email:"",phone:"",city:"",address:"",quantity:"1",budget:"",neededBy:"",purpose:"",referenceName:"",approval:"Yes"});const [orderSent,setOrderSent]=useState(false);const [requestId,setRequestId]=useState("");const [customStep,setCustomStep]=useState(1);
  const [account,setAccount]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-account")||"null")}catch{return null}});
  const [checkout,setCheckout]=useState({name:"",phone:"",email:"",address:"",city:"",pincode:"",payment:"Cash on delivery"});const [placedOrder,setPlacedOrder]=useState(null);
  const [tracking,setTracking]=useState("");const [reviewProduct,setReviewProduct]=useState(null);
  const [scrollProgress,setScrollProgress]=useState(0);
  const [craftRoute,setCraftRoute]=useState(()=>{const m=window.location.pathname.match(/^\/crafts\/([^/]+)/);return m?m[1]:null});
  const [gift,setGift]=useState({occasion:"Housewarming",recipient:"Parents",budget:"₹5,000",style:"Earthy",wrapping:true,message:"Wishing you a beautiful new beginning."});
  const perPage=12;
  const categories=["All",...COLLECTIONS.map(c=>c.filter),"Bangles","Blades"];
  const shown=useMemo(()=>{let list=PRODUCTS.filter(p=>(filter==="All"||p.category===filter)&&(!priceBand||(priceBand.min==null||p.priceValue>=priceBand.min)&&(priceBand.max==null||p.priceValue<priceBand.max))&&`${p.name} ${p.category} ${p.artisan} ${p.city} ${p.material}`.toLowerCase().includes(query.toLowerCase()));if(sort==="price-low")list.sort((a,b)=>a.priceValue-b.priceValue);if(sort==="price-high")list.sort((a,b)=>b.priceValue-a.priceValue);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));return list},[filter,query,sort,priceBand]);
  const visible=shown.slice(0,page*perPage);const totalPages=Math.max(1,Math.ceil(shown.length/perPage));const cartCount=cart.reduce((n,p)=>n+p.qty,0);const cartTotal=cart.reduce((n,p)=>n+p.priceValue*p.qty,0);
  const customPrice=CUSTOM_PRICES.form[custom.form]+CUSTOM_PRICES.material[custom.material]+CUSTOM_PRICES.finish[custom.finish]+CUSTOM_PRICES.size[custom.size]+CUSTOM_PRICES.tone[custom.tone]+(custom.engraving.trim()?450:0);
  const customImage=custom.material==="Brass"?IMG.blue:(custom.finish==="Indigo"||custom.tone==="Indigo"?IMG.indigo:IMG.sculptural);
  const go=id=>{if(craftRoute){window.history.pushState({},"",`/#${id}`);setCraftRoute(null);setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"}),60);return;}document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})};
  const stateSlug=state=>state.name.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const openStateCraft=(state,craft=null)=>{const slug=stateSlug(state);const path=`/crafts/${slug}${craft?`?craft=${encodeURIComponent(craft)}`:""}`;window.history.pushState({craftRoute:slug},"",path);setCraftRoute(slug);setModal(null);window.scrollTo({top:0,behavior:"smooth"});};
  const backToAtlas=()=>{window.history.pushState({},"","/#crafts-india");setCraftRoute(null);setTimeout(()=>document.getElementById("crafts-india")?.scrollIntoView({behavior:"smooth",block:"start"}),40);};
  useEffect(()=>{const onPop=()=>{const m=window.location.pathname.match(/^\/crafts\/([^/]+)/);setCraftRoute(m?m[1]:null)};window.addEventListener("popstate",onPop);return()=>window.removeEventListener("popstate",onPop)},[]);
  useEffect(()=>{setPage(1)},[filter,query,sort,priceBand]);useEffect(()=>{localStorage.setItem("ozabay-cart",JSON.stringify(cart))},[cart]);useEffect(()=>{localStorage.setItem("ozabay-wishlist",JSON.stringify(wish))},[wish]);
  useEffect(()=>{localStorage.setItem("ozabay-recently-viewed",JSON.stringify(recentlyViewed))},[recentlyViewed]);
  useEffect(()=>{if(modal?.type!=="product")return;const id=modal.product?.id;if(!id)return;setRecentlyViewed(prev=>[id,...prev.filter(x=>x!==id)].slice(0,6));},[modal]);
  useEffect(()=>{const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setScrollProgress(max>0?(window.scrollY/max)*100:0)};update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update)}},[]);
  const add=p=>setCart(c=>c.some(x=>x.id===p.id)?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]);
  const remove=id=>setCart(c=>c.filter(x=>x.id!==id));const qty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));const toggleWish=p=>setWish(w=>w.includes(p.id)?w.filter(id=>id!==p.id):[...w,p.id]);
  const addCustom=()=>{const p={id:`custom-${Date.now()}`,name:`Custom ${custom.form}`,category:"Made to order",priceValue:customPrice,price:money(customPrice),image:customImage,artisan:"OzaBay Custom Studio",city:"India",material:custom.material,custom:{...custom}};setCart(c=>[...c,{...p,qty:1}]);setModal("cart")};
  const submitCustom=e=>{e.preventDefault();const id=`OZ-C${Date.now().toString().slice(-7)}`;const payload={requestId:id,createdAt:new Date().toISOString(),customer:orderForm,design:custom,price:customPrice};localStorage.setItem("ozabay-last-custom-request",JSON.stringify(payload));setRequestId(id);setOrderSent(true);setCustomStep(1)};
  const placeOrder=e=>{e.preventDefault();if(!cart.length)return;const id=`OZ-${Date.now().toString().slice(-7)}`;const order={id,createdAt:new Date().toISOString(),items:cart,total:cartTotal,customer:checkout,status:"Crafting"};localStorage.setItem("ozabay-last-order",JSON.stringify(order));setPlacedOrder(order);setCart([]);setModal("order-success")};
  const signIn=e=>{e.preventDefault();const data={name:e.target.name.value,email:e.target.email.value};localStorage.setItem("ozabay-account",JSON.stringify(data));setAccount(data);setModal("account")};
  const openNav=id=>{const map={shop:"products",collections:"collections",artisans:"artisans","create-your-own":"create",journal:"journal",about:"story"};if(["corporate","sell","support"].includes(id)){setModal(id);return}go(map[id]||"home")};
  const resetCustom=()=>setCustom({form:"Vessel",material:"Clay",finish:"Natural",size:"Medium",tone:"Earth",engraving:"",notes:""});
  const openCollection=category=>{setFilter(category);setPriceBand(null);setQuery("");go("products")};
  const openTheme=theme=>{setFilter("All");setQuery(theme.query||"");go("products")};
  const openPrice=band=>{setFilter("All");setQuery("");go("products");setTimeout(()=>setSort(band.min?"price-low":"price-low"),0)};
  const openRegion=region=>{const state=INDIA_CRAFTS.find(s=>s.name===region.name);if(state)openStateCraft(state,region.query||null);};
  const customOptions={form:Object.keys(CUSTOM_PRICES.form),material:Object.keys(CUSTOM_PRICES.material),finish:Object.keys(CUSTOM_PRICES.finish),size:Object.keys(CUSTOM_PRICES.size),tone:Object.keys(CUSTOM_PRICES.tone)};

  return <>
    <div className="scroll-progress" style={{transform:`scaleX(${scrollProgress/100})`}} aria-hidden="true"/>
    <div className="page-vignette" aria-hidden="true"/>
    <Navbar activeId="shop" cartCount={cartCount} onSearchClick={()=>setModal("search")} onAccountClick={()=>setModal("account")} onCartClick={()=>setModal("cart")} onNavClick={openNav}/>
    <main id="home">
      {craftRoute ? (()=>{const state=INDIA_CRAFTS.find(s=>stateSlug(s)===craftRoute);return state?<StateCraftMarketplace state={state} products={REGIONAL_CRAFT_PRODUCTS.filter(p=>p.state===state.name)} onBack={backToAtlas} onProduct={p=>setModal({type:"product",product:p})} onAdd={p=>{add(p);setModal("cart")}} onToggleWish={toggleWish} wish={wish}/>:<div className="oz-container state-market-empty-page"><h1>Craft edit not found.</h1><button className="hero-action" onClick={backToAtlas}>Back to India Craft Atlas ↗</button></div>})() : <>
      <Hero onExploreClick={()=>go("collections")} onCreateClick={()=>go("create")}/>

      <Reveal className="oz-section oz-intro" id="story"><div className="oz-container oz-intro__grid"><p className="eyebrow">The digital atelier</p><div><h2>Objects that carry the <em>human touch.</em></h2><p>OzaBay brings together small-batch objects made by independent Indian artisans. Every curve, weave and tool mark is part of the story.</p><button className="text-link" onClick={()=>setModal("about")}>Discover the OzaBay story ↗</button></div></div></Reveal>

      {recentlyViewed.length>0&&<section className="oz-section recently-viewed"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">Continue your journey</p><h2>Recently <em>viewed.</em></h2></div><p>Pick up where you left off.</p></div></Reveal><div className="recent-rail">{PRODUCTS.filter(p=>recentlyViewed.includes(p.id)).map(p=><button key={p.id} onClick={()=>setModal({type:"product",product:p})}><img src={p.image} alt={p.name}/><span>{p.category}</span><strong>{p.name}</strong><small>{p.price}</small></button>)}</div></div></section>}
      <CraftFilm/>
      <MakerStories/>

      

      <section id="products" className="oz-section oz-products"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">The marketplace</p><h2>Made for <em>slow living.</em></h2></div><p>{PRODUCTS.length} pieces across seven collections. Every listing opens into a richer product story, 3D studio and bag flow — including state-wise regional craft edits.</p></div></Reveal><div className="catalog-toolbar"><div className="filter-row">{categories.map(c=><button key={c} className={filter===c&&priceBand===null?"is-active":""} onClick={()=>{setFilter(c);setPriceBand(null)}}>{c}</button>)}{priceBand&&<button className="is-active" onClick={()=>setPriceBand(null)}>{priceBand.label} ×</button>}</div><div className="catalog-tools"><span>{shown.length} pieces</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></div></div>{visible.length?<div className="product-grid">{visible.map((p,i)=><Reveal key={p.id}><TiltCard className="product-card"><div className="product-image" onClick={()=>setModal({type:"product",product:p})} role="button" tabIndex="0" onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")setModal({type:"product",product:p})}}><img src={p.image} alt={p.name}/><span className="product-badge">{i<3&&page===1?"OzaBay Edit":p.category}</span><button className={`wishlist-btn ${wish.includes(p.id)?"is-liked":""}`} onClick={e=>{e.stopPropagation();toggleWish(p)}} aria-label="Toggle wishlist">♡</button><div className="product-card__tools" onClick={e=>e.stopPropagation()}><button onClick={()=>setModal({type:"product",product:p})}>Quick view</button><button onClick={()=>setModal({type:"3d",product:p})}>3D view</button></div><span className="product-image__hint">Tap to explore</span></div><div className="product-card__meta"><div><span>{p.artisan}{p.city ? ` · ${p.city}` : ""}</span><h3>{p.name}</h3><p>{p.material} · ★ {p.rating}</p></div><strong>{p.price}</strong></div><button className="product-add" onClick={()=>{add(p);setModal("cart")}}>Add to bag <span>↗</span></button></TiltCard></Reveal>)}</div>:<div className="empty-state"><h3>No pieces found.</h3><p>Try another search or collection.</p><button className="hero-action" onClick={()=>{setFilter("All");setQuery("");setPriceBand(null)}}>Reset edit ↗</button></div>}{visible.length<shown.length&&<div className="load-more"><span>Showing {visible.length} of {shown.length}</span><button className="hero-action" onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Load more pieces ↗</button></div>}</div></section>

      

      <section id="artisans" className="oz-section artisans-section"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">Made by people</p><h2>Meet the <em>makers.</em></h2></div><p>Each maker has a place in the marketplace—not just a name beneath a product.</p></div></Reveal><div className="artisan-grid">{ARTISANS.map(a=><article className="artisan-card" key={a.id}><button onClick={()=>setModal({type:"artisan",artisan:a})}><div className="artisan-card__image"><img src={a.image} alt={a.name}/><span>INDIA · {a.city.split(",")[0]}</span></div><div className="artisan-card__copy"><p>{a.craft}</p><h3>{a.name}</h3><span>{a.story}</span><strong>Open maker profile ↗</strong></div></button></article>)}</div></div></section>

      <RegionalCrafts onRegion={openRegion} onProduct={p=>setModal({type:"product",product:p})}/>

      

      <section id="reviews" className="oz-section reviews-section">
  <div className="oz-container">
    <Reveal><div className="section-head reviews-head"><div><p className="eyebrow">The OzaBay journal of feedback</p><h2>Loved for the <em>little details.</em></h2></div><p>Explore the review experience we are building for OzaBay. Product ratings, written notes and customer imagery can all live here once the review backend is connected.</p></div></Reveal>
    <div className="reviews-summary">
      <div className="reviews-score"><strong>4.9</strong><span>★★★★★</span><small>Demo review experience</small></div>
      <div className="reviews-bars">{[[5,82],[4,13],[3,4],[2,1],[1,0]].map(([n,w])=><div key={n}><span>{n} ★</span><i><b style={{width:`${w}%`}}/></i><em>{w}%</em></div>)}</div>
      <div className="reviews-trust"><span>HANDMADE</span><strong>Craft-first</strong><small>Maker story · material · care · customer notes</small></div>
    </div>
   <div className="reviews-grid">{[
        ["Aarohi S.","Jaipur Blue Pottery Vase","The piece has such a quiet presence. I loved seeing the maker story before deciding where it would sit at home.","https://images.pexels.com/photos/4307872/pexels-photo-4307872.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Kabir M.","Neel Indigo Bowl Set","The product view makes the silhouette and scale much easier to understand. The indigo finish is beautiful.","https://images.pexels.com/photos/4308159/pexels-photo-4308159.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Naina P.","Mitti Sculptural Vase","The tiny variations are exactly what make handmade objects feel special. The passport concept is a lovely touch.","https://images.pexels.com/photos/7627130/pexels-photo-7627130.jpeg?auto=compress&cs=tinysrgb&w=1000",4],

        ["Riya K.","Ganga Handloom Runner","The texture-first presentation feels much more useful than a generic product grid. It feels considered.","https://images.pexels.com/photos/17611927/pexels-photo-17611927.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Arjun R.","Neem Carved Serving Board","I wanted something functional but not mass-produced. The craft story helps explain what makes the piece different.","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrOWIfL8p2wnh6Js43L2qyHxkZGWCHsLX5odyxYzKadg&s=10",5],

        ["Maya D.","Aangan Stoneware Lamp","The combination of artisan details, material information and the 3D concept makes browsing much easier.","https://images.pexels.com/photos/36562466/pexels-photo-36562466.jpeg?auto=compress&cs=tinysrgb&w=1000",4],
       ].map(([name,product,text,image,rating],i)=><article className="review-card" key={name}>
      <div className="review-card__image"><img src={image} alt=""/><span>REVIEW PREVIEW</span></div>
      <div className="review-card__body"><div className="review-card__top"><span>{"★".repeat(rating)}</span><small>Demo note</small></div><p>“{text}”</p><div className="review-card__person"><strong>{name}</strong><span>{product}</span></div></div>
    </article>)}</div>
  </div>
</section>

<section id="create" className="oz-section oz-create"><div className="oz-container"><Reveal><div className="section-head custom-studio-head"><div><p className="eyebrow">OzaBay Custom Studio</p><h2>Create something <em>that is yours.</em></h2></div></div></Reveal><div className="create-grid create-grid--video"><div className="create-video-pane"><video className="create-video" src="/videos/OZABAY.mp4" autoPlay muted loop playsInline preload="metadata"/></div><div className="create-upload-pane"><CustomDesignUpload onConfirm={()=>{setOrderSent(false);setCustomStep(1);setModal("custom-order")}}/></div></div></div></section>

      <section className="oz-section order-track-section"><div className="oz-container track-grid"><div><p className="eyebrow">After checkout</p><h2>Track the <em>craft journey.</em></h2><p>Enter any demo OzaBay order ID generated by this frontend to see the UI for order status, maker stage and delivery handoff.</p><form onSubmit={e=>{e.preventDefault();setModal("tracking");}} className="track-form"><input value={tracking} onChange={e=>setTracking(e.target.value)} placeholder="e.g. OZ-1234567"/><button className="hero-action">Track order ↗</button></form></div><div className="timeline"><div className="timeline-step is-done"><span>01</span><div><strong>Order received</strong><small>Payment / request captured</small></div></div><div className="timeline-step is-current"><span>02</span><div><strong>Maker crafting</strong><small>Handmade work in progress</small></div></div><div className="timeline-step"><span>03</span><div><strong>Quality checked</strong><small>Final inspection & passport</small></div></div><div className="timeline-step"><span>04</span><div><strong>On the way</strong><small>Courier handoff</small></div></div></div></div></section>

      <section className="oz-section sell-section"><div className="oz-container sell-grid"><div><p className="eyebrow">For independent makers</p><h2>Bring your craft <em>to OzaBay.</em></h2><p>Seller onboarding, maker profiles, product drafts and order stages are designed as a frontend-first marketplace workflow.</p><button className="hero-action" onClick={()=>setModal("sell")}>Open seller studio ↗</button></div><div className="seller-card"><div><span>MAKER STUDIO</span><strong>06</strong></div><p>Profile completeness</p><div className="progress"><i/></div><ul><li>Maker profile</li><li>Product catalogue</li><li>Custom order inbox</li><li>Craft passport</li><li>Order fulfilment</li></ul></div></div></section>

      

      <TrustStrip/>

      <section className="oz-section newsletter"><div className="oz-container newsletter-box"><div><p className="eyebrow">The OzaBay letter</p><h2>New makers, new drops,<br/><em>quietly delivered.</em></h2></div><form onSubmit={e=>{e.preventDefault();setModal("thanks")}}><input type="email" required placeholder="Your email address"/><button>Subscribe ↗</button></form></div></section>
      </>}
    </main>

    <footer className="oz-footer"><div className="oz-container footer-grid"><div><span>OzaBay</span><p>Indian craft, contemporary living.<br/>Frontend marketplace experience.</p></div><div><span>Explore</span><button onClick={()=>go("products")}>Shop</button><button onClick={()=>go("collections")}>Collections</button><button onClick={()=>go("artisans")}>Artisans</button><button onClick={()=>go("create")}>Create Your Own</button></div><div><span>OzaBay</span><button onClick={()=>setModal("about")}>About</button><button onClick={()=>setModal("corporate")}>Corporate</button><button onClick={()=>setModal("sell")}>Sell on OzaBay</button><button onClick={()=>setModal("support")}>Support</button></div><div><span>Your space</span><button onClick={()=>setModal("account")}>Account</button><button onClick={()=>setModal("wishlist")}>Wishlist ({wish.length})</button><button onClick={()=>setModal("cart")}>Bag ({cartCount})</button><button onClick={()=>setModal("tracking")}>Track order</button></div></div></footer>

    {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><div className={`modal ${modal?.type==="3d"?"modal--3d":""}`}>
      {modal?.type==="3d"&&<Product3DViewer product={modal.product} onClose={()=>setModal(null)} onAdd={p=>{add(p);setModal("cart")}} onSpace={p=>setModal({type:"space",product:p})}/>} 
      {modal?.type==="product"&&<ProductDetail product={modal.product} onClose={()=>setModal(null)} onAdd={p=>{add(p);setModal("cart")}} onView3D={p=>setModal({type:"3d",product:p})} onSpace={p=>setModal({type:"space",product:p})} onReview={p=>setReviewProduct(p)}/>} 
      {modal?.type==="space"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">View in your space</p><h2>Preview <em>{modal.product.name}</em> at home.</h2><div className="space-room"><div className="space-floor"/><div className="space-wall"><span>OzaBay room preview</span><div className="space-object"><img src={modal.product.image} alt=""/></div></div></div><p className="space-note">This is a frontend room-scale preview concept. A production AR layer can replace it later without changing the product flow.</p><button className="hero-action" onClick={()=>{add(modal.product);setModal("cart")}}>Add to bag ↗</button></>}
      {modal?.type==="artisan"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="artisan-modal artisan-modal--premium"><div className="artisan-modal__media"><img src={modal.artisan.image} alt={modal.artisan.name}/><div className="artisan-modal__media-note">PORTRAIT · REPRESENTATIVE WORKSHOP PROFILE</div></div><div><p className="eyebrow">{modal.artisan.craft}</p><h2>{modal.artisan.name}<br/><em>by hand.</em></h2><p>{modal.artisan.story}</p><div className="artisan-facts"><span>Studio <b>{modal.artisan.city}</b></span><span>Craft <b>{modal.artisan.products}</b></span><span>Marketplace status <b>Maker profile UI</b></span></div><div className="artisan-modal__film"><div><span>WATCH THE MAKING</span><strong>Representative workshop film</strong><small>Commissioned OzaBay maker footage can replace this later.</small></div><button onClick={()=>{const story=MAKER_STORIES.find(s=>s.maker===modal.artisan.name)||MAKER_STORIES[0];setModal({type:"maker-video",story})}}>Play film ↗</button></div><button className="hero-action" onClick={()=>{setFilter(modal.artisan.products);setQuery("");setModal(null);go("products")}}>Shop this maker ↗</button></div></div></>}
      {modal?.type==="maker-video"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="maker-video-modal"><div className="maker-video-modal__media"><video src={modal.story.video} autoPlay muted loop playsInline controls poster={modal.story.id.includes("meera")?IMG.terracotta:modal.story.id.includes("raghav")?IMG.blue:modal.story.id.includes("sana")?IMG.indigo:IMG.sculptural} onError={e=>{if(e.currentTarget.src!==modal.story.fallback)e.currentTarget.src=modal.story.fallback}}/></div><div className="maker-video-modal__copy"><p className="eyebrow">{modal.story.chapter}</p><h2>{modal.story.maker}<br/><em>{modal.story.craft}</em></h2><p>{modal.story.story}</p><span>{modal.story.source}</span><button className="hero-action" onClick={()=>{const a=ARTISANS.find(x=>x.name===modal.story.maker);if(a){setModal({type:"artisan",artisan:a})}}}>Back to maker story ↗</button></div></div></>}
      {modal?.type==="gift-result"&&<>
        <button className="modal-close" onClick={()=>setModal(null)}>×</button>
        <div className="gift-result-modal">
          <div><p className="eyebrow">Gift edit ready</p><h2>A thoughtful edit <em>for {gift.recipient.toLowerCase()}.</em></h2><p>We matched your occasion, style and budget with handmade pieces. Review the edit before you add it to your bag or send it to our gifting team.</p></div>
          <div className="gift-result-grid">{modal.items.map(p=><article key={p.id}><img src={p.image} alt={p.name}/><div><span>{p.category}</span><strong>{p.name}</strong><small>{p.price}</small></div></article>)}</div>
          <div className="gift-result-summary"><div><span>Occasion</span><strong>{gift.occasion}</strong></div><div><span>Recipient</span><strong>{gift.recipient}</strong></div><div><span>Style</span><strong>{gift.style}</strong></div><div><span>Wrapping</span><strong>{gift.wrapping?"Included":"Not added"}</strong></div><div className="gift-result-total"><span>Estimated edit</span><strong>{money(modal.total)}</strong></div></div>
          {gift.message&&<div className="gift-message-preview"><span>GIFT MESSAGE</span><p>“{gift.message}”</p></div>}
          <div className="gift-result-actions"><button className="hero-action" onClick={()=>{modal.items.forEach(p=>add(p));setModal("cart")}}>Add gift edit to bag ↗</button><button className="text-link" onClick={()=>setModal({type:"gift-request",items:modal.items,total:modal.total})}>Send gifting request ↗</button><button className="text-link" onClick={()=>setModal(null)}>Keep editing</button></div>
        </div>
      </>}
      {modal==="search"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Search OzaBay</p><h2>Find a <em>piece.</em></h2><input className="search-input" autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try blue pottery, brass, Meera, Jaipur…"/><div className="search-results">{PRODUCTS.filter(p=>`${p.name} ${p.category} ${p.artisan} ${p.city}`.toLowerCase().includes(query.toLowerCase())).slice(0,8).map(p=><button key={p.id} onClick={()=>setModal({type:"product",product:p})}><span>{p.name}</span><small>{p.category} · {p.price}</small></button>)}</div></>}
      {modal==="account"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button>{account?<><p className="eyebrow">Your OzaBay</p><h2>Welcome, <em>{account.name}.</em></h2><p>{account.email}</p><div className="account-actions"><button className="hero-action" onClick={()=>setModal("wishlist")}>Wishlist ({wish.length}) ↗</button><button className="text-link" onClick={()=>{localStorage.removeItem("ozabay-account");setAccount(null);setModal("account")}}>Sign out</button></div></>:<><p className="eyebrow">Your OzaBay</p><h2>Keep your <em>favourites.</em></h2><form className="order-form" onSubmit={signIn}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" type="email" required placeholder="you@example.com"/></label><button className="hero-action">Create demo account ↗</button></form></>}</>}
      {modal==="wishlist"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Saved pieces</p><h2>Your <em>wishlist.</em></h2>{wish.length?<div className="wishlist-list">{PRODUCTS.filter(p=>wish.includes(p.id)).map(p=><div key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{money(p.priceValue)}</span><button onClick={()=>{add(p);setModal("cart")}}>Add to bag</button></div></div>)}</div>:<p>Your wishlist is empty. Tap ♡ on any product to save it.</p>}</>}
      {modal==="cart"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Your bag</p><h2>{cartCount?`${cartCount} ${cartCount===1?"piece":"pieces"}.`:"Your bag is quiet."}</h2>{cart.length?<><div className="cart-list">{cart.map(p=><div key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{money(p.priceValue)} · {p.custom?"Custom":"Handmade"}</span><div className="qty-control"><button onClick={()=>qty(p.id,-1)}>−</button><b>{p.qty}</b><button onClick={()=>qty(p.id,1)}>+</button></div><button onClick={()=>remove(p.id)}>Remove</button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><button className="hero-action" onClick={()=>setModal("checkout")}>Proceed to checkout ↗</button></>:<p>Start with something handmade from the edit.</p>}<button className="text-link" onClick={()=>{setModal(null);go("products")}}>Continue shopping ↗</button></>}
      {modal==="checkout"&&<><button className="modal-close" onClick={()=>setModal("cart")}>×</button><div className="checkout-grid"><div><p className="eyebrow">Checkout</p><h2>Make it <em>yours.</em></h2><p>Frontend checkout is ready for testing. Payment remains simulated until the backend/payment layer is connected.</p><div className="order-summary"><span>{cartCount} pieces</span><strong>{money(cartTotal)}</strong></div></div><form className="order-form" onSubmit={placeOrder}><label>Name<input required value={checkout.name} onChange={e=>setCheckout(v=>({...v,name:e.target.value}))}/></label><label>Phone<input required value={checkout.phone} onChange={e=>setCheckout(v=>({...v,phone:e.target.value}))}/></label><label>Email<input required type="email" value={checkout.email} onChange={e=>setCheckout(v=>({...v,email:e.target.value}))}/></label><label>Address<input required value={checkout.address} onChange={e=>setCheckout(v=>({...v,address:e.target.value}))}/></label><div className="form-two"><label>City<input required value={checkout.city} onChange={e=>setCheckout(v=>({...v,city:e.target.value}))}/></label><label>PIN<input required pattern="[0-9]{6}" value={checkout.pincode} onChange={e=>setCheckout(v=>({...v,pincode:e.target.value}))}/></label></div><label>Payment<select value={checkout.payment} onChange={e=>setCheckout(v=>({...v,payment:e.target.value}))}><option>Cash on delivery</option><option>UPI (demo)</option><option>Card (demo)</option></select></label><button className="hero-action">Place demo order · {money(cartTotal)} ↗</button></form></div></>}
      {placedOrder&&modal==="order-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Order confirmed</p><h2>Your order is <em>saved.</em></h2><p>Order ID: <strong>{placedOrder.id}</strong>. This browser stores the demo order so the tracking UI can be tested.</p><div className="custom-order-success"><span>Total</span><strong>{money(placedOrder.total)}</strong><span>Current stage</span><strong>Crafting with the maker</strong></div><button className="hero-action" onClick={()=>{setTracking(placedOrder.id);setModal("tracking")}}>Track this order ↗</button></>}
      {modal==="tracking"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Order tracking</p><h2>Craft journey <em>in motion.</em></h2><div className="track-code"><span>ORDER ID</span><strong>{tracking||placedOrder?.id||"OZ-DEMO"}</strong></div><div className="timeline timeline--modal"><div className="timeline-step is-done"><span>01</span><div><strong>Order received</strong><small>Request captured</small></div></div><div className="timeline-step is-current"><span>02</span><div><strong>Maker crafting</strong><small>Handmade work in progress</small></div></div><div className="timeline-step"><span>03</span><div><strong>Quality checked</strong><small>Craft passport attached</small></div></div><div className="timeline-step"><span>04</span><div><strong>Dispatched</strong><small>Courier handoff</small></div></div></div></>}
            {modal==="custom-order"&&!orderSent&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="custom-request-shell"><div className="custom-request-intro"><p className="eyebrow">Made-to-order studio</p><h2>Tell us how to make your <em>piece.</em></h2><p>First confirm the design you created. Then share the few details our maker needs to turn it into a real product. We’ll review the request before production.</p><div className="custom-request-steps"><span className={customStep===1?"is-active":"is-done"}>01 <b>Review design</b></span><span className={customStep===2?"is-active":""}>02 <b>Your details</b></span><span>03 <b>We make it</b></span></div><div className="custom-request-note"><strong>How it works</strong><span>1. You send the brief</span><span>2. OzaBay reviews it</span><span>3. We confirm price & timeline</span><span>4. Maker creates your piece</span></div></div>{customStep===1?<div className="custom-request-panel"><div className="custom-design-card"><div className="custom-design-card__image" style={{backgroundImage:`url(${customImage})`}}><span>YOUR DESIGN</span></div><div className="custom-design-card__body"><div><span>Form</span><strong>{custom.form}</strong></div><div><span>Material</span><strong>{custom.material}</strong></div><div><span>Finish</span><strong>{custom.finish}</strong></div><div><span>Size</span><strong>{custom.size}</strong></div><div><span>Tone</span><strong>{custom.tone}</strong></div>{custom.engraving&&<div><span>Engraving</span><strong>{custom.engraving}</strong></div>}</div></div><div className="custom-request-price"><span>Estimated starting price</span><strong>{money(customPrice)}</strong><small>Final price and production timeline are confirmed after our review.</small></div><button className="hero-action custom-request-next" onClick={()=>setCustomStep(2)}>Looks good — continue ↗</button><button className="text-link" onClick={()=>{setModal(null);setTimeout(()=>go("create"),50)}}>Edit my design ↗</button></div>:<form className="order-form custom-request-form" onSubmit={submitCustom}><div className="custom-form-heading"><span>STEP 02 · YOUR DETAILS</span><strong>Give the maker a clear brief.</strong><small>Required fields are marked with *</small></div><div className="form-two"><label>Full name *<input required autoComplete="name" value={orderForm.name} onChange={e=>setOrderForm(v=>({...v,name:e.target.value}))} placeholder="Your name"/></label><label>Email *<input required type="email" autoComplete="email" value={orderForm.email} onChange={e=>setOrderForm(v=>({...v,email:e.target.value}))} placeholder="you@example.com"/></label></div><div className="form-two"><label>Phone *<input required autoComplete="tel" value={orderForm.phone} onChange={e=>setOrderForm(v=>({...v,phone:e.target.value}))} placeholder="+91 98765 43210"/></label><label>Quantity *<input required type="number" min="1" max="50" value={orderForm.quantity} onChange={e=>setOrderForm(v=>({...v,quantity:e.target.value}))}/></label></div><div className="form-two"><label>City *<input required autoComplete="address-level2" value={orderForm.city} onChange={e=>setOrderForm(v=>({...v,city:e.target.value}))} placeholder="Jaipur"/></label><label>Budget range<input value={orderForm.budget} onChange={e=>setOrderForm(v=>({...v,budget:e.target.value}))} placeholder="e.g. ₹5,000–₹8,000"/></label></div><div className="form-two"><label>Needed by<input type="date" value={orderForm.neededBy} onChange={e=>setOrderForm(v=>({...v,neededBy:e.target.value}))}/></label><label>What is it for?<select value={orderForm.purpose} onChange={e=>setOrderForm(v=>({...v,purpose:e.target.value}))}><option value="">Choose one</option><option>Home décor</option><option>Gift</option><option>Wedding / event</option><option>Corporate gifting</option><option>Other</option></select></label></div><label>Delivery address *<textarea required value={orderForm.address} onChange={e=>setOrderForm(v=>({...v,address:e.target.value}))} placeholder="House / street, area, city, state, pincode"/></label><label>Anything the maker should know?<textarea value={custom.notes} onChange={e=>setCustom(c=>({...c,notes:e.target.value}))} placeholder="Colour preference, proportions, inspiration, special care…"/></label><div className="custom-request-upload"><div><span>REFERENCE IMAGE</span><strong>Optional — show us your inspiration</strong><small>For now this frontend stores the selected file name with the request.</small></div><label className="upload-btn">Choose image<input type="file" accept="image/*" onChange={e=>setOrderForm(v=>({...v,referenceName:e.target.files?.[0]?.name||""}))}/></label>{orderForm.referenceName&&<em>{orderForm.referenceName}</em>}</div><label className="approval-row"><input type="checkbox" required checked={orderForm.approval==="Yes"} onChange={e=>setOrderForm(v=>({...v,approval:e.target.checked?"Yes":""}))}/><span>I understand this is a made-to-order request. OzaBay will confirm the final design, price and timeline before production.</span></label><div className="custom-request-submit"><button type="button" className="text-link" onClick={()=>setCustomStep(1)}>← Back to design</button><button className="hero-action">Send my custom request ↗</button></div></form>}</div></>}
      {modal==="custom-order"&&orderSent&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Request received</p><h2>Your design is <em>saved.</em></h2><p>Request ID: <strong>{requestId}</strong>. This browser has stored the design reference.</p><div className="custom-order-success"><span>Design</span><strong>{custom.form} · {custom.material} · {custom.finish}</strong><span>Estimated price</span><strong>{money(customPrice)}</strong></div><button className="hero-action" onClick={()=>setModal(null)}>Back to studio ↗</button></>}
      {modal==="sell"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Maker studio</p><h2>Bring your craft <em>to OzaBay.</em></h2><form className="order-form seller-form" onSubmit={e=>{e.preventDefault();setModal("seller-success")}}><label>Maker / studio name<input required placeholder="Your studio"/></label><label>Craft category<select><option>Ceramics</option><option>Textiles</option><option>Metalcraft</option><option>Woodcraft</option><option>Terracotta</option></select></label><label>City<input required placeholder="Jaipur"/></label><label>Short craft story<textarea required placeholder="Tell customers what makes your work special…"/></label><button className="hero-action">Submit maker profile ↗</button></form></>}
      {modal==="seller-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Maker profile received</p><h2>Your studio is <em>ready for review.</em></h2><p>This is the frontend seller-onboarding state. The production workflow can connect verification, inventory and order management later.</p><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
      {modal?.type==="gift-request"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="gift-request-shell"><div><p className="eyebrow">OzaBay gifting team</p><h2>Turn the edit into a <em>gift brief.</em></h2><p>Send us the selected pieces, recipient context and your message. The frontend stores the request locally until the gifting backend is connected.</p><div className="gift-request-summary"><span>{gift.occasion} · {gift.recipient}</span><strong>{gift.style} · {gift.budget}</strong><small>{gift.wrapping?"Gift wrapping requested · ":""}{gift.message?"Personalised message added":"No gift message"}</small></div></div><form className="order-form" onSubmit={e=>{e.preventDefault();const id=`OZ-G${Date.now().toString().slice(-7)}`;localStorage.setItem("ozabay-gift-request",JSON.stringify({requestId:id,createdAt:new Date().toISOString(),gift,items:modal?.items||[],total:modal?.total||0,customer:{name:e.target.name.value,email:e.target.email.value,phone:e.target.phone.value,city:e.target.city.value,neededBy:e.target.neededBy.value}}));setRequestId(id);setModal({type:"gift-success",total:modal.total})}}><label>Full name *<input name="name" required placeholder="Your name"/></label><label>Email *<input name="email" required type="email" placeholder="you@example.com"/></label><div className="form-two"><label>Phone *<input name="phone" required placeholder="+91 98765 43210"/></label><label>City *<input name="city" required placeholder="Jaipur"/></label></div><label>Needed by<input name="neededBy" type="date"/></label><label>Anything the gifting team should know?<textarea name="notes" placeholder="Recipient preferences, delivery timing, branding or special instructions…"/></label><button className="hero-action">Send gifting request ↗</button></form></div></>}
      {modal?.type==="gift-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Gifting request received</p><h2>Your gift brief is <em>with us.</em></h2><p>Request ID: <strong>{requestId}</strong>. We’ll review the edit and confirm the final availability, price and delivery timeline before fulfilment.</p><div className="custom-order-success"><span>Gift edit</span><strong>{gift.occasion} · {gift.style} · {gift.recipient}</strong><span>Estimated value</span><strong>{modal?.total?money(modal.total):gift.budget}</strong><span>Next step</span><strong>OzaBay gifting team review</strong></div><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
      {modal==="corporate"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Corporate & hospitality</p><h2>Thoughtful <em>gifting.</em></h2><form className="order-form" onSubmit={e=>{e.preventDefault();setModal("corporate-success")}}><label>Company<input required placeholder="Studio / company"/></label><label>Quantity<input required type="number" min="10" placeholder="50"/></label><label>Budget<input required placeholder="₹2,50,000"/></label><label>Brief<textarea required placeholder="Event, gifting theme, custom branding…"/></label><button className="hero-action">Request a curated quote ↗</button></form></>}
      {modal==="corporate-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Corporate brief saved</p><h2>We'll turn the brief into a <em>craft edit.</em></h2><p>The frontend is ready for quote requests, gifting sets and hospitality collections.</p><button className="hero-action" onClick={()=>setModal(null)}>Close ↗</button></>}
      {modal==="support"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Support</p><h2>How can we <em>help?</em></h2><div className="faq-list"><button>How does handmade variation work? <span>+</span></button><button>Can I request a custom piece? <span>+</span></button><button>Where can I track an order? <span>+</span></button><button>How do maker profiles work? <span>+</span></button></div></>}
      {modal==="about"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">About OzaBay</p><h2>Made by people.<br/><em>Kept by you.</em></h2><p>OzaBay is a digital atelier for Indian craft—bringing contemporary homes closer to the people who make the objects inside them. The current experience is frontend-first and intentionally ready for a future backend.</p><button className="hero-action" onClick={()=>setModal(null)}>Close ↗</button></>}
      {modal==="thanks"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Thank you</p><h2>You're <em>in.</em></h2><p>Your newsletter signup is saved as a demo action in this browser.</p><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
    </div></div>}
    {reviewProduct&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setReviewProduct(null)}}><div className="modal review-modal"><button className="modal-close" onClick={()=>setReviewProduct(null)}>×</button><p className="eyebrow">Write a review</p><h2>Tell us about <em>{reviewProduct.name}.</em></h2><form className="order-form" onSubmit={e=>{e.preventDefault();const entry={productId:reviewProduct.id,createdAt:new Date().toISOString(),name:e.target.elements[0].value,rating:e.target.elements[1].value,note:e.target.elements[2].value};const saved=JSON.parse(localStorage.getItem("ozabay-reviews")||"[]");localStorage.setItem("ozabay-reviews",JSON.stringify([...saved,entry]));setReviewProduct(null);setModal({type:"product",product:reviewProduct})}}><label>Name<input required placeholder="Your name"/></label><label>Rating<select defaultValue="5"><option>5 — Excellent</option><option>4 — Great</option><option>3 — Good</option></select></label><label>Your note<textarea required placeholder="What did you love?"/></label><button className="hero-action">Save demo review ↗</button></form></div></div>}
  </>
}
