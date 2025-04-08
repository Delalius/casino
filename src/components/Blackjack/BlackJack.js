import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import React from "react";
import "./Blackjack.css";
import "../../styles.css";
import Header from "../Header/Header";

const initialBalance = 1000;
const betOptions = [50, 100, 500];

const deck = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 10 },
  { name: "Q", value: 10 },
  { name: "K", value: 10 },
  { name: "A", value: 11 },
];

const getRandomCard = () => deck[Math.floor(Math.random() * deck.length)];


const BetControls = ({ placeBet, resetBet }) => (
  <div className="bet-options">
    {betOptions.map((amount) => (
      <button key={amount} onClick={() => placeBet(amount)}>
        Ставка {amount}
      </button>
    ))}
    <button onClick={resetBet}>Сбросить ставку</button>
  </div>
);

const GameStatus = ({ balance, bet, gameOver, message }) => (
  <div>
    <h2>Баланс: {balance}</h2>
    <p>Текущая ставка: {bet}</p>
    {message && <h3>{message}</h3>}
    {gameOver && (
      <h2>Игра окончена! Обновите страницу, чтобы начать заново.</h2>
    )}
  </div>
);

export default function Blackjack() {
  const [balance, setBalance] = useState(initialBalance);
  const [bet, setBet] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [dealerVisibleCards, setDealerVisibleCards] = useState([null, null]);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  // Логика ставки
  const placeBet = (amount) => {
    const maxBet = Math.floor(balance * 0.5);
    const newBet = bet + amount;

    if (newBet > maxBet || newBet > balance) return;
    setBet(newBet);
  };

  const resetBet = () => {
    setBet(0);
  };

  // Подсчёт суммы очков
  const calculateScore = (cards) => {
    let total = cards.reduce((sum, card) => sum + card.value, 0);
    let aceCount = cards.filter((card) => card.name === "A").length;

    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }
    return total;
  };

  // Проверка на блэкджек
  const checkForBlackjack = (cards) => {
    if (cards.length === 2) {
      const values = cards.map((card) => card.value);
      return values.includes(11) && values.includes(10);
    }
    return false;
  };

  // Раздача карт
  const dealCards = () => {
    if (bet === 0) return;

    const playerStartingCards = [getRandomCard(), getRandomCard()];
    const dealerStartingCards = [getRandomCard(), getRandomCard()];

    setPlayerCards(playerStartingCards);
    setDealerCards(dealerStartingCards);
    setPlayerScore(calculateScore(playerStartingCards));
    setDealerScore(calculateScore(dealerStartingCards));
    setMessage("");
    setDealerVisibleCards([dealerStartingCards[0], { name: "back", value: 0 }]);

    animateCards(playerCards, dealerCards);

    // Проверка блэкджека у дилера
    if (checkForBlackjack(dealerStartingCards)) {
      setDealerCards(dealerStartingCards);
      setDealerVisibleCards(dealerStartingCards);
      setDealerScore(21);
      setMessage("Дилер получил блэкджек! Вы проиграли.");
      handleBalanceAfterGameOver();
      setButtonsVisible(false);
      setTimeout(() => {
        setButtonsVisible(true);
      }, 3500);
    }
  };

  // Функция анимации карт
  const animateCards = (playerCards, dealerCards) => {
    const playerCardsElements = document.querySelectorAll(".player .card");
    const dealerCardsElements = document.querySelectorAll(".dealer .card");

    // Плавная анимация карт игрока и дилера
    gsap.fromTo(
      playerCardsElements,
      { scale: 0, y: 50, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
        stagger: 0.1,
      }
    );

    gsap.fromTo(
      dealerCardsElements,
      { scale: 0, y: 50, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
        stagger: 0.1,
      }
    );
  };

  // Обработка после окончания игры
  const handleBalanceAfterGameOver = () => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance - bet;
      if (newBalance <= 0) {
        setGameOver(true);
      } else {
        setTimeout(resetGame, 3500);
      }
      return newBalance;
    });
  };

  // Логика для "взять карту"
  const hit = () => {
    if (gameOver) return;

    const newCard = getRandomCard();
    const newPlayerCards = [...playerCards, newCard];
    const newScore = calculateScore(newPlayerCards);

    setPlayerCards(newPlayerCards);
    setPlayerScore(newScore);

    if (newScore > 21) {
      setMessage("Перебор! Вы проиграли.");
      setButtonsVisible(false);

      setTimeout(() => {
        setBalance((prevBalance) => {
          const newBalance = prevBalance - bet;
          if (newBalance === 0) {
            setGameOver(true); // Завершаем игру, если баланс равен нулю
          }
          return newBalance;
        });

        if (!gameOver) resetGame(); // Сбросить игру через 3.5 секунд
        setButtonsVisible(true); // Показать кнопки снова
      }, 3500);
    }
  };

  // Логика для "остановиться"
  const stand = () => {
    if (gameOver) return;

    setDealerVisibleCards([dealerCards[0], dealerCards[1]]);
    let newDealerScore = calculateScore(dealerCards);

    while (newDealerScore < 17) {
      const newCard = getRandomCard();
      dealerCards.push(newCard);
      newDealerScore = calculateScore(dealerCards);
      setDealerCards(dealerCards);
      setDealerScore(newDealerScore);
    }

    let newBalance = balance;
    if (newDealerScore > 21 || playerScore > newDealerScore) {
      setMessage("Вы выиграли!");
      newBalance += bet;
    } else if (newDealerScore > playerScore) {
      setMessage("Вы проиграли.");
      newBalance -= bet;
    } else {
      setMessage("Ничья!");
    }

    setBalance(newBalance);
    if (newBalance === 0) setGameOver(true);
    else {
      setButtonsVisible(false);
      setTimeout(() => {
        if (!gameOver) resetGame();
        setButtonsVisible(true);
      }, 3500);
    }
  };

  // Сброс игры
  const resetGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setBet(0);
    setMessage("");
    setDealerVisibleCards([null, null]);
    setGameOver(false);
  };

  // Отображаем только видимый счет дилера
  const dealerScoreToDisplay =
    dealerVisibleCards[1] && dealerVisibleCards[1].name !== "back"
      ? dealerScore
      : dealerVisibleCards[0]
      ? dealerVisibleCards[0].value
      : 0;

  const playerCardsRef = useRef([]);
  const dealerCardsRef = useRef([]);

  useEffect(() => {
    if (playerCards.length > 0) {
      const lastIndex = playerCards.length - 1;
      const lastCard = playerCardsRef.current[lastIndex];

      if (lastCard) {
        gsap.fromTo(
          lastCard,
          { scale: 0, y: 50, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.75)",
          }
        );
      }
    }
  }, [playerCards]);

  useEffect(() => {
    if (dealerCards.length > 0) {
      const lastIndex = dealerCards.length - 1;
      const lastCard = dealerCardsRef.current[lastIndex];

      if (lastCard) {
        gsap.fromTo(
          lastCard,
          { scale: 0, y: -50, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.75)",
          }
        );
      }
    }
  }, [dealerCards]);

  return (
    <div className="blackjack-page">
      <Header />
      <div className="game-container">
        <h1>Блэкджек</h1>
        <GameStatus
          balance={balance}
          bet={bet}
          gameOver={gameOver}
          message={message}
        />
        <BetControls placeBet={placeBet} resetBet={resetBet} />

        <div className="game-board">
          <div className="dealer">
            <h3>Дилер ({dealerScoreToDisplay})</h3>
            <div className="cards">
              {dealerVisibleCards.map((card, index) =>
                card ? (
                  <img
                    className="card"
                    key={index}
                    ref={(el) => (dealerCardsRef.current[index] = el)}
                    src={
                      card.name === "back"
                        ? "/public/assets/images/back.png"
                        : `/public/assets/images/${card.name}.png`
                    }
                    alt={card.name}
                  />
                ) : null
              )}
            </div>
          </div>

          <div className="player">
            <h3>Игрок ({playerScore})</h3>
            <div className="cards">
              {playerCards.map((card, index) =>
                card ? (
                  <img
                    className="card"
                    key={index}
                    ref={(el) => (playerCardsRef.current[index] = el)}
                    src={`/public/assets/images/${card.name}.png`}
                    alt={card.name}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>

        <div className="buttons-container">
  <button onClick={dealCards} disabled={bet === 0 || !buttonsVisible}>
    Раздать карты
  </button>
  <button
    onClick={hit}
    disabled={gameOver || playerCards.length === 0 || !buttonsVisible}
  >
    Взять карту
  </button>
  <button
    onClick={stand}
    disabled={gameOver || playerCards.length === 0 || !buttonsVisible}
  >
    Остановиться
  </button>
</div>

      </div>
    </div>
  );
}
