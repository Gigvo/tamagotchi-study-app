// /app/feed/page.tsx (Simplified)
"use client";

import { useState } from "react";
import Link from "next/link";

interface Activity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  details?: string;
  time: string;
  type: "study" | "purchase" | "achievement" | "friend";
}

const mockActivities: Activity[] = [
  { id: "1", user: "Player 1", avatar: "🐱", action: "completed a 2-hour study session", details: "+100 XP", time: "5 min ago", type: "study" },
  { id: "2", user: "Player 2", avatar: "🐶", action: "bought a Wizard Hat", details: "150 XP", time: "15 min ago", type: "purchase" },
  { id: "3", user: "Player 3", avatar: "🐰", action: "reached Level 3", details: "🎉", time: "30 min ago", type: "achievement" },
  { id: "4", user: "Player 4", avatar: "🐻", action: "is now friends with Player 1", time: "1 hour ago", type: "friend" },
  { id: "5", user: "Player 1", avatar: "🐱", action: "equipped Sunglasses", time: "2 hours ago", type: "purchase" },
  { id: "6", user: "You", avatar: "😊", action: "started studying Math", details: "25 min", time: "Just now", type: "study" },
  { id: "7", user: "Player 2", avatar: "🐶", action: "completed daily goal", details: "🔥 7-day streak", time: "3 hours ago", type: "achievement" },
];

export default function FeedPage() {
  const [filter, setFilter] = useState<string>("all");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "study": return "bg-blue-100 text-blue-700 border-blue-200";
      case "purchase": return "bg-purple-100 text-purple-700 border-purple-200";
      case "achievement": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "friend": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "study": return "📚";
      case "purchase": return "🛍️";
      case "achievement": return "🏆";
      case "friend": return "👥";
      default: return "✨";
    }
  };

  const filteredActivities = filter === "all" 
    ? mockActivities 
    : mockActivities.filter(activity => activity.type === filter);

  const stats = [
    { label: "Today", value: "12" },
    { label: "This Week", value: "87" },
    { label: "Online", value: "4" },
    { label: "Active", value: "6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Activity Feed
            </h1>
            <p className="text-gray-600">
              See what everyone is up to
            </p>
          </div>
          <Link href="/">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow transition-colors">
              ← Back Home
            </button>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-4">
              <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("study")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                filter === "study"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📚</span> Study
            </button>
            <button
              onClick={() => setFilter("purchase")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                filter === "purchase"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>🛍️</span> Purchases
            </button>
            <button
              onClick={() => setFilter("achievement")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                filter === "achievement"
                  ? "bg-yellow-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>🏆</span> Achievements
            </button>
            <button
              onClick={() => setFilter("friend")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                filter === "friend"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>👥</span> Friends
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow border-l-4 ${
                activity.user === "You" 
                  ? "border-purple-500" 
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="text-3xl">{activity.avatar}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold text-gray-800">
                        {activity.user}
                        {activity.user === "You" && (
                          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-gray-700">
                        {activity.action}
                        {activity.details && (
                          <span className="ml-2 font-bold text-purple-600">
                            {activity.details}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(activity.type)}`}>
                        {getTypeIcon(activity.type)} {activity.type}
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t">
                    <button className="text-gray-500 hover:text-pink-600 p-2 hover:bg-pink-50 rounded-lg transition">
                      ❤️
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition">
                      💬
                    </button>
                    <button className="text-gray-500 hover:text-green-600 p-2 hover:bg-green-50 rounded-lg transition">
                      🔄
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}