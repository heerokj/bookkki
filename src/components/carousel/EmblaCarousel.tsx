import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import styles from "./EmblaCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type Slide = {
  id: string;
  img: StaticImageData;
  link: string;
};

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <Link href={slide.link}>
                <div className={styles.embla__slide__number}>
                  <Image
                    src={slide.img}
                    width={1000}
                    height={1000}
                    alt={slide.id}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 1000px"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
