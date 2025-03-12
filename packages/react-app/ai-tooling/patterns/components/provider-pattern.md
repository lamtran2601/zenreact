# Provider Component Pattern

## Overview

The Provider Component pattern establishes a structured approach to creating context providers in React applications. It ensures consistent context creation, provider implementation, and hook usage across the application.

## Pattern: PerformanceProvider

```tsx
/**
 * @pattern PerformanceProvider
 * @rule ApplicationWideMonitoring
 * Provider for application-wide performance monitoring
 */
export const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<ProviderProps> = ({ children }) => {
  // Provider state and logic
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    interactionTime: 0,
  });

  // Performance monitoring logic
  useEffect(() => {
    // Initialize performance monitoring
  }, []);

  return (
    <PerformanceContext.Provider value={{ metrics }}>
      {children}
    </PerformanceContext.Provider>
  );
};
```

## Pattern: ProviderComponent

```tsx
/**
 * @pattern ProviderComponent
 * @rule ApplicationIntegration
 * Reusable provider component pattern
 */
export const SomeProvider: React.FC<ProviderProps> = ({ children, initialState }) => {
  // Provider state and logic
  const [state, setState] = useState(initialState);

  // Provider methods
  const updateState = useCallback((newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  // Context value with memoization
  const value = useMemo(() => ({
    state,
    updateState,
  }), [state, updateState]);

  return (
    <SomeContext.Provider value={value}>
      {children}
    </SomeContext.Provider>
  );
};
```

## Pattern: ContextHook

```tsx
/**
 * @pattern ContextHook
 * @rule ContextAccess
 * Custom hook for accessing context
 */
export const usePerformance = (): PerformanceContextType => {
  const context = useContext(PerformanceContext);
  
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  
  return context;
};
```

## Key Characteristics

1. **Context Creation**: Clear context creation with proper typing
2. **Provider Implementation**: Consistent provider component structure
3. **Hook Access**: Custom hooks for accessing context
4. **Error Handling**: Proper error handling for context usage
5. **Memoization**: Performance optimization through memoization

## Implementation Rules

### ApplicationIntegration

- Integrate provider at appropriate level in component tree
- Ensure provider works with other providers
- Maintain clear provider hierarchy

### ApplicationWideMonitoring

- Implement consistent monitoring across the application
- Collect relevant metrics for performance analysis
- Provide access to monitoring data through context

### ContextAccess

- Create custom hooks for accessing context
- Validate context usage with error handling
- Provide type-safe context access

## Best Practices

1. **Minimal Context**: Keep context values focused and minimal
2. **Memoized Values**: Memoize context values to prevent unnecessary renders
3. **Clear Hierarchy**: Maintain clear provider hierarchy
4. **Error Boundaries**: Use error boundaries with context providers
5. **Testing Support**: Design providers to be easily mocked in tests 