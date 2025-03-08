# DaisyUI Essential Documentation

## 1. Theme System

```css
/* Theme Colors - Available in all components */
.primary
.secondary
.accent
.neutral
.base-100
.base-200
.base-300
```

## 2. Core Component Configuration

### Base Component Structure

```typescript
{
  component: string;      // Component type
  theme?: string;        // Theme color
  size?: string;         // Component size
  variant?: string;      // Style variant
  state?: string;        // Component state
}
```

### Essential Classes

```css
/* Sizing System */
.[component]-xs
.[component]-sm
.[component]-md
.[component]-lg

/* States */
.[component]-active
.[component]-disabled
.[component]-hover
.[component]-focus
```

## 3. Responsive Design

### Breakpoints

```css
/* DaisyUI follows Tailwind breakpoints */
sm: '640px'    // Small devices
md: '768px'    // Medium devices
lg: '1024px'   // Large devices
xl: '1280px'   // Extra large devices
2xl: '1536px'  // 2X extra large devices
```

### Responsive Classes

```css
/* Format */
.[size]:[class]

/* Example */
.md:btn-lg
.lg:card-side
```

## 4. Layout System

### Grid

```css
/* Basic Grid */
.grid
.grid-cols-[1-12]
.gap-[0-16]

/* Responsive Grid */
.md:grid-cols-2
.lg:grid-cols-3
```

### Spacing

```css
/* Padding */
.p-[0-20]
.px-[0-20]
.py-[0-20]

/* Margin */
.m-[0-20]
.mx-[0-20]
.my-[0-20]
```

## 5. Essential Components

### Button

```css
.btn {
  base: btn;
  variants: [primary, secondary, accent, ghost];
  sizes: [xs, sm, md, lg];
  states: [active, disabled];
}
```

### Card

```css
.card {
  base: card;
  parts: [body, title, actions];
  variants: [bordered, compact];
  image: image-full;
}
```

### Input

```css
.input {
  base: input;
  variants: [bordered, ghost];
  sizes: [xs, sm, md, lg];
  states: [error, success, disabled];
}
```

### Form

```css
.form-control {
  base: form-control;
  label: label;
  helper: [info, error, success];
}
```

## 6. Quick Reference

### Theme Colors

```css
/* Main Colors */
primary: #570df8    // Primary buttons, active states
secondary: #f000b8  // Secondary elements
accent: #37cdbe     // Accent elements
neutral: #3d4451    // Neutral elements

/* Base Colors */
base-100: #ffffff   // Main background
base-200: #f2f2f2   // Secondary background
base-300: #e5e6e6   // Tertiary background
```

### Common Patterns

```css
/* Component Base */
.[component]-[variant]-[size]-[state]

/* Spacing */
.[p|m][x|y]-[0-20]

/* Grid */
.grid-cols-[1-12]
```

### Best Practices

1. Always use base classes
2. Apply variants before sizes
3. States come last
4. Use responsive classes when needed
5. Follow component hierarchy

This documentation focuses on the essential aspects needed for generating components. For full documentation, refer to [DaisyUI's official documentation](https://daisyui.com/)
