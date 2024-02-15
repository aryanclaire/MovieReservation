import './App.css';
import Layout from './main_components/Layout';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Details from './pages/Details/Details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reservation from './pages/Reservation/Reservation';
import ReservationList from './pages/Reservation/ReservationList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="details/:id/:seatArray" element={<Details />} />

          {/* i want the url to go here */}
          <Route path="movies/:id" element={<Reservation />} />
          <Route path="reserve" element={<ReservationList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
