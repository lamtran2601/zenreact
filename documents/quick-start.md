# ZenReact Quick Start Guide

## What is ZenReact?

ZenReact is a simple optimization framework for React applications that automatically improves performance with minimal code changes.

## Basic Usage (5 Minutes)

### 1. Install

```bash
npm install @zenreact/core
```

### 2. Optimize a Component

Just wrap any slow component with `withOptimization`:

```jsx
import { withOptimization } from "@zenreact/core";

function MyComponent({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

// That's it! Now your component is optimized
export default withOptimization(MyComponent);
```

### 3. Optimize State Updates

Use `useOptimizedState` for smoother state updates:

```jsx
import { useOptimizedState } from "@zenreact/core";

function SearchBox() {
  // Automatically debounces search input
  const [search, setSearch] = useOptimizedState("");

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

## That's It!

These two features handle 90% of common performance issues:

- `withOptimization` - Stops unnecessary re-renders
- `useOptimizedState` - Makes state updates more efficient

## When You Need More

Optional packages for specific needs:

```bash
# For monitoring performance
npm install @zenreact/monitor

# For code splitting
npm install @zenreact/bundle

# For server optimization
npm install @zenreact/server
```

## Next Steps

- Check the detailed user guide: documents/user-guide.md
- Join Discord: discord.gg/zenreact
- Visit docs: zenreact.dev

ZenReact aims to be simple first - you can start with just the core optimization features and add more as needed.
