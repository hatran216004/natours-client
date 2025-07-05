import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';

export default function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}
