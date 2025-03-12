# State Management Rules

## Zustand Guidelines

- Create separate stores for different domains
- Use TypeScript for type safety
- Implement selectors for derived state
- Keep actions and state in the same store
- Use middleware for persistence when needed

## State Organization

- Normalize complex state objects
- Use slices for different state domains
- Keep state minimal and focused
- Avoid redundant state
- Use computed values when possible

## Performance Considerations

- Avoid unnecessary state updates
- Use selectors to prevent re-renders
- Implement shallow equality checks
- Batch state updates when possible
- Profile state changes for performance

## Persistence Strategy

- Use localStorage for user preferences
- Implement session storage for temporary data
- Clear sensitive data on logout
- Handle storage errors gracefully
- Implement version migration for stored data

## Offline Support

- Cache essential data for offline use
- Implement optimistic updates
- Handle synchronization conflicts
- Provide clear offline indicators
- Gracefully degrade functionality 