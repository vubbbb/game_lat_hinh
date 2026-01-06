"use client"

import { useState } from "react"
import GameBoard from "@/components/game-board"
import Header from "@/components/header"
import Decorations from "@/components/decorations"

export default function Home() {
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [totalMoves] = useState(30)
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const handleMatch = () => {
    setScore((prev) => prev + 100)
  }

  const handleMove = () => {
    setMoves((prev) => prev + 1)
  }

  const handleGameWon = () => {
    setGameWon(true)
  }

  const handleGameOver = () => {
    setGameOver(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 relative overflow-hidden">
      <Decorations />

      <div className="flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Header/Stats */}
            <div className="flex justify-center lg:justify-end">
              <Header score={score} moves={moves} totalMoves={totalMoves} />
            </div>

            {/* Right side - Game Board */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full">
                <GameBoard onMatch={handleMatch} onMove={handleMove} onGameWon={handleGameWon} onGameOver={handleGameOver} totalMoves={totalMoves} currentMoves={moves} />
              </div>
            </div>
          </div>
        </div>

        {gameWon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <h2 className="text-4xl font-bold text-yellow-500 mb-4">Chúc mừng!</h2>
              <p className="text-xl text-gray-700 mb-6">Bạn đã hoàn thành trò chơi!</p>
              <p className="text-2xl text-blue-500 font-bold mb-6">Điểm: {score}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Chơi lại
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
              <p className="text-xl text-gray-700 mb-6">Bạn đã hết lượt chơi!</p>
              <p className="text-2xl text-gray-600 font-bold mb-6">Điểm: {score}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Chơi lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
