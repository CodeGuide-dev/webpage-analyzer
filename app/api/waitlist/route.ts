import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
}

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
})

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP.trim()
  }
  
  return 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return true
  }
  
  if (now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return true
  }
  
  if (entry.count >= RATE_LIMIT.max) {
    return false
  }
  
  entry.count += 1
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = waitlistSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist.' },
        { status: 409 }
      )
    }

    // Add to waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()
      .single()

    if (error) {
      console.error('Error adding to waitlist:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data },
      { status: 201 }
    )

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    if (!z.string().email().safeParse(email).success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { data } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    return NextResponse.json(
      { exists: !!data },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error checking waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}