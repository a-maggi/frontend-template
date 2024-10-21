"use client";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "lib/utils";
import useMatchMedia from "hooks/useMatchMedia";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { motion, PanInfo, useMotionValue, useSpring } from "framer-motion";
import Button from "components/form-elements/button";

export interface CarouselProps {
  /**
   * Classes to apply to the root
   */
  className?: string;

  /**
   * Slides to display in the carousel
   */
  children: JSX.Element[];

  /**
   * Slide index for carousel to display on load
   */
  startingSlide?: number;

  /**
   * Number of items the carousel will display
   */
  visibleSlides?: number;

  /**
   * If `true`, the carousel will loop to the beginning or end of the slides
   */
  loop?: boolean;

  /**
   * If `true`, the carousel will transition through slides automatically
   */
  autoplay?: boolean;

  /**
   * The delay in milliseconds between slides when autoplay is set
   */
  autoplayDelay?: number;

  /**
   * If `true`, previous and next navigation buttons will display on either side of carousel
   */
  hasButtonNav?: boolean;

  /**
   * If `true`, a dotted navigation will display beneath the carousel
   */
  hasIndicators?: boolean;

  /**
   * If `true`, the carousel will display a loading state
   */
  isLoading?: boolean;

  /**
   * Callback for drag event
   */
  onDrag?: (isDragging: boolean) => void;
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const {
    className,
    children,
    visibleSlides = 1,
    loop = true,
    startingSlide,
    autoplay,
    hasButtonNav = true,
    hasIndicators = false,
    autoplayDelay = 12000,
    isLoading,
    onDrag
  } = props;
  const [currentSlide, setCurrentSlide] = useState(startingSlide ? startingSlide : 0);
  const [isOnAutoPlay, setIsOnAutoPlay] = useState(autoplay ? autoplay : false);
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMatchMedia("(max-width: 767px)");
  const prefersReducedMotion = useMatchMedia("(prefers-reduced-motion: no-preference)");
  const slides = React.Children.toArray(children);
  const length = slides.length;

  const displayedSlides = isMobile ? 1 : visibleSlides;

  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    duration: 1.5,
    bounce: 0.5
  });
  const variants = {
    active: { width: 16 },
    default: { width: 8 }
  };

  const nextSlide = useCallback(
    (n: number = 1) => {
      const slideWidth = Number(itemRef.current?.getBoundingClientRect().width) + 10;
      const slideLimit = length - displayedSlides;
      const nextSlide = currentSlide + n >= slideLimit ? (loop ? 0 : slideLimit) : currentSlide + n;
      const nextOffset = -nextSlide * slideWidth;
      offsetX.set(nextOffset);
      if (nextSlide === slideLimit) {
        animatedX.set(nextOffset);
      } else {
        offsetX.set(nextOffset);
      }
      setCurrentSlide(nextSlide);
    },
    [animatedX, currentSlide, length, loop, offsetX, displayedSlides]
  );

  const prevSlide = useCallback(
    (n: number = 1) => {
      const slideWidth = Number(itemRef.current?.getBoundingClientRect().width) + 10;
      const slideLimit = length - displayedSlides;
      const prevSlide = currentSlide - n <= 0 ? (loop ? slideLimit : 0) : currentSlide - n;
      const prevOffset = prevSlide === slideLimit ? -slideLimit * slideWidth : offsetX.get() + slideWidth * n;
      if (prevSlide === 0) {
        animatedX.set(0);
      } else {
        offsetX.set(prevOffset);
      }
      setCurrentSlide(prevSlide);
    },
    [animatedX, currentSlide, length, loop, offsetX, displayedSlides]
  );

  const slideIsActive = (index: number) => {
    return (
      currentSlide === index || (displayedSlides && index < currentSlide + displayedSlides && currentSlide < index)
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOnAutoPlay) {
        nextSlide();
      }
    }, autoplayDelay);
    return () => clearTimeout(timeout);
  }, [isOnAutoPlay, nextSlide, currentSlide, autoplayDelay]);

  useEffect(() => {
    if (onDrag) {
      onDrag(isDragging);
    }
  }, [isDragging, onDrag]);

  //in case user disables animation
  useEffect(() => {
    setIsOnAutoPlay(!prefersReducedMotion);
  }, [prefersReducedMotion]);

  function handleDragSnap(_: MouseEvent, { offset: { x: dragOffset }, velocity }: PanInfo) {
    setIsDragging(false);
    //stop drag animation (rest velocity)
    animatedX.stop();

    // Determine the width of a single slide
    const slideWidth = Number(itemRef.current?.getBoundingClientRect().width) + 10;
    // Calculate the number of slides to skip based on the drag distance and speed
    const speed = Math.abs(velocity.x);
    const dragDistance = Math.abs(dragOffset);
    const slidesToMove = Math.max(1, Math.floor(dragDistance / slideWidth + speed / 1000));

    if (dragOffset > 0) {
      prevSlide(slidesToMove);
    } else {
      nextSlide(slidesToMove);
    }
  }

  return (
    <div className={cn("carousel flex w-full flex-col items-center justify-center", className)}>
      <div className="relative flex w-full flex-wrap justify-between gap-2" aria-roledescription="carousel">
        <div className="flex w-full overflow-hidden flex-1 py-1 px-0.5">
          <motion.div
            aria-live="polite"
            style={{
              x: animatedX,
              gridAutoColumns: `calc((100% - (${displayedSlides} - 1) * 10px) / ${displayedSlides})`
            }}
            drag="x"
            onDragEnd={handleDragSnap}
            onDragStart={() => {
              setIsDragging(true);
            }}
            dragConstraints={{
              left: -(Number(itemRef.current?.getBoundingClientRect().width) * (length - 1)),
              right: Number(itemRef.current?.getBoundingClientRect().width)
            }}
            className={cn("grid w-full transition-all duration-300 ease-out gap-[10px] grid-flow-col", {
              "cursor-grab": isDragging
            })}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={itemRef}
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${length}`}
                aria-hidden={!slideIsActive(index)}
                tabIndex={
                  currentSlide === index || (index < currentSlide + displayedSlides && currentSlide < index) ? 0 : -1
                }
                className={cn("carousel-slide h-full w-full flex-shrink-0 grow", slideIsActive(index) ? "active" : "")}
              >
                {slide}
              </div>
            ))}
          </motion.div>
        </div>
        {hasButtonNav && length > visibleSlides && (
          <>
            <Button
              aria-label="Previous Slide"
              onClick={() => prevSlide()}
              disabled={(!loop && currentSlide === 0) || isLoading || length <= displayedSlides}
              aria-disabled={(!loop && currentSlide === 0) || isLoading}
              className={cn(
                "carousel-btn-prev -order-1 rounded-full h-auto text-muted-foreground p-0 my-1",
                isLoading ? "text-muted-foreground/50" : "hover:bg-accent"
              )}
              variant="ghost"
            >
              <RxChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              aria-label="Next Slide"
              onClick={() => nextSlide()}
              disabled={(!loop && currentSlide >= length - displayedSlides) || isLoading || length <= displayedSlides}
              aria-disabled={(!loop && currentSlide >= length - visibleSlides) || isLoading}
              className={cn(
                "carousel-btn-next right-0 rounded-full h-auto  text-muted-foreground p-0 my-1",
                isLoading ? "text-muted-foreground/50" : "hover:bg-accent"
              )}
              variant="ghost"
            >
              <RxChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>
      {hasIndicators && !isLoading && (
        <>
          {/* Status indicator for mobile */}
          <div className="flex justify-center mt-2 sm:hidden">
            <span className="rounded-md px-2 bg-primary text-xs">
              {Math.ceil(currentSlide / displayedSlides) + 1}/{Math.ceil(length / displayedSlides)}
            </span>
          </div>

          {/* Dot indicators for larger screens */}
          <div className="hidden sm:flex justify-center mt-2">
            {Array.from({ length: Math.ceil(length / displayedSlides) }).map((_, index) => (
              <button
                key={index}
                aria-label={`Go to Slide ${index + 1}`}
                aria-current={index == Math.ceil(currentSlide / displayedSlides) ? "true" : "false"}
                onClick={() => {
                  const newSlideIndex = index * displayedSlides;
                  setCurrentSlide(newSlideIndex);
                  // Adjust for the case where the final group does not have 'displayedSlides' number of slides
                  const maxSlideIndex = Math.min(newSlideIndex, length - displayedSlides);
                  const slideWidth = Number(itemRef.current?.getBoundingClientRect().width) + 10;
                  const nextOffset = -maxSlideIndex * slideWidth;
                  offsetX.set(nextOffset);
                }}
                className="carousel-indicator w-4 h-4 mx-1 flex justify-center items-center"
              >
                <motion.div
                  animate={index == Math.ceil(currentSlide / displayedSlides) ? "active" : "default"}
                  variants={variants}
                  className={cn("h-2 rounded-full transition-colors duration-200 ease-out bg-muted", {
                    ["bg-primary"]: index == Math.ceil(currentSlide / displayedSlides)
                  })}
                ></motion.div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
