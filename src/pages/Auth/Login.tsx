import styles from './Auth.module.scss';
import clsx from 'clsx';
import { Github } from 'lucide-react';
import Button from '@/components/Button';
import google_icon from '@/assets/icons/google.svg';
import { Link } from 'react-router-dom';
import Input from '@/components/Input';

export default function Login() {
  return (
    <div className={clsx(styles.wrapper)}>
      <h2 className={clsx(styles.title)}>Sign In</h2>
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
          <Input name="password" placeholder="Password..." type="password" />

          <Link to="/" className={clsx(styles.forgotPassword)}>
            Forgot password?
          </Link>
          <Button size="large" cssClass={clsx(styles.btnSubmit)}>
            Sign In
          </Button>
        </form>
      </div>
      <div className={clsx(styles.noAccount)}>
        <span>Don’t a have account?</span> <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
