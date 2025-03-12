# Performance Rules

## Overview

These rules define standards for ensuring optimal performance in React applications. They cover rendering optimization, state management efficiency, and resource utilization.

## Rule: EfficientRendering

Ensures components render efficiently with minimal wasted operations.

### Implementation

- Use virtualization for long lists
- Implement windowing for large data sets
- Optimize component tree depth
- Avoid unnecessary DOM mutations

### Example

```tsx
/**
 * @pattern ListComponent
 * @rule EfficientRendering
 * Efficiently rendered list with virtualization
 */
const MatchList = ({ matches }) => {
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

## Rule: PreventReRenders

Prevents unnecessary re-renders of components.

### Implementation

- Use React.memo for functional components
- Implement shouldComponentUpdate for class components
- Use useMemo for expensive calculations
- Optimize props with useCallback

### Example

```tsx
/**
 * @pattern CardComponent
 * @rule PreventReRenders
 * Memoized card component to prevent re-renders
 */
const MatchCard = React.memo(({ match, onSelect }) => {
  // Component implementation
  return (
    <div className="card">
      {/* Card content */}
    </div>
  );
});
```

## Rule: EfficientLoading

Ensures resources are loaded efficiently.

### Implementation

- Implement lazy loading for images
- Use code splitting for components
- Prioritize critical resources
- Defer non-critical loading

### Example

```tsx
/**
 * @pattern ImageComponent
 * @rule EfficientLoading
 * Lazy loaded image component
 */
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <>
      {!isLoaded && <div className="placeholder" />}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </>
  );
};
```

## Rule: StableReferences

Maintains stable references to prevent unnecessary renders.

### Implementation

- Use useCallback for event handlers
- Memoize complex objects with useMemo
- Avoid creating new objects in render
- Use stable identifiers for lists

### Example

```tsx
/**
 * @pattern FormComponent
 * @rule StableReferences
 * Form with stable references for handlers
 */
const BookingForm = () => {
  // Form state
  const [formData, setFormData] = useState({});
  
  // Stable reference for handler
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    // Submit logic
  }, [formData]);
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## Rule: ComputedValues

Efficiently computes and caches derived values.

### Implementation

- Use useMemo for computed values
- Implement selector pattern with memoization
- Avoid computing values in render
- Cache expensive calculations

### Example

```tsx
/**
 * @pattern DataDisplay
 * @rule ComputedValues
 * Component with memoized computed values
 */
const BookingSummary = ({ booking }) => {
  // Memoized computed value
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(booking);
  }, [booking]);
  
  return (
    <div>
      <p>Total: ${totalPrice}</p>
    </div>
  );
};
``` 