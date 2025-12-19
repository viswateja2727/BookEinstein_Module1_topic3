"use client"

import { useState } from "react"
import Link from "next/link"
import { Target, ArrowLeft, RefreshCw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Color = "red" | "blue" | "green" | "yellow" | "purple" | "orange"

interface GameState {
  sequence: Color[]
  userSequence: Color[]
  currentRound: number
  isPlaying: boolean
  showSequence: boolean
  gameOver: boolean
  score: number
}

const colors: Color[] = ["red", "blue", "green", "yellow", "purple", "orange"]

const colorStyles: Record<Color, string> = {
  red: "bg-red-500 hover:bg-red-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  orange: "bg-orange-500 hover:bg-orange-600",
}

export default function PatternChallengePage() {
  const [gameState, setGameState] = useState<GameState>({
    sequence: [],
    userSequence: [],
    currentRound: 0,
    isPlaying: false,
    showSequence: false,
    gameOver: false,
    score: 0,
  })
  const [highlightedColor, setHighlightedColor] = useState<Color | null>(null)

  const startGame = () => {
    const initialSequence = [colors[Math.floor(Math.random() * colors.length)]]
    setGameState({
      sequence: initialSequence,
      userSequence: [],
      currentRound: 1,
      isPlaying: true,
      showSequence: true,
      gameOver: false,
      score: 0,
    })
    playSequence(initialSequence)
  }

  const playSequence = async (sequence: Color[]) => {
    setGameState((prev) => ({ ...prev, showSequence: true }))

    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setHighlightedColor(sequence[i])
      await new Promise((resolve) => setTimeout(resolve, 400))
      setHighlightedColor(null)
    }

    setGameState((prev) => ({ ...prev, showSequence: false }))
  }

  const handleColorClick = (color: Color) => {
    if (gameState.showSequence || gameState.gameOver || !gameState.isPlaying) return

    const newUserSequence = [...gameState.userSequence, color]
    const currentIndex = newUserSequence.length - 1

    if (newUserSequence[currentIndex] !== gameState.sequence[currentIndex]) {
      setGameState((prev) => ({ ...prev, gameOver: true, isPlaying: false }))
      return
    }

    if (newUserSequence.length === gameState.sequence.length) {
      const newRound = gameState.currentRound + 1
      const newScore = gameState.score + gameState.currentRound * 10
      const newSequence = [...gameState.sequence, colors[Math.floor(Math.random() * colors.length)]]

      setGameState((prev) => ({
        ...prev,
        userSequence: [],
        currentRound: newRound,
        score: newScore,
        sequence: newSequence,
      }))

      setTimeout(() => playSequence(newSequence), 1000)
    } else {
      setGameState((prev) => ({ ...prev, userSequence: newUserSequence }))
    }
  }

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
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">Pattern Recognition Challenge</h1>
            <p className="text-muted-foreground">Test your memory against the AI</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Pattern Game</CardTitle>
              <CardDescription>Watch the sequence, then repeat it. How long can you go?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!gameState.isPlaying && !gameState.gameOver && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Test your pattern recognition skills!</p>
                  <Button onClick={startGame} size="lg">
                    Start Challenge
                  </Button>
                </div>
              )}

              {gameState.gameOver && (
                <div className="text-center py-8 space-y-4">
                  <div className="bg-destructive/20 text-destructive p-6 rounded-xl">
                    <Trophy className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-2xl font-bold mb-2">Game Over!</p>
                    <p className="text-lg">You reached round {gameState.currentRound}</p>
                    <p className="text-xl font-semibold mt-2">Final Score: {gameState.score}</p>
                  </div>
                  <Button onClick={startGame} size="lg">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}

              {gameState.isPlaying && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Round</p>
                      <p className="text-2xl font-bold text-primary">{gameState.currentRound}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-2xl font-bold">{gameState.score}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sequence Length</p>
                      <p className="text-2xl font-bold text-secondary">{gameState.sequence.length}</p>
                    </div>
                  </div>

                  {gameState.showSequence && (
                    <div className="bg-primary/10 text-primary p-4 rounded-lg text-center font-semibold">
                      Watch the sequence...
                    </div>
                  )}

                  {!gameState.showSequence && !gameState.gameOver && (
                    <div className="bg-accent/10 text-accent p-4 rounded-lg text-center font-semibold">
                      Your turn! Repeat the sequence ({gameState.userSequence.length}/{gameState.sequence.length})
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorClick(color)}
                        disabled={gameState.showSequence || gameState.gameOver}
                        className={`h-24 rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 ${colorStyles[color]} ${highlightedColor === color ? "scale-110 shadow-2xl ring-4 ring-white" : "shadow-lg"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">How AI Recognizes Patterns</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                AI excels at pattern recognition by analyzing sequences and finding relationships in data. This game
                demonstrates sequential pattern recognition, similar to how AI processes time-series data, language, and
                user behavior patterns. The longer the sequence, the more challenging it becomes!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
