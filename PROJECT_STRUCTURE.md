# Thrive Admin Web - Project Structure Documentation

## Overview

This is a Next.js 15 admin web application built with TypeScript, following a **Domain-Driven Design (DDD)** architecture pattern. The application serves as an administrative interface for the Thrive platform, featuring authentication, role-based access control, and a modern dashboard interface.

## Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **UI Components**: Radix UI with custom components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React

## Project Architecture

The project follows a **Domain-Driven Design (DDD)** approach with clear separation of concerns:

```
src/
├── app/                    # Next.js App Router pages and layouts
├── domains/               # Business domains (DDD approach)
├── components/            # Shared UI components
├── layouts/               # Layout components
├── lib/                   # Core utilities and configurations
├── providers/             # React Context providers
├── styles/                # Global styles and fonts
├── utils/                 # Utility functions
└── types/                 # TypeScript type definitions
```

---

## Root Level Files

### Configuration Files

| File | Purpose | Description |
|------|---------|-------------|
| `package.json` | Dependencies & Scripts | Defines project dependencies, scripts, and metadata |
| `next.config.ts` | Next.js Configuration | Next.js framework configuration (currently minimal) |
| `tsconfig.json` | TypeScript Configuration | TypeScript compiler options with path mapping (`@/*` → `./src/*`) |
| `tailwind.config.ts` | Tailwind CSS Configuration | Custom theme, colors, fonts, and content paths |
| `eslint.config.mjs` | ESLint Configuration | Code linting rules and configuration |
| `postcss.config.mjs` | PostCSS Configuration | CSS processing configuration for Tailwind |

### Database & Schema

| File | Purpose | Description |
|------|---------|-------------|
| `prisma/schema.prisma` | Database Schema | Complete database schema with models for users, organizations, roles, etc. |

---

## Source Code Structure (`src/`)

### 1. App Directory (`src/app/`)

The **App Router** structure for Next.js 15, organizing pages and API routes:

#### Route Groups
- **`(auth)/`** - Authentication-related pages
  - `layout.tsx` - Auth layout with navbar
  - `login/page.tsx` - Login page
  - `password/forgot/page.tsx` - Password reset page

- **`(private)/`** - Protected dashboard pages
  - `layout.tsx` - Dashboard layout with sidebar and header
  - `dashboard/page.tsx` - Main dashboard page

#### API Routes (`api/`)
- **`auth/[...nextauth]/route.ts`** - NextAuth.js API handler
- **`login/route.ts`** - Login API endpoint
- **`user/check/route.ts`** - User verification endpoint

#### Core Files
- `layout.tsx` - Root layout with providers and fonts
- `page.tsx` - Home page (redirects based on auth status)
- `globals.css` - Global styles and CSS variables
- `favicon.ico` - Site favicon

### 2. Domains Directory (`src/domains/`)

**Domain-Driven Design** implementation with business logic separation:

#### Auth Domain (`auth/`)
Complete authentication system with:
- **`actions/`** - Server actions for auth operations
- **`components/`** - Auth-specific UI components (LoginForm, ForgotPasswordForm)
- **`constants/`** - Role definitions and constants
- **`dto/`** - Data Transfer Objects for API communication
- **`hooks/`** - Custom React hooks (useSession)
- **`schemas/`** - Zod validation schemas
- **`server/`** - Server-side auth logic
  - `auth.service.ts` - Core auth business logic
  - `handlers/` - API route handlers
  - `nextauth/` - NextAuth.js configuration
  - `session.ts` - Session management
- **`types/`** - TypeScript type definitions

#### Dashboard Domain (`dashboard/`)
- **`components/`** - Dashboard-specific components
- **`index.tsx`** - Domain exports

#### User Domain (`user/`)
- **`server/`** - User-related server logic
  - `handlers/` - User API handlers
  - `user.service.ts` - User business logic

### 3. Components Directory (`src/components/`)

**Shared UI components** used across the application:

#### Custom Components
- `BackButton.tsx` - Navigation back button
- `ContinueButton.tsx` - Action button component
- `Dropdown.tsx` - Custom dropdown component
- `PasswordInput.tsx` - Password input with visibility toggle

#### UI Library (`ui/`)
Reusable component library built on Radix UI:
- `accordion.tsx` - Collapsible content component
- `avatar.tsx` - User avatar component
- `button.tsx` - Button variants and styles
- `card.tsx` - Card container component
- `checkbox.tsx` - Checkbox input component
- `dialog.tsx` - Modal dialog component
- `input.tsx` - Text input component
- `label.tsx` - Form label component
- `radio-group.tsx` - Radio button group
- `textarea.tsx` - Multi-line text input
- `index.ts` - Component exports

### 4. Layouts Directory (`src/layouts/`)

**Layout components** for different page types:

#### Auth Layout (`auth/`)
- `index.tsx` - Auth layout wrapper
- `Navbar.tsx` - Authentication page navigation

#### Dashboard Layout (`dashboard/`)
- `Header.tsx` - Dashboard header with user profile
- `ProfileDropDown.tsx` - User profile dropdown menu
- `SearchBar.tsx` - Global search functionality
- `Sidebar.tsx` - Navigation sidebar with role-based routes
- `index.ts` - Layout exports

### 5. Library Directory (`src/lib/`)

**Core utilities and configurations**:

- `apiBuilder.ts` - Custom API builder with middleware, validation, and error handling
- `db.ts` - Prisma database client configuration
- `rbac.ts` - Role-Based Access Control utilities
- `utils.ts` - General utility functions

### 6. Providers Directory (`src/providers/`)

**React Context providers** for global state management:

- `index.tsx` - Main provider composition
- `Search.tsx` - Search functionality context
- `Session.tsx` - Session management context
- `Sidebar.tsx` - Sidebar state management
- `Theme.tsx` - Theme management context

### 7. Styles Directory (`src/styles/`)

**Styling and typography**:

- `fonts.ts` - Font configuration (Degular for headings, Poppins for body)

### 8. Utils Directory (`src/utils/`)

**Utility functions**:

- `httpError.ts` - Custom HTTP error classes with status codes
- `toSafeAsync.ts` - Safe async function wrapper

### 9. Types Directory (`src/types/`)

**TypeScript type definitions**:

- `apiBuilder.ts` - API builder related types
- `next-auth.d.ts` - NextAuth.js type extensions

### 10. Constants Directory (`src/constants/`)

**Application constants**:

- `page.ts` - URL constants and route definitions

---

## Public Assets (`public/`)

### Images
- `images/` - Application images (logos, icons, illustrations)
- `fonts/` - Font files (Degular, Poppins)
- `favicon.ico` - Site favicon
- Various SVG icons and graphics

---

## Key Architectural Patterns

### 1. Domain-Driven Design (DDD)
- **Domains** contain all related business logic, components, and types
- Clear separation between different business areas
- Each domain is self-contained with its own structure

### 2. Layered Architecture
- **Presentation Layer**: Components, layouts, pages
- **Business Logic Layer**: Domains, services, handlers
- **Data Access Layer**: Prisma ORM, database models
- **Infrastructure Layer**: Utilities, configurations

### 3. Component Composition
- **Shared Components**: Reusable UI components
- **Domain Components**: Business-specific components
- **Layout Components**: Page structure and navigation

### 4. API Design
- **Custom API Builder**: Middleware, validation, error handling
- **RESTful Endpoints**: Standard HTTP methods and status codes
- **Type Safety**: Full TypeScript integration

### 5. Authentication & Authorization
- **NextAuth.js**: Industry-standard authentication
- **Role-Based Access Control (RBAC)**: Granular permissions
- **JWT Strategy**: Stateless authentication
- **Middleware Protection**: Route-level security

---

## Database Schema Overview

The application uses PostgreSQL with the following key entities:

- **Users**: Core user information
- **Accounts**: User accounts with roles
- **Organizations**: Company/organization data
- **Roles**: Permission-based roles
- **Addresses**: Location information
- **Documents**: File management
- **Verification Codes**: Email/SMS verification

---

## Development Workflow

### Scripts
- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes
- `npm run db:studio` - Open Prisma Studio

### Key Features
- **Hot Reload**: Fast development with Turbopack
- **Type Safety**: Full TypeScript coverage
- **Code Quality**: ESLint configuration
- **Database Management**: Prisma ORM with migrations
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Radix UI components

---

## Security Considerations

- **Authentication**: NextAuth.js with JWT
- **Authorization**: Role-based access control
- **Input Validation**: Zod schemas
- **SQL Injection**: Prisma ORM protection
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: NextAuth.js built-in protection

---

This documentation provides a comprehensive overview of the Thrive Admin Web project structure, helping developers understand the codebase organization, architectural decisions, and development patterns used throughout the application.
