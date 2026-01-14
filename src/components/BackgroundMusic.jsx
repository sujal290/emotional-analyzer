// // "use client"
// // import { useEffect, useRef } from "react"

// // export default function BackgroundMusic() {
// //   const audioRef = useRef(null)

// //   useEffect(() => {
// //     const audio = audioRef.current

// //     const startMusic = () => {
// //       audio.volume = 0.35
// //       audio.play().catch(() => {})
// //       document.removeEventListener("click", startMusic)
// //     }

// //     document.addEventListener("click", startMusic)
// //     return () => document.removeEventListener("click", startMusic)
// //   }, [])

// //   return (
// //     <audio ref={audioRef} loop>
// //       <source src="/audio/bg.mp3" type="audio/mpeg" />
// //     </audio>
// //   )
// // }



// "use client"
// import { useEffect, useRef } from "react"

// export default function BackgroundMusic({ fadeOut }) {
//   const audioRef = useRef(null)

//   useEffect(() => {
//     const audio = audioRef.current
//     audio.volume = 0.35

//     const startMusic = () => {
//       audio.play().catch(() => {})
//       document.removeEventListener("click", startMusic)
//     }

//     document.addEventListener("click", startMusic)

//     return () => document.removeEventListener("click", startMusic)
//   }, [])

//   useEffect(() => {
//     if (!fadeOut) return
//     const audio = audioRef.current

//     const fade = setInterval(() => {
//       if (audio.volume > 0.02) {
//         audio.volume -= 0.02
//       } else {
//         audio.pause()
//         clearInterval(fade)
//       }
//     }, 120)

//     return () => clearInterval(fade)
//   }, [fadeOut])

//   return (
//     <audio ref={audioRef} loop>
//       <source src="/audio/bg.mp3" />
//     </audio>
//   )
// }



"use client"
import { useEffect, useRef } from "react"

export default function BackgroundMusic({ fadeOut }) {
  const audioRef = useRef(null)

  /* ▶️ Start background music on first click */
  useEffect(() => {
    const audio = audioRef.current
    audio.volume = 0.35

    const startMusic = () => {
      audio.play().catch(() => {})
      document.removeEventListener("click", startMusic)
    }

    document.addEventListener("click", startMusic)
    return () => document.removeEventListener("click", startMusic)
  }, [])

  /* 🔇 Fade out logic */
  useEffect(() => {
    if (!fadeOut) return
    const audio = audioRef.current

    const fade = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume -= 0.02
      } else {
        audio.pause()
        audio.volume = 0
        clearInterval(fade)
      }
    }, 120)

    return () => clearInterval(fade)
  }, [fadeOut])

  return (
    <audio ref={audioRef} loop>
      <source src="/audio/bg.mp3" type="audio/mpeg" />
    </audio>
  )
}
