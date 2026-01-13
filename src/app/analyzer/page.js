// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import {
//   Twitter,
//   Heart,
//   Repeat2,
//   MessageCircle,
//   ExternalLink
// } from "lucide-react"
// import { useRouter } from "next/navigation"
// import AnalyzerMusic from "./AnalyzerMusic"

// export default function Analyzer() {
//   const router = useRouter()

//   const [username, setUsername] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [tweets, setTweets] = useState([])
//   const [error, setError] = useState("")

//   const handleFetch = async () => {
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

//       if (!res.ok) {
//         setError(data.detail || "Failed to fetch tweets")
//         setLoading(false)
//         return
//       }

//       setTweets(data.tweets || [])
//     } catch (err) {
//       setError("Server unreachable. Try again later.")
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b0215] via-[#16062a] to-[#0b0215] text-white px-4 py-16">
//       <AnalyzerMusic />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
//       >
//         {/* Header */}
//         <h1 className="text-4xl font-bold text-pink-400 text-center mb-8">
//           Twitter Posts Viewer ✨
//         </h1>

//         {/* Input */}
//         <div className="flex gap-3">
//           <div className="relative flex-1">
//             <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
//             <input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter username (without @)"
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>

//           <button
//             onClick={handleFetch}
//             disabled={loading}
//             className="px-6 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition disabled:opacity-50"
//           >
//             {loading ? "Loading…" : "Fetch"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="text-center mt-6 text-red-400">
//             {error}
//           </p>
//         )}

//         {/* Loader */}
//         {loading && (
//           <p className="text-center mt-6 text-purple-200">
//             Fetching tweets…
//           </p>
//         )}

//         {/* Tweets */}
//         {tweets.length > 0 && (
//           <div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto pr-2">
//             {tweets.map((tweet, index) => (
//               <motion.div
//                 key={tweet.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.04 }}
//                 className="bg-black/40 border border-white/10 rounded-2xl p-5 hover:bg-black/50 transition"
//               >
//                 {/* Tweet text */}
//                 <p className="text-purple-100 leading-relaxed mb-4">
//                   {tweet.text}
//                 </p>

//                 {/* Meta */}
//                 <div className="flex items-center justify-between text-sm text-purple-300">
//                   <div className="flex gap-5">
//                     <span className="flex items-center gap-1">
//                       <Heart size={16} /> {tweet.likes}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Repeat2 size={16} /> {tweet.retweets}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <MessageCircle size={16} /> {tweet.replies}
//                     </span>
//                   </div>

//                   {tweet.url && (
//                     <a
//                       href={tweet.url}
//                       target="_blank"
//                       className="flex items-center gap-1 hover:text-pink-400"
//                     >
//                       Open <ExternalLink size={14} />
//                     </a>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Back */}
//         <button
//           onClick={() => router.push("/")}
//           className="block mx-auto mt-10 text-sm text-pink-300 hover:text-pink-400 transition"
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

/* ---------------- Skeleton Component ---------------- */

function TweetSkeleton() {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-5 animate-pulse">
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-11/12" />
        <div className="h-4 bg-white/10 rounded w-9/12" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="h-4 w-10 bg-white/10 rounded" />
          <div className="h-4 w-10 bg-white/10 rounded" />
          <div className="h-4 w-10 bg-white/10 rounded" />
        </div>
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
    </div>
  )
}

/* ---------------- Main Page ---------------- */

export default function Analyzer() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])
  const [error, setError] = useState("")

  const handleFetch = async () => {
    if (!username.trim()) return

    setLoading(true)
    setTweets([])
    setError("")

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.replace("@", "")
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
          onClick={handleFetch}
          disabled={loading}
          className="mt-5 w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 transition py-3 rounded-xl font-semibold"
        >
          {loading ? "Fetching Tweets..." : "Fetch Tweets"}
        </button>

        {/* Skeleton Loader */}
        {loading && (
          <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {[...Array(5)].map((_, i) => (
              <TweetSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-6 text-red-400">
            {error}
          </p>
        )}

        {/* Tweets */}
        {!loading && tweets.length > 0 && (
          <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {tweets.map((tweet, index) => (
              <motion.div
                key={tweet.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-purple-200"
              >
                <p className="mb-3 whitespace-pre-wrap leading-relaxed">
                  {tweet.text}
                </p>

                <div className="flex justify-between text-xs text-purple-400">
                  <div className="flex gap-4">
                    <span>❤️ {tweet.likes}</span>
                    <span>🔁 {tweet.retweets}</span>
                    <span>💬 {tweet.replies}</span>
                  </div>
                  {tweet.url && (
                    <a
                      href={tweet.url}
                      target="_blank"
                      className="hover:text-pink-400"
                    >
                      View →
                    </a>
                  )}
                </div>
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
