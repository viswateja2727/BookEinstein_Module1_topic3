import Link from "next/link"
import { Brain, Network, TreeDeciduous, Target, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const activities = [
    {
      title: "AI Training Simulator",
      description: "Train your own AI to recognize patterns! See how AI learns from examples.",
      icon: Brain,
      href: "/activities/train-ai",
      color: "from-teal-400 to-emerald-500",
      difficulty: "Beginner",
    },
    {
      title: "Neural Network Explorer",
      description: "Watch how neural networks process information layer by layer.",
      icon: Network,
      href: "/activities/neural-network",
      color: "from-blue-400 to-blue-600",
      difficulty: "Intermediate",
    },
    {
      title: "Decision Tree Game",
      description: "Build decision trees and see how AI makes smart choices.",
      icon: TreeDeciduous,
      href: "/activities/decision-tree",
      color: "from-purple-400 to-purple-600",
      difficulty: "Beginner",
    },
    {
      title: "Pattern Recognition Challenge",
      description: "Compete against AI in finding patterns. Can you beat the machine?",
      icon: Target,
      href: "/activities/pattern-challenge",
      color: "from-cyan-400 to-cyan-600",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-cyan-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-balance">AI Learning Lab</h1>
              <p className="text-xs text-muted-foreground">Grades 8-12</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            My Progress
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            Interactive Learning Experience
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent text-balance">
            What is AI? How Does It Work?
          </h2>
          <p className="text-lg md:text-xl text-slate-700 text-pretty">
            Discover the fascinating world of Artificial Intelligence through hands-on games and activities. Learn by
            doing, not just reading!
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activities.map((activity) => (
            <Link key={activity.href} href={activity.href}>
              <Card className="group hover:border-cyan-300 transition-all hover:shadow-xl hover:-translate-y-1 h-full bg-white/90 backdrop-blur-sm border-cyan-200/50 rounded-3xl">
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <activity.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-balance text-slate-900">{activity.title}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                      {activity.difficulty}
                    </span>
                  </div>
                  <CardDescription className="text-pretty text-slate-600">{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl">
                    Start Activity →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-200/50 py-8 bg-white/60">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>Part of the AI Fundamentals Course • Interactive Learning Platform</p>
        </div>
      </footer>
    </div>
  )
}
