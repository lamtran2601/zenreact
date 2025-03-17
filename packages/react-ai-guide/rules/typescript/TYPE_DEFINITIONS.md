# TypeScript Type Definition Rules

## Purpose

This document outlines standards for creating and using TypeScript types and interfaces in React applications. Consistent typing practices improve code reliability, maintainability, and developer experience, while also enhancing AI assistants' ability to understand your codebase.

## Core Principles

1. **Type Safety**: Maximize TypeScript's ability to catch errors at compile time
2. **Readability**: Keep type definitions clear and understandable
3. **Maintainability**: Design types that are easy to extend and modify
4. **Reusability**: Create types that can be composed and reused
5. **Documentation**: Use types as a form of self-documenting code

## Rule 1: Interface vs. Type

### Description

Use interfaces for object shapes that might be extended or implemented, and use type aliases for unions, intersections, or when specific mapped types are needed.

### Good Example

```typescript
// Interface for a shape that might be extended
interface User {
  id: string;
  name: string;
  email: string;
}

// Extended interface
interface AdminUser extends User {
  permissions: string[];
  role: 'admin';
}

// Type alias for a union
type UserRole = 'admin' | 'editor' | 'viewer';

// Type alias for a complex type
type Nullable<T> = T | null;
```

### Bad Example

```typescript
// Using type for extendable object shapes
type User = {
  id: string;
  name: string;
  email: string;
};

// Inconsistent mixing without clear patterns
interface UserRole {
  role: 'admin' | 'editor' | 'viewer';
}
```

### Rationale

- Interfaces are better for object shapes because they:
  - Can be extended with the `extends` keyword
  - Can be incrementally defined (declaration merging)
  - Are more familiar in OOP contexts
  - Often produce clearer error messages

- Type aliases are better for:
  - Union and intersection types
  - Simple aliases for complex types
  - Mapped types and conditional types
  - Types that won't be extended

### Guidelines

1. Use interfaces for React component props and state
2. Use interfaces for API responses and data models
3. Use types for unions, mapped types, and utility types
4. Avoid mixing interfaces and types inconsistently for similar shapes

## Rule 2: Prop Type Definitions

### Description

Define React component props with interfaces named with the `Props` suffix, and keep prop definitions focused and specific to the component.

### Good Example

```typescript
interface ButtonProps {
  /** The text content of the button */
  children: React.ReactNode;
  /** The visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) {
  return (
    <button 
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Bad Example

```typescript
// Naming doesn't follow convention
interface ButtonInterface {
  text: string; // Not using ReactNode for flexibility
  variant: string; // Not using a union type for specific variants
  isDisabled: boolean; // Inconsistent naming
  onButtonClick: Function; // Not properly typed
}

// Props are defined inline, making them harder to reuse
export function Button(props: { 
  text: string; 
  variant: string; 
  isDisabled: boolean; 
  onButtonClick: Function;
}) {
  return (
    <button 
      className={`button button--${props.variant}`}
      disabled={props.isDisabled}
      onClick={props.onButtonClick}
    >
      {props.text}
    </button>
  );
}
```

### Rationale

Well-defined prop interfaces:
- Make component APIs clear and consistent
- Provide documentation through types
- Enable better editor autocompletion
- Make refactoring easier
- Allow prop types to be imported by other components

### Guidelines

1. Name interfaces with the `Props` suffix (e.g., `ButtonProps`)
2. Use JSDoc comments to document props
3. Mark optional props with `?` and provide default values where appropriate
4. Use specific types instead of `any` or overly generic types
5. Consider composing complex prop interfaces from smaller interfaces

## Rule 3: Function Types

### Description

Define explicit return types for functions, especially for React hooks, event handlers, and utility functions.

### Good Example

```typescript
// React hook with explicit return type
function useUser(userId: string): { user: User | null; loading: boolean; error: Error | null } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Implementation...
  
  return { user, loading, error };
}

// Event handler with explicit typing
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  // Implementation...
};

// Utility function with explicit return type
function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
```

### Bad Example

```typescript
// Missing return type
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Implementation...
  
  return { user, loading, error };
}

// Generic event type
const handleSubmit = (event) => {
  event.preventDefault();
  // Implementation...
};

// Missing parameter and return types
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
```

### Rationale

Explicit function types:
- Document the expected inputs and outputs
- Catch errors when implementation doesn't match intended use
- Provide better IDE support and autocompletion
- Make code more self-documenting
- Help ensure consistent usage across the codebase

### Guidelines

1. Always define return types for exported functions
2. Use appropriate React event types for event handlers
3. Consider using type aliases for complex function signatures
4. Prefer more specific types over `any` or overly generic types
5. Use `void` for functions that don't return a value

## Rule 4: Type Composition

### Description

Compose complex types from simpler ones using techniques like intersection types, utility types, and generics to promote reusability and maintainability.

### Good Example

```typescript
// Base entity type
interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User-specific fields
interface UserFields {
  name: string;
  email: string;
  profileImageUrl?: string;
}

// Complete user type
type User = Entity & UserFields;

// Response wrapper type
interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
    message: string;
  };
}

// Specific response type
type UserResponse = ApiResponse<User>;

// Partial type for updates
type UserUpdate = Partial<UserFields>;
```

### Bad Example

```typescript
// Duplicating fields in each type
interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  description: string;
}

// Duplicating response structure
interface UserResponse {
  data: User;
  meta: {
    status: number;
    message: string;
  };
}

interface ProductResponse {
  data: Product;
  meta: {
    status: number;
    message: string;
  };
}
```

### Rationale

Type composition:
- Reduces duplication in type definitions
- Makes types more maintainable
- Follows the DRY (Don't Repeat Yourself) principle
- Makes relationships between types clearer
- Simplifies refactoring and updates

### Guidelines

1. Identify common patterns in your types and extract them
2. Use intersection types (`&`) to combine object types
3. Use utility types like `Partial<T>`, `Pick<T, K>`, `Omit<T, K>` for common transformations
4. Use generics for reusable type patterns
5. Balance composition with readability

## Rule 5: Use Discriminated Unions

### Description

Use discriminated unions for modeling different variants of a type, especially for state management and conditional rendering.

### Good Example

```typescript
// Status discriminated union
type RequestStatus = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: User }
  | { status: 'error', error: Error };

function Profile() {
  const [state, setState] = useState<RequestStatus>({ status: 'idle' });
  
  useEffect(() => {
    setState({ status: 'loading' });
    
    fetchUser()
      .then(user => setState({ status: 'success', data: user }))
      .catch(error => setState({ status: 'error', error }));
  }, []);
  
  // Type-safe rendering based on state
  switch (state.status) {
    case 'idle':
      return <div>Click to load user</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Welcome, {state.data.name}</div>;
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}
```

### Bad Example

```typescript
interface FetchState {
  isLoading: boolean;
  isError: boolean;
  data?: User;
  error?: Error;
}

function Profile() {
  const [state, setState] = useState<FetchState>({
    isLoading: false,
    isError: false
  });
  
  useEffect(() => {
    setState({ isLoading: true, isError: false });
    
    fetchUser()
      .then(user => setState({ isLoading: false, isError: false, data: user }))
      .catch(error => setState({ isLoading: false, isError: true, error }));
  }, []);
  
  // Potentially inconsistent or invalid states
  if (state.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (state.isError) {
    return <div>Error: {state.error?.message}</div>; // Optional chaining needed
  }
  
  if (state.data) {
    return <div>Welcome, {state.data.name}</div>;
  }
  
  return <div>Click to load user</div>;
}
```

### Rationale

Discriminated unions:
- Ensure states are mutually exclusive
- Eliminate impossible states
- Provide compile-time exhaustiveness checking
- Make conditional rendering more type-safe
- Clarify the possible states of a component or system

### Guidelines

1. Use a common property (the discriminant) to distinguish between variants
2. Make each variant contain only the relevant properties for that state
3. Use exhaustive checks (like switch statements) to handle all variants
4. Consider extracting complex discriminated unions into separate type definitions
5. Use `never` and exhaustiveness checking to catch unhandled cases

## Rule 6: API and Data Model Types

### Description

Define clear and consistent types for API responses, requests, and data models to ensure type safety throughout the application.

### Good Example

```typescript
// API response structure
interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
    message: string;
  };
}

// Request parameters
interface GetUsersParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

// Data model
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// API function with proper typing
async function getUsers(params: GetUsersParams): Promise<ApiResponse<User[]>> {
  const response = await fetch(`/api/users?${new URLSearchParams(params as any)}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}
```

### Bad Example

```typescript
// Missing or inconsistent API types
async function getUsers(params: any) {
  const response = await fetch(`/api/users?${new URLSearchParams(params)}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Component with implied API structure
function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getUsers({ page: 1 })
      .then(response => {
        // Assuming structure without type validation
        setUsers(response.data);
      })
      .catch(setError);
  }, []);
  
  // Rest of component...
}
```

### Rationale

Well-defined API and data model types:
- Document the expected shape of data
- Catch integration issues early
- Make API changes more visible
- Provide better developer experience
- Ensure consistent handling of API data

### Guidelines

1. Define types for all API requests and responses
2. Use generic types for common API patterns
3. Match type definitions to your actual API contracts
4. Include proper documentation in type definitions
5. Consider generating types from API schemas when possible

## Rule 7: Type Assertions and Type Guards

### Description

Use type assertions judiciously and prefer type guards to narrow types in a safer way.

### Good Example

```typescript
// Type guard function
function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}

// Using type guard
function processData(data: unknown) {
  if (isUser(data)) {
    // data is now typed as User
    console.log(data.name);
  } else {
    console.log('Not a valid user');
  }
}

// Using type assertion only when you're certain
function deserializeUser(json: string): User {
  const data = JSON.parse(json);
  if (!isUser(data)) {
    throw new Error('Invalid user data');
  }
  return data; // Safely typed as User
}
```

### Bad Example

```typescript
// Unsafe type assertions
function processData(data: unknown) {
  const user = data as User; // Unsafe assertion
  console.log(user.name); // Could fail at runtime
}

// Overuse of type assertions
function deserializeUser(json: string): User {
  return JSON.parse(json) as User; // No validation
}
```

### Rationale

Proper type narrowing:
- Provides runtime safety in addition to compile-time safety
- Makes code more defensive
- Documents the expected shape of data
- Makes assumptions explicit
- Reduces unexpected runtime errors

### Guidelines

1. Use type guards with `is` return type for custom type checks
2. Prefer `instanceof` for checking class instances
3. Use discriminated unions for more complex type narrowing
4. Use type assertions (`as`) only when you have more information than the compiler
5. Consider runtime validation libraries for complex objects

## Rule 8: Generic Components and Hooks

### Description

Use generics to create reusable, type-safe components and hooks that can work with different data types.

### Good Example

```typescript
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = 'No items to display'
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="empty-list">{emptyMessage}</div>;
  }
  
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)} className="list-item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Generic data fetching hook
function useFetch<TData, TError = Error>(url: string, options?: RequestInit) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Implementation...
  }, [url, options]);
  
  return { data, error, loading };
}

// Usage examples
function UserList() {
  const { data, loading } = useFetch<User[]>('/api/users');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <List<User>
      items={data || []}
      keyExtractor={(user) => user.id}
      renderItem={(user) => (
        <div className="user-item">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    />
  );
}
```

### Bad Example

```typescript
// Non-generic list component
interface ListProps {
  items: any[]; // Not type-safe
  renderItem: (item: any, index: number) => React.ReactNode;
  keyExtractor: (item: any, index: number) => string;
  emptyMessage?: string;
}

// Non-generic fetch hook
function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState(null); // No type information
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Implementation...
  }, [url, options]);
  
  return { data, error, loading };
}
```

### Rationale

Generic components and hooks:
- Provide type safety while maintaining flexibility
- Reduce code duplication
- Allow components to work with different data types
- Enable better IDE support and autocompletion
- Make usage errors apparent at compile time

### Guidelines

1. Use generics for components that work with different data types
2. Provide sensible constraints on generic types when appropriate
3. Use default type parameters for common cases
4. Document generic parameters clearly
5. Consider composition with more specific components for common use cases

## Rule 9: Typing State in React Components

### Description

Define explicit types for component state, both for `useState` and `useReducer`, to ensure type safety and catch state-related bugs.

### Good Example

```typescript
// Simple state with useState
function Counter() {
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const increment = () => {
    if (count >= 10) {
      setError('Cannot exceed 10');
      return;
    }
    setError(null);
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      {error && <p className="error">{error}</p>}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Complex state with useReducer
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
}

type TodoAction = 
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: 'all' | 'active' | 'completed' } }
  | { type: 'SET_LOADING'; payload: { loading: boolean } };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), text: action.payload.text, completed: false }]
      };
    // Other cases...
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    loading: false
  });
  
  // Implementation...
}
```

### Bad Example

```typescript
// Untyped state
function Counter() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  
  const increment = () => {
    if (count >= 10) {
      setError('Cannot exceed 10'); // Type inconsistency
      return;
    }
    setError(null);
    setCount(count + 1);
  };
  
  // Implementation...
}

// Untyped reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), text: action.payload.text, completed: false }]
      };
    // Other cases...
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    loading: false
  });
  
  // Implementation...
}
```

### Rationale

Typed state:
- Catches state-related errors at compile time
- Documents the expected shape of state
- Provides better IDE support
- Makes state transitions more explicit
- Improves maintainability as components evolve

### Guidelines

1. Always define explicit types for `useState` when the type isn't obvious
2. Use discriminated unions for complex state shapes
3. Define separate interfaces for reducer state and actions
4. Consider extracting complex state logic into custom hooks
5. Use type-safe action creators for complex reducers

## Rule 10: Enum Alternatives

### Description

Prefer union types or 'as const' objects over enums in most cases, as they provide better type inference and integration with the rest of the TypeScript ecosystem.

### Good Example

```typescript
// Union type for simple cases
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

// Object with 'as const' for value mapping
const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  TEXT: 'text'
} as const;

type ButtonVariant = typeof ButtonVariants[keyof typeof ButtonVariants];

// Usage
function Button({ variant = ButtonVariants.PRIMARY }: { variant?: ButtonVariant }) {
  return <button className={`button button--${variant}`}>Click me</button>;
}
```

### Bad Example

```typescript
// Traditional enum
enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  TEXT = 'text'
}

// Usage
function Button({ variant = ButtonVariant.PRIMARY }: { variant?: ButtonVariant }) {
  return <button className={`button button--${variant}`}>Click me</button>;
}
```

### Rationale

Union types and 'as const' objects:
- Provide better type inference
- Integrate more naturally with other TypeScript features
- Result in cleaner JavaScript output
- Avoid some of the issues with TypeScript enums
- Are more idiomatic in the React ecosystem

### Guidelines

1. Use union types for simple sets of string literals
2. Use 'as const' objects when you need both values and keys
3. Reserve enums for specific cases where their behavior is beneficial (like bit flags)
4. Be consistent in your approach across the codebase
5. Consider using a utility type to extract values from 'as const' objects

## Enforcement

To enforce these rules:

1. Use ESLint with `@typescript-eslint/eslint-plugin`
2. Configure strict TypeScript compiler options in `tsconfig.json`
3. Use PR checklist items for type-related reviews
4. Consider automated tests for type definitions
5. Document exceptions when they're necessary

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Style Guide](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)
- [TypeScript ESLint Rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) 