"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuestionnaireProps {
  toolName: string
  onComplete: (answers: Array<{ question: string; answer: "Yes" | "No" }>) => void
  onBack: () => void
}

const questions = {
  "Data Hygiene & Business Clarity Diagnostic": [
    "Do you have a centralized place where you keep all your customer or business information?",
    "Do you track sales, expenses, and customer info in one integrated system?",
    "Is it challenging to keep your business data organized and under control?",
    "Do you have to enter the same information into multiple systems?",
    "Do your business tools (sales, inventory, accounting) communicate with each other?",
    "Do you have unused data sitting around that could provide valuable insights?",
    "Is it difficult to find or understand your historical business information?",
    "Do you use dedicated tools to understand your money flow and budget?",
    "Do your business reports sometimes contain errors or missing information?",
    "Do you use a systematic approach to track and manage customer leads?",
  ],
  "Marketing Effectiveness Diagnostic": [
    "Is it difficult to measure if your advertising or email campaigns are working?",
    "Do you use digital tools to target specific customer segments effectively?",
    "Do you actively track and respond to customer feedback and complaints?",
    "Have you analyzed how customers find you and optimized your marketing accordingly?",
    "Do you regularly gather customer feedback to improve your products or services?",
    "Do you research competitor pricing before setting your own prices?",
    "Do you consistently monitor and respond to online reviews?",
    "Do you have a systematic process for collecting customer feedback?",
    "Is your brand message clear and consistent across all channels?",
    "Have you clearly identified and defined your ideal customer profile?",
  ],
  "Cash Flow & Financial Clarity Diagnostic": [
    "Do you have a detailed forecast for your next 3 months of cash flow?",
    "Do you systematically track overdue payments and follow up automatically?",
    "Can you easily determine when you can afford a new hire or major expense?",
    "Do you reconcile your financial records on a monthly basis?",
    "Do you regularly analyze income vs. expenses to identify trends?",
    "Are your vendors and contractors consistently paid on time?",
    "Is your profit margin consistent across different products or services?",
    "Do you maintain a financial buffer for unexpected expenses or emergencies?",
    "Can you access your financial data from anywhere when needed?",
    "Do you generate comprehensive monthly financial reports automatically?",
  ],
}

export default function Questionnaire({ toolName, onComplete, onBack }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Array<{ question: string; answer: "Yes" | "No" }>>([])
  const [showExitModal, setShowExitModal] = useState(false)

  const toolQuestions = questions[toolName as keyof typeof questions] || []
  const answeredQuestions = answers.length
  const progress = (answeredQuestions / toolQuestions.length) * 100

  const handleAnswer = (answer: "Yes" | "No") => {
    const newAnswer = {
      question: toolQuestions[currentQuestion],
      answer,
    }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < toolQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const handleBackToTools = () => {
    if (answers.length > 0) {
      setShowExitModal(true)
    } else {
      onBack()
    }
  }

  const confirmExit = () => {
    setShowExitModal(false)
    onBack()
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Button variant="ghost" size="sm" onClick={handleBackToTools} className="p-0 h-auto font-normal">
              Tools Hub
            </Button>
            <span>/</span>
            <span className="text-foreground font-medium">{toolName}</span>
            <span>/</span>
            <span className="text-foreground font-medium">Question {currentQuestion + 1}</span>
          </nav>

          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">{toolName}</h1>
              <div className="flex items-center gap-4">
                {currentQuestion > 0 && (
                  <Button variant="outline" size="sm" onClick={handlePreviousQuestion}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleBackToTools}>
                  <Home className="h-4 w-4 mr-1" />
                  Tools Hub
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {answeredQuestions} of {toolQuestions.length} answered
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8 border-2">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="mb-8">
                  <div className="text-sm text-muted-foreground mb-4">
                    Question {currentQuestion + 1} of {toolQuestions.length}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-relaxed max-w-3xl mx-auto">
                    {toolQuestions[currentQuestion]}
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button
                    size="lg"
                    onClick={() => handleAnswer("Yes")}
                    className="flex-1 py-6 text-lg bg-green-600 hover:bg-green-700 text-white group"
                  >
                    <Check className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Yes
                  </Button>

                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => handleAnswer("No")}
                    className="flex-1 py-6 text-lg group"
                  >
                    <X className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    No
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: toolQuestions.length }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < answeredQuestions
                    ? "bg-green-600"
                    : index === currentQuestion
                      ? "bg-primary ring-2 ring-primary/30"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete • {toolQuestions.length - answeredQuestions} questions remaining
          </p>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg p-6 max-w-md w-full border"
            >
              <h3 className="text-lg font-semibold mb-2">Leaving now?</h3>
              <p className="text-muted-foreground mb-4">
                You'll lose your progress! You've already answered {answers.length} question
                {answers.length !== 1 ? "s" : ""}.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowExitModal(false)} className="flex-1">
                  Continue Quiz
                </Button>
                <Button variant="destructive" onClick={confirmExit} className="flex-1">
                  Exit Anyway
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
