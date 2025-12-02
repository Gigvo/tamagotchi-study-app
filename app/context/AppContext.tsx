"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
  difficulty: "easy" | "medium" | "hard";
  createdAt: number;
  minimumTime: number; // in minutes
}

interface AppContextType {
  username: string;
  setUsername: (name: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  xp: number;
  addXp: (amount: number) => void;
  streak: number;
  updateStreak: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("username") || "Username";
    }
    return "Username";
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [xp, setXp] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("xp") || "0");
    }
    return 0;
  });

  const [streak, setStreak] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("streak") || "0");
    }
    return 0;
  });

  const setUsername = (name: string) => {
    setUsernameState(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("username", name);
    }
  };

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        // Award XP when completing a task
        if (newCompleted && !task.completed) {
          addXp(task.xpReward);
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const addXp = (amount: number) => {
    const newXp = xp + amount;
    setXp(newXp);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp", newXp.toString());
    }
  };

  const updateStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (typeof window !== "undefined") {
      localStorage.setItem("streak", newStreak.toString());
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        xp,
        addXp,
        streak,
        updateStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
