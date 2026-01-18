# Doxbin TypeScript - Modern Anonymous Paste Sharing

A production-ready anonymous paste sharing platform built with Next.js 16, React 19, and PostgreSQL. This is a complete TypeScript rewrite of the original PHP Doxbin with modern architecture, enhanced security, and improved performance.

## Features

* **Anonymous Paste Sharing**: Create and share pastes without registration
* **Full-Text Search**: Search pastes by title or content with PostgreSQL full-text search
* **View Tracking**: Automatic view counting with database persistence
* **Rate Limiting**: Built-in protection against spam and abuse (10 pastes/hour per IP)
* **Responsive Design**: Mobile-first design that works seamlessly on all devices
* **Dark Theme**: Eye-friendly dark interface matching the classic Doxbin aesthetic
* **Code Highlighting**: Syntax highlighting for code pastes via Prettify
* **SEO Optimized**: Proper metadata, OpenGraph tags, and semantic HTML
* **Security Hardened**: CSP headers, input sanitization, XSS protection, and rate limiting
* **Production Ready**: Comprehensive error handling, logging, and monitoring

## Tech Stack

* **Framework**: Next.js 16 with App Router and React Server Components
* **Language**: TypeScript with strict mode enabled
* **Database**: PostgreSQL via Neon serverless driver
* **Styling**: Tailwind CSS v4 with custom design system
* **Fonts**: Source Sans Pro, Source Code Pro (self-hosted via Google Fonts)
* **Deployment**: Optimized for Vercel with edge functions
* **Validation**: Zod schemas for type-safe input validation

## Quick Start

### Prerequisites

* Node.js 18+ or Bun 1.0+
* PostgreSQL database (Neon recommended for serverless)
* Git

### Installation

```bash
git clone https://github.com/SleepTheGod/DoxbinTypeScript.git
cd DoxbinTypeScript
```

```bash
bun install
# or
npm install
```

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database URL:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Initialize the database:

```bash
# The schema will be created automatically on first run
# Or run manually:
psql $DATABASE_URL -f scripts/001_init_doxbin_schema.sql
```

Start the development server:

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/              
│   │   ├── pastes/       
│   │   ├── search/       
│   │   └── fetchPastes/  
│   ├── add/              
│   ├── dox/[id]/         
│   │   └── raw/          
│   ├── login/            
│   ├── register/         
│   ├── tos/              
│   ├── layout.tsx        
│   ├── page.tsx          
│   ├── globals.css       
│   ├── error.tsx         
│   ├── not-found.tsx     
│   └── global-error.tsx  
├── components/
│   ├── ui/               
│   └── navbar.tsx        
├── lib/
│   ├── db.ts             
│   ├── rate-limit.ts     
│   ├── sanitize.ts       
│   ├── errors.ts         
│   ├── logger.ts         
│   ├── constants.ts      
│   └── validation.ts     
├── scripts/
│   └── 001_init_doxbin_schema.sql  
├── middleware.ts         
├── next.config.mjs       
└── vercel.json           
```

## API Documentation

### POST /api/pastes

Create a new paste.

**Request:**

```json
{
  "title": "Paste Title",
  "content": "Paste content..."
}
```

**Response (201):**

```json
{
  "id": "abc12345",
  "title": "Paste Title",
  "content": "Paste content...",
  "views": 0,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

**Rate Limit:** 10 requests per hour per IP

### GET /api/fetchPastes

Fetch paginated pastes.

**Query Parameters:**

* `page`: Page number (default: 1)
* `search`: Search query (optional)

**Response:**

```json
{
  "pastes": [...],
  "total": 61809,
  "totalPages": 413,
  "currentPage": 1,
  "hasMore": true
}
```

### GET /api/search

Search for pastes by title or content.

**Query Parameters:**

* `q`: Search query (required, min 2 chars)
* `limit`: Results limit (default: 50, max: 50)

**Response:**

```json
{
  "query": "search term",
  "results": [...],
  "count": 10
}
```

## Security Features

* **Rate Limiting**: 10 pastes per hour per IP address
* **Input Sanitization**: All inputs sanitized and validated with Zod
* **CSP Headers**: Content Security Policy prevents XSS attacks
* **HTTPS Only**: Strict transport security enforced in production
* **SQL Injection Protection**: Parameterized queries via Neon driver
* **Error Handling**: Comprehensive error boundaries and logging
* **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
* **CORS Protection**: Same-origin policy enforced

## Deployment

Quick deploy to Vercel:

1. Push to GitHub
2. Import in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SleepTheGod/DoxbinTypeScript)

## License

MIT License

## Support

* **Issues**: [GitHub Issues](https://github.com/SleepTheGod/DoxbinTypeScript/issues)
* **Telegram**: [https://t.me/SleepTheGod](https://t.me/SleepTheGod)
* **Twitter**: [@Clumsy](https://twitter.com/LulzClumsy)
