# Developer Quick Reference - Thrive Admin Web

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## 📁 Key Directories Quick Reference

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `src/app/` | Next.js App Router | `layout.tsx`, `page.tsx`, `(auth)/`, `(private)/` |
| `src/domains/` | Business Logic | `auth/`, `dashboard/`, `user/` |
| `src/components/` | UI Components | `ui/`, `*.tsx` |
| `src/layouts/` | Page Layouts | `auth/`, `dashboard/` |
| `src/lib/` | Core Utilities | `apiBuilder.ts`, `db.ts`, `rbac.ts` |
| `src/providers/` | React Context | `index.tsx`, `Session.tsx`, `Sidebar.tsx` |

## 🔧 Common Tasks

### Adding a New Page
1. Create page in `src/app/(private)/your-page/page.tsx`
2. Add route to sidebar in `src/layouts/dashboard/Sidebar.tsx`
3. Update constants in `src/constants/page.ts`

### Adding a New API Route
1. Create route in `src/app/api/your-endpoint/route.ts`
2. Use `apiBuilder` from `src/lib/apiBuilder.ts`
3. Add validation schemas in appropriate domain

### Adding a New Component
1. Create component in `src/components/` or domain-specific folder
2. Export from appropriate `index.ts`
3. Add TypeScript types if needed

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:migrate`

## 🎨 Styling Guidelines

### Tailwind Classes
- Use design tokens from `tailwind.config.ts`
- Brand colors: `brand-50`, `brand-500`, `brand-600`
- Surface colors: `surface`, `canvas`, `pill`
- Text colors: `text`, `muted`

### Component Styling
```tsx
// Use design system colors
className="bg-brand-500 text-white"

// Use custom components
<Button variant="adminLogin" size="adminLogin">
```

## 🔐 Authentication & Authorization

### Roles
- `SUPER_ADMIN` - Full system access
- `ADMIN` - Administrative access
- `STAFF` - Staff-level access
- `MEDICAL_EXAMINER` - Medical examiner access
- `ORGANIZATION_MANAGER` - Organization management
- `CLAIMANT` - Claimant access

### Protected Routes
- Use `(private)` route group for protected pages
- Middleware automatically handles authentication
- Check roles in `src/lib/rbac.ts`

## 📊 Database Models

### Key Models
- `User` - User information
- `Account` - User accounts with roles
- `Organization` - Organization data
- `Role` - Permission roles
- `Address` - Location data
- `Documents` - File management

### Relationships
- User → Account (1:many)
- Account → Role (many:1)
- Organization → OrganizationManager (1:many)
- Account → OrganizationManager (1:many)

## 🛠 Development Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:pull          # Pull schema from database
```

## 🔍 Code Patterns

### API Route Pattern
```typescript
import { api } from '@/lib/apiBuilder';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const POST = api()
  .validate(schema)
  .auth()
  .post(async (req, ctx) => {
    // Your logic here
    return { success: true };
  })
  .build();
```

### Component Pattern
```typescript
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onSubmit: () => void;
}

export const MyComponent = ({ title, onSubmit }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};
```

### Domain Service Pattern
```typescript
class MyService {
  async getData(id: string) {
    return await prisma.model.findUnique({
      where: { id }
    });
  }
}

export default new MyService();
```

## 🐛 Common Issues & Solutions

### TypeScript Errors
- Check imports and exports
- Verify type definitions in `src/types/`
- Ensure proper Zod schema validation

### Database Issues
- Run `npm run db:generate` after schema changes
- Check database connection in `.env.local`
- Verify Prisma client is up to date

### Authentication Issues
- Check NextAuth.js configuration
- Verify JWT secret in environment variables
- Check role permissions in `src/lib/rbac.ts`

### Styling Issues
- Verify Tailwind classes are correct
- Check `tailwind.config.ts` for custom classes
- Ensure proper CSS imports

## 📝 Code Standards

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

### Import Order
1. React imports
2. Next.js imports
3. Third-party libraries
4. Internal imports (absolute paths with `@/`)
5. Relative imports

### Component Structure
1. Imports
2. Types/Interfaces
3. Component definition
4. Export

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com)

This quick reference guide helps developers quickly understand and work with the Thrive Admin Web codebase.
