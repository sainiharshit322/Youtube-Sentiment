import { useEffect, useState } from "react";
export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-center py-10">Loading history...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Sentiment History</h1>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {history.length === 0 ? (
          <div className="text-center text-gray-500">No analysis history yet.</div>
        ) : (
          history.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur rounded-xl shadow-md p-6 border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Video ID: {item.video_id}</h2>
                <div className="mt-2 flex gap-2 text-sm">
                  <span className="text-green-600 font-semibold">👍 {item.summary.positive}</span>
                  <span className="text-yellow-600 font-semibold">😐 {item.summary.neutral}</span>
                  <span className="text-red-600 font-semibold">👎 {item.summary.negative}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
