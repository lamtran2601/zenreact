# Performance Optimization Patterns

## Memoization Patterns

### Component Memoization

```tsx
/**
 * @pattern MemoizedComponent
 * @rule PreventReRenders
 * Memoize components that receive the same props frequently
 */
import { memo } from 'react';

// Define component
const ExpensiveComponent = ({ data }) => {
  // Render logic
};

// Export memoized version
export default memo(ExpensiveComponent);
```

### Callback Memoization

```tsx
/**
 * @pattern MemoizedCallback
 * @rule StableReferences
 * Memoize callbacks to prevent unnecessary re-renders
 */
import { useCallback } from 'react';

// Inside component
const handleClick = useCallback(() => {
  // Event handling logic
}, [/* dependencies */]);
```

### Value Memoization

```tsx
/**
 * @pattern MemoizedValue
 * @rule ComputedValues
 * Memoize expensive calculations
 */
import { useMemo } from 'react';

// Inside component
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

## Virtualization Patterns

### List Virtualization

```tsx
/**
 * @pattern VirtualizedList
 * @rule EfficientRendering
 * Render only visible items in long lists
 */
import { useVirtualizer } from 'react-virtual';

// Inside component
const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});

// Render only visible items
const virtualItems = rowVirtualizer.getVirtualItems();
```

### Windowing Pattern

```tsx
/**
 * @pattern WindowedRendering
 * @rule MinimalDOM
 * Render only items in the current window
 */
// Only render items that are visible or about to become visible
const visibleItems = items.slice(startIndex, endIndex);
```

## Code Splitting Patterns

### Route-Based Splitting

```tsx
/**
 * @pattern RouteSplitting
 * @rule LazyLoading
 * Load components only when needed based on routes
 */
import { lazy, Suspense } from 'react';

// Lazy load components
const MatchList = lazy(() => import('./components/matches/MatchList'));
const BookingForm = lazy(() => import('./components/booking/BookingForm'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <MatchList />
</Suspense>
```

### Feature-Based Splitting

```tsx
/**
 * @pattern FeatureSplitting
 * @rule ModularCode
 * Split code by feature to load only what's needed
 */
// Load feature only when needed
const loadBookingFeature = async () => {
  const { BookingModule } = await import('./features/booking');
  return BookingModule;
};
```

## State Management Optimization

### Selector Optimization

```tsx
/**
 * @pattern OptimizedSelector
 * @rule MinimalSubscriptions
 * Use fine-grained selectors to prevent unnecessary re-renders
 */
// Bad: subscribing to the entire state
const { matches, bookings, filters } = useStore();

// Good: subscribing only to what's needed
const matches = useStore(state => state.matches);
```

### Batched Updates

```tsx
/**
 * @pattern BatchedUpdates
 * @rule MinimalRenders
 * Batch multiple state updates together
 */
// Instead of multiple separate updates
const handleSubmit = () => {
  // Single batched update
  set((state) => ({
    isLoading: false,
    data: newData,
    error: null,
    lastUpdated: Date.now()
  }));
};
```

## Resource Optimization

### Image Optimization

```tsx
/**
 * @pattern OptimizedImages
 * @rule EfficientLoading
 * Optimize images for performance
 */
// Use appropriate size and format
<img 
  src={`${image}?w=400&q=75`} 
  loading="lazy"
  width="400"
  height="200"
  alt={description}
/>
```

### Font Optimization

```tsx
/**
 * @pattern OptimizedFonts
 * @rule MinimalFontLoading
 * Load only necessary font weights and subsets
 */
// In CSS or font loading
@font-face {
  font-family: 'CustomFont';
  font-display: swap;
  font-weight: 400;
  src: url('/fonts/CustomFont-Regular.woff2') format('woff2');
}
```

## Caching Patterns

### Memoized Selectors

```tsx
/**
 * @pattern CachedSelectors
 * @rule EfficientQueries
 * Cache selector results to avoid recalculation
 */
// In store
getFilteredMatches: () => {
  // Check if cache is valid
  if (cacheIsValid) {
    return cachedResult;
  }
  
  // Calculate and cache
  const result = calculateResult();
  updateCache(result);
  return result;
}
```

### Request Caching

```tsx
/**
 * @pattern RequestCache
 * @rule MinimalNetworkRequests
 * Cache API requests to reduce network traffic
 */
// Cache fetch results
const cachedFetch = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};
```

## Rendering Optimization

### Conditional Rendering

```tsx
/**
 * @pattern ConditionalRender
 * @rule MinimalComponents
 * Only render components when needed
 */
// Only render expensive component when necessary
{shouldShowDetails && <ExpensiveDetailsComponent data={data} />}
```

### Deferred Rendering

```tsx
/**
 * @pattern DeferredRender
 * @rule PrioritizedUI
 * Defer non-critical UI rendering
 */
import { useEffect, useState } from 'react';

// Inside component
const [showSecondary, setShowSecondary] = useState(false);

useEffect(() => {
  // Defer rendering of non-critical UI
  const timer = setTimeout(() => setShowSecondary(true), 100);
  return () => clearTimeout(timer);
}, []);
```

## Validation Rules

- Components should use appropriate memoization techniques
- Lists with more than 20 items should use virtualization
- Large features should implement code splitting
- State selectors should be granular and memoized
- Images should be optimized and lazy-loaded
- Expensive calculations should be cached
- Non-critical UI should use deferred rendering 