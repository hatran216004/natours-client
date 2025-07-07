import Container from '@/components/Container';
import styles from './Statistical.module.scss';
import clsx from 'clsx';
import icons from '@/assets/icons';

export default function Statistical() {
  return (
    <section className={clsx(styles.statistical)}>
      <img
        src={icons.boat}
        alt="boat icon"
        className={clsx(styles.icon, 'd-xxl-none')}
      />
      <img
        src={icons.plan}
        alt="plan icon"
        className={clsx(styles.icon, 'd-xxl-none')}
      />
      <Container>
        <div className={clsx(styles.wrapper)}>
          <h3 className={clsx('heading-3', styles.heading)}>
            Not just your regular travel agency we are much more
          </h3>
          <div className="row row-cols-4 row-cols-lg-2 g-3">
            <div className="col">
              <div className={clsx(styles.stat)}>
                <span>20+</span>
                <span className={clsx('description-1')}>Elite Airlines</span>
              </div>
            </div>
            <div className="col">
              <div className={clsx(styles.stat)}>
                <span>1M+</span>
                <span className={clsx('description-1')}>
                  Satisfied Travelers
                </span>
              </div>
            </div>
            <div className="col">
              <div className={clsx(styles.stat)}>
                <span>50+</span>
                <span className={clsx('description-1')}>Awards Win</span>
              </div>
            </div>
            <div className="col">
              <div className={clsx(styles.stat)}>
                <span>12+</span>
                <span className={clsx('description-1')}>
                  Years of Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
