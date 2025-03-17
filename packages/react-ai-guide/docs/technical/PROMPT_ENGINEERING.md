# Prompt Engineering for React Development

This guide provides techniques for creating effective prompts when working with AI assistants like Cursor for React development tasks.

## Core Principles of Effective Prompts

### 1. Specificity and Context

Effective prompts provide specific details and context:

- **Be Specific**: Clearly define what you want
- **Provide Context**: Include information about your project and needs
- **Set Boundaries**: Define constraints and requirements
- **Give Examples**: Show examples of similar code or desired output

Compare these two prompts:

❌ **Ineffective Prompt:**
```
Create a button component.
```

✅ **Effective Prompt:**
```
Create a reusable Button component in React with TypeScript that:
- Supports primary, secondary, and outline variants
- Includes small, medium, and large size options
- Has proper accessibility attributes
- Handles loading states
- Follows our project's naming convention of PascalCase
- Uses styled-components for styling
```

### 2. Pattern and Rule References

Reference specific patterns and rules from your documentation:

- **Cite Patterns**: Refer to specific implementation patterns
- **Mention Rules**: Reference specific coding rules
- **Link to Documentation**: Point to relevant documentation
- **Explain Requirements**: Detail why specific approaches are needed

Example:

```
Create a DataTable component following our "Data Display Table" pattern from our pattern library.
The component should implement all the key requirements:
- Sortable columns
- Pagination
- Selectable rows
- Customizable cell renderers

Please follow our TypeScript rules for proper typing, especially around generics for the data model.
```

### 3. Progressive Detail

Start general and get more specific:

1. **Begin with Structure**: Ask for overall component structure
2. **Refine Specifics**: Request detailed implementation of specific parts
3. **Address Edge Cases**: Discuss special scenarios and handling
4. **Optimize**: Request performance or accessibility improvements

Example sequence:

First prompt:
```
Create the structure for a Form component that follows our "Controlled Form" pattern
```

Follow-up prompt:
```
Now, implement the validation logic for the form, following our "Field Validation" rules
```

Final prompt:
```
Add error handling and submission status management to complete the form
```

### 4. Visual Structure

Organize your prompts for clarity:

- **Use Lists**: Break down requirements into bullet points
- **Add Sections**: Group related requirements
- **Provide Hierarchy**: Make the most important elements stand out
- **Use Code Blocks**: Clearly separate code from instructions

Example:

```
Please create a React hook called useDataFetching that:

FUNCTIONALITY:
- Fetches data from an API endpoint
- Handles loading, error, and success states
- Supports pagination with page and pageSize parameters
- Includes request cancellation on component unmount

TECHNICAL REQUIREMENTS:
- Use TypeScript with proper type definitions
- Follow our custom hook naming convention (use[Name])
- Implement proper error handling
- Add JSDoc comments for all functions and parameters

EXAMPLE USAGE:
```
const { data, loading, error, fetchNext } = useDataFetching({
  url: '/api/users',
  pageSize: 10
});
```
```

## Prompt Templates for Common Tasks

### Component Creation

```
Create a React {{component_type}} component named "{{ComponentName}}" that {{main_purpose}}.

Requirements:
- {{requirement_1}}
- {{requirement_2}}
- {{requirement_3}}

Technical specifications:
- Use {{functional|class}} component
- Use {{TypeScript|JavaScript}}
- Follow {{specific pattern}} from our pattern library
- Include proper {{accessibility|performance}} optimizations

The component should be used in contexts like:
- {{usage_context_1}}
- {{usage_context_2}}

Similar components in our library: {{reference_components}}
```

Example:

```
Create a React UI component named "Notification" that displays various types of notifications to users.

Requirements:
- Support success, warning, error, and info notification types
- Include a title, message, and optional close button
- Auto-dismiss after configurable timeout
- Support stacking multiple notifications

Technical specifications:
- Use functional component
- Use TypeScript with proper interface definitions
- Follow "Toast Notification" pattern from our pattern library
- Include proper accessibility support for screen readers

The component should be used in contexts like:
- Form submission feedback
- System status updates
- User action confirmations

Similar components in our library: AlertBanner, ModalDialog
```

### Hook Creation

```
Create a React custom hook named "{{hookName}}" that {{main_purpose}}.

Functionality:
- {{functionality_1}}
- {{functionality_2}}
- {{functionality_3}}

Technical specifications:
- Use TypeScript with appropriate interfaces and types
- Follow our hook naming convention (use[Name])
- Handle cleanup and side effects properly
- Add proper error handling

Example usage:
```
// Show a simplified example of how the hook would be used
```

Edge cases to handle:
- {{edge_case_1}}
- {{edge_case_2}}
```

Example:

```
Create a React custom hook named "useLocalStorage" that provides persistent state using localStorage.

Functionality:
- Maintain state similar to useState but persisted in localStorage
- Automatically parse/stringify JSON data
- Synchronize state between multiple components using the same key
- Handle storage events for cross-tab synchronization

Technical specifications:
- Use TypeScript with appropriate interfaces and types
- Follow our hook naming convention (useLocalStorage)
- Handle cleanup and side effects properly
- Add proper error handling for localStorage availability and quota exceeded

Example usage:
```
const [preferences, setPreferences] = useLocalStorage('user-preferences', { theme: 'light', fontSize: 'medium' });
// Later: update just one property
setPreferences(prev => ({ ...prev, theme: 'dark' }));
```

Edge cases to handle:
- Browser with localStorage disabled
- Invalid JSON in existing storage
- Storage quota exceeded
```

### Refactoring

```
Refactor the following React {{code_type}} to improve {{aspect}}.

Current code:
```
{{paste current code here}}
```

Problems with the current implementation:
- {{problem_1}}
- {{problem_2}}
- {{problem_3}}

Refactoring goals:
- {{goal_1}}
- {{goal_2}}
- {{goal_3}}

Please maintain all existing functionality while improving the code.
Follow our {{specific_pattern_or_rule}} for the implementation.
```

Example:

```
Refactor the following React component to improve performance.

Current code:
```
function UserList({ users, onUserSelect }) {
  const [filterText, setFilterText] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );
  
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={filterText} 
        onChange={handleFilterChange} 
        placeholder="Filter users..." 
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => onUserSelect(user)}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Problems with the current implementation:
- Filtering occurs on every render
- No memoization of filtered results
- Event handler recreated on every render
- List items don't use optimized rendering

Refactoring goals:
- Optimize filtering with useMemo
- Prevent unnecessary recalculations
- Stabilize event handlers with useCallback
- Optimize list rendering

Please maintain all existing functionality while improving the code.
Follow our "Performance Optimization" pattern for the implementation.
```

### Debugging

```
Help me debug this React {{component_type}} which is experiencing the following issue:
{{describe issue}}

Current behavior:
{{describe current behavior}}

Expected behavior:
{{describe expected behavior}}

Code with issue:
```
{{paste code here}}
```

Error message (if any):
```
{{paste error message here}}
```

I've tried:
- {{attempted_solution_1}}
- {{attempted_solution_2}}

What might be causing this issue and how can I fix it while following our coding standards?
```

Example:

```
Help me debug this React custom hook which is experiencing the following issue:
The count value is not updating correctly when using the increment function.

Current behavior:
When clicking the increment button multiple times in succession, only the first click is registered.

Expected behavior:
Each click should increment the counter by 1.

Code with issue:
```
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  const reset = () => {
    setCount(initialValue);
  };
  
  return { count, increment, decrement, reset };
}

// Usage in component
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

Error message (if any):
```
No error messages, just incorrect behavior
```

I've tried:
- Adding console.logs to check the count value
- Checking if the function is being called with React DevTools

What might be causing this issue and how can I fix it while following our coding standards?
```

## Advanced Prompt Techniques

### 1. Role Assignment

Give the AI a specific role to assume:

```
As a senior React developer with expertise in accessibility, please review this component and suggest improvements:

[component code]
```

### 2. Specific Output Formats

Request specific formats for the response:

```
Please analyze this React component and provide feedback in the following format:

1. Performance issues (bulleted list)
2. Accessibility issues (bulleted list)
3. Code structure issues (bulleted list)
4. Suggested improvements (code examples)

[component code]
```

### 3. Step-by-Step Thinking

Ask the AI to explain its reasoning:

```
Please help me implement a drag-and-drop feature in React.
Walk through your thought process step-by-step, considering:

1. What library would be best to use and why
2. How the component structure should be organized
3. What state management approach makes sense
4. How to ensure accessibility
```

### 4. Constraint Specification

Explicitly state constraints:

```
Create a React datepicker component with the following constraints:
- Must not use any third-party libraries
- Must be fully keyboard accessible
- Must work with screen readers
- Must support date range selection
- Must be under 200 lines of code
```

## Troubleshooting Common Issues

### 1. Vague or Generic Output

**Problem:** AI generates generic, boilerplate solutions

**Solution:**
- Be more specific about your requirements
- Include unique aspects of your project
- Reference specific patterns and rules
- Provide examples of similar components

**Example improvement:**
```
Instead of:
"Create a table component."

Try:
"Create a DataTable component following our 'Data Display Table' pattern that handles pagination, sorting, and row selection. It should work with our existing API response format that includes 'data', 'total', and 'page' fields. Please ensure it follows our accessibility standards for tables."
```

### 2. Inconsistent Code Style

**Problem:** Generated code doesn't match your project style

**Solution:**
- Explicitly mention your style preferences
- Reference existing code for style examples
- Mention specific linting rules
- Provide a style guide reference

**Example improvement:**
```
"Please ensure the component follows our project's coding style:
- Arrow functions for component definitions
- Destructured props in parameter
- Trailing commas in multi-line objects/arrays
- Import ordering: React first, then external libraries, then internal modules
- Use of PascalCase for components and camelCase for functions"
```

### 3. Missing Edge Cases

**Problem:** AI generates solutions that don't handle edge cases

**Solution:**
- Explicitly list edge cases to handle
- Ask for robust error handling
- Request input validation
- Mention specific scenarios

**Example improvement:**
```
"Please implement this form with handling for these edge cases:
- Empty form submission
- Network errors during submission
- Validation for all fields (email format, password strength, etc.)
- Handling for slow network connections (debounce submissions)
- Accessibility for keyboard-only users and screen readers"
```

### 4. Scope Creep

**Problem:** AI adds unnecessary features or complexity

**Solution:**
- Clearly define boundaries
- Specify MVP requirements
- Explicitly state what to exclude
- Ask for simplicity

**Example improvement:**
```
"Create a minimal notification component that only:
- Shows a message with a type (success, error, info)
- Can be dismissed
- Automatically disappears after 5 seconds

Please DO NOT include:
- Animation effects
- Multiple notification stacking
- Custom themes
- Sound effects or other advanced features"
```

## Examples of Effective Prompts

### Component Creation

```
Create a React dropdown select component following our "Form Input" pattern with these requirements:

1. Component Structure:
   - Use functional component with TypeScript
   - Accept a generic type parameter for option values
   - Include disabled, error, and loading states
   - Support custom option rendering

2. Props Interface:
   - options: Array of items to select from
   - value: Currently selected value(s)
   - onChange: Change handler
   - isMulti: Boolean for multi-select support
   - isSearchable: Boolean for search functionality
   - placeholder: Text to show when nothing is selected
   - isDisabled: Boolean for disabled state
   - isLoading: Boolean for loading state
   - error: Optional error message

3. Accessibility Requirements:
   - Proper keyboard navigation (arrow keys, enter, escape)
   - ARIA attributes for screen readers
   - Focus management for the dropdown
   - Visual indication of focus state

4. Behavior:
   - Close dropdown when option selected (unless multi-select)
   - Close dropdown when clicking outside
   - Filter options when typing (if searchable)
   - Support keyboard navigation

Use styled-components for styling and follow our project's component file structure.
```

### Hook Creation

```
Create a data-fetching custom hook called useFetchData that:

1. Functionality:
   - Handles API requests with fetch or axios
   - Manages loading, error, and data states
   - Supports pagination, filtering, and sorting
   - Handles request cancellation on unmount
   - Provides a refetch method for manual data refreshing

2. Type Definitions:
   - Generic type parameter for response data
   - Options parameter with URL, method, headers, etc.
   - Return type with data, loading, error, and utility methods

3. Implementation Details:
   - Use useReducer for complex state management
   - Implement proper cleanup with AbortController
   - Cache results with optional configuration
   - Handle retry logic for failed requests

4. Error Handling:
   - Parse error responses into usable format
   - Support custom error handling
   - Provide error details in return value

Example usage pattern:
```
const { data, loading, error, refetch, setFilter } = useFetchData<UserData[]>({
  url: '/api/users',
  params: { status: 'active' },
  initialData: [],
});
```

Please include comprehensive JSDoc comments and follow our custom hook patterns.
```

## Continuous Improvement

To improve your prompt engineering skills:

1. **Keep a Prompt Library**
   - Save effective prompts for reuse
   - Categorize by task type
   - Note which formulations work best

2. **Analyze Results**
   - Study successful vs. unsuccessful prompts
   - Identify patterns in effective prompts
   - Note which details lead to better outcomes

3. **Iterate and Refine**
   - Start with a basic prompt
   - Refine based on initial results
   - Add details progressively

4. **Share Knowledge**
   - Document effective prompts
   - Share successful approaches with your team
   - Create team templates for common tasks

## Conclusion

Effective prompt engineering is both an art and a science. By following these guidelines and continuously refining your approach, you can significantly improve the quality and relevance of the code generated by AI assistants, ultimately accelerating your React development workflow while maintaining high-quality standards. 