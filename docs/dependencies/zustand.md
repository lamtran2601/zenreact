---
name: Zustand
version: 5.0.3
type: runtime
category: state
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: enhancedBy
      target: redux-devtools-extension
    - type: enhancedBy
      target: typescript
  features:
    - name: State Management
      category: core
      status: stable
    - name: Middleware System
      category: core
      status: stable
    - name: Persistence
      category: addon
      status: stable
    - name: DevTools Integration
      category: addon
      status: stable
  compatibility:
    node: '>=16.0.0'
    typescript: '>=4.5.0'
---

# Zustand

## Overview

```metadata
{
  "description": "A small, fast, and scalable state management solution using simplified flux principles",
  "primaryUse": "Managing application state in React applications",
  "ecosystemRole": "Lightweight alternative to complex state management solutions"
}
```

## Core Concepts

```concepts
{
  "fundamentals": [
    {
      "name": "Store",
      "description": "Single source of truth for application state",
      "importance": "Centralized state management without context providers"
    },
    {
      "name": "Selectors",
      "description": "Functions to extract specific pieces of state",
      "importance": "Optimized rendering and state access"
    },
    {
      "name": "Actions",
      "description": "Methods to update the store state",
      "importance": "Encapsulated state mutations and business logic"
    },
    {
      "name": "Middleware",
      "description": "Plugins to extend store functionality",
      "importance": "Adds features like persistence and dev tools"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install zustand@5.0.3
```

### Basic Configuration

```typescript
// TypeScript type definitions
interface StoreState {
  bears: number;
  increase: () => void;
}

// Basic store setup
import { create } from 'zustand';

const useStore = create<StoreState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

## API Reference

```api
{
  "mainExports": [
    {
      "name": "create",
      "type": "function",
      "description": "Creates a new store hook",
      "parameters": [
        {
          "name": "storeCreator",
          "type": "(set, get, store) => State",
          "description": "Function that defines the store"
        }
      ],
      "returnType": "useStore hook",
      "examples": ["const useStore = create((set) => ({ count: 0 }))"]
    },
    {
      "name": "useStore",
      "type": "hook",
      "description": "Hook to access store state",
      "parameters": [
        {
          "name": "selector",
          "type": "(state: State) => Selected",
          "description": "Optional selector function"
        }
      ],
      "returnType": "Selected state",
      "examples": ["const bears = useStore((state) => state.bears)"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Async State Management

```typescript
interface AsyncStore {
  data: any | null;
  loading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
}

const useStore = create<AsyncStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true });
    try {
      const response = await api.getData();
      set({ data: response, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
```

```pattern-metadata
{
  "name": "Async State Management",
  "useCase": "Handling asynchronous data fetching",
  "benefits": ["Loading states", "Error handling", "Clean API"],
  "tradeoffs": ["More complex than basic state", "Need error boundaries"]
}
```

## Best Practices

```best-practices
{
  "categories": [
    {
      "name": "State Design",
      "practices": [
        {
          "rule": "Keep stores small and focused",
          "rationale": "Better maintainability and performance",
          "example": "Split large stores into domain-specific stores"
        },
        {
          "rule": "Use selectors for state access",
          "rationale": "Optimized re-renders",
          "example": "useStore(state => state.specificValue)"
        }
      ]
    },
    {
      "name": "Performance",
      "practices": [
        {
          "rule": "Implement shallow equality checks",
          "rationale": "Prevents unnecessary re-renders",
          "example": "useStore(state => state.value, shallow)"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With React Components

```typescript
function BearCounter() {
  const bears = useStore((state) => state.bears);
  const increase = useStore((state) => state.increase);

  return (
    <div>
      <h1>{bears} bears</h1>
      <button onClick={increase}>Add bear</button>
    </div>
  );
}
```

```integration-metadata
{
  "technology": "React",
  "complexity": "low",
  "requirements": ["React >=16.8.0", "TypeScript (optional)"]
}
```

## Error Handling

```error-handling
{
  "commonErrors": [
    {
      "type": "StaleState",
      "cause": "Reading state outside of React lifecycle",
      "solution": "Use useStore hook or getState() appropriately",
      "example": "const state = useStore.getState()"
    },
    {
      "type": "SelectorMismatch",
      "cause": "Incorrect selector implementation",
      "solution": "Ensure selector returns desired state slice",
      "example": "useStore(state => state.specific.value)"
    }
  ]
}
```

## Performance Considerations

```performance
{
  "metrics": [
    {
      "aspect": "Bundle Size",
      "impact": "Minimal (~1KB)",
      "optimization": "Tree-shakeable, no extra imports needed"
    },
    {
      "aspect": "Re-renders",
      "impact": "Optimized by default",
      "optimization": "Use selectors and shallow equality checks"
    }
  ]
}
```

## Resources

```resources
{
  "official": [
    {
      "type": "documentation",
      "url": "https://github.com/pmndrs/zustand",
      "description": "Official documentation"
    },
    {
      "type": "examples",
      "url": "https://github.com/pmndrs/zustand/tree/main/examples",
      "description": "Official examples"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://github.com/pmndrs/zustand/blob/main/docs/typescript.md",
      "description": "TypeScript integration guide"
    }
  ]
}
```

## Version History

```versions
{
  "latest": "5.0.3",
  "breaking": [
    {
      "version": "5.0.0",
      "changes": [
        "New middleware system",
        "Improved TypeScript support",
        "Changed subscription behavior",
        "Updated middleware APIs"
      ]
    }
  ]
}
```
