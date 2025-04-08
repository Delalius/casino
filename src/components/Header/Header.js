import React from "react";
import './Header.css';
import '../../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faViber} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Casino Logo" />
            </Link>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/blackjack">Игры</Link></li>
                    <li><Link to="/rules">Правила казино</Link></li>
                </ul>
            </nav>
            <div className="social-icons">
                <a href="https://t.me/XaeSs" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTelegram} size="2x" />
                </a>
                <a href="viber://chat?number=%2B380935718691" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faViber} size="2x" />
                </a>
            </div>
        </header>
    );
}
