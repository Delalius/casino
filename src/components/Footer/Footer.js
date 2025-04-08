import React from "react";
import './Footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Oleh Hrytsyk</p>
      <small className="disclaimer">
        Этот сайт создан в учебных целях. Казино «One More Bet» не является
        настоящим игровым заведением и не предлагает реальные азартные игры или
        возможность выиграть деньги.
      </small>
    </footer>
  );
}
