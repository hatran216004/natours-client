import styles from './PopularTours.module.scss';
import clsx from 'clsx';
import TourCard from '@/components/TourCard';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

export default function PopularTours() {
  const navigate = useNavigate();
  return (
    <section className={clsx(styles.popular)}>
      <h2 className={clsx('heading-2', styles.heading)}>Popular tours</h2>
      <p className={clsx('description-1', styles.description)}>
        Create a fully customized day-by-day itinerary for free. Imagine
        checking one place for your travel.
      </p>
      <div className="row row-cols-3 row-cols-lg-1 g-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <TourCard key={index} />
          ))}
      </div>
      <Button cssClass={clsx(styles.btn)} onClick={() => navigate('/tours')}>
        View All Trips
      </Button>
    </section>
  );
}
