import React, { useState } from "react";
import "./Slots.css";

const initialBalance = 2500;
const betAmount = 50;

// Исходные коэффициенты
const symbolValues = {
  "🍒": 2,
  "🍋": 3,
  "🍌": 4,
  "🍇": 5,
  "🍉": 6,
  "⭐": 10,
  "🔔": 15,
  "🍊": 7,
  "🍏": 8,
};

// чем выше коэффициент, тем реже символ выпадает
const adjustedWeights = {};
const maxValue = Math.max(...Object.values(symbolValues));

Object.entries(symbolValues).forEach(([symbol, value]) => {
  adjustedWeights[symbol] = Math.round((maxValue / value) * 100);
});

// Генерация массива с символами по вероятностям
const weightedSymbols = Object.entries(adjustedWeights).flatMap(([symbol, weight]) =>
  Array(weight).fill(symbol)
);

// Функция для случайного выбора символа с учетом весов
const getSymbolWithWeight = () => {
  return weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
};

export default function Slots() {
  const [balance, setBalance] = useState(initialBalance);
  const [grid, setGrid] = useState(Array(3).fill(null).map(() => Array(3).fill("❓")));
  const [message, setMessage] = useState("Нажмите 'Крутить' для начала игры!");
  const [winningCells, setWinningCells] = useState([]);

  const spinReels = () => {
    if (balance < betAmount) {
      setMessage("Недостаточно средств!");
      return;
    }

    // Создаём новую сетку с учетом весов
    const newGrid = [
      [getSymbolWithWeight(), getSymbolWithWeight(), getSymbolWithWeight()],
      [getSymbolWithWeight(), getSymbolWithWeight(), getSymbolWithWeight()],
      [getSymbolWithWeight(), getSymbolWithWeight(), getSymbolWithWeight()],
    ];

    console.log("Сгенерированная сетка:", newGrid);

    setGrid(newGrid);
    setBalance(balance - betAmount);
    checkWin(newGrid);
  };

  const checkWin = (newGrid) => {
    let winMultiplier = 0;
    let winCells = [];

    // Проверка всех рядов
    for (let i = 0; i < 3; i++) {
      const [a, b, c] = newGrid[i];
      if (a === b && b === c) {
        winMultiplier += i === 1 ? 5 : 3;
        winCells.push([i, 0], [i, 1], [i, 2]);
      }
    }

    // Проверка на супер-пупер выигрыш (все 9 ячеек одинаковы)
    const allCellsMatch = newGrid.flat().every(cell => cell === newGrid[0][0]);
    if (allCellsMatch) {
      setBalance((prev) => prev + betAmount * 50);
      setMessage("🎉 Супер-выигрыш! x50 🎉");
      setWinningCells([]);
      return;
    }

    // Проверка на большой выигрыш (разные ряды, но одинаковые символы в каждом)
    const rowSymbolsMatch = newGrid.every(row => row[0] === row[1] && row[1] === row[2]);
    const uniqueSymbols = new Set(newGrid.map(row => row[0]));
    if (rowSymbolsMatch && uniqueSymbols.size === 3) {
      setBalance((prev) => prev + betAmount * 20);
      setMessage("🔥 Все ряды имеют свой символ! x20 🔥");
      setWinningCells([]);
      return;
    }

    // Выигрыш на основании коэффициента символов
    if (winMultiplier > 0) {
      const winningSymbol = newGrid[0][0];
      const symbolValue = symbolValues[winningSymbol] || 1;
      setBalance((prev) => prev + betAmount * symbolValue);
      setMessage(`Вы выиграли! ${betAmount * symbolValue} монет`);
      setWinningCells(winCells);
    } else {
      setMessage("Попробуйте снова!");
      setWinningCells([]);
    }
  };

  return (
    <div className="slots-page">
      <div className="slots-container">
        <h2>Баланс: {balance} монет</h2>
        <div className="slot-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="slot-row">
              {row.map((symbol, colIndex) => (
                <div
                  key={colIndex}
                  className={`slot-cell ${winningCells.some(cell => cell[0] === rowIndex && cell[1] === colIndex) ? "win" : ""}`}
                >
                  {symbol}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={spinReels}>Крутить</button>
        <p>{message}</p>
      </div>
    </div>
  );
}
