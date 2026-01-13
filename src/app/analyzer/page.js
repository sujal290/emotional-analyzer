// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Twitter } from "lucide-react"
// import { useRouter } from "next/navigation"
// import AnalyzerMusic from "./AnalyzerMusic"

// export default function Analyzer() {
//   const router = useRouter()

//   const [username, setUsername] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [tweets, setTweets] = useState([])
//   const [error, setError] = useState("")

//   const handleAnalyze = async () => {
//     if (!username.trim()) return

//     setLoading(true)
//     setTweets([])
//     setError("")

//     try {
//       const res = await fetch("/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: username.replace("@", "")
//         })
//       })

//       const data = await res.json()

//       if (!res.ok || data.error) {
//         setError("Unable to fetch tweets for this profile.")
//         setLoading(false)
//         return
//       }

//       setTweets(data.tweets || [])
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f051d] via-[#1a062f] to-[#0f051d] text-white px-4">
//       <AnalyzerMusic />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
//       >
//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl font-bold text-pink-400 text-center mb-6">
//           Twitter Posts Viewer ✨
//         </h1>

//         {/* Input */}
//         <div className="relative">
//           <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter Twitter username (without @)"
//             className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           className="mt-5 w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 transition py-3 rounded-xl font-semibold"
//         >
//           {loading ? "Fetching Tweets..." : "Fetch Tweets"}
//         </button>

//         {/* Loader */}
//         {loading && (
//           <p className="text-center mt-6 text-purple-200">
//             Fetching latest tweets…
//           </p>
//         )}

//         {/* Error */}
//         {error && (
//           <p className="text-center mt-6 text-red-400">
//             {error}
//           </p>
//         )}

//         {/* Tweets */}
//         {tweets.length > 0 && (
//           <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-2">
//             {tweets.map((tweet, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white/5 border border-white/10 rounded-xl p-4 text-purple-200"
//               >
//                 {tweet}
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Back */}
//         <button
//           onClick={() => router.push("/")}
//           className="block mx-auto mt-8 text-sm text-pink-300 hover:text-pink-400 transition"
//         >
//           ⬅ Go Back
//         </button>
//       </motion.div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import AnalyzerMusic from "./AnalyzerMusic"

export default function Analyzer() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])
  const [error, setError] = useState("")

  const handleFetchTweets = async () => {
    if (!username.trim()) return

    setLoading(true)
    setTweets([])
    setError("")

    try {
      // const res = await fetch("/api/analyze", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     username: username.replace("@", "").trim()
      //   })
      // })

      const res = await fetch("https://krishugsg-production.up.railway.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.replace("@", "").trim()
        })
      })

      const data = await res.json()

      if (!res.ok || !data.tweets) {
        setError("Unable to fetch tweets for this profile.")
        setLoading(false)
        return
      }

      setTweets(data.tweets)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f051d] via-[#1a062f] to-[#0f051d] text-white px-4">
      <AnalyzerMusic />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-pink-400 text-center mb-6">
          Twitter Posts Viewer ✨
        </h1>

        {/* Input */}
        <div className="relative">
          <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter username (without @)"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleFetchTweets}
          disabled={loading}
          className="mt-5 w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 transition py-3 rounded-xl font-semibold"
        >
          {loading ? "Fetching Tweets..." : "Fetch Tweets"}
        </button>

        {/* Loader */}
        {loading && (
          <p className="text-center mt-6 text-purple-200">
            Fetching latest tweets…
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-6 text-red-400">
            {error}
          </p>
        )}

        {/* Tweets List */}
        {tweets.length > 0 && (
          <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {tweets.map((tweet, index) => (
              <motion.div
                key={tweet.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                {/* Tweet Text */}
                <p className="text-purple-200 leading-relaxed">
                  {tweet.text}
                </p>

                {/* Stats */}
                <div className="flex gap-4 text-sm text-pink-300 mt-3">
                  <span>❤️ {tweet.likes}</span>
                  <span>🔁 {tweet.retweets}</span>
                  <span>💬 {tweet.replies}</span>
                </div>

                {/* Link */}
                {tweet.url && (
                  <a
                    href={tweet.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-blue-400 text-sm hover:underline"
                  >
                    View on X
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="block mx-auto mt-8 text-sm text-pink-300 hover:text-pink-400 transition"
        >
          ⬅ Go Back
        </button>
      </motion.div>
    </div>
  )
}
