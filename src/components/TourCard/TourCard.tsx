import styles from './TourCard.module.scss';
import clsx from 'clsx';
import imgs from '@/assets/imgs';
import icons from '@/assets/icons';

export default function TourCard() {
  return (
    <div className="col">
      <div>
        <figure className={clsx(styles.image)}>
          <img src={imgs.popular_tour_mock} alt="" />
          <span className={clsx(styles.price)}>$450</span>
        </figure>
        <p className={clsx('description-3', styles.description)}>
          Lago Di Braies, Italy
        </p>
        <h2 className={clsx(styles.name)}>The gorgeous lake of Italy</h2>
        <div className={clsx(styles.rating)}>
          <div className={clsx(styles.stars)}>
            <img src={icons.star} alt="" />
            <span>4.5</span>
          </div>
          <span className={clsx(styles.totalReviews)}>(3.9K Reviews)</span>
        </div>
      </div>
    </div>
  );
}
