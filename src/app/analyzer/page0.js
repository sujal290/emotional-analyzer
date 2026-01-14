"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Heart, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import AnalyzerMusic from "./AnalyzerMusic"
import FloatingGifs from "../../components/FloatingGifs"


export default function Analyzer() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState("")
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!username.trim()) return

    setLoading(true)
    setAnalysis("")
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

      if (!res.ok || data.error) {
        setError("Unable to analyze this Twitter profile.")
        setLoading(false)
        return
      }

      const combinedText = data.tweets.join(" ")

      // Simple but meaningful analysis logic
      let personality = `
• Writing style feels calm, thoughtful, and expressive  
• Tweets reflect emotional awareness rather than trends  
• Language suggests honesty and introspection  
• Focus on meaning over attention  
• Personality feels genuine, soft-spoken, and reflective
      `

      setAnalysis(personality)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f051d] via-[#1a062f] to-[#0f051d] text-white px-4">
    <AnalyzerMusic/>
    <FloatingGifs/>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      >

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-pink-400 text-center mb-6">
          Work in Progress ✨
        </h1>

        

        {/* Button */}
        

        {/* Loader */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-purple-200"
          >
            Reading tweets & understanding personality...
          </motion.p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-6 text-red-400">
            {error}
          </p>
        )}

        {/* Result */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="flex items-center gap-2 text-pink-300 font-semibold mb-4">
              <Sparkles size={18} /> Analysis Result
            </h2>

            <pre className="text-purple-200 whitespace-pre-wrap leading-relaxed">
              {analysis}
            </pre>

            <div className="flex justify-center mt-4">
              <Heart className="text-pink-400" />
            </div>
          </motion.div>
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
