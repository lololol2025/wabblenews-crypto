import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { validateArticle, createSlug, sanitizeInput } from '@/lib/validation'
import { rateLimit } from '@/lib/rateLimit'

// GET all articles (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    const where = {
      published: true,
      ...(category && { category }),
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      articles,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Get articles error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST new article (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting for article creation
    const rateLimitResult = rateLimit(`create-article:${auth.adminId}`, 10, 60000)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { title, content, category, imageUrl, sentiment } = body

    // Validate input
    const validation = validateArticle({ title, content, category })
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedTitle = sanitizeInput(title)
    const sanitizedContent = sanitizeInput(content)
    const sanitizedCategory = sanitizeInput(category)
    const sanitizedSentiment = sentiment && ['positive', 'negative', 'neutral'].includes(sentiment) 
      ? sentiment 
      : 'neutral'

    // Generate unique slug
    let slug = createSlug(sanitizedTitle)
    let slugCounter = 1
    
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${createSlug(sanitizedTitle)}-${slugCounter}`
      slugCounter++
    }

    const article = await prisma.article.create({
      data: {
        title: sanitizedTitle,
        content: sanitizedContent,
        category: sanitizedCategory,
        sentiment: sanitizedSentiment,
        imageUrl: imageUrl || null,
        slug,
        authorId: auth.adminId,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

