# Component Examples

## Button Component

### Implementation

```typescript
import { useState } from 'react';
import { cva } from 'class-variance-authority';
import { z } from 'zod';

// Props schema
const buttonPropsSchema = z.object({
  variant: z.enum(['primary', 'secondary']),
  size: z.enum(['sm', 'md', 'lg']),
  label: z.string(),
  onClick: z.function(),
});

// Styles
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

type ButtonProps = z.infer<typeof buttonPropsSchema>;

export const Button = ({ variant, size, label, onClick }: ButtonProps) => {
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

### Tests

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

### Usage

```typescript
import { Button } from './Button';

export const MyComponent = () => (
  <Button
    variant="primary"
    size="md"
    label="Click me"
    onClick={() => console.log('Clicked!')}
  />
);
```

## List Component

### Implementation

```typescript
import { useMemo } from 'react';
import { useVirtualizer } from 'react-virtual';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  height: number;
  itemHeight: number;
}

export function VirtualList<T>({
  items,
  renderItem,
  height,
  itemHeight
}: ListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index])}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Usage

```typescript
const ListExample = () => {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  return (
    <VirtualList
      items={items}
      renderItem={(item) => (
        <div className="p-4 border-b">{item}</div>
      )}
      height={400}
      itemHeight={50}
    />
  );
};
```

## Key Features

1. Type-safe props using Zod
2. Styled using class-variance-authority
3. Virtualized list for performance
4. Accessible components
5. Comprehensive test coverage
6. Clear usage examples

## Related Patterns

- Type validation using Zod
- Styling with class-variance-authority
- Virtual list optimization
- Accessibility implementation
- Component testing
