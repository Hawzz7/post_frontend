import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import FavouritesPage from "./components/FavouritesPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  </Router>
);

export default App;
