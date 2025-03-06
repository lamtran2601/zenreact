---
layout: home
hero:
  name: 'ZenReact'
  text: 'High-performance React optimization framework'
  tagline: Automatically improve your React app's performance with minimal code changes
  image:
    src: /logo.png
    alt: ZenReact
  actions:
    - theme: brand
      text: Get Started
      link: /guide/quick-start
    - theme: alt
      text: View on GitHub
      link: https://github.com/lamtran2601/zenreact
    - theme: alt
      text: API Reference
      link: /api/

features:
  - icon: 🚀
    title: Zero Configuration
    details: Just import and use. No complex setup or configuration needed.
  - icon: ⚡️
    title: Instant Results
    details: See immediate performance gains with minimal code changes.
  - icon: 📦
    title: Tiny Bundle Size
    details: Less than 3KB gzipped. No bloat added to your application.
  - icon: 🧠
    title: Automatic Optimization
    details: Automatically detects and fixes performance issues in your components.
  - icon: 💡
    title: Simple API
    details: Just two main functions to learn - withOptimization and useOptimizedState.
  - icon: 🛠
    title: Production Ready
    details: Built for scale, tested in production environments.
---

## Quick Start

```bash
# Install using your preferred package manager
pnpm add @zenreact/core
```

### Optimize a Component

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

### Optimize State Updates

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

[Get started now](/guide/quick-start) with our comprehensive guide, or check out our [API reference](/api/) for detailed documentation.
