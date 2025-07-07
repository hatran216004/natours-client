import styles from './Home.module.scss';
import clsx from 'clsx';
import Container from '@/components/Container';
import Hero from './components/Hero';
import Services from './components/Services';
import Search from '@/components/Search';

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <div className={clsx(styles.search)}>
          <Search />
        </div>
        <Services />
      </Container>
    </>
  );
}
