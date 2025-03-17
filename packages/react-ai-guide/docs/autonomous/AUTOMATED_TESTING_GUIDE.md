# AI-Driven Testing Generation Guide

## Purpose

This guide helps AI assistants autonomously generate appropriate tests for React components and features. By following structured approaches for different testing scenarios, AIs can create comprehensive test suites that verify functionality, catch regressions, and document expected behavior.

## When to Generate Tests

AI assistants should proactively generate tests when:

1. Creating new components or features
2. Making significant changes to existing code
3. Specifically asked to improve test coverage
4. Identifying areas of code with complex logic or edge cases

## Testing Approach Overview

When generating tests, follow this general process:

1. **Analyze the code**: Understand what the code is doing and its key functionality
2. **Identify test types**: Determine which types of tests are most appropriate
3. **Determine test scope**: Decide what specific aspects need testing
4. **Generate test cases**: Create comprehensive test cases covering functionality and edge cases 
5. **Implement tests**: Write the actual test code
6. **Review coverage**: Ensure important functionality is covered

## Determining Test Types

Different parts of a React application require different testing approaches:

```
I'll determine the appropriate test types for this code:

1. Unit Tests
   CHOOSE WHEN:
   - Testing isolated functions with clear inputs and outputs
   - Testing utility functions
   - Testing pure business logic
   - Testing individual hooks

2. Component Tests
   CHOOSE WHEN:
   - Testing UI components
   - Verifying rendering logic
   - Testing component interactions
   - Verifying accessibility

3. Integration Tests
   CHOOSE WHEN:
   - Testing interactions between multiple components
   - Testing feature workflows
   - Testing components with context or other dependencies
   - Verifying data flow between components

4. API/Service Tests
   CHOOSE WHEN:
   - Testing API client code
   - Testing service layers
   - Testing data transformation logic
   - Testing custom hooks that interact with APIs
```

## Test Case Identification Framework

For each test target, systematically identify test cases:

```
I'll identify appropriate test cases:

1. Happy Path Cases
   - What is the primary intended functionality?
   - What are the common usage scenarios?
   - What outputs or state changes should occur with valid inputs?

2. Edge Cases
   - What happens with empty or minimal inputs?
   - What happens with unusually large inputs?
   - What happens with special characters or unusual inputs?
   - What are the boundary conditions?

3. Error Cases
   - What invalid inputs could occur?
   - What external failures could occur (API errors, etc.)?
   - How should the code handle these errors?
   - What error states should be displayed to users?

4. Interaction Cases
   - What user interactions need testing?
   - What happens when multiple actions occur in sequence?
   - What happens when operations are interrupted?
   - What asynchronous behaviors need verification?

5. State Management Cases
   - What state changes should occur?
   - How does the code handle initial/loading/error/empty states?
   - What happens when state is updated multiple times?
   - Are there any state dependencies or side effects?
```

## Testing Library Selection

Choose the appropriate testing libraries based on the project and test requirements:

```
I'll select appropriate testing tools for this code:

1. Jest
   USE FOR:
   - Test runner for all types of tests
   - Mocking dependencies
   - Snapshot testing
   - Assertions

2. React Testing Library
   USE FOR:
   - Component rendering and interaction
   - DOM queries that encourage accessible code
   - User event simulation
   - Testing from a user perspective

3. Mock Service Worker (MSW)
   USE FOR:
   - Mocking API requests
   - Testing components that fetch data
   - Testing error handling of API calls

4. Jest-Axe
   USE FOR:
   - Automated accessibility testing
   - Catching common a11y issues

5. User-Event
   USE FOR:
   - Simulating realistic user interactions
   - Complex event sequences
```

## Component Testing Patterns

### Rendering Tests

```
// For a component's basic rendering
test('renders correctly', () => {
  render(<ComponentName prop1="value" prop2={123} />);
  
  // Verify key elements are in the document
  expect(screen.getByText('Expected content')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
});

// For conditional rendering
test('conditionally renders content based on props', () => {
  // Render with one condition
  const { rerender } = render(<ComponentName showExtra={false} />);
  expect(screen.queryByText('Extra content')).not.toBeInTheDocument();
  
  // Re-render with different condition
  rerender(<ComponentName showExtra={true} />);
  expect(screen.getByText('Extra content')).toBeInTheDocument();
});
```

### User Interaction Tests

```
// Testing a click handler
test('calls onAction when button is clicked', async () => {
  const handleAction = jest.fn();
  render(<ComponentName onAction={handleAction} />);
  
  const button = screen.getByRole('button', { name: 'Action' });
  await userEvent.click(button);
  
  expect(handleAction).toHaveBeenCalledTimes(1);
});

// Testing form submission
test('submits form with user input', async () => {
  const handleSubmit = jest.fn();
  render(<FormComponent onSubmit={handleSubmit} />);
  
  // Fill in form fields
  await userEvent.type(screen.getByLabelText('Username'), 'testuser');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  
  // Submit form
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  // Verify submission
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password123'
  });
});
```

### State Management Tests

```
// Testing state changes
test('updates counter when increment button is clicked', async () => {
  render(<Counter initialCount={0} />);
  
  // Verify initial state
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
  
  // Perform action
  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  
  // Verify state updated
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Testing loading states
test('shows loading state while fetching data', async () => {
  // Setup mock that will resolve after delay
  server.use(
    rest.get('/api/data', (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json({ value: 'test data' }));
    })
  );
  
  render(<DataComponent />);
  
  // Verify loading state is shown
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data to load
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  
  // Verify data is displayed
  expect(screen.getByText('test data')).toBeInTheDocument();
});
```

### Error Handling Tests

```
// Testing error states
test('displays error message when API call fails', async () => {
  // Setup mock to return error
  server.use(
    rest.get('/api/data', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );
  
  render(<DataComponent />);
  
  // Wait for error state
  await waitFor(() => {
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });
});

// Testing boundary conditions
test('handles empty data correctly', async () => {
  // Setup mock to return empty array
  server.use(
    rest.get('/api/items', (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );
  
  render(<ItemList />);
  
  // Wait for empty state message
  await waitFor(() => {
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});
```

## Hook Testing Patterns

### Basic Hook Testing

```
// Testing a simple custom hook
test('useCounter provides count and increment/decrement functions', () => {
  const { result } = renderHook(() => useCounter(0));
  
  // Test initial state
  expect(result.current.count).toBe(0);
  
  // Test actions
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
  
  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);
});
```

### Testing Hooks with Props

```
// Testing hooks with props/parameters
test('useFilter filters items correctly', () => {
  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ];
  
  const { result, rerender } = renderHook(
    (props) => useFilter(props.items, props.filter),
    { initialProps: { items, filter: '' } }
  );
  
  // Test no filter
  expect(result.current.length).toBe(3);
  
  // Test with filter
  rerender({ items, filter: 'a' });
  expect(result.current.length).toBe(2); // Apple, Banana
  expect(result.current[0].name).toBe('Apple');
  expect(result.current[1].name).toBe('Banana');
});
```

### Testing Hooks with Context

```
// Testing hooks that use context
test('useAuth provides user and login/logout functions', () => {
  // Create wrapper with context provider
  const wrapper = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  );
  
  const { result } = renderHook(() => useAuth(), { wrapper });
  
  // Test initial state
  expect(result.current.user).toBeNull();
  
  // Test login
  act(() => {
    result.current.login({ username: 'test', password: 'password' });
  });
  
  // Verify state updated
  expect(result.current.user).toEqual({ username: 'test' });
  
  // Test logout
  act(() => {
    result.current.logout();
  });
  
  // Verify state reset
  expect(result.current.user).toBeNull();
});
```

### Testing Hooks with Async Logic

```
// Testing async hooks
test('useFetch loads data correctly', async () => {
  // Setup mock
  server.use(
    rest.get('/api/data', (req, res, ctx) => {
      return res(ctx.json({ value: 'test data' }));
    })
  );
  
  const { result, waitForNextUpdate } = renderHook(() => 
    useFetch('/api/data')
  );
  
  // Initial state should be loading
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBeNull();
  
  // Wait for the update
  await waitForNextUpdate();
  
  // Verify data loaded
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual({ value: 'test data' });
  expect(result.current.error).toBeNull();
});
```

## Utility Function Testing

### Pure Function Tests

```
// Testing pure utility functions
test('formatCurrency formats numbers correctly', () => {
  // Test basic case
  expect(formatCurrency(1000)).toBe('$1,000.00');
  
  // Test with different locale/currency
  expect(formatCurrency(1000, 'EUR', 'de-DE')).toBe('1.000,00 €');
  
  // Test zero
  expect(formatCurrency(0)).toBe('$0.00');
  
  // Test negative numbers
  expect(formatCurrency(-1000)).toBe('-$1,000.00');
});

// Testing with multiple test cases
test.each([
  [1000, '$1,000.00'],
  [1000.5, '$1,000.50'],
  [0, '$0.00'],
  [-1000, '-$1,000.00']
])('formatCurrency(%i) returns %s', (input, expected) => {
  expect(formatCurrency(input)).toBe(expected);
});
```

### Transformation Function Tests

```
// Testing data transformation functions
test('transformApiResponse converts API format to app format', () => {
  // Test with mock API response
  const apiResponse = {
    id: '123',
    attributes: {
      title: 'Test Item',
      price: 1000,
      description: 'Test description'
    },
    relationships: {
      category: {
        data: { id: '456', type: 'category' }
      }
    }
  };
  
  const expected = {
    id: '123',
    title: 'Test Item',
    price: 1000,
    description: 'Test description',
    categoryId: '456'
  };
  
  expect(transformApiResponse(apiResponse)).toEqual(expected);
  
  // Test with partial/missing data
  const partialResponse = {
    id: '123',
    attributes: {
      title: 'Test Item'
    }
  };
  
  const expectedPartial = {
    id: '123',
    title: 'Test Item',
    price: null,
    description: '',
    categoryId: null
  };
  
  expect(transformApiResponse(partialResponse)).toEqual(expectedPartial);
});
```

## API/Service Testing

### API Client Tests

```
// Testing API client functions
test('fetchUser retrieves user data', async () => {
  // Setup mock
  const mockUser = { id: '123', name: 'Test User' };
  server.use(
    rest.get('/api/users/123', (req, res, ctx) => {
      return res(ctx.json(mockUser));
    })
  );
  
  // Call API function
  const result = await fetchUser('123');
  
  // Verify result
  expect(result).toEqual(mockUser);
});

// Testing API error handling
test('fetchUser handles 404 error correctly', async () => {
  // Setup mock to return 404
  server.use(
    rest.get('/api/users/not-found', (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  
  // Call API and expect it to reject
  await expect(fetchUser('not-found')).rejects.toThrow('User not found');
});
```

### Service Layer Tests

```
// Testing service functions
test('AuthService.login authenticates user and stores token', async () => {
  // Setup mocks
  const mockToken = 'mock-jwt-token';
  server.use(
    rest.post('/api/login', (req, res, ctx) => {
      return res(ctx.json({ token: mockToken }));
    })
  );
  
  // Spy on localStorage
  jest.spyOn(Storage.prototype, 'setItem');
  
  // Call service method
  await AuthService.login('user', 'password');
  
  // Verify token was stored
  expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', mockToken);
});
```

## Test Organization Patterns

### Describe Blocks

```
// Grouping related tests
describe('Button component', () => {
  // Test rendering
  describe('rendering', () => {
    test('renders with default props', () => {
      // Test implementation
    });
    
    test('renders with custom classes', () => {
      // Test implementation
    });
    
    test('renders in disabled state', () => {
      // Test implementation
    });
  });
  
  // Test interactions
  describe('interactions', () => {
    test('calls onClick when clicked', () => {
      // Test implementation
    });
    
    test('does not call onClick when disabled', () => {
      // Test implementation
    });
  });
});
```

### Test Setup Patterns

```
// Common setup with beforeEach
describe('UserList component', () => {
  const mockUsers = [
    { id: '1', name: 'User 1' },
    { id: '2', name: 'User 2' }
  ];
  
  // Setup before each test
  beforeEach(() => {
    // Common setup
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json(mockUsers));
      })
    );
  });
  
  // Individual tests
  test('displays user list when loaded', async () => {
    // Test implementation
  });
  
  test('shows loading state initially', () => {
    // Test implementation
  });
});
```

## Common Testing Pitfalls and Solutions

### Implementation vs. Behavior Testing

**Pitfall:** Testing implementation details instead of behavior.

**Solution:** Focus on testing what the component does, not how it does it.

```
// AVOID: Testing implementation details
test('should set isOpen state to true when toggleMenu is called', () => {
  const wrapper = shallow(<Menu />);
  const instance = wrapper.instance();
  instance.toggleMenu();
  expect(wrapper.state('isOpen')).toBe(true);
});

// BETTER: Test behavior/output
test('should show menu items when menu button is clicked', async () => {
  render(<Menu />);
  
  // Menu items should be hidden initially
  expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  
  // Click the menu button
  await userEvent.click(screen.getByRole('button', { name: /menu/i }));
  
  // Menu items should now be visible
  expect(screen.getAllByRole('menuitem').length).toBeGreaterThan(0);
});
```

### Query Selection

**Pitfall:** Using ineffective queries that don't mirror user interaction.

**Solution:** Use queries that reflect how users interact with the UI.

```
// AVOID: Testing with implementation details
test('renders correctly', () => {
  render(<Component />);
  expect(screen.getByTestId('greeting')).toHaveTextContent('Hello');
});

// BETTER: Test from user perspective
test('renders greeting message', () => {
  render(<Component />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});
```

### Async Testing

**Pitfall:** Not properly handling asynchronous operations.

**Solution:** Use proper async/await patterns with appropriate waits.

```
// AVOID: Not waiting for async operations
test('loads data', () => {
  render(<DataComponent />);
  expect(screen.getByText('Data loaded')).toBeInTheDocument(); // May fail
});

// BETTER: Properly wait for async operations
test('loads data', async () => {
  render(<DataComponent />);
  
  // Wait for loading to complete
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  
  // Now check for loaded state
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

## Testing Example: React Component

Let's see a complete example of testing a TodoItem component:

```jsx
// TodoItem.tsx
interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
```

Here's a complete test suite for this component:

```tsx
// TodoItem.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  // Define test data
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false
  };
  
  // Define mock handlers
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();
  
  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // Test rendering
  describe('rendering', () => {
    test('renders the todo text', () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });
    
    test('checkbox is unchecked for incomplete todos', () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
    
    test('checkbox is checked for completed todos', () => {
      const completedTodo = { ...mockTodo, completed: true };
      
      render(
        <TodoItem 
          todo={completedTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
    
    test('has appropriate completed class when todo is completed', () => {
      const completedTodo = { ...mockTodo, completed: true };
      
      render(
        <TodoItem 
          todo={completedTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveClass('completed');
    });
  });
  
  // Test interactions
  describe('interactions', () => {
    test('calls onToggle with todo id when checkbox is clicked', async () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      
      expect(mockToggle).toHaveBeenCalledTimes(1);
      expect(mockToggle).toHaveBeenCalledWith('1');
    });
    
    test('calls onDelete with todo id when delete button is clicked', async () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await userEvent.click(deleteButton);
      
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledWith('1');
    });
  });
  
  // Test accessibility
  describe('accessibility', () => {
    test('checkbox has appropriate aria-label', () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute(
        'aria-label', 
        'Mark "Test todo" as complete'
      );
    });
    
    test('delete button has appropriate aria-label', () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockToggle} 
          onDelete={mockDelete} 
        />
      );
      
      const deleteButton = screen.getByRole('button');
      expect(deleteButton).toHaveAttribute(
        'aria-label', 
        'Delete "Test todo"'
      );
    });
  });
});
```

## Testing Example: Custom Hook

Let's see a complete example of testing a useTodos hook:

```tsx
// useTodos.ts
import { useState, useCallback } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  
  const addTodo = useCallback((text: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        text,
        completed: false
      }
    ]);
  }, []);
  
  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);
  
  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);
  
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}
```

Here's a complete test suite for this hook:

```tsx
// useTodos.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  // Test initialization
  describe('initialization', () => {
    test('initializes with empty todos by default', () => {
      const { result } = renderHook(() => useTodos());
      
      expect(result.current.todos).toEqual([]);
    });
    
    test('initializes with provided initial todos', () => {
      const initialTodos = [
        { id: '1', text: 'Test todo', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      expect(result.current.todos).toEqual(initialTodos);
    });
  });
  
  // Test adding todos
  describe('addTodo', () => {
    test('adds a new todo with the provided text', () => {
      const { result } = renderHook(() => useTodos());
      
      act(() => {
        result.current.addTodo('New todo');
      });
      
      expect(result.current.todos.length).toBe(1);
      expect(result.current.todos[0].text).toBe('New todo');
      expect(result.current.todos[0].completed).toBe(false);
      expect(result.current.todos[0].id).toBeDefined();
    });
    
    test('preserves existing todos when adding new ones', () => {
      const initialTodos = [
        { id: '1', text: 'Existing todo', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      act(() => {
        result.current.addTodo('New todo');
      });
      
      expect(result.current.todos.length).toBe(2);
      expect(result.current.todos[0].text).toBe('Existing todo');
      expect(result.current.todos[1].text).toBe('New todo');
    });
  });
  
  // Test toggling todos
  describe('toggleTodo', () => {
    test('toggles the completed status of the specified todo', () => {
      const initialTodos = [
        { id: '1', text: 'Test todo', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      act(() => {
        result.current.toggleTodo('1');
      });
      
      expect(result.current.todos[0].completed).toBe(true);
      
      // Toggle back
      act(() => {
        result.current.toggleTodo('1');
      });
      
      expect(result.current.todos[0].completed).toBe(false);
    });
    
    test('does nothing when toggling a non-existent todo', () => {
      const initialTodos = [
        { id: '1', text: 'Test todo', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      act(() => {
        result.current.toggleTodo('non-existent');
      });
      
      expect(result.current.todos).toEqual(initialTodos);
    });
  });
  
  // Test deleting todos
  describe('deleteTodo', () => {
    test('removes the specified todo', () => {
      const initialTodos = [
        { id: '1', text: 'Todo 1', completed: false },
        { id: '2', text: 'Todo 2', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      act(() => {
        result.current.deleteTodo('1');
      });
      
      expect(result.current.todos.length).toBe(1);
      expect(result.current.todos[0].id).toBe('2');
    });
    
    test('does nothing when deleting a non-existent todo', () => {
      const initialTodos = [
        { id: '1', text: 'Test todo', completed: false }
      ];
      
      const { result } = renderHook(() => useTodos(initialTodos));
      
      act(() => {
        result.current.deleteTodo('non-existent');
      });
      
      expect(result.current.todos).toEqual(initialTodos);
    });
  });
});
```

## Generating Tests Autonomously

When generating tests autonomously, follow this process:

1. **Analyze the code under test**:
   - Identify its purpose and primary functionality
   - Identify inputs, outputs, and side effects
   - Identify edge cases and potential failure modes

2. **Determine test scope**:
   - Which aspects of the code need testing?
   - What are the critical paths that must be tested?
   - What edge cases should be covered?

3. **Create a test plan**:
   - Organize tests into logical groups
   - Cover rendering, functionality, edge cases, and errors
   - Ensure sufficient coverage of the code

4. **Generate test code**:
   - Create descriptive test names
   - Set up test data and mocks
   - Implement assertions that verify expected behavior
   - Add comments to explain complex test logic

5. **Review and optimize**:
   - Check for test coverage gaps
   - Look for redundant tests
   - Ensure tests are maintainable and clear

## Conclusion

This guide provides a comprehensive approach for AI assistants to autonomously generate effective tests for React components and features. By systematically analyzing code, identifying appropriate test cases, and implementing tests using established patterns, AIs can create test suites that:

1. Verify correct functionality
2. Document expected behavior
3. Catch regressions
4. Improve code quality

Remember that tests should focus on behavior rather than implementation details, and should be structured to remain stable even as implementation changes. By following the patterns and approaches outlined in this guide, AI assistants can generate high-quality tests that enhance code reliability and maintainability. 