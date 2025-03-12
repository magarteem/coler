"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import styles from "./tariffGallery.module.scss";
import { TariffCardLayout } from "@/app/shared/layouts/tariffCardLayout/TariffCardLayout";
import "swiper/scss";
import cn from "classnames";
import { useCallback, useRef, useState } from "react";
import { ArrowNavigation } from "@/public/images";
import { PlanType } from "@/app/shared/types/plan";

interface Props {
  stateSwitch: boolean;
  data: PlanType[];
}

export const TariffGallery = ({ stateSwitch, data }: Props) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSwiperInit = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveSlide(swiperRef.current?.activeIndex ?? 0);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev();
    setIsBeginning(!!swiperRef.current?.isBeginning);
    setIsEnd(!!swiperRef.current?.isEnd);
  }, []);

  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext();
    setIsBeginning(!!swiperRef.current?.isBeginning);
    setIsEnd(!!swiperRef.current?.isEnd);
  }, []);

  return (
    <div>
      <div className={styles.btnNavigation}>
        <button
          className={styles.btnPrev}
          onClick={handlePrevClick}
          disabled={isBeginning}
        >
          <ArrowNavigation
            className={styles.arrowNext}
            width={18}
            height={18}
          />
        </button>
        <div className={styles.numberSlideWrap}>
          {data.map((x, index) => (
            <div
              key={x.id}
              className={cn(styles.numberSlides, {
                [styles.active]: activeSlide === index,
              })}
            />
          ))}
        </div>
        <button
          className={styles.btnNext}
          onClick={handleNextClick}
          disabled={isEnd}
          aria-disabled={isEnd ? "true" : "false"}
        >
          <ArrowNavigation width={18} height={18} />
        </button>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        className={styles.blockEventsSwiper}
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
      >
        {data.map((x) => (
          <SwiperSlide key={x.id} className={styles.customContainer}>
            <TariffCardLayout tariffItem={x} stateSwitch={stateSwitch} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
