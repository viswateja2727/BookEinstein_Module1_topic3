"use client"

import { useState } from "react"
import Link from "next/link"
import { Network, ArrowLeft, Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface NodeState {
  value: number
  active: boolean
}

export default function NeuralNetworkPage() {
  const [inputValues, setInputValues] = useState([5, 5])
  const [inputEmojis, setInputEmojis] = useState(["🎨", "🎵"])
  const [layerStates, setLayerStates] = useState<NodeState[][]>([
    [
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 0, active: false },
    ],
    [
      { value: 0, active: false },
      { value: 0, active: false },
    ],
    [{ value: 0, active: false }],
  ])
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeConnections, setActiveConnections] = useState<string[]>([])

  const emojiOptions = [
    ["🎨", "🎵", "📚", "⚽", "🎮"],
    ["🍕", "🍦", "🍎", "🥗", "🍰"],
  ]

  const processNetwork = async () => {
    setIsAnimating(true)
    setActiveConnections([])

    setActiveConnections(["input-0", "input-1"])
    await new Promise((resolve) => setTimeout(resolve, 400))

    const layer1 = inputValues.map((val, i) => {
      const processed = val * (0.5 + i * 0.2)
      return { value: Math.min(10, processed), active: true }
    })
    layer1.push({ value: (inputValues[0] + inputValues[1]) / 2, active: true })
    setLayerStates([layer1, layerStates[1], layerStates[2]])

    setActiveConnections(["layer1-0", "layer1-1", "layer1-2"])
    await new Promise((resolve) => setTimeout(resolve, 400))

    const layer2 = [
      { value: (layer1[0].value + layer1[1].value) / 2, active: true },
      { value: (layer1[1].value + layer1[2].value) / 2, active: true },
    ]
    setLayerStates([layer1, layer2, layerStates[2]])

    setActiveConnections(["layer2-0", "layer2-1"])
    await new Promise((resolve) => setTimeout(resolve, 400))

    const output = { value: (layer2[0].value + layer2[1].value) / 2, active: true }
    setLayerStates([layer1, layer2, [output]])

    setActiveConnections([])
    setIsAnimating(false)
  }

  const reset = () => {
    setInputValues([5, 5])
    setActiveConnections([])
    setLayerStates([
      [
        { value: 0, active: false },
        { value: 0, active: false },
        { value: 0, active: false },
      ],
      [
        { value: 0, active: false },
        { value: 0, active: false },
      ],
      [{ value: 0, active: false }],
    ])
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">Neural Network Explorer 🧠</h1>
            <p className="text-muted-foreground">Watch how information flows through a neural network</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Controls 🎮</CardTitle>
              <CardDescription>Pick your inputs and watch them travel through the brain!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Input 1: Choose an icon</label>
                <div className="flex gap-2 mb-3">
                  {emojiOptions[0].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setInputEmojis([emoji, inputEmojis[1]])}
                      className={`text-2xl p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                        inputEmojis[0] === emoji
                          ? "border-primary bg-primary/10 scale-110"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <label className="text-sm font-medium mb-2 block">Strength: {inputValues[0]}</label>
                <Slider
                  value={[inputValues[0]]}
                  onValueChange={(v) => setInputValues([v[0], inputValues[1]])}
                  max={10}
                  step={0.5}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Input 2: Choose an icon</label>
                <div className="flex gap-2 mb-3">
                  {emojiOptions[1].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setInputEmojis([inputEmojis[0], emoji])}
                      className={`text-2xl p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                        inputEmojis[1] === emoji
                          ? "border-primary bg-primary/10 scale-110"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <label className="text-sm font-medium mb-2 block">Strength: {inputValues[1]}</label>
                <Slider
                  value={[inputValues[1]]}
                  onValueChange={(v) => setInputValues([inputValues[0], v[0]])}
                  max={10}
                  step={0.5}
                />
              </div>
              <div className="pt-4 space-y-2">
                <Button onClick={processNetwork} disabled={isAnimating} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  {isAnimating ? "Processing... ⚡" : "Process Network 🚀"}
                </Button>
                <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Visualization 🌐</CardTitle>
              <CardDescription>
                Each circle is a neuron. Watch the values propagate through the network!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <defs>
                    <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {isAnimating && (
                    <>
                      <line
                        x1="15%"
                        y1="30%"
                        x2="35%"
                        y2="20%"
                        stroke="url(#connection-gradient)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <line
                        x1="15%"
                        y1="30%"
                        x2="35%"
                        y2="50%"
                        stroke="url(#connection-gradient)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <line
                        x1="15%"
                        y1="70%"
                        x2="35%"
                        y2="50%"
                        stroke="url(#connection-gradient)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <line
                        x1="15%"
                        y1="70%"
                        x2="35%"
                        y2="80%"
                        stroke="url(#connection-gradient)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    </>
                  )}
                </svg>

                <div className="flex items-center justify-around min-h-[450px] p-4 relative" style={{ zIndex: 1 }}>
                  <div className="flex flex-col gap-12">
                    <div className="text-xs font-semibold text-center mb-2">Input Layer 📥</div>
                    {inputValues.map((val, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex flex-col items-center justify-center font-bold shadow-lg hover:scale-105 transition-transform">
                          <span className="text-2xl">{inputEmojis[i]}</span>
                          <span className="text-xs">{val.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="text-xs font-semibold text-center mb-2">Hidden Layer 1 ✨</div>
                    {layerStates[0].map((node, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500 ${
                          node.active
                            ? "bg-gradient-to-br from-purple-500 to-pink-600 text-white scale-110 animate-pulse"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {node.active ? node.value.toFixed(1) : "•"}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-12">
                    <div className="text-xs font-semibold text-center mb-2">Hidden Layer 2 💫</div>
                    {layerStates[1].map((node, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500 ${
                          node.active
                            ? "bg-gradient-to-br from-orange-500 to-red-600 text-white scale-110 animate-pulse"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {node.active ? node.value.toFixed(1) : "•"}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="text-xs font-semibold text-center mb-2">Output 🎯</div>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-500 ${
                          layerStates[2][0].active
                            ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-125 animate-bounce"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {layerStates[2][0].active ? (
                          <div className="flex flex-col items-center">
                            <span className="text-2xl">🎉</span>
                            <span className="text-sm">{layerStates[2][0].value.toFixed(1)}</span>
                          </div>
                        ) : (
                          "?"
                        )}
                      </div>
                      {layerStates[2][0].active && (
                        <div className="text-xs font-semibold text-green-600 animate-pulse">Success!</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">How Neural Networks Work 🤖</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Neural networks process information in layers:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Input Layer 📥:</strong> Receives the initial data (like your choices!)
              </li>
              <li>
                <strong>Hidden Layers ✨:</strong> Process and transform the data through mathematical operations
              </li>
              <li>
                <strong>Output Layer 🎯:</strong> Produces the final result
              </li>
            </ul>
            <p className="pt-2">
              Each connection between neurons has a weight that determines how much influence it has. Real neural
              networks can have thousands or millions of these connections!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
