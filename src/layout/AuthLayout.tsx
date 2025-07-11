import styles from './AuthLayout.module.scss';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className={clsx(styles.backdrop)}>
      <Outlet />
    </div>
  );
}
