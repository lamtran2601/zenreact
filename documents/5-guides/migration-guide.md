# Migration Guide

## Overview

This guide helps you migrate to the simplified implementation of ZenReact's core features. The new implementation focuses on essential functionality while maintaining performance benefits.

## Key Changes

### useOptimizedState Hook

#### Before:

```tsx
// Previously complex implementation with multiple comparison strategies
const [state, setState] = useOptimizedState(initialValue, {
  strategy: 'deep',
  customCompare: myComplexCompare,
});
```

#### After:

```tsx
// Simplified implementation using efficient shallow comparison
const [state, setState] = useOptimizedState(initialValue);
```

### withOptimization HOC

#### Before:

```tsx
// Previously complex implementation with multiple options
const OptimizedComponent = withOptimization(MyComponent, {
  deep: true,
  memoizeProps: ['expensive'],
  customCompare: myDeepCompare,
});
```

#### After:

```tsx
// Simplified implementation using React.memo with efficient comparison
const OptimizedComponent = withOptimization(MyComponent);
```

### Utility Functions

#### Before:

```tsx
import { deepCompare, memoizeProps, createOptimizer } from '@zenreact/core';

// Complex comparison setup
const result = deepCompare(obj1, obj2, { strict: true });
```

#### After:

```tsx
import { simpleCompare } from '@zenreact/core';

// Simple, efficient comparison
const result = simpleCompare(obj1, obj2);
```

## Upgrade Steps

1. Remove any custom comparison functions or optimization strategies
2. Update imports to use only the simplified exports
3. Remove configuration objects from hook and HOC usage
4. Replace complex comparisons with `simpleCompare`

## Breaking Changes

1. Removed `deep` comparison option
2. Removed custom comparison function support
3. Removed complex configuration options
4. Simplified API surface

## Troubleshooting

### Common Issues

1. **Performance Concerns**

   - The simplified implementation uses efficient shallow comparison
   - For most use cases, this provides optimal performance
   - If you need deep comparison, consider restructuring your state

2. **Missing Configuration Options**

   - The simplified API removes complex options
   - Focus on component composition and proper state structure
   - Use React's built-in features like useMemo for complex cases

3. **Type Errors**
   - Update type imports to use simplified types
   - Remove custom type configurations
   - Use basic type parameters as shown in examples

### Solutions

1. **State Updates Not Triggering**

   - Ensure you're creating new object references when needed
   - Use spread operator for object updates
   - Array updates should create new arrays

2. **Component Re-rendering Too Often**

   - Check prop references aren't changing unnecessarily
   - Use proper key props in lists
   - Consider component composition

3. **Type Mismatch Errors**
   - Ensure you're using the latest type definitions
   - Remove any custom type configurations
   - Update to use simplified type exports

## Need Help?

- Check our documentation for more examples
- Review the API reference for detailed information
- File an issue on our GitHub repository for bugs
