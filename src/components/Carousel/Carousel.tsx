import styles from './Carousel.module.scss';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
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
  slideBy: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
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
  controlsText?: string[];
  prevButton?: null;
  nextButton?: null;
  slideBy?: number;
  children?: React.ReactNode;
};

const CarouselContext = createContext<ContextValueType | null>(null);

export function Carousel({
  controls = false,
  nav = false,
  items = 1,
  loop = true,
  speed = 300,
  autoplay = false,
  autoplayHoverPause = false,
  autoplayInterval = 3000,
  slideBy = 1,
  children
}: CarouselType) {
  const [currentIndex, setCurrentIndex] = useState(loop ? items : 0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInstant = useRef(true);
  const isAnimating = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const originalSlides = Children.toArray(children);
  const slidesCount = Children.count(children);
  let slides: React.ReactNode[] = [...originalSlides];

  if (loop) {
    const cloneHead = handleCloneSlide('clone-head');
    const cloneTail = handleCloneSlide('clone-tail');
    slides = [...cloneHead, ...originalSlides, ...cloneTail];
  }
  const maxIndex = slides.length - items;

  const updatePosition = (instant = false) => {
    if (!trackRef.current) return;

    trackRef.current.style.transition = instant
      ? 'none'
      : `transform ${speed}ms`;
    const offset = -(currentIndex * (100 / items));
    trackRef.current.style.transform = `translateX(${offset}%)`;
  };

  const handleMoveSlide = useCallback(
    (step: number) => {
      if (!trackRef.current || isAnimating.current) return;
      isAnimating.current = true;

      // Đảm bảo rằng newCurrentIndex mới không nhỏ hơn 0 và không vượt quá maxIndex
      const newCurrentIndex = Math.min(
        Math.max(currentIndex + step, 0),
        maxIndex
      );

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (loop) {
          if (newCurrentIndex <= 0) {
            setCurrentIndex(maxIndex - items);
            isInstant.current = true;
          } else if (newCurrentIndex >= maxIndex) {
            setCurrentIndex(items);
            isInstant.current = true;
          }
        }
        isAnimating.current = false;
      }, speed);
      setCurrentIndex(newCurrentIndex);
    },
    [currentIndex, maxIndex, items, loop, speed]
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
      handleMoveSlide(slideBy);
    }, autoplayInterval);
  }, [autoplayInterval, slideBy, handleMoveSlide]);

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
        slideBy,
        setCurrentIndex,
        updatePosition,
        handleMoveSlide
      }}
    >
      <div ref={containerRef} className={clsx(styles.wrapper)}>
        <div className={clsx(styles.inner)}>
          <SlideTrack />
        </div>
        {controls && <Controls />}
      </div>
      {nav && <DotsNav />}
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
  const { slideBy, handleMoveSlide } = useCarousel();
  return (
    <>
      <button
        onClick={() => handleMoveSlide(-slideBy)}
        className={clsx(styles.prev)}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => handleMoveSlide(slideBy)}
        className={clsx(styles.next)}
      >
        <ChevronRight />
      </button>
    </>
  );
}

function DotsNav() {
  return <div>DotsNav</div>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarousel() {
  const value = useContext(CarouselContext);
  if (!value) throw new Error('useCarousel must be used into CarouselProvider');
  return value;
}
