"use client"

import { useState } from "react"
import Link from "next/link"
import { Brain, ArrowLeft, Check, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type ImageType = "cat" | "dog"

interface TrainingImage {
  id: number
  type: ImageType
  emoji: string
}

export default function TrainAIPage() {
  const [trainingData, setTrainingData] = useState<TrainingImage[]>([])
  const [currentTest, setCurrentTest] = useState<TrainingImage | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [phase, setPhase] = useState<"training" | "testing">("training")

  const catEmojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
  const dogEmojis = ["🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐾"]

  const addTrainingExample = (type: ImageType) => {
    const emoji =
      type === "cat"
        ? catEmojis[Math.floor(Math.random() * catEmojis.length)]
        : dogEmojis[Math.floor(Math.random() * dogEmojis.length)]
    setTrainingData([...trainingData, { id: Date.now(), type, emoji }])
  }

  const startTesting = () => {
    if (trainingData.length < 4) {
      alert("Add at least 4 training examples (2 cats and 2 dogs) before testing!")
      return
    }
    setPhase("testing")
    generateTestImage()
  }

  const generateTestImage = () => {
    const type: ImageType = Math.random() > 0.5 ? "cat" : "dog"
    const emoji =
      type === "cat"
        ? catEmojis[Math.floor(Math.random() * catEmojis.length)]
        : dogEmojis[Math.floor(Math.random() * dogEmojis.length)]
    setCurrentTest({ id: Date.now(), type, emoji })
    setResult(null)
  }

  const makeGuess = (guess: ImageType) => {
    if (!currentTest) return

    const isCorrect = guess === currentTest.type
    setResult(isCorrect ? "correct" : "incorrect")
    setScore({ correct: score.correct + (isCorrect ? 1 : 0), total: score.total + 1 })

    setTimeout(() => {
      generateTestImage()
    }, 1500)
  }

  const reset = () => {
    setTrainingData([])
    setCurrentTest(null)
    setResult(null)
    setScore({ correct: 0, total: 0 })
    setPhase("training")
  }

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">AI Training Simulator</h1>
            <p className="text-muted-foreground">Train your AI to recognize cats and dogs</p>
          </div>
        </div>

        {phase === "training" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Train Your AI</CardTitle>
                <CardDescription>
                  Click the buttons below to add training examples. The AI learns from these examples!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button onClick={() => addTrainingExample("cat")} className="flex-1" size="lg">
                    Add Cat Example 😺
                  </Button>
                  <Button onClick={() => addTrainingExample("dog")} className="flex-1" variant="secondary" size="lg">
                    Add Dog Example 🐶
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Cat Training Data</h3>
                    <div className="flex flex-wrap gap-2">
                      {trainingData
                        .filter((d) => d.type === "cat")
                        .map((d) => (
                          <div
                            key={d.id}
                            className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl"
                          >
                            {d.emoji}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Dog Training Data</h3>
                    <div className="flex flex-wrap gap-2">
                      {trainingData
                        .filter((d) => d.type === "dog")
                        .map((d) => (
                          <div
                            key={d.id}
                            className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl"
                          >
                            {d.emoji}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Training examples: {trainingData.length} (Need at least 4 to start testing)
                  </p>
                  <Button onClick={startTesting} disabled={trainingData.length < 4} className="w-full">
                    Start Testing Your AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Test Your AI</CardTitle>
                <CardDescription>Make predictions based on what your AI learned!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-2xl font-bold text-primary">{accuracy}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-2xl font-bold">
                      {score.correct}/{score.total}
                    </p>
                  </div>
                </div>

                <Progress value={accuracy} className="h-2" />

                {currentTest && (
                  <div className="space-y-4">
                    <div className="bg-muted rounded-xl p-8 flex items-center justify-center">
                      <div className="text-8xl">{currentTest.emoji}</div>
                    </div>

                    {result === null ? (
                      <div className="grid grid-cols-2 gap-4">
                        <Button onClick={() => makeGuess("cat")} size="lg" className="h-16">
                          Cat 😺
                        </Button>
                        <Button onClick={() => makeGuess("dog")} size="lg" variant="secondary" className="h-16">
                          Dog 🐶
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={`p-4 rounded-lg flex items-center gap-2 ${result === "correct" ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"}`}
                      >
                        {result === "correct" ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span className="font-semibold">Correct! It was a {currentTest.type}!</span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5" />
                            <span className="font-semibold">Incorrect. It was a {currentTest.type}.</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t flex gap-4">
                  <Button onClick={reset} variant="outline" className="flex-1 bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset & Retrain
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Real AI works similarly! It learns patterns from training data, then uses those patterns to make
                  predictions on new data. The more training examples you provide, the better it gets at recognizing the
                  differences between cats and dogs.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
