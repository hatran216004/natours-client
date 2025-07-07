import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  cssClass?: string;
  noHover?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: () => void;
};

export default function Button({
  size = 'medium',
  variant = 'primary',
  cssClass = '',
  noHover = false,
  isActive = false,
  icon,
  children,
  onClick
}: ButtonType) {
  return (
    <button
      onClick={() => onClick?.()}
      className={clsx(styles.btn, styles[size], styles[variant], cssClass, {
        [styles.noHover]: noHover,
        [styles.active]: isActive
      })}
    >
      {icon && icon} {children}
    </button>
  );
}
