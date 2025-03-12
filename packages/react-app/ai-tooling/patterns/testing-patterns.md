# Testing Patterns

## Unit Testing Patterns

### Component Testing

```tsx
/**
 * @pattern ComponentTest
 * @rule RenderingTest
 * Test component rendering and behavior
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    // Arrange
    render(<Component />);
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('should respond to user interaction', async () => {
    // Arrange
    render(<Component />);
    
    // Act
    await userEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(screen.getByText('Changed Text')).toBeInTheDocument();
  });
});
```

### Hook Testing

```tsx
/**
 * @pattern HookTest
 * @rule CustomHookTest
 * Test custom hook behavior
 */
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('should return initial state', () => {
    // Arrange & Act
    const { result } = renderHook(() => useCustomHook());
    
    // Assert
    expect(result.current.value).toBe(initialValue);
  });
  
  it('should update state when action is called', () => {
    // Arrange
    const { result } = renderHook(() => useCustomHook());
    
    // Act
    act(() => {
      result.current.setValue('new value');
    });
    
    // Assert
    expect(result.current.value).toBe('new value');
  });
});
```

### Store Testing

```tsx
/**
 * @pattern StoreTest
 * @rule ZustandTest
 * Test Zustand store behavior
 */
import { useStore } from './store';

describe('Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.getState().reset();
  });
  
  it('should update state when action is called', () => {
    // Arrange
    const initialItems = useStore.getState().items;
    const newItem = { id: '1', name: 'Test' };
    
    // Act
    act(() => {
      useStore.getState().addItem(newItem);
    });
    
    // Assert
    const updatedItems = useStore.getState().items;
    expect(updatedItems).toHaveLength(initialItems.length + 1);
    expect(updatedItems).toContainEqual(newItem);
  });
});
```

## Integration Testing Patterns

### Component Integration

```tsx
/**
 * @pattern ComponentIntegration
 * @rule ComponentInteraction
 * Test interaction between components
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ParentComponent } from './ParentComponent';

describe('Component Integration', () => {
  it('should pass data from parent to child', () => {
    // Arrange
    render(<ParentComponent />);
    
    // Assert
    expect(screen.getByTestId('child')).toHaveTextContent('Parent Data');
  });
  
  it('should handle events from child to parent', async () => {
    // Arrange
    render(<ParentComponent />);
    
    // Act
    await userEvent.click(screen.getByTestId('child-button'));
    
    // Assert
    expect(screen.getByTestId('parent')).toHaveTextContent('Child Event Received');
  });
});
```

### Store Integration

```tsx
/**
 * @pattern StoreIntegration
 * @rule ComponentStoreInteraction
 * Test interaction between components and store
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useStore } from './store';
import { ConnectedComponent } from './ConnectedComponent';

describe('Store Integration', () => {
  beforeEach(() => {
    useStore.getState().reset();
  });
  
  it('should display store data in component', () => {
    // Arrange - set up store
    act(() => {
      useStore.getState().setItems([{ id: '1', name: 'Test Item' }]);
    });
    
    // Act
    render(<ConnectedComponent />);
    
    // Assert
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
  
  it('should update store from component interaction', async () => {
    // Arrange
    render(<ConnectedComponent />);
    
    // Act
    await userEvent.click(screen.getByText('Add Item'));
    await userEvent.type(screen.getByRole('textbox'), 'New Item');
    await userEvent.click(screen.getByText('Submit'));
    
    // Assert
    expect(useStore.getState().items).toContainEqual(expect.objectContaining({ name: 'New Item' }));
  });
});
```

## End-to-End Testing Patterns

### User Flow Testing

```tsx
/**
 * @pattern UserFlowTest
 * @rule CompleteJourney
 * Test complete user journeys
 */
describe('Booking Flow', () => {
  it('should allow user to complete booking process', async () => {
    // Arrange - navigate to booking page
    await page.goto('/matches');
    
    // Act - select match
    await page.click('[data-testid="match-1"]');
    
    // Assert - match details shown
    await expect(page.locator('[data-testid="match-details"]')).toBeVisible();
    
    // Act - start booking
    await page.click('[data-testid="book-button"]');
    
    // Assert - booking form shown
    await expect(page.locator('[data-testid="booking-form"]')).toBeVisible();
    
    // Act - fill form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="quantity-input"]', '2');
    await page.click('[data-testid="submit-button"]');
    
    // Assert - confirmation shown
    await expect(page.locator('[data-testid="booking-confirmation"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-reference"]')).toBeVisible();
  });
});
```

### Error Handling Testing

```tsx
/**
 * @pattern ErrorHandlingTest
 * @rule ErrorScenarios
 * Test error handling in user flows
 */
describe('Error Handling', () => {
  it('should display validation errors', async () => {
    // Arrange - navigate to booking form
    await page.goto('/booking/match-1');
    
    // Act - submit empty form
    await page.click('[data-testid="submit-button"]');
    
    // Assert - validation errors shown
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="quantity-error"]')).toBeVisible();
  });
  
  it('should handle server errors', async () => {
    // Arrange - mock server error
    await page.route('/api/bookings', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });
    
    // Act - submit form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="quantity-input"]', '2');
    await page.click('[data-testid="submit-button"]');
    
    // Assert - error message shown
    await expect(page.locator('[data-testid="server-error"]')).toBeVisible();
  });
});
```

## Performance Testing Patterns

### Render Performance

```tsx
/**
 * @pattern RenderPerformanceTest
 * @rule RenderTiming
 * Test component render performance
 */
import { render } from '@testing-library/react';
import { Component } from './Component';

describe('Render Performance', () => {
  it('should render efficiently', () => {
    // Arrange
    const start = performance.now();
    
    // Act
    render(<Component items={largeItemList} />);
    
    // Assert
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Render in less than 100ms
  });
});
```

### State Update Performance

```tsx
/**
 * @pattern StateUpdateTest
 * @rule UpdateTiming
 * Test state update performance
 */
describe('State Update Performance', () => {
  it('should update state efficiently', () => {
    // Arrange
    const { result } = renderHook(() => useStore());
    
    // Act
    const start = performance.now();
    act(() => {
      result.current.updateItems(largeItemList);
    });
    const end = performance.now();
    
    // Assert
    expect(end - start).toBeLessThan(50); // Update in less than 50ms
  });
});
```

## Mocking Patterns

### API Mocking

```tsx
/**
 * @pattern ApiMock
 * @rule MockExternalDependencies
 * Mock API calls for testing
 */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Set up mock server
const server = setupServer(
  rest.get('/api/matches', (req, res, ctx) => {
    return res(ctx.json(mockMatches));
  }),
  rest.post('/api/bookings', (req, res, ctx) => {
    return res(ctx.json({ id: 'booking-1', ...req.body }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration', () => {
  it('should fetch and display matches', async () => {
    // Test with mocked API
  });
});
```

### Store Mocking

```tsx
/**
 * @pattern StoreMock
 * @rule IsolateComponents
 * Mock store for component testing
 */
import { useStore } from './store';

// Mock the store
jest.mock('./store', () => ({
  useStore: jest.fn(),
}));

describe('Connected Component', () => {
  it('should render with mock store data', () => {
    // Arrange - set up mock implementation
    useStore.mockImplementation(() => ({
      items: mockItems,
      loading: false,
      error: null,
    }));
    
    // Act
    render(<ConnectedComponent />);
    
    // Assert
    expect(screen.getByText(mockItems[0].name)).toBeInTheDocument();
  });
});
```

## Validation Rules

- All components must have rendering tests
- All user interactions must be tested
- All store actions must have unit tests
- Integration tests must cover component-store interaction
- Error handling must be tested for all user flows
- Performance tests must validate render and update times
- External dependencies must be mocked
- Test coverage must be at least 95% for all modules 