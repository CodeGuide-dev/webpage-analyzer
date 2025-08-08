'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Eye, 
  BarChart3, 
  Users, 
  Smartphone, 
  Clock,
  Download,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Copywriting Analysis',
    description: 'AI analyzes your landing page copy for clarity, persuasiveness, and conversion optimization.',
    points: ['Headline effectiveness', 'CTA optimization', 'Tone and voice consistency']
  },
  {
    icon: Eye,
    title: 'Visual Layout Review',
    description: 'Get insights on visual hierarchy, spacing, and design elements that impact user experience.',
    points: ['Visual hierarchy', 'Whitespace usage', 'Color psychology']
  },
  {
    icon: BarChart3,
    title: 'Performance Metrics',
    description: 'Track improvements with before/after comparisons and actionable performance metrics.',
    points: ['Conversion predictions', 'Load time impact', 'SEO suggestions']
  },
  {
    icon: Users,
    title: 'User Experience Focus',
    description: 'Understand how users interact with your page and identify friction points.',
    points: ['Navigation flow', 'Mobile responsiveness', 'Accessibility checks']
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimization',
    description: 'Ensure your landing page performs perfectly on all devices with mobile-first insights.',
    points: ['Responsive design', 'Touch targets', 'Loading optimization']
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Get comprehensive analysis results in seconds, not hours or days.',
    points: ['Real-time analysis', 'Immediate feedback', 'Quick iterations']
  }
]

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

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Optimize Your Landing Page
          </motion.h2>
          
          <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
            Comprehensive analysis tools that help you create high-converting landing pages 
            with actionable insights powered by AI.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Join thousands of marketers and developers who use our tool to optimize their landing pages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}