"use client"

import { useState } from "react"
import { ArrowPathIcon, PlayCircleIcon, LinkIcon } from "@heroicons/react/24/solid"

export default function SentimentForm({ onSubmit }) {
  const [videoId, setVideoId] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!videoId) return

    setLoading(true)
    await onSubmit(videoId)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full px-4 py-2 mb-4">
          <SparklesIcon className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-700">AI-Powered Analysis</span>
        </div> */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyze YouTube Comments</h2>
        <p className="text-gray-600">Enter a YouTube video ID to analyze the sentiment of its comments</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          {/* Input Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 group-hover:border-red-300 focus-within:border-red-500 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
              <div className="flex items-center">
                <div className="pl-4 pr-3 py-4">
                  <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  id="video-id"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  className="flex-1 py-4 pr-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                  placeholder="https://www.youtube.com/watch?v=... or video ID"
                />
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
            <span>💡</span>
            Paste any YouTube video ID
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !videoId.trim()}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Button Content */}
          <div className="relative flex items-center justify-center gap-3">
            {loading ? (
              <>
                <ArrowPathIcon className="h-6 w-6 animate-spin" />
                <span className="text-lg">Analyzing Comments...</span>
                <div className="flex gap-1 ml-2">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <PlayCircleIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Analyze Sentiment</span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</div>
              </>
            )}
          </div>
        </button>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Real-time Analysis
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Emotion Detection
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Multi-language
          </div>
        </div>
      </form>
    </div>
  )
}
