import Image from "next/image"

export default function Header() {
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-6">
        <div className="mb-4 flex justify-center">
          <Image
            src="/assets/background/logo EG Baby FN.png"
            alt="Game Logo"
            width={400}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
