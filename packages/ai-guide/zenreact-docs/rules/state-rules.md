# State Management Rules

This document outlines specific rules and best practices for state management in the ZenReact framework. Following these guidelines ensures state is organized, maintainable, and optimized for both developer and AI collaboration.

## State Categories

All state in ZenReact applications should be classified into one of these categories:

### 1. UI State

UI state controls the visual appearance and behavior of components.

**Rules:**
- Must be kept as close as possible to components that use it
- Should not contain business data
- Must be isolated from application logic
- Should be reset when components unmount

**Examples:** Modal open/closed state, form input values, accordion expand/collapse state, tab selection

**Preferred Approach:**
- `useState` for simple component state
- `useReducer` for complex component state
- Context API for shared UI state

### 2. Application State

Application state represents the core business data and logic of your application.

**Rules:**
- Must be organized by domain/feature
- Should be normalized to avoid duplication
- Must have clear update patterns
- Should support optimistic updates where appropriate

**Examples:** User profiles, product data, shopping cart, authentication state

**Preferred Approach:**
- Zustand for global state management
- Context API for feature-scoped state

### 3. Server State

Server state represents data that originates from or is persisted to a server.

**Rules:**
- Must be cached appropriately
- Should include loading, error, and success states
- Must handle stale data and refetching
- Should support optimistic updates

**Examples:** API responses, user data from backend, search results, paginated data

**Preferred Approach:**
- React Query for data fetching, caching, and synchronization
- SWR as an alternative to React Query

### 4. Form State

Form state manages user input, validation, and submission.

**Rules:**
- Must implement proper validation
- Should track dirty/pristine state
- Must handle error messages
- Should support field-level and form-level validation

**Examples:** Registration forms, checkout flows, settings panels, search forms

**Preferred Approach:**
- React Hook Form for complex forms
- Formik as an alternative
- `useState` for simple forms

## State Management Principles

All state management should follow these principles:

### 1. State Ownership

Each piece of state must have a clear owner responsible for its management.

**Rules:**
- Each state must belong to exactly one of the state categories
- State should be owned at the appropriate level of the component hierarchy
- Shared state must have a single source of truth
- Changes to state must only happen through defined actions/setters

### 2. State Isolation

State should be isolated to prevent unnecessary coupling between components.

**Rules:**
- State should be kept as close as possible to where it's used
- Different types of state should not be mixed
- Components should not directly access state owned by other components
- Global state should be minimized and organized by domain

### 3. State Derivation

Derived state should be calculated from source state rather than duplicated.

**Rules:**
- Derived values should be calculated during render or with `useMemo`
- State should not duplicate information that can be derived
- Calculations should happen as close as possible to where they're used
- Complex derivations should be encapsulated in custom hooks

### 4. State Updates

State updates should be predictable, atomic, and optimize for performance.

**Rules:**
- Updates to related state should be batched together
- State updates should be immutable
- Complex state transitions should use reducers
- Effects should minimize dependencies to prevent unnecessary updates

### 5. State Persistence

State that needs to survive across sessions should be persisted with clear patterns.

**Rules:**
- Only persist state that needs to be saved
- Use appropriate storage mechanisms based on data sensitivity
- Handle loading and synchronization of persisted state
- Implement version migration for persisted state

## Technology-Specific Rules

### 1. Zustand

Zustand is the preferred global state management solution in ZenReact.

**Rules:**
- Create separate stores for different domains
- Implement clear interfaces for state and actions
- Use middleware for side effects and persistence
- Avoid circular dependencies between stores
- Implement selectors for optimal component rendering

```typescript
// ✅ Good Zustand Store
import { create } from 'zustand';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const user = await authApi.login(credentials);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      });
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    
    try {
      await authApi.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Logout failed', 
        isLoading: false 
      });
    }
  },
  
  clearError: () => set({ error: null })
}));
```

### 2. React Query

React Query is the preferred solution for server state management.

**Rules:**
- Organize queries with proper query keys
- Implement proper error handling and retry logic
- Configure appropriate caching durations
- Use prefetching for anticipated data needs
- Implement optimistic updates for mutations

```typescript
// ✅ Good React Query implementation
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, updateUser } from '../api/userApi';

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ['user', updatedUser.id] });
      
      const previousUser = queryClient.getQueryData(['user', updatedUser.id]);
      
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
      
      return { previousUser };
    },
    onError: (err, updatedUser, context) => {
      queryClient.setQueryData(
        ['user', updatedUser.id],
        context?.previousUser
      );
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['user', variables.id] 
      });
    }
  });
}
```

### 3. Context API

Context API should be used for sharing state within feature boundaries.

**Rules:**
- Create separate contexts for different concerns
- Implement proper default values
- Use context only when props would be excessive
- Optimize rendering with memoization
- Implement custom hooks to consume context

```typescript
// ✅ Good Context API implementation
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);
  
  const value = useMemo(() => ({ 
    theme, 
    toggleTheme 
  }), [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
```

### 4. React Hook Form

React Hook Form is the preferred solution for form state management.

**Rules:**
- Use schema validation (like Zod or Yup) for robust validation
- Implement field-level and form-level validation
- Handle submit, error, and loading states
- Properly type form values and validation schema

```typescript
// ✅ Good React Hook Form implementation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data);
      // Handle success
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
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
```

## Decision Tree for State Management

Use this decision tree to determine the appropriate state management approach:

1. **Is the state only used by a single component?**
   - Yes: Use `useState` or `useReducer`
   - No: Continue to question 2

2. **Is the state shared only among a few closely related components?**
   - Yes: Use Context API or prop passing
   - No: Continue to question 3

3. **Does the state represent server data?**
   - Yes: Use React Query or SWR
   - No: Continue to question 4

4. **Is the state related to forms?**
   - Yes: Use React Hook Form or Formik
   - No: Continue to question 5

5. **Is the state application-wide and needs to be accessed by many components?**
   - Yes: Use Zustand
   - No: Reconsider Context API

## State Management Checklist

Use this checklist to verify that your state management implementation meets ZenReact standards:

- [ ] State is categorized correctly (UI, Application, Server, Form)
- [ ] State is kept as close as possible to where it's used
- [ ] State has a single source of truth
- [ ] Related state is grouped appropriately
- [ ] State updates are immutable
- [ ] Derived state is calculated, not stored
- [ ] Components only subscribe to the state they need
- [ ] State changes don't cause unnecessary re-renders
- [ ] Server state includes proper loading and error handling
- [ ] Forms implement proper validation and error states
- [ ] Persistence is implemented where needed
- [ ] State has clear ownership and access patterns
- [ ] State management approach follows the decision tree

## Conclusion

Following these state management rules ensures predictable, maintainable, and performant React applications. By categorizing state, applying appropriate technologies, and following best practices, developers and AI assistants can collaborate effectively to implement robust state management solutions in ZenReact applications. 