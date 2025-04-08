import React from "react";
import './Header.css';
import '../../styles.css';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faViber} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <a href="/" className="logo">
                <img src={logo} alt="Casino Logo" />
            </a>
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
