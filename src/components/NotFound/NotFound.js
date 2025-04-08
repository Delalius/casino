import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <p>Упс... Страница не найдена 😢</p>
            <Link to="/" className="home-button">На главную</Link>
        </div>
    );
}
