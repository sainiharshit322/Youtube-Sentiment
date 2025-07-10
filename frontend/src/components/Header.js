import { VideoCameraIcon, PlayIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white shadow-lg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo and title section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <VideoCameraIcon className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                <PlayIcon className="h-3 w-3 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight drop-shadow-sm">
                YouTube Sentiment Analyzer
              </h1>
              <p className="text-red-100 text-sm font-medium mt-1 opacity-90">
                Analyze comments • Understand emotions • Get insights
              </p>
            </div>
          </div>

          {/* History & Logout buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/history")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-5 rounded-full border border-white/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ClockIcon className="h-5 w-5 text-white" />
              History
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-5 rounded-full border border-white/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ArrowRightIcon className="h-5 w-5 text-white" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats or additional info */}
        <div className="mt-4 flex gap-6 text-sm text-red-100">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>AI Powered</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Multi-language Support</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}
