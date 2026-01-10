"use client"

import { useState, useEffect, useRef } from "react"
import Confetti from "react-confetti"
import GameBoard from "@/components/game-board"
import Header from "@/components/header"
import Decorations from "@/components/decorations"
import Image from "next/image"

export default function Home() {
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLimit, setTimeLimit] = useState(30)
  const [showSettings, setShowSettings] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerStarted, setTimerStarted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Audio refs
  const bgMusicRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  const loseSoundRef = useRef<HTMLAudioElement | null>(null)

  // Set window size for confetti
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  // Initialize audio on client side
  useEffect(() => {
    bgMusicRef.current = new Audio('/assets/sounds/background.mp3')
    winSoundRef.current = new Audio('/assets/sounds/win.mp3')
    loseSoundRef.current = new Audio('/assets/sounds/lose.mp3')

    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true
      bgMusicRef.current.volume = 0.3
      bgMusicRef.current.play().catch(e => console.log('Background music autoplay blocked:', e))
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause()
      }
    }
  }, [])

  // Load timeLimit from localStorage on mount
  useEffect(() => {
    const savedTimeLimit = localStorage.getItem('gameTimeLimit')
    if (savedTimeLimit) {
      const limit = Number(savedTimeLimit)
      setTimeLimit(limit)
      setTimeLeft(limit)
    }
  }, [])

  const handleTimerUpdate = (time: number, started: boolean) => {
    setTimeLeft(time)
    setTimerStarted(started)
  }

  const handleMatch = () => {
    // Logic for match - no score needed
  }

  const handleGameWon = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause()
    }
    if (winSoundRef.current) {
      winSoundRef.current.play().catch(e => console.log('Win sound play failed:', e))
    }
    setGameWon(true)
  }

  const handleGameOver = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause()
    }
    if (loseSoundRef.current) {
      loseSoundRef.current.play().catch(e => console.log('Lose sound play failed:', e))
    }
    setGameOver(true)
  }

  const handleTimeUp = () => {
    handleGameOver()
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/background/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Decorations />

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed top-6 right-6 z-50 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="container mx-auto max-w-7xl">

          {/* Left and Right Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
            {/* Left - Tagline and Mascot */}
            <div className="flex flex-col items-center justify-center gap-6">

              {/* Header at top */}
              <div className="flex justify-center w-full mb-8">
                <Header />
              </div>
              <Image
                src="/assets/background/Tagline game.png"
                alt="Game Tagline"
                width={400}
                height={100}
                className="object-contain animate-bounce"
              />

              <Image
                src="/assets/background/Mascot.png"
                alt="Mascot"
                width={400}
                height={400}
                className="object-contain animate-pulse"
              />
            </div>

            {/* Right - Timeline + Game Board */}
            <div className="w-full space-y-6">

              {/* Game Board */}
              <div className="w-full flex justify-center">
                <div className="w-full">
                  <GameBoard
                    onMatch={handleMatch}
                    onGameWon={handleGameWon}
                    onGameOver={handleGameOver}
                    onTimeUp={handleTimeUp}
                    timeLimit={timeLimit}
                    onTimerUpdate={handleTimerUpdate}
                  />
                </div>
              </div>

              {/* Timeline Bar */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-4 border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-700">⏱️ Thời gian</span>
                  <span className="text-2xl font-bold text-red-500">{timeLeft}s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
                  />
                </div>
                {!timerStarted && (
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Lật thẻ đầu tiên để bắt đầu!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Cài đặt</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Thời gian (giây): {timeLimit}s
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>15s</span>
                    <span>60s</span>
                    <span>120s</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem('gameTimeLimit', timeLimit.toString())
                      setShowSettings(false)
                      window.location.reload()
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Lưu & Chơi lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameWon && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 text-center shadow-2xl border-4 border-yellow-400 max-w-md mx-4 transform animate-scaleIn">
                <div className="text-7xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
                  Chúc mừng!
                </h2>
                <p className="text-2xl text-gray-700 mb-2 font-semibold">Xuất sắc!</p>
                <p className="text-lg text-gray-600 mb-8">Bạn đã hoàn thành trò chơi!</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-lg text-lg"
                >
                  Chơi lại
                </button>
              </div>
            </div>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={true}
              numberOfPieces={500}
              gravity={0.3}
              className="z-[60]"
            />
          </>
        )}

        {gameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-10 text-center shadow-2xl border-4 border-red-400 max-w-md mx-4 transform animate-scaleIn">
              <div className="text-7xl mb-4 animate-pulse">⏰</div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
                Hết giờ!
              </h2>
              <p className="text-2xl text-gray-700 mb-2 font-semibold">Chưa hoàn thành!</p>
              <p className="text-lg text-gray-600 mb-8">Thử lại lần nữa nhé!</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-lg text-lg"
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
