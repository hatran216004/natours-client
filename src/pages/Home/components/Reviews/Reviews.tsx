import { Carousel, Slide } from '@/components/Carousel';
import styles from './Reviews.module.scss';
import clsx from 'clsx';

export default function Reviews() {
  return (
    <section>
      <Carousel items={3} controls>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Slide
              key={index}
              className={clsx(styles[`slide-${index + 1}`], styles.slide)}
            >
              slide {index + 1}
            </Slide>
          ))}
      </Carousel>
    </section>
  );
}
