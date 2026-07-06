# Lib Directory

Utility functions, types, configuration, and business logic.

## Organization

```
lib/
├── content.ts            # Single source of truth for all portfolio content
├── types.ts              # TypeScript interfaces and types
├── config.ts             # Application configuration and constants
├── utils.ts              # Utility functions (classname merging, etc.)
├── logger.ts             # Client-side logging utility
└── index.ts              # Barrel export for clean imports
```

## Files

### content.ts (Single Source of Truth)
Contains all portfolio data in one file. Edit here to update site content without touching components:
- `projects[]` - Featured work with details
- `technologies[]` - Skills grouped by category
- `experience[]` - Work history
- `links` - Social profiles and contact info
- `copy` - Text snippets (nav, footer, etc.)

**Usage:**
```typescript
import { projects, technologies } from "@/lib";
```

### types.ts
TypeScript interfaces for type safety:
- `BlogPost` - Blog article structure
- `Technology` - Skill with category
- `Company` - Work experience
- `Project` - Portfolio project

**Usage:**
```typescript
import type { BlogPost, Project } from "@/lib";
```

### config.ts
Application configuration and constants:
- `SITE_CONFIG` - Site name, URL, email, social links
- `BLOG_CONFIG` - Blog settings (featured categories, cache duration)
- `RATE_LIMIT_CONFIG` - Contact form rate limiting settings

**Usage:**
```typescript
import { SITE_CONFIG, BLOG_CONFIG } from "@/lib";
console.log(SITE_CONFIG.url); // "https://www.jacksdevfolio.com"
```

### utils.ts
General utility functions:
- `cn()` - Classname merging (tailwind-merge + clsx)

**Usage:**
```typescript
import { cn } from "@/lib";

cn("px-4", isActive && "bg-blue-500"); // Tailwind class merging
```

### logger.ts
Client-side logging utility with levels (info, debug, warn, error):

**Usage:**
```typescript
import { getWebLogger } from "@/lib";

const logger = getWebLogger();
logger.info("User action", { action: "clicked button" });
logger.error("Error occurred", { error: e });
```

### index.ts (Barrel Export)
Clean imports from the entire lib package:

```typescript
// ✅ Good - import from lib barrel
import { cn, getWebLogger, SITE_CONFIG, projects } from "@/lib";

// ❌ Avoid - direct imports (harder to maintain)
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
```

## Best Practices

- ✅ Keep configuration centralized in `config.ts`
- ✅ Update `content.ts` only to change portfolio data
- ✅ Use barrel exports (`lib/index.ts`) for clean imports
- ✅ Add types to `types.ts` for new data structures
- ✅ Use `logger` for debugging instead of `console.log`
- ❌ Don't hardcode values in components
- ❌ Don't mix business logic with UI components

## Adding New Content

To add a new portfolio section (e.g., certifications):

1. **Define type** in `types.ts`:
```typescript
export interface Certification {
  title: string;
  issuer: string;
  date: string;
}
```

2. **Add data** to `content.ts`:
```typescript
export const certifications: Certification[] = [
  { title: "...", issuer: "...", date: "..." }
];
```

3. **Export** in `lib/index.ts`:
```typescript
export { certifications } from "./content";
```

4. **Use in components**:
```typescript
import { certifications } from "@/lib";
```
