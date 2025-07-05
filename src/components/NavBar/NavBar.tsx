import styles from './NavBar.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <ul className={clsx(styles.navList)}>
        <li>
          <Link to="/" className={clsx(styles.navItem)}>
            Destinations
          </Link>
        </li>
        <li>
          <Link to="/" className={clsx(styles.navItem)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/" className={clsx(styles.navItem)}>
            Blog
          </Link>
        </li>
        <li>
          <Link to="/" className={clsx(styles.navItem)}>
            Page
          </Link>
        </li>
      </ul>
    </nav>
  );
}
