---
name: Class Variance Authority
version: 0.7.0
type: runtime
category: ui
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: typescript
    - type: enhancedBy
      target: tailwindcss
  features:
    - name: variant-api
      category: core
      status: stable
    - name: compound-variants
      category: core
      status: stable
    - name: typescript-integration
      category: core
      status: stable
  compatibility:
    node: '>=14'
    typescript: '>=4.5'
---

# Class Variance Authority

## Overview

<!-- AI: Key information block for quick parsing -->

```metadata
{
  "description": "A utility for building type-safe variant APIs for CSS-in-JS and utility-first CSS libraries",
  "primaryUse": "Creating maintainable, type-safe component variant systems",
  "ecosystemRole": "Core styling utility for component libraries and design systems"
}
```

## Core Concepts

<!-- AI: Structured knowledge representation -->

```concepts
{
  "fundamentals": [
    {
      "name": "Variant API",
      "description": "Type-safe system for defining component variations",
      "importance": "Enables consistent and maintainable component styling"
    },
    {
      "name": "Compound Variants",
      "description": "Complex variant combinations with specific styles",
      "importance": "Allows for sophisticated component state handling"
    },
    {
      "name": "Default Variants",
      "description": "Predefined variant configurations",
      "importance": "Ensures consistent component defaults"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install class-variance-authority@0.7.0
```

### Basic Configuration

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  // Base styles
  ['font-semibold', 'rounded'],
  {
    variants: {
      intent: {
        primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
        secondary: ['bg-gray-200', 'text-gray-900', 'hover:bg-gray-300'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);
```

## API Reference

<!-- AI: Structured API documentation -->

```api
{
  "mainExports": [
    {
      "name": "cva",
      "type": "function",
      "description": "Creates a variant-enabled className generator",
      "parameters": [
        {
          "name": "base",
          "type": "string | string[]",
          "description": "Base styles applied to all variants"
        },
        {
          "name": "config",
          "type": "VariantConfig",
          "description": "Variant configuration object"
        }
      ],
      "returnType": "VariantFunction",
      "examples": ["const button = cva(['base'], { variants: {} })"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Compound Variants

```typescript
const button = cva('base-styles', {
  variants: {
    intent: { primary: '', secondary: '' },
    size: { small: '', large: '' },
    outlined: { true: '', false: '' },
  },
  compoundVariants: [
    {
      intent: 'primary',
      outlined: true,
      className: 'border-2 border-blue-500 bg-transparent text-blue-500',
    },
  ],
});
```

<!-- AI: Pattern metadata -->

```pattern-metadata
{
  "name": "Compound Variants",
  "useCase": "Complex component variations with multiple states",
  "benefits": [
    "Type-safe variant combinations",
    "Reusable style patterns",
    "Maintainable component styles"
  ],
  "tradeoffs": [
    "Increased complexity for simple components",
    "Additional configuration overhead"
  ]
}
```

## Best Practices

<!-- AI: Structured best practices -->

```best-practices
{
  "categories": [
    {
      "name": "Component Structure",
      "practices": [
        {
          "rule": "Define base styles first",
          "rationale": "Provides consistent foundation",
          "example": "cva(['font-semibold', 'rounded'])"
        },
        {
          "rule": "Group related variants",
          "rationale": "Improves maintainability",
          "example": "variants: { size: {}, intent: {} }"
        }
      ]
    },
    {
      "name": "Type Safety",
      "practices": [
        {
          "rule": "Use TypeScript interfaces",
          "rationale": "Ensures type safety",
          "example": "interface ButtonProps extends VariantProps<typeof button> {}"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With Tailwind CSS

```typescript
const card = cva({
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

<!-- AI: Integration metadata -->

```integration-metadata
{
  "technology": "Tailwind CSS",
  "complexity": "low",
  "requirements": [
    "Tailwind CSS installation",
    "PostCSS configuration"
  ]
}
```

## Error Handling

<!-- AI: Error patterns -->

```error-handling
{
  "commonErrors": [
    {
      "type": "TypeMismatch",
      "cause": "Invalid variant value type",
      "solution": "Ensure variant values match defined types",
      "example": "button({ size: 'invalid' }) // Type error"
    },
    {
      "type": "MissingVariant",
      "cause": "Required variant not provided",
      "solution": "Provide required variants or set defaults",
      "example": "defaultVariants: { size: 'medium' }"
    }
  ]
}
```

## Performance Considerations

<!-- AI: Performance insights -->

```performance
{
  "metrics": [
    {
      "aspect": "Bundle Size",
      "impact": "Minimal (~1KB gzipped)",
      "optimization": "Tree-shaking unused variants"
    },
    {
      "aspect": "Runtime Performance",
      "impact": "Negligible class name generation overhead",
      "optimization": "Memoize variant combinations when possible"
    }
  ]
}
```

## Resources

<!-- AI: Structured resources -->

```resources
{
  "official": [
    {
      "type": "documentation",
      "url": "https://cva.style/docs",
      "description": "Official documentation"
    },
    {
      "type": "repository",
      "url": "https://github.com/joe-bell/cva",
      "description": "GitHub repository"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://cva.style/docs/getting-started/typescript",
      "description": "TypeScript integration guide"
    },
    {
      "type": "examples",
      "url": "https://cva.style/docs/examples",
      "description": "Usage examples and patterns"
    }
  ]
}
```

## Version History

<!-- AI: Version tracking -->

```versions
{
  "latest": "0.7.0",
  "breaking": [
    {
      "version": "0.7.0",
      "changes": [
        "Updated variant composition API",
        "Enhanced TypeScript type inference"
      ]
    }
  ]
}
```
