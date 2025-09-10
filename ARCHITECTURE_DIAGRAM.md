# Thrive Admin Web - Architecture Diagram

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Next.js App Router]
        B[React Components]
        C[Tailwind CSS]
    end
    
    subgraph "Domain Layer"
        D[Auth Domain]
        E[Dashboard Domain]
        F[User Domain]
    end
    
    subgraph "Service Layer"
        G[Auth Service]
        H[User Service]
        I[API Builder]
    end
    
    subgraph "Data Layer"
        J[Prisma ORM]
        K[PostgreSQL]
    end
    
    subgraph "Infrastructure"
        L[NextAuth.js]
        M[Middleware]
        N[Context Providers]
    end
    
    A --> D
    A --> E
    A --> F
    D --> G
    E --> H
    F --> H
    G --> I
    H --> I
    I --> J
    J --> K
    L --> G
    M --> A
    N --> B
```

## Domain Structure

```mermaid
graph LR
    subgraph "Auth Domain"
        A1[Components]
        A2[Actions]
        A3[Services]
        A4[Schemas]
        A5[Types]
        A6[Handlers]
    end
    
    subgraph "Dashboard Domain"
        B1[Components]
        B2[Services]
    end
    
    subgraph "User Domain"
        C1[Services]
        C2[Handlers]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> A6
    A4 --> A1
    A5 --> A3
```

## Component Hierarchy

```mermaid
graph TD
    A[Root Layout] --> B[Providers]
    B --> C[Auth Layout]
    B --> D[Dashboard Layout]
    
    C --> E[Auth Navbar]
    C --> F[Login Form]
    C --> G[Forgot Password Form]
    
    D --> H[Dashboard Header]
    D --> I[Dashboard Sidebar]
    D --> J[Dashboard Content]
    
    H --> K[Profile Dropdown]
    H --> L[Search Bar]
    
    I --> M[Navigation Items]
    I --> N[Logout Button]
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant A as API Route
    participant S as Service
    participant D as Database
    
    U->>C: User Action
    C->>A: API Call
    A->>S: Business Logic
    S->>D: Database Query
    D-->>S: Data Response
    S-->>A: Processed Data
    A-->>C: API Response
    C-->>U: UI Update
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Form
    participant A as NextAuth
    participant M as Middleware
    participant D as Dashboard
    
    U->>L: Enter Credentials
    L->>A: Sign In Request
    A->>A: Validate Credentials
    A->>A: Generate JWT
    A-->>L: Success Response
    L->>M: Redirect to Dashboard
    M->>M: Verify JWT
    M->>M: Check Role Permissions
    M-->>D: Allow Access
    D-->>U: Render Dashboard
```

## Database Schema Relationships

```mermaid
erDiagram
    User ||--o{ Account : has
    Account ||--|| Role : assigned
    Account ||--o{ OrganizationManager : manages
    Organization ||--o{ OrganizationManager : managed_by
    Organization ||--|| OrganizationType : categorized_as
    Organization ||--|| Address : located_at
    OrganizationManager ||--o| Department : belongs_to
    User ||--o| Documents : has_profile_photo
    Account ||--o{ VerificationCodes : has
```

## File Structure Visualization

```
admin-web/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/            # Auth route group
│   │   ├── 📁 (private)/         # Protected route group
│   │   ├── 📁 api/               # API routes
│   │   ├── 📄 layout.tsx         # Root layout
│   │   └── 📄 page.tsx           # Home page
│   ├── 📁 domains/               # Domain-Driven Design
│   │   ├── 📁 auth/              # Authentication domain
│   │   ├── 📁 dashboard/         # Dashboard domain
│   │   └── 📁 user/              # User domain
│   ├── 📁 components/            # Shared UI components
│   │   ├── 📁 ui/                # Reusable UI library
│   │   └── 📄 *.tsx              # Custom components
│   ├── 📁 layouts/               # Layout components
│   │   ├── 📁 auth/              # Auth layouts
│   │   └── 📁 dashboard/         # Dashboard layouts
│   ├── 📁 lib/                   # Core utilities
│   ├── 📁 providers/             # React Context providers
│   ├── 📁 styles/                # Styling and fonts
│   ├── 📁 utils/                 # Utility functions
│   ├── 📁 types/                 # TypeScript definitions
│   ├── 📁 constants/             # Application constants
│   └── 📄 middleware.ts          # Route protection
├── 📁 prisma/                    # Database schema
├── 📁 public/                    # Static assets
└── 📄 Configuration files        # Package.json, tsconfig, etc.
```

## Technology Stack Visualization

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js 15]
        B[React 19]
        C[TypeScript]
        D[Tailwind CSS]
        E[Radix UI]
    end
    
    subgraph "Backend"
        F[Next.js API Routes]
        G[NextAuth.js]
        H[Prisma ORM]
    end
    
    subgraph "Database"
        I[PostgreSQL]
    end
    
    subgraph "Development"
        J[Turbopack]
        K[ESLint]
        L[TypeScript Compiler]
    end
    
    A --> B
    B --> C
    A --> D
    B --> E
    A --> F
    F --> G
    F --> H
    H --> I
    A --> J
    C --> K
    C --> L
```

This architecture diagram provides a visual representation of the Thrive Admin Web application's structure, data flow, and technology relationships.
