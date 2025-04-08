import { render, screen, fireEvent } from "@testing-library/react";
import Blackjack from "./BlackJack.js"; // Импортируй компонент

describe("Blackjack Game", () => {
  test("renders initial balance", () => {
    render(<Blackjack />);
    expect(screen.getByText(/баланс:/i)).toHaveTextContent("Баланс: 1000");
  });

  test("renders bet options", () => {
    render(<Blackjack />);
    const betButtons = screen.getAllByText(/Ставка \d+/i);
    expect(betButtons).toHaveLength(4); // Проверим, что есть 4 кнопки для ставок
  });

  test("updates balance after placing a bet", () => {
    render(<Blackjack />);
    fireEvent.click(screen.getByText(/Ставка 50/i));
    expect(screen.getByText(/Текущая ставка: 50/i)).toBeInTheDocument();
  });

  test("shows message when player wins", () => {
    render(<Blackjack />);
    fireEvent.click(screen.getByText(/Ставка 50/i));
    fireEvent.click(screen.getByText(/Раздать карты/i)); // Имитируем раздачу карт
    fireEvent.click(screen.getByText(/Остановиться/i)); // Имитируем остановку игры
    expect(screen.getByText(/Вы выиграли!/i)).toBeInTheDocument(); // Проверим сообщение о победе
  });

  test("ends game when balance is 0", () => {
    render(<Blackjack />);
    fireEvent.click(screen.getByText(/Ставка 500/i)); // Например, ставка 500
    fireEvent.click(screen.getByText(/Раздать карты/i)); // Имитируем раздачу карт
    fireEvent.click(screen.getByText(/Остановиться/i)); // Имитируем остановку игры
    expect(screen.getByText(/Игра окончена! Обновите страницу/i)).toBeInTheDocument();
  });
});
