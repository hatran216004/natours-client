import styles from './NavBar.module.scss';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type NavBarType = {
  isShowNav?: boolean;
  onShowNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({ isShowNav, onShowNav }: NavBarType) {
  return (
    <nav className={clsx(styles.nav, isShowNav ? styles.show : styles.hide)}>
      <button
        className={clsx(styles.navBack, 'd-none d-lg-flex')}
        onClick={() => onShowNav?.((prev) => !prev)}
      >
        <ArrowLeft />
      </button>
      <ul className={clsx(styles.navList)} onClick={() => onShowNav?.(false)}>
        <li className={clsx(styles.navItem)}>
          <Link to="/destinations" className={clsx(styles.navLink)}>
            Destinations
          </Link>
        </li>
        <li className={clsx(styles.navItem)}>
          <Link to="/about" className={clsx(styles.navLink)}>
            About
          </Link>
        </li>
        <li className={clsx(styles.navItem)}>
          <Link to="/blog" className={clsx(styles.navLink)}>
            Blog
          </Link>
        </li>
        <li className={clsx(styles.navItem)}>
          <Link to="/" className={clsx(styles.navLink)}>
            Page
          </Link>
        </li>
      </ul>
    </nav>
  );
}
