"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChartBarIcon, ChatBubbleLeftRightIcon, SparklesIcon, TrophyIcon } from "@heroicons/react/24/outline"

export default function ResultsDisplay({ result }) {
  if (!result || !result.summary || !result.results) return null

  const chartData = [
    { name: "Positive", value: result.summary.positive },
    { name: "Neutral", value: result.summary.neutral },
    { name: "Negative", value: result.summary.negative },
  ]

  const COLORS = ["#10B981", "#FBBF24", "#EF4444"]

  const sentimentColor = {
    positive: "bg-green-100 text-green-700 border-green-200",
    neutral: "bg-yellow-100 text-yellow-700 border-yellow-200",
    negative: "bg-red-100 text-red-700 border-red-200",
  }

  const sentimentIcons = {
    positive: "😊",
    neutral: "😐",
    negative: "😞",
  }

  const totalComments = result.summary.positive + result.summary.neutral + result.summary.negative

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      const percentage = ((data.value / totalComments) * 100).toFixed(1)
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} comments ({percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="mt-10 space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full px-4 py-2 mb-4">
          <SparklesIcon className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-700">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sentiment Analysis Results</h2>
        <p className="text-gray-600">Analyzed {totalComments} comments from the video</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {chartData.map((item, index) => {
          const percentage = ((item.value / totalComments) * 100).toFixed(1)
          const isHighest = item.value === Math.max(...chartData.map((d) => d.value))

          return (
            <div
              key={item.name}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                item.name === "Positive"
                  ? "bg-green-50 border-green-200 hover:bg-green-100"
                  : item.name === "Neutral"
                    ? "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                    : "bg-red-50 border-red-200 hover:bg-red-100"
              }`}
            >
              {isHighest && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full p-1">
                    <TrophyIcon className="h-4 w-4" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{sentimentIcons[item.name.toLowerCase()]}</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-600">({percentage}%)</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="flex items-center gap-2 mb-6">
          <ChartBarIcon className="h-6 w-6 text-red-500" />
          <h3 className="text-xl font-bold text-gray-800">Sentiment Distribution</h3>
        </div>

        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={2}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="flex items-center gap-2 mb-6">
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-red-500" />
          <h3 className="text-xl font-bold text-gray-800">Top Comments Analysis</h3>
          <span className="ml-auto text-sm text-gray-500">Showing top 10 results</span>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {result.results.slice(0, 10).map((item, idx) => (
            <div
              key={idx}
              className="group p-5 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-lg">{sentimentIcons[item.label]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm leading-relaxed mb-3 group-hover:text-gray-900 transition-colors duration-200">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${sentimentColor[item.label]} transition-all duration-200 group-hover:scale-105`}
                    >
                      {item.label.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${item.score * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{(item.score * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #ec4899);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #db2777);
        }
      `}</style>
    </div>
  )
}
