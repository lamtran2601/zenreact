# Testing Strategy for Autonomous React Development

This guide outlines the testing approach for React applications in the ZenReact framework, with a focus on effective testing practices that support autonomous development with AI assistance.

## Testing Philosophy

ZenReact follows these core testing principles:

1. **Test Behavior, Not Implementation**: Focus on what components do, not how they do it
2. **Test in Isolation**: Unit test components independently for clear feedback
3. **Mock Dependencies**: Properly isolate components from external dependencies
4. **Comprehensive Coverage**: Test functionality, edge cases, accessibility, and performance
5. **Meaningful Tests**: Write tests that validate real user scenarios

## Testing Pyramid

Our testing strategy follows a testing pyramid approach:

```
                   /\
                  /  \
                 /    \
                / E2E  \
               /        \
              /----------\
             / Integration \
            /              \
           /----------------\
          /      Unit        \
         /                    \
        /-----------------------\
```

### 1. Unit Tests (70-80% of tests)

Test individual components, hooks, and utilities in isolation.

**Testing Tools**:
- Jest for test framework
- React Testing Library for component testing
- Jest mocks for dependency isolation

**What to Test**:
- Component rendering
- Component interactions
- State changes
- Event handlers
- Hooks logic
- Utility functions

### 2. Integration Tests (15-20% of tests)

Test how multiple components work together.

**Testing Tools**:
- Jest for test framework
- React Testing Library for component testing
- MSW (Mock Service Worker) for API mocking

**What to Test**:
- Component composition
- Feature workflows
- State management between components
- Route transitions
- Form submissions

### 3. End-to-End Tests (5-10% of tests)

Test complete user journeys through the application.

**Testing Tools**:
- Cypress or Playwright for E2E testing

**What to Test**:
- Critical user flows
- Authentication workflows
- Payment processes
- Multi-step forms
- Cross-browser functionality

## Component Testing Approach

### Component Testing Principles

1. **Render Component**: Mount the component in a test environment
2. **Find Elements**: Find elements using accessible queries
3. **Interact**: Trigger user interactions
4. **Assert**: Verify the expected outcomes
5. **Cleanup**: Clean up after each test

### Testing Component Rendering

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders button with primary variant by default', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('btn-primary');
});

test('renders button with specified variant', () => {
  render(<Button variant="secondary">Click me</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('btn-secondary');
});
```

### Testing Component Interactions

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count when increment button is clicked', () => {
  render(<Counter initialCount={0} />);
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  
  fireEvent.click(incrementButton);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

test('decrements count when decrement button is clicked', () => {
  render(<Counter initialCount={5} />);
  const decrementButton = screen.getByRole('button', { name: /decrement/i });
  
  fireEvent.click(decrementButton);
  
  expect(screen.getByText('Count: 4')).toBeInTheDocument();
});

test('does not decrement below zero', () => {
  render(<Counter initialCount={0} />);
  const decrementButton = screen.getByRole('button', { name: /decrement/i });
  
  fireEvent.click(decrementButton);
  
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});
```

### Testing Async Operations

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// Mock API
const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ id: '1', name: 'John Doe', email: 'john@example.com' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays user data', async () => {
  render(<UserProfile userId="1" />);
  
  // Initial loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('handles error state', async () => {
  // Override the default handler for this test
  server.use(
    rest.get('/api/user', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );
  
  render(<UserProfile userId="1" />);
  
  // Wait for error state
  await waitFor(() => {
    expect(screen.getByText(/error loading user data/i)).toBeInTheDocument();
  });
});
```

### Testing with Context Providers

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProfilePage from './ProfilePage';

// Create a wrapper with all required providers
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

test('renders profile page with auth context', () => {
  // Mock the useAuth hook
  jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockImplementation(() => ({
    user: { id: '1', name: 'John Doe' },
    isAuthenticated: true,
  }));
  
  customRender(<ProfilePage />);
  
  expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
});
```

## Testing Custom Hooks

### Testing Hooks with renderHook

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 0 }));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

test('should decrement counter', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 5 }));
  
  act(() => {
    result.current.decrement();
  });
  
  expect(result.current.count).toBe(4);
});

test('should reset counter', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 5 }));
  
  act(() => {
    result.current.increment();
    result.current.reset();
  });
  
  expect(result.current.count).toBe(5);
});

test('should not go below min value', () => {
  const { result } = renderHook(() => useCounter({ 
    initialValue: 0, 
    min: 0, 
    max: 10 
  }));
  
  act(() => {
    result.current.decrement();
  });
  
  expect(result.current.count).toBe(0);
});
```

### Testing Hooks with Context

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './AuthContext';

test('provides authentication context', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { result } = renderHook(() => useAuth(), { wrapper });
  
  expect(result.current.isAuthenticated).toBe(false);
  
  act(() => {
    result.current.login({ id: '1', name: 'John' });
  });
  
  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user).toEqual({ id: '1', name: 'John' });
  
  act(() => {
    result.current.logout();
  });
  
  expect(result.current.isAuthenticated).toBe(false);
  expect(result.current.user).toBeNull();
});
```

## Testing State Management

### Testing Zustand Stores

```typescript
import { create } from 'zustand';
import { counterStore, resetStore } from './counterStore';

// Reset store state between tests
beforeEach(() => {
  resetStore();
});

test('should initialize with default state', () => {
  const state = counterStore.getState();
  expect(state.count).toBe(0);
});

test('should increment count', () => {
  const { increment } = counterStore.getState();
  increment();
  
  const state = counterStore.getState();
  expect(state.count).toBe(1);
});

test('should decrement count', () => {
  const { increment, decrement } = counterStore.getState();
  
  // First increment to 1, then decrement to 0
  increment();
  decrement();
  
  const state = counterStore.getState();
  expect(state.count).toBe(0);
});
```

### Testing React Query Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import { getProducts } from '@/api/products';

// Mock the API module
jest.mock('@/api/products');

// Create a fresh Query Client for each test
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const createWrapper = () => {
  const queryClient = createQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('useProducts returns data on successful fetch', async () => {
  const mockProducts = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ];
  
  (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  
  const { result } = renderHook(() => useProducts(), {
    wrapper: createWrapper(),
  });
  
  // Initially in loading state
  expect(result.current.isLoading).toBe(true);
  
  // Wait for the query to resolve
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  // Data should be available
  expect(result.current.data).toEqual(mockProducts);
});

test('useProducts handles error', async () => {
  const mockError = new Error('Failed to fetch products');
  
  (getProducts as jest.Mock).mockRejectedValue(mockError);
  
  const { result } = renderHook(() => useProducts(), {
    wrapper: createWrapper(),
  });
  
  // Wait for the query to fail
  await waitFor(() => expect(result.current.isError).toBe(true));
  
  // Error should be available
  expect(result.current.error).toEqual(mockError);
});
```

## Integration Testing

### Testing Component Composition

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';

// Mock the child components
jest.mock('./CartItem', () => {
  return {
    __esModule: true,
    default: ({ item, onRemove }) => (
      <div data-testid={`cart-item-${item.id}`}>
        {item.name} - ${item.price}
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    ),
  };
});

test('renders cart with items and calculates total', () => {
  const items = [
    { id: '1', name: 'Product 1', price: 10 },
    { id: '2', name: 'Product 2', price: 20 },
  ];
  
  render(<ShoppingCart items={items} />);
  
  // Check if both items are rendered
  expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
  expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
  
  // Check if total is calculated correctly
  expect(screen.getByText('Total: $30')).toBeInTheDocument();
});

test('removes item when remove button is clicked', async () => {
  const user = userEvent.setup();
  const items = [
    { id: '1', name: 'Product 1', price: 10 },
    { id: '2', name: 'Product 2', price: 20 },
  ];
  
  const onRemoveItem = jest.fn();
  
  render(<ShoppingCart items={items} onRemoveItem={onRemoveItem} />);
  
  // Click remove button on first item
  const removeButton = screen.getAllByText('Remove')[0];
  await user.click(removeButton);
  
  // Check if onRemoveItem was called with correct id
  expect(onRemoveItem).toHaveBeenCalledWith('1');
});
```

### Testing Forms

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('submits form with user input', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  
  render(<ContactForm onSubmit={handleSubmit} />);
  
  // Fill out the form
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello world');
  
  // Submit the form
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check if the form was submitted with the correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world',
  });
});

test('validates form fields before submission', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  
  render(<ContactForm onSubmit={handleSubmit} />);
  
  // Submit without filling form
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Form should not be submitted
  expect(handleSubmit).not.toHaveBeenCalled();
  
  // Error messages should be displayed
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/message is required/i)).toBeInTheDocument();
});
```

## End-to-End Testing

### Setting Up Cypress

```typescript
// cypress/e2e/auth.cy.ts
describe('Authentication Flow', () => {
  it('should allow user to login', () => {
    // Visit the login page
    cy.visit('/login');
    
    // Fill in login form
    cy.findByLabelText(/email/i).type('user@example.com');
    cy.findByLabelText(/password/i).type('password123');
    
    // Submit the form
    cy.findByRole('button', { name: /login/i }).click();
    
    // Verify redirect to dashboard and authenticated state
    cy.url().should('include', '/dashboard');
    cy.findByText(/welcome/i).should('be.visible');
  });
  
  it('should show error for invalid credentials', () => {
    cy.visit('/login');
    
    cy.findByLabelText(/email/i).type('user@example.com');
    cy.findByLabelText(/password/i).type('wrongpassword');
    
    cy.findByRole('button', { name: /login/i }).click();
    
    // Verify error message
    cy.findByText(/invalid email or password/i).should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

### Testing User Flows

```typescript
// cypress/e2e/checkout.cy.ts
describe('Checkout Flow', () => {
  beforeEach(() => {
    // Login and setup test data
    cy.login('user@example.com', 'password123');
    
    // Seed the shopping cart with items
    cy.seedCart([
      { id: 1, name: 'Product 1', price: 10, quantity: 1 },
      { id: 2, name: 'Product 2', price: 20, quantity: 2 },
    ]);
    
    // Navigate to the cart page
    cy.visit('/cart');
  });
  
  it('completes the checkout process', () => {
    // Verify cart items and total
    cy.findByText(/product 1/i).should('be.visible');
    cy.findByText(/product 2/i).should('be.visible');
    cy.findByText(/total: \$50/i).should('be.visible');
    
    // Proceed to checkout
    cy.findByRole('button', { name: /checkout/i }).click();
    
    // Fill in shipping information
    cy.url().should('include', '/checkout/shipping');
    cy.findByLabelText(/address/i).type('123 Main St');
    cy.findByLabelText(/city/i).type('Anytown');
    cy.findByLabelText(/zip/i).type('12345');
    cy.findByRole('button', { name: /continue/i }).click();
    
    // Select payment method
    cy.url().should('include', '/checkout/payment');
    cy.findByLabelText(/credit card/i).check();
    cy.findByLabelText(/card number/i).type('4242424242424242');
    cy.findByLabelText(/expiration/i).type('12/25');
    cy.findByLabelText(/cvv/i).type('123');
    cy.findByRole('button', { name: /continue/i }).click();
    
    // Review and place order
    cy.url().should('include', '/checkout/review');
    cy.findByRole('button', { name: /place order/i }).click();
    
    // Verify order confirmation
    cy.url().should('include', '/checkout/confirmation');
    cy.findByText(/order confirmed/i).should('be.visible');
    cy.findByText(/order #\d+/i).should('be.visible');
  });
});
```

## Test-Driven Development Process

Follow this process for test-driven development with AI assistance:

### 1. Define Requirements with Tests First

Start by defining the component requirements as tests:

**Example Request to AI**:
```
"Let's build a PasswordInput component using test-driven development. The component should:
- Show/hide password functionality
- Password strength indicator
- Character count
- Validation for minimum requirements

Let's start by writing tests for each of these features before implementing the component."
```

### 2. Implement the Minimal Solution

After defining tests, implement the minimal solution to make tests pass:

**Example Request to AI**:
```
"Now that we have our tests defined, let's implement the minimal PasswordInput component that passes all the tests. Focus on functionality first, then we'll refine the styling and edge cases."
```

### 3. Refactor

Once tests pass, refactor the component for better design and performance:

**Example Request to AI**:
```
"Our PasswordInput component passes all the tests. Now let's refactor it to:
- Improve performance by memoizing the strength calculation
- Extract the strength indicator to a separate component
- Improve the component's accessibility
- Follow our component template structure"
```

### 4. Add Edge Case Tests

Add tests for edge cases and refine the implementation:

**Example Request to AI**:
```
"Let's add tests for edge cases:
- What happens with empty input?
- What if passwords are extremely long?
- What about special characters or Unicode characters?
- How do we handle assistive technology?

Then we'll update our implementation to handle these cases."
```

## Accessibility Testing

### Testing with Jest-Axe

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

test('Button component has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Disabled button has proper ARIA attributes', () => {
  render(<Button disabled>Disabled Button</Button>);
  const button = screen.getByRole('button', { name: /disabled button/i });
  
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-disabled', 'true');
});
```

### Testing Focus Management

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

test('modal traps focus when open', async () => {
  const user = userEvent.setup();
  const handleClose = jest.fn();
  
  render(
    <Modal isOpen={true} onClose={handleClose}>
      <h2>Modal Title</h2>
      <button>Action 1</button>
      <button>Action 2</button>
      <button>Close</button>
    </Modal>
  );
  
  // First element should be focused by default
  expect(screen.getByRole('heading', { name: /modal title/i })).toHaveFocus();
  
  // Tab through all focusable elements
  await user.tab();
  expect(screen.getByRole('button', { name: /action 1/i })).toHaveFocus();
  
  await user.tab();
  expect(screen.getByRole('button', { name: /action 2/i })).toHaveFocus();
  
  await user.tab();
  expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  
  // Tab should cycle back to first focusable element
  await user.tab();
  expect(screen.getByRole('button', { name: /action 1/i })).toHaveFocus();
});
```

## Performance Testing

### Testing Rendering Performance

```typescript
import { render } from '@testing-library/react';
import { PerformanceObserver } from 'perf_hooks';
import LargeList from './LargeList';

// Create a large dataset
const createItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i.toString(),
    name: `Item ${i}`,
  }));
};

test('renders large list efficiently', () => {
  // Register performance observer
  const marks = [];
  const obs = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    marks.push(...entries);
  });
  obs.observe({ entryTypes: ['measure'] });
  
  // Start measurement
  performance.mark('render-start');
  
  // Render component with large dataset
  const items = createItems(1000);
  render(<LargeList items={items} />);
  
  // End measurement
  performance.mark('render-end');
  performance.measure('render-duration', 'render-start', 'render-end');
  
  // Get measures
  const [measure] = marks.filter(m => m.name === 'render-duration');
  
  // Assert that rendering is within acceptable time (e.g., under 100ms)
  expect(measure.duration).toBeLessThan(100);
  
  // Cleanup
  obs.disconnect();
});
```

### Memory Leak Testing

```typescript
import { render, unmount } from '@testing-library/react';
import MemoryComponent from './MemoryComponent';

test('component does not leak memory', () => {
  // Monitor memory before
  const heapBefore = process.memoryUsage().heapUsed;
  
  // Create and unmount component multiple times
  for (let i = 0; i < 100; i++) {
    const { unmount } = render(<MemoryComponent />);
    unmount();
  }
  
  // Force garbage collection if possible (Node.js with --expose-gc flag)
  if (global.gc) {
    global.gc();
  }
  
  // Check memory after
  const heapAfter = process.memoryUsage().heapUsed;
  const diff = heapAfter - heapBefore;
  
  // Allow for some memory overhead, but not excessive
  expect(diff).toBeLessThan(1000000); // 1MB threshold
});
```

## Test Mocking Strategies

### Mocking Named Imports

```typescript
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import * as AuthHooks from '@/hooks/useAuth';
import * as ApiHooks from '@/hooks/useApi';

test('dashboard displays user data from API', () => {
  // Mock API hooks
  jest.spyOn(AuthHooks, 'useAuth').mockReturnValue({
    isAuthenticated: true,
    user: { id: '1', name: 'John' },
  });
  
  jest.spyOn(ApiHooks, 'useUserData').mockReturnValue({
    data: {
      stats: { views: 100, likes: 50 },
      recentActivity: [{ id: '1', action: 'login', date: '2023-01-01' }],
    },
    isLoading: false,
    error: null,
  });
  
  render(<Dashboard />);
  
  expect(screen.getByText('Welcome, John')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument(); // Views count
  expect(screen.getByText('50')).toBeInTheDocument(); // Likes count
  expect(screen.getByText('login')).toBeInTheDocument(); // Recent activity
});
```

### Mocking Modules

```typescript
// Mock entire modules
jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
  pageView: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { trackEvent } from '@/utils/analytics';
import ShareButton from './ShareButton';

test('tracks share event when clicked', async () => {
  const user = userEvent.setup();
  render(<ShareButton url="https://example.com" />);
  
  await user.click(screen.getByRole('button', { name: /share/i }));
  
  expect(trackEvent).toHaveBeenCalledWith('share', {
    url: 'https://example.com',
  });
});
```

### Mocking Fetch/Axios

```typescript
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('fetches and displays user data', async () => {
  // Setup mock response
  mockedAxios.get.mockResolvedValueOnce({
    data: { id: '1', name: 'John Doe', email: 'john@example.com' },
  });
  
  render(<UserProfile userId="1" />);
  
  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // Verify axios was called correctly
  expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/1');
});
```

## AI Collaboration for Testing

### 1. Generate Test Cases

Request AI to identify test cases for a component:

```
"We need to test the ProductFilters component. Can you help identify all the test cases we should cover? The component allows filtering products by category, price range, and rating, with a reset button to clear all filters."
```

### 2. Implement Test Suites

Ask AI to implement a test suite for a specific component:

```
"Let's implement a comprehensive test suite for the Pagination component. It should test:
- Rendering with different page counts
- Page navigation functionality
- Disabled states for first/last pages
- Rendering with different UI variants
- Accessibility requirements"
```

### 3. Refactor Existing Tests

Request AI to improve test coverage or readability:

```
"Our UserProfile component tests have too much duplication in the setup. Let's refactor them to use better test fixtures and common utilities while maintaining thorough test coverage."
```

### 4. Test First Development

Guide AI through test-first development:

```
"We need to build a SelectField component. Let's follow test-driven development:
1. First, define all the component requirements as tests
2. Implement the minimal component to pass those tests
3. Refactor the implementation for better design and code quality"
```

## Testing Checklist

When implementing a new component or feature, ensure your tests cover:

- [x] Basic rendering with default props
- [x] Rendering with all supported variants/props
- [x] User interactions (clicks, inputs, etc.)
- [x] State changes and side effects
- [x] Error states and edge cases
- [x] Accessibility requirements
- [x] Integration with other components
- [x] Performance for components rendering many items

## Conclusion

Effective testing is a critical aspect of building reliable React applications. By following a consistent testing strategy, you can ensure that components work as expected, catch issues early, and maintain high code quality throughout the development process.

With AI assistance, you can accelerate test development, improve test coverage, and identify edge cases that might otherwise be overlooked. Always remember that tests should validate behavior from a user's perspective, focusing on what the component does rather than how it's implemented. 