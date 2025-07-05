import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  cssClass?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: () => void;
};

export default function Button({
  size = 'medium',
  variant = 'primary',
  cssClass = '',
  icon,
  children,
  onClick
}: ButtonType) {
  return (
    <button
      onClick={() => onClick?.()}
      className={clsx(styles.btn, styles[size], styles[variant], cssClass)}
    >
      {icon && icon} {children}
    </button>
  );
}
