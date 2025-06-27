"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import ToolsHub from "@/components/tools-hub"
import Questionnaire from "@/components/questionnaire"
import ReportSection from "@/components/report-section"
import Image from "next/image"

export default function NBLKToolsHub() {
  const [currentView, setCurrentView] = useState<"landing" | "tools" | "questionnaire" | "report">("landing")
  const [selectedTool, setSelectedTool] = useState<string>("")
  const [answers, setAnswers] = useState<Array<{ question: string; answer: "Yes" | "No" }>>([])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStartTool = (toolName: string) => {
    setSelectedTool(toolName)
    setCurrentView("questionnaire")
    setAnswers([])
  }

  const handleQuestionnaireComplete = (toolAnswers: Array<{ question: string; answer: "Yes" | "No" }>) => {
    setAnswers(toolAnswers)
    setCurrentView("report")
  }

  const handleBackToTools = () => {
    setCurrentView("tools")
    setSelectedTool("")
    setAnswers([])
  }

  const handleBackToHome = () => {
    setCurrentView("landing")
    setSelectedTool("")
    setAnswers([])
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="flex items-center gap-3 hover:bg-transparent p-2"
            >
              <div className="relative w-8 h-8 rounded overflow-hidden">
                <Image src="/nblk-logo.jpeg" alt="NBLK Logo" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl">NBLK Tools Hub</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {/* Landing Page */}
          {currentView === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center relative overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(0, 100, 0, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(0, 100, 0, 0.1) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0"
                />
              </div>

              <div className="text-center z-10 max-w-4xl mx-auto px-4">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                >
                  Empower Your Business Clarity
                </motion.h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                  Choose a diagnostic tool to uncover insights and improve operations.
                </motion.p>

                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Button
                    size="lg"
                    onClick={() => setCurrentView("tools")}
                    className="text-lg px-8 py-6 rounded-full group bg-green-600 hover:bg-green-700"
                  >
                    Explore Tools
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Tools Hub */}
          {currentView === "tools" && (
            <ToolsHub key="tools" onStartTool={handleStartTool} onBackToLanding={() => setCurrentView("landing")} />
          )}

          {/* Questionnaire */}
          {currentView === "questionnaire" && (
            <Questionnaire
              key="questionnaire"
              toolName={selectedTool}
              onComplete={handleQuestionnaireComplete}
              onBack={handleBackToTools}
            />
          )}

          {/* Report Section */}
          {currentView === "report" && (
            <ReportSection
              key="report"
              toolName={selectedTool}
              answers={answers}
              questionCount={getQuestionCount(selectedTool)}
              onBackToTools={handleBackToTools}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function getQuestionCount(toolName: string): number {
  switch (toolName) {
    case "Data Hygiene & Business Clarity Diagnostic":
    case "Marketing Effectiveness Diagnostic":
    case "Cash Flow & Financial Clarity Diagnostic":
      return 10
    default:
      return 10
  }
}
