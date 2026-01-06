"use client"

interface CardProps {
  isFlipped: boolean
  isMatched: boolean
  content: string
  onClick: () => void
}

export default function Card({ isFlipped, isMatched, content, onClick }: CardProps) {
  return (
    <button onClick={onClick} disabled={isMatched} className="perspective h-32 cursor-pointer disabled:cursor-default">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
          isFlipped || isMatched ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center border-4 border-blue-300 shadow-lg cursor-pointer hover:shadow-xl hover:from-blue-500 hover:to-blue-600 transition-all"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-5xl font-bold text-white">?</div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full rounded-xl flex items-center justify-center border-4 border-white shadow-lg transition-all ${
            isMatched
              ? "bg-gradient-to-br from-yellow-300 to-yellow-200 opacity-75"
              : "bg-gradient-to-br from-sky-300 to-sky-200"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-6xl">{content}</div>
        </div>
      </div>
    </button>
  )
}
