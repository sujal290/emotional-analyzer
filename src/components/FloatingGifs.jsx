// "use client"

// import { motion } from "framer-motion"

// const GIFS = [
//   "/gif/cute.gif",
//   "/gif/please.gif",
//   "/gif/tears.gif",
// ]

// export default function FloatingGifs() {
//   return (
//     <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//       {GIFS.map((gif, index) => (
//         <motion.img
//           key={index}
//           src={gif}
//           alt="floating gif"
//           className="absolute w-24 h-24 opacity-30"
//           initial={{
//             x: Math.random() * 100 + "vw",
//             y: "110vh",
//           }}
//           animate={{
//             y: "-20vh",
//             x: Math.random() * 100 + "vw",
//           }}
//           transition={{
//             duration: 20 + Math.random() * 10,
//             repeat: Infinity,
//             ease: "linear",
//             delay: index * 2,
//           }}
//         />
//       ))}
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"

/* GIF SOURCES */
const GIFS = [
  "/gif/cute.gif",
  "/gif/please.gif",
  "/gif/tears.gif",
  "/gif/cut.gif",
  "/gif/dance.gif",
  "/gif/kissss.gif",
  "/gif/touch.gif",
  "/gif/eye.gif",
 
]

/* HOW MANY FLOATING GIFS */
const TOTAL_GIFS = 100  // 🔥 change to 200 if you want more

export default function FloatingGifs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: TOTAL_GIFS }).map((_, index) => {
        const gif = GIFS[index % GIFS.length]

        const size = 16 + Math.random() * 40       // px
        const startX = Math.random() * 100
        const endX = Math.random() * 100
        const duration = 18 + Math.random() * 20
        const delay = Math.random() * 20
        const opacity = 0.15 + Math.random() * 0.35

        return (
          <motion.img
            key={index}
            src={gif}
            alt="floating gif"
            className="absolute"
            style={{
              width: size,
              height: size,
              opacity,
            }}
            initial={{
              x: `${startX}vw`,
              y: "110vh",
            }}
            animate={{
              x: `${endX}vw`,
              y: "-20vh",
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}

