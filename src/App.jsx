import React, { useState } from 'react'

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index) {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

  }


  return (
   <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">Tic Tac Toe</h1>
      {/* Turn Indicator */}
      <div className="text-xl font-semibold mb-4">
        Next Player: <span className={isXNext ? 'text-blue-400' : 'text-pink-400'}>{isXNext ? 'X' : 'O'}</span>
      </div>
      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-xl shadow-2xl">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-slate-700 hover:bg-slate-600 rounded-lg text-3xl font-extrabold flex items-center justify-center transition-all"
          >
            <span className={value === 'X' ? 'text-blue-400' : 'text-pink-400'}>
              {value}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App