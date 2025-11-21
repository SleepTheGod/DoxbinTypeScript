# Doxbin TypeScript - Modern Anonymous Paste Sharing

A production-ready anonymous paste sharing platform built with Next.js 16, React 19, and PostgreSQL. This is a complete TypeScript rewrite of the original PHP Doxbin with modern architecture, enhanced security, and improved performance.

## Features

- **Anonymous Paste Sharing**: Create and share pastes without registration
- **Full-Text Search**: Search pastes by title or content with PostgreSQL full-text search
- **View Tracking**: Automatic view counting with database persistence
- **Rate Limiting**: Built-in protection against spam and abuse (10 pastes/hour per IP)
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Dark Theme**: Eye-friendly dark interface matching the classic Doxbin aesthetic
- **Code Highlighting**: Syntax highlighting for code pastes via Prettify
- **SEO Optimized**: Proper metadata, OpenGraph tags, and semantic HTML
- **Security Hardened**: CSP headers, input sanitization, XSS protection, and rate limiting
- **Production Ready**: Comprehensive error handling, logging, and monitoring

## Tech Stack

- **Framework**: Next.js 16 with App Router and React Server Components
- **Language**: TypeScript with strict mode enabled
- **Database**: PostgreSQL via Neon serverless driver
- **Styling**: Tailwind CSS v4 with custom design system
- **Fonts**: Source Sans Pro, Source Code Pro (self-hosted via Google Fonts)
- **Deployment**: Optimized for Vercel with edge functions
- **Validation**: Zod schemas for type-safe input validation

## Quick Start

### Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database (Neon recommended for serverless)
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/SleepTheGod/DoxbinTypeScript.git
cd DoxbinTypeScript
\`\`\`

2. Install dependencies:
\`\`\`bash
bun install
# or
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your database URL:
\`\`\`env
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. Initialize the database:
\`\`\`bash
# The schema will be created automatically on first run
# Or run manually:
psql $DATABASE_URL -f scripts/001_init_doxbin_schema.sql
\`\`\`

5. Start the development server:
\`\`\`bash
bun dev
# or
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes (pastes, search, fetchPastes)
│   │   ├── pastes/       # Create paste endpoint
│   │   ├── search/       # Search endpoint
│   │   └── fetchPastes/  # List pastes endpoint
│   ├── add/              # Create paste page
│   ├── dox/[id]/         # View paste page
│   │   └── raw/          # Raw paste view
│   ├── login/            # Login page (UI only)
│   ├── register/         # Register page (UI only)
│   ├── tos/              # Terms of Service
│   ├── layout.tsx        # Root layout with navbar
│   ├── page.tsx          # Homepage with paste listing
│   ├── globals.css       # Global styles and design system
│   ├── error.tsx         # Error boundary
│   ├── not-found.tsx     # 404 page
│   └── global-error.tsx  # Global error handler
├── components/
│   ├── ui/               # Shadcn UI components
│   └── navbar.tsx        # Navigation component
├── lib/
│   ├── db.ts             # Database functions and queries
│   ├── rate-limit.ts     # In-memory rate limiting
│   ├── sanitize.ts       # Input sanitization utilities
│   ├── errors.ts         # Custom error classes
│   ├── logger.ts         # Production logging
│   ├── constants.ts      # Application constants
│   └── validation.ts     # Zod validation schemas
├── scripts/
│   └── 001_init_doxbin_schema.sql  # Database schema with indexes
├── middleware.ts         # Security headers and middleware
├── next.config.mjs       # Next.js configuration
└── vercel.json           # Vercel deployment config
\`\`\`

## API Documentation

### POST /api/pastes
Create a new paste.

**Request:**
\`\`\`json
{
  "title": "Paste Title",
  "content": "Paste content..."
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "id": "abc12345",
  "title": "Paste Title",
  "content": "Paste content...",
  "views": 0,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
\`\`\`

**Rate Limit:** 10 requests per hour per IP

### GET /api/fetchPastes
Fetch paginated pastes.

**Query Parameters:**
- `page`: Page number (default: 1)
- `search`: Search query (optional)

**Response:**
\`\`\`json
{
  "pastes": [...],
  "total": 61809,
  "totalPages": 413,
  "currentPage": 1,
  "hasMore": true
}
\`\`\`

### GET /api/search
Search for pastes by title or content.

**Query Parameters:**
- `q`: Search query (required, min 2 chars)
- `limit`: Results limit (default: 50, max: 50)

**Response:**
\`\`\`json
{
  "query": "search term",
  "results": [...],
  "count": 10
}
\`\`\`

## Security Features

- **Rate Limiting**: 10 pastes per hour per IP address
- **Input Sanitization**: All inputs sanitized and validated with Zod
- **CSP Headers**: Content Security Policy prevents XSS attacks
- **HTTPS Only**: Strict transport security enforced in production
- **SQL Injection Protection**: Parameterized queries via Neon driver
- **Error Handling**: Comprehensive error boundaries and logging
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **CORS Protection**: Same-origin policy enforced

## Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads with RSC
- **Database Indexing**: Optimized queries with proper indexes on created_at, views, and title
- **Caching Headers**: Browser and CDN caching for static assets
- **Code Splitting**: Automatic code splitting via Next.js
- **Font Optimization**: Self-hosted fonts with display=swap
- **Image Optimization**: Next.js Image component with AVIF/WebP
- **Compression**: Gzip/Brotli compression enabled

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SleepTheGod/DoxbinTypeScript)

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string (from Neon or other provider)

### Optional
- `NEXT_PUBLIC_APP_URL`: Your production URL (default: https://doxbin.com)
- `NODE_ENV`: Environment (development/production)

## Scripts

- `bun dev`: Start development server
- `bun build`: Build for production
- `bun start`: Start production server
- `bun lint`: Run ESLint
- `bun lint:fix`: Fix linting issues
- `bun type-check`: Run TypeScript type checking
- `bun format`: Format code with Prettier

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

## Migration from PHP Version

This TypeScript version is a complete rewrite with:
- Modern Next.js architecture replacing PHP
- PostgreSQL replacing MySQL
- TypeScript for type safety
- Server components for better performance
- Enhanced security and validation

The database schema is compatible - you can migrate data from the old PHP version.

## Credits

- Original Doxbin concept and PHP implementation by sunjester
- TypeScript rewrite and modernization by the Doxbin team
- Built with Next.js, React, and PostgreSQL

## License

Open source under MIT License - feel free to modify and distribute.

## Support

- **Issues**: [GitHub Issues](https://github.com/SleepTheGod/DoxbinTypeScript/issues)
- **Telegram**: [https://t.me/doxbin](https://t.me/doxbin)
- **Twitter**: [@doxbin](https://twitter.com/doxbin)

## Changelog

### Version 2.0.0 (Current)
- Complete TypeScript rewrite
- Next.js 16 with App Router
- Enhanced security features
- Production-ready deployment
- Comprehensive error handling
- Rate limiting and abuse prevention
- SEO optimization
- Mobile-responsive design
