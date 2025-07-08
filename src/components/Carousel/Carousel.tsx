import styles from './Carousel.module.scss';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  RefObject,
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
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePosition: () => void;
  handleMoveSlide: (step: number) => void;
};

type CarouselType = {
  items?: number;
  controls?: boolean;
  nav?: boolean;
  loop?: boolean;
  children?: React.ReactNode;
};

const CarouselContext = createContext<ContextValueType | null>(null);

export function Carousel({
  controls = false,
  nav = false,
  loop = false,
  items = 1,
  children
}: CarouselType) {
  const [currentIndex, setCurrentIndex] = useState(loop ? items : 0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isInstant = useRef(true);
  const isAnimating = useRef(false);

  const originalSlides = Children.toArray(children);
  const slidesCount = Children.count(children);
  let slides: React.ReactNode[] = [...originalSlides];

  if (loop) {
    const cloneHead = handleCloneSlide('clone-head');
    const cloneTail = handleCloneSlide('clone-tail');
    slides = [...cloneHead, ...originalSlides, ...cloneTail];
  }

  const updatePosition = (instant = false) => {
    if (!trackRef.current) return;

    trackRef.current.style.transition = instant ? 'none' : 'transform 0.3s';
    const offset = -(currentIndex * (100 / items));
    trackRef.current.style.transform = `translateX(${offset}%)`;
  };

  useEffect(() => {
    updatePosition(isInstant.current);
    isInstant.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // 4 5 6 1 2 3 4 5 6 1 2 3

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (loop) {
        const maxIndex = slides.length - items;
        if (currentIndex <= 0) {
          setCurrentIndex(maxIndex - items);
          isInstant.current = true;
        } else if (currentIndex >= maxIndex) {
          setCurrentIndex(items);
          isInstant.current = true;
        }
      }
      isAnimating.current = false;
    }, 300);

    return () => {
      if (timerId) clearTimeout(timerId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function handleMoveSlide(step: number) {
    if (!trackRef.current) return;

    if (isAnimating.current) return;
    isAnimating.current = true;

    let newCurrentIndex;
    if (loop) {
      newCurrentIndex = (currentIndex + step + slides.length) % slides.length;
    } else {
      // Đảm bảo rằng newCurrentIndex mới không nhỏ hơn 0 và không vượt quá maxIndex
      const maxIndex = slidesCount - items;
      newCurrentIndex = Math.min(Math.max(currentIndex + step, 0), maxIndex);
    }
    setCurrentIndex(newCurrentIndex);
  }

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
        setCurrentIndex,
        updatePosition,
        handleMoveSlide
      }}
    >
      <div className={clsx(styles.wrapper)}>
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
  const { handleMoveSlide } = useCarousel();

  return (
    <>
      <button onClick={() => handleMoveSlide(-1)} className={clsx(styles.prev)}>
        <ChevronLeft />
      </button>
      <button onClick={() => handleMoveSlide(1)} className={clsx(styles.next)}>
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
