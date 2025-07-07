import styles from './Search.module.scss';
import clsx from 'clsx';
import icons from '@/assets/icons';
import Button from '@/components/Button';

type SearchType = {
  cssClass?: string;
};

export default function Search({ cssClass = '' }: SearchType) {
  return (
    <div className={clsx(styles.search, cssClass)}>
      <img
        src={icons.map_pin_small}
        alt="map pin icon"
        className={clsx(styles.icon)}
      />
      <form className={clsx(styles.form)}>
        <input
          type="text"
          className={clsx(styles.input)}
          placeholder="Where do you want to go?"
        />
        <Button size="large" cssClass={clsx(styles.btn)}>
          Search
        </Button>
      </form>
    </div>
  );
}
