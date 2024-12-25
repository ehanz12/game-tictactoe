import React, { useState } from "react";

// Komponen Square
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Komponen Board
function Board({ squares, onClick }) {
  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => onClick(0)} />
        <Square value={squares[1]} onClick={() => onClick(1)} />
        <Square value={squares[2]} onClick={() => onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => onClick(3)} />
        <Square value={squares[4]} onClick={() => onClick(4)} />
        <Square value={squares[5]} onClick={() => onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => onClick(6)} />
        <Square value={squares[7]} onClick={() => onClick(7)} />
        <Square value={squares[8]} onClick={() => onClick(8)} />
      </div>
    </div>
  );
}

// Fungsi utilitas untuk menentukan pemenang
function calculateWinner(squares) {  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Komponen utama App
export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  function handleClick(i) {
    const gameHistory = history.slice(0, stepNumber + 1);
    const currentSquares = gameHistory[gameHistory.length - 1].squares.slice();

    if (winner || currentSquares[i]) return;

    currentSquares[i] = isXNext ? "X" : "O";

    setHistory([...gameHistory, { squares: currentSquares }]);
    setStepNumber(gameHistory.length);
    setIsXNext(!isXNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  }

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
