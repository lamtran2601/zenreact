# Test Template

This template provides the standard structure for creating tests in the ZenReact framework using React Testing Library and Jest. Following these patterns ensures consistent, maintainable, and effective tests across your application.

## Component Test Structure

Every component test should follow this structure:

```typescript
// 1. Imports
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../contexts/ThemeContext';
import Button from './Button';

// 2. Mock dependencies (if needed)
jest.mock('../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));

// 3. Test wrapper (if needed)
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

// 4. Test suite
describe('Button', () => {
  // 5. Test setup (if needed)
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // 6. Individual tests
  it('renders correctly with default props', () => {
    renderWithTheme(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).not.toBeDisabled();
  });
  
  it('renders as disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toBeDisabled();
  });
  
  it('applies variant classes correctly', () => {
    renderWithTheme(<Button variant="primary">Primary</Button>);
    
    const primaryButton = screen.getByRole('button', { name: /primary/i });
    
    expect(primaryButton).toHaveClass('btn-primary');
  });
  
  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    
    renderWithTheme(<Button onClick={handleClick} disabled>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## Hook Test Structure

For testing custom hooks:

```typescript
// 1. Imports
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

// 2. Test suite
describe('useCounter', () => {
  // 3. Individual tests
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });
  
  it('should increment the counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should decrement the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  it('should reset the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
  
  it('should set specific counter value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.setCount(10);
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

## Context Test Structure

For testing React contexts:

```typescript
// 1. Imports
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

// 2. Test component using the context
const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 3. Test suite
describe('ThemeContext', () => {
  it('provides default theme value', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
  
  it('allows theme to be toggled', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
  
  it('provides custom initial theme when specified', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
  
  it('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    console.error = originalError;
  });
});
```

## Store Test Structure

For testing Zustand stores:

```typescript
// 1. Imports
import { useCounterStore, resetCounterStore } from './counterStore';
import { act, renderHook } from '@testing-library/react-hooks';

// 2. Test suite
describe('counterStore', () => {
  // 3. Reset store before each test
  beforeEach(() => {
    resetCounterStore();
  });
  
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCounterStore());
    
    expect(result.current.count).toBe(0);
  });
  
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounterStore());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should increment by specific amount', () => {
    const { result } = renderHook(() => useCounterStore());
    
    act(() => {
      result.current.incrementBy(5);
    });
    
    expect(result.current.count).toBe(5);
  });
  
  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounterStore());
    
    // First set to a positive value
    act(() => {
      result.current.incrementBy(5);
    });
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  it('should reset counter', () => {
    const { result } = renderHook(() => useCounterStore());
    
    act(() => {
      result.current.incrementBy(10);
    });
    
    expect(result.current.count).toBe(10);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(0);
  });
});
```

## API Request Test Structure

For testing API interactions using MSW (Mock Service Worker):

```typescript
// 1. Imports
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// 2. Mock server setup
const server = setupServer(
  rest.get('/api/users/1', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })
    );
  }),
  
  rest.put('/api/users/1', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: req.body.name,
        email: req.body.email,
      })
    );
  })
);

// 3. Test suite
describe('UserProfile', () => {
  // 4. Start/stop server
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it('loads and displays user data', async () => {
    render(<UserProfile userId="1" />);
    
    // Initially shows loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Verify data displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('handles API errors', async () => {
    // Override the default handler for this test
    server.use(
      rest.get('/api/users/1', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    render(<UserProfile userId="1" />);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to load user/i)).toBeInTheDocument();
    });
  });
  
  it('updates user information', async () => {
    render(<UserProfile userId="1" editable />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Find and click edit button
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    // Find name input and change it
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/profile updated/i)).toBeInTheDocument();
    });
  });
});
```

## Integration Test Structure

For testing that multiple components work together:

```typescript
// 1. Imports
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import AppRoutes from './AppRoutes';
import { MemoryRouter } from 'react-router-dom';

// 2. Mock server
const server = setupServer(
  rest.get('/api/products/1', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'Test Product',
        price: 19.99,
        description: 'This is a test product',
      })
    );
  })
);

// 3. Custom render function with providers
const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <CartProvider>
          {ui}
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

// 4. Test suite
describe('Shopping Flow', () => {
  // 5. Start/stop server
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it('allows adding a product to cart and proceeding to checkout', async () => {
    // Render app with routes
    renderWithProviders(<AppRoutes />, { route: '/products/1' });
    
    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
    
    // Add product to cart
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    
    // Verify success message
    expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
    
    // Navigate to cart
    await userEvent.click(screen.getByRole('link', { name: /cart/i }));
    
    // Verify product is in cart
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$19.99')).toBeInTheDocument();
    });
    
    // Verify cart totals
    expect(screen.getByText(/total: \$19.99/i)).toBeInTheDocument();
    
    // Proceed to checkout
    await userEvent.click(screen.getByRole('button', { name: /checkout/i }));
    
    // Verify on checkout page
    await waitFor(() => {
      expect(screen.getByText(/checkout/i)).toBeInTheDocument();
      expect(screen.getByText(/payment information/i)).toBeInTheDocument();
    });
  });
});
```

## Unit Test Structure

For testing utility functions:

```typescript
// 1. Imports
import { formatCurrency, formatDate, validateEmail } from './utils';

// 2. Test suite
describe('Utility functions', () => {
  // 3. Test formatCurrency
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });
    
    it('formats EUR correctly', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    });
    
    it('handles zero correctly', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });
    
    it('rounds to 2 decimal places', () => {
      expect(formatCurrency(1234.5678, 'USD')).toBe('$1,234.57');
    });
  });
  
  // 4. Test formatDate
  describe('formatDate', () => {
    it('formats dates in the default format', () => {
      const date = new Date('2023-01-15T12:00:00Z');
      expect(formatDate(date)).toBe('01/15/2023');
    });
    
    it('formats dates in custom format', () => {
      const date = new Date('2023-01-15T12:00:00Z');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-01-15');
    });
  });
  
  // 5. Test validateEmail
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });
    
    it('rejects invalid email addresses', () => {
      expect(validateEmail('not-an-email')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user@.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });
});
```

## Test File Organization

Each test file should be placed according to these patterns:

1. **Component Tests**: Next to the component file with a `.test.tsx` extension
   - Example: `src/components/Button.tsx` → `src/components/Button.test.tsx`

2. **Hook Tests**: Next to the hook file with a `.test.ts` extension
   - Example: `src/hooks/useCounter.ts` → `src/hooks/useCounter.test.ts`

3. **Context Tests**: Next to the context file with a `.test.tsx` extension
   - Example: `src/contexts/ThemeContext.tsx` → `src/contexts/ThemeContext.test.tsx`

4. **Store Tests**: Next to the store file with a `.test.ts` extension
   - Example: `src/stores/userStore.ts` → `src/stores/userStore.test.ts`

5. **Integration Tests**: In a dedicated `__tests__` directory at the feature level
   - Example: `src/features/cart/__tests__/ShoppingFlow.test.tsx`

6. **E2E Tests**: In a dedicated `cypress` or `e2e` directory at the project root
   - Example: `cypress/integration/checkout.spec.js`

## Common Test Patterns

### 1. Testing Async Logic

```typescript
it('loads data when component mounts', async () => {
  render(<DataLoader />);
  
  // Check for loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  
  // Check that data is displayed
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### 2. Testing Form Submission

```typescript
it('submits the form with user data', async () => {
  const handleSubmit = jest.fn();
  
  render(<UserForm onSubmit={handleSubmit} />);
  
  // Fill out form fields
  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  
  // Submit the form
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check that onSubmit was called with correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});
```

### 3. Testing Error Handling

```typescript
it('displays error message when API request fails', async () => {
  // Mock a failed API response
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );
  
  render(<UserList />);
  
  // Wait for error message
  await waitFor(() => {
    expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
  });
  
  // Check that retry button is shown
  expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
});
```

### 4. Testing Conditional Rendering

```typescript
it('renders different content based on user role', () => {
  const { rerender } = render(
    <UserProfile user={{ name: 'John', role: 'user' }} />
  );
  
  // Regular user should not see admin panel
  expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument();
  
  // Re-render with admin user
  rerender(<UserProfile user={{ name: 'Admin', role: 'admin' }} />);
  
  // Admin user should see admin panel
  expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
});
```

### 5. Testing Authentication Flows

```typescript
it('redirects unauthenticated users to login page', async () => {
  // Mock an unauthenticated state
  jest.spyOn(AuthService, 'isAuthenticated').mockReturnValue(false);
  
  // Render a protected route
  renderWithRouter(<ProtectedRoute path="/dashboard" element={<Dashboard />} />);
  
  // Expect a redirect to login page
  await waitFor(() => {
    expect(window.location.pathname).toBe('/login');
  });
});

it('allows authenticated users to access protected routes', async () => {
  // Mock an authenticated state
  jest.spyOn(AuthService, 'isAuthenticated').mockReturnValue(true);
  
  // Render a protected route
  renderWithRouter(<ProtectedRoute path="/dashboard" element={<Dashboard />} />);
  
  // Expect dashboard content to be rendered
  await waitFor(() => {
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Test Structure

- **Test Isolation**: Each test should be independent of others
- **Clear Test Names**: Use descriptive names that explain what is being tested
- **AAA Pattern**: Structure tests with Arrange, Act, Assert
- **One Assertion Focus**: Each test should focus on one behavior or outcome

### 2. Selectors

- **Priority Order**: Use these queries in this priority:
  1. `getByRole` (most accessible)
  2. `getByLabelText` (for form fields)
  3. `getByText` (for non-interactive elements)
  4. `getByTestId` (as a last resort)
  
- **Avoid Overly Specific Selectors**: Use flexible selectors that don't break with minor UI changes

### 3. User Interactions

- **Use `userEvent` over `fireEvent`**: `userEvent` more closely simulates real user behavior
- **Chain async/await**: Always use await with user interactions

### 4. Mocking

- **Mock at the Boundary**: Mock external dependencies and services, not internal functions
- **Reset Mocks**: Reset mocks between tests to avoid test pollution
- **Minimize Mocking**: Only mock what is necessary for the test

### 5. Setup and Cleanup

- **Use `beforeEach` for Common Setup**: Place repeated setup code in `beforeEach`
- **Clean Up Resources**: Always clean up resources in `afterEach` or `afterAll`
- **Isolate Tests**: Ensure tests don't affect each other through global state

## AI Collaboration for Tests

When working with AI on test development:

### 1. Describe the Component Behavior

```
"Let's write tests for the UserProfile component, which:
1. Displays user information (name, email, role)
2. Shows a loading state while fetching user data
3. Allows editing user information if editable prop is true
4. Shows error messages if the API request fails
5. Shows different UI elements based on user role"
```

### 2. Outline Test Cases

```
"We need the following test cases:
1. Initial loading state is displayed
2. User data is rendered correctly when loaded
3. Edit mode can be activated and form is shown
4. Submit updates user data and shows success message
5. Error messages are displayed when API fails
6. Admin controls are only shown for admin users"
```

### 3. Specify Testing Environment

```
"We'll use React Testing Library with Jest. We need to mock:
1. The useUser hook that fetches user data
2. The API calls for updating user information

We should use MSW to intercept API requests for realistic testing."
```

## Conclusion

Following this test template ensures consistent, thorough testing across your ZenReact application. Well-structured tests serve as documentation for your code and provide confidence when making changes. Remember that tests should be maintainable and focused on behavior rather than implementation details. 