import styles from './Carousel.module.scss';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  createContext,
  createRef,
  RefObject,
  useContext,
  useRef,
  useState
} from 'react';

type CarouselType = {
  items?: number;
  controls?: boolean;
  nav?: boolean;
  loop?: boolean;
  children?: React.ReactNode;
};

type ContextValueType = {
  items: number;
  slidesCount: number;
  loop: boolean;
  trackRef: RefObject<HTMLDivElement | null>; // { current: HTMLDivElement | null }
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const CarouselDefaultValue: ContextValueType = {
  items: 1,
  slidesCount: 0,
  loop: false,
  trackRef: createRef<HTMLDivElement>(), // { current: null }
  currentIndex: 0,
  setCurrentIndex: () => {}
};

const CarouselContext = createContext<ContextValueType>(CarouselDefaultValue);

export function Carousel({
  controls = false,
  nav = false,
  loop = false,
  items = 1,
  children
}: CarouselType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  return (
    <CarouselContext.Provider
      value={{
        items,
        trackRef,
        loop,
        slidesCount: Children.count(children),
        currentIndex,
        setCurrentIndex
      }}
    >
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.inner)}>
          <SlideTrack>{children}</SlideTrack>
        </div>
        {controls && <Controls />}
      </div>
      {nav && <DotsNav />}
    </CarouselContext.Provider>
  );
}

function SlideTrack({ children }: { children: React.ReactNode }) {
  const { trackRef } = useContext(CarouselContext);
  return (
    <div className={clsx(styles.track)} ref={trackRef}>
      {children}
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
  const { items } = useContext(CarouselContext);
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
  const { loop, items, trackRef, slidesCount, currentIndex, setCurrentIndex } =
    useContext(CarouselContext);

  const handleMoveSlide = (step: number) => {
    if (!trackRef.current) return;

    let newCurrentIndex;
    if (loop) {
      newCurrentIndex = (currentIndex + step + slidesCount) % slidesCount;
    } else {
      // Đảm bảo rằng newCurrentIndex mới không nhỏ hơn 0 và không vượt quá maxIndex
      const maxIndex = slidesCount - items;
      newCurrentIndex = Math.min(Math.max(currentIndex + step, 0), maxIndex);
    }
    setCurrentIndex(newCurrentIndex);

    const offset = -(newCurrentIndex * (100 / items));
    trackRef.current.style.transform = `translateX(${offset}%)`;
  };

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
