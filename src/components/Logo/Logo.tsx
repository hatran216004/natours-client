import styles from './Logo.module.scss';
import clsx from 'clsx';
import logo_img from '@/assets/imgs/Logo.png';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className={clsx(styles.logo)}>
      <img src={logo_img} alt="Pathway" />
      <h1 className={clsx(styles.logoTitle)}>Pathway</h1>
    </Link>
  );
}
