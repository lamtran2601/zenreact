# ZenReact Implementation Checklists

This document provides comprehensive checklists for AI assistants to verify that implementations meet ZenReact standards. Use these checklists during and after implementation to ensure consistency, best practices, and high quality code.

## Component Implementation Checklist

Use this checklist when implementing React components.

### Setup & Structure

- [ ] Component is properly classified (UI, Layout, Container, Page, or Compound)
- [ ] Component uses function declaration syntax (not arrow function)
- [ ] Component has proper naming (`PascalCase`)
- [ ] Component is exported correctly (named export preferred)
- [ ] Component file structure follows ZenReact conventions
- [ ] Component has a single responsibility

### Props Interface

- [ ] Props interface is defined with TypeScript
- [ ] Props interface has JSDoc comments for all props
- [ ] Optional props have default values
- [ ] Prop types are specific (no `any` type)
- [ ] Event handler props have proper TypeScript types
- [ ] Children prop is typed correctly (if used)
- [ ] Props are properly destructured in function signature
- [ ] Complex props have dedicated interfaces/types

### Internal Organization

- [ ] Hooks are declared at the beginning of the component
- [ ] Derived state calculations follow hook declarations
- [ ] Event handlers are implemented after derived state
- [ ] Effects (useEffect) are implemented after event handlers
- [ ] Return statement (JSX) comes last
- [ ] Complex JSX is broken into smaller, named sub-components
- [ ] Logic is separated from presentation when appropriate

### State Management

- [ ] State is categorized correctly (UI, Application, Server, Form)
- [ ] Appropriate state management approach is used
- [ ] State is kept as local as possible
- [ ] State updates are immutable
- [ ] Complex state logic is encapsulated in custom hooks
- [ ] `useCallback` is used for functions passed to child components
- [ ] `useMemo` is used for expensive computations
- [ ] Dependencies arrays are complete and accurate

### Error Handling

- [ ] Component handles error states gracefully
- [ ] Loading states are implemented when fetching data
- [ ] Empty states are handled appropriately
- [ ] Error boundaries are used where needed
- [ ] User feedback is provided for errors
- [ ] Proper fallbacks are provided for missing/undefined data

### Performance

- [ ] Component avoids unnecessary re-renders
- [ ] Lists use proper `key` props (not array index when items can change)
- [ ] Heavy calculations are memoized
- [ ] Large components are code-split when appropriate
- [ ] Images are optimized and have proper dimensions
- [ ] Component avoids layout thrashing

### Accessibility

- [ ] Semantic HTML elements are used
- [ ] ARIA attributes are added where necessary
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation is supported
- [ ] Focus management is implemented correctly
- [ ] Text alternatives are provided for non-text content
- [ ] Component is usable with screen readers

### Testing

- [ ] Component has unit tests
- [ ] Tests focus on user behavior, not implementation details
- [ ] All component states are tested
- [ ] Edge cases are covered in tests
- [ ] Accessibility is tested
- [ ] Test coverage meets minimum requirements (90%+)

### Documentation

- [ ] Component has JSDoc comments
- [ ] Props are documented
- [ ] Complex logic has explanatory comments
- [ ] Examples of usage are provided
- [ ] Performance considerations are noted
- [ ] Special behaviors are documented

## State Management Checklist

Use this checklist when implementing state management.

### State Classification & Structure

- [ ] State is properly categorized (UI, Application, Server, Form)
- [ ] State has a clearly defined interface
- [ ] State is normalized if it contains relational data
- [ ] State avoids duplication of data
- [ ] State structure follows ZenReact conventions

### State Technology Selection

- [ ] Appropriate state management technology is selected:
  - [ ] UI State: useState, useReducer, or Context API
  - [ ] Application State: Zustand or Context API
  - [ ] Server State: React Query or SWR
  - [ ] Form State: React Hook Form or useState

### State Implementation

- [ ] State is initialized with appropriate default values
- [ ] State updates follow immutable patterns
- [ ] Complex state logic is abstracted into dedicated functions
- [ ] Derived state is computed efficiently
- [ ] State is encapsulated when appropriate

### State Access & Updates

- [ ] State access is optimized (selectors, memoization)
- [ ] Updates are atomic and consistent
- [ ] Side effects are handled appropriately
- [ ] Optimistic updates are implemented when needed
- [ ] Actions/setters have clear, descriptive names

### Performance Considerations

- [ ] Selectors are memoized when beneficial
- [ ] Re-renders are minimized
- [ ] State updates are batched when possible
- [ ] Large state changes consider performance impact

### Error Handling

- [ ] Loading states are tracked
- [ ] Error states are captured and handled
- [ ] Retry mechanisms are implemented when appropriate
- [ ] Edge cases are handled (race conditions, etc.)

### Testing

- [ ] Initial state is tested
- [ ] State transitions are tested
- [ ] Selectors and derived state are tested
- [ ] Edge cases are tested
- [ ] Async state changes are tested

### Documentation

- [ ] State structure is documented
- [ ] Available actions/setters are documented
- [ ] Usage examples are provided
- [ ] Performance considerations are noted

## API Integration Checklist

Use this checklist when implementing API integrations.

### Setup

- [ ] API client is properly configured
- [ ] Authentication is handled correctly
- [ ] Base URL and endpoints are properly defined
- [ ] Request/response types are defined with TypeScript
- [ ] Error types are defined

### Data Fetching

- [ ] React Query or SWR is used for data fetching
- [ ] Queries have appropriate cache configuration
- [ ] Query keys are structured properly
- [ ] Stale time and cache time are configured appropriately
- [ ] Refetch strategies are defined (on window focus, etc.)

### Data Mutations

- [ ] Optimistic updates are implemented when appropriate
- [ ] Error handling for failed mutations is implemented
- [ ] Cache is updated correctly after mutations
- [ ] Loading state is handled during mutations
- [ ] Success/error feedback is provided to the user

### Error Handling

- [ ] API errors are caught and handled
- [ ] Network errors are handled
- [ ] Timeout handling is implemented
- [ ] Retry logic is configured
- [ ] User feedback is provided for errors

### Performance

- [ ] Requests are properly cached
- [ ] Unnecessary requests are avoided
- [ ] Pagination or infinite scrolling is implemented for large datasets
- [ ] Data is transformed efficiently

### Testing

- [ ] Mock server (MSW) is set up for tests
- [ ] Success responses are tested
- [ ] Error responses are tested
- [ ] Loading states are tested
- [ ] Edge cases are tested (race conditions, etc.)

## Form Implementation Checklist

Use this checklist when implementing forms.

### Setup

- [ ] React Hook Form is used for complex forms
- [ ] Form fields have proper validation
- [ ] Form state is typed with TypeScript
- [ ] Default values are provided

### Validation

- [ ] Field-level validation is implemented
- [ ] Form-level validation is implemented when needed
- [ ] Error messages are clear and helpful
- [ ] Required fields are marked
- [ ] Validation triggered at appropriate times

### User Experience

- [ ] Form feedback is immediate and clear
- [ ] Loading states are handled during submission
- [ ] Success feedback is provided
- [ ] Error feedback is provided
- [ ] Form is accessible (keyboard navigation, screen readers)

### Performance

- [ ] Re-renders are minimized
- [ ] Validation is performed efficiently
- [ ] Large forms are optimized

### Testing

- [ ] Form submission is tested
- [ ] Validation is tested
- [ ] Error states are tested
- [ ] Success states are tested
- [ ] Accessibility is tested

## Accessibility Checklist

Use this checklist to ensure implementations are accessible.

### Semantic HTML

- [ ] Proper HTML elements are used for their intended purpose
- [ ] Heading hierarchy is logical (h1, h2, etc.)
- [ ] Landmarks are used appropriately (main, nav, etc.)
- [ ] Lists are used for list content

### Keyboard Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical
- [ ] Focus styles are visible
- [ ] Custom components handle keyboard events appropriately
- [ ] No keyboard traps exist

### Screen Reader Support

- [ ] Alternative text is provided for images
- [ ] ARIA labels are used where needed
- [ ] ARIA roles are applied correctly
- [ ] Live regions are used for dynamic content
- [ ] Screen reader announcements are implemented for important changes

### Visual Design

- [ ] Color is not the only means of conveying information
- [ ] Text color has sufficient contrast against background
- [ ] Text is resizable without breaking layout
- [ ] Content is visible at 200% zoom
- [ ] Animations can be disabled (prefers-reduced-motion)

### Forms

- [ ] Form controls have associated labels
- [ ] Form validation errors are associated with fields
- [ ] Required fields are clearly indicated
- [ ] Error messages are clear and helpful
- [ ] Form is navigable with keyboard

## TypeScript Best Practices Checklist

Use this checklist to ensure TypeScript implementation meets standards.

### Type Definitions

- [ ] Custom types/interfaces are defined for complex data structures
- [ ] Enums are used for sets of related constants
- [ ] Union types are used for variables with multiple possible types
- [ ] Intersection types are used to combine types
- [ ] Generic types are used when appropriate
- [ ] Type aliases are used for complex types that are reused

### Type Safety

- [ ] No `any` type is used (except when absolutely necessary)
- [ ] Non-null assertions (`!`) are avoided when possible
- [ ] Type assertions (`as`) are minimized
- [ ] Optional chaining is used for potentially undefined values
- [ ] Nullish coalescing is used for default values
- [ ] Type guards are used to narrow types

### Type Organization

- [ ] Related types are grouped in the same file
- [ ] Common types are in shared type files
- [ ] Component prop types are defined in the component file
- [ ] Redux/Zustand state types are defined in the store file

### Documentation

- [ ] Complex types have JSDoc comments
- [ ] Generic types have parameter comments
- [ ] Utility types have usage examples

## Performance Checklist

Use this checklist to ensure implementations are performant.

### Rendering Optimization

- [ ] Components are memoized when beneficial (React.memo)
- [ ] Event handlers are memoized (useCallback)
- [ ] Expensive calculations are memoized (useMemo)
- [ ] Lists use virtualization for large datasets
- [ ] Re-renders are minimized
- [ ] Key props are used correctly in lists

### Code Optimization

- [ ] Code splitting is used for large components/routes
- [ ] Tree shaking is facilitated by proper imports/exports
- [ ] Dead code is eliminated
- [ ] Loops and recursion are optimized
- [ ] Unnecessary calculations are avoided

### Asset Optimization

- [ ] Images are appropriately sized and compressed
- [ ] Modern image formats are used (WebP, AVIF)
- [ ] Fonts are optimized and use display swap
- [ ] SVGs are optimized
- [ ] CSS is minimal and efficient

### Network Optimization

- [ ] API requests are minimized
- [ ] Data is cached appropriately
- [ ] Unnecessary data fetching is avoided
- [ ] Prefetching is used when appropriate
- [ ] Critical resources are preloaded

## Documentation Checklist

Use this checklist to ensure proper documentation.

### Code Documentation

- [ ] All components have JSDoc comments
- [ ] All functions have JSDoc comments
- [ ] All props have descriptions
- [ ] Complex logic has explanatory comments
- [ ] Magic numbers/strings have explanatory comments

### Usage Documentation

- [ ] Components have usage examples
- [ ] Props have example values
- [ ] Edge cases are documented
- [ ] Performance considerations are noted
- [ ] Accessibility features are documented

### Project Documentation

- [ ] README is comprehensive
- [ ] Setup instructions are clear
- [ ] Project structure is documented
- [ ] Coding standards are referenced
- [ ] Contribution guidelines are provided

## Using the Checklists

AI assistants should use these checklists in the following ways:

1. **Before Implementation**: Review relevant checklists to understand requirements
2. **During Implementation**: Refer to checklists to ensure standards are being followed
3. **After Implementation**: Verify implementation against applicable checklists
4. **When Reviewing Code**: Use checklists as a guide for feedback
5. **When Refactoring**: Identify areas of improvement based on checklists

Adapt these checklists to the specific requirements of each project. Not all items will apply to every implementation, and additional project-specific requirements may need to be added.

For maximum effectiveness, AI assistants should maintain an ongoing reference to relevant checklists throughout the development process, rather than treating them as a one-time verification step. 