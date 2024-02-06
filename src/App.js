import './App.css';
import Layout from './main_components/Layout';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
