# Projects Showcase Plan

## Objective
Build a premium, interactive projects showcase for the portfolio that feels production-ready and closely matches the requested aesthetic.

## Scope
- Create a reusable, data-driven projects section for the Projects page.
- Add a polished hero/header, search experience, category filters, sorting, and pagination.
- Use motion, Next.js image handling, and responsive layout patterns.

## Implementation Steps
1. Add a typed project dataset with rich metadata for featured work.
2. Build reusable section components for header, search, filters, grid, cards, and pagination.
3. Compose the section into the Projects route and verify the build.


each project 
Hero image
Problem statement
Architecture explanation
Tech stack badges
Challenges
Performance optimizations
GitHub + Live link
Image gallery or video

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String   // MDX or rich text
  thumbnail   String
  featured    Boolean  @default(false)
  published   Boolean  @default(true)
  techStack   String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([featured])
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  published   Boolean  @default(true)
  tags        String[]
  readingTime Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([createdAt])
}

model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())

  @@index([createdAt])
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String
}

DAY 5 — /projects Route
Features:
Pagination
Filtering
Sorting
Search

1️⃣ Performance Optimization
Add indexes
Optimize Prisma queries
Use select fields instead of full objects
Avoid N+1 queries
2️⃣ Security
Hash admin passwords (bcrypt)
CSRF protection
Validate all inputs
Rate limit contact form
3️⃣ Logging

Add structured logging.

4️⃣ Caching Strategy
Static for blog
ISR for projects
No-store for admin
5️⃣ Deploymen
Final System Capabilities

By Day 10 you will have:

SSR + ISR hybrid system
Server Actions for mutations
Clean data layer
Proper schema modeling
Indexed database
Admin dashboard
SEO optimized blog
Production deployment
Secure authentication
Scalable architecture

Perfect.
Below is a **senior-level, production-grade AI prompt** you can use with ChatGPT, Claude, Copilot, or any advanced coding AI to generate your full system properly.

This prompt is designed to:

* Avoid junior-level code
* Enforce architecture discipline
* Force separation of concerns
* Use Server Actions correctly
* Follow Prisma best practices
* Produce scalable structure

---

# 🔥 MASTER AI PROMPT (Senior-Level Portfolio System)

---

## 🧠 SYSTEM ROLE

You are a senior fullstack architect specializing in:

* Next.js App Router
* Server Actions
* Prisma ORM
* PostgreSQL
* Secure authentication
* Scalable SaaS architecture
* Production-grade folder structure

You do NOT generate beginner code.
You generate production-ready, clean, optimized, scalable architecture.

---

## 🎯 PROJECT CONTEXT

I am building a professional portfolio platform with:

* Next.js (App Router)
* Server Actions (mutations only)
* Prisma ORM
* PostgreSQL database
* Admin dashboard
* Blog system
* Projects archive
* Featured projects on homepage
* Contact form

The homepage shows:

* Hero
* 5 featured projects
* Latest blog posts

There are routes:

* `/projects`
* `/projects/[slug]`
* `/blog`
* `/blog/[slug]`
* `/admin`

---

## 🧱 REQUIREMENTS

Generate:

1. Full production-ready folder structure
2. Prisma schema (optimized, indexed, scalable)
3. Data access layer
4. Server Actions layer
5. Authentication system (secure)
6. Admin dashboard architecture
7. Blog system architecture
8. Pagination system
9. Search implementation
10. Caching strategy
11. SEO metadata system
12. Deployment strategy for Vercel + Postgres

---

## ⚙️ ARCHITECTURE RULES

Follow these strict rules:

### 1️⃣ Separation of Concerns

* No Prisma calls inside UI components
* Create `/lib/queries`
* Create `/lib/actions`
* Create `/lib/auth`

### 2️⃣ Server Actions

* Use `'use server'`
* Use for mutations only
* Include validation with Zod
* Include try/catch
* Return structured error objects

### 3️⃣ Prisma

* Use proper indexes
* Use `@@index`
* Use `@unique`
* Use select queries
* Avoid N+1 queries
* Add timestamps
* Add soft delete where necessary

### 4️⃣ Security

* Hash passwords with bcrypt
* Protect admin route with middleware
* Validate all inputs
* Rate limit contact form

### 5️⃣ Performance

* Use ISR for projects
* Use static generation for blog
* Use dynamic rendering for admin
* Implement caching strategy

---

## 🗃 DATABASE REQUIREMENTS

Design models for:

* Project
* Post
* Admin
* Message
* Optional Tag relation

Include:

* Indexes
* Slug uniqueness
* Published flag
* Featured flag
* UpdatedAt auto
* Proper relational modeling

---

## 🔍 SEARCH SYSTEM

Design a scalable search using:

* Query filtering
* Pagination
* Indexed columns
* Case-insensitive search

---

## 📊 ADMIN DASHBOARD

Include:

* CRUD for projects
* CRUD for posts
* View messages
* Secure login
* Role-based protection
* Server action forms

---

## 📦 DEPLOYMENT

Provide configuration for:

* Vercel deployment
* PostgreSQL (Neon or Supabase)
* Environment variables
* Prisma connection pooling
* Production migration strategy

---

## 📐 CODE STYLE

* TypeScript
* Strong typing
* Modular functions
* No inline business logic in UI
* Clean error handling
* Professional naming conventions

---

## 🚀 OUTPUT FORMAT

Respond in this structure:

1. Folder structure
2. Prisma schema
3. Data access layer
4. Server actions layer
5. Authentication
6. Routes implementation
7. Caching strategy
8. Deployment strategy
9. Security checklist
10. Performance checklist

---

# 🧠 ADVANCED VERSION (If You Want Even Better Output)

Add this to the end:

> Explain every architectural decision and why it was chosen over alternatives. Think like a staff-level engineer designing for scale.

---

# 🏆 WHY THIS PROMPT WORKS

This forces the AI to:

* Think architecturally
* Avoid junior patterns
* Structure your system correctly
* Build scalable backend logic
* Respect Server Actions properly
* Avoid mixing UI and DB logic

---

# ⚡ If You Want an Even More Aggressive Prompt

Tell me.

I can give you:

* A staff-engineer-level systems prompt
* A SaaS-grade architecture prompt
* A startup CTO-level design prompt
* A FAANG-level review prompt

What level are we playing at?

