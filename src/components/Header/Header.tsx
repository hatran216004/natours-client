import styles from './Header.module.scss';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Header() {
  const [isShowNav, setIsShowNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];

  return (
    <header className={clsx(styles.header)}>
      <Container>
        <div className={clsx(styles.inner)}>
          <button
            className={clsx(styles.menuIcon, 'd-none d-lg-block')}
            onClick={() => setIsShowNav(true)}
          >
            <Menu />
          </button>
          <Logo className="d-sm-none" />
          <NavBar isShowNav={isShowNav} onShowNav={setIsShowNav} />
          <div className={clsx(styles.actions)}>
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              isActive={pathname === 'login'}
              cssClass="d-md-none"
            >
              Login in
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/signup')}
              isActive={pathname === 'signup'}
            >
              Sign up
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
