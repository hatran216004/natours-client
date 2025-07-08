import { Carousel, Slide } from '@/components/Carousel';
import styles from './Reviews.module.scss';
import clsx from 'clsx';

export default function Reviews() {
  return (
    <section>
      <Carousel items={1} controls loop>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Slide key={index} className={clsx(styles.slideItem)}>
              slide {index + 1}
            </Slide>
          ))}
      </Carousel>
    </section>
  );
}
