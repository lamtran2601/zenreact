---
name: React
version: 18.2.0
type: runtime
category: ui
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: react-dom
    - type: enhancedBy
      target: react-router-dom
  features:
    - name: Components
      category: core
      status: stable
    - name: Hooks
      category: core
      status: stable
    - name: Concurrent Features
      category: core
      status: stable
    - name: Server Components
      category: core
      status: beta
  compatibility:
    node: '>=16.14.0'
    typescript: '>=4.8.0'
---

# React

## Overview

```metadata
{
  "description": "A JavaScript library for building user interfaces with declarative, component-based architecture",
  "primaryUse": "Building dynamic single-page applications and interactive UIs",
  "ecosystemRole": "Core UI framework for modern web applications"
}
```

## Core Concepts

```concepts
{
  "fundamentals": [
    {
      "name": "Components",
      "description": "Reusable UI building blocks that manage their own state and render logic",
      "importance": "Enables modular and maintainable UI development"
    },
    {
      "name": "Virtual DOM",
      "description": "In-memory representation of UI that optimizes rendering updates",
      "importance": "Provides efficient DOM updates and better performance"
    },
    {
      "name": "Hooks",
      "description": "Functions that enable state and lifecycle features in functional components",
      "importance": "Simplifies state management and side effects in components"
    },
    {
      "name": "Concurrent Features",
      "description": "Capabilities for handling multiple UI updates with different priorities",
      "importance": "Enables better user experience through prioritized rendering"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install react@18.2.0 react-dom@18.2.0
```

### Basic Configuration

```typescript
// TypeScript type definitions
interface ComponentProps {
  name: string;
  children?: React.ReactNode;
}

// Example configuration
const App: React.FC<ComponentProps> = ({ name, children }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {children}
    </div>
  );
};
```

## API Reference

```api
{
  "mainExports": [
    {
      "name": "useState",
      "type": "hook",
      "description": "Manages state in functional components",
      "parameters": [
        {
          "name": "initialState",
          "type": "T | () => T",
          "description": "Initial state value or function"
        }
      ],
      "returnType": "[T, (newValue: T) => void]",
      "examples": ["const [count, setCount] = useState(0)"]
    },
    {
      "name": "useEffect",
      "type": "hook",
      "description": "Handles side effects in components",
      "parameters": [
        {
          "name": "effect",
          "type": "() => void | () => void",
          "description": "Effect function with optional cleanup"
        }
      ],
      "returnType": "void",
      "examples": ["useEffect(() => { document.title = title }, [title])"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Container/Presenter

```typescript
// Container component handles logic
const UserContainer: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return <UserPresenter user={user} />;
};

// Presenter component handles rendering
const UserPresenter: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};
```

```pattern-metadata
{
  "name": "Container/Presenter",
  "useCase": "Separating logic from presentation",
  "benefits": ["Better separation of concerns", "Improved testability", "Reusable presentation layer"],
  "tradeoffs": ["Additional boilerplate", "More files to manage"]
}
```

## Best Practices

```best-practices
{
  "categories": [
    {
      "name": "Performance",
      "practices": [
        {
          "rule": "Memoize expensive computations",
          "rationale": "Prevents unnecessary recalculations on re-renders",
          "example": "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])"
        },
        {
          "rule": "Use React.memo for pure components",
          "rationale": "Prevents unnecessary re-renders of stable components",
          "example": "export default React.memo(MyComponent)"
        }
      ]
    },
    {
      "name": "State Management",
      "practices": [
        {
          "rule": "Lift state to appropriate level",
          "rationale": "Maintains single source of truth",
          "example": "const [shared, setShared] = useState(null)"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With TypeScript

```typescript
import React from 'react';

interface UserProps {
  name: string;
  age: number;
}

const User: React.FC<UserProps> = ({ name, age }) => (
  <div>
    {name} is {age} years old
  </div>
);
```

```integration-metadata
{
  "technology": "TypeScript",
  "complexity": "low",
  "requirements": ["TypeScript >=4.8.0", "@types/react"]
}
```

## Error Handling

```error-handling
{
  "commonErrors": [
    {
      "type": "InvalidHookCall",
      "cause": "Using hooks outside of component function or not at top level",
      "solution": "Only call hooks at the top level of functional components",
      "example": "const Component = () => { const [state] = useState(null); }"
    },
    {
      "type": "MissingDependency",
      "cause": "Incomplete dependency array in useEffect",
      "solution": "Include all dependencies used in effect",
      "example": "useEffect(() => { console.log(count) }, [count])"
    }
  ]
}
```

## Performance Considerations

```performance
{
  "metrics": [
    {
      "aspect": "Component re-renders",
      "impact": "Can cause UI jank and poor performance",
      "optimization": "Use React.memo, useMemo, and useCallback appropriately"
    },
    {
      "aspect": "Bundle size",
      "impact": "Affects initial load time",
      "optimization": "Implement code splitting and lazy loading"
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
      "url": "https://react.dev",
      "description": "Official React documentation"
    },
    {
      "type": "repository",
      "url": "https://github.com/facebook/react",
      "description": "React source code"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://react-typescript-cheatsheet.netlify.app",
      "description": "React TypeScript Cheatsheet"
    }
  ]
}
```

## Version History

```versions
{
  "latest": "18.2.0",
  "breaking": [
    {
      "version": "18.0.0",
      "changes": [
        "Automatic batching for all updates",
        "New Suspense features",
        "New Client and Server Rendering APIs",
        "New Strict Mode behaviors"
      ]
    }
  ]
}
```
