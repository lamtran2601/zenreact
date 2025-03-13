---
title: State Management with ZenReact
description: Learn how to efficiently manage state in React applications using ZenReact's optimized state solutions
date: 2025-03-06
author: Zen React Team
---

# State Management with ZenReact

Modern React applications often struggle with state management complexity and performance. ZenReact provides simple, efficient state management solutions that work out of the box.

## Common State Challenges

### Performance Issues

- Unnecessary re-renders
- Complex state updates
- Prop drilling
- State synchronization

### Traditional Solutions

```jsx
// Traditional approach with multiple hooks
const MyComponent = () => {
  const [data, setData] = useState(initial);
  const debouncedData = useDebounce(data, 300);
  const memoizedValue = useMemo(() => process(data), [data]);
  const throttledUpdate = useCallback(
    throttle((value) => setData(value), 200),
    []
  );
};
```

## ZenReact Solution

### useOptimizedState Hook

```jsx
import { useOptimizedState } from '@zenreact/core';

// Simple, efficient state management
const MyComponent = () => {
  const [data, setData] = useOptimizedState(initialData);

  return <div onClick={() => setData(newValue)}>{data}</div>;
};
```

Key features:

- Automatic update optimization
- Smart value comparison
- Built-in performance monitoring
- Zero configuration required

### Smart Updates

ZenReact automatically:

- Batches related updates
- Prevents unnecessary re-renders
- Optimizes memory usage
- Handles complex state structures

```jsx
// Complex state updates made simple
const [state, setState] = useOptimizedState({
  user: {
    profile: {
      preferences: {
        theme: 'light',
      },
    },
  },
});

// ZenReact handles deep updates efficiently
setState({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      preferences: {
        ...state.user.profile.preferences,
        theme: 'dark',
      },
    },
  },
});
```

## Integration Guide

### With Context API

```jsx
import { createContext } from 'react';
import { useOptimizedState } from '@zenreact/core';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useOptimizedState({
    mode: 'light',
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
    },
  });

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};
```

### With Redux

```jsx
import { useOptimizedState } from '@zenreact/core';

// Local component state
const ConnectedComponent = () => {
  const reduxData = useSelector(selector);
  const [localState, setLocalState] = useOptimizedState({
    // Local state that benefits from optimization
  });

  return (
    // Component JSX
  );
};
```

### With Global State

```jsx
// Create an optimized global store
const createStore = (initialState) => {
  const [state, setState] = useOptimizedState(initialState);

  const actions = {
    update: (newState) => setState(newState),
    reset: () => setState(initialState),
  };

  return [state, actions];
};
```

## Best Practices

### State Organization

1. **Separate Concerns**

```jsx
// Good: Organized state by feature
const UserProfile = () => {
  const [profile, setProfile] = useOptimizedState({
    personal: { name: '', email: '' },
    preferences: { theme: 'light', notifications: true },
    settings: { privacy: 'public' },
  });
};

// Avoid: Flat, mixed state
const UserProfile = () => {
  const [name, setName] = useOptimizedState('');
  const [email, setEmail] = useOptimizedState('');
  const [theme, setTheme] = useOptimizedState('light');
  // ...more individual states
};
```

2. **Colocate Related State**

```jsx
const FormSection = () => {
  const [formData, setFormData] = useOptimizedState({
    input: '',
    validation: null,
    touched: false,
  });
};
```

### Update Patterns

1. **Batch Updates**

```jsx
// Good: Single update for multiple changes
const [state, setState] = useOptimizedState(initial);
setState({
  ...state,
  field1: newValue1,
  field2: newValue2,
});

// Avoid: Multiple separate updates
setState({ ...state, field1: newValue1 });
setState({ ...state, field2: newValue2 });
```

2. **Partial Updates**

```jsx
const [user, setUser] = useOptimizedState({
  profile: { name: 'John', age: 30 },
  settings: { theme: 'light' },
});

// Update specific nested values
setUser({
  ...user,
  settings: { ...user.settings, theme: 'dark' },
});
```

## Advanced Patterns

### Form Management

```jsx
const OptimizedForm = () => {
  const [form, setForm] = useOptimizedState({
    values: {},
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const handleChange = (field, value) => {
    setForm({
      ...form,
      values: { ...form.values, [field]: value },
      touched: { ...form.touched, [field]: true },
    });
  };

  return (
    <form>
      <input
        value={form.values.name || ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
    </form>
  );
};
```

### Data Caching

```jsx
const CachedData = () => {
  const [cache, setCache] = useOptimizedState({
    data: {},
    timestamp: {},
    loading: {},
  });

  const fetchData = async (key) => {
    if (cache.data[key] && Date.now() - cache.timestamp[key] < 60000) {
      return cache.data[key];
    }

    setCache({
      ...cache,
      loading: { ...cache.loading, [key]: true },
    });

    const data = await apiCall(key);

    setCache({
      data: { ...cache.data, [key]: data },
      timestamp: { ...cache.timestamp, [key]: Date.now() },
      loading: { ...cache.loading, [key]: false },
    });
  };
};
```

### Real-time Updates

```jsx
const LiveData = () => {
  const [stream, setStream] = useOptimizedState({
    data: [],
    lastUpdate: null,
    connected: false,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://api.example.com');

    ws.onmessage = (event) => {
      setStream({
        ...stream,
        data: [...stream.data, JSON.parse(event.data)],
        lastUpdate: Date.now(),
      });
    };
  }, []);
};
```

## Migration Guide

### From useState

```jsx
// Before
const [state, setState] = useState(initial);

// After
const [state, setState] = useOptimizedState(initial);
```

### From useReducer

```jsx
// Before
const [state, dispatch] = useReducer(reducer, initial);

// After
const [state, setState] = useOptimizedState(initial);
const dispatch = useCallback((action) => {
  setState((prev) => reducer(prev, action));
}, []);
```

## Summary

ZenReact's state management:

- Simplifies complex state logic
- Improves performance automatically
- Integrates with existing solutions
- Requires zero configuration

Start using `useOptimizedState` today for efficient, optimized state management in your React applications.
