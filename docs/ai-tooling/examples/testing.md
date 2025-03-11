# Testing Examples

## Unit Testing

### Component Testing

```typescript
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('should render with correct styles', () => {
    const { container } = render(
      <Button
        variant="primary"
        size="md"
        label="Click me"
        onClick={() => {}}
      />
    );

    expect(container.firstChild).toHaveClass(
      'bg-blue-500',
      'text-white',
      'px-4',
      'py-2'
    );
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button
        variant="primary"
        size="md"
        label="Click me"
        onClick={handleClick}
      />
    );

    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Integration Testing

### Store Integration

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTodoStore } from '../store/todoStore';

describe('Todo Store Integration', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
  });

  it('should add and manage todos', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Test todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });
});
```

## E2E Testing

### Form Submission Flow

```typescript
import { test, expect } from '@playwright/test';

test('complete user registration flow', async ({ page }) => {
  await page.goto('/register');

  // Fill form
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.fill('[name="confirmPassword"]', 'password123');

  // Submit form
  await page.click('button[type="submit"]');

  // Assert success
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('.welcome-message')).toContainText('Welcome, test@example.com');
});
```

## Performance Testing

### Component Performance

```typescript
import { render } from '@testing-library/react';
import { VirtualizedList } from '../components/VirtualizedList';

describe('VirtualizedList Performance', () => {
  it('should render large lists efficiently', async () => {
    const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
    const start = performance.now();

    const { container } = render(
      <VirtualizedList
        items={items}
        renderItem={(item) => <div>{item}</div>}
        height={400}
        itemHeight={40}
      />
    );

    const end = performance.now();
    const renderTime = end - start;

    // Assert render time is reasonable
    expect(renderTime).toBeLessThan(100);

    // Assert only visible items are in DOM
    const renderedItems = container.querySelectorAll('[role="listitem"]');
    expect(renderedItems.length).toBeLessThan(items.length);
  });
});
```

## Snapshot Testing

### UI Component Snapshots

```typescript
import { render } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button Snapshots', () => {
  it('should match primary button snapshot', () => {
    const { container } = render(
      <Button
        variant="primary"
        size="md"
        label="Click me"
        onClick={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match secondary button snapshot', () => {
    const { container } = render(
      <Button
        variant="secondary"
        size="md"
        label="Click me"
        onClick={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
```

## Testing Utilities

### Custom Render Function

```typescript
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/rootReducer';

function render(
  ui: React.ReactElement,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  };
}

export * from '@testing-library/react';
export { render };
```

## Best Practices

1. **Test Organization**

   - Group related tests
   - Clear test descriptions
   - Proper setup and cleanup
   - Isolated test cases

2. **Test Coverage**

   - Unit tests for components
   - Integration tests for features
   - E2E tests for flows
   - Performance tests for optimization

3. **Testing Patterns**
   - Use testing utilities
   - Mock external dependencies
   - Test error scenarios
   - Validate accessibility

## Related Patterns

- Component testing
- Store integration testing
- Performance testing
- E2E testing
- Custom test utilities
