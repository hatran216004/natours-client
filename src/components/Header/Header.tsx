import styles from './Header.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={clsx(styles.header)}>
      <Container>
        <div className={clsx(styles.inner)}>
          <Logo />
          <NavBar />
          <div className={clsx(styles.actions)}>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login in
            </Button>
            <Button onClick={() => navigate('/signup')}>Sign up</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
