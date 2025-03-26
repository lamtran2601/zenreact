# Coding Standards

This document outlines the coding standards for ZenReact projects. Adhering to these standards ensures code consistency, maintainability, and facilitates effective AI collaboration.

## TypeScript Standards

### 1. Type Definitions

- **Always use explicit types** for function parameters, return values, and variable declarations where the type cannot be clearly inferred.

```typescript
// ✅ Good
const fetchUser = async (id: string): Promise<User> => {
  // implementation
};

// ❌ Bad
const fetchUser = async (id) => {
  // implementation
};
```

- **Use descriptive interface names** that reflect the purpose of the type.

```typescript
// ✅ Good
interface UserProfileProps {
  user: User;
  isEditable: boolean;
  onSave: (updatedUser: User) => void;
}

// ❌ Bad
interface Props {
  u: any;
  editable: boolean;
  save: Function;
}
```

- **Prefer interfaces over types** for object definitions and public APIs.

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  label: string;
  onClick: () => void;
}

// ❌ Bad
type ButtonProps = {
  variant: string;
  size: string;
  label: string;
  onClick: () => void;
};
```

- **Use specific union types** instead of general types.

```typescript
// ✅ Good
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

// ❌ Bad
type ButtonVariant = string;
```

### 2. Type Safety

- **Avoid `any` type** unless absolutely necessary. Prefer `unknown` when the type is truly unknown.

```typescript
// ✅ Good
const parseJSON = (jsonString: string): unknown => {
  return JSON.parse(jsonString);
};

// ❌ Bad
const parseJSON = (jsonString: string): any => {
  return JSON.parse(jsonString);
};
```

- **Use type guards** to narrow types when working with `unknown` or union types.

```typescript
// ✅ Good
const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' && 
    value !== null && 
    'id' in value && 
    'name' in value
  );
};

const processValue = (value: unknown) => {
  if (isUser(value)) {
    // TypeScript knows value is User here
    console.log(value.name);
  }
};
```

- **Use non-null assertion operator (`!`) sparingly** and only when you're certain a value cannot be null or undefined.

```typescript
// ✅ Good - Using optional chaining
const userName = user?.name;

// ❌ Bad - Using non-null assertion without certainty
const userName = user!.name;
```

### 3. Generics

- **Use generics for reusable components and utilities** that work with different data types.

```typescript
// ✅ Good
function createResource<T>(url: string): Resource<T> {
  return {
    async fetch() {
      const response = await fetch(url);
      return response.json() as Promise<T>;
    }
  };
}

// Usage
const userResource = createResource<User>('/api/users');
```

- **Provide descriptive names for type parameters**, using conventional single letters only for simple cases.

```typescript
// ✅ Good for complex cases
function createEntity<EntityType, KeyType extends keyof EntityType>(
  data: EntityType, 
  primaryKey: KeyType
): Entity<EntityType, KeyType> {
  // implementation
}

// ✅ Good for simple cases
function identity<T>(value: T): T {
  return value;
}
```

## Naming Conventions

### 1. General Naming Rules

- **Use camelCase for variables, functions, and methods**.
- **Use PascalCase for classes, interfaces, types, enums, and React components**.
- **Use UPPER_CASE for constants and static readonly properties**.

```typescript
// Variables, functions, and methods
const userCount = 5;
function calculateTotal() { /* ... */ }

// Classes, interfaces, types, enums, and React components
class UserService { /* ... */ }
interface UserProps { /* ... */ }
type ButtonVariant = 'primary' | 'secondary';
enum UserRole { Admin, User, Guest }
function UserProfile() { /* ... */ }

// Constants
const API_BASE_URL = 'https://api.example.com';
class Config {
  static readonly MAX_RETRY_COUNT = 3;
}
```

### 2. Component Naming

- **Use descriptive names that indicate the component's purpose**.
- **Use nouns or noun phrases for component names**.
- **Use prefixes to categorize components by type when relevant**.

```typescript
// ✅ Good
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
function AdminDashboard() { /* ... */ }

// With type prefixes
function FormTextField() { /* ... */ }
function LayoutSidebar() { /* ... */ }
function UIButton() { /* ... */ }

// ❌ Bad (vague or using verbs as primary descriptor)
function Profile() { /* ... */ } // Too vague
function HandleUser() { /* ... */ } // Verb based
function Data() { /* ... */ } // Too vague
```

### 3. Hook Naming

- **Always prefix custom hooks with `use`**.
- **Name hooks after their primary purpose**.

```typescript
// ✅ Good
function useUserProfile(userId: string) { /* ... */ }
function useFormValidation<T>(initialValues: T) { /* ... */ }
function useDarkMode() { /* ... */ }

// ❌ Bad
function userProfile(userId: string) { /* ... */ } // Missing 'use' prefix
function useGetData() { /* ... */ } // Too vague
function getFormValidation<T>(initialValues: T) { /* ... */ } // Missing 'use' prefix
```

### 4. Event Handler Naming

- **Prefix event handlers with `handle` for handlers defined within a component**.
- **Prefix callback props with `on` to indicate they are event callbacks**.

```typescript
// ✅ Good
function Button({ onClick }: ButtonProps) {
  const handleClick = () => {
    // Do something
    onClick();
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ❌ Bad
function Button({ clickCallback }: ButtonProps) {
  const clickFunction = () => {
    // Do something
    clickCallback();
  };

  return <button onClick={clickFunction}>Click me</button>;
}
```

### 5. File Naming

- **Use kebab-case for file names**.
- **Name files after the primary component, hook, or functionality they export**.
- **Use `.tsx` extension for files containing JSX**.
- **Use `.ts` extension for files that don't contain JSX**.

```
// ✅ Good
user-profile.tsx
use-authentication.ts
form-validation.ts
api-client.ts

// ❌ Bad
UserProfile.tsx
useAuthentication.ts
formvalidation.ts
APIClient.ts
```

## Code Formatting

### 1. Indentation and Spacing

- **Use 2 spaces for indentation**.
- **Add a space before the opening brace of a block**.
- **Add spaces around operators**.

```typescript
// ✅ Good
if (user.isAdmin) {
  const permissions = user.permissions.filter(p => p.isActive);
  return permissions.length > 0;
}

// ❌ Bad
if(user.isAdmin){
  const permissions=user.permissions.filter(p=>p.isActive);
  return permissions.length>0;
}
```

### 2. Line Length and Wrapping

- **Keep lines to a maximum of 100 characters**.
- **Use consistent wrapping patterns for function parameters, JSX props, and array/object literals**.

```typescript
// ✅ Good
function createUser(
  name: string,
  email: string,
  role: UserRole,
  permissions: Permission[]
) {
  // implementation
}

// ✅ Good JSX prop wrapping
<UserProfile
  user={currentUser}
  isEditable={true}
  onSave={handleSave}
  permissions={userPermissions}
/>

// ❌ Bad
function createUser(name: string, email: string, role: UserRole,
  permissions: Permission[]) {
  // implementation
}
```

### 3. Semicolons and Trailing Commas

- **Always use semicolons to end statements**.
- **Use trailing commas in multiline arrays and objects**.

```typescript
// ✅ Good
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  roles: ['admin', 'user'],
};

// ❌ Bad
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  roles: ['admin', 'user']
}
```

### 4. Quotes and Template Literals

- **Use single quotes for string literals**.
- **Use template literals for string interpolation**.

```typescript
// ✅ Good
const name = 'John Doe';
const greeting = `Hello, ${name}!`;

// ❌ Bad
const name = "John Doe";
const greeting = "Hello, " + name + "!";
```

## Component Structure

### 1. Function Components

- **Use function components instead of class components**.
- **Use explicit return type annotations for complex components**.
- **Destructure props in the function parameter**.

```typescript
// ✅ Good
interface UserProfileProps {
  user: User;
  isEditable?: boolean;
}

function UserProfile({ user, isEditable = false }: UserProfileProps): JSX.Element {
  return (
    <div>
      <h2>{user.name}</h2>
      {isEditable && <button>Edit</button>}
    </div>
  );
}

// ❌ Bad
function UserProfile(props: UserProfileProps) {
  return (
    <div>
      <h2>{props.user.name}</h2>
      {props.isEditable && <button>Edit</button>}
    </div>
  );
}
```

### 2. Component Organization

- **Order component internals consistently**:
  1. Type definitions and interfaces
  2. Component function declaration
  3. Hooks
  4. Helper functions
  5. Effect hooks
  6. Render logic

```typescript
// ✅ Good
interface CounterProps {
  initialCount?: number;
  step?: number;
}

function Counter({ initialCount = 0, step = 1 }: CounterProps): JSX.Element {
  // Hooks
  const [count, setCount] = useState(initialCount);
  
  // Helper functions
  const increment = () => {
    setCount(prevCount => prevCount + step);
  };
  
  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };
  
  // Effects
  useEffect(() => {
    document.title = `Count: ${count}`;
    
    return () => {
      document.title = 'React App';
    };
  }, [count]);
  
  // Render
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### 3. Props

- **Provide default values for optional props using default parameters**.
- **Group related props into objects when a component has many props**.

```typescript
// ✅ Good - Default values with destructuring
function Button({ 
  variant = 'primary', 
  size = 'medium', 
  label, 
  onClick 
}: ButtonProps) {
  // implementation
}

// ✅ Good - Grouping related props
interface DataTableProps {
  data: Record<string, any>[];
  columns: Column[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
  };
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onPageChange: (page: number) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}
```

## React Hooks

### 1. Hook Rules

- **Only call hooks at the top level** of your component or custom hooks.
- **Always include all dependencies in the dependency array**.

```typescript
// ✅ Good
function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include all dependencies
  
  // Rest of component
}

// ❌ Bad
function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Missing dependency
  
  // Or conditionally calling hooks
  if (userId) {
    useEffect(() => {
      fetchUser(userId).then(setUser);
    }, [userId]);
  }
}
```

### 2. Custom Hooks

- **Extract reusable logic into custom hooks**.
- **Keep custom hooks focused on a single concern**.

```typescript
// ✅ Good
function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]);
  
  return { data, loading, error };
}
```

### 3. Performance Hooks

- **Use `useMemo` for expensive computations**.
- **Use `useCallback` for functions passed as props to child components**.
- **Use `React.memo` for components that render often with the same props**.

```typescript
// ✅ Good
function UserList({ users, onUserSelect }: UserListProps) {
  // Memoize expensive computation
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);
  
  // Memoize callback function
  const handleUserSelect = useCallback((userId: string) => {
    onUserSelect(userId);
  }, [onUserSelect]);
  
  return (
    <ul>
      {sortedUsers.map(user => (
        <UserItem 
          key={user.id} 
          user={user} 
          onSelect={handleUserSelect} 
        />
      ))}
    </ul>
  );
}

// Memoize component that renders frequently
const UserItem = React.memo(function UserItem({ 
  user, 
  onSelect 
}: UserItemProps) {
  return (
    <li onClick={() => onSelect(user.id)}>
      {user.name}
    </li>
  );
});
```

## State Management

### 1. Component State

- **Keep state as local as possible**.
- **Use `useState` for simple state**.
- **Use `useReducer` for complex state logic**.

```typescript
// ✅ Good - Simple state with useState
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// ✅ Good - Complex state with useReducer
type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: any | null;
  error: Error | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR'; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

function DataFetcher({ url }: { url: string }) {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    data: null,
    error: null,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ 
          type: 'FETCH_ERROR', 
          error: error instanceof Error ? error : new Error(String(error)) 
        });
      }
    };
    
    fetchData();
  }, [url]);
  
  // Render based on state
}
```

### 2. Global State

- **Use Zustand for global state management**.
- **Create stores for specific domains**.
- **Keep selectors minimal and focused**.

```typescript
// ✅ Good - Zustand store
import { create } from 'zustand';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  
  login: async (email, password) => {
    try {
      // API call logic
      const user = await api.login(email, password);
      set({ user, isAuthenticated: true, error: null });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Unknown error occurred' 
      });
    }
  },
  
  logout: () => {
    // Logout logic
    set({ user: null, isAuthenticated: false });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));

// Selectors
export const useIsAuthenticated = () => useUserStore(state => state.isAuthenticated);
export const useCurrentUser = () => useUserStore(state => state.user);
```

## Error Handling

### 1. Error Boundaries

- **Use error boundaries to catch and handle runtime errors**.
- **Create specialized error boundaries for different parts of the application**.

```typescript
// ✅ Good - Custom error boundary
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Could also log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again.</div>}>
      <UserProfile userId="123" />
    </ErrorBoundary>
  );
}
```

### 2. API Error Handling

- **Always handle errors in async operations**.
- **Provide meaningful error messages to users**.
- **Include recovery mechanisms when possible**.

```typescript
// ✅ Good - API error handling
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUser(userId);
      setUser(data);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to load user profile. Please try again.'
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, [userId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchUser}>Retry</button>
      </div>
    );
  }
  
  if (!user) {
    return <div>No user found</div>;
  }
  
  return (
    <div>
      <h2>{user.name}</h2>
      {/* Rest of profile */}
    </div>
  );
}
```

## Performance Optimization

### 1. Rendering Optimization

- **Avoid unnecessary re-renders**.
- **Use `React.memo` for pure components**.
- **Extract expensive calculations to `useMemo`**.

```typescript
// ✅ Good - Optimized rendering
const ExpensiveList = React.memo(function ExpensiveList({ 
  items, 
  onItemClick 
}: ExpensiveListProps) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

function ParentComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Memoize callback to prevent re-renders of ExpensiveList
  const handleItemClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  
  // Memoize expensive calculation
  const sortedFilteredItems = useMemo(() => {
    return items
      .filter(item => item.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  return (
    <div>
      <ExpensiveList 
        items={sortedFilteredItems} 
        onItemClick={handleItemClick} 
      />
      {selectedId && <ItemDetails id={selectedId} />}
    </div>
  );
}
```

### 2. Code Splitting

- **Use dynamic imports and lazy loading for large components**.
- **Split routes into separate chunks**.

```typescript
// ✅ Good - Code splitting with lazy loading
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

## Accessibility

### 1. Semantic HTML

- **Use appropriate semantic HTML elements**.
- **Use heading elements (`h1`-`h6`) in hierarchical order**.
- **Use lists (`ul`, `ol`) for groups of related items**.

```typescript
// ✅ Good - Semantic HTML
function Article({ title, content, comments }: ArticleProps) {
  return (
    <article>
      <h1>{title}</h1>
      <section>{content}</section>
      <section>
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <h3>{comment.author}</h3>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}

// ❌ Bad - Non-semantic HTML
function Article({ title, content, comments }: ArticleProps) {
  return (
    <div>
      <div className="title">{title}</div>
      <div>{content}</div>
      <div>
        <div className="subtitle">Comments</div>
        {comments.length === 0 ? (
          <div>No comments yet.</div>
        ) : (
          <div>
            {comments.map(comment => (
              <div key={comment.id}>
                <div className="author">{comment.author}</div>
                <div>{comment.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. ARIA Attributes

- **Use ARIA attributes when semantic HTML is not sufficient**.
- **Include `aria-label` for elements without visible text**.
- **Use `aria-expanded`, `aria-hidden`, and other appropriate ARIA properties**.

```typescript
// ✅ Good - Appropriate ARIA usage
function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="expandable-section">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="expandable-section-header"
      >
        {title}
        <span className="icon" aria-hidden="true">
          {isExpanded ? '▼' : '►'}
        </span>
      </button>
      <div 
        className={`expandable-section-content ${isExpanded ? 'expanded' : ''}`}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}
```

### 3. Keyboard Navigation

- **Ensure all interactive elements are keyboard navigable**.
- **Use appropriate focus styling**.
- **Implement keyboard shortcuts for common actions**.

```typescript
// ✅ Good - Keyboard navigation
function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Clear search on Escape key
    if (e.key === 'Escape') {
      setQuery('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} role="search">
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

## AI Collaboration

### 1. Code Documentation

- **Use JSDoc comments for components, functions, and complex logic**.
- **Explain the purpose, props, and return values**.
- **Document any side effects or important constraints**.

```typescript
/**
 * Pagination component for navigating through multiple pages of content.
 *
 * @param {object} props - Component props
 * @param {number} props.currentPage - The current active page (1-based)
 * @param {number} props.totalPages - Total number of pages available
 * @param {number} [props.maxVisiblePages=5] - Maximum number of page buttons to show
 * @param {function} props.onPageChange - Callback fired when a page is selected
 * @param {boolean} [props.disabled=false] - Whether the pagination is interactive
 *
 * @returns {JSX.Element} Rendered pagination controls
 *
 * @example
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 */
function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
  disabled = false,
}: PaginationProps): JSX.Element {
  // Component implementation
}
```

### 2. Context Clues

- **Include descriptive comments for complex logic**.
- **Use TODO and FIXME comments appropriately**.
- **Provide examples for non-obvious patterns**.

```typescript
// ✅ Good - Helpful context clues
function calculateDiscount(price: number, discountRules: DiscountRule[]): number {
  let finalPrice = price;
  
  // Sort rules by priority (higher priority rules applied first)
  const sortedRules = [...discountRules].sort((a, b) => b.priority - a.priority);
  
  // Apply each rule sequentially
  // Note: Rules can be either percentage-based or fixed amount
  for (const rule of sortedRules) {
    if (rule.type === 'percentage') {
      // Percentage discounts are applied to the current price
      finalPrice -= finalPrice * (rule.value / 100);
    } else {
      // Fixed amount discounts are subtracted directly
      finalPrice -= rule.value;
    }
    
    // Don't allow negative prices
    finalPrice = Math.max(0, finalPrice);
    
    // If this is a "stop" rule, don't apply further discounts
    if (rule.isStopRule) {
      break;
    }
  }
  
  // Round to 2 decimal places
  return Math.round(finalPrice * 100) / 100;
}

// TODO: Add support for time-based discount rules
// FIXME: Handle currency conversion for multi-currency stores
```

### 3. Pattern Consistency

- **Follow established patterns in the codebase**.
- **Use consistent naming across similar concepts**.
- **Structure similar components in a similar way**.

```typescript
// ✅ Good - Consistent patterns across related components
function UserList({ users, onUserSelect }: UserListProps) {
  // Component implementation
}

function ProductList({ products, onProductSelect }: ProductListProps) {
  // Similar structure to UserList for consistency
}

function OrderList({ orders, onOrderSelect }: OrderListProps) {
  // Similar structure to UserList for consistency
}
```

## Conclusion

Following these coding standards ensures a consistent, maintainable, and high-quality codebase. These standards facilitate effective collaboration between developers and AI assistants by establishing clear patterns and expectations. When in doubt, prioritize readability and maintainability over cleverness or brevity.

Remember that these standards are guidelines, not rigid rules. Use your judgment when special cases arise, and document deviations when necessary for clarity. 