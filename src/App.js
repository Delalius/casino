import Home from "./components/Home/Home.js";
import BlackJack from "./components/Blackjack/BlackJack.js";
import Slots from "./components/Slots/Slots.js";
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.js";
import Rules from "./components/Rules/Rules.js";
import NotFound from './components/NotFound/NotFound.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Главная */}
        <Route path="/blackjack" element={<BlackJack />} /> {/* Блэкджек */}
        <Route path="/slots" element={<Slots />} /> {/* Слоты */}
        <Route path="/rules" element={<Rules />} /> {/* Страница правил */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
