"use client";
import { FeedData } from "@/types/feed";
import Image from "next/image";
import EmblaCarousel from "../carousel/EmblaCarousel";

export default function FeedImage({ feedImage }: { feedImage: FeedData }) {
  return (
    <div className="feed-image overflow-hidden">
      <EmblaCarousel
        slides={feedImage.image_urls}
        options={{ loop: false }}
        renderSlide={(slide) => (
          <Image src={slide} height={300} width={300} alt="img" />
        )}
      />
    </div>
  );
}
