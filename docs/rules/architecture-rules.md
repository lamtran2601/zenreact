# Architecture Rules for ZenReact

This document defines the architectural rules and patterns that should be followed when developing React applications within the ZenReact framework. Maintaining a consistent architecture is essential for autonomous development with AI assistance.

## Project Structure Rules

### Rule 1: Feature-Based Organization

Organize code by features rather than technical concerns:

```
src/
  features/
    auth/
      components/
      hooks/
      utils/
      types/
      api/
    dashboard/
      components/
      hooks/
      utils/
      types/
      api/
    products/
      components/
      hooks/
      utils/
      types/
      api/
```

**Rationale**: Feature-based organization provides clear context boundaries, making it easier for AI to understand the scope and purpose of components.

### Rule 2: Shared Component Library

Maintain a shared component library for reusable UI elements:

```
src/
  components/
    ui/           # Base UI components
    layout/       # Layout components
    feedback/     # Feedback components (notifications, alerts)
    data/         # Data display components (tables, lists)
    form/         # Form components
```

**Rationale**: A consistent component library allows AI to leverage and extend existing patterns rather than creating new approaches for similar problems.

### Rule 3: Clear File Naming Conventions

Follow consistent file naming patterns:

- **Component files**: `PascalCase.tsx` (Button.tsx)
- **Hook files**: `useHookName.ts` (useAuth.ts)
- **Context files**: `PascalCaseContext.ts` (AuthContext.ts)
- **Utility files**: `camelCase.ts` (formatDate.ts)
- **Type files**: `types.ts` or `ComponentName.types.ts`
- **Test files**: Same as source with `.test.tsx` suffix (Button.test.tsx)

**Rationale**: Consistent naming makes it easier for AI to locate and create files that follow established patterns.

### Rule 4: Module Boundaries

Enforce clear module boundaries with index exports:

```typescript
// features/auth/index.ts
export { default as LoginForm } from './components/LoginForm';
export { default as RegisterForm } from './components/RegisterForm';
export { useAuth } from './hooks/useAuth';
export type { User, Credentials } from './types';
```

**Rationale**: Clear module boundaries help AI understand what should be exposed from a feature and how other parts of the application should interact with it.

### Rule 5: Path Aliasing

Use path aliasing to avoid complex relative imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@api/*": ["src/api/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

**Example usage**:
```typescript
// Instead of
import Button from '../../../components/ui/Button';
// Use
import Button from '@components/ui/Button';
```

**Rationale**: Path aliasing simplifies imports and makes it easier for AI to create correct import statements without navigating complex relative paths.

## Component Architecture Rules

### Rule 1: Component Composition

Prefer composition over configuration:

**Do**:
```typescript
<Card>
  <Card.Header>
    <Card.Title>Product Name</Card.Title>
  </Card.Header>
  <Card.Body>
    <ProductDetails />
  </Card.Body>
  <Card.Footer>
    <Button>Add to Cart</Button>
  </Card.Footer>
</Card>
```

**Don't**:
```typescript
<Card
  title="Product Name"
  renderBody={() => <ProductDetails />}
  footer={<Button>Add to Cart</Button>}
/>
```

**Rationale**: Composition is more readable, extensible, and easier for AI to understand and modify correctly.

### Rule 2: Component Segmentation

Keep components focused and manageable:

1. Limit component files to a maximum of 250 lines
2. Extract reusable parts into separate components
3. Create container components for data fetching and presentation components for rendering
4. Use custom hooks to extract complex logic

**Rationale**: Smaller, focused components are easier for AI to understand and modify without introducing bugs.

### Rule 3: Props Interface Design

Design clear, consistent props interfaces:

1. Use descriptive prop names
2. Add JSDoc comments to all props
3. Group related props into objects
4. Use TypeScript for type safety
5. Provide sensible defaults for optional props

**Example**:
```typescript
interface TableProps {
  /** Data to display in the table */
  data: Array<Record<string, any>>;
  /** Configuration for table columns */
  columns: {
    /** Unique identifier for the column */
    id: string;
    /** Display name for the column header */
    header: string;
    /** Path or function to extract cell data */
    accessor: string | ((row: any) => any);
    /** Column width (in px or %) */
    width?: string;
    /** Whether the column can be sorted */
    sortable?: boolean;
  }[];
  /** Function called when row is clicked */
  onRowClick?: (row: Record<string, any>) => void;
  /** Whether the table is in a loading state */
  isLoading?: boolean;
}
```

**Rationale**: Well-designed props interfaces make it easier for AI to understand component usage and implement new components with similar patterns.

### Rule 4: State Management Boundaries

Establish clear boundaries for different state management approaches:

1. **Component State**: UI state that belongs to a single component
2. **Feature State**: State shared within a feature (Context or Zustand)
3. **Global State**: Application-wide state (Zustand)
4. **Server State**: Data from API (React Query)

**Example Decision Tree**:
```
Is the state only used by one component?
├── Yes: Use useState or useReducer
└── No: Is the state only used within one feature?
    ├── Yes: Use Context or feature-level Zustand store
    └── No: Is the state from a server?
        ├── Yes: Use React Query
        └── No: Use global Zustand store
```

**Rationale**: Clear state management boundaries help AI make correct decisions about where to place and how to manage different types of state.

## API Integration Rules

### Rule 1: API Client Abstraction

Use a consistent API client pattern:

```typescript
// api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for auth, error handling, etc.
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

**Rationale**: A consistent API client makes it easier for AI to implement new API interactions following established patterns.

### Rule 2: API Hooks Pattern

Follow a consistent pattern for API hooks:

```typescript
// features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi';
import { Product } from '../types';

interface UseProductsOptions {
  page?: number;
  pageSize?: number;
  category?: string;
}

export function useProducts({ 
  page = 1, 
  pageSize = 10, 
  category 
}: UseProductsOptions = {}) {
  return useQuery<{
    data: Product[];
    total: number;
    page: number;
    pageSize: number;
  }>({
    queryKey: ['products', { page, pageSize, category }],
    queryFn: () => getProducts({ page, pageSize, category }),
  });
}
```

**Rationale**: Consistent API hook patterns make it easier for AI to implement new data fetching hooks and for components to consume them reliably.

### Rule 3: Data Transformation Layer

Implement data transformation separate from components:

```typescript
// features/products/utils/transformers.ts
import { ApiProduct, Product } from '../types';

export function transformProductData(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: formatPrice(apiProduct.price),
    rating: calculateRating(apiProduct.reviews),
    isOnSale: apiProduct.discountPercentage > 0,
    // other transformations
  };
}
```

**Rationale**: Separating data transformation from components makes it easier to manage API data changes and ensures consistent data formatting across the application.

## Routing Architecture Rules

### Rule 1: Route Definition Structure

Define routes in a structured, declarative way:

```typescript
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/layout';
import { 
  HomePage, 
  ProductListPage, 
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  NotFoundPage
} from '@pages';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      ...authRoutes,
      ...dashboardRoutes,
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
```

**Rationale**: Structured route definitions make it easier to understand the application's page structure and for AI to add new routes consistently.

### Rule 2: Route Protection Pattern

Use consistent route protection pattern:

```typescript
// components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user' 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Usage in routes
{ 
  path: 'dashboard', 
  element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
}
```

**Rationale**: A consistent route protection pattern ensures secure access to protected routes and makes it easier for AI to implement new protected routes correctly.

## State Management Architecture Rules

### Rule 1: Zustand Store Structure

Follow a consistent pattern for Zustand stores:

```typescript
// store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);
```

**Rationale**: Consistent store patterns make it easier for AI to understand and implement state management correctly.

### Rule 2: React Query Configuration

Configure React Query consistently:

```typescript
// api/reactQuery.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

**Rationale**: Consistent React Query configuration ensures predictable data fetching behavior across the application.

### Rule 3: Context API Usage Pattern

Follow a structured pattern for Context usage:

```typescript
// features/theme/ThemeContext.tsx

// 1. Define context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create context with meaningful default/fallback
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  // Memoize context value
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Create custom hook for consuming context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**Rationale**: A consistent Context pattern makes it easier for AI to implement new contexts and for components to consume them correctly.

## Error Handling Architecture Rules

### Rule 1: Error Boundary Pattern

Implement error boundaries at appropriate levels:

```typescript
// components/error/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // Log to error monitoring service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ProductList />
</ErrorBoundary>
```

**Rationale**: Consistent error boundary usage prevents entire application crashes and provides meaningful error feedback to users.

### Rule 2: API Error Handling Pattern

Implement consistent API error handling:

```typescript
// utils/apiErrorHandler.ts
import { AxiosError } from 'axios';

export interface ApiError {
  status: number;
  message: string;
  field?: string;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    
    // Handle structured API errors
    if (error.response?.data?.errors) {
      return {
        status,
        message: error.response.data.errors[0].message,
        field: error.response.data.errors[0].field,
      };
    }
    
    // Handle string error messages
    if (error.response?.data?.message) {
      return {
        status,
        message: error.response.data.message,
      };
    }
    
    // Default error messages based on HTTP status
    switch (status) {
      case 401:
        return { status, message: 'You must be logged in to perform this action' };
      case 403:
        return { status, message: 'You do not have permission to perform this action' };
      case 404:
        return { status, message: 'The requested resource was not found' };
      case 422:
        return { status, message: 'The provided data is invalid' };
      default:
        return { status, message: 'An unexpected error occurred' };
    }
  }
  
  // Handle other types of errors
  return {
    status: 500,
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  };
}
```

**Rationale**: Consistent error handling ensures meaningful error messages are displayed to users and makes debugging easier.

## Performance Architecture Rules

### Rule 1: Component Optimization Patterns

Follow consistent component optimization patterns:

```typescript
// Optimized list rendering
import React, { useMemo } from 'react';

interface ItemProps {
  item: Item;
  onSelect: (id: string) => void;
}

// Memoize the item component
const ListItem = React.memo<ItemProps>(({ item, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);
  
  return (
    <div onClick={handleClick}>
      {item.name}
    </div>
  );
});

interface ListProps {
  items: Item[];
  onSelectItem: (id: string) => void;
}

export const ItemList: React.FC<ListProps> = ({ items, onSelectItem }) => {
  // Memoize callback to prevent recreation
  const handleSelect = useCallback((id: string) => {
    onSelectItem(id);
  }, [onSelectItem]);
  
  // Memoize sorted/filtered list
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  return (
    <div>
      {sortedItems.map(item => (
        <ListItem 
          key={item.id} 
          item={item} 
          onSelect={handleSelect} 
        />
      ))}
    </div>
  );
};
```

**Rationale**: Consistent optimization patterns ensure good performance and help AI understand when and how to optimize components.

### Rule 2: Code Splitting Pattern

Implement consistent code splitting:

```typescript
// routes/index.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@components/ui';

// Eager loaded components
import { Layout } from '@components/layout';
import { HomePage } from '@pages/Home';

// Lazy loaded components
const ProductListPage = lazy(() => import('@pages/ProductList'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetail'));
const CartPage = lazy(() => import('@pages/Cart'));
const CheckoutPage = lazy(() => import('@pages/Checkout'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'products', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductListPage />
          </Suspense>
        ) 
      },
      // Other routes
    ]
  }
]);
```

**Rationale**: Consistent code splitting improves initial load time and provides clear guidance for AI on how to implement new routes.

## Conclusion

Following these architecture rules will ensure a consistent, maintainable, and high-quality React application. The rules are designed to provide clear guidance for both developers and AI assistants, making autonomous development more effective.

When working with AI on the ZenReact project:

1. Reference these architecture rules when introducing new patterns
2. Ensure AI understands the reasoning behind architectural decisions
3. Maintain consistency with existing patterns
4. Update this document when architectural decisions evolve

By maintaining a clear and consistent architecture, the development team and AI can collaborate effectively to build scalable, maintainable React applications. 