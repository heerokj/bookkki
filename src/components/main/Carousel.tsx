"use client";
import React from "react";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import banner1 from "/public/images/carousel-1.png";
import banner2 from "/public/images/carousel-2.png";
import banner3 from "/public/images/carousel-3.png";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [
  { id: "1", img: banner1, link: "https://sibf.or.kr" },
  { id: "2", img: banner2, link: "/feed" },
  { id: "3", img: banner3, link: "/" },
];

export default function Carousel() {
  return (
    <div className="mb-6">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
