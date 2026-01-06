interface HeaderProps {
  score: number
  moves: number
  totalMoves: number
}

export default function Header({ score, moves, totalMoves }: HeaderProps) {
  const progress = (moves / totalMoves) * 100

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-6">
        <h1
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mb-2"
          style={{ textShadow: "2px 2px 4px rgba(59, 130, 246, 0.3)" }}
        >
          LẬT THẺ NHÂN PHẨM
        </h1>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-semibold">
              Tổng số lượt: {moves}/{totalMoves}
            </span>
            <span className="text-yellow-500 font-bold text-lg">⭐ {progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">ĐIỂM</p>
          <p className="text-4xl font-bold text-blue-500">{score.toString().padStart(5, "0")}</p>
        </div>
      </div>
    </div>
  )
}
