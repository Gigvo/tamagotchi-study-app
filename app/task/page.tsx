"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG = {
  easy: { xp: 50, minTime: 10, color: "green" },
  medium: { xp: 100, minTime: 20, color: "yellow" },
  hard: { xp: 200, minTime: 30, color: "red" },
};

export default function Task() {
  const { tasks, addTask, toggleTask, deleteTask, xp } = useApp();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // Update current time every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const config = DIFFICULTY_CONFIG[difficulty];
      addTask({
        title: newTaskTitle,
        completed: false,
        xpReward: config.xp,
        difficulty: difficulty,
        minimumTime: config.minTime,
      });
      setNewTaskTitle("");
      setDifficulty("medium");
      setShowAddForm(false);
    }
  };

  const getTimeRemaining = (task: {
    createdAt: number;
    minimumTime: number;
  }) => {
    const elapsed = (currentTime - task.createdAt) / 1000 / 60; // minutes
    const remaining = task.minimumTime - elapsed;
    return Math.max(0, remaining);
  };

  const canComplete = (task: { createdAt: number; minimumTime: number }) => {
    return getTimeRemaining(task) === 0;
  };

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "hard":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold text-4xl md:text-5xl text-black mb-2">
              Your Tasks
            </h1>
            <p className="text-gray-600">
              Complete tasks to earn XP and keep your pet happy!
            </p>
          </div>
          <Link href="/">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow transition-colors">
              ← Back Home
            </button>
          </Link>
        </div>

        {/* XP Display */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90">Total Experience</p>
              <p className="text-4xl font-bold">{xp.toLocaleString()} XP</p>
            </div>
            <span className="text-6xl">⭐</span>
          </div>
        </div>

        {/* Add Task Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all mb-6"
          >
            <span className="text-lg">+ Add New Task</span>
          </button>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddTask}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="font-bold text-xl mb-4 text-gray-800">
              Create New Task
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g., Study math for 30 minutes"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-3">
                Task Difficulty
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDifficulty("easy")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    difficulty === "easy"
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                >
                  <div className="text-2xl mb-1">🟢</div>
                  <div className="font-bold text-green-700">Easy</div>
                  <div className="text-sm text-gray-600">10 min</div>
                  <div className="text-xs text-purple-600 font-semibold">
                    +50 XP
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("medium")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    difficulty === "medium"
                      ? "border-yellow-500 bg-yellow-50 shadow-md"
                      : "border-gray-300 hover:border-yellow-300"
                  }`}
                >
                  <div className="text-2xl mb-1">🟡</div>
                  <div className="font-bold text-yellow-700">Medium</div>
                  <div className="text-sm text-gray-600">20 min</div>
                  <div className="text-xs text-purple-600 font-semibold">
                    +100 XP
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("hard")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    difficulty === "hard"
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "border-gray-300 hover:border-red-300"
                  }`}
                >
                  <div className="text-2xl mb-1">🔴</div>
                  <div className="font-bold text-red-700">Hard</div>
                  <div className="text-sm text-gray-600">30 min</div>
                  <div className="text-xs text-purple-600 font-semibold">
                    +200 XP
                  </div>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Minimum study time required before you can mark as complete
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTaskTitle("");
                  setDifficulty("medium");
                }}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Active Tasks */}
        <div className="mb-8">
          <h2 className="font-bold text-2xl mb-4 text-gray-800 flex items-center gap-2">
            <span>📝</span> Active Tasks ({incompleteTasks.length})
          </h2>
          {incompleteTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                No active tasks. Add one to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {incompleteTasks.map((task) => {
                // Handle old tasks without timer fields
                const hasTimer =
                  task.createdAt && task.minimumTime !== undefined;
                const timeRemaining = hasTimer ? getTimeRemaining(task) : 0;
                const isReady = hasTimer ? canComplete(task) : true;
                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <button
                          onClick={() => isReady && toggleTask(task.id)}
                          disabled={!isReady}
                          className={`w-6 h-6 border-2 rounded-full transition-colors flex-shrink-0 ${
                            isReady
                              ? "border-green-500 hover:bg-green-50 cursor-pointer"
                              : "border-gray-300 cursor-not-allowed opacity-50"
                          }`}
                          title={
                            isReady
                              ? "Mark as complete"
                              : `Wait ${formatTime(timeRemaining)} more`
                          }
                        ></button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-gray-800 font-semibold text-lg">
                              {task.title}
                            </p>
                            {task.difficulty && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${getDifficultyBadge(
                                  task.difficulty
                                )}`}
                              >
                                {task.difficulty.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-purple-600 font-semibold">
                              +{task.xpReward} XP
                            </span>
                            {!isReady ? (
                              <span className="text-orange-600 font-semibold flex items-center gap-1">
                                ⏱️ {formatTime(timeRemaining)} remaining
                              </span>
                            ) : (
                              <span className="text-green-600 font-semibold">
                                ✓ Ready to complete!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete task"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="font-bold text-2xl mb-4 text-gray-800 flex items-center gap-2">
              <span>✅</span> Completed ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-green-50 rounded-2xl shadow p-5 flex items-center justify-between opacity-75"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-green-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-600 font-semibold text-lg line-through">
                          {task.title}
                        </p>
                        {task.difficulty && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getDifficultyBadge(
                              task.difficulty
                            )}`}
                          >
                            {task.difficulty.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-green-600 font-semibold">
                        +{task.xpReward} XP earned
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
