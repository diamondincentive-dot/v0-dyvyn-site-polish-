"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/lib/progress-context"
import {
  Trophy,
  Star,
  Target,
  Calendar,
  BookOpen,
  Dumbbell,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Share2,
} from "lucide-react"

export default function CompletionPage() {
  const router = useRouter()
  const { user, getCompletionStats, resetProgress } = useProgress()
  const [showConfetti, setShowConfetti] = useState(false)
  const stats = getCompletionStats()

  useEffect(() => {
    // Redirect if challenge not completed
    if (user.completedDays.length < 7) {
      router.push("/dashboard")
      return
    }

    // Show celebration animation
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }, [user.completedDays.length, router])

  const achievements = [
    {
      title: "Challenge Completed",
      description: "Finished all 7 days of discipline training",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Streak Master",
      description: `Maintained a ${user.streak}-day streak`,
      icon: Star,
      color: "text-orange-500",
    },
    {
      title: "Habit Builder",
      description: "Completed daily habit challenges",
      icon: Target,
      color: "text-green-500",
    },
    {
      title: "Knowledge Seeker",
      description: "Read and reflected on growth materials",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Physical Warrior",
      description: "Completed exercise challenges",
      icon: Dumbbell,
      color: "text-red-500",
    },
    {
      title: "Self-Reflector",
      description: `Wrote ${stats.totalReflections} thoughtful reflections`,
      icon: MessageCircle,
      color: "text-purple-500",
    },
  ]

  const handleStartNewChallenge = () => {
    if (confirm("Are you sure you want to start a new challenge? This will reset your current progress.")) {
      resetProgress()
      router.push("/")
    }
  }

  const handleShareResults = () => {
    const shareText = `I just completed the Dyvyn 7-Day Discipline Challenge! 🏆\n\n✅ ${stats.completionRate}% completion rate\n🔥 ${user.streak}-day streak\n📚 ${stats.totalReflections} reflections\n\nReady to transform your discipline? Join me at Dyvyn!`

    if (navigator.share) {
      navigator.share({
        title: "Dyvyn Challenge Complete!",
        text: shareText,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Results copied to clipboard!")
    }
  }

  if (user.completedDays.length < 7) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Celebration Background */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 gradient-dyvyn opacity-20 animate-pulse"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="gradient-dyvyn w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 text-balance">
              Challenge <span className="gradient-dyvyn-text">Complete!</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Congratulations, {user.name}! You've successfully completed the 7-Day Discipline Challenge and transformed
              your habits.
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2 mb-8">
              {user.goal.charAt(0).toUpperCase() + user.goal.slice(1)} Master
            </Badge>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold gradient-dyvyn-text mb-2">{Math.round(stats.completionRate)}%</div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold gradient-dyvyn-text mb-2">{user.streak}</div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold gradient-dyvyn-text mb-2">{Math.round(stats.averageTimePerDay)}</div>
                <p className="text-sm text-muted-foreground">Avg Minutes/Day</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold gradient-dyvyn-text mb-2">{stats.totalReflections}</div>
                <p className="text-sm text-muted-foreground">Reflections</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center">Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-card/50 rounded-lg">
                      <Icon className={`w-8 h-8 ${achievement.color}`} />
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Journey Recap */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center">Your Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {user.completedDays.map((dayNumber) => (
                  <div key={dayNumber} className="flex items-start gap-4 p-4 bg-card/30 rounded-lg">
                    <div className="gradient-dyvyn w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                      {dayNumber}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Day {dayNumber}</h3>
                      {user.microWins[dayNumber] && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-accent" />
                          <span className="text-sm">{user.microWins[dayNumber]}</span>
                        </div>
                      )}
                      {user.reflections[dayNumber] && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {user.reflections[dayNumber].substring(0, 120)}
                          {user.reflections[dayNumber].length > 120 ? "..." : ""}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                You've built the foundation of discipline. Now it's time to continue growing and applying these
                principles to achieve your biggest goals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 bg-transparent">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold">Continue Daily Practice</div>
                    <div className="text-sm text-muted-foreground">Maintain your new habits</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 bg-transparent">
                  <Target className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold">Set Bigger Goals</div>
                    <div className="text-sm text-muted-foreground">Apply discipline to new areas</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 bg-transparent">
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold">Share Your Story</div>
                    <div className="text-sm text-muted-foreground">Inspire others to start</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleShareResults} className="gradient-dyvyn text-white">
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Success
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/dashboard")}>
              <Trophy className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={handleStartNewChallenge}>
              <ArrowRight className="w-5 h-5 mr-2" />
              New Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
