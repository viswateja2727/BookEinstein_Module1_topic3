"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Heart, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Scenario {
  situation: string
  icon: string
  question: string
  humanWay: {
    process: string[]
    answer: string
    traits: string[]
  }
  aiWay: {
    process: string[]
    answer: string
    traits: string[]
  }
  correctMode: "human" | "ai" | "both"
  explanation: string
}

export default function AIvsHumanPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const scenarios: Scenario[] = [
    {
      situation: "You see a photo of a cute puppy",
      icon: "🐶",
      question: "How do you decide if it's cute?",
      humanWay: {
        process: [
          "Your eyes see the puppy",
          "Your brain recognizes: big eyes, small size, fluffy",
          "Your emotions respond: 'Awww, so cute!'",
          "You FEEL happy and want to pet it",
        ],
        answer: "Look at big eyes and feel 'Awww!'",
        traits: ["Uses emotions", "Feels happiness", "Personal preference", "Instant gut feeling"],
      },
      aiWay: {
        process: [
          "Camera captures pixels (tiny dots)",
          "Analyzes patterns: ear shape, eye size, proportions",
          "Compares to millions of 'cute' examples it learned",
          "Calculates probability: 95% match to 'cute puppy' pattern",
        ],
        answer: "Calculate: 95% matches 'cute puppy' pattern",
        traits: ["No emotions", "Uses math/patterns", "Compares to training data", "Probability-based"],
      },
      correctMode: "both",
      explanation:
        "Humans use EMOTIONS and feelings. AI uses MATH and patterns. Both can identify cute puppies, but in totally different ways!",
    },
    {
      situation: "Choosing what movie to watch tonight",
      icon: "🎬",
      question: "How do you decide?",
      humanWay: {
        process: [
          "Think about your current mood",
          "Remember movies you loved before",
          "Consider how you're feeling: tired? excited? sad?",
          "Make a choice based on emotions and memories",
        ],
        answer: "Pick based on my mood and feelings",
        traits: [
          "Considers emotions",
          "Uses personal experiences",
          "Flexible based on mood",
          "Can change mind randomly",
        ],
      },
      aiWay: {
        process: [
          "Analyze your watch history data",
          "Find patterns: You watch comedies on Fridays",
          "Calculate: 80% of similar users liked Movie X",
          "Recommend based on mathematical probability",
        ],
        answer: "Recommend based on pattern: 'Users like you watched this'",
        traits: ["No understanding of 'mood'", "Uses statistics", "Pattern matching only", "Consistent algorithm"],
      },
      correctMode: "both",
      explanation:
        "Humans choose based on FEELINGS and CONTEXT. AI uses PATTERNS from data. Neither is wrong - just different!",
    },
    {
      situation: "Seeing your friend looks sad",
      icon: "😢",
      question: "How do you know they need help?",
      humanWay: {
        process: [
          "Notice facial expression and body language",
          "Remember similar times when YOU felt sad",
          "Feel empathy - understand their emotions",
          "Decide to comfort them because you CARE",
        ],
        answer: "Feel their sadness and want to help",
        traits: ["Has empathy", "Understands emotions", "Cares about feelings", "Can truly comfort"],
      },
      aiWay: {
        process: [
          "Detect facial features: corners of mouth down, eyes lowered",
          "Match pattern to 'sad face' in training data",
          "Output: 87% probability of sadness detected",
          "No actual understanding of what sadness FEELS like",
        ],
        answer: "Detect sad face pattern: 87% match",
        traits: ["No real empathy", "Pattern recognition only", "Can't actually 'care'", "No emotional understanding"],
      },
      correctMode: "human",
      explanation:
        "Only HUMANS can truly feel empathy and care! AI can detect sad faces but doesn't understand what sadness feels like. Emotions are uniquely human!",
    },
    {
      situation: "Sorting 10,000 photos by date",
      icon: "📸",
      question: "How do you organize them?",
      humanWay: {
        process: [
          "Look at each photo one by one",
          "Read the date manually",
          "Drag and drop into folders",
          "Takes hours and you might make mistakes when tired",
        ],
        answer: "Manually check dates - takes forever!",
        traits: ["Very slow", "Gets tired", "Makes mistakes", "Better for small amounts"],
      },
      aiWay: {
        process: [
          "Read metadata (hidden data) from all 10,000 photos instantly",
          "Sort by date using algorithm in seconds",
          "No tiredness, no mistakes",
          "Complete task in under 1 minute",
        ],
        answer: "Sort all 10,000 instantly by reading metadata",
        traits: ["Super fast", "Never gets tired", "100% accurate", "Perfect for repetitive tasks"],
      },
      correctMode: "ai",
      explanation:
        "AI is AMAZING at repetitive tasks with clear rules! Humans would take hours and get tired. This is where AI truly shines!",
    },
    {
      situation: "Reading a funny joke",
      icon: "😂",
      question: "How do you know it's funny?",
      humanWay: {
        process: [
          "Understand the context and cultural references",
          "Get the surprise twist or wordplay",
          "Feel the humor and laugh naturally",
          "Appreciate timing and delivery",
        ],
        answer: "Understand the joke and laugh because it's funny!",
        traits: ["Gets cultural context", "Understands humor", "Genuinely laughs", "Knows timing matters"],
      },
      aiWay: {
        process: [
          "Analyze words and structure",
          "Try to match patterns of 'funny' content",
          "Doesn't actually 'get' why it's funny",
          "Can identify joke format but can't truly laugh",
        ],
        answer: "Detect joke pattern but don't understand why it's funny",
        traits: ["No sense of humor", "Pattern matching only", "Can't truly laugh", "Misses subtle comedy"],
      },
      correctMode: "human",
      explanation:
        "Humans understand HUMOR, context, and culture! AI can identify jokes but doesn't 'get' why they're funny. Laughter and joy are human experiences!",
    },
    {
      situation: "Translating a document from Spanish to English",
      icon: "🌍",
      question: "How do you translate it?",
      humanWay: {
        process: [
          "Read each sentence carefully",
          "Think about word meanings and context",
          "Type out translation",
          "Takes a long time, might miss some words",
        ],
        answer: "Translate word by word - slow but understanding context",
        traits: ["Understands nuance", "Gets cultural meaning", "Slow for long texts", "Can explain WHY"],
      },
      aiWay: {
        process: [
          "Analyze millions of Spanish-English translation pairs",
          "Match patterns and word relationships",
          "Translate entire document in seconds",
          "Highly accurate for common phrases",
        ],
        answer: "Translate entire document in seconds using patterns",
        traits: ["Super fast", "Uses training data", "Great for common phrases", "May miss cultural nuance"],
      },
      correctMode: "both",
      explanation:
        "AI is FAST at translation! Humans understand CULTURAL CONTEXT better. For quick translations, AI wins. For poetry or cultural texts, humans understand deeper meaning!",
    },
  ]

  const currentScenarioData = scenarios[currentScenario]

  const handleStart = () => {
    setGameStarted(true)
    setCurrentScenario(0)
    setScore(0)
    setSelectedMode(null)
    setShowFeedback(false)
    setGameOver(false)
  }

  const handleModeSelect = (mode: string) => {
    if (!showFeedback) {
      setSelectedMode(mode)
    }
  }

  const handleSubmit = () => {
    if (!selectedMode) return

    setShowFeedback(true)

    const correct = currentScenarioData.correctMode === "both" || currentScenarioData.correctMode === selectedMode

    if (correct) {
      setScore(score + 20)
    }
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedMode(null)
      setShowFeedback(false)
    } else {
      setGameOver(true)
    }
  }

  const handleReset = () => {
    setGameStarted(false)
    setSelectedMode(null)
    setShowFeedback(false)
  }

  // Start Screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 bg-white/40 backdrop-blur-sm border-b border-cyan-200">
          <Link href="/" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          {!gameStarted && !gameOver && (
            <Button
              onClick={() => {
                setGameStarted(false)
                setCurrentScenario(0)
                setScore(0)
              }}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw size={16} />
              Restart
            </Button>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl">
            <Card className="max-w-4xl w-full bg-white/95 backdrop-blur-sm border-cyan-200/50 rounded-3xl shadow-xl">
              <CardHeader className="text-center space-y-2 pb-4">
                <div className="text-5xl">🤖❤️</div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI vs Human
                </h1>
                <p className="text-sm text-slate-600">Discover how AI thinks differently from humans!</p>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid md:grid-cols-2 gap-3">
                  {/* Humans Card */}
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 border-4 border-pink-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-6 h-6 text-pink-600" />
                      <h3 className="text-lg font-bold text-pink-700">HUMANS</h3>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <span>💭</span>
                        <span>Have emotions and feelings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>❤️</span>
                        <span>Can truly care and empathize</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>🎨</span>
                        <span>Creative and imaginative</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>🌟</span>
                        <span>Understand context and culture</span>
                      </li>
                    </ul>
                  </div>

                  {/* AI Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-4 border-blue-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-blue-700">AI</h3>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <span>🔢</span>
                        <span>Uses math and patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>⚡</span>
                        <span>Super fast at calculations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>♾️</span>
                        <span>Never gets tired</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>📊</span>
                        <span>Learns from data/examples</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border-4 border-yellow-300">
                  <h3 className="text-sm font-bold text-yellow-700 mb-2">How to Play:</h3>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>Read real-life scenarios</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🤔</span>
                      <span>See how HUMANS vs AI approach the problem</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✨</span>
                      <span>Guess which approach works best!</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white py-4 text-sm font-bold rounded-2xl shadow-lg"
                >
                  Start Exploring 🚀
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Game Over Screen
  if (gameOver) {
    const maxScore = scenarios.length * 20
    const percentage = Math.round((score / maxScore) * 100)
    const performance =
      percentage >= 80 ? "🏆 AI Expert!" : percentage >= 60 ? "⭐ Great Learner!" : "💪 Keep Exploring!"

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 bg-white/40 backdrop-blur-sm border-b border-cyan-200">
          <Link href="/" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          {!gameStarted && !gameOver && (
            <Button
              onClick={() => {
                setGameStarted(false)
                setCurrentScenario(0)
                setScore(0)
              }}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw size={16} />
              Restart
            </Button>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl">
            <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-cyan-200/50 rounded-3xl shadow-xl mx-auto">
              <CardContent className="text-center space-y-3 pt-6 pb-6">
                <div className="text-4xl animate-bounce">🏆</div>
                <h1 className="text-2xl font-bold text-slate-900">Learning Complete!</h1>
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-2xl p-4 border-4 border-teal-300">
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                    {score}
                  </p>
                  <p className="text-xs text-slate-600">
                    out of {maxScore} points ({percentage}%)
                  </p>
                  <p className="text-lg font-bold text-slate-700 mt-2">{performance}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-4 border-blue-300 text-left">
                  <h3 className="text-sm font-bold text-blue-700 mb-2">Key Takeaways:</h3>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>✓ AI uses PATTERNS and MATH, not emotions</li>
                    <li>✓ Humans have FEELINGS, empathy, and creativity</li>
                    <li>✓ AI is FAST at repetitive tasks with clear rules</li>
                    <li>✓ Humans understand CONTEXT, culture, and humor</li>
                    <li>✓ Both have strengths - they work best TOGETHER!</li>
                  </ul>
                </div>

                <Button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white py-4 text-sm font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Explore Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 bg-white/40 backdrop-blur-sm border-b border-cyan-200">
        <Link href="/" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </Link>
        {!gameStarted && !gameOver && (
          <Button
            onClick={() => {
              setGameStarted(false)
              setCurrentScenario(0)
              setScore(0)
            }}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw size={16} />
            Restart
          </Button>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          {/* Progress Header */}
          <Card className="mb-3 bg-white/90 backdrop-blur-sm border-cyan-200/50 rounded-2xl">
            <CardContent className="flex items-center justify-between p-4">
              <div className="text-center">
                <p className="text-xs text-slate-600">Scenario</p>
                <p className="text-lg font-bold text-teal-600">
                  {currentScenario + 1}/{scenarios.length}
                </p>
              </div>
              <div className="flex-1 h-2 mx-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-300"
                  style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-600">Score</p>
                <p className="text-lg font-bold text-amber-600">{score}</p>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Card */}
          <Card className="mb-3 bg-white/95 backdrop-blur-sm border-cyan-200/50 rounded-3xl shadow-lg">
            <CardContent className="p-5 space-y-4">
              <div className="text-center space-y-2">
                <div className="text-5xl">{currentScenarioData.icon}</div>
                <h2 className="text-2xl font-bold text-slate-900">Scenario:</h2>
                <p className="text-base text-slate-700">{currentScenarioData.situation}</p>
                <p className="text-xs text-slate-600 italic">{currentScenarioData.question}</p>
              </div>

              {/* Human vs AI Comparison */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Human Way */}
                <div
                  className={`rounded-2xl p-4 border-4 cursor-pointer transition-all ${
                    selectedMode === "human"
                      ? "border-pink-500 bg-pink-50 shadow-lg"
                      : "border-pink-200 bg-pink-50/50 hover:border-pink-300"
                  }`}
                  onClick={() => handleModeSelect("human")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <h3 className="font-bold text-pink-700 text-sm">HUMAN Way</h3>
                  </div>
                  <div className="space-y-1 mb-3">
                    {currentScenarioData.humanWay.process.map((step, i) => (
                      <p key={i} className="text-xs text-slate-700">
                        {i + 1}. {step}
                      </p>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-2 border-2 border-pink-200 mb-2">
                    <p className="font-bold text-pink-700 text-xs">{currentScenarioData.humanWay.answer}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentScenarioData.humanWay.traits.map((trait, i) => (
                      <span key={i} className="text-xs bg-pink-200 text-pink-700 rounded px-2 py-1">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Way */}
                <div
                  className={`rounded-2xl p-4 border-4 cursor-pointer transition-all ${
                    selectedMode === "ai"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-blue-200 bg-blue-50/50 hover:border-blue-300"
                  }`}
                  onClick={() => handleModeSelect("ai")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-700 text-sm">AI Way</h3>
                  </div>
                  <div className="space-y-1 mb-3">
                    {currentScenarioData.aiWay.process.map((step, i) => (
                      <p key={i} className="text-xs text-slate-700">
                        {i + 1}. {step}
                      </p>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-2 border-2 border-blue-200 mb-2">
                    <p className="font-bold text-blue-700 text-xs">{currentScenarioData.aiWay.answer}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentScenarioData.aiWay.traits.map((trait, i) => (
                      <span key={i} className="text-xs bg-blue-200 text-blue-700 rounded px-2 py-1">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {!showFeedback && (
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedMode}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold rounded-xl py-2 text-sm"
                >
                  Check Answer ✓
                </Button>
              )}

              {showFeedback && (
                <div className="space-y-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border-4 border-yellow-300">
                  <div
                    className={`text-center ${
                      currentScenarioData.correctMode === "both" || currentScenarioData.correctMode === selectedMode
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    <p className="text-lg font-bold">
                      {currentScenarioData.correctMode === "both" || currentScenarioData.correctMode === selectedMode
                        ? "✓ Great!"
                        : "Not quite..."}
                    </p>
                  </div>
                  <p className="text-center text-xs text-slate-700 font-semibold italic">
                    {currentScenarioData.explanation}
                  </p>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold rounded-xl py-2 text-sm"
                  >
                    {currentScenario < scenarios.length - 1 ? "Next Scenario →" : "See Results 🏆"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
