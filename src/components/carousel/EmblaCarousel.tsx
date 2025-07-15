import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import styles from "./EmblaCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

type EmblaCarouselProps<T> = {
  slides: T[];
  options?: EmblaOptionsType;
  renderSlide: (slide: T, index: number) => React.ReactNode;
};

function EmblaCarousel<T>({
  slides,
  options,
  renderSlide,
}: EmblaCarouselProps<T>) {
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
          {slides.map((slide, idx) => (
            <div className={styles.embla__slide} key={`${slide}-${idx}`}>
              <div className={styles.embla__slide__number}>
                {renderSlide(slide, idx)}
              </div>
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
}

export default EmblaCarousel;
