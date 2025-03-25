# ZenReact AI-Human Collaboration Examples

This document provides practical examples of effective collaboration between AI assistants and human developers in ZenReact projects. These examples demonstrate how to apply ZenReact documentation to real-world development scenarios.

## Example 1: Creating a New UI Component

### User Request

```
"I need a dropdown menu component that supports multi-selection, search functionality, and can handle large datasets efficiently."
```

### Effective AI Assistant Response

```
I'll help you create a multi-select dropdown with search and virtualization for handling large datasets. First, let me gather some context.

Based on ZenReact standards, this would be classified as a UI Component with potential compound component patterns for the complex interaction model.

Questions to clarify requirements:
1. Will this be a shared component in your UI library or specific to a feature?
2. Do you need keyboard navigation support?
3. What should happen when items are selected? (Do you need callbacks, form integration?)
4. Do you have specific design requirements or should I follow your existing design system?

For implementation, I recommend:
- Using React's Context API for internal state management between subcomponents
- Virtualized list using react-window for performance with large datasets
- Controlled component pattern with clear prop interface
- Comprehensive keyboard accessibility

Here's how I'd structure this component:
1. A main MultiSelect component as the container
2. SubComponents for: Trigger, SearchInput, Menu, Option, SelectedList
3. A custom hook for internal state management
4. Comprehensive test suite for all interactions
```

### What Makes This Effective

- The AI immediately classifies the component according to ZenReact standards
- Asks clarifying questions based on the Context Questionnaire
- Proposes a solution based on Component Rules
- Outlines a clear structure following ZenReact patterns
- Considers performance, accessibility, and testing upfront

## Example 2: Implementing State Management

### User Request

```
"I need to implement state management for a shopping cart in my e-commerce app."
```

### Effective AI Assistant Response

```
I'll help you implement state management for your shopping cart. Let me reference the ZenReact State Rules to ensure we follow best practices.

Based on ZenReact standards, shopping cart data would be classified as Application State since it's business data that needs to be accessible across multiple components.

Questions to clarify requirements:
1. Does the cart need to persist across page refreshes?
2. Will users be able to modify quantities, remove items, etc.?
3. Do you need to integrate with a backend API for cart operations?
4. Are there performance concerns with large carts or frequent updates?

For implementation, I recommend using Zustand since:
- Shopping cart is application-wide state
- It needs to be accessible from multiple components
- We'll need multiple actions and selectors
- Zustand provides simple persistence options for local storage

Here's how I would structure the store:
1. Clear interface for CartState and CartItem
2. Normalized data structure for cart items
3. Immutable update patterns for all actions
4. Memoized selectors for derived data (totals, item counts)
5. Integration with local storage for persistence
6. Loading/error states for API operations

Would you like me to implement this approach?
```

### What Makes This Effective

- The AI references specific ZenReact documentation (State Rules)
- Categorizes the state correctly as Application State
- Asks targeted questions from the Context Questionnaire
- Recommends the appropriate technology (Zustand) based on State Rules
- Outlines a structured implementation plan following ZenReact patterns
- Considers advanced concerns like normalization, persistence, and performance

## Example 3: Debugging a Performance Issue

### User Request

```
"Our product listing page is rendering slowly, especially when filtering or sorting products."
```

### Effective AI Assistant Response

```
I'll help you diagnose and fix the performance issue on your product listing page. Let me approach this systematically based on ZenReact performance guidelines.

To properly diagnose this, I need to understand:
1. How many products are typically displayed at once?
2. What's the current component structure of your product listing page?
3. How are you managing state for filtering and sorting?
4. Are you fetching data on each filter/sort action or working with local data?

Common causes of slow rendering in list pages include:
1. Missing virtualization for long lists (React Window or React Virtualized recommended)
2. Unnecessary re-renders (component memoization issues)
3. Inefficient state management triggers full re-renders
4. Heavy computations during rendering
5. Inefficient sorting/filtering algorithms

I recommend examining:
1. Component re-render patterns with React DevTools
2. Memoization of list items with React.memo
3. Moving sort/filter logic out of render with useMemo
4. Use useCallback for event handlers
5. Consider implementing windowing if list is large
6. Evaluate if server-side sorting/filtering would be more efficient

Would you like me to review specific code to identify the exact issues?
```

### What Makes This Effective

- The AI takes a systematic approach to performance debugging
- Asks targeted questions to gather context
- Lists common causes based on ZenReact performance guidelines
- Proposes a structured investigation strategy
- Offers specific recommendations based on best practices
- Offers to review code for deeper analysis

## Example 4: Implementing a Feature with Multiple Components

### User Request

```
"We need to add a user profile section where users can view and edit their information, change their password, and manage notification preferences."
```

### Effective AI Assistant Response

```
I'll help you implement the user profile feature. Let me plan this using ZenReact architecture patterns.

This feature will require multiple components with different responsibilities. Based on ZenReact Component Rules, I'd structure it as follows:

1. **Page Component**: UserProfilePage (route-level component)
2. **Container Components**:
   - UserInfoContainer (fetches and updates user data)
   - PasswordContainer (handles password changes)
   - NotificationContainer (manages notification preferences)
3. **UI Components**:
   - UserInfoForm (presentation for user data editing)
   - PasswordChangeForm (presentation for password changes)
   - NotificationPreferencesList (displays notification options)
   - ProfileTabs (navigation between sections)

For state management, following ZenReact State Rules:
1. **Server State**: User data and notification preferences using React Query
2. **Form State**: Form handling with React Hook Form
3. **UI State**: Active tab tracking with local useState

Would you like me to:
1. Create the component hierarchy and file structure?
2. Implement a specific component first?
3. Set up the state management approach?
4. Focus on something else in this feature?
```

### What Makes This Effective

- The AI divides the feature into a logical component hierarchy following ZenReact Component Classification
- Distinguishes between presentation and container components per best practices
- Outlines appropriate state management for different data types
- Presents clear next steps for implementation
- Gives the user control over implementation priorities

## Example 5: Refactoring Existing Code

### User Request

```
"Our authentication flow is a mess. We have logic spread across multiple components, some using Redux, some using Context API, and some with local state. It's hard to maintain and has bugs."
```

### Effective AI Assistant Response

```
I'll help you refactor your authentication flow to be more maintainable and consistent with ZenReact standards. First, let's develop a clear plan.

Based on ZenReact Architecture and State Rules, authentication is typically best handled as Application State with a consistent approach.

Here's what I recommend:
1. First, I'll help you audit the current implementation to understand:
   - Where authentication logic lives currently
   - What features the authentication system needs to support
   - What API endpoints are being used
   - What parts are causing bugs

2. Then, create a centralized authentication solution using Zustand (preferred in ZenReact for application state):
   - Single source of truth for auth state
   - Clear actions for login, logout, register, password reset
   - Proper loading and error states
   - Persistence strategy for tokens
   - Type-safe interfaces

3. Create a migration plan:
   - Implement the new auth store
   - Create a custom hook for components to consume
   - Gradually replace Redux and Context implementations
   - Add comprehensive tests
   - Document the new approach

Would you like me to start by examining your current authentication implementation to develop a more detailed plan?
```

### What Makes This Effective

- The AI acknowledges the complexity of refactoring existing code
- References ZenReact standards for authentication state management
- Proposes a systematic approach: audit, design, migrate
- Outlines a solution based on ZenReact State Rules
- Offers a gradual migration strategy rather than a complete rewrite
- Includes testing and documentation in the plan

## Example 6: Setting Up Testing Infrastructure

### User Request

```
"We need to set up testing for our React application. We don't have any tests yet."
```

### Effective AI Assistant Response

```
I'll help you set up a comprehensive testing infrastructure following ZenReact Testing Strategy. Let's approach this systematically.

Based on ZenReact standards, you'll need several types of tests:
1. **Unit tests** for utility functions
2. **Component tests** for UI components
3. **Hook tests** for custom hooks
4. **Integration tests** for feature workflows
5. **API mock tests** for data fetching

Here's what I recommend:

1. **Testing libraries setup**:
   - Jest as the test runner
   - React Testing Library for component testing
   - MSW (Mock Service Worker) for API mocking
   - Jest-axe for accessibility testing
   - React Hooks Testing Library for hook testing

2. **Testing file structure**:
   - Co-locate tests with components (`Component.tsx`, `Component.test.tsx`)
   - `__tests__` directories for utilities and hooks
   - Separate directory for fixtures and test helpers

3. **Test implementation order**:
   1. Set up the basic infrastructure first
   2. Create test helpers and fixtures
   3. Start with critical UI components
   4. Add tests for hooks and utilities
   5. Implement integration tests for key workflows

Would you like me to:
1. Generate a setup for your testing infrastructure?
2. Create example tests for different types of components?
3. Recommend a testing strategy for a specific part of your application?
```

### What Makes This Effective

- The AI references the ZenReact Testing Strategy document
- Outlines a comprehensive testing approach covering all required areas
- Recommends specific tools aligned with ZenReact standards
- Suggests a logical file structure and implementation order
- Offers clear next steps for the user to choose from

## Example 7: Implementing Accessibility Improvements

### User Request

```
"Our application needs to be more accessible. Can you help us improve our components?"
```

### Effective AI Assistant Response

```
I'll help you enhance the accessibility of your application following ZenReact Accessibility Guidelines. Let's approach this systematically.

To provide targeted recommendations, I need to understand:
1. What kinds of components need accessibility improvements?
2. Do you have specific WCAG compliance targets (A, AA, AAA)?
3. Have you received specific feedback from users or audits?
4. Are there particular interaction patterns causing issues?

Based on ZenReact standards, here's a methodical approach:

1. **Audit current components**:
   - Check semantic HTML usage
   - Verify keyboard navigation flows
   - Evaluate ARIA attribute usage
   - Test with screen readers
   - Check color contrast ratios

2. **Prioritized improvements**:
   - Fix critical issues blocking usage first
   - Enhance navigation and focus management
   - Improve form labeling and validation errors
   - Add appropriate ARIA attributes
   - Implement missing keyboard shortcuts

3. **Implementation strategy**:
   - Create reusable accessible patterns
   - Develop accessibility utility hooks
   - Document accessibility features
   - Add accessibility tests

Would you like me to:
1. Help audit specific components?
2. Implement improvements to a particular component?
3. Create an accessibility checklist tailored to your application?
4. Develop reusable accessible patterns?
```

### What Makes This Effective

- The AI references ZenReact Accessibility Guidelines
- Asks targeted questions to understand specific accessibility needs
- Proposes a systematic audit approach
- Outlines a prioritization strategy for improvements
- Offers specific implementation strategies
- Provides clear options for next steps

## Example 8: Code Review and Improvement

### User Request

```
"Can you review this component and suggest improvements?"

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);
  
  const addToCart = () => {
    // Add to cart logic
    setIsInCart(true);
  };
  
  return (
    <div className="product-card">
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={addToCart}>
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

### Effective AI Assistant Response

```
I've reviewed your ProductCard component and have several suggestions based on ZenReact Component Rules and Coding Standards.

### Current strengths:
- Simple, focused component with a clear purpose
- Logical state management for cart status

### Improvement recommendations:

1. **TypeScript and Props Interface** (Component Rule 3.1):
```typescript
interface Product {
  id: string;
  name: string;
  price: number | string;
  image: string;
}

interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Called when user adds product to cart */
  onAddToCart?: (productId: string) => void;
  /** Whether the product is already in the cart */
  isInCart?: boolean;
}
```

2. **Function Declaration** (Coding Standard 2.4):
```typescript
export function ProductCard({ product, onAddToCart, isInCart = false }: ProductCardProps): JSX.Element {
```

3. **Controlled Component Pattern** (State Rule 1.3):
   - Move cart state management to parent
   - Use props for state and callbacks for updates
   
4. **Accessibility Improvements** (Accessibility Guidelines):
   - Add alt text to image
   - Use proper semantic structure
   - Ensure button is accessible

5. **Error Handling** (Error Handling Guidelines):
   - Add fallbacks for missing data
   - Handle image loading errors

Here's a revised implementation incorporating these improvements:

```typescript
interface Product {
  id: string;
  name: string;
  price: number | string;
  image: string;
  description?: string;
}

interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Called when user adds product to cart */
  onAddToCart?: (productId: string) => void;
  /** Whether the product is already in the cart */
  isInCart?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  isInCart = false,
  className = '' 
}: ProductCardProps): JSX.Element {
  // Error handling for required fields
  if (!product) {
    return <div className="product-card-error">Product data missing</div>;
  }
  
  const handleAddToCart = (): void => {
    onAddToCart?.(product.id);
  };
  
  // Format price for display
  const formattedPrice = typeof product.price === 'number' 
    ? `$${product.price.toFixed(2)}` 
    : product.price;
  
  return (
    <article className={`product-card ${className}`}>
      <img 
        src={product.image} 
        alt={`Product: ${product.name}`} 
        onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }} 
      />
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      <p className="product-description">{product.description}</p>
      <button 
        onClick={handleAddToCart}
        aria-pressed={isInCart}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </article>
  );
}
```

Would you like me to explain any of these improvements in more detail?
```

### What Makes This Effective

- The AI analyzes the component based on ZenReact standards
- Acknowledges existing strengths before suggesting improvements
- Organizes recommendations by category with references to specific rules
- Provides a complete, improved implementation
- Explains the reasoning behind each change
- Offers to elaborate further if needed

## Example 9: Guiding Technical Decisions

### User Request

```
"We're building a form-heavy application. What's the best approach for form management in ZenReact?"
```

### Effective AI Assistant Response

```
Based on ZenReact State Rules, form state is a specific category with its own recommendations. Let me guide you through the options for your form-heavy application.

For form management, ZenReact recommends **React Hook Form** as the primary solution for complex forms, with simpler approaches for basic forms.

Here's a decision framework based on form complexity:

### Simple Forms (1-3 fields, minimal validation)
- Use **useState** or **useReducer** directly
- Handle validation manually
- Good for login forms, simple filters, etc.

```tsx
function SimpleForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Medium Complexity Forms (4-10 fields, standard validation)
- Use **React Hook Form** with basic validation
- Leverage built-in validation and error handling
- Good for registration forms, profile editing, etc.

```tsx
import { useForm } from 'react-hook-form';

function MediumForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    // Form submission
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
      {errors.email && <span>Invalid email</span>}
      {/* Other fields */}
    </form>
  );
}
```

### Complex Forms (Many fields, complex validation, wizards)
- Use **React Hook Form** with advanced features:
  - Form arrays for repeatable sections
  - Form context for nested components
  - Yup or Zod for schema validation
  - Custom validation logic
- Good for multi-step forms, dynamic forms, etc.

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Example with schema validation and sub-components
function ComplexForm() {
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { /* ... */ }
  });
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Step1Fields />
        <Step2Fields />
        {/* Submit button */}
      </form>
    </FormProvider>
  );
}
```

For your form-heavy application, I recommend:
1. Standardizing on React Hook Form for consistency
2. Creating reusable form field components
3. Setting up centralized validation schemas
4. Implementing form state persistence for multi-step forms
5. Building a standardized error handling system

Would you like a more detailed implementation plan for any of these approaches?
```

### What Makes This Effective

- The AI references specific ZenReact documentation (State Rules)
- Provides a decision framework based on complexity
- Offers code examples for each approach
- Tailors recommendations to the user's specific need (form-heavy application)
- Suggests a comprehensive strategy with standardization
- Offers to provide more detailed guidance

## Example 10: Implementing Error Handling

### User Request

```
"How should we handle errors in our React application?"
```

### Effective AI Assistant Response

```
ZenReact has specific guidelines for error handling across different levels of your application. Let me outline a comprehensive error handling strategy based on these standards.

### 1. Component-Level Error Handling

ZenReact recommends implementing **Error Boundaries** for catching rendering errors:

```tsx
// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to monitoring service
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. API/Async Error Handling

For API requests, ZenReact recommends consistent error handling with React Query:

```tsx
// Using React Query for API error handling
import { useQuery } from 'react-query';

function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading, isError } = useQuery(
    ['user', userId],
    () => fetchUser(userId),
    {
      retry: 2,
      onError: (err) => {
        // Log to monitoring service
        logError(err);
      }
    }
  );

  if (isLoading) return <Loading />;
  
  if (isError) {
    return (
      <ErrorDisplay 
        message="Unable to load user profile"
        error={error}
        retry={() => refetch()}
      />
    );
  }

  return <UserProfileDisplay user={data} />;
}
```

### 3. Form Validation Errors

For form errors, follow ZenReact State Rules with React Hook Form:

```tsx
// Form error handling with React Hook Form
import { useForm } from 'react-hook-form';

function SignupForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await createUser(data);
    } catch (error) {
      // Handle server validation errors
      if (error.response?.data?.fieldErrors) {
        error.response.data.fieldErrors.forEach(({ field, message }) => {
          setError(field, { type: 'server', message });
        });
      } else {
        // Handle general submission error
        setSubmitError(error.message || 'Failed to create account');
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with error displays */}
    </form>
  );
}
```

### 4. Global Error Handling

For unhandled errors, ZenReact recommends a global handler:

```tsx
// In your application entry point
window.addEventListener('error', (event) => {
  // Log to monitoring service
  logGlobalError(event.error);
  
  // Show user-friendly notification
  notifyUser('An unexpected error occurred');
});

// For unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  logGlobalError(event.reason);
  notifyUser('An unexpected error occurred');
});
```

### 5. Centralized Error UI Components

ZenReact recommends building a consistent set of error UI components:

1. **ErrorDisplay**: For showing error messages with retry options
2. **FormFieldError**: For consistent form validation errors
3. **EmptyState**: For handling empty data states
4. **OfflineIndicator**: For connectivity issues

Would you like me to implement any of these specific error handling strategies for your application?
```

### What Makes This Effective

- The AI provides a comprehensive approach to error handling
- References specific ZenReact standards
- Covers different levels of error handling (component, API, form, global)
- Provides code examples for each strategy
- Suggests reusable error components for consistency
- Offers to implement specific strategies

## Guidelines for Effective Collaboration

Based on these examples, here are key guidelines for effective AI-human collaboration in ZenReact projects:

1. **Reference Specific Documentation**
   - Always cite relevant ZenReact documentation
   - Connect recommendations to specific rules and standards

2. **Ask Targeted Questions**
   - Use the Context Questionnaire to gather essential information
   - Ask specific questions that clarify requirements

3. **Provide Structured Responses**
   - Organize information logically
   - Use clear sections and formatting
   - Include code examples when relevant

4. **Offer Implementation Plans**
   - Outline a step-by-step approach
   - Break complex tasks into manageable pieces
   - Prioritize implementation steps

5. **Present Options**
   - Give users choices when multiple approaches are valid
   - Explain tradeoffs between different solutions
   - Allow users to direct the collaboration

6. **Explain Reasoning**
   - Clarify why specific approaches are recommended
   - Connect recommendations to broader best practices
   - Help users understand the benefits of suggested approaches

7. **Be Adaptable**
   - Adjust recommendations based on user feedback
   - Balance ideal patterns with practical constraints
   - Recognize that standards are guidelines, not rigid rules

By following these guidelines, AI assistants can provide valuable, consistent help that aligns with ZenReact standards while adapting to specific project needs. 