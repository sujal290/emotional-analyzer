"use client"
import { useEffect, useRef } from "react"

export default function AnalyzerMusic() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current

    const startMusic = () => {
      audio.volume = 0.35
      audio.play().catch(() => {})
      document.removeEventListener("click", startMusic)
    }

    document.addEventListener("click", startMusic)
    return () => document.removeEventListener("click", startMusic)
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src="/audio/bg.mp3" type="audio/mpeg" />
    </audio>
  )
}
