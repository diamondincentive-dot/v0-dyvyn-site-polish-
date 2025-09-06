"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  File as Fire,
  Lock,
  Play,
  CheckCircle,
  Target,
  Zap,
  Trophy,
  Star,
  MessageCircle,
  ArrowRight,
  Settings,
} from "lucide-react"

// Mock user data - in real app this would come from database/API
const mockUser = {
  name: "Alex",
  goal: "discipline",
  currentDay: 1,
  streak: 0,
  completedDays: [],
  timezone: "America/New_York",
  joinedAt: new Date("2024-01-01"),
}

const goalIcons = {
  discipline: Target,
  fitness: Zap,
  focus: Clock,
  dopamine: Trophy,
  money: Star,
}

const goalColors = {
  discipline: "from-purple-500 to-pink-500",
  fitness: "from-green-500 to-emerald-500",
  focus: "from-blue-500 to-cyan-500",
  dopamine: "from-red-500 to-orange-500",
  money: "from-yellow-500 to-amber-500",
}

const days = [
  {
    day: 1,
    title: "Foundation Day",
    description: "Build your discipline foundation with core habits",
    estimatedTime: "15-20 min",
    tasks: ["Morning routine setup", "Goal visualization", "First micro-win"],
  },
  {
    day: 2,
    title: "Momentum Builder",
    description: "Strengthen your commitment and build early momentum",
    estimatedTime: "20-25 min",
    tasks: ["Habit stacking", "Resistance training", "Progress reflection"],
  },
  {
    day: 3,
    title: "Obstacle Mastery",
    description: "Learn to overcome common challenges and setbacks",
    estimatedTime: "25-30 min",
    tasks: ["Obstacle identification", "Contingency planning", "Mental rehearsal"],
  },
  {
    day: 4,
    title: "Deep Focus",
    description: "Develop laser-sharp concentration and eliminate distractions",
    estimatedTime: "30-35 min",
    tasks: ["Focus training", "Distraction audit", "Deep work session"],
  },
  {
    day: 5,
    title: "Social Integration",
    description: "Align your environment and relationships with your goals",
    estimatedTime: "25-30 min",
    tasks: ["Environment design", "Accountability setup", "Social boundaries"],
  },
  {
    day: 6,
    title: "Advanced Techniques",
    description: "Master advanced discipline strategies and mental models",
    estimatedTime: "35-40 min",
    tasks: ["Advanced techniques", "Mental models", "System optimization"],
  },
  {
    day: 7,
    title: "Integration & Beyond",
    description: "Integrate everything and plan your continued growth",
    estimatedTime: "30-35 min",
    tasks: ["Integration planning", "Long-term strategy", "Celebration ritual"],
  },
]

export default function Dashboard() {
  const [user, setUser] = useState(mockUser)
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<string>("")
  const [showAIChat, setShowAIChat] = useState(false)

  // Calculate time until next day unlocks (mock 24-hour system)
  useEffect(() => {
    const updateTimer = () => {
      // Mock: assume last completion was 12 hours ago, so 12 hours remaining
      const hoursRemaining = 12
      const minutesRemaining = 34
      setTimeUntilUnlock(`${hoursRemaining}h ${minutesRemaining}m`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const isDayUnlocked = (dayNumber: number) => {
    if (dayNumber === 1) return true // Day 1 always unlocked
    if (dayNumber <= user.currentDay) return true
    return user.completedDays.includes(dayNumber - 1) // Previous day must be completed
  }

  const isDayCompleted = (dayNumber: number) => {
    return user.completedDays.includes(dayNumber)
  }

  const getProgressPercentage = () => {
    return (user.completedDays.length / 7) * 100
  }

  const GoalIcon = goalIcons[user.goal as keyof typeof goalIcons]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="gradient-dyvyn-text font-serif text-2xl">Dyvyn</div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                7-Day Challenge
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChat(!showAIChat)}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Coach Dyvyn</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl mb-2">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground text-lg">Ready to continue your discipline journey?</p>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${goalColors[user.goal as keyof typeof goalColors]} flex items-center justify-center`}
                  >
                    <GoalIcon className="w-5 h-5 text-white" />
                  </div>
                  Challenge Progress
                </CardTitle>
                <CardDescription>
                  Day {user.currentDay} of 7 • {user.completedDays.length} days completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(getProgressPercentage())}%</span>
                    </div>
                    <Progress value={getProgressPercentage()} className="h-2" />
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Fire className="w-4 h-4 text-accent" />
                      <span>{user.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Started {user.joinedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Days Grid */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Your 7-Day Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {days.map((day) => {
                  const isUnlocked = isDayUnlocked(day.day)
                  const isCompleted = isDayCompleted(day.day)
                  const isCurrent = day.day === user.currentDay && !isCompleted

                  return (
                    <Card
                      key={day.day}
                      className={`transition-all duration-300 ${
                        isCurrent
                          ? "ring-2 ring-accent bg-card/80"
                          : isCompleted
                            ? "bg-card/60"
                            : !isUnlocked
                              ? "opacity-60"
                              : "hover:bg-card/60"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? "bg-green-500"
                                  : isCurrent
                                    ? "gradient-dyvyn"
                                    : !isUnlocked
                                      ? "bg-muted"
                                      : "bg-primary/20"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : !isUnlocked ? (
                                <Lock className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <Play className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-lg">Day {day.day}</CardTitle>
                              <CardDescription className="text-sm">{day.estimatedTime}</CardDescription>
                            </div>
                          </div>
                          {isCurrent && (
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              Current
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold mb-2">{day.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{day.description}</p>
                        <div className="space-y-2 mb-4">
                          {day.tasks.map((task, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-muted-foreground">{task}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full"
                          disabled={!isUnlocked}
                          variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                          onClick={() => (window.location.href = `/day/${day.day}`)}
                        >
                          {isCompleted ? (
                            "Review Day"
                          ) : !isUnlocked ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Unlocks in {timeUntilUnlock}
                            </>
                          ) : (
                            <>
                              Start Day {day.day}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Coach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="gradient-dyvyn text-white text-sm font-semibold">D</AvatarFallback>
                  </Avatar>
                  Coach Dyvyn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "Great progress on your discipline journey! Remember, consistency beats perfection. Ready for today's
                  challenge?"
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Coach
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <Fire className="w-4 h-4 text-accent" />
                    <span className="font-semibold">{user.streak} days</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">{Math.round(getProgressPercentage())}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Days Remaining</span>
                  <span className="font-semibold">{7 - user.completedDays.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next Unlock</span>
                  <span className="font-semibold text-accent">{timeUntilUnlock}</span>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Plan your daily sessions and set reminders for optimal consistency.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
