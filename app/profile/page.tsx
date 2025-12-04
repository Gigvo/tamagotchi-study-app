"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { username, setUsername, tasks, xp, streak } = useApp();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);
  const totalTasks = tasks.length;

  const handleEditUsername = () => {
    setTempUsername(username);
    setIsEditingUsername(true);
  };

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setIsEditingUsername(false);
      setTempUsername("");
    }
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setTempUsername("");
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-4xl md:text-5xl text-black">
            My Profile
          </h1>
          <Link href="/">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow transition-colors">
              ← Back Home
            </button>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          {/* Username Section */}
          <div className="flex items-center max-md:flex-col justify-between mb-8 pb-8 border-b-2 border-gray-100">
            <div className="flex items-center flex-wrap justify-center gap-4">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-wrap">
                {!isEditingUsername ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {username}
                    </h2>
                  </>
                ) : (
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSaveUsername()
                    }
                    className="text-2xl font-bold border-2 border-black "
                    placeholder="Enter your name"
                    autoFocus
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              {!isEditingUsername ? (
                <button
                  onClick={handleEditUsername}
                  className="bg-blue-700 hover:bg-blue-800 hover:scale-105 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Edit Name
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveUsername}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Your Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total XP */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-3xl mb-2">⭐</div>
                <p className="text-2xl font-bold text-purple-700">
                  {xp.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>

              {/* Completed Tasks */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-2xl font-bold text-green-700">
                  {completedTasks.length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>

              {/* Active Tasks */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-2xl font-bold text-blue-700">
                  {activeTasks.length}
                </p>
                <p className="text-sm text-gray-600">Active Tasks</p>
              </div>

              {/* Study Streak */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
                <div className="text-3xl mb-2">🔥</div>
                <p className="text-2xl font-bold text-orange-700">{streak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Task Progress
            </h3>
            <div className="bg-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-semibold">
                  Completion Rate
                </span>
                <span className="text-gray-700 font-semibold">
                  {totalTasks > 0
                    ? Math.round((completedTasks.length / totalTasks) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalTasks > 0
                        ? `${(completedTasks.length / totalTasks) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{completedTasks.length} completed</span>
                <span>{totalTasks} total tasks</span>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* First Task */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  completedTasks.length >= 1
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">🌟</div>
                <p className="font-bold text-gray-800">First Steps</p>
                <p className="text-xs text-gray-600">Complete 1 task</p>
              </div>

              {/* Task Master */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  completedTasks.length >= 10
                    ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">🏆</div>
                <p className="font-bold text-gray-800">Task Master</p>
                <p className="text-xs text-gray-600">Complete 10 tasks</p>
              </div>

              {/* XP Collector */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  xp >= 500
                    ? "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">💎</div>
                <p className="font-bold text-gray-800">XP Collector</p>
                <p className="text-xs text-gray-600">Earn 500 XP</p>
              </div>

              {/* Streak Starter */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  streak >= 3
                    ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">🔥</div>
                <p className="font-bold text-gray-800">Streak Starter</p>
                <p className="text-xs text-gray-600">3 day streak</p>
              </div>

              {/* Dedicated Learner */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  streak >= 7
                    ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">💪</div>
                <p className="font-bold text-gray-800">Dedicated</p>
                <p className="text-xs text-gray-600">7 day streak</p>
              </div>

              {/* Study Champion */}
              <div
                className={`rounded-xl p-4 border-2 text-center ${
                  xp >= 1000
                    ? "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-300"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">👑</div>
                <p className="font-bold text-gray-800">Champion</p>
                <p className="text-xs text-gray-600">Earn 1000 XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
