# AI Decision Frameworks

## Purpose

This guide provides structured decision frameworks to help AI assistants make informed architectural and implementation decisions autonomously. By following these frameworks, AI can evaluate tradeoffs systematically and recommend appropriate solutions aligned with project requirements and best practices.

## How to Use These Frameworks

1. Identify which category of decision is needed
2. Follow the corresponding decision framework
3. Consider project-specific context gathered from the Self-Context Guide
4. Present a recommendation with clear reasoning based on the framework

## Component Architecture Decisions

### When to Choose Different Component Types

```
I'll evaluate which component architecture is most appropriate:

1. Simple Presentational Component
   CHOOSE WHEN:
   - The component only needs to render UI based on props
   - No internal state management is required
   - The component doesn't need lifecycle effects
   
2. Component with Hooks
   CHOOSE WHEN:
   - The component needs internal state management
   - The component needs to perform side effects
   - The logic is specific to this single component
   
3. Custom Hook + Presentational Component
   CHOOSE WHEN:
   - The logic might be reused across multiple components
   - There's complex state management
   - The component has significant side effects
   - Clear separation of logic and presentation is valuable
   
4. Higher-Order Component (HOC)
   CHOOSE WHEN:
   - The same behavior needs to be applied to many different components
   - The behavior doesn't depend on the component's internal implementation
   - The behavior involves cross-cutting concerns (e.g., authentication)
   
5. Compound Component Pattern
   CHOOSE WHEN:
   - There's a need for a flexible, composable API
   - Child components are tightly coupled with parent behavior
   - Users need to control the composition of inner elements
```

### Prop Design Decision Framework

```
I'll determine the optimal prop structure for this component:

1. Analyze Requirements:
   - What data does the component need to render?
   - What behaviors does the component need to support?
   - What customization options should be available?

2. Evaluate Prop Granularity:
   - ATOMIC PROPS (many individual props)
      CHOOSE WHEN:
      - There are few props (less than 7-10)
      - Most props have simple types
      - Most consumers will set different combinations of props
      
   - OBJECT PROPS (grouped in objects)
      CHOOSE WHEN:
      - There are many related props
      - Props are commonly used together
      - The component accepts data objects that already exist
      
   - HYBRID APPROACH
      CHOOSE WHEN:
      - Some props naturally group together, others don't
      - There's a mix of common and rare configuration options

3. Consider Prop Optionality:
   - Make props required only when they're truly essential
   - Provide sensible defaults for optional props
   - Use TypeScript to enforce required props

4. Evaluate Callback Patterns:
   - EVENT HANDLERS
      CHOOSE WHEN:
      - The component needs to notify parents of internal events
      
   - RENDER PROPS
      CHOOSE WHEN:
      - Parent needs fine-grained control over rendering
      - Component manages state/behavior but not appearance
```

## State Management Decisions

### When to Choose Different State Management Approaches

```
I'll determine the appropriate state management approach:

1. Local Component State (useState)
   CHOOSE WHEN:
   - State is only relevant to a single component
   - State doesn't need to be shared across unrelated components
   - State is simple (few properties, simple updates)
   
2. Lifted State (passing state and setters via props)
   CHOOSE WHEN:
   - State needs to be shared among a few related components
   - The component hierarchy is shallow
   - The state update patterns are simple
   
3. Context API
   CHOOSE WHEN:
   - State needs to be accessed by many components at different levels
   - Prop drilling would be cumbersome (>2 levels)
   - The state is specific to a feature or section
   - Updates are infrequent or affect limited parts of the tree
   
4. Redux/Zustand/Jotai
   CHOOSE WHEN:
   - State is application-wide
   - State has complex update patterns
   - You need time-travel debugging or persistence
   - Updates happen frequently and affect many components
   - You need middleware for side effects
   
5. Server State (React Query, SWR)
   CHOOSE WHEN:
   - State represents data from an API
   - Multiple components need the same data
   - You need caching, refetching, or optimistic updates
   - The data needs to be synchronized with a backend
```

### Context Design Decision Framework

```
I'll evaluate how to structure Context for this feature:

1. Scope Analysis:
   - What components need this state?
   - Is this state specific to a feature or application-wide?
   - How frequently will this state change?

2. Context Granularity:
   - SINGLE CONTEXT
      CHOOSE WHEN:
      - All state is related and changes together
      - Few components consume the context
      - Performance is not a critical concern
      
   - MULTIPLE CONTEXTS
      CHOOSE WHEN:
      - Different parts of state change at different rates
      - Different components need different subsets of state
      - Performance optimizations are needed
      
3. Context Value Structure:
   - COMBINED STATE AND ACTIONS
      CHOOSE WHEN:
      - The context has simple state and few actions
      - All consumers need both state and actions
      
   - SEPARATED STATE AND ACTIONS
      CHOOSE WHEN:
      - Some components only read state, others only use actions
      - You need to prevent unnecessary re-renders
      
4. Provider Implementation:
   - STATEFUL PROVIDER
      CHOOSE WHEN:
      - The context needs to manage its own state
      
   - PROXY PROVIDER
      CHOOSE WHEN:
      - The context needs to pass through state from elsewhere
```

## Data Fetching Decisions

### When to Choose Different Data Fetching Approaches

```
I'll determine the most appropriate data fetching approach:

1. Fetch in useEffect
   CHOOSE WHEN:
   - The fetching logic is very simple
   - The fetched data is only used in one component
   - There's no need for caching or advanced features
   
2. Custom Data Fetching Hook
   CHOOSE WHEN:
   - The fetching logic is reused across multiple components
   - You need consistent loading/error handling
   - The fetching logic is specific to your application
   
3. React Query / SWR
   CHOOSE WHEN:
   - You need caching, background updates, or refetching
   - The same data is used in multiple places
   - You need optimistic updates or mutation handling
   - You want automatic retries or request deduplication
   
4. GraphQL Client (Apollo, urql)
   CHOOSE WHEN:
   - Your API is GraphQL
   - You need fine-grained data requirements
   - You need advanced caching and normalization
   - You benefit from type generation from the schema
```

### Data Loading Pattern Decisions

```
I'll determine the appropriate loading pattern:

1. Loading State Indicators
   - GLOBAL SPINNER
      CHOOSE WHEN:
      - The entire page or section depends on the data
      - No partial content can be shown meaningfully
      
   - INLINE LOADING
      CHOOSE WHEN:
      - Only a specific component depends on the data
      - The loading affect is isolated to one section
      
   - SKELETON SCREENS
      CHOOSE WHEN:
      - You want to reduce perceived loading time
      - The layout is known before data arrives
      - You want to prevent layout shifts
      
2. Error Handling
   - INLINE ERROR
      CHOOSE WHEN:
      - The error affects only one component
      - The user can still use other parts of the page
      
   - PAGE-LEVEL ERROR
      CHOOSE WHEN:
      - The error makes the entire page unusable
      - There's no reasonable fallback content
      
   - RETRY MECHANISM
      CHOOSE WHEN:
      - The error might be temporary
      - User action might resolve the issue
      
3. Empty State Handling
   - EMPTY STATE VIEW
      CHOOSE WHEN:
      - No data exists but the user can create some
      - You want to guide the user to take action
      
   - FALLBACK CONTENT
      CHOOSE WHEN:
      - Some fallback or default data can be shown
```

## Form Implementation Decisions

### When to Choose Different Form Approaches

```
I'll determine the most appropriate form implementation:

1. Uncontrolled Components with useRef
   CHOOSE WHEN:
   - The form is simple with few fields
   - You only need the values on submission
   - Performance is a concern
   - No real-time validation is needed
   
2. Controlled Components with useState
   CHOOSE WHEN:
   - You need to react to input changes in real-time
   - The form is simple to moderately complex
   - You need field-level validation during typing
   
3. Form Library (Formik, React Hook Form)
   CHOOSE WHEN:
   - The form is complex with many fields
   - You need robust validation
   - You need complex dependencies between fields
   - You need form state management beyond values (touched, errors)
```

### Form Validation Decision Framework

```
I'll determine the appropriate validation approach:

1. Validation Timing:
   - ON SUBMIT
      CHOOSE WHEN:
      - You want to avoid interrupting the user
      - The form is primarily used by experienced users
      - Performance is a concern
      
   - ON BLUR
      CHOOSE WHEN:
      - You want to balance UX and immediate feedback
      - The form has complex validation rules
      
   - ON CHANGE
      CHOOSE WHEN:
      - Immediate feedback is important
      - The validation rules are simple
      - The validation doesn't create a performance issue
      
2. Validation Implementation:
   - CUSTOM VALIDATION
      CHOOSE WHEN:
      - Validation rules are simple
      - You have very specific validation needs
      
   - SCHEMA VALIDATION (Yup, Zod)
      CHOOSE WHEN:
      - You have complex validation rules
      - You want type safety with your validation
      - You need reusable validation across forms
```

## Performance Optimization Decisions

### When to Apply Different Optimizations

```
I'll determine which performance optimizations to apply:

1. Memoization (React.memo, useMemo, useCallback)
   APPLY WHEN:
   - The component renders frequently
   - The component has expensive rendering logic
   - The component receives complex props
   - The component has callbacks passed to child components
   - There are no premature optimization concerns
   
2. Virtualization
   APPLY WHEN:
   - Rendering large lists (>100 items)
   - Only a small subset of items is visible at once
   - Scrolling performance is a concern
   
3. Code Splitting
   APPLY WHEN:
   - The application has large bundles (>200KB)
   - Some features are only used by certain users
   - Some features are only used in certain situations
   
4. State Normalization
   APPLY WHEN:
   - You have deeply nested state
   - Multiple components update the same data
   - You need to avoid duplication in state
```

### Component Render Optimization Decision Framework

```
I'll determine which render optimization to apply:

1. Analyze Render Frequency:
   - How often does this component render?
   - What triggers the renders?
   - Are the renders necessary?

2. Evaluate Rendering Cost:
   - Is the component's render function computationally expensive?
   - Does it create many DOM elements?
   - Does it perform expensive calculations?

3. Choose Optimization Strategy:
   - REACT.MEMO
      APPLY WHEN:
      - Component renders frequently due to parent updates
      - Component props change infrequently
      - Component output depends only on props
      
   - USEMEMO
      APPLY WHEN:
      - Expensive calculations are performed during render
      - The calculations depend on specific dependencies
      - The result is used in the rendered output
      
   - USECALLBACK
      APPLY WHEN:
      - Functions are passed as props to memoized children
      - Event handlers don't need to close over the most recent state
      
   - COMPONENT SPLITTING
      APPLY WHEN:
      - Only part of the component needs to re-render frequently
      - The component can be divided into logical sub-components
```

## Error Handling Decisions

### When to Choose Different Error Handling Approaches

```
I'll determine the appropriate error handling approach:

1. try/catch Blocks
   CHOOSE WHEN:
   - Handling synchronous errors
   - Errors can be handled locally
   - You need specific error recovery logic
   
2. Promise Rejection Handling
   CHOOSE WHEN:
   - Handling asynchronous operations
   - You need specific error handling for specific operations
   
3. Error Boundaries
   CHOOSE WHEN:
   - You need to prevent the entire app from crashing
   - You want to isolate errors to specific components
   - You need fallback UI for failed component trees
   
4. Global Error Handling
   CHOOSE WHEN:
   - You need centralized error tracking
   - You want consistent error handling across the app
   - You need to log errors to a service
```

## Testing Strategy Decisions

### When to Choose Different Testing Approaches

```
I'll determine the appropriate testing strategy:

1. Unit Tests
   CHOOSE WHEN:
   - Testing isolated functions or utilities
   - Logic can be tested independently
   - You need high test coverage with fast tests
   
2. Component Tests
   CHOOSE WHEN:
   - Testing component rendering and behavior
   - Testing user interactions
   - You need to verify accessibility
   
3. Integration Tests
   CHOOSE WHEN:
   - Testing how multiple components work together
   - Testing feature workflows
   - You need to verify data flow between components
   
4. End-to-End Tests
   CHOOSE WHEN:
   - Testing complete user flows
   - Testing across multiple pages
   - You need to verify the entire application works together
```

## Implementation Example

Here's an example of how to apply these frameworks to make a decision:

```
SCENARIO: I need to implement a feature for managing a shopping cart in an e-commerce application.

DECISION FRAMEWORK: State Management Decision Framework

ANALYSIS:
1. Scope:
   - The cart needs to be accessible across multiple pages
   - Cart items need to persist between sessions
   - Multiple components need to read and update the cart

2. Complexity:
   - Cart requires multiple operations (add, remove, update quantity)
   - Cart needs to calculate totals and handle product availability
   - Cart state needs to be synchronized with a backend

3. Performance:
   - Cart updates need to be reflected immediately across the interface
   - Cart is updated frequently during shopping
   
4. Project Context:
   - The application already uses Context API for other features
   - The application doesn't use Redux or other global state management

RECOMMENDATION:
Based on the framework, I recommend using Context API with local storage persistence for the shopping cart because:

1. The cart state needs to be accessed by many components across different pages
2. The update patterns are moderately complex but manageable with Context
3. Context API aligns with the existing project patterns
4. Local storage can provide session persistence

I would structure this as:
- A CartContext providing cart state and operations
- A useCart hook for components to consume
- A CartProvider at the application root
- A cart service module to handle storage and backend synchronization
```

## Conclusion

These decision frameworks provide structured approaches for AI assistants to make informed architectural and implementation decisions. By following these frameworks and considering project-specific context, AIs can recommend solutions that are well-reasoned, appropriate to the situation, and aligned with best practices.

The decision process should be:
1. **Transparent** - Clearly explain the reasoning behind recommendations
2. **Contextual** - Consider project-specific patterns and requirements
3. **Balanced** - Weigh tradeoffs between different approaches
4. **Practical** - Focus on real-world implications rather than theoretical purity

When recommending a decision, the AI should:
1. Present the chosen approach
2. Explain why it was selected based on the framework
3. Highlight any potential drawbacks or alternatives
4. Provide a concrete implementation plan 