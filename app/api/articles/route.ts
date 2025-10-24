import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Advanced sentiment analysis function
function analyzeSentiment(text: string): { sentiment: string; intensity: string } {
  try {
    // Advanced keyword-based sentiment analysis
    const veryPositiveWords = ['moon', 'pump', 'surge', 'rally', 'breakout', 'breakthrough', 'explosive', 'massive', 'huge', 'incredible', 'amazing', 'revolutionary', 'game-changing', 'record-breaking', 'skyrocket', 'soar', 'explode', 'parabolic', 'unstoppable']
    const positiveWords = ['bullish', 'gain', 'up', 'rise', 'increase', 'growth', 'profit', 'win', 'success', 'positive', 'good', 'great', 'excellent', 'strong', 'robust', 'optimistic', 'hopeful', 'confident', 'promising', 'encouraging']
    const veryNegativeWords = ['crash', 'dump', 'collapse', 'plunge', 'disaster', 'catastrophic', 'devastating', 'panic', 'fear', 'terror', 'worst', 'horrible', 'terrible', 'awful', 'disastrous', 'cataclysmic', 'meltdown', 'bloodbath']
    const negativeWords = ['bearish', 'fall', 'drop', 'decline', 'down', 'loss', 'negative', 'bad', 'weak', 'poor', 'declining', 'falling', 'decreasing', 'worrying', 'concerning', 'pessimistic', 'dismal', 'grim']

    const lowerText = text.toLowerCase()

    const veryPositiveCount = veryPositiveWords.filter(word => lowerText.includes(word)).length
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const veryNegativeCount = veryNegativeWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

    const totalPositive = veryPositiveCount * 2 + positiveCount
    const totalNegative = veryNegativeCount * 2 + negativeCount

    if (totalPositive > totalNegative + 2) {
      return veryPositiveCount > positiveCount ? { sentiment: 'very-positive', intensity: 'very-high' } : { sentiment: 'positive', intensity: 'high' }
    }
    if (totalNegative > totalPositive + 2) {
      return veryNegativeCount > negativeCount ? { sentiment: 'very-negative', intensity: 'very-high' } : { sentiment: 'negative', intensity: 'high' }
    }
    if (totalPositive > totalNegative) return { sentiment: 'positive', intensity: 'medium' }
    if (totalNegative > totalPositive) return { sentiment: 'negative', intensity: 'medium' }

    return { sentiment: 'neutral', intensity: 'low' }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return { sentiment: 'neutral', intensity: 'low' }
  }
}

// GET all articles (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    // Try to connect to database, but don't fail if it doesn't work
    try {
      const where = {
        published: true,
        ...(category && { category }),
      }

      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where,
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
    } catch (dbError) {
      console.log('Database not available, returning sample articles')
      
      // Return advanced sample articles if database is not available
      const sampleArticles = [
        {
          id: 'sample-1',
          title: 'Bitcoin Skyrockets to Record-Breaking $108,000',
          content: 'Bitcoin has achieved an unprecedented milestone, surging past $108,000 in a massive parabolic move that has left analysts and investors stunned worldwide. This incredible breakthrough represents not just another price target, but a fundamental shift in how global finance perceives and adopts digital assets. The rally was fueled by a perfect storm of factors: major institutional investors like BlackRock and Fidelity increasing their Bitcoin holdings, several countries announcing plans to add BTC to their national reserves, and the halving event creating supply scarcity. Trading volumes across major exchanges hit all-time highs as retail and institutional FOMO intensified. Market analysts predict this is just the beginning of a super cycle, with some projecting targets of $150,000 or higher by year-end. The momentum appears unstoppable as Bitcoin dominance reaches new multi-year highs, solidifying its position as digital gold and a legitimate store of value in an increasingly uncertain economic landscape.',
          category: 'Breaking News',
          sentiment: analyzeSentiment('Bitcoin Skyrockets to Record-Breaking $108,000 massive parabolic move incredible breakthrough unstoppable').sentiment,
          sentimentIntensity: analyzeSentiment('Bitcoin Skyrockets to Record-Breaking $108,000 massive parabolic move incredible breakthrough unstoppable').intensity,
          imageUrl: null,
          createdAt: new Date().toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-2',
          title: 'Ethereum Merge Completes Successfully - Energy Use Plummets',
          content: 'The Ethereum network has successfully completed its highly anticipated merge, marking one of the most significant technological achievements in blockchain history. The transition from energy-intensive proof-of-work to efficient proof-of-stake consensus has reduced the network\'s energy consumption by an astonishing 99.95%, addressing one of the primary criticisms of cryptocurrency from environmental advocates. This game-changing upgrade not only makes Ethereum dramatically more sustainable but also lays the groundwork for future scaling solutions like sharding, which will improve transaction throughput by orders of magnitude. The merge went smoothly without any major technical hiccups, a testament to years of careful planning and testing by the Ethereum Foundation and core developers. ETH price surged 12% on the news as investors recognized the long-term implications for network economics and adoption. The successful merge positions Ethereum as the clear leader in smart contract platforms and strengthens its narrative as the backbone of decentralized finance, NFTs, and Web3 applications.',
          category: 'Technology',
          sentiment: analyzeSentiment('Ethereum Merge Completes Successfully revolutionary game-changing upgrade astonishing sustainability efficiency').sentiment,
          sentimentIntensity: analyzeSentiment('Ethereum Merge Completes Successfully revolutionary game-changing upgrade astonishing sustainability efficiency').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-3',
          title: 'Market Alert: Extreme Volatility Expected as Fed Meeting Approaches',
          content: 'Cryptocurrency markets are bracing for significant turbulence as the Federal Reserve prepares to announce its latest monetary policy decision this Wednesday. Historical patterns show that Fed meetings consistently trigger sharp price swings in risk assets, and Bitcoin is no exception. Market sentiment has turned cautious with the Fear & Greed Index dropping to 35, indicating growing nervousness among traders. The primary concern is that the Fed might signal more aggressive rate hikes than expected, which would strengthen the dollar and put downward pressure on crypto prices. Some analysts are warning of a potential 15-20% correction if the announcement disappoints bulls. However, others argue that much of the negative news is already priced in, and a neutral or dovish statement could actually trigger a relief rally. Derivatives data shows increased put option activity, suggesting institutional players are hedging against downside risk. Traders are advised to tighten stop losses, avoid excessive leverage, and consider taking profits on leveraged positions ahead of the announcement.',
          category: 'Market Analysis',
          sentiment: analyzeSentiment('Market Alert Extreme Volatility Expected turmoil significant downside pressure caution risk').sentiment,
          sentimentIntensity: analyzeSentiment('Market Alert Extreme Volatility Expected turmoil significant downside pressure caution risk').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-4',
          title: 'Solana Network Suffers Major Outage - Community Raises Concerns',
          content: 'The Solana blockchain experienced another significant network outage lasting over 12 hours, marking the eighth major downtime incident since 2021. The disruption began at 3:47 AM UTC when block production suddenly halted due to what developers described as a "resource exhaustion" issue in the validator network. Thousands of users were unable to access their funds or complete transactions during the outage, with some reporting losses on time-sensitive DeFi positions and liquidations. The incident has reignited debates about Solana\'s architectural trade-offs between speed and reliability. While the network is known for its blazing-fast transaction speeds and low fees, critics argue these come at the cost of decentralization and stability. The SOL token dropped 8% immediately following the outage and continued sliding to -15% over the next 24 hours as confidence wavered. Solana Labs has committed to implementing additional safeguards and improving network resilience, but skeptics question whether fundamental design choices will continue to plague the protocol.',
          category: 'Network Issues',
          sentiment: analyzeSentiment('Solana Outage Sparks Community Outrage catastrophic widespread backlash serious concerns plunged').sentiment,
          sentimentIntensity: analyzeSentiment('Solana Outage Sparks Community Outage catastrophic widespread backlash serious concerns plunged').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-5',
          title: 'Technical Analysis: Golden Cross Formation Signals Bull Run Potential',
          content: 'Bitcoin has formed a textbook golden cross pattern on the daily chart, with the 50-day moving average crossing above the 200-day moving average for the first time in eight months. This classic bullish technical indicator has historically preceded significant price rallies, with previous golden crosses in 2019 and 2020 leading to gains of 150% and 400% respectively over the following 12 months. The signal is particularly noteworthy because it\'s being confirmed by multiple other technical indicators: the RSI is showing bullish divergence, MACD has flipped positive, and volume profiles suggest strong accumulation at current levels. On-chain metrics add further credence to the bullish thesis, with exchange reserves dropping to multi-year lows as long-term holders move coins to cold storage. Whale activity shows addresses holding 1,000+ BTC have increased their positions by 3.2% over the past month. However, traders should remain cautious and watch for false breakouts, as macro headwinds and regulatory uncertainty could still derail the rally. The next key resistance level sits at $75,000.',
          category: 'Technical Analysis',
          sentiment: analyzeSentiment('Technical Analysis Golden Cross Formation Signals Massive Bull Run excitement bullish signal unprecedented growth').sentiment,
          sentimentIntensity: analyzeSentiment('Technical Analysis Golden Cross Formation Signals Massive Bull Run excitement bullish signal unprecedented growth').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-6',
          title: 'SEC Approves First Spot Bitcoin ETF - Historic Regulatory Milestone',
          content: 'The U.S. Securities and Exchange Commission has approved the first spot Bitcoin exchange-traded fund, ending years of rejections and marking a watershed moment for cryptocurrency adoption in traditional finance. The approval allows retail and institutional investors to gain Bitcoin exposure through their standard brokerage accounts without the complexities of self-custody or cryptocurrency exchange accounts. Industry experts predict the decision will unlock tens of billions in capital from pension funds, wealth managers, and retail investors who were previously unable or unwilling to invest directly in crypto. The approved ETF will track Bitcoin\'s spot price directly, rather than using futures contracts, providing more accurate price exposure and eliminating the roll costs associated with futures-based products. Major asset managers including BlackRock, Fidelity, and Invesco have filed applications and are expected to launch their products within days. Bitcoin surged 22% on the news, briefly touching $52,000 before profit-taking set in. The approval represents a significant shift in regulatory stance and could pave the way for Ethereum and other crypto ETF approvals in the coming months.',
          category: 'Regulation',
          sentiment: analyzeSentiment('Regulatory Update SEC Approves Bitcoin ETF Historic Milestone regulatory breakthrough mainstream acceptance profound').sentiment,
          sentimentIntensity: analyzeSentiment('Regulatory Update SEC Approves Bitcoin ETF Historic Milestone regulatory breakthrough mainstream acceptance profound').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 18000000).toISOString(),
          author: { name: 'WabbleNews AI' }
        }
      ]

      return NextResponse.json({
        articles: sampleArticles,
        total: sampleArticles.length,
        limit,
        offset,
      })
    }
  } catch (error) {
    console.error('Get articles error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

