import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// This endpoint initializes the first admin account
export async function GET() {
  try {
    // Check if any admin exists
    const adminCount = await prisma.admin.count()
    
    if (adminCount > 0) {
      return NextResponse.json(
        { message: 'Admin already exists', adminCount },
        { status: 200 }
      )
    }

    const email = process.env.ADMIN_EMAIL || 'admin@wabblenews.com'
    const password = process.env.ADMIN_PASSWORD || 'Admin123!@#'

    const hashedPassword = await hashPassword(password)

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
      },
    })

    return NextResponse.json({
      message: 'Admin account created successfully',
      email: admin.email,
    })
  } catch (error) {
    console.error('Init error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}




