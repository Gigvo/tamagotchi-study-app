"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "./context/AppContext";
import PetDisplay from "@/components/pet-display";

export default function Home() {
  const { username, tasks, xp, streak } = useApp();
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl md:text-6xl bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
            Hello, {username}!
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to learn and grow together?
          </p>
        </div>

        {/* Pet Display Section */}
        <PetDisplay />

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
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <span className="text-lg">📚 View Tasks</span>
            </button>
          </Link>

          <Link href="/profile" className="flex-1">
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <span className="text-lg">👤 My Profile</span>
            </button>
          </Link>
        </div>

        {/* Daily Tip */}
        <div className="mt-6 rounded-2xl p-1 shadow-lg">
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
