'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs'
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function HeroSection() {
  const { isSignedIn } = useAuth()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/80">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-primary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Website Analysis
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
          >
            Transform Your Landing Page Into a
            <br />
            Conversion Machine
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Get instant AI-powered insights to optimize your website's copywriting, 
            layout, and user experience. Boost conversions with data-driven recommendations.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            {isSignedIn ? (
              <Button asChild size="lg" className="group">
                <Link href="/analyzer">
                  Go to Analyzer
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </SignInButton>
              </>
            )}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Lightning Fast</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get insights in seconds</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Actionable Insights</h3>
              <p className="mt-1 text-sm text-muted-foreground">Specific recommendations</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">AI-Powered</h3>
              <p className="mt-1 text-sm text-muted-foreground">Latest AI technology</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}