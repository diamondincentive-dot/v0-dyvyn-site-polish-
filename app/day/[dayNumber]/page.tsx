"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Target,
  Book,
  Dumbbell,
  MessageCircle,
  Sparkles,
  Trophy,
} from "lucide-react"

// Mock user data
const mockUser = {
  goal: "discipline",
  name: "Alex",
  currentDay: 1,
}

// Goal-adaptive content
const goalContent = {
  discipline: {
    habits: {
      1: "Make your bed within 5 minutes of waking up",
      2: "Complete a 10-minute morning routine without checking your phone",
      3: "Practice saying 'no' to one unnecessary commitment today",
      4: "Maintain perfect posture for 30 minutes during focused work",
      5: "Complete all planned tasks before any leisure activities",
      6: "Practice delayed gratification by waiting 10 minutes before any impulse purchase",
      7: "Design and execute a perfect morning routine that sets your day up for success",
    },
    readings: {
      1: "Read about the compound effect of small daily habits",
      2: "Study the psychology of habit formation and neural pathways",
      3: "Learn about willpower depletion and how to manage mental energy",
      4: "Explore the connection between physical posture and mental discipline",
      5: "Understand the relationship between delayed gratification and success",
      6: "Read about advanced self-control techniques and mental models",
      7: "Study long-term habit maintenance and lifestyle design principles",
    },
  },
  fitness: {
    habits: {
      1: "Complete 20 push-ups and 30-second plank",
      2: "Take a 15-minute walk and do 10 minutes of stretching",
      3: "Perform a full-body workout for 20 minutes",
      4: "Complete 100 bodyweight squats throughout the day",
      5: "Do a 25-minute HIIT workout session",
      6: "Complete your longest workout session yet (30+ minutes)",
      7: "Design and execute your ideal weekly fitness routine",
    },
    readings: {
      1: "Learn about the immediate benefits of daily movement",
      2: "Study the science of progressive overload and adaptation",
      3: "Read about nutrition timing and workout recovery",
      4: "Explore the connection between exercise and mental clarity",
      5: "Understand high-intensity training and metabolic benefits",
      6: "Learn about advanced training techniques and periodization",
      7: "Study long-term fitness planning and lifestyle integration",
    },
  },
}

const dayThemes = {
  1: {
    title: "Foundation Day",
    mindset:
      "Today marks the beginning of your transformation. Every expert was once a beginner, and every master was once a disaster. Your only job today is to start.",
    focus: "Building the foundation of discipline through small, consistent actions",
  },
  2: {
    title: "Momentum Builder",
    mindset:
      "Momentum is everything. Yesterday you planted a seed, today you water it. The compound effect of your actions is already beginning to work in your favor.",
    focus: "Strengthening your commitment and building unstoppable momentum",
  },
  3: {
    title: "Obstacle Mastery",
    mindset:
      "Obstacles don't block the path - they ARE the path. Today you'll learn that resistance is not your enemy, it's your teacher.",
    focus: "Developing resilience and learning to thrive under pressure",
  },
  4: {
    title: "Deep Focus",
    mindset:
      "In a world of infinite distractions, your ability to focus is your superpower. Today you'll train your mind like an athlete trains their body.",
    focus: "Cultivating laser-sharp concentration and eliminating distractions",
  },
  5: {
    title: "Social Integration",
    mindset:
      "You are the average of the five people you spend the most time with. Today you'll align your environment with your highest aspirations.",
    focus: "Optimizing your environment and relationships for success",
  },
  6: {
    title: "Advanced Techniques",
    mindset:
      "Mastery is not about perfection, it's about progression. Today you'll learn the advanced strategies that separate the good from the great.",
    focus: "Implementing advanced discipline strategies and mental models",
  },
  7: {
    title: "Integration & Beyond",
    mindset:
      "This is not the end, it's the beginning. Today you'll integrate everything you've learned and design your path forward.",
    focus: "Synthesizing your journey and planning for continued growth",
  },
}

const exercises = {
  upper: ["Push-ups", "Pull-ups", "Pike push-ups", "Tricep dips", "Plank to downward dog"],
  lower: ["Squats", "Lunges", "Single-leg glute bridges", "Calf raises", "Wall sits"],
  core: ["Plank", "Mountain climbers", "Russian twists", "Dead bugs", "Bicycle crunches"],
  conditioning: ["Burpees", "Jumping jacks", "High knees", "Jump squats", "Bear crawls"],
}

export default function DayPage() {
  const params = useParams()
  const router = useRouter()
  const dayNumber = Number.parseInt(params.dayNumber as string)

  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({
    habitCompleted: false,
    readingTitle: "",
    readingSummary: "",
    selectedExercises: [] as string[],
    customExercise: "",
    reflectionText: "",
    microWin: "",
    overallRating: 0,
  })
  const [focusTimer, setFocusTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Focus timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && focusTimer > 0) {
      interval = setInterval(() => {
        setFocusTimer((time) => time - 1)
      }, 1000)
    } else if (focusTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, focusTimer])

  const dayTheme = dayThemes[dayNumber as keyof typeof dayThemes]
  const userGoal = mockUser.goal as keyof typeof goalContent
  const habitTask = goalContent[userGoal]?.habits[dayNumber as keyof (typeof goalContent)[typeof userGoal]["habits"]]
  const readingTask =
    goalContent[userGoal]?.readings[dayNumber as keyof (typeof goalContent)[typeof userGoal]["readings"]]

  const steps = [
    { id: 1, title: "Mindset", icon: Target },
    { id: 2, title: "Habit", icon: CheckCircle },
    { id: 3, title: "Reading", icon: Book },
    { id: 4, title: "Exercise", icon: Dumbbell },
    { id: 5, title: "Reflection", icon: MessageCircle },
    { id: 6, title: "Check-in", icon: Trophy },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1)
    }
  }

  const handleExerciseToggle = (exercise: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedExercises: prev.selectedExercises.includes(exercise)
        ? prev.selectedExercises.filter((e) => e !== exercise)
        : [...prev.selectedExercises, exercise],
    }))
  }

  const canCompleteDay = () => {
    return (
      completedSteps.length === steps.length &&
      formData.habitCompleted &&
      formData.readingTitle.length > 0 &&
      formData.readingSummary.length >= 100 &&
      (formData.selectedExercises.length > 0 || formData.customExercise.length > 0) &&
      formData.reflectionText.length > 0 &&
      formData.microWin.length > 0
    )
  }

  const handleCompleteDay = () => {
    // In real app, this would save to database
    router.push("/dashboard")
  }

  if (!dayTheme) {
    return <div>Day not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div>
                <h1 className="font-serif text-xl">Day {dayNumber}</h1>
                <p className="text-sm text-muted-foreground">{dayTheme.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {completedSteps.length}/{steps.length} Complete
              </Badge>
              <Progress value={(completedSteps.length / steps.length) * 100} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const isAccessible = step.id <= currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      isAccessible ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => isAccessible && setCurrentStep(step.id)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "gradient-dyvyn text-white"
                            : isAccessible
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-center">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && <div className="w-8 h-0.5 bg-border mx-2 mt-6 hidden sm:block"></div>}
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="text-center space-y-6">
                  <div className="gradient-dyvyn w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl mb-4">{dayTheme.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                      {dayTheme.mindset}
                    </p>
                    <Badge variant="secondary" className="mb-6">
                      Focus: {dayTheme.focus}
                    </Badge>
                  </div>
                  <Button size="lg" onClick={() => handleStepComplete(1)} className="gradient-dyvyn text-white">
                    Begin Today's Challenge
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl mb-4">Today's Habit Challenge</h2>
                    <p className="text-muted-foreground mb-6">
                      Complete this goal-specific task to build your discipline
                    </p>
                  </div>
                  <Card className="bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">Your Challenge</h3>
                          <p className="text-muted-foreground leading-relaxed">{habitTask}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="habit-complete"
                      checked={formData.habitCompleted}
                      onChange={(e) => setFormData({ ...formData, habitCompleted: e.target.checked })}
                      className="w-5 h-5 rounded border-border"
                    />
                    <Label htmlFor="habit-complete" className="text-lg">
                      I have completed today's habit challenge
                    </Label>
                  </div>
                  <Button
                    size="lg"
                    disabled={!formData.habitCompleted}
                    onClick={() => handleStepComplete(2)}
                    className="w-full"
                  >
                    Continue to Reading
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl mb-4">Knowledge Building</h2>
                    <p className="text-muted-foreground mb-6">Read and reflect on today's learning material</p>
                  </div>
                  <Card className="bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Book className="w-6 h-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">Today's Reading Focus</h3>
                          <p className="text-muted-foreground leading-relaxed">{readingTask}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reading-title">What did you read? (Book, article, or resource title)</Label>
                      <Input
                        id="reading-title"
                        value={formData.readingTitle}
                        onChange={(e) => setFormData({ ...formData, readingTitle: e.target.value })}
                        placeholder="Enter the title of what you read..."
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reading-summary">Summarize your key takeaways (100-180 characters minimum)</Label>
                      <Textarea
                        id="reading-summary"
                        value={formData.readingSummary}
                        onChange={(e) => setFormData({ ...formData, readingSummary: e.target.value })}
                        placeholder="What were the main insights? How will you apply this knowledge?"
                        className="mt-2 min-h-24"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.readingSummary.length}/180 characters
                      </p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    disabled={formData.readingTitle.length === 0 || formData.readingSummary.length < 100}
                    onClick={() => handleStepComplete(3)}
                    className="w-full"
                  >
                    Continue to Exercise
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl mb-4">Physical Challenge</h2>
                    <p className="text-muted-foreground mb-6">Choose exercises to strengthen your body and mind</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(exercises).map(([category, exerciseList]) => (
                      <Card key={category} className="bg-card/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg capitalize">{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {exerciseList.map((exercise) => (
                              <div key={exercise} className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  id={exercise}
                                  checked={formData.selectedExercises.includes(exercise)}
                                  onChange={() => handleExerciseToggle(exercise)}
                                  className="w-4 h-4 rounded border-border"
                                />
                                <Label htmlFor={exercise} className="text-sm">
                                  {exercise}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="custom-exercise">Or add your own exercise</Label>
                    <Input
                      id="custom-exercise"
                      value={formData.customExercise}
                      onChange={(e) => setFormData({ ...formData, customExercise: e.target.value })}
                      placeholder="Describe your custom exercise..."
                      className="mt-2"
                    />
                  </div>
                  <Button
                    size="lg"
                    disabled={formData.selectedExercises.length === 0 && formData.customExercise.length === 0}
                    onClick={() => handleStepComplete(4)}
                    className="w-full"
                  >
                    Continue to Reflection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl mb-4">Daily Reflection</h2>
                    <p className="text-muted-foreground mb-6">Process your experiences and insights from today</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="reflection">
                        How did today's challenges make you feel? What did you learn about yourself?
                      </Label>
                      <Textarea
                        id="reflection"
                        value={formData.reflectionText}
                        onChange={(e) => setFormData({ ...formData, reflectionText: e.target.value })}
                        placeholder="Reflect on your experience, challenges faced, and insights gained..."
                        className="mt-2 min-h-32"
                      />
                    </div>
                    <div>
                      <Label htmlFor="micro-win">What was your biggest micro-win today?</Label>
                      <Input
                        id="micro-win"
                        value={formData.microWin}
                        onChange={(e) => setFormData({ ...formData, microWin: e.target.value })}
                        placeholder="Celebrate a small victory from today..."
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    disabled={formData.reflectionText.length === 0 || formData.microWin.length === 0}
                    onClick={() => handleStepComplete(5)}
                    className="w-full"
                  >
                    Final Check-in
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="gradient-dyvyn w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-serif text-2xl mb-4">Day {dayNumber} Complete!</h2>
                    <p className="text-muted-foreground mb-6">
                      Congratulations on completing another step in your discipline journey
                    </p>
                  </div>
                  <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-center">Today's Achievements</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Completed habit challenge</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Finished reading and reflection</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Completed physical exercise</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-accent" />
                          <span className="font-medium">Micro-win: {formData.microWin}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      {dayNumber < 7 ? `Day ${dayNumber + 1} unlocks in 24 hours` : "Challenge complete! 🎉"}
                    </p>
                    <Button size="lg" onClick={handleCompleteDay} className="gradient-dyvyn text-white">
                      {dayNumber < 7 ? "Return to Dashboard" : "View Final Results"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Coach Sidebar */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="gradient-dyvyn text-white text-sm font-semibold">D</AvatarFallback>
                </Avatar>
                Coach Dyvyn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentStep === 1 &&
                  "Welcome to Day " +
                    dayNumber +
                    "! Take a moment to absorb today's mindset. This foundation will guide everything you do today."}
                {currentStep === 2 &&
                  "Focus on completing this habit with full intention. Quality over speed - make it count."}
                {currentStep === 3 &&
                  "Reading builds the mental models for discipline. Take notes and think about how this applies to your life."}
                {currentStep === 4 &&
                  "Physical challenges build mental resilience. Choose exercises that push you slightly outside your comfort zone."}
                {currentStep === 5 &&
                  "Reflection is where growth happens. Be honest about your experience - both struggles and victories matter."}
                {currentStep === 6 &&
                  "Outstanding work today! You're building something powerful. Rest well and prepare for tomorrow's growth."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
