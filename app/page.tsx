"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Zap, Clock, Trophy, Star, CheckCircle } from "lucide-react"

const goals = [
  {
    id: "discipline",
    title: "Build Discipline",
    description: "Master self-control and consistency in all areas of life",
    icon: Target,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "fitness",
    title: "Fitness Focus",
    description: "Transform your body with daily movement and healthy habits",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "focus",
    title: "Deep Focus",
    description: "Eliminate distractions and achieve laser-sharp concentration",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "dopamine",
    title: "Quit Dopamine",
    description: "Break free from instant gratification and digital addiction",
    icon: Trophy,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "money",
    title: "Money & Work",
    description: "Build wealth through disciplined financial and career habits",
    icon: Star,
    color: "from-yellow-500 to-amber-500",
  },
]

const features = [
  "Daily unlocking system with 24-hour progression",
  "AI-powered coaching and personalized guidance",
  "Goal-adaptive content tailored to your journey",
  "Streak tracking with intelligent grace periods",
  "Reading verification and reflection prompts",
  "Exercise selection with form guidance",
  "Calendar integration and habit scheduling",
]

export default function LandingPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleStartChallenge = () => {
    if (selectedGoal) {
      setShowOnboarding(true)
    }
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="gradient-dyvyn w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-6 text-balance">
              Welcome to Your <span className="gradient-dyvyn-text">7-Day Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              You've chosen the {goals.find((g) => g.id === selectedGoal)?.title} path. Your transformation begins now
              with Day 1 unlocking in moments.
            </p>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h3 className="font-serif text-xl mb-4">What happens next:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Day 1 unlocks immediately after setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Each day unlocks 24 hours after completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>AI Coach Dyvyn guides you through each step</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="gradient-dyvyn text-white font-semibold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Enter Your Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-dyvyn opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              Premium 7-Day Challenge
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 text-balance leading-tight">
              Transform Your <span className="gradient-dyvyn-text">Discipline</span> in 7 Days
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
              Join thousands who've built unbreakable habits through our AI-powered challenge system. Each day unlocks
              new potential, guided by Coach Dyvyn.
            </p>

            {/* Goal Selection */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Choose Your Path</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {goals.map((goal) => {
                  const Icon = goal.icon
                  return (
                    <Card
                      key={goal.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedGoal === goal.id ? "ring-2 ring-accent bg-card/80" : "hover:bg-card/60"
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <CardHeader className="pb-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${goal.color} flex items-center justify-center mb-3`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg font-serif">{goal.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">{goal.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Button
              size="lg"
              disabled={!selectedGoal}
              className="gradient-dyvyn text-white font-semibold px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStartChallenge}
            >
              Start Your Challenge
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Why Dyvyn Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-12">Join 10,000+ Discipline Masters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-dyvyn-text mb-2">94%</div>
                <p className="text-muted-foreground">Complete all 7 days</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-dyvyn-text mb-2">4.9★</div>
                <p className="text-muted-foreground">Average rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-dyvyn-text mb-2">21x</div>
                <p className="text-muted-foreground">Habit retention rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="gradient-dyvyn-text font-serif text-2xl mb-4">Dyvyn</div>
          <p className="text-muted-foreground text-sm">Transform your discipline. Transform your life.</p>
        </div>
      </footer>
    </div>
  )
}
