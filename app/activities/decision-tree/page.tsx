"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { TreeDeciduous, ArrowLeft, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface TreeNode {
  id: number
  question: string
  emoji: string
  yesChild: TreeNode | null
  noChild: TreeNode | null
  isLeaf: boolean
  result?: string
  resultEmoji?: string
}

export default function DecisionTreePage() {
  const [currentNode, setCurrentNode] = useState<TreeNode>({
    id: 1,
    question: "Is it a living thing?",
    emoji: "🌱",
    yesChild: null,
    noChild: null,
    isLeaf: false,
  })
  const [mode, setMode] = useState<"build" | "play">("build")
  const [path, setPath] = useState<{ question: string; choice: string; emoji: string }[]>([])
  const [playNode, setPlayNode] = useState<TreeNode | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [newEmoji, setNewEmoji] = useState("❓")
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<"yes" | "no" | null>(null)

  const questionEmojis = ["❓", "🤔", "💭", "🎯", "🔍", "👀", "🌟", "💡"]
  const resultEmojis = ["🐶", "🐱", "🐍", "🦁", "🌳", "💻", "📱", "🪨", "🍕", "🍦", "⚽", "🎮"]

  const addNode = (
    parent: TreeNode,
    branch: "yes" | "no",
    question: string,
    emoji: string,
    isLeaf: boolean,
    result?: string,
    resultEmoji?: string,
  ) => {
    const newNode: TreeNode = {
      id: Date.now(),
      question,
      emoji,
      yesChild: null,
      noChild: null,
      isLeaf,
      result: isLeaf ? result : undefined,
      resultEmoji: isLeaf ? resultEmoji : undefined,
    }

    if (branch === "yes") {
      parent.yesChild = newNode
    } else {
      parent.noChild = newNode
    }

    setCurrentNode({ ...currentNode })
    setSelectedNode(null)
    setSelectedBranch(null)
    setNewQuestion("")
    setNewEmoji("❓")
  }

  const startPlaying = () => {
    setMode("play")
    setPlayNode(currentNode)
    setPath([])
  }

  const makeChoice = (choice: "yes" | "no") => {
    if (!playNode) return

    setPath([...path, { question: playNode.question, choice: choice.toUpperCase(), emoji: playNode.emoji }])

    const nextNode = choice === "yes" ? playNode.yesChild : playNode.noChild

    if (nextNode) {
      setPlayNode(nextNode)
    } else {
      setPlayNode(null)
    }
  }

  const reset = () => {
    setMode("build")
    setPlayNode(null)
    setPath([])
  }

  const renderNode = (node: TreeNode | null, depth = 0): React.JSX.Element | null => {
    if (!node) return null

    return (
      <div className="flex flex-col items-center gap-2" style={{ marginLeft: depth * 20 }}>
        <Card
          className={`min-w-[180px] transition-all hover:scale-105 cursor-pointer ${
            node.isLeaf
              ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300"
              : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
          }`}
        >
          <CardContent className="pt-4 pb-4 px-4">
            <div className="text-3xl text-center mb-2">{node.emoji}</div>
            <p className="text-sm font-medium text-center">{node.question}</p>
            {node.isLeaf && node.result && (
              <div className="mt-2 pt-2 border-t border-green-300">
                {node.resultEmoji && <div className="text-2xl text-center mb-1">{node.resultEmoji}</div>}
                <p className="text-xs text-center font-semibold text-green-700">{node.result}</p>
              </div>
            )}
          </CardContent>
        </Card>
        {!node.isLeaf && (
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">👍 YES</div>
              {node.yesChild ? (
                renderNode(node.yesChild, depth + 1)
              ) : (
                <button
                  onClick={() => {
                    setSelectedNode(node)
                    setSelectedBranch("yes")
                  }}
                  className="w-16 h-16 border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center hover:bg-green-50 transition-colors"
                >
                  <Plus className="w-6 h-6 text-green-500" />
                </button>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">👎 NO</div>
              {node.noChild ? (
                renderNode(node.noChild, depth + 1)
              ) : (
                <button
                  onClick={() => {
                    setSelectedNode(node)
                    setSelectedBranch("no")
                  }}
                  className="w-16 h-16 border-2 border-dashed border-red-400 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Plus className="w-6 h-6 text-red-500" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
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
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
            <TreeDeciduous className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">Decision Tree Game 🌳</h1>
            <p className="text-muted-foreground">Build decision trees to see how AI makes choices</p>
          </div>
        </div>

        {mode === "build" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Decision Tree 🏗️</CardTitle>
                <CardDescription>Click the + buttons to add branches for Yes/No answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto pb-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6">
                  {renderNode(currentNode)}
                </div>

                {selectedNode && selectedBranch && (
                  <Card className="border-primary bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Add New Node to {selectedBranch === "yes" ? "YES 👍" : "NO 👎"} Branch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Choose an emoji</label>
                        <div className="flex gap-2 flex-wrap">
                          {[...questionEmojis, ...resultEmojis].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => setNewEmoji(emoji)}
                              className={`text-2xl p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                                newEmoji === emoji
                                  ? "border-primary bg-primary/10 scale-110"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Question or Result</label>
                        <Input
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          placeholder="e.g., Does it have fur? or Dog"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => addNode(selectedNode, selectedBranch, newQuestion, newEmoji, false)}
                          disabled={!newQuestion}
                          className="flex-1"
                        >
                          Add Question Node
                        </Button>
                        <Button
                          onClick={() =>
                            addNode(selectedNode, selectedBranch, newQuestion, newEmoji, true, newQuestion, newEmoji)
                          }
                          disabled={!newQuestion}
                          variant="secondary"
                          className="flex-1"
                        >
                          Add Result Node
                        </Button>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedNode(null)
                          setSelectedBranch(null)
                        }}
                        variant="ghost"
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Start */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Quick Start 🚀</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => {
                        addNode(currentNode, "yes", "Does it have fur?", "🐾", false)
                        addNode(currentNode, "no", "Is it electronic?", "⚡", false)
                        if (currentNode.yesChild) {
                          addNode(currentNode.yesChild, "yes", "Dog", "🐶", true, "It's a Dog!", "🐶")
                          addNode(currentNode.yesChild, "no", "Snake", "🐍", true, "It's a Snake!", "🐍")
                        }
                        if (currentNode.noChild) {
                          addNode(currentNode.noChild, "yes", "Computer", "💻", true, "It's a Computer!", "💻")
                          addNode(currentNode.noChild, "no", "Rock", "🪨", true, "It's a Rock!", "🪨")
                        }
                      }}
                      variant="outline"
                      className="h-auto py-4 flex-col items-start"
                    >
                      <span className="font-semibold">🎯 Add Sample Tree</span>
                      <span className="text-xs text-muted-foreground">Creates a complete example</span>
                    </Button>
                    <Button onClick={startPlaying} size="lg" disabled={!currentNode.yesChild && !currentNode.noChild}>
                      <Play className="w-4 h-4 mr-2" />
                      Play the Game! 🎮
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How Decision Trees Work */}
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">How Decision Trees Work 🧠</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Decision trees help AI make choices by asking a series of yes/no questions. Each question splits the
                  possibilities until we reach a final answer. This is how many AI systems classify things into
                  categories!
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigate the Decision Tree 🧭</CardTitle>
                <CardDescription>Answer each question to follow the tree to a result</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {path.length > 0 && (
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                      <CardContent className="pt-4">
                        <p className="text-xs font-semibold text-blue-700 mb-3">Your Journey 🗺️:</p>
                        <div className="space-y-2">
                          {path.map((step, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/60 rounded-lg p-2">
                              <span className="text-xl">{step.emoji}</span>
                              <span className="text-sm flex-1">{step.question}</span>
                              <span
                                className={`text-xs font-bold px-2 py-1 rounded ${
                                  step.choice === "YES" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                              >
                                {step.choice}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {playNode ? (
                    <div className="space-y-4">
                      <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 border-2">
                        <CardContent className="pt-6 pb-6">
                          <div className="text-5xl text-center mb-4">{playNode.emoji}</div>
                          <p className="text-xl font-semibold text-center text-balance">{playNode.question}</p>
                        </CardContent>
                      </Card>

                      {playNode.isLeaf ? (
                        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 border-2">
                          <CardContent className="pt-6 pb-6 text-center">
                            <div className="text-6xl mb-4 animate-bounce">{playNode.resultEmoji || "🎉"}</div>
                            <p className="text-sm text-green-700 mb-2">Final Result:</p>
                            <p className="text-3xl font-bold text-green-800">{playNode.result}</p>
                            <div className="mt-4 text-4xl">✨ 🎊 ✨</div>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            onClick={() => makeChoice("yes")}
                            size="lg"
                            className="h-24 text-lg bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform"
                          >
                            <span className="flex flex-col items-center gap-2">
                              <span className="text-2xl">👍</span>
                              <span>YES</span>
                            </span>
                          </Button>
                          <Button
                            onClick={() => makeChoice("no")}
                            size="lg"
                            className="h-24 text-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform"
                          >
                            <span className="flex flex-col items-center gap-2">
                              <span className="text-2xl">👎</span>
                              <span>NO</span>
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // No further nodes! Add more branches to continue.
                    <div className="bg-muted p-8 rounded-xl text-center">
                      <p className="text-muted-foreground mb-4">No further nodes! Add more branches to continue.</p>
                    </div>
                  )}
                </div>

                {/* Back to Building */}
                <div className="pt-4 border-t">
                  <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                    Back to Building 🏗️
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
