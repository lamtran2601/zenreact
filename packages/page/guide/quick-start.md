---
title: Quick Start
description: Get started with ZenReact in under 5 minutes
head:
  - - meta
    - name: description
      content: Learn how to use ZenReact to optimize your React applications in just a few minutes.
---

# Quick Start Guide

This guide will help you get started with ZenReact in under 5 minutes.

## Installation

Install ZenReact using your package manager:

::: code-group

```bash [pnpm]
pnpm add @zenreact/core
```

```bash [yarn]
yarn add @zenreact/core
```

```bash [npm]
npm install @zenreact/core
```

:::

## Basic Usage

### 1. Optimize a Component

The easiest way to improve performance is to wrap any slow component with `withOptimization`:

```jsx
import { withOptimization } from '@zenreact/core';

function MyComponent({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

// That's it! Your component is now optimized
export default withOptimization(MyComponent);
```

::: tip How it works
`withOptimization` automatically:

- Prevents unnecessary re-renders
- Optimizes prop comparisons
- Handles memoization
  :::

### 2. Optimize State Updates

Use `useOptimizedState` for smoother state updates:

```jsx
import { useOptimizedState } from '@zenreact/core';

function SearchBox() {
  // Automatically debounces search input
  const [search, setSearch] = useOptimizedState('');

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Start typing..."
    />
  );
}
```

::: tip Smart Updates
`useOptimizedState` automatically:

- Debounces rapid updates
- Batches state changes
- Optimizes re-renders
  :::

## That's It!

You've learned the two main features that handle 90% of common performance issues:

- `withOptimization` - Stops unnecessary re-renders
- `useOptimizedState` - Makes state updates more efficient

## Additional Features

For more specific needs, ZenReact offers additional packages:

::: code-group

```bash [pnpm]
# For monitoring performance
pnpm add @zenreact/monitor

# For code splitting
pnpm add @zenreact/bundle

# For server optimization
pnpm add @zenreact/server
```

```bash [yarn]
# For monitoring performance
yarn add @zenreact/monitor

# For code splitting
yarn add @zenreact/bundle

# For server optimization
yarn add @zenreact/server
```

```bash [npm]
# For monitoring performance
npm install @zenreact/monitor

# For code splitting
npm install @zenreact/bundle

# For server optimization
npm install @zenreact/server
```

:::

## Next Steps

- Check out our detailed [API Reference](/api/) for advanced features
- Read our [Best Practices Guide](/guide/best-practices) for optimization tips
- Join our [Discord Community](https://discord.gg/zenreact) for support
- View [Example Projects](/examples/) to see ZenReact in action

::: info Philosophy
ZenReact aims to be simple first - start with just the core optimization features and add more as needed. Most applications see significant performance improvements with just the basic features.
:::
