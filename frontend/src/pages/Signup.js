"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline"

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Signup failed")
      navigate("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <UserPlusIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password should be at least 8 characters long</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-in slide-in-from-top-2 duration-300">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.username || !formData.password}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Create Account</span>
                    <div className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </div>
                  </>
                )}
              </div>
            </button>

            {/* Terms and Privacy */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-red-600 hover:text-red-500 transition-colors duration-200">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-red-600 hover:text-red-500 transition-colors duration-200">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
              Sign in here
            </a>
          </p>
        </div>

        {/* Success Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">✓</span>
            </div>
            <span className="text-xs text-gray-600">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">⚡</span>
            </div>
            <span className="text-xs text-gray-600">Fast Setup</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">🎯</span>
            </div>
            <span className="text-xs text-gray-600">Easy to Use</span>
          </div>
        </div>
      </div>
    </div>
  )
}
