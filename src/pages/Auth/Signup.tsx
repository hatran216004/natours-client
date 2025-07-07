import styles from './Auth.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Github } from 'lucide-react';
import google_icon from '@/assets/icons/google.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Signup() {
  return (
    <div className={clsx(styles.wrapper)}>
      <h2 className={clsx(styles.title)}>Sign Up</h2>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.socials)}>
          <Button variant="outline" cssClass={clsx(styles.btn)} noHover>
            <img src={google_icon} alt="google icon" />
            Continue with Google
          </Button>
          <Button variant="outline" cssClass={clsx(styles.btn)} noHover>
            <Github />
            Continue with Github
          </Button>
        </div>
        <span className={clsx(styles.separate)}>OR</span>
        <form className={clsx(styles.form)}>
          <Input name="email" placeholder="Email..." type="email" />
          <Input name="username" placeholder="Username..." type="text" />
          <Input name="password" placeholder="Password..." type="password" />
          <Input
            name="confirmPassword"
            placeholder="Confirm password..."
            type="password"
          />

          <Button size="large" cssClass={clsx(styles.btnSubmit)}>
            Sign Up
          </Button>
        </form>
      </div>
      <div className={clsx(styles.noAccount)}>
        <span>Have a account?</span> <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}
