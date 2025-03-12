# List Component Pattern

## Overview

The List Component pattern provides a structured approach to building list components in React applications. It ensures consistent list rendering, filtering, and performance optimization across the application.

## Pattern: ListComponent

```tsx
/**
 * @pattern ListComponent
 * @rule EfficientRendering
 * List component with virtualization for performance
 */
export const MatchList: FC<MatchListProps> = ({ matches }) => {
  const { virtualItems, totalSize } = useVirtual({
    size: matches.length,
    parentRef,
    estimateSize: useCallback(() => 150, []),
  });

  return (
    <div ref={parentRef} style={{ height: totalSize }}>
      {virtualItems.map((virtualItem) => (
        <MatchCard 
          key={matches[virtualItem.index].id}
          match={matches[virtualItem.index]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItem.start}px)`,
          }}
        />
      ))}
    </div>
  );
};
```

## Key Characteristics

1. **Virtualization**: Implements virtualization for large lists
2. **Filtering**: Provides filtering capabilities
3. **Sorting**: Implements sorting functionality
4. **Performance**: Optimizes rendering of list items
5. **Accessibility**: Ensures lists are accessible to all users

## Implementation Rules

### EfficientRendering

- Use virtualization for long lists
- Implement windowing for large data sets
- Optimize component tree depth
- Avoid unnecessary DOM mutations

### PreventReRenders

- Use React.memo for list items
- Optimize event handlers with useCallback
- Maintain stable references for props

## Best Practices

1. **Virtualization**: Use virtualization for lists with many items
2. **Stable Keys**: Use stable, unique keys for list items
3. **Memoization**: Memoize list items to prevent unnecessary re-renders
4. **Pagination**: Implement pagination for very large data sets
5. **Loading States**: Show appropriate loading states during data fetching

## Anti-Patterns

1. **Rendering All Items**: Rendering all items in a large list without virtualization
2. **Unstable Keys**: Using index as keys in dynamic lists
3. **Excessive Re-renders**: Not memoizing list items or handlers
4. **Monolithic Components**: Creating overly complex list components
5. **Missing Feedback**: Not providing feedback during loading or empty states

## Structure Template

```tsx
import { FC, memo, useCallback } from 'react';
import { useVirtual } from 'react-virtual';

interface ListItemProps {
  item: ItemType;
  onSelect?: (item: ItemType) => void;
}

const ListItem: FC<ListItemProps> = memo(({ item, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect?.(item);
  }, [item, onSelect]);

  return (
    <div 
      className="list-item" 
      onClick={handleSelect}
      role="button"
      tabIndex={0}
    >
      {/* Item content */}
    </div>
  );
});

interface ListProps {
  items: ItemType[];
  onSelectItem?: (item: ItemType) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const List: FC<ListProps> = ({ 
  items, 
  onSelectItem,
  isLoading,
  emptyMessage = "No items found" 
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: useCallback(() => 50, []),
    overscan: 10,
  });

  if (isLoading) {
    return <div className="loading-state">{/* Loading skeleton */}</div>;
  }

  if (items.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div 
      ref={parentRef} 
      className="list-container"
      style={{ height: '500px', overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ListItem 
              item={items[virtualRow.index]} 
              onSelect={onSelectItem} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Usage Example

```tsx
import { List } from './List';

const MyComponent = () => {
  const items = [...]; // Your data
  
  const handleSelectItem = (item) => {
    // Handle selection
  };
  
  return (
    <List 
      items={items} 
      onSelectItem={handleSelectItem}
      isLoading={false}
      emptyMessage="No matches available"
    />
  );
};
```

## Validation Rules

- Must implement virtualization for performance
- Must handle loading states
- Must handle empty states
- Must be accessible (keyboard navigation)
- Must be memoized for performance
- Must support selection callback 