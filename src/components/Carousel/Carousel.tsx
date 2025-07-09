/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Carousel.module.scss';
import clsx from 'clsx';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  ReactElement,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

type ContextValueType = {
  items: number;
  slidesCount: number;
  loop: boolean;
  trackRef: RefObject<HTMLDivElement | null>; // { current: HTMLDivElement | null }
  currentIndex: number;
  originalSlides: React.ReactNode[];
  slides: React.ReactNode[];
  slideSize: number;
  pageIndex: number;
  prevButton: React.ReactElement | null;
  nextButton: React.ReactElement | null;
  controlsText: [string, string];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePosition: () => void;
  handleMoveSlide: (step: number) => void;
};

type CarouselType = {
  items?: number;
  controls?: boolean;
  nav?: boolean;
  loop?: boolean;
  speed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  autoplayHoverPause?: boolean;
  controlsText?: [string, string];
  prevButton?: React.ReactElement | null;
  nextButton?: React.ReactElement | null;
  slideBy?: 'page' | number;
  children?: React.ReactNode;
};

const CarouselContext = createContext<ContextValueType | null>(null);

export function Carousel({
  controls = false,
  controlsText = ['<', '>'],
  nav = true,
  items = 1,
  loop = true,
  autoplay = false,
  autoplayHoverPause = false,
  speed = 300,
  autoplayInterval = 3000,
  slideBy = 1,
  prevButton = null,
  nextButton = null,
  children
}: CarouselType) {
  const [currentIndex, setCurrentIndex] = useState(loop ? items : 0);
  const [pageIndex, setPageIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isInstant = useRef(true);
  const isAnimating = useRef(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const originalSlides = Children.toArray(children);
  const slidesCount = Children.count(children);
  let slides: React.ReactNode[] = [...originalSlides];

  const slideSize = slideBy === 'page' ? items : slideBy;

  if (loop) {
    const cloneHead = handleCloneSlide('clone-head');
    const cloneTail = handleCloneSlide('clone-tail');
    slides = [...cloneHead, ...originalSlides, ...cloneTail];
  }
  const maxIndex = slides.length - items;

  const updateNav = () => {
    let realIndex = currentIndex;
    if (loop) {
      realIndex = (currentIndex - items + slidesCount) % slidesCount;
    }
    setPageIndex(Math.floor(realIndex / items));
  };

  const updatePosition = (instant = false) => {
    if (!trackRef.current) return;

    trackRef.current.style.transition = instant
      ? 'none'
      : `transform ${speed}ms`;
    const offset = -(currentIndex * (100 / items));
    trackRef.current.style.transform = `translateX(${offset}%)`;

    if (nav && !instant) updateNav();
  };

  const handleMoveSlide = useCallback(
    (step: number) => {
      if (!trackRef.current || isAnimating.current) return;
      isAnimating.current = true;

      setCurrentIndex((preIndex) => {
        // Đảm bảo rằng newCurrentIndex mới không nhỏ hơn 0 và không vượt quá maxIndex
        const newIndex = Math.min(Math.max(preIndex + step, 0), maxIndex);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          if (loop) {
            if (newIndex <= 0) {
              setCurrentIndex(maxIndex - items);
              isInstant.current = true;
            } else if (newIndex >= maxIndex) {
              setCurrentIndex(items);
              isInstant.current = true;
            }
          }
          isAnimating.current = false;
        }, speed);

        return newIndex;
      });
    },
    [maxIndex, items, loop, speed]
  );

  function handleCloneSlide(keyPrefix: string) {
    let cloneSlides: React.ReactNode[] = [];
    if (keyPrefix.includes('head')) {
      cloneSlides = originalSlides.slice(-items);
    }

    if (keyPrefix.includes('tail')) {
      cloneSlides = originalSlides.slice(0, items);
    }

    return cloneSlides.map((node, index) => {
      if (isValidElement(node)) {
        return cloneElement(node, { key: `${keyPrefix}-${index}` });
      }
      return node;
    });
  }

  const runAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      handleMoveSlide(slideSize);
    }, autoplayInterval);
  }, [autoplayInterval, slideSize, handleMoveSlide]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (autoplay) runAutoplay();
  }, [autoplay, runAutoplay]);

  useEffect(() => {
    updatePosition(isInstant.current);
    isInstant.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (autoplayHoverPause) {
      container.addEventListener('mouseenter', stopAutoplay);
      container.addEventListener('mouseleave', runAutoplay);
    }

    return () => {
      if (autoplayHoverPause) {
        container.removeEventListener('mouseenter', stopAutoplay);
        container.removeEventListener('mouseleave', runAutoplay);
      }
    };
  }, [autoplayHoverPause, stopAutoplay, runAutoplay]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        items,
        trackRef,
        loop,
        slidesCount,
        slides,
        originalSlides,
        currentIndex,
        slideSize,
        pageIndex,
        controlsText,
        prevButton,
        nextButton,
        setCurrentIndex,
        setPageIndex,
        updatePosition,
        handleMoveSlide
      }}
    >
      <div ref={containerRef}>
        <div className={clsx(styles.wrapper)}>
          <div className={clsx(styles.inner)}>
            <SlideTrack />
          </div>
          {controls && <Controls />}
        </div>
        {nav && <DotsNav />}
      </div>
    </CarouselContext.Provider>
  );
}

function SlideTrack() {
  const { trackRef, slides } = useCarousel();
  return (
    <div className={clsx(styles.track)} ref={trackRef}>
      {slides}
    </div>
  );
}

export function Slide({
  className = '',
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { items } = useCarousel();
  return (
    <div
      className={clsx(className, styles.slide)}
      style={{ flexBasis: `calc(100% / ${items})` }}
    >
      {children}
    </div>
  );
}

function Controls() {
  const { slideSize, controlsText, prevButton, nextButton, handleMoveSlide } =
    useCarousel();

  return (
    <>
      {prevButton && isValidElement(prevButton) ? (
        cloneElement(prevButton as ReactElement<any>, {
          ...(prevButton.props as object),
          onClick: () => handleMoveSlide(-slideSize)
        })
      ) : (
        <button
          onClick={() => handleMoveSlide(-slideSize)}
          className={clsx(styles.prev)}
        >
          {controlsText[0]}
        </button>
      )}
      {nextButton && isValidElement(nextButton) ? (
        cloneElement(nextButton as ReactElement<any>, {
          ...(nextButton.props as object),
          onClick: () => handleMoveSlide(slideSize)
        })
      ) : (
        <button
          onClick={() => handleMoveSlide(slideSize)}
          className={clsx(styles.next)}
        >
          {controlsText[1]}
        </button>
      )}
    </>
  );
}

function DotsNav() {
  const { slidesCount, items, pageIndex, loop, setCurrentIndex } =
    useCarousel();
  const pageCount = Math.ceil(slidesCount / items);

  const handleClick = (index: number) => {
    const newIndex = loop ? index * items + items : index * items;
    setCurrentIndex(newIndex);
  };

  return (
    <ul className={clsx(styles.nav)}>
      {Array(pageCount)
        .fill(0)
        .map((_, index) => (
          <li key={index} onClick={() => handleClick(index)}>
            <button
              className={clsx(styles.dot, index === pageIndex && styles.active)}
            ></button>
          </li>
        ))}
    </ul>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarousel() {
  const value = useContext(CarouselContext);
  if (!value) throw new Error('useCarousel must be used into CarouselProvider');
  return value;
}
