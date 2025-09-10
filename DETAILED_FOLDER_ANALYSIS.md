# Detailed Folder Analysis - Thrive Admin Web

## Root Directory Analysis

### Configuration Files
```
admin-web/
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Dependency lock file
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
└── README.md             # Project documentation
```

### Database Configuration
```
prisma/
└── schema.prisma         # Complete database schema with 12 models
```

### Public Assets
```
public/
├── images/               # Application images and graphics
├── fonts/                # Custom font files (Degular, Poppins)
├── *.svg                 # Various SVG icons
└── favicon.ico           # Site favicon
```

---

## Source Code Deep Dive (`src/`)

### 1. App Directory (`src/app/`) - Next.js App Router

#### Route Groups Structure
```
app/
├── (auth)/               # Authentication route group
│   ├── layout.tsx        # Auth layout with navbar
│   ├── login/
│   │   └── page.tsx      # Login page component
│   └── password/
│       └── forgot/
│           └── page.tsx  # Password reset page
├── (private)/            # Protected route group
│   ├── layout.tsx        # Dashboard layout with sidebar
│   └── dashboard/
│       └── page.tsx      # Main dashboard page
├── api/                  # API routes
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts  # NextAuth.js handler
│   ├── login/
│   │   └── route.ts      # Login API endpoint
│   └── user/
│       └── check/
│           └── route.ts  # User verification API
├── layout.tsx            # Root layout with providers
├── page.tsx              # Home page (auth redirect)
├── globals.css           # Global styles and CSS variables
└── favicon.ico           # Site favicon
```

**Key Features:**
- **Route Groups**: `(auth)` and `(private)` for different layouts
- **API Routes**: RESTful endpoints for authentication and user management
- **Middleware Integration**: Route protection and authentication
- **Layout Composition**: Nested layouts for different page types

### 2. Domains Directory (`src/domains/`) - Domain-Driven Design

#### Auth Domain (`auth/`)
```
domains/auth/
├── actions/
│   ├── index.ts          # Action exports
│   └── login.ts          # Login server action
├── components/
│   ├── ForgotPasswordForm.tsx  # Password reset form
│   └── LoginForm.tsx           # Login form component
├── constants/
│   └── roles.ts          # Role definitions and types
├── dto/
│   └── auth.dto.ts       # Data Transfer Objects
├── hooks/
│   └── useSession.ts     # Session management hook
├── schemas/
│   └── auth.schemas.ts   # Zod validation schemas
├── server/
│   ├── auth.service.ts   # Core authentication logic
│   ├── handlers/
│   │   ├── index.ts      # Handler exports
│   │   └── login.ts      # Login handler
│   ├── nextauth/
│   │   ├── callbacks.ts  # NextAuth callbacks
│   │   ├── options.ts    # NextAuth configuration
│   │   └── providers/
│   │       ├── credentials.ts  # Credentials provider
│   │       ├── google.ts       # Google OAuth provider
│   │       └── index.ts        # Provider exports
│   └── session.ts        # Session management
├── types/
│   ├── index.ts          # Auth type definitions
│   └── next-auth.d.ts    # NextAuth type extensions
└── index.tsx             # Domain exports
```

**Auth Domain Responsibilities:**
- User authentication and authorization
- Session management
- Role-based access control
- Password management
- OAuth integration (Google)
- Form validation and handling

#### Dashboard Domain (`dashboard/`)
```
domains/dashboard/
├── components/
│   └── Dashboard.tsx     # Main dashboard component
└── index.tsx             # Domain exports
```

**Dashboard Domain Responsibilities:**
- Dashboard UI components
- Dashboard-specific business logic
- Data visualization components

#### User Domain (`user/`)
```
domains/user/
└── server/
    ├── handlers/
    │   └── checkUser.ts  # User verification handler
    └── user.service.ts   # User business logic
```

**User Domain Responsibilities:**
- User profile management
- User verification
- User-related business logic

### 3. Components Directory (`src/components/`) - Shared UI Components

#### Custom Components
```
components/
├── BackButton.tsx        # Navigation back button
├── ContinueButton.tsx    # Action button component
├── Dropdown.tsx          # Custom dropdown component
├── PasswordInput.tsx     # Password input with visibility toggle
└── ui/                   # Reusable UI component library
    ├── accordion.tsx     # Collapsible content
    ├── avatar.tsx        # User avatar component
    ├── button.tsx        # Button variants
    ├── card.tsx          # Card container
    ├── checkbox.tsx      # Checkbox input
    ├── dialog.tsx        # Modal dialog
    ├── input.tsx         # Text input
    ├── label.tsx         # Form label
    ├── radio-group.tsx   # Radio button group
    ├── textarea.tsx      # Multi-line text input
    └── index.ts          # Component exports
```

**Component Architecture:**
- **Custom Components**: Application-specific components
- **UI Library**: Reusable components built on Radix UI
- **Composition Pattern**: Components can be composed together
- **TypeScript Integration**: Full type safety

### 4. Layouts Directory (`src/layouts/`) - Layout Components

#### Auth Layout (`auth/`)
```
layouts/auth/
├── index.tsx             # Auth layout wrapper
└── Navbar.tsx            # Authentication navigation
```

#### Dashboard Layout (`dashboard/`)
```
layouts/dashboard/
├── Header.tsx            # Dashboard header with profile
├── ProfileDropDown.tsx   # User profile dropdown
├── SearchBar.tsx         # Global search functionality
├── Sidebar.tsx           # Navigation sidebar
└── index.ts              # Layout exports
```

**Layout Responsibilities:**
- **Auth Layout**: Authentication pages structure
- **Dashboard Layout**: Protected pages structure
- **Navigation**: Sidebar and header components
- **User Interface**: Profile management and search

### 5. Library Directory (`src/lib/`) - Core Utilities

```
lib/
├── apiBuilder.ts         # Custom API builder with middleware
├── db.ts                 # Prisma database client
├── rbac.ts               # Role-Based Access Control
└── utils.ts              # General utility functions
```

**Library Functions:**
- **API Builder**: Middleware, validation, error handling
- **Database**: Prisma client configuration
- **RBAC**: Permission management
- **Utils**: Helper functions

### 6. Providers Directory (`src/providers/`) - React Context

```
providers/
├── index.tsx             # Main provider composition
├── Search.tsx            # Search functionality context
├── Session.tsx           # Session management context
├── Sidebar.tsx           # Sidebar state management
└── Theme.tsx             # Theme management context
```

**Provider Architecture:**
- **Composition Pattern**: Nested providers
- **Global State**: Context-based state management
- **Separation of Concerns**: Each provider handles specific functionality

### 7. Styles Directory (`src/styles/`) - Styling

```
styles/
└── fonts.ts              # Font configuration (Degular, Poppins)
```

**Styling Approach:**
- **Custom Fonts**: Degular for headings, Poppins for body
- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Custom design tokens

### 8. Utils Directory (`src/utils/`) - Utility Functions

```
utils/
├── httpError.ts          # Custom HTTP error classes
└── toSafeAsync.ts        # Safe async function wrapper
```

**Utility Functions:**
- **Error Handling**: Custom HTTP error classes
- **Async Safety**: Safe async function execution

### 9. Types Directory (`src/types/`) - TypeScript Definitions

```
types/
├── apiBuilder.ts         # API builder types
└── next-auth.d.ts        # NextAuth type extensions
```

**Type Safety:**
- **API Types**: Request/response type definitions
- **Framework Types**: NextAuth.js type extensions
- **Global Types**: Application-wide type definitions

### 10. Constants Directory (`src/constants/`) - Application Constants

```
constants/
└── page.ts               # URL constants and route definitions
```

**Constants Management:**
- **URLs**: Centralized route definitions
- **Configuration**: Application-wide constants

---

## Database Schema Analysis (`prisma/schema.prisma`)

### Core Models
- **User**: Personal information and profile data
- **Account**: User accounts with role associations
- **Role**: Permission-based roles (SUPER_ADMIN, ADMIN, STAFF, etc.)
- **Organization**: Company/organization data
- **OrganizationType**: Types of organizations
- **OrganizationManager**: Organization management relationships
- **Department**: Organizational departments
- **Address**: Location information
- **Documents**: File management
- **VerificationCodes**: Email/SMS verification
- **PrismaSeed**: Database seeding tracking

### Key Features
- **UUID Primary Keys**: All models use UUID for primary keys
- **Soft Deletes**: `deletedAt` field for soft deletion
- **Timestamps**: `createdAt` and `updatedAt` for all models
- **Relationships**: Complex relationships between users, organizations, and roles
- **Enums**: OrganizationStatus enum for state management

---

## Architecture Patterns Summary

### 1. Domain-Driven Design (DDD)
- **Bounded Contexts**: Each domain is self-contained
- **Business Logic**: Encapsulated within domains
- **Clear Boundaries**: Well-defined domain interfaces

### 2. Layered Architecture
- **Presentation**: Components and layouts
- **Business Logic**: Domain services and handlers
- **Data Access**: Prisma ORM and database
- **Infrastructure**: Utilities and configurations

### 3. Component Composition
- **Reusable Components**: UI library for consistency
- **Domain Components**: Business-specific components
- **Layout Components**: Page structure management

### 4. API Design
- **RESTful**: Standard HTTP methods and status codes
- **Type Safety**: Full TypeScript integration
- **Middleware**: Custom API builder with validation
- **Error Handling**: Consistent error responses

### 5. Authentication & Authorization
- **NextAuth.js**: Industry-standard authentication
- **JWT Strategy**: Stateless authentication
- **RBAC**: Role-based access control
- **Middleware Protection**: Route-level security

This detailed analysis provides a comprehensive understanding of each folder's purpose, structure, and responsibilities within the Thrive Admin Web application.
