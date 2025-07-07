import styles from './Home.module.scss';
import clsx from 'clsx';
import Container from '@/components/Container';
import Hero from './components/Hero';
import Services from './components/Services';
import Search from '@/components/Search';
import PopularTours from './components/PopularTours';
import Statistical from './components/Statistical';
import TravelBenefits from './components/TravelBenefits';

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <div className={clsx(styles.search)}>
          <Search />
        </div>
        <Services />
        <PopularTours />
      </Container>
      <Statistical />
      <Container>
        <TravelBenefits />
      </Container>
    </>
  );
}
