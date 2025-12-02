"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "./context/AppContext";

export default function Home() {
  const { username, tasks, xp, streak } = useApp();
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Hello, {username}!
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to learn and grow together?
          </p>
        </div>

        {/* Pet Display Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-4 border-purple-200">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <Image
                src={"/pet-1.png"}
                alt="Your study companion"
                width={200}
                height={200}
                className="relative z-10 drop-shadow-2xl"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
              Status: Happy
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Active Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Active Tasks</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {incompleteTasks.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {incompleteTasks.length === 1 ? "task pending" : "tasks pending"}
            </p>
          </div>

          {/* XP Count */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Total XP</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {xp.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">experience points</p>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Streak</h3>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">{streak}</p>
            <p className="text-sm text-gray-500 mt-1">
              {streak === 1 ? "day in a row" : "days in a row"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/task" className="flex-1">
            <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <span className="text-lg">📚 View Tasks</span>
            </button>
          </Link>

          <Link href="/profile" className="flex-1">
            <button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <span className="text-lg">👤 My Profile</span>
            </button>
          </Link>
        </div>

        {/* Daily Tip */}
        <div className="mt-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-lg">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              💡 Daily Study Tip
            </h3>
            <p className="text-gray-600">
              Take regular breaks! Your pet is happiest when you study smart,
              not just hard. Try the Pomodoro technique: 25 minutes of focus, 5
              minutes of rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
