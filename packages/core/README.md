# @zenreact/core

> Core optimization features for ZenReact - High-performance React state management and rendering optimization

[![npm version](https://img.shields.io/npm/v/@zenreact/core.svg)](https://www.npmjs.com/package/@zenreact/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zenreact/core.svg)](https://bundlephobia.com/package/@zenreact/core)
[![npm downloads](https://img.shields.io/npm/dm/@zenreact/core.svg)](https://www.npmjs.com/package/@zenreact/core)

## Installation

```bash
pnpm add @zenreact/core
```

### Peer Dependencies

- React 17.0.0+ or 18.0.0+
- ReactDOM 17.0.0+ or 18.0.0+

## API

### withOptimization

Higher-order component (HOC) that automatically optimizes React component rendering:

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

export default withOptimization(MyComponent);
```

The HOC:
- Prevents unnecessary re-renders
- Implements smart prop comparison
- Maintains component display name for debugging
- Zero configuration required

### useOptimizedState

Hook that provides optimized state management:

```jsx
import { useOptimizedState } from '@zenreact/core';

function SearchBox() {
  const [search, setSearch] = useOptimizedState("");

  return (
    <input 
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
    />
  );
}
```

Features:
- Automatic debouncing of rapid updates
- Smart value comparison
- Memory efficient
- Type-safe (TypeScript support)

## Package Details

- **Side Effects**: None (`sideEffects: false`)
- **Module Formats**: 
  - CommonJS: `dist/index.js`
  - ESM: `dist/index.esm.js`
  - TypeScript types: `dist/index.d.ts`
- **Bundle Size**: < 3KB minified + gzipped
- **Browser Support**: All modern browsers, IE11 with polyfills

## Development

### Build

```bash
pnpm build
```

Builds the package using TypeScript and Rollup.

### Test

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

Uses Jest with React Testing Library.

### Type Check

```bash
pnpm typecheck
```

Runs TypeScript type checking without emission.

## Contributing

Please see the [Contributing Guide](../../CONTRIBUTING.md).

## Documentation

- [Full Documentation](https://zenreact.dev)
- [API Reference](https://zenreact.dev/api/core)
- [Examples](https://zenreact.dev/examples)

## License

MIT © [Zen Development Team](https://zenreact.dev)