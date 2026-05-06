import headphones from "../assets/design/headphones/main.png";

import printer from "../assets/design/printer/main.png";
import printer1 from "../assets/design/printer/01.png";
import printer2 from "../assets/design/printer/02.png";
import printer3 from "../assets/design/printer/03.png";
import printer4 from "../assets/design/printer/04.png";

import suitecase from "../assets/design/case/main.png";
import dishwasher from "../assets/design/dishwasher/main.png";

export const products = [
  {
    tag: "Music, unleashed.",
    name: "Headphones",
    image: headphones,
    slug: "headphones",
    gallery: [headphones, headphones, headphones, headphones, headphones],
    description: "Crafted with clean lines and refined details, these headphones merge modern minimalism with cutting-edge acoustics. The design is as immersive as the sound—sleek, comfortable, and built to elevate every listening experience."
  },
  {
    tag: "Ideas on paper.",
    name: "Printer",
    image: printer,
    slug: "printer",
    gallery: [printer, printer1, printer2, printer3, printer4],
    description: "This printer transforms a functional device into a design statement. With its elegant form and intuitive interface, it delivers precision while seamlessly fitting into any modern workspace."
  },
  {
    tag: "Adventure ready.",
    name: "Suitcase",
    image: suitecase,
    slug: "suitcase",
    gallery: [suitecase, suitecase, suitecase, suitecase, suitecase],
    description: "Designed for the modern traveler, this suitcase balances sophistication with strength. Its streamlined shape, premium materials, and effortless mobility make every journey both stylish and practical."
  },
  {
    tag: "Sparkling simplicity.",
    name: "Dishwasher",
    image: dishwasher,
    slug: "dishwasher",
    gallery: [dishwasher, dishwasher, dishwasher, dishwasher, dishwasher],
    description: "Minimalist in form yet powerful in performance, this dishwasher redefines everyday convenience. Its clean design and seamless integration bring elegance to one of life’s most essential tasks."
  },
];