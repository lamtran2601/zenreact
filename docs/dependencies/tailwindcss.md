---
name: TailwindCSS
version: 4.0.0
type: dev
category: ui
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: nodejs
      version: '>=20.0.0'
    - type: enhancedBy
      target: postcss
  features:
    - name: utility-first
      category: core
      status: stable
    - name: css-variable-system
      category: core
      status: stable
    - name: container-queries
      category: core
      status: stable
  compatibility:
    node: '>=20.0.0'
    typescript: '>=4.8.0'
    browsers: 'Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)'
---

# TailwindCSS

## Overview

```metadata
{
  "description": "A utility-first CSS framework providing low-level utility classes to build custom designs directly in markup",
  "primaryUse": "Frontend styling and design system implementation",
  "ecosystemRole": "Core styling framework for modern web applications"
}
```

## Core Concepts

```concepts
{
  "fundamentals": [
    {
      "name": "Utility-First",
      "description": "Compose designs using predefined utility classes",
      "importance": "Enables rapid development and consistent styling"
    },
    {
      "name": "CSS Variables",
      "description": "New v4 system for theme customization",
      "importance": "Provides dynamic theming and better runtime performance"
    },
    {
      "name": "Container Queries",
      "description": "Component-level responsive design",
      "importance": "Enables more modular and reusable components"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install @tailwindcss/vite
```

### Basic Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});

// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

## API Reference

```api
{
  "mainExports": [
    {
      "name": "plugin",
      "type": "function",
      "description": "Creates a Tailwind plugin",
      "parameters": [
        {
          "name": "config",
          "type": "PluginConfig",
          "description": "Plugin configuration object"
        }
      ],
      "returnType": "TailwindPlugin",
      "examples": ["plugin(function({ addUtilities }) { /* plugin code */ })"]
    },
    {
      "name": "theme",
      "type": "function",
      "description": "Accesses theme values in CSS",
      "parameters": [
        {
          "name": "path",
          "type": "string",
          "description": "Path to theme value"
        }
      ],
      "returnType": "string",
      "examples": ["theme('colors.blue.500')"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Theme Customization

```css
@plugin "daisyui/theme" {
  name: 'mytheme';
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-primary: oklch(55% 0.3 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-accent: oklch(65% 0.25 160);
}
```

```pattern-metadata
{
  "name": "Theme Customization",
  "useCase": "Creating custom design systems",
  "benefits": ["Consistent branding", "System-wide changes"],
  "tradeoffs": ["Initial setup complexity", "Learning curve for CSS variables"]
}
```

## Best Practices

```best-practices
{
  "categories": [
    {
      "name": "CSS Variables",
      "practices": [
        {
          "rule": "Use semantic color names",
          "rationale": "Ensures consistent theming",
          "example": "var(--color-primary) instead of var(--color-blue-500)"
        }
      ]
    },
    {
      "name": "Responsive Design",
      "practices": [
        {
          "rule": "Mobile-first approach",
          "rationale": "Better progressive enhancement",
          "example": "base styles for mobile, then use breakpoint utilities"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With React Components

```typescript
import { cva } from 'class-variance-authority';

const button = cva({
  base: 'rounded-lg shadow',
  variants: {
    color: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
    },
    size: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
  },
});
```

```integration-metadata
{
  "technology": "React",
  "complexity": "low",
  "requirements": ["class-variance-authority"]
}
```

## Error Handling

```error-handling
{
  "commonErrors": [
    {
      "type": "ConfigurationError",
      "cause": "Invalid content paths in tailwind.config",
      "solution": "Verify content paths match your project structure",
      "example": "content: ['./src/**/*.{js,ts,jsx,tsx}']"
    },
    {
      "type": "PurgeError",
      "cause": "Styles being purged incorrectly",
      "solution": "Check content configuration and class usage",
      "example": "Use complete class names, avoid dynamic class concatenation"
    }
  ]
}
```

## Performance Considerations

```performance
{
  "metrics": [
    {
      "aspect": "Bundle Size",
      "impact": "Minimal due to build-time optimization",
      "optimization": "Use PurgeCSS in production"
    },
    {
      "aspect": "Runtime Performance",
      "impact": "Improved with CSS Variables",
      "optimization": "Minimize dynamic theme changes"
    }
  ]
}
```

## Resources

```resources
{
  "official": [
    {
      "type": "documentation",
      "url": "https://tailwindcss.com",
      "description": "Official documentation"
    },
    {
      "type": "playground",
      "url": "https://tailwindcss.com/docs/playground",
      "description": "Interactive testing environment"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://tailwindcss.com/resources",
      "description": "Community resources and tools"
    }
  ]
}
```

## Version History

```versions
{
  "latest": "4.0.0",
  "breaking": [
    {
      "version": "4.0.0",
      "changes": [
        "@tailwind directives replaced with @import",
        "Core plugins always enabled",
        "New CSS Variable system",
        "Utility class renames (shadow-sm -> shadow-xs)",
        "Container queries implementation"
      ]
    }
  ]
}
```
