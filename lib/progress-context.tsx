"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserProgress {
  name: string
  goal: string
  currentDay: number
  completedDays: number[]
  streak: number
  joinedAt: Date
  lastCompletionAt: Date | null
  totalTimeSpent: number
  reflections: Record<number, string>
  microWins: Record<number, string>
  habitCompletions: Record<number, boolean>
  readingCompletions: Record<number, { title: string; summary: string }>
  exerciseCompletions: Record<number, string[]>
}

interface ProgressContextType {
  user: UserProgress
  updateProgress: (dayNumber: number, data: any) => void
  completeDay: (dayNumber: number) => void
  canAccessDay: (dayNumber: number) => boolean
  getTimeUntilUnlock: () => string
  resetProgress: () => void
  getCompletionStats: () => {
    completionRate: number
    averageTimePerDay: number
    longestStreak: number
    totalReflections: number
  }
}

const defaultUser: UserProgress = {
  name: "Alex",
  goal: "discipline",
  currentDay: 1,
  completedDays: [],
  streak: 0,
  joinedAt: new Date(),
  lastCompletionAt: null,
  totalTimeSpent: 0,
  reflections: {},
  microWins: {},
  habitCompletions: {},
  readingCompletions: {},
  exerciseCompletions: {},
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProgress>(defaultUser)

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("dyvyn-progress")
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setUser({
        ...parsed,
        joinedAt: new Date(parsed.joinedAt),
        lastCompletionAt: parsed.lastCompletionAt ? new Date(parsed.lastCompletionAt) : null,
      })
    }
  }, [])

  // Save progress to localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem("dyvyn-progress", JSON.stringify(user))
  }, [user])

  const updateProgress = (dayNumber: number, data: any) => {
    setUser((prev) => ({
      ...prev,
      reflections: { ...prev.reflections, [dayNumber]: data.reflectionText },
      microWins: { ...prev.microWins, [dayNumber]: data.microWin },
      habitCompletions: { ...prev.habitCompletions, [dayNumber]: data.habitCompleted },
      readingCompletions: {
        ...prev.readingCompletions,
        [dayNumber]: { title: data.readingTitle, summary: data.readingSummary },
      },
      exerciseCompletions: {
        ...prev.exerciseCompletions,
        [dayNumber]: [...data.selectedExercises, data.customExercise].filter(Boolean),
      },
    }))
  }

  const completeDay = (dayNumber: number) => {
    const now = new Date()
    setUser((prev) => {
      const newCompletedDays = [...prev.completedDays, dayNumber].sort((a, b) => a - b)
      const newStreak = calculateStreak(newCompletedDays, now)

      return {
        ...prev,
        completedDays: newCompletedDays,
        currentDay: Math.min(dayNumber + 1, 7),
        streak: newStreak,
        lastCompletionAt: now,
        totalTimeSpent: prev.totalTimeSpent + 30, // Assume 30 minutes per day
      }
    })
  }

  const calculateStreak = (completedDays: number[], currentDate: Date): number => {
    if (completedDays.length === 0) return 0

    let streak = 0
    const today = new Date(currentDate)
    today.setHours(0, 0, 0, 0)

    // Check consecutive days from most recent
    for (let i = completedDays.length - 1; i >= 0; i--) {
      const dayDate = new Date(user.joinedAt)
      dayDate.setDate(dayDate.getDate() + completedDays[i] - 1)
      dayDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff <= 1 + streak) {
        // Within grace period (36 hours = 1.5 days)
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const canAccessDay = (dayNumber: number): boolean => {
    if (dayNumber === 1) return true
    if (user.completedDays.includes(dayNumber)) return true

    // Check if previous day is completed and 24 hours have passed
    const previousDayCompleted = user.completedDays.includes(dayNumber - 1)
    if (!previousDayCompleted) return false

    if (!user.lastCompletionAt) return false

    const hoursSinceCompletion = (Date.now() - user.lastCompletionAt.getTime()) / (1000 * 60 * 60)
    return hoursSinceCompletion >= 24
  }

  const getTimeUntilUnlock = (): string => {
    if (!user.lastCompletionAt) return "Available now"

    const hoursSinceCompletion = (Date.now() - user.lastCompletionAt.getTime()) / (1000 * 60 * 60)
    const hoursRemaining = Math.max(0, 24 - hoursSinceCompletion)

    if (hoursRemaining === 0) return "Available now"

    const hours = Math.floor(hoursRemaining)
    const minutes = Math.floor((hoursRemaining - hours) * 60)

    return `${hours}h ${minutes}m`
  }

  const resetProgress = () => {
    setUser(defaultUser)
    localStorage.removeItem("dyvyn-progress")
  }

  const getCompletionStats = () => {
    return {
      completionRate: (user.completedDays.length / 7) * 100,
      averageTimePerDay: user.totalTimeSpent / Math.max(user.completedDays.length, 1),
      longestStreak: user.streak,
      totalReflections: Object.keys(user.reflections).length,
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        user,
        updateProgress,
        completeDay,
        canAccessDay,
        getTimeUntilUnlock,
        resetProgress,
        getCompletionStats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
