"use client";
import React from "react";
import EmblaCarousel from "../../../carousel/EmblaCarousel";
import banner1 from "/public/images/carousel-1.png";
import banner2 from "/public/images/carousel-2.png";
import banner3 from "/public/images/carousel-3.png";
import Image from "next/image";
import Link from "next/link";

const mainSlides = [
  { img: banner1, link: "https://sibf.or.kr" },
  { img: banner2, link: "/feed" },
  { img: banner3, link: "/" },
];

export default function MainCarousel() {
  return (
    <div className="mb-6">
      <EmblaCarousel
        slides={mainSlides}
        options={{ loop: true }}
        renderSlide={(slide) => (
          <Link href={slide.link}>
            <Image
              src={slide.img}
              height={250}
              width={300}
              alt="img"
              quality={100}
              className="w-full h-full"
            />
          </Link>
        )}
      />
    </div>
  );
}
