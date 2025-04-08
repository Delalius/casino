import React, { useState } from "react";
import './Header.css';
import '../../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faViber } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="top-bar">
                {/* Логотип */}
                <Link to="/" className="logo">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Casino Logo" />
                </Link>

                {/* Навигация для десктопа */}
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/blackjack">Игры</Link></li>
                        <li><Link to="/rules">Правила казино</Link></li>
                    </ul>
                </nav>

                {/* Социальные иконки для десктопа */}
                <div className="social-icons">
                    <a href="https://t.me/XaeSs" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegram} size="2x" />
                    </a>
                    <a href="viber://chat?number=%2B380935718691" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faViber} size="2x" />
                    </a>
                </div>

                {/* Мобильное меню */}
                <label className="hamburger">
                    <input
                        type="checkbox"
                        checked={menuOpen}
                        onChange={() => setMenuOpen(!menuOpen)}
                    />
                    <svg viewBox="0 0 32 32">
                        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                        <path className="line" d="M7 16 27 16"></path>
                    </svg>
                </label>
            </div>

            {/* Мобильное меню, которое открывается по клику на бургер */}
            <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link></li>
                    <li><Link to="/blackjack" onClick={() => setMenuOpen(false)}>Игры</Link></li>
                    <li><Link to="/rules" onClick={() => setMenuOpen(false)}>Правила казино</Link></li>
                </ul>
                <div className="social-icons">
                    <a href="https://t.me/XaeSs" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegram} size="2x" />
                    </a>
                    <a href="viber://chat?number=%2B380935718691" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faViber} size="2x" />
                    </a>
                </div>
            </nav>
        </header>
    );
}
