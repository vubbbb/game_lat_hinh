"use client"

import { useState, useEffect, useRef } from "react"
import Card from "./card"
import Image from "next/image"

interface GameBoardProps {
  onMatch: () => void
  onGameWon: () => void
  onGameOver: () => void
  timeLimit: number
  onTimeUp: () => void
  onTimerUpdate?: (timeLeft: number, timerStarted: boolean) => void
}

// Images from Cell-images folder
const cardImages = [
  "/assets/Cell-images/B12.png",
  "/assets/Cell-images/Ball1.png",
  "/assets/Cell-images/BallGut.png",
  "/assets/Cell-images/ballicon-1.png",
  "/assets/Cell-images/ballicon-2.png",
  "/assets/Cell-images/ballicon.png",
]

// Function to shuffle and create pairs
const createShuffledPairs = () => {
  const pairs = [...cardImages, ...cardImages].map((img, index) => ({
    id: index,
    content: img,
  }))
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs
}

export default function GameBoard({ onMatch, onGameWon, onGameOver, timeLimit, onTimeUp, onTimerUpdate }: GameBoardProps) {
  const [cards, setCards] = useState<Array<{ id: number; content: string }>>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [timerStarted, setTimerStarted] = useState(false)
  const [gameActive, setGameActive] = useState(true)
  
  // Audio refs
  const flipSoundRef = useRef<HTMLAudioElement | null>(null)
  const matchSoundRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio on client side
  useEffect(() => {
    flipSoundRef.current = new Audio('/assets/sounds/flip.mp3')
    matchSoundRef.current = new Audio('/assets/sounds/match.mp3')
  }, [])

  // Sync timeLeft with timeLimit when it changes
  useEffect(() => {
    setTimeLeft(timeLimit)
  }, [timeLimit])

  // Update parent component with timer state
  useEffect(() => {
    if (onTimerUpdate) {
      onTimerUpdate(timeLeft, timerStarted)
    }
  }, [timeLeft, timerStarted, onTimerUpdate])

  // Initialize shuffled cards on client side only
  useEffect(() => {
    setCards(createShuffledPairs())
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timerStarted && timeLeft > 0 && gameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setGameActive(false)
            setTimeout(() => onTimeUp(), 100)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timerStarted, timeLeft, gameActive, onTimeUp])

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length && cards.length > 0) {
      setGameActive(false)
      setTimeout(() => onGameWon(), 500)
    }
  }, [matched, cards.length, onGameWon])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.content === secondCard.content) {
        // Match found - play match sound
        if (matchSoundRef.current) {
          matchSoundRef.current.currentTime = 1
          matchSoundRef.current.play().catch(e => console.log('Audio play failed:', e))
        }
        setMatched([...matched, first, second])
        setFlipped([])
        onMatch()
      } else {
        // No match - flip cards back after delay
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }, [flipped, cards, matched, onMatch])

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length >= 2 || !gameActive) {
      return
    }
    
    // Play flip sound
    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0
      flipSoundRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
    
    // Start timer on first card flip
    if (!timerStarted) {
      setTimerStarted(true)
    }
    setFlipped([...flipped, index])
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-4 border-white">
      <div className="grid grid-cols-3 gap-6">
        {cards.length > 0 && cards.map((card, index) => (
          <Card
            key={index}
            isFlipped={flipped.includes(index)}
            isMatched={matched.includes(index)}
            content={card.content}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
