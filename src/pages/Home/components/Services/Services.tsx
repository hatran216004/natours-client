import styles from './Services.module.scss';
import clsx from 'clsx';
import icons from '@/assets/icons';

export default function Services() {
  return (
    <section className={clsx(styles.services)}>
      <h2 className={clsx('heading-2', styles.heading)}>
        How we can help you to travel?
      </h2>
      <div className={clsx('row row-cols-3 row-cols-lg-1')}>
        <div className={clsx('col')}>
          <div className={clsx(styles.card)}>
            <div className={clsx(styles.icon)}>
              <img src={icons.map_pin} alt="" />
            </div>
            <h4 className={clsx(styles.title)}>Destinations</h4>
            <p className={clsx('description-2', styles.desc)}>
              Explore destinations around the world from 110 countries. We are
              providing the best travel guide services.
            </p>
          </div>
        </div>
        <div className={clsx('col')}>
          <div className={clsx(styles.card)}>
            <div className={clsx(styles.icon)}>
              <img src={icons.map} alt="" />
            </div>
            <h4 className={clsx(styles.title)}>Itineraries</h4>
            <p className={clsx('description-2', styles.desc)}>
              Discover detailed itineraries from 3 days to 1 week fro multiple
              destinations . We are providing the best travel guide services.
            </p>
          </div>
        </div>
        <div className={clsx('col')}>
          <div className={clsx(styles.card)}>
            <div className={clsx(styles.icon)}>
              <img src={icons.travel_tips} alt="" />
            </div>
            <h4 className={clsx(styles.title)}>Travel Tips</h4>
            <p className={clsx('description-2', styles.desc)}>
              Learn from the best. Travel tips gathered from our 10 years of
              full-time travel. We are providing the best travel guide services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
