"use client";

import Image from "next/image";

interface CardProps {
  isFlipped: boolean;
  isMatched: boolean;
  content: string;
  onClick: () => void;
}

export default function Card({
  isFlipped,
  isMatched,
  content,
  onClick,
}: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className="perspective h-48 cursor-pointer disabled:cursor-default"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
          isFlipped || isMatched ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform:
            isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full rounded-20  cursor-pointer transition-all overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/assets/Cell-images/up1.png"
            alt="Card Back"
            className="object-cover"
            objectFit="contain"
            width={180}
            height={180}
          />
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full rounded-20 transition-all overflow-hidden ${
            isMatched ? "opacity-75" : ""
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src={content}
            alt="Card image"
            className="object-cover"
            objectFit="contain"
            width={180}
            height={180}
          />
        </div>
      </div>
    </button>
  );
}
