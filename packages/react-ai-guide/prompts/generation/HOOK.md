# Custom Hook Generation Prompts

This document provides optimized prompts for generating React custom hooks using AI assistants like Cursor. These prompts are designed to produce high-quality, reusable hooks that follow best practices.

## Basic Hook Prompt

Use this prompt for generating simple React hooks:

```
Generate a React custom hook named {{hookName}} that {{description}}.

Requirements:
- Handle {{specific functionality}}
- Return {{return values}}
- Include TypeScript types
- Follow React hooks best practices
- Include appropriate cleanup when needed

Additional details:
{{any additional requirements}}
```

### Example:

```
Generate a React custom hook named useLocalStorage that provides persistent state using browser's localStorage.

Requirements:
- Handle reading and writing to localStorage
- Return a value and setter function similar to useState
- Include TypeScript types with generics for type safety
- Follow React hooks best practices
- Include appropriate cleanup when needed

Additional details:
- Handle JSON serialization/deserialization
- Account for storage unavailability
- Support all primitive and object types
- Synchronize state across multiple components using the same key
```

## Pattern-Based Hook Prompt

Use this prompt when implementing specific patterns from the pattern library:

```
Generate a React custom hook named {{hookName}} following the "{{PatternName}}" pattern from our pattern library.

Pattern key requirements:
{{list key pattern requirements}}

Hook specifications:
- {{hook-specific requirements}}
- Support TypeScript with appropriate typing
- Include proper error handling
- Follow React hooks best practices
- Add JSDoc comments

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React custom hook named useDataFetching following the "Data Fetching Hook" pattern from our pattern library.

Pattern key requirements:
- Manage loading, error, and data states
- Handle request cancellation on unmount
- Support refetching data
- Provide appropriate return values

Hook specifications:
- Accept a URL and options parameter
- Support GET, POST, PUT, DELETE methods
- Support TypeScript with appropriate typing
- Include proper error handling
- Follow React hooks best practices
- Add JSDoc comments

Additional details:
- Implement request caching
- Support query parameters
- Include pagination helpers
- Have optional polling functionality
```

## State Management Hook Prompt

Use this prompt for generating state management hooks:

```
Generate a React custom hook named {{hookName}} for managing {{type of state}}.

State requirements:
- Store {{describe state structure}}
- Handle the following actions: {{list actions}}
- Persist state through {{persistence mechanism}}
- Support the following derived values: {{derived values}}

Implementation requirements:
- Use {{useState/useReducer/another approach}}
- Include TypeScript interfaces
- Follow React hooks best practices
- Handle side effects properly
- Implement proper cleanup

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React custom hook named useShoppingCart for managing a shopping cart state.

State requirements:
- Store cart items with product ID, quantity, and price
- Handle the following actions: add item, remove item, update quantity, clear cart
- Persist state through localStorage
- Support the following derived values: total items, subtotal, tax, total price

Implementation requirements:
- Use useReducer for complex state updates
- Include TypeScript interfaces for all state and actions
- Follow React hooks best practices
- Handle side effects properly
- Implement proper cleanup

Additional details:
- Support product variants
- Include quantity limits based on available stock
- Implement debounced persistence to localStorage
- Support promo code application
```

## Effect Hook Prompt

Use this prompt for generating hooks that handle side effects:

```
Generate a React custom hook named {{hookName}} that manages side effects for {{description}}.

Effect requirements:
- Trigger when {{trigger conditions}}
- Perform the following operations: {{operations}}
- Clean up by {{cleanup operations}}
- Handle the following edge cases: {{edge cases}}

Implementation requirements:
- Use appropriate dependency arrays
- Include TypeScript types
- Handle errors gracefully
- Follow React hooks best practices
- Document dependencies clearly

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React custom hook named useDocumentTitle that manages side effects for updating the document title.

Effect requirements:
- Trigger when the title prop changes
- Perform the following operations: update document.title
- Clean up by restoring the original title on unmount
- Handle the following edge cases: server-side rendering, title is undefined

Implementation requirements:
- Use appropriate dependency arrays
- Include TypeScript types
- Handle errors gracefully
- Follow React hooks best practices
- Document dependencies clearly

Additional details:
- Support title template with variables
- Add option to append site name
- Include prefix option for indicating states (e.g., "(Loading) Page Title")
- Support title history for back button integration
```

## DOM Interaction Hook Prompt

Use this prompt for generating hooks that interact with the DOM:

```
Generate a React custom hook named {{hookName}} for interacting with the DOM to {{description}}.

DOM interaction requirements:
- Target {{DOM elements}}
- Respond to {{events}}
- Manipulate the DOM by {{manipulations}}
- Account for {{browser compatibility issues}}

Implementation requirements:
- Use React refs appropriately
- Include TypeScript types
- Handle cleanup to prevent memory leaks
- Follow React hooks best practices
- Make it work with SSR environments

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React custom hook named useClickOutside for interacting with the DOM to detect clicks outside a specified element.

DOM interaction requirements:
- Target a specified element via ref
- Respond to mouse clicks and touch events
- Manipulate the DOM by attaching and detaching event listeners
- Account for event bubbling and capturing phases

Implementation requirements:
- Use React refs appropriately
- Include TypeScript types
- Handle cleanup to prevent memory leaks
- Follow React hooks best practices
- Make it work with SSR environments

Additional details:
- Support multiple refs
- Include option to ignore specific elements
- Support custom events beyond just clicks
- Add option for enabling/disabling the listener
```

## Best Practices for Using These Prompts

1. **Be Specific**: Clearly define what the hook should do and what it should return.

2. **Reference Patterns**: When applicable, reference specific patterns from your pattern library.

3. **Specify Edge Cases**: Explicitly mention edge cases that should be handled.

4. **Mention Performance**: Include performance considerations if relevant.

5. **Request Tests**: Ask for test examples if you need them.

6. **Specify Dependencies**: Mention any external libraries that should or should not be used.

## Examples of Effective Prompts

### Data Fetching Hook

```
Generate a React custom hook named useFetch that handles data fetching operations with the following specifications:

1. Hook Parameters:
   - url: The endpoint to fetch data from
   - options: Optional fetch options (method, headers, body, etc.)
   - dependencies: Array of values that should trigger a refetch

2. Return Values:
   - data: The fetched data (typed generically)
   - loading: Boolean indicating if the request is in progress
   - error: Any error that occurred during fetching
   - refetch: Function to manually trigger a new fetch
   - cancel: Function to cancel the current request

3. Core Functionality:
   - Automatic fetching on mount and when dependencies change
   - Request cancellation on unmount or when dependencies change
   - Support for all HTTP methods
   - Proper error handling with typed error responses
   - Caching of responses with configurable expiration

4. Implementation Requirements:
   - Use AbortController for cancellation
   - Implement with TypeScript generics for request/response types
   - Follow best practices for cleanup and dependency management
   - Include proper error typing and handling
   - Support both JSON and text responses

5. Error Handling:
   - Parse error responses from different API formats
   - Differentiate between network errors and API errors
   - Include status codes in error objects
   - Support retry logic with configurable attempts

Provide usage examples for common scenarios like loading data on mount, fetching based on user interaction, and handling paginated data.
```

### Form State Hook

```
Generate a React custom hook named useForm that manages form state and validation with the following specifications:

1. Hook Parameters:
   - initialValues: Initial form values object
   - validationSchema: Optional Yup or Zod schema for validation
   - onSubmit: Submission handler function
   - options: Configuration options for form behavior

2. Return Values:
   - values: Current form values
   - errors: Validation errors
   - touched: Which fields have been interacted with
   - handleChange: Function to update field values
   - handleBlur: Function to mark fields as touched
   - handleSubmit: Form submission handler
   - reset: Function to reset the form
   - setFieldValue: Function to set a specific field value

3. Core Functionality:
   - Track form values and changes
   - Perform validation on change, blur, and/or submit
   - Track which fields have been touched
   - Prevent submission when validation fails
   - Support nested fields with dot notation

4. Implementation Requirements:
   - Use TypeScript with proper type inference from initialValues
   - Support both controlled and uncontrolled inputs
   - Implement with useReducer for complex state management
   - Include performance optimizations to prevent unnecessary renders
   - Support arrays and nested objects in form values

5. Validation Features:
   - Support synchronous and asynchronous validation
   - Allow field-level and form-level validation
   - Support conditional validation based on other field values
   - Include debounced validation for better UX

Provide usage examples for common scenarios like login forms, multi-step forms, and forms with dynamic fields.
```

### Window Event Hook

```
Generate a React custom hook named useWindowEvent that manages window event listeners with the following specifications:

1. Hook Parameters:
   - eventType: The window event to listen for (resize, scroll, etc.)
   - callback: The function to call when the event triggers
   - options: Optional event listener options
   - dependencies: Array of values that should trigger listener recreation

2. Return Values:
   - None (side-effect only hook)

3. Core Functionality:
   - Add event listener to window on mount
   - Remove event listener on unmount
   - Update listener when callback or dependencies change
   - Support all window event types

4. Implementation Requirements:
   - Use TypeScript with proper event typing based on eventType
   - Include cleanup to prevent memory leaks
   - Use useCallback internally for the event handler
   - Support passive event listeners for performance
   - Handle SSR environments gracefully

5. Performance Considerations:
   - Implement throttling/debouncing for high-frequency events
   - Use capture phase when appropriate
   - Prevent unnecessary re-renders
   - Add option to disable the listener temporarily

Provide usage examples for common scenarios like responsive layouts, scroll position tracking, and keyboard shortcuts.
```

## Troubleshooting Hook Generation

If the generated hooks don't meet your expectations, try these refinements:

### Improve Typing

If the hook has inadequate TypeScript types:

```
Please improve the TypeScript types in the hook to:
- Use generics for better type inference
- Add proper typing for event handlers
- Include more specific return type declarations
- Add JSDoc comments for better IDE integration
```

### Enhance Performance

If the hook might have performance issues:

```
Please optimize the hook for performance by:
- Memoizing computed values and callbacks
- Using useRef for values that shouldn't trigger re-renders
- Adding proper dependency arrays to useEffect and useCallback
- Implementing debouncing or throttling for frequent updates
- Considering the use of useMemo for expensive calculations
```

### Add Testing Examples

If you need tests for the hook:

```
Please provide test examples for this hook using React Testing Library that:
- Test the basic functionality
- Verify proper cleanup on unmount
- Test edge cases and error handling
- Mock external dependencies
- Test asynchronous behavior
```

## Conclusion

Effective prompts for custom hook generation should clearly specify the hook's purpose, parameters, return values, and behavior. By providing detailed requirements and examples, you can guide AI assistants to generate high-quality, reusable hooks that follow React best practices.

Remember to review generated hooks carefully and test them in your application to ensure they meet your requirements and follow your project's patterns and practices. 