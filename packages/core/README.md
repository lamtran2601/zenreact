# @zenreact/core

Core optimization utilities for React applications.

## Installation

```bash
npm install @zenreact/core
# or
yarn add @zenreact/core
# or
pnpm add @zenreact/core
```

## Usage

### useOptimizedState

A performance-optimized version of useState that prevents unnecessary rerenders.

```tsx
import { useOptimizedState } from '@zenreact/core';

function Counter() {
  const [count, setCount] = useOptimizedState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### withOptimization

A Higher Order Component (HOC) that optimizes React components by preventing unnecessary rerenders.

```tsx
import { withOptimization } from '@zenreact/core';

interface Props {
  name: string;
}

function Greeting({ name }: Props) {
  return <h1>Hello, {name}!</h1>;
}

// Basic usage
const OptimizedGreeting = withOptimization(Greeting);

// With debug option
const DebuggedGreeting = withOptimization(Greeting, {
  debug: true,
  name: 'Greeting', // Custom name for debug logs
});
```

## Contributing

Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## License

MIT
