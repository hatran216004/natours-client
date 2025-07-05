import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  onBlur?: () => void;
};

export default function Input({ name, type, placeholder, ...rest }: InputType) {
  return (
    <div className={clsx(styles.inputWrapper)}>
      <input type={type} name={name} placeholder={placeholder} {...rest} />
    </div>
  );
}
