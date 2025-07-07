import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';
import Header from './components/Header';
import Blog from './pages/Blog';
import About from './pages/About';
import Destinations from './pages/Destinations';

export default function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}
