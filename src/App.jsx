import React, { useState } from 'react'

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], 
  [6, 7, 8], [0, 3, 6], 
  [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function calculateWinner(board){
  for (let combo of WINNING_COMBOS){
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return {winner: board[a], winningLine: combo };
    }
  }
  return { winner: null, winningLine: []};
}

const App = () => {  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const { winner, winningLine } = calculateWinner(board);

  const isDraw = !winner && board.every((square) => square !== null);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const result = calculateWinner(newBoard);
    if (result.winner) {
      setScores((prev) => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  }
  
  function handleReset() {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }


  return (
  <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">Tic Tac Toe</h1>
      {/* Scoreboard */}
      <div className="flex gap-8 mb-6 text-lg font-semibold bg-slate-800 px-6 py-2 rounded-lg">
        <div className="text-blue-400">Player X: {scores.X}</div>
        <div className="text-pink-400">Player O: {scores.O}</div>
      </div>
      {/* Game Status */}
      <div className="text-xl font-semibold mb-4">
        {winner ? (
          <span className="text-green-400">Winner: {winner} 🎉</span>
        ) : isDraw ? (
          <span className="text-yellow-400">It's a Draw! 🤝</span>
        ) : (
          <span>Next Player: <strong className={isXNext ? 'text-blue-400' : 'text-pink-400'}>{isXNext ? 'X' : 'O'}</strong></span>
        )}
      </div>
      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-xl shadow-2xl">
        {board.map((value, index) => {
          const isWinningSquare = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-20 h-20 rounded-lg text-3xl font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                isWinningSquare
                  ? 'bg-green-600 scale-105'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <span className={value === 'X' ? 'text-blue-400' : 'text-pink-400'}>
                {value}
              </span>
            </button>
          );
        })}
      </div>
      {/* Restart Button */}
      <button
        onClick={handleReset}
        className="mt-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 font-semibold rounded-lg shadow-md transition-all cursor-pointer text-slate-900"
      >
        Play Again
      </button>
    </div>
  );
}

export default App