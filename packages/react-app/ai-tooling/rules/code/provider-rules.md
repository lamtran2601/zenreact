# Provider Rules

## Overview

These rules define standards for implementing provider components in React applications. They cover context creation, provider implementation, and context access patterns.

## Rule: ApplicationIntegration

Ensures providers are properly integrated into the application.

### Implementation

- Place providers at appropriate level in component tree
- Ensure proper nesting of providers
- Maintain clear provider hierarchy
- Handle provider dependencies

### Example

```tsx
/**
 * @pattern ProviderComponent
 * @rule ApplicationIntegration
 * Provider with proper application integration
 */
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PerformanceProvider>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </PerformanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
```

## Rule: ApplicationWideMonitoring

Implements consistent monitoring across the application.

### Implementation

- Collect relevant metrics for performance analysis
- Implement non-intrusive monitoring
- Provide access to monitoring data through context
- Handle monitoring errors gracefully

### Example

```tsx
/**
 * @pattern PerformanceProvider
 * @rule ApplicationWideMonitoring
 * Provider for application-wide performance monitoring
 */
export const PerformanceProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    interactionTime: 0,
    networkRequests: [],
  });

  // Setup monitoring
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      // Process and update metrics
      setMetrics((prev) => ({
        ...prev,
        renderTime: calculateRenderTime(entries),
      }));
    });
    
    observer.observe({ entryTypes: ['paint', 'resource', 'navigation'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <PerformanceContext.Provider value={{ metrics }}>
      {children}
    </PerformanceContext.Provider>
  );
};
```

## Rule: ContextAccess

Provides consistent patterns for accessing context.

### Implementation

- Create custom hooks for accessing context
- Validate context usage with error handling
- Provide type-safe context access
- Handle missing providers gracefully

### Example

```tsx
/**
 * @pattern ContextHook
 * @rule ContextAccess
 * Custom hook for accessing context with validation
 */
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  
  return context;
};
```

## Best Practices

1. **Error Boundaries**: Wrap providers with error boundaries to prevent cascading failures
2. **Minimal Context**: Keep context values focused and minimal
3. **Memoized Values**: Memoize context values to prevent unnecessary renders
4. **Testing Support**: Design providers to be easily mocked in tests
5. **Documentation**: Document provider purpose, dependencies, and usage patterns