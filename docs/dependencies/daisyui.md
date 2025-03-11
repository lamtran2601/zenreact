---
name: DaisyUI
version: 5.0.0
type: dev
category: ui
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: tailwindcss
      version: '>=4.0.0'
    - type: enhancedBy
      target: postcss
  features:
    - name: component-library
      category: core
      status: stable
    - name: theme-system
      category: core
      status: stable
    - name: responsive-components
      category: core
      status: stable
  compatibility:
    node: '>=16'
    browsers: 'modern browsers'
---

# DaisyUI

## Overview

<!-- AI: Key information block for quick parsing -->

```metadata
{
  "description": "A comprehensive component library and theming system for Tailwind CSS",
  "primaryUse": "Rapid UI development with pre-built components and themes",
  "ecosystemRole": "Component and theming layer on top of Tailwind CSS"
}
```

## Core Concepts

<!-- AI: Structured knowledge representation -->

```concepts
{
  "fundamentals": [
    {
      "name": "Component System",
      "description": "Pre-built, customizable UI components",
      "importance": "Accelerates development with consistent design patterns"
    },
    {
      "name": "Theme System",
      "description": "Semantic color system with light/dark modes",
      "importance": "Enables consistent and maintainable theming"
    },
    {
      "name": "Utility Integration",
      "description": "Seamless integration with Tailwind utilities",
      "importance": "Combines component-first and utility-first approaches"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm i -D daisyui@latest
```

### Basic Configuration

```css
@import 'tailwindcss';
@plugin "daisyui";

@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
  root: ':root';
  include:;
  exclude:;
  prefix:;
  logs: true;
}
```

### Custom Theme Configuration

```css
@plugin "daisyui/theme" {
  name: 'mytheme';
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: oklch(98% 0.02 240);
  --color-base-200: oklch(95% 0.03 240);
  --color-base-300: oklch(92% 0.04 240);
  --color-base-content: oklch(20% 0.05 240);
  --color-primary: oklch(55% 0.3 240);
  --color-primary-content: oklch(98% 0.01 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-secondary-content: oklch(98% 0.01 200);
  --color-accent: oklch(65% 0.25 160);
  --color-accent-content: oklch(98% 0.01 160);
}
```

## API Reference

<!-- AI: Structured API documentation -->

```api
{
  "mainExports": [
    {
      "name": "themes",
      "type": "configuration",
      "description": "Theme configuration system",
      "options": {
        "light": "Default light theme",
        "dark": "Default dark theme",
        "custom": "User-defined themes"
      }
    },
    {
      "name": "components",
      "type": "classes",
      "description": "Pre-built UI components",
      "categories": [
        "Layout",
        "Input",
        "Data Display",
        "Feedback",
        "Navigation",
        "Overlay"
      ]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Component Composition

```html
<div class="card bg-base-100 shadow-xl">
  <figure><img src="..." alt="..." /></figure>
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

<!-- AI: Pattern metadata -->

```pattern-metadata
{
  "name": "Component Composition",
  "useCase": "Building complex UI elements from basic components",
  "benefits": [
    "Consistent styling",
    "Rapid development",
    "Maintainable structure"
  ],
  "tradeoffs": [
    "Less flexibility than pure utilities",
    "Learning component patterns"
  ]
}
```

## Best Practices

<!-- AI: Structured best practices -->

```best-practices
{
  "categories": [
    {
      "name": "Theme System",
      "practices": [
        {
          "rule": "Use semantic color names",
          "rationale": "Ensures consistent theming",
          "example": "bg-primary instead of bg-blue-500"
        },
        {
          "rule": "Configure base colors",
          "rationale": "Establishes consistent foundation",
          "example": "Define base-100 through base-300"
        }
      ]
    },
    {
      "name": "Component Usage",
      "practices": [
        {
          "rule": "Follow component patterns",
          "rationale": "Maintains consistency",
          "example": "btn-primary for primary buttons"
        },
        {
          "rule": "Use modifiers systematically",
          "rationale": "Clear component variations",
          "example": "btn-lg for large buttons"
        }
      ]
    }
  ]
}
```

## Component Categories

1. **Layout Components**

   - Navbar
   - Footer
   - Drawer
   - Hero

2. **Input Components**

   - Button
   - Input
   - Select
   - Checkbox
   - Radio
   - Toggle
   - Range
   - File Input
   - Textarea

3. **Data Display**

   - Table
   - Card
   - List
   - Stat
   - Timeline

4. **Feedback Components**

   - Alert
   - Progress
   - Loading
   - Toast
   - Skeleton

5. **Navigation Components**

   - Breadcrumbs
   - Menu
   - Pagination
   - Steps
   - Tabs

6. **Overlay Components**
   - Modal
   - Dropdown
   - Tooltip

## Integration Examples

### With React

```typescript
function Button({ variant = 'primary', size = 'md', children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}
```

<!-- AI: Integration metadata -->

```integration-metadata
{
  "technology": "React",
  "complexity": "low",
  "requirements": [
    "React installation",
    "Tailwind CSS setup",
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
      "type": "ThemeConfiguration",
      "cause": "Invalid theme structure",
      "solution": "Follow theme configuration pattern",
      "example": "Correct theme plugin syntax"
    },
    {
      "type": "ComponentClasses",
      "cause": "Missing base classes",
      "solution": "Include required component classes",
      "example": "btn requires btn-{variant}"
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
      "aspect": "CSS Bundle Size",
      "impact": "Moderate increase over base Tailwind",
      "optimization": "Use PurgeCSS to remove unused styles"
    },
    {
      "aspect": "Runtime Performance",
      "impact": "Minimal CSS calculations",
      "optimization": "Use CSS variables for dynamic theming"
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
      "url": "https://daisyui.com",
      "description": "Official documentation"
    },
    {
      "type": "tool",
      "url": "https://daisyui.com/theme-generator/",
      "description": "Theme generator tool"
    }
  ],
  "community": [
    {
      "type": "components",
      "url": "https://daisyui.com/components/",
      "description": "Component documentation and examples"
    }
  ]
}
```

## Version History

<!-- AI: Version tracking -->

```versions
{
  "latest": "5.0.0",
  "breaking": [
    {
      "version": "5.0.0",
      "changes": [
        "New theme system with CSS variables",
        "Updated component patterns",
        "Improved Tailwind v4 compatibility"
      ]
    }
  ]
}
```
