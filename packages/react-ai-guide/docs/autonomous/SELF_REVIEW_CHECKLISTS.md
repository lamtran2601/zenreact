# AI Code Self-Review Checklists

## Purpose

This document provides comprehensive checklists for AI assistants to evaluate their own generated code before presenting it to users. By performing systematic self-reviews, AI assistants can catch common issues, ensure alignment with project patterns, and deliver higher quality code with fewer iterations.

## How to Use These Checklists

1. Generate initial code implementation based on requirements
2. Apply the relevant checklists to evaluate the code
3. Improve the code based on checklist findings
4. Present the improved code to the user

AIs should apply these checklists proactively without being prompted. The goal is to deliver high-quality code on the first attempt.

## General Code Quality Checklist

```
I'll review this code for general quality issues:

1. Project Pattern Consistency
   [ ] Does the code follow the project's established patterns and conventions?
   [ ] Are naming conventions consistent with the rest of the codebase?
   [ ] Does file organization match project structure?
   [ ] Are imports organized according to project conventions?

2. Code Readability
   [ ] Is the code well-formatted and consistently indented?
   [ ] Are variable and function names descriptive and clear?
   [ ] Are complex operations commented or explained?
   [ ] Are there any overly complex or hard-to-understand sections?

3. DRY Principles
   [ ] Is there any duplicated code that could be extracted?
   [ ] Are similar functions or patterns consolidated?
   [ ] Could any repeated logic be abstracted into utilities?

4. Simplicity and Complexity
   [ ] Is the solution more complex than necessary?
   [ ] Could any part be simplified without losing functionality?
   [ ] Are there any premature optimizations?
   [ ] Is the code overengineered for the requirements?

5. Error Handling
   [ ] Are potential errors and edge cases handled?
   [ ] Are error messages clear and helpful?
   [ ] Is the error handling strategy consistent?
   [ ] Are promises and async operations properly handled?

6. Performance Considerations
   [ ] Are there any obvious performance issues?
   [ ] Could any operations be optimized?
   [ ] Are expensive operations minimized or memoized?
   [ ] Are there unnecessary renders or calculations?

7. Security Concerns
   [ ] Are there any potential security vulnerabilities?
   [ ] Is user input properly sanitized?
   [ ] Are sensitive operations or data handled safely?
   [ ] Is authentication/authorization properly implemented?

8. Dependencies
   [ ] Are all imports necessary and used?
   [ ] Are there circular dependencies?
   [ ] Could external dependencies be reduced?
   [ ] Are dependencies consistent with the project's existing ones?
```

## React Component Checklist

```
I'll review this React component for quality and best practices:

1. Component Structure
   [ ] Does the component have a single, clear responsibility?
   [ ] Is the component reasonably sized (<250 lines)?
   [ ] Are UI and logic appropriately separated?
   [ ] Are subcomponents extracted where appropriate?

2. Props
   [ ] Are props properly defined and typed?
   [ ] Are required props marked as such?
   [ ] Do all props have appropriate default values if optional?
   [ ] Is prop spreading used appropriately (if at all)?
   [ ] Are callback props memoized when passed to child components?

3. State Management
   [ ] Is state used appropriately (vs. derived values)?
   [ ] Is state initialized correctly?
   [ ] Are state updates handled correctly (immutably)?
   [ ] Is complex state managed with useReducer if appropriate?
   [ ] Are related state values grouped logically?

4. Effects
   [ ] Do effects have appropriate dependency arrays?
   [ ] Are cleanup functions included when necessary?
   [ ] Is the effect doing only one thing (single responsibility)?
   [ ] Could any effects be extracted to custom hooks?
   [ ] Are there any unnecessary effects?

5. Rendering
   [ ] Is the JSX clean and readable?
   [ ] Are conditional renders handled efficiently?
   [ ] Are lists rendered with proper keys?
   [ ] Is rendering optimized for performance if needed?
   [ ] Is the component memoized if it would benefit performance?

6. Event Handling
   [ ] Are event handlers named consistently?
   [ ] Are handlers properly bound to components?
   [ ] Are event handlers clean and focused?
   [ ] Are there any memory leaks from event listeners?

7. Component Lifecycle
   [ ] Are resources properly initialized and cleaned up?
   [ ] Is data fetching handled correctly?
   [ ] Are side effects managed properly?
   [ ] Are there any memory leaks?

8. Context Usage
   [ ] Is Context accessed correctly?
   [ ] Is the component within the appropriate Provider?
   [ ] Would a custom hook improve context usage?
   [ ] Is the component unnecessarily re-rendering due to context?

9. Callbacks and Handlers
   [ ] Are functions memoized with useCallback when appropriate?
   [ ] Are event handlers preventing default actions when necessary?
   [ ] Are event handlers properly typed?
```

## TypeScript Quality Checklist

```
I'll review this TypeScript code for type safety and best practices:

1. Type Definitions
   [ ] Are types/interfaces clearly defined?
   [ ] Are types/interfaces used consistently?
   [ ] Are generic types used appropriately?
   [ ] Are union and intersection types used effectively?
   [ ] Are type names clear and descriptive?

2. Type Safety
   [ ] Are there any implicit 'any' types?
   [ ] Are function parameters and return values typed?
   [ ] Are type assertions (casting) used minimally and safely?
   [ ] Are nullable values handled safely?
   [ ] Are mapped and conditional types used correctly?

3. Interface vs Type
   [ ] Is the choice between interface and type consistent with project patterns?
   [ ] Are interfaces used for object shapes that might be extended?
   [ ] Are type aliases used for unions, intersections, and utility types?

4. Type Guards
   [ ] Are proper type guards used for narrowing types?
   [ ] Are custom type guards (user-defined type predicates) used where appropriate?
   [ ] Is type narrowing handled correctly in conditional blocks?

5. Generics
   [ ] Are generic type parameters named clearly?
   [ ] Are constraints on generic types appropriate?
   [ ] Are default type parameters provided when useful?
   [ ] Are generic types reused consistently?

6. Enums and Constants
   [ ] Are string enums used appropriately?
   [ ] Are const assertions used for literal object types?
   [ ] Could any enum be replaced with a union of string literals?

7. Utility Types
   [ ] Are built-in utility types (Partial, Pick, Omit, etc.) used where appropriate?
   [ ] Are custom utility types clear and reusable?
   [ ] Could any complex types be simplified with utility types?

8. React-Specific Types
   [ ] Are component props defined with interfaces or types?
   [ ] Are event handlers typed correctly?
   [ ] Are React element types used appropriately?
   [ ] Are hook return types explicit when necessary?
```

## Accessibility Checklist

```
I'll review this component for accessibility considerations:

1. Semantic HTML
   [ ] Are appropriate HTML elements used for their semantic purpose?
   [ ] Is the document structure logical and navigable?
   [ ] Are headings used in the correct hierarchy?
   [ ] Are lists used for list content?

2. ARIA Attributes
   [ ] Are ARIA roles used appropriately and only when needed?
   [ ] Are aria-label or aria-labelledby used for elements without visible text?
   [ ] Are aria-expanded, aria-haspopup, etc. used for interactive elements?
   [ ] Are aria-live regions used for dynamic content?
   [ ] Are ARIA attributes kept updated during state changes?

3. Keyboard Navigation
   [ ] Can all interactive elements be accessed via keyboard?
   [ ] Is the tab order logical?
   [ ] Are keyboard focus indicators visible?
   [ ] Are keyboard shortcuts provided for common actions?
   [ ] Are custom keyboard interactions handled correctly?

4. Focus Management
   [ ] Is focus handled appropriately for modals, dialogs, etc.?
   [ ] Is focus trapped inside modals when appropriate?
   [ ] Is focus restored to appropriate elements when modals close?
   [ ] Are there any keyboard traps?

5. Screen Reader Considerations
   [ ] Do all images have alt text?
   [ ] Do decorative images have empty alt text?
   [ ] Are status updates announced to screen readers?
   [ ] Are custom controls properly labeled?
   [ ] Is text content directly accessible (not buried in CSS)?

6. Forms
   [ ] Do all form controls have associated labels?
   [ ] Are required fields indicated visually and programmatically?
   [ ] Are form validation errors announced to screen readers?
   [ ] Are form controls grouped logically with fieldset/legend when appropriate?

7. Color and Contrast
   [ ] Is color not the only means of conveying information?
   [ ] Do text elements have sufficient color contrast?
   [ ] Are focus indicators visible with sufficient contrast?
   [ ] Would the component work in high contrast mode?

8. Responsive Behavior
   [ ] Does the component work well at different zoom levels?
   [ ] Is the component usable on small screens?
   [ ] Are touch targets large enough for mobile use?
```

## State Management Checklist

```
I'll review this state management code:

1. State Organization
   [ ] Is state organized logically and cohesively?
   [ ] Are related pieces of state grouped together?
   [ ] Is state normalized appropriately to avoid duplication?
   [ ] Is the state shape as simple as possible?

2. State Updates
   [ ] Are state updates handled immutably?
   [ ] Are complex state updates using appropriate patterns?
   [ ] Are batch updates used when multiple state values change together?
   [ ] Are state update functions pure and predictable?

3. Context Implementation
   [ ] Is Context used for appropriate state sharing?
   [ ] Is the Context value memoized to prevent unnecessary re-renders?
   [ ] Is Context split into logical domains?
   [ ] Does the Context Provider have a sensible API?

4. Redux Implementation
   [ ] Are actions typed correctly?
   [ ] Are reducers pure functions?
   [ ] Is the state structure normalized and efficient?
   [ ] Are selectors used for derived data?
   [ ] Is Redux middleware used appropriately?

5. Performance Considerations
   [ ] Could any state updates cause unnecessary renders?
   [ ] Are expensive derivations memoized?
   [ ] Is state granular enough to prevent unnecessary renders?
   [ ] Are any components re-rendering when they don't need to?

6. Side Effects
   [ ] Are side effects separated from state updates?
   [ ] Are asynchronous operations handled correctly?
   [ ] Are side effects cancelable when components unmount?
   [ ] Is error handling for side effects thorough?

7. Persistence
   [ ] Is state persistence implemented correctly if needed?
   [ ] Is sensitive data handled securely?
   [ ] Is persistence efficient (only storing necessary data)?
   [ ] Is rehydration handled correctly?
```

## Data Fetching Checklist

```
I'll review this data fetching implementation:

1. Request Handling
   [ ] Are API endpoints accessed correctly?
   [ ] Are request parameters validated?
   [ ] Is authentication handled properly?
   [ ] Are HTTP methods used appropriately?

2. Loading States
   [ ] Are loading states tracked and displayed?
   [ ] Is the loading UX user-friendly?
   [ ] Are loading indicators appropriate for the context?
   [ ] Is initial load distinguished from background refreshes?

3. Error Handling
   [ ] Are network errors caught and handled?
   [ ] Are API errors processed correctly?
   [ ] Are error messages user-friendly?
   [ ] Are retry mechanisms implemented if appropriate?
   [ ] Are failed requests logged appropriately?

4. Data Management
   [ ] Is fetched data stored efficiently?
   [ ] Is the data structure optimized for component usage?
   [ ] Is data normalized if appropriate?
   [ ] Are timestamps or etags used for cache validation?
   [ ] Is stale data handled appropriately?

5. Caching Strategy
   [ ] Is there an appropriate caching strategy?
   [ ] Is cache invalidation handled correctly?
   [ ] Is the cache time appropriate for the data type?
   [ ] Are there mechanisms for forced refreshes?

6. Race Conditions
   [ ] Are race conditions handled for concurrent requests?
   [ ] Is there protection against out-of-order responses?
   [ ] Are duplicate requests deduplicated?

7. Cleanup
   [ ] Are in-flight requests canceled on unmount?
   [ ] Are subscriptions or pollers cleaned up?
   [ ] Are event listeners removed appropriately?

8. Performance
   [ ] Is the data fetching strategy efficient?
   [ ] Are requests batched or combined when possible?
   [ ] Is pagination implemented efficiently?
   [ ] Is prefetching used where appropriate?
```

## Form Implementation Checklist

```
I'll review this form implementation:

1. Form Structure
   [ ] Is the form markup semantic and accessible?
   [ ] Are field groups logically organized?
   [ ] Is the tab order logical and user-friendly?
   [ ] Are required fields clearly indicated?

2. Form State
   [ ] Is form state managed effectively?
   [ ] Are controlled components used consistently?
   [ ] Is field state (values, errors, touched, etc.) tracked appropriately?
   [ ] Are form-wide states (submitting, success, error) handled?

3. Validation
   [ ] Is validation thorough and appropriate?
   [ ] Is validation triggered at appropriate times (change, blur, submit)?
   [ ] Are validation errors clearly displayed?
   [ ] Is validation accessible to screen readers?
   [ ] Are cross-field validations handled?

4. Submission
   [ ] Is form submission handled correctly?
   [ ] Is multiple submission prevented?
   [ ] Is submission feedback clear to users?
   [ ] Are success and error states handled appropriately?
   [ ] Is form redirection after submission handled if needed?

5. User Experience
   [ ] Are default values set appropriately?
   [ ] Is autofocus used appropriately?
   [ ] Are autocomplete attributes used correctly?
   [ ] Is inline validation helpful and not intrusive?
   [ ] Can the form be navigated and completed with keyboard only?

6. Error Recovery
   [ ] Can users easily understand and fix validation errors?
   [ ] Is partial progress saved if appropriate?
   [ ] Are there clear paths to resolve submission errors?
   [ ] Is input data preserved on navigation or page refresh if appropriate?

7. Performance
   [ ] Are validation operations debounced if expensive?
   [ ] Are renders optimized for forms with many fields?
   [ ] Is input responsiveness maintained during typing?
```

## Custom Hook Checklist

```
I'll review this custom hook implementation:

1. Hook Design
   [ ] Does the hook follow the "use" naming convention?
   [ ] Does the hook do one thing and do it well?
   [ ] Is the hook's API intuitive and consistent?
   [ ] Is the hook generic enough to be reusable?

2. Dependencies
   [ ] Are all external dependencies declared and used?
   [ ] Are effect dependencies complete and accurate?
   [ ] Are callback dependencies properly specified?
   [ ] Could any dependencies be eliminated or reduced?

3. Return Value
   [ ] Is the return value structure clear and consistent?
   [ ] Are returned functions memoized appropriately?
   [ ] Is the return type explicitly defined?
   [ ] Does the hook return the minimal necessary values?

4. Lifecycle
   [ ] Does the hook clean up after itself?
   [ ] Are subscriptions or timers properly disposed?
   [ ] Are resources initialized at the right time?
   [ ] Are there any potential memory leaks?

5. Error Handling
   [ ] Are errors caught and handled appropriately?
   [ ] Is the error state returned to the consumer?
   [ ] Are error recovery mechanisms in place if applicable?

6. Composition
   [ ] Could this hook be composed from simpler hooks?
   [ ] Is the hook designed to compose well with other hooks?
   [ ] Are any built-in React hooks used incorrectly?

7. Documentation
   [ ] Are parameters documented clearly?
   [ ] Is the return value well documented?
   [ ] Are usage examples provided?
   [ ] Are limitations or edge cases documented?
```

## Performance Optimization Checklist

```
I'll review this code for performance optimizations:

1. Render Optimization
   [ ] Are expensive components memoized with React.memo?
   [ ] Are props stable across renders when passed to memoized components?
   [ ] Are callback functions memoized with useCallback when appropriate?
   [ ] Are expensive calculations memoized with useMemo?
   [ ] Are there unnecessary re-renders that could be prevented?

2. Effect Dependencies
   [ ] Are effect dependencies correctly specified?
   [ ] Are there any missing dependencies that could cause stale closures?
   [ ] Are there any unnecessary dependencies causing extra effect runs?
   [ ] Could any effects be combined or eliminated?

3. List Rendering
   [ ] Are lists rendered efficiently?
   [ ] Are stable, unique keys used for list items?
   [ ] Is virtualization used for long lists?
   [ ] Are list operations (filter, map, etc.) optimized?

4. State Updates
   [ ] Are there any unnecessary state updates?
   [ ] Are batch updates used when multiple state changes happen together?
   [ ] Is state structured to minimize re-renders?
   [ ] Are context providers optimized to prevent unnecessary consumer updates?

5. Expensive Operations
   [ ] Are expensive operations moved outside the render phase?
   [ ] Are heavy computations cached or memoized?
   [ ] Are there any blocking operations that should be deferred?
   [ ] Is lazy loading used for expensive components or resources?

6. Event Handling
   [ ] Are event handlers debounced or throttled when appropriate?
   [ ] Are window or document event listeners optimized?
   [ ] Are event delegation patterns used when appropriate?

7. Network and Data
   [ ] Is data fetching optimized?
   [ ] Is caching implemented effectively?
   [ ] Are there opportunities for data prefetching?
   [ ] Is the payload size minimized?
```

## Example Self-Review Application

Here's an example of applying these checklists to a component:

```jsx
// Original generated component
function UserList({ users, onUserSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  useEffect(() => {
    setFilteredUsers(
      users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <div>
        {filteredUsers.map(user => (
          <div onClick={() => onUserSelect(user.id)}>
            {user.name} - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Self-Review:**

```
APPLYING REACT COMPONENT CHECKLIST:

Issues found:
1. Component Structure:
   - Missing TypeScript types for props
   - Missing accessibility attributes

2. Props:
   - No type definitions
   - No validation or defaults
   
3. Rendering:
   - List items missing keys
   - No loading or empty states
   
4. Event Handling:
   - onClick handler not memoized
   
5. Accessibility:
   - Missing labels for input
   - Missing semantic HTML elements
   - No keyboard navigation support

APPLYING PERFORMANCE CHECKLIST:

Issues found:
1. Render Optimization:
   - filteredUsers could be useMemo instead of state
   - onUserSelect callback not memoized when used

APPLYING TYPESCRIPT CHECKLIST:

Issues found:
1. Type Definitions:
   - Missing interface/type for props
   - Missing type for user object
```

**Improved Component:**

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (userId: string) => void;
  loading?: boolean;
}

function UserList({ users, onUserSelect, loading = false }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use useMemo instead of state + effect
  const filteredUsers = useMemo(() => 
    users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [users, searchTerm]
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Memoize item click handler
  const handleUserClick = useCallback((userId: string) => {
    onUserSelect(userId);
  }, [onUserSelect]);
  
  return (
    <div className="user-list">
      <div className="user-list-search">
        <label htmlFor="user-search">Search users:</label>
        <input 
          id="user-search"
          type="text" 
          value={searchTerm} 
          onChange={handleSearch}
          aria-controls="user-results"
        />
      </div>
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul id="user-results" className="user-results">
          {filteredUsers.length === 0 ? (
            <li>No users found</li>
          ) : (
            filteredUsers.map(user => (
              <li 
                key={user.id} 
                onClick={() => handleUserClick(user.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleUserClick(user.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${user.name}`}
              >
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
```

## Using Self-Review Results

After completing a self-review, the AI should:

1. **Fix Identified Issues:** Address all issues found during self-review
2. **Document Decisions:** Note any significant decisions made during revision
3. **Highlight Improvements:** When presenting the code to the user, briefly mention key improvements made
4. **Note Limitations:** If there are any remaining limitations or areas for future improvement, note them

The self-review process is iterative - the AI may need to apply multiple passes of different checklists to fully optimize the code.

## Conclusion

By systematically applying these self-review checklists, AI assistants can significantly improve the quality of generated code before presenting it to users. This approach:

1. Reduces the need for back-and-forth iterations
2. Delivers more consistent, high-quality code
3. Ensures alignment with project patterns and best practices
4. Catches common issues before they reach the user

The most effective self-review process is:
- **Comprehensive:** Covers multiple aspects of code quality
- **Contextual:** Considers project-specific patterns and requirements
- **Critical:** Honestly evaluates the code against objective standards
- **Constructive:** Focuses on concrete improvements

When done well, self-review becomes an essential part of the AI's code generation process, leading to better outcomes and higher user satisfaction. 