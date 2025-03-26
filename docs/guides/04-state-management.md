# State Management for Autonomous React Development

This guide outlines the state management approaches for React applications in the ZenReact framework, with a focus on maintainable patterns that work well with AI-assisted development.

## State Management Philosophy

ZenReact follows these core principles for state management:

1. **Appropriate Scope**: Place state at the appropriate level of the component hierarchy
2. **Clear Boundaries**: Establish clear boundaries between different types of state
3. **Consistent Patterns**: Use consistent patterns for each type of state
4. **Explicit Relationships**: Make data flow and state relationships explicit
5. **Optimized Updates**: Minimize unnecessary re-renders from state changes

## State Categories

### 1. UI State

**Definition**: State that controls UI elements and interactions.

**Examples**:
- Form input values
- Modal open/closed status
- Accordion expanded/collapsed state
- Tab selection
- Hover/focus states

**Recommended Approach**: 
- Local component state with `useState` or `useReducer`
- Lifted state for shared UI elements

### 2. Application State

**Definition**: State that affects multiple components across different parts of the application.

**Examples**:
- User authentication
- Theme settings
- Global notifications
- Shopping cart
- Feature flags

**Recommended Approach**:
- Zustand for most application state
- Context API for theme or localization

### 3. Server State

**Definition**: Data fetched from APIs that represents server-side state.

**Examples**:
- User profile data
- Product information
- Transaction history
- Analytics data
- Configuration settings

**Recommended Approach**:
- React Query for all API data

### 4. Form State

**Definition**: State specific to form handling and validation.

**Examples**:
- Input values
- Validation state
- Form submission status
- Field errors

**Recommended Approach**:
- React Hook Form for complex forms
- useState for simple forms

## State Management Technologies

### Local Component State

Use React's built-in state management for component-specific state:

```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state with reducer
type State = {
  isLoading: boolean;
  data: Data[] | null;
  error: Error | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Data[] }
  | { type: 'FETCH_ERROR'; payload: Error };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, {
  isLoading: false,
  data: null,
  error: null,
});
```

**When to use**:
- Component-specific UI state
- Form state for simple forms
- State that doesn't need to be shared

### Zustand for Global State

Use Zustand for application-wide state:

```typescript
// store/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Usage in components
const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </Button>
  );
};
```

**When to use**:
- Application-wide state
- State that needs to persist across page refreshes
- State shared across unrelated components

### React Query for Server State

Use React Query for all API data:

```typescript
// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct } from '@/api/products';

export function useProducts(categoryId?: string) {
  return useQuery({
    queryKey: ['products', { categoryId }],
    queryFn: () => getProducts(categoryId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate products queries to refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Usage in components
const ProductList = ({ categoryId }) => {
  const { data, isLoading, error } = useProducts(categoryId);
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

**When to use**:
- Any data from APIs
- Data that needs caching, deduplication, and background updates
- Data shared across components

### Context API

Use Context for theme, localization, or feature-specific state:

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, login as apiLogin, logout as apiLogout } from '@/api/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // Get user from token or session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await apiLogin(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usage
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

const ProfilePage = () => {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
```

**When to use**:
- Theme or localization
- Authentication state
- Feature-specific shared state
- Deep component trees where prop drilling would be cumbersome

### React Hook Form

Use React Hook Form for complex forms:

```typescript
// components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

**When to use**:
- Complex forms with validation
- Forms with many fields
- Forms with dynamic fields

## State Management Decision Tree

Follow this decision tree to determine the appropriate state management approach:

```
Is this UI state specific to a single component?
├── Yes: Is it simple state (boolean, string, number)?
│   ├── Yes: Use useState
│   └── No: Use useReducer for complex state
└── No: Does the state need to be shared across the application?
    ├── Yes: Is it server data?
    │   ├── Yes: Use React Query
    │   └── No: Is it authentication or theme?
    │       ├── Yes: Consider Context API
    │       └── No: Use Zustand
    └── No: Is the state shared within a feature?
        ├── Yes: Consider a feature-level Context or Zustand store
        └── No: Lift state up to a common ancestor
```

## State Management Patterns

### 1. Container/Presenter Pattern

Separate data fetching and state management from presentation:

```typescript
// Container component
const UserProfileContainer = () => {
  const { data: user, isLoading, error } = useUser();
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;
  
  return <UserProfile user={user} />;
};

// Presenter component
interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Other UI */}
    </div>
  );
};
```

### 2. Custom Hooks for Reusable Logic

Extract complex state logic into custom hooks:

```typescript
// hooks/useCounter.ts
import { useState, useCallback } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export function useCounter({
  initialValue = 0,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}: UseCounterOptions = {}) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => Math.min(prev + step, max));
  }, [step, max]);
  
  const decrement = useCallback(() => {
    setCount(prev => Math.max(prev - step, min));
  }, [step, min]);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}

// Usage
const QuantitySelector = () => {
  const { count, increment, decrement } = useCounter({
    initialValue: 1,
    min: 1,
    max: 10,
  });
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};
```

### 3. State Machines for Complex UI

Use state machines for complex UI interactions:

```typescript
// Simplified example using useReducer as a state machine
interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: FormData | null;
  error: Error | null;
}

type FormAction =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; payload: FormData }
  | { type: 'ERROR'; payload: Error }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SUBMIT':
      return { ...state, status: 'loading', error: null };
    case 'SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return { status: 'idle', data: null, error: null };
    default:
      return state;
  }
};

const SubmitForm = () => {
  const [state, dispatch] = useReducer(formReducer, {
    status: 'idle',
    data: null,
    error: null,
  });
  
  const handleSubmit = async (formData: FormData) => {
    dispatch({ type: 'SUBMIT' });
    
    try {
      const result = await submitFormData(formData);
      dispatch({ type: 'SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error as Error });
    }
  };
  
  // Render based on state
  if (state.status === 'loading') return <Spinner />;
  if (state.status === 'success') return <SuccessMessage data={state.data} />;
  if (state.status === 'error') return <ErrorMessage error={state.error} />;
  
  return <Form onSubmit={handleSubmit} />;
};
```

### 4. Selective Re-rendering with Memoization

Optimize rendering performance with memoization:

```typescript
// Prevent unnecessary re-renders with useMemo and React.memo
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = React.memo<TodoItemProps>(({ todo, onToggle, onDelete }) => {
  // Only re-renders if todo, onToggle, or onDelete change
  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);
  
  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});
```

## Testing State Management

### 1. Testing Local State

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count when button is clicked', () => {
  render(<Counter />);
  
  const count = screen.getByText('0');
  const incrementButton = screen.getByText('+');
  
  fireEvent.click(incrementButton);
  
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 2. Testing Zustand Stores

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounterStore } from './counterStore';

beforeEach(() => {
  // Clear store state between tests
  useCounterStore.setState({ count: 0 });
});

test('should increment counter', () => {
  const { result } = renderHook(() => useCounterStore());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### 3. Testing React Query

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import { getProducts } from '../api/products';

// Mock API
jest.mock('../api/products');

// Create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('useProducts returns data on successful fetch', async () => {
  const mockData = [{ id: '1', name: 'Product 1' }];
  (getProducts as jest.Mock).mockResolvedValue(mockData);
  
  const { result, waitFor } = renderHook(() => useProducts(), {
    wrapper: createWrapper(),
  });
  
  await waitFor(() => result.current.isSuccess);
  
  expect(result.current.data).toEqual(mockData);
});
```

## Common State Management Pitfalls

### 1. Over-Centralization

**Problem**: Putting too much state in global stores making it hard to track changes.

**Solution**: Keep state as local as possible. Only lift state up or globalize when necessary.

### 2. Prop Drilling

**Problem**: Passing props through many component layers.

**Solution**: Use Context API for deeply nested components or reorganize component structure.

### 3. Context Hell

**Problem**: Too many nested Context providers.

**Solution**: Combine related contexts, use a single provider component, or consider Zustand for global state.

### 4. Inconsistent State Management

**Problem**: Using different patterns for similar state management needs.

**Solution**: Follow the state management decision tree and maintain consistent patterns.

### 5. Unnecessary Re-renders

**Problem**: State changes causing unnecessary component re-renders.

**Solution**: Use memoization (React.memo, useMemo, useCallback) and optimize component structure.

## AI Collaboration for State Management

When working with AI on state management:

### 1. Clarify State Ownership

Explicitly state where state should live:

```
"Let's implement a shopping cart feature. The cart state should be managed in a global Zustand store since it needs to persist across pages and be accessible from multiple components."
```

### 2. Reference Existing Patterns

Point AI to similar implementations:

```
"Implement state management for the filter component similar to how we did it in the ProductFilters component, using local state for UI toggles but Zustand for the actual filter values."
```

### 3. Specify Performance Concerns

Highlight performance considerations:

```
"This component will render in a list with potentially hundreds of items, so make sure we're using React.memo and useCallback to prevent unnecessary re-renders."
```

### 4. Provide State Diagrams

Describe state transitions clearly:

```
"The form submission flow should follow these states:
1. 'idle' - Initial state
2. 'validating' - When validate() is called
3. 'submitting' - When submit() is called
4. 'success' or 'error' - Based on API response
5. Return to 'idle' on reset"
```

## Conclusion

Effective state management is crucial for building maintainable React applications. By following consistent patterns and placing state at the appropriate level, you can create predictable, performant applications that are easy to reason about and collaborate on with AI assistance.

Remember to:
1. Follow the state category guidelines
2. Use the state management decision tree
3. Implement the appropriate patterns for your use case
4. Consider performance implications
5. Test your state management logic thoroughly

With these practices in place, both human developers and AI assistants can work effectively with your application's state. 