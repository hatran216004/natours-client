import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';

export default function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
