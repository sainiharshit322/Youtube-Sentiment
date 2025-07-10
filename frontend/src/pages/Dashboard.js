import Header from "../components/Header";
import SentimentForm from "../components/SentimentForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { useState } from "react";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  const handleAnalyze = async (videoId) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/analyze/${videoId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(errorMsg || "Unauthorized or Invalid");
    }

    const data = await res.json();
    setResult(data);
  } catch (error) {
    console.error("Failed:", error.message);
    alert("Error: " + error.message);
  }
};
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <Header />
        <main className="max-w-2xl mx-auto px-6 py-10">
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Analyze YouTube Comment Sentiment
            </h2> */}
            <SentimentForm onSubmit={handleAnalyze} />
            <ResultsDisplay result={result} />
          </div>
        </main>
      </div>
    );
}
