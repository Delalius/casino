import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const cardsRef = useRef(new Array(3).fill(null));
  const gamesRef = useRef(null);

  const scrollToGames = () => {
    if (gamesRef.current) {
      gamesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (cardsRef.current.every((el) => el !== null)) {
      gsap.set(cardsRef.current, { opacity: 0, y: 50 });
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  const games = [
    {
      name: "BlackJack",
      img: `${process.env.PUBLIC_URL}/assets/images/blackjack.jpg`,
      link: "/blackjack",
    },
    {
      name: "Slots",
      img: `${process.env.PUBLIC_URL}/assets/images/slots.jpg`,
      link: "/slots",
    },
    {
      name: "Poker",
      img: `${process.env.PUBLIC_URL}/assets/images/poker.jpg`,
      link: "/poker",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Казино «One More Bet»</h1>
          <p>ну вот ещё один раз, и точно хватит..</p>
          <button onClick={scrollToGames} className="btn">
            Начать игру
          </button>
        </div>
      </section>

      <section className="games" ref={gamesRef}>
        <div className="game-content">
          <h2>Выберите свою игру</h2>
          <div className="game-grid">
            {games.map((game, index) => (
              <div
                className="game-card"
                key={game.name}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <img src={game.img} alt={game.name} />
                <h3>{game.name}</h3>

                {game.name === "Poker" ? (
                  <>
                    <button className="game-card-button" disabled>
                      Играть
                    </button>
                    <div className="wip-overlay">Work in progress</div>
                  </>
                ) : (
                  <Link to={game.link} className="game-card-button">
                    Играть
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
