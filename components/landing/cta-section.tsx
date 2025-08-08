'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs'
import { ArrowRight, Star, Check } from 'lucide-react'
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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content: "This tool helped us increase our landing page conversion rate by 47% in just two weeks. The AI insights are incredibly actionable.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "GrowthLabs",
    content: "Finally, an AI tool that actually understands landing page optimization. The recommendations are spot-on and easy to implement.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignFlow",
    content: "The visual layout analysis caught issues we hadn't noticed. Our bounce rate dropped significantly after implementing the suggestions.",
    rating: 5
  }
]

export function CTASection() {
  const { isSignedIn } = useAuth()

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={itemVariants}>
            <div className="mb-8 flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-muted-foreground">
              Trusted by 10,000+ marketers and developers
            </p>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Start Optimizing Your Landing Page Today
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Join thousands of professionals who use our AI-powered tool to create 
            high-converting landing pages. Get started in less than 30 seconds.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            {isSignedIn ? (
              <Button asChild size="lg" className="group">
                <Link href="/analyzer">
                  Start Analyzing
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
            className="mx-auto mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}