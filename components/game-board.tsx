"use client"

import { useState, useEffect } from "react"
import Card from "./card"

interface GameBoardProps {
  onMatch: () => void
  onMove: () => void
  onGameWon: () => void
  totalMoves: number
}

// Each pair has the same content, allowing proper memory game matching
const cardPairs = [
  { id: 1, content: "🐢" },
  { id: 2, content: "🦋" },
  { id: 3, content: "🌻" },
  { id: 4, content: "⚡" },
  { id: 5, content: "❤️" },
  { id: 6, content: "🎵" },
  { id: 7, content: "🐢" },
  { id: 8, content: "🦋" },
  { id: 9, content: "🌻" },
  { id: 10, content: "⚡" },
  { id: 11, content: "❤️" },
  { id: 12, content: "🎵" },
]

export default function GameBoard({ onMatch, onMove, onGameWon, totalMoves }: GameBoardProps) {
  const [cards] = useState(cardPairs)
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    if (matched.length === cards.length) {
      setTimeout(() => onGameWon(), 500)
    }
  }, [matched, cards.length, onGameWon])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      onMove()
      setMoves((prev) => prev + 1)

      if (firstCard.content === secondCard.content) {
        // Match found - keep cards flipped/visible
        setMatched([...matched, first, second])
        setFlipped([])
        onMatch()
      } else {
        // No match - flip cards back after delay
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }, [flipped, cards, matched])

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length >= 2) {
      return
    }
    setFlipped([...flipped, index])
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-4 border-white">
      <div className="grid grid-cols-3 gap-6">
        {cards.map((card, index) => (
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
