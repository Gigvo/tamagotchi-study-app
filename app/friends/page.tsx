// /app/friends/page.tsx
'use client';

import { useState } from 'react';
import { Users, Trophy, ChevronRight, Clock, Activity } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  xp: number;
  level: number;
  status: 'online' | 'offline';
  avatar: string;
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Player 1', xp: 100, level: 3, status: 'online', avatar: '🐱' },
  { id: '2', name: 'Player 2', xp: 70, level: 2, status: 'online', avatar: '🐶' },
  { id: '3', name: 'Player 3', xp: 69, level: 2, status: 'offline', avatar: '🐰' },
  { id: '4', name: 'Player 4', xp: 45, level: 1, status: 'online', avatar: '🐻' },
  { id: '5', name: 'Player 5', xp: 30, level: 1, status: 'offline', avatar: '🐼' },
];

export default function FriendsPage() {
  const [friends] = useState(mockFriends);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const sortedFriends = [...friends].sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Users className="h-8 w-8 text-purple-600" />
            Friends
          </h1>
          <p className="text-gray-600">Study together, grow together</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Trophy className="h-4 w-4" />
              <span className="text-sm">Total XP</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {friends.reduce((sum, f) => sum + f.xp, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Active Now</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {friends.filter(f => f.status === 'online').length}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex mb-4 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setShowLeaderboard(true)}
            className={`flex-1 py-2 rounded-md text-center font-medium ${
              showLeaderboard ? 'bg-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setShowLeaderboard(false)}
            className={`flex-1 py-2 rounded-md text-center font-medium ${
              !showLeaderboard ? 'bg-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            Friend List
          </button>
        </div>

        {showLeaderboard ? (
          /* Leaderboard */
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Friends Leaderboard</h2>
            <div className="space-y-3">
              {sortedFriends.map((friend, index) => (
                <div key={friend.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                    <span className="font-bold text-gray-700">{index + 1}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-2xl">{friend.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-800">{friend.name}</p>
                      <p className="text-sm text-gray-500">Level {friend.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{friend.xp} XP</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {friend.status === 'online' ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Friend List */
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Friend List</h2>
            <div className="space-y-2">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{friend.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-800">{friend.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-gray-500">{friend.status === 'online' ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Friend Button */}
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          + Add Friend
        </button>
      </div>
    </div>
  );
}