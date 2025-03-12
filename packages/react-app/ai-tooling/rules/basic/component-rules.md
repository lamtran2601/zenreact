# Component Rules

## Structure Guidelines

- Components should follow a single responsibility principle
- Keep components under 150 lines of code
- Use TypeScript interfaces for props
- Implement error boundaries for feature components
- Include loading states for async operations
- Use named exports for all components

## Naming Conventions

- Use PascalCase for component names
- Use camelCase for props and variables
- Prefix boolean props with 'is', 'has', or 'should'
- Suffix event handlers with 'Handler'
- Use descriptive names that indicate purpose

## Performance Guidelines

- Memoize list items with React.memo
- Use useMemo for expensive calculations
- Implement useCallback for event handlers passed to children
- Avoid unnecessary re-renders
- Lazy load components when appropriate

## Accessibility Guidelines

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain proper color contrast
- Support screen readers

## Mobile Optimization

- Implement responsive design
- Use touch-friendly UI elements
- Optimize for various screen sizes
- Test on mobile devices
- Consider mobile performance 