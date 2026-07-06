# Components Directory

Organized React components following a feature-first structure for scalability.

## Organization

```
components/
├── ui/                      # Reusable UI primitives
│   ├── button.tsx
│   ├── animated-theme-toggler.tsx
│   ├── decrypted-text.tsx
│   ├── dropdown-menu.tsx
│   ├── scroll-slide.tsx
│   └── index.ts            # Barrel export
├── sections/                # Page sections (hero, projects, etc.)
│   ├── hero-section.tsx
│   ├── projects-section.tsx
│   ├── technologies-section.tsx
│   ├── blog-hero-section.tsx
│   ├── contact-form.tsx
│   ├── footer.tsx
│   └── index.ts            # Barrel export
├── navigation/              # Navigation components
│   ├── main-navbar.tsx
│   ├── top-banner.tsx
│   ├── back-to-home.tsx
│   └── index.ts            # Barrel export
├── background/              # Layout/background components
│   └── masonry-background.tsx
├── providers/               # Context providers
│   └── smooth-scroll-provider.tsx
└── theme-provider.tsx       # Theme configuration (next-themes wrapper)
```

## Import Patterns

### Clean imports with barrel exports:
```typescript
// ✅ Good - using index.ts
import { Button, DecryptedText } from "@/components/ui";
import { HeroSection, ContactForm } from "@/components/sections";
import { MainNavbar, TopBanner } from "@/components/navigation";

// ❌ Avoid - direct imports
import { Button } from "@/components/ui/button";
```

## Component Categories

### UI Components (`ui/`)
Reusable, generic components with no business logic:
- Buttons, inputs, toggles
- Animations, text effects
- Dropdowns, menus
- **No props**: business logic, specific content

### Sections (`sections/`)
Full-width page sections combining multiple UI components:
- Hero sections
- Project listings
- Blog sections
- Contact forms
- Footers

### Navigation (`navigation/`)
Navigation-related components:
- Header/navbar
- Sidebars
- Breadcrumbs
- Menus

### Background/Layout (`background/`, `providers/`)
Layout wrappers and context providers:
- Background effects
- Theme provider
- Scroll provider
- Global styles

## Adding New Components

1. **For reusable UI**: Add to `ui/` with generic, composable API
2. **For page sections**: Add to `sections/`
3. **Update barrel export**: Add to `index.ts` in folder

Example:
```typescript
// components/ui/badge.tsx
interface BadgeProps {
  text: string;
  variant?: "primary" | "secondary";
}

export const Badge = ({ text, variant = "primary" }: BadgeProps) => (
  <span className={`badge badge-${variant}`}>{text}</span>
);
```

Then in `components/ui/index.ts`:
```typescript
export { Badge } from "./badge";
```

## Best Practices

- ✅ Keep components focused and single-responsibility
- ✅ Use barrel exports (`index.ts`) for clean imports
- ✅ Separate business logic from UI components
- ✅ Use TypeScript interfaces for props
- ✅ Document complex components with comments
- ❌ Avoid deeply nested component folders
- ❌ Don't mix UI components with page-specific logic
