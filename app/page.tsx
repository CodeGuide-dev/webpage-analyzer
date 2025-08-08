"use client"

import { AuroraBackground } from '@/components/ui/aurora-background'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import { useState } from 'react'
import { AnalysisResult } from '@/components/analysis-result'
import { Button } from '@/components/ui/button'
import { Download, Loader2, X, Sparkles, Zap, BarChart3, Target, ArrowRight, ChevronDown } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useLocalStorage } from 'usehooks-ts'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface Report {
  url: string
  analysis: string
  timestamp: number
}

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reports, setReports] = useLocalStorage<Report[]>('webpage-reports', [])
  const [expandedReports, setExpandedReports] = useState<Set<number>>(new Set())

  const placeholders = [
    "Enter a website URL to analyze (e.g., https://example.com)",
    "Let's analyze your website content",
    "Get insights about your website's copywriting",
    "Discover layout improvement suggestions",
    "Find out how to enhance your website",
  ]

  const handleChange = () => {
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.querySelector('input') as HTMLInputElement
    const url = input.value.trim()

    if (!url) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze website')
      }

      const { analysis } = await response.json()
      
      // Add new report to the beginning of the list
      setReports(prevReports => [{
        url,
        analysis,
        timestamp: Date.now()
      }, ...prevReports])
      
    } catch {
      setError('Failed to analyze the website. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownload = (report: Report) => {
    const blob = new Blob([report.analysis], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis-report-${new Date(report.timestamp).toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleReport = (timestamp: number) => {
    setExpandedReports(prev => {
      const newSet = new Set(prev)
      if (newSet.has(timestamp)) {
        newSet.delete(timestamp)
      } else {
        newSet.add(timestamp)
      }
      return newSet
    })
  }

  const handleClose = (timestamp: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedReports(prev => {
      const newSet = new Set(prev)
      newSet.delete(timestamp)
      return newSet
    })
  }

  return (
    <AuroraBackground>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className={`flex flex-col items-center justify-center px-4 ${reports.length === 0 ? 'flex-1' : 'py-12'} gap-8 relative`}>
          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-8 w-8 text-blue-400" />
          </motion.div>
          
          <motion.div
            className="absolute top-32 right-16 opacity-20"
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Zap className="h-6 w-6 text-purple-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-40 left-16 opacity-20"
            animate={{
              y: [-5, 15, -5],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <BarChart3 className="h-7 w-7 text-green-400" />
          </motion.div>

          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-8xl font-bold dark:text-white text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Landing Page
              </h1>
              <h1 className="text-4xl md:text-8xl font-bold dark:text-white text-center mt-2">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  Content Analyzer
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-light text-lg md:text-2xl dark:text-neutral-300 text-center max-w-3xl mx-auto leading-relaxed"
            >
              Unlock the secrets of high-converting landing pages with{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-powered insights
              </span>
              {" "}that transform your content and boost engagement
            </motion.p>
          </motion.div>

          {/* Features Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full px-4 mb-8"
          >
            {[
              { icon: Target, title: "Smart Analysis", desc: "AI-driven content evaluation" },
              { icon: Zap, title: "Instant Results", desc: "Get insights in seconds" },
              { icon: BarChart3, title: "Actionable Data", desc: "Clear improvement suggestions" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <Card className="bg-background/20 backdrop-blur-sm border-border/50 hover:bg-background/30 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="w-full max-w-2xl space-y-4"
          >
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                No signup required • Get instant analysis
                <Sparkles className="h-4 w-4" />
              </p>
            </motion.div>
          </motion.div>

          {/* Loading State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 text-lg bg-background/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-5 w-5" />
              </motion.div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                Analyzing your page...
              </span>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="max-w-2xl bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800">
                <AlertDescription className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          {/* Scroll indicator */}
          {reports.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-sm">View your reports</span>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.div>
          )}
        </div>

        {reports.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full px-4 pb-8"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Analysis Reports
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Click on any report to view detailed insights and download your analysis
                </p>
              </motion.div>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => {
                  const isExpanded = expandedReports.has(report.timestamp);
                  return (
                    <motion.div
                      key={report.timestamp}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`relative bg-gradient-to-br from-background/60 to-background/40 backdrop-blur-md rounded-xl p-6 space-y-4 border border-border/50 hover:border-border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl group ${
                        isExpanded ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-br from-blue-50/5 to-purple-50/5' : ''
                      }`}
                      onClick={() => toggleReport(report.timestamp)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <h2 className="text-lg font-semibold truncate group-hover:text-blue-600 transition-colors">
                                {report.url}
                              </h2>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                          
                          {isExpanded ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex gap-2 flex-shrink-0"
                            >
                              <Button 
                                variant="outline" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(report);
                                }}
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleClose(report.timestamp, e)}
                                className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div
                              className="text-muted-foreground group-hover:text-blue-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              <ArrowRight className="h-5 w-5" />
                            </motion.div>
                          )}
                        </div>
                        
                        {!isExpanded && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 rounded-lg px-3 py-2">
                            <Sparkles className="h-4 w-4" />
                            Click to view analysis
                          </div>
                        )}
                      </div>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border/50 pt-4"
                        >
                          <div className="max-h-[600px] overflow-y-auto rounded-lg bg-muted/10 border border-border/30">
                            <div className="prose prose-sm dark:prose-invert prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border max-w-none p-6">
                              <AnalysisResult markdown={report.analysis} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AuroraBackground>
  )
}