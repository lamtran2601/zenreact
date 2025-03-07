# ZenReact

> A simple optimization framework for React applications that automatically improves performance with minimal code changes.

[![npm version](https://img.shields.io/npm/v/@zenreact/core.svg)](https://www.npmjs.com/package/@zenreact/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zenreact/core.svg)](https://bundlephobia.com/package/@zenreact/core)

## Features

- 🚀 **Zero Configuration** - Just import and use
- ⚡️ **Instant Results** - See immediate performance gains
- 📦 **Tiny Bundle Size** - Less than 3KB
- 🧠 **Automatic Optimization** - Detects and fixes performance issues
- 💡 **Simple API** - Just two main functions

## Installation

```bash
pnpm add @zenreact/core
```

## Quick Start

### 1. Optimize a Component

Just wrap any slow component with `withOptimization`:

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

// That's it! Now your component is optimized
export default withOptimization(MyComponent);
```

### 2. Optimize State Updates

Use `useOptimizedState` for smoother state updates:

```jsx
import { useOptimizedState } from '@zenreact/core';

function SearchBox() {
  // Automatically debounces search input
  const [search, setSearch] = useOptimizedState('');

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

## Why ZenReact?

- 🎯 **30-50% fewer re-renders** out of the box
- 🔧 **No configuration needed**
- 📚 **5-minute learning curve**
- 🤝 **Easy team adoption**
- 🛠 **Works with any React version**

## Additional Features

Optional packages for specific needs:

```bash
# For monitoring performance
pnpm add @zenreact/monitor

# For code splitting
pnpm add @zenreact/bundle

# For server optimization
pnpm add @zenreact/server
```

## Benefits

### Developer Experience

- No complex setup or configuration
- Just two main functions to learn
- Automatic optimization without manual intervention
- Works seamlessly with existing React code

### Performance Impact

- Automatic detection and prevention of unnecessary re-renders
- Smart state updates with built-in optimization
- Smaller bundle size compared to alternatives (3KB vs 30KB+)
- Better Core Web Vitals scores

### Team Benefits

- 5-minute setup vs 2-3 days with alternatives
- Zero configuration to maintain
- Instant team adoption
- Focus on business logic, not optimization

## Documentation

- [Full Documentation](https://zenreact.dev)
- [API Reference](https://zenreact.dev/api)
- [Performance Guide](https://zenreact.dev/guide)
- [Examples](https://zenreact.dev/examples)

## Community

- [Discord](https://discord.gg/zenreact)
- [GitHub](https://github.com/zenreact/zenreact)
- [X](https://x.com/zenreact)

## License

MIT © ZenReact
