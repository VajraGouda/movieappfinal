import HomePage from "./pages/HomePage";
import AllMoviesPage from "./pages/AllMoviesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TheatreSelection from "./pages/TheatreSelection";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie' element={<AllMoviesPage />} />
        <Route path='/movie/:id' element={<MovieDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/theatre/:id' element={<TheatreSelection />} />
        <Route path='/seats/:movieId' element={<SeatSelectionPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
