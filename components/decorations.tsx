export default function Decorations() {
  return (
    <>
      {/* Clouds */}
      <div className="absolute top-12 left-8 text-6xl opacity-80 animate-bounce" style={{ animationDuration: "3s" }}>
        ☁️
      </div>
      <div
        className="absolute top-32 right-12 text-5xl opacity-70 animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "0.5s" }}
      >
        ☁️
      </div>
      <div
        className="absolute top-48 left-1/4 text-4xl opacity-60 animate-bounce"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      >
        ☁️
      </div>

      {/* Birds */}
      <div className="absolute top-20 left-1/3 text-2xl opacity-70 animate-pulse">🐦</div>
      <div className="absolute top-40 right-1/4 text-xl opacity-60 animate-pulse" style={{ animationDelay: "0.7s" }}>
        🐦
      </div>

      {/* Gold coins */}
      <div className="absolute bottom-32 right-8 text-4xl animate-bounce" style={{ animationDuration: "2.5s" }}>
        🪙
      </div>
      <div
        className="absolute bottom-40 left-8 text-3xl animate-bounce"
        style={{ animationDuration: "3s", animationDelay: "0.5s" }}
      >
        🪙
      </div>

      {/* Gifts */}
      <div
        className="absolute bottom-24 right-32 text-5xl animate-bounce"
        style={{ animationDuration: "2.5s", animationDelay: "0.2s" }}
      >
        🎁
      </div>
      <div
        className="absolute bottom-20 left-24 text-4xl animate-bounce"
        style={{ animationDuration: "3s", animationDelay: "0.8s" }}
      >
        🎁
      </div>
    </>
  )
}
