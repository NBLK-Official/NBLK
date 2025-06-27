"use client"

import { motion } from "framer-motion"
import { Database, TrendingUp, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ToolsHubProps {
  onStartTool: (toolName: string) => void
  onBackToLanding: () => void
}

const tools = [
  {
    name: "Data Hygiene & Business Clarity Diagnostic",
    icon: Database,
    description: "Diagnose issues with business data, systems, and flow to improve operational efficiency.",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    name: "Marketing Effectiveness Diagnostic",
    icon: TrendingUp,
    description: "Understand your customer feedback, digital reach, and campaign clarity for better ROI.",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    name: "Cash Flow & Financial Clarity Diagnostic",
    icon: DollarSign,
    description: "Spot inconsistencies and inefficiencies in financial operations and planning.",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
]

export default function ToolsHub({ onStartTool }: ToolsHubProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-12 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Select a Diagnostic Tool
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the area you'd like to analyze and get actionable insights for your business.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-6 p-4 rounded-2xl w-fit ${tool.bgColor}`}>
                    <tool.icon className={`h-10 w-10 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={() => onStartTool(tool.name)}
                    className="w-full group-hover:scale-105 transition-all duration-300 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Start Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
