



// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { useEffect, useState } from "react"

// export default function EndMessage({ onClose }) {
//   const [step, setStep] = useState(1) // 1=text, 2=gif, 3=heart
//   const [fadeOut, setFadeOut] = useState(false)

//   useEffect(() => {
//     const t1 = setTimeout(() => setStep(2), 5000)   // text → gif
//     const t2 = setTimeout(() => setStep(3), 9000)   // gif → heart
//     const t3 = setTimeout(() => setFadeOut(true), 9000) // start fade
//     const t4 = setTimeout(() => onClose(), 10000)   // close

//     return () => {
//       clearTimeout(t1)
//       clearTimeout(t2)
//       clearTimeout(t3)
//       clearTimeout(t4)
//     }
//   }, [onClose])

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl
//                  flex items-center justify-center text-center px-6"
//       animate={{ opacity: fadeOut ? 0 : 1 }}
//       transition={{ duration: 1.2, ease: "easeInOut" }}
//     >
//       <AnimatePresence mode="wait">

//         {/* 📝 MESSAGE — 0–5 sec */}
//         {step === 1 && (
//           <motion.p
//             key="text"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className="text-3xl md:text-4xl text-pink-300
//                        font-semibold leading-relaxed"
//           >
//             Bas itna hi…
//             <br />
//             par kaafi hai ❤️
//           </motion.p>
//         )}

//         {/* 🐰 GIF — 5–9 sec */}
//         {step === 2 && (
//           <motion.img
//             key="gif"
//             src="/gif/jump.png"
//             alt="jump"
//             className="w-32 md:w-40"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//           />
//         )}

//         {/* ❤️ HEART — 9–10 sec */}
//         {step === 3 && (
//           <motion.div
//             key="heart"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: [1, 1.2, 1], opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-6xl"
//           >
//             ❤️
//           </motion.div>
//         )}

//       </AnimatePresence>
//     </motion.div>
//   )
// }


// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { useEffect, useState } from "react"

// export default function EndMessage({ onClose }) {
//   const [step, setStep] = useState(1) // 1=message, 2=gif, 3=heart
//   const [fadeOut, setFadeOut] = useState(false)

//   useEffect(() => {
//     const t1 = setTimeout(() => setStep(2), 6000)   // message → gif
//     const t2 = setTimeout(() => setStep(3), 12000) // gif → heart
//     const t3 = setTimeout(() => setFadeOut(true), 13500) // start fade
//     const t4 = setTimeout(() => onClose(), 15000)  // close

//     return () => {
//       clearTimeout(t1)
//       clearTimeout(t2)
//       clearTimeout(t3)
//       clearTimeout(t4)
//     }
//   }, [onClose])

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl
//                  flex items-center justify-center text-center px-6"
//       animate={{ opacity: fadeOut ? 0 : 1 }}
//       transition={{ duration: 1.5, ease: "easeInOut" }}
//     >
//       <AnimatePresence mode="wait">

//         {/* 📝 MESSAGE — 0–6 sec (slow zoom IN) */}
//         {step === 1 && (
//           <motion.div
//             key="text"
//             initial={{ scale: 0.6, opacity: 0 }}
//             animate={{ scale: 1.3, opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: 6,
//               ease: "easeInOut",
//             }}
//             className="text-3xl md:text-4xl text-pink-300
//                        font-semibold leading-relaxed"
//           >
//             Bas itna hi…
//             <br />
//             par kaafi hai ❤️
//           </motion.div>
//         )}

//         {/* 🐰 GIF — 6–12 sec (enlarge + slow fade) */}
//         {step === 2 && (
//           <motion.img
//             key="gif"
//             src="/gif/jump.png"
//             alt="jump"
//             className="w-32 md:w-40"
//             initial={{ scale: 1, opacity: 1 }}
//             animate={{
//               scale: 1.9,
//               opacity: [1, 1, 0],
//             }}
//             transition={{
//               duration: 6,
//               ease: "easeInOut",
//               opacity: { times: [0, 0.85, 1] },
//             }}
//           />
//         )}

//         {/* ❤️ HEART — 12–13.5 sec */}
//         {step === 3 && (
//           <motion.div
//             key="heart"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: [1, 1.4, 1], opacity: 1 }}
//             transition={{
//               duration: 1.2,
//               ease: "easeInOut",
//             }}
//             className="text-6xl"
//           >
//             ❤️
//           </motion.div>
//         )}

//       </AnimatePresence>
//     </motion.div>
//   )
// }



"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function EndMessage({ onClose }) {
  const [step, setStep] = useState("text")
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setStep("gif"), 6000)
    const t2 = setTimeout(() => setStep("heart"), 12000)
    const t3 = setTimeout(() => setFadeOut(true), 14000)
    const t4 = setTimeout(() => onClose(), 15000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl
                 flex items-center justify-center text-center px-6"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >

      {/* 📝 MESSAGE */}
      {step === "text" && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.25, opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
          className="text-3xl md:text-4xl text-pink-300 font-semibold"
        >
          Bas itna hi…
          <br />
          par kaafi hai ❤️
        </motion.div>
      )}

      {/* 🐰 GIF */}
      {step === "gif" && (
        <motion.img
          src="/gif/jump.png"
          alt="jump"
          className="w-40 md:w-56"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
      )}

      {/* ❤️ HEART */}
      {step === "heart" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-6xl"
        >
          ❤️
        </motion.div>
      )}

    </motion.div>
  )
}
