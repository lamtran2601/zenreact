# Tailwind CSS 4 and DaisyUI 5 Configuration Plan

This document outlines the plan for setting up Tailwind CSS 4 and DaisyUI 5 in the ZenTask application.

## Current Understanding

Based on the documentation:
- Tailwind CSS 4 uses a new configuration approach with CSS files rather than JavaScript
- DaisyUI 5 is integrated using the `@plugin` directive in CSS
- Both tools require updated installation methods

## Installation Steps

1. **Install Tailwind CSS 4 and its PostCSS plugin**
   ```bash
   npm install -D tailwindcss@latest @tailwindcss/postcss
   ```

2. **Install DaisyUI 5**
   ```bash
   npm install -D daisyui@latest
   ```

3. **Configure PostCSS**
   
   Create or update `postcss.config.mjs`:
   ```javascript
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   ```

4. **Update CSS File**
   
   Update `src/index.css` to use the new import syntax:
   ```css
   @import "tailwindcss";
   @plugin "daisyui";
   
   /* Custom base styles */
   @layer base {
     /* ... */
   }
   
   /* Custom components */
   @layer components {
     /* ... */
   }
   
   /* Custom utilities */
   @layer utilities {
     /* ... */
   }
   ```

## Theme Configuration

Since Tailwind CSS 4 uses CSS for configuration rather than JavaScript, we'll set up our theme in the CSS file:

```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  /* Colors */
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-200: #bae6fd;
  --color-brand-300: #7dd3fc;
  --color-brand-400: #38bdf8;
  --color-brand-500: #0ea5e9;
  --color-brand-600: #0284c7;
  --color-brand-700: #0369a1;
  --color-brand-800: #075985;
  --color-brand-900: #0c4a6e;
  
  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Custom styles... */
```

## DaisyUI Configuration

We'll configure DaisyUI themes directly in our CSS file:

```css
@theme {
  /* DaisyUI theme configuration */
  --daisy-themes: {
    light: {
      "primary": "#0ea5e9",
      "secondary": "#f000b8",
      "accent": "#1dcdbc",
      "neutral": "#2b3440",
      "base-100": "#ffffff",
      "base-200": "#f9fafb",
      "base-300": "#f3f4f6",
      "info": "#3abff8",
      "success": "#36d399",
      "warning": "#fbbd23",
      "error": "#f87272"
    },
    dark: {
      "primary": "#38bdf8",
      "secondary": "#f471b5",
      "accent": "#1dcdbc",
      "neutral": "#1f2937",
      "base-100": "#111827",
      "base-200": "#1f2937",
      "base-300": "#374151",
      "info": "#3abff8",
      "success": "#36d399",
      "warning": "#fbbd23",
      "error": "#f87272"
    }
  };
  --daisy-default-theme: light;
  --daisy-dark-theme: dark;
}
```

## Custom Utility Classes

We'll define some custom utility classes that will be used throughout the application:

```css
@layer utilities {
  .flex-center {
    @apply flex items-center justify-center;
  }
  
  .flex-between {
    @apply flex items-center justify-between;
  }
  
  .transition-default {
    @apply transition-all duration-300 ease-in-out;
  }
  
  .card-hover {
    @apply hover:shadow-md transition-default;
  }
}
```

## Custom Component Classes

We'll define some custom component classes to extend DaisyUI or create our own patterns:

```css
@layer components {
  .badge-status-todo {
    @apply badge badge-outline;
  }
  
  .badge-status-in-progress {
    @apply badge badge-primary;
  }
  
  .badge-status-completed {
    @apply badge badge-success;
  }
  
  .badge-priority-low {
    @apply badge badge-info badge-outline text-xs;
  }
  
  .badge-priority-medium {
    @apply badge badge-warning badge-outline text-xs;
  }
  
  .badge-priority-high {
    @apply badge badge-error badge-outline text-xs;
  }
}
```

## Implementation Plan

1. **Backup Current Configuration**:
   - Save current `tailwind.config.js` file
   - Save current CSS imports

2. **Install New Dependencies**:
   - Install Tailwind CSS 4
   - Install @tailwindcss/postcss
   - Install DaisyUI 5

3. **Update Configuration**:
   - Create/update PostCSS configuration
   - Update CSS file with new syntax
   - Add theme configuration to CSS

4. **Migrate Custom Configuration**:
   - Transfer custom theme values from JavaScript to CSS
   - Update any custom utilities
   - Update any custom component classes

5. **Test Configuration**:
   - Verify theme values are applied correctly
   - Test responsive design
   - Test DaisyUI components
   - Verify custom utilities work as expected

6. **Update Documentation**:
   - Update development-progress.md to reflect changes
   - Document new configuration approach for team members

## Potential Challenges

1. **Migration Complexity**:
   - Moving from JavaScript to CSS configuration might require adjustments
   - Custom plugins or extensions may need updates
   
2. **DaisyUI Integration**:
   - Ensuring proper theme configuration
   - Managing dark mode correctly
   
3. **PostCSS Setup**:
   - Ensuring compatibility with other PostCSS plugins
   - Properly configuring the build pipeline

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [DaisyUI v5 Documentation](https://daisyui.com/docs)
- [PostCSS Documentation](https://postcss.org/) 