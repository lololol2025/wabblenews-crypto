<!-- 00410515-ad17-4d1b-abab-4465622634e8 e70afa09-79f0-470c-aa75-96262cc36d32 -->
# Article Design & Color System Overhaul

## Overview

Redesign article cards with visible sentiment labels, improve color consistency throughout the site, fix article content truncation, and make the About page more accessible.

## Changes to Implement

### 1. Article Card Redesign (`components/NewsCard.tsx`)

**Add Sentiment Label Above Card (Always Visible)**

- Add a small sentiment badge that appears ABOVE the article card (outside the card boundary)
- Position it absolutely so it floats above the top-left corner
- Use proper sentiment colors: Green (bullish), Red (bearish), Blue/Gray (neutral)
- Make it visible at all times, not just on hover

**Fix Card Border Colors**

- Change default border from `rgba(255, 255, 255, 0.1)` to use sentiment colors with low opacity
- Make borders more visible: increase opacity from 0.1 to 0.3 for default state
- On hover, increase border opacity and add glow effect

**Improve Card Structure**

- Reduce excessive padding (`p-10` is too much, change to `p-6`)
- Fix the rounded corners to be more consistent (`rounded-3xl` to `rounded-2xl`)
- Remove the 3D tilt effect (it makes cards look "off")
- Simplify hover animations - just scale and glow, no rotation

**Fix Content Truncation**

- Change `line-clamp-2` on title to `line-clamp-3` for better readability
- Change `line-clamp-4` on content to `line-clamp-5` to show more text
- Reduce title font size from `text-3xl` to `text-2xl` for better fit

**Fix Author Avatar Colors**

- Make author avatar color match the sentiment color consistently
- Remove the rotation animation on hover (too distracting)
- Simplify to just a subtle scale effect

**Replace Category Badge with Sentiment**

- For cards without images, show sentiment badge instead of category badge
- Use the same color coding as image cards

### 2. Color System Fixes

**Update Sentiment Color Palette**

- Very Bullish: `#00FF7F` (bright green) - keep
- Bullish: `#10B981` (softer green) - CHANGE from cyan
- Neutral: `#6B7280` (gray) - CHANGE from blue
- Bearish: `#F59E0B` (orange) - CHANGE from red
- Very Bearish: `#EF4444` (bright red) - keep

**Apply Consistent Colors**

- Update `getSentimentColors()` function with new palette
- Ensure borders, text, backgrounds, and glows all use the same base color
- Remove mismatched colors (e.g., cyan category badges when article is bearish)

### 3. About Page Optimization (`app/about/page.tsx`)

**Reduce Container Height**

- Change padding from `p-12 md:p-20` to `p-8 md:p-12`
- Reduce heading size from `text-6xl md:text-7xl` to `text-4xl md:text-5xl`
- Reduce spacing in the values section
- Make the logo smaller (`w-24 h-24` to `w-16 h-16`)

**Improve First-View Visibility**

- Remove excessive top margin
- Reduce the "Our Values" section padding from `p-12` to `p-8`
- Make text more concise by reducing line spacing
- Change `leading-loose` to `leading-relaxed` for tighter text

### 4. Sample Articles Enhancement (`app/api/articles/route.ts`)

**Expand Article Content**

- Make sample articles have fuller descriptions (200-300 words instead of 50-100)
- Add proper context, causes, and implications to each article
- Ensure sentiment matches the content tone

## Files to Modify

1. `components/NewsCard.tsx` - Complete card redesign
2. `app/about/page.tsx` - Reduce height and improve layout
3. `app/api/articles/route.ts` - Enhance sample article content

## Expected Outcome

- Article cards will have clear, always-visible sentiment labels above them
- Colors will be consistent and match the sentiment system
- Cards will look more balanced and professional
- Article previews will show more complete information
- About page will be immediately visible without scrolling
- Overall design will be cleaner and more cohesive

### To-dos

- [x] Add always-visible sentiment label floating above article cards
- [x] Update card border colors and opacity to use sentiment colors
- [x] Remove 3D tilt, reduce padding, fix rounded corners, simplify hover animations
- [x] Increase line clamps for title and content to show more text
- [x] Change sentiment colors to: green (bullish), gray (neutral), orange/red (bearish)
- [x] Match avatar colors to sentiment and simplify hover animation
- [x] Reduce padding, heading sizes, and spacing on About page
- [x] Expand sample article content to 200-300 words with full context

