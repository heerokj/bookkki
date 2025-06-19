"use client";
import React from "react";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [
  "images/carousel-1.png",
  "images/carousel-2.png",
  "images/carousel-3.png",
];

export default function Carousel() {
  return (
    <div className="mb-6">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
