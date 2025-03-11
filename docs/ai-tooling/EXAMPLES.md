# AI Tooling Implementation Examples

## Overview

This document provides practical examples of applying the AI tooling rules and patterns within ZenReact. Each example demonstrates real-world implementation scenarios.

## Table of Contents

1. [Component Creation](#component-creation)
2. [Pattern Application](#pattern-application)
3. [State Management](#state-management)
4. [Testing Implementation](#testing-implementation)
5. [Documentation Examples](#documentation-examples)

## Component Creation

### Basic Component Example

```typescript
// Example of rule-compliant component creation
import { useState } from 'react';
import { cva } from 'class-variance-authority';
import { z } from 'zod';

// Define prop schema following validation rules
const buttonPropsSchema = z.object({
  variant: z.enum(['primary', 'secondary']),
  size: z.enum(['sm', 'md', 'lg']),
  label: z.string(),
  onClick: z.function(),
});

// Apply styling patterns using class-variance-authority
const buttonStyles = cva(
  'rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
  }
);

// Type-safe props using zod schema
type ButtonProps = z.infer<typeof buttonPropsSchema>;

export const Button = ({ variant, size, label, onClick }: ButtonProps) => {
  // Example of state management pattern
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={buttonStyles({ variant, size })}
      onClick={(e) => {
        setIsPressed(true);
        onClick(e);
        setTimeout(() => setIsPressed(false), 200);
      }}
      aria-pressed={isPressed}
    >
      {label}
    </button>
  );
};
```

### Component Testing

```typescript
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

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

## Pattern Application

### State Management Pattern

```typescript
import { create } from 'zustand';

// Define state schema
const todoStateSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean(),
    })
  ),
});

// Create type-safe store
type TodoState = z.infer<typeof todoStateSchema>;

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
}

// Implement store following patterns
const useTodoStore = create<TodoState & TodoActions>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: crypto.randomUUID(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
```

## Documentation Examples

### Component Documentation

```markdown
# Button Component

## Overview

A reusable button component that follows ZenReact patterns and guidelines.

## Props

| Name    | Type                     | Required | Description          |
| ------- | ------------------------ | -------- | -------------------- |
| variant | 'primary' \| 'secondary' | Yes      | Button style variant |
| size    | 'sm' \| 'md' \| 'lg'     | Yes      | Button size          |
| label   | string                   | Yes      | Button text          |
| onClick | () => void               | Yes      | Click handler        |

## Usage

\`\`\`tsx
import { Button } from './Button';

export const MyComponent = () => (
<Button
variant="primary"
size="md"
label="Click me"
onClick={() => console.log('Clicked!')}
/>
);
\`\`\`

## Implementation Notes

- Uses class-variance-authority for style management
- Implements accessible press state
- Includes comprehensive test coverage
- Follows ZenReact type safety patterns
```

## Testing Implementation

### Integration Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodoStore } from './store';

describe('TodoList Integration', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
  });

  it('should add and toggle todos', async () => {
    render(<TodoList />);

    // Add todo
    const input = screen.getByPlaceholderText('Add todo');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

    // Verify todo added
    const todo = screen.getByText('Test todo');
    expect(todo).toBeInTheDocument();

    // Toggle todo
    fireEvent.click(todo);
    expect(todo).toHaveClass('line-through');
  });
});
```

## Success Criteria Validation

### Performance Check Example

```typescript
import { useState, useTransition } from 'react';

// Example of performance-optimized component
export const LazyList = ({ items }: { items: string[] }) => {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          // Immediate UI update
          setSearch(value);
          // Deferred expensive computation
          startTransition(() => {
            // Filter happens in transition
            setSearch(value);
          });
        }}
      />

      {isPending ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Best Practices Application

### Error Handling Pattern

```typescript
// Define error types
type ErrorType = 'ValidationError' | 'NetworkError' | 'UnknownError';

interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: unknown;
}

// Create error handler following patterns
const handleError = (error: unknown): AppError => {
  if (error instanceof z.ZodError) {
    return {
      type: 'ValidationError',
      message: 'Invalid input data',
      details: error.errors,
    };
  }

  if (error instanceof Error) {
    return {
      type: 'UnknownError',
      message: error.message,
    };
  }

  return {
    type: 'UnknownError',
    message: 'An unexpected error occurred',
  };
};

// Example usage in component
const handleSubmit = async (data: unknown) => {
  try {
    // Validate input
    const validated = formSchema.parse(data);
    // Process data
    await processData(validated);
  } catch (error) {
    const appError = handleError(error);
    // Handle error according to type
    switch (appError.type) {
      case 'ValidationError':
        // Show validation errors
        break;
      case 'NetworkError':
        // Show network error message
        break;
      default:
      // Show generic error
    }
  }
};
```

These examples demonstrate:

1. Practical application of rules and patterns
2. Integration with ZenReact components
3. Type-safe implementations
4. Testing approaches
5. Error handling patterns
6. Performance optimizations
7. Documentation standards

For implementation details, refer to [Implementation Guide](./IMPLEMENTATION.md).
For rules and patterns, see [Rules and Patterns](./RULES_AND_PATTERNS.md).
For current status, check [Implementation Status](./STATUS.md).
