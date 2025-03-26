# ZenReact Implementation Guide for AI Assistants

This guide provides a standardized implementation workflow for AI assistants working with ZenReact. Follow this structured process to ensure consistent, high-quality implementations that adhere to ZenReact standards.

## Implementation Workflow

### Phase 1: Context Gathering

1. **Analyze the Request**
   - Identify the task type (new feature, bug fix, refactoring, etc.)
   - Determine what ZenReact documentation is relevant (use decision trees)
   - Note specific requirements or constraints

2. **Explore Existing Code** (if applicable)
   - Identify component hierarchy and relationships
   - Understand current state management approach
   - Note coding patterns and standards in use

3. **Complete Context Questionnaire**
   - Use the appropriate context questionnaire for the task type
   - Ask specific questions to fill gaps in understanding
   - Document the context for reference throughout the implementation

### Phase 2: Planning

1. **Component Classification**
   - Identify component types needed (UI, Layout, Container, Page, Compound)
   - Determine component responsibilities and relationships
   - Plan component organization (single file vs. directory structure)

2. **State Management Strategy**
   - Categorize state needs (UI, Application, Server, Form)
   - Select appropriate state management approaches using decision trees
   - Plan state structure, update patterns, and relationships

3. **Integration Planning**
   - Identify how new components will integrate with existing ones
   - Plan API integrations and data flow
   - Consider error handling and edge cases

4. **Develop Implementation Plan**
   - Break implementation into logical steps
   - Prioritize steps based on dependencies
   - Estimate complexity for each step

### Phase 3: Implementation

1. **Structure Definition**
   - Create directory and file structure
   - Define interfaces and types
   - Set up component scaffolding following templates

2. **Core Implementation**
   - Implement components following Component Rules
   - Implement state management following State Rules
   - Add API integration and data handling

3. **Error Handling**
   - Implement appropriate error boundaries
   - Add error states and fallbacks
   - Handle edge cases and validation

4. **Accessibility Implementation**
   - Ensure semantic HTML structure
   - Add proper ARIA attributes
   - Implement keyboard navigation
   - Test with accessibility tools

5. **Performance Optimization**
   - Memoize components and functions where beneficial
   - Optimize rendering efficiency
   - Add virtualization for large lists if needed

6. **Testing**
   - Write unit tests for components and utilities
   - Implement integration tests for workflows
   - Verify edge cases and error states

7. **Documentation**
   - Add JSDoc comments for components and functions
   - Include usage examples
   - Document props, state, and key behaviors

### Phase 4: Validation

1. **Standards Compliance**
   - Verify adherence to Coding Standards
   - Check Component Rules compliance
   - Ensure State Rules compliance

2. **Checklist Verification**
   - Run through Implementation Checklists
   - Verify all requirements are met
   - Check for common pitfalls

3. **Final Review**
   - Review for consistency with existing code
   - Look for potential improvements
   - Ensure documentation is complete

## Implementation Plan Template

Use this template to develop a comprehensive implementation plan:

```markdown
# Implementation Plan: [Feature/Task Name]

## Context Summary
- **Task Type**: [Feature/Bug Fix/Refactoring/etc.]
- **Key Requirements**: [List key requirements]
- **Constraints**: [List any constraints]
- **Related Components**: [List related components]

## Component Structure
- **New Components**:
  - [ComponentName] ([ComponentType]): [Description]
  - [ComponentName] ([ComponentType]): [Description]
- **Modified Components**:
  - [ComponentName]: [Changes needed]

## State Management
- **State Categories**:
  - [StateCategory]: [Management Approach]
  - [StateCategory]: [Management Approach]
- **State Structure**:
  ```typescript
  interface StateInterface {
    // State structure
  }
  ```

## Implementation Steps
1. **[Step Name]**:
   - [ ] [Sub-task]
   - [ ] [Sub-task]
   - [ ] [Sub-task]

2. **[Step Name]**:
   - [ ] [Sub-task]
   - [ ] [Sub-task]
   - [ ] [Sub-task]

## Testing Plan
- **Component Tests**:
  - [ ] [Test scenario]
  - [ ] [Test scenario]
- **Integration Tests**:
  - [ ] [Test scenario]
  - [ ] [Test scenario]

## Checklist
- [ ] TypeScript interfaces defined
- [ ] Component structure follows ZenReact standards
- [ ] State management follows ZenReact patterns
- [ ] Error handling implemented
- [ ] Accessibility requirements met
- [ ] Tests implemented
- [ ] Documentation added
```

## Implementation Examples

### Example 1: TodoList Feature Implementation

```markdown
# Implementation Plan: TodoList Feature

## Context Summary
- **Task Type**: New Feature
- **Key Requirements**: 
  - Display a list of todos
  - Add new todos
  - Mark todos as complete
  - Filter todos by status
- **Constraints**: 
  - Must work offline
  - Must preserve state on refresh
- **Related Components**: None (new feature)

## Component Structure
- **New Components**:
  - TodoPage (Page Component): Main page component for the todo feature
  - TodoContainer (Container Component): Handles data fetching and state
  - TodoList (UI Component): Displays the list of todos
  - TodoItem (UI Component): Individual todo item
  - TodoForm (UI Component): Form for adding new todos
  - TodoFilter (UI Component): Filter controls

## State Management
- **State Categories**:
  - Application State: Todos data using Zustand with localStorage persistence
  - UI State: Filter state using useState
  - Form State: New todo form using local state

- **State Structure**:
  ```typescript
  interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
  }

  interface TodoStore {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    filterStatus: 'all' | 'active' | 'completed';
    setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
  }
  ```

## Implementation Steps
1. **Set up state management**:
   - [ ] Create Zustand store with persistence
   - [ ] Implement CRUD actions for todos
   - [ ] Add filtering logic

2. **Implement UI Components**:
   - [ ] Create TodoItem component
   - [ ] Create TodoList component
   - [ ] Create TodoForm component
   - [ ] Create TodoFilter component

3. **Implement Container Component**:
   - [ ] Create TodoContainer with store integration
   - [ ] Connect UI components
   - [ ] Handle loading and error states

4. **Implement Page Component**:
   - [ ] Create TodoPage with layout
   - [ ] Add page-level error boundaries

5. **Add offline support**:
   - [ ] Implement localStorage persistence
   - [ ] Handle offline state

## Testing Plan
- **Component Tests**:
  - [ ] TodoItem renders correctly and handles click events
  - [ ] TodoList renders multiple items correctly
  - [ ] TodoForm submits new todos correctly
  - [ ] TodoFilter changes filter state correctly

- **Store Tests**:
  - [ ] Store initializes correctly
  - [ ] Adding todos works correctly
  - [ ] Toggling todos works correctly
  - [ ] Removing todos works correctly
  - [ ] Filtering todos works correctly

- **Integration Tests**:
  - [ ] Adding a todo shows up in the list
  - [ ] Completing a todo updates the UI
  - [ ] Filtering shows correct todos

## Checklist
- [ ] TypeScript interfaces defined
- [ ] Component structure follows ZenReact standards
- [ ] State management follows ZenReact patterns
- [ ] Error handling implemented
- [ ] Accessibility requirements met
- [ ] Tests implemented
- [ ] Documentation added
```

### Example 2: User Authentication Implementation Plan

```markdown
# Implementation Plan: User Authentication

## Context Summary
- **Task Type**: New Feature
- **Key Requirements**: 
  - User login with email/password
  - User registration
  - Password reset flow
  - Authenticated routes protection
- **Constraints**: 
  - Must integrate with existing API
  - Must persist authentication between page refreshes
- **Related Components**: Any protected route components

## Component Structure
- **New Components**:
  - LoginPage (Page Component): Login form and logic
  - RegisterPage (Page Component): Registration form and logic
  - ResetPasswordPage (Page Component): Password reset flow
  - ProtectedRoute (Container Component): Route protection HOC
  - AuthForm (UI Component): Reusable authentication form

## State Management
- **State Categories**:
  - Application State: Auth state using Zustand with localStorage persistence
  - Form State: Form handling using React Hook Form
  - Server State: API interactions using React Query

- **State Structure**:
  ```typescript
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  }

  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: Error | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    clearError: () => void;
  }
  ```

## Implementation Steps
1. **Set up authentication store**:
   - [ ] Create Zustand store with persistence
   - [ ] Implement auth actions (login, logout, etc.)
   - [ ] Set up token management

2. **Implement API integration**:
   - [ ] Create auth API service
   - [ ] Implement login endpoint integration
   - [ ] Implement register endpoint integration
   - [ ] Implement password reset endpoint integration

3. **Implement UI Components**:
   - [ ] Create AuthForm component
   - [ ] Create LoginPage component
   - [ ] Create RegisterPage component
   - [ ] Create ResetPasswordPage component

4. **Implement Route Protection**:
   - [ ] Create ProtectedRoute component
   - [ ] Integrate with React Router
   - [ ] Handle unauthorized access

5. **Add persistence and token refresh**:
   - [ ] Implement token storage in localStorage
   - [ ] Set up interceptor for token refresh
   - [ ] Handle expired tokens

## Testing Plan
- **Component Tests**:
  - [ ] AuthForm validates inputs correctly
  - [ ] LoginPage submits credentials correctly
  - [ ] RegisterPage submits registration correctly
  - [ ] ResetPasswordPage handles flow correctly

- **Store Tests**:
  - [ ] Authentication store initializes correctly
  - [ ] Login action works correctly
  - [ ] Logout action works correctly
  - [ ] Error handling works correctly

- **Integration Tests**:
  - [ ] Login flow works end-to-end
  - [ ] Protected routes redirect unauthenticated users
  - [ ] Authenticated users can access protected routes

## Checklist
- [ ] TypeScript interfaces defined
- [ ] Component structure follows ZenReact standards
- [ ] State management follows ZenReact patterns
- [ ] Error handling implemented
- [ ] Accessibility requirements met
- [ ] Tests implemented
- [ ] Documentation added
```

## Rule Application During Implementation

As you implement code, explicitly reference ZenReact rules to ensure compliance and demonstrate reasoning.

### Example: Applying Rules to Component Implementation

```typescript
// Applying Component Rule 2.1: Use function declarations for components
// Applying Component Rule 2.3: Use proper component naming (PascalCase)
export function TodoItem({
  // Applying Component Rule 3.2: Destructure props in function signature
  todo,
  onToggle,
  onDelete,
}: TodoItemProps): JSX.Element {
  // Applying Component Rule 4.1: Define event handlers using useCallback
  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [onToggle, todo.id]);
  
  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);
  
  // Applying Component Rule 4.5: Render logic last
  return (
    // Applying Accessibility Rule 1.1: Use semantic HTML
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-item-label">
        {/* Applying Accessibility Rule 2.3: Associate input with label */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span>{todo.text}</span>
      </label>
      {/* Applying Accessibility Rule 3.2: Provide accessible name for button */}
      <button 
        onClick={handleDelete}
        aria-label={`Delete ${todo.text}`}
        className="todo-delete-btn"
      >
        Delete
      </button>
    </li>
  );
}
```

### Example: Applying Rules to State Implementation

```typescript
// Applying State Rule 2.2: Use Zustand for application state
// Applying State Rule 1.1: Create clear interface for state
interface TodoState {
  // State
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  fetchTodos: () => Promise<void>;
}

// Applying State Rule 4.3: Create a single source of truth
export const useTodoStore = create<TodoState>()(
  // Applying State Rule 5.1: Persist state when needed
  persist(
    (set, get) => ({
      // Initial state
      todos: [],
      isLoading: false,
      error: null,
      
      // Actions
      addTodo: (text) => {
        // Applying State Rule 3.1: Immutable updates
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: nanoid(),
              text,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },
      
      toggleTodo: (id) => {
        // Applying State Rule 3.2: Update items by mapping
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        }));
      },
      
      removeTodo: (id) => {
        // Applying State Rule 3.3: Remove items by filtering
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      
      fetchTodos: async () => {
        // Applying State Rule 6.1: Handle loading state
        set({ isLoading: true, error: null });
        
        try {
          const todos = await api.getTodos();
          // Applying State Rule 3.1: Immutable updates
          set({ todos, isLoading: false });
        } catch (error) {
          // Applying State Rule 6.2: Handle error state
          set({ 
            error: error instanceof Error ? error : new Error('Unknown error'), 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'todo-storage',
      // Only persist the todos, not the loading/error state
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);
```

## Troubleshooting Common Implementation Issues

### Component Rendering Issues

1. **Problem**: Component re-renders too frequently
   - **Solution**: Check dependency arrays in useEffect/useCallback/useMemo
   - **Solution**: Use memoization (React.memo) for expensive components
   - **Solution**: Review state management patterns, moving state up when needed

2. **Problem**: Component doesn't update when props/state change
   - **Solution**: Verify that state updates are immutable
   - **Solution**: Check if key props for lists are implemented correctly
   - **Solution**: Ensure that context providers are positioned correctly

### State Management Issues

1. **Problem**: State updates don't trigger re-renders
   - **Solution**: Ensure updates are immutable (create new objects/arrays)
   - **Solution**: Verify correct use of set function in useState/useReducer
   - **Solution**: Check component memoization isn't blocking updates

2. **Problem**: Global state is lost on refresh
   - **Solution**: Implement persistence with localStorage/sessionStorage
   - **Solution**: Verify that persistence middleware is configured correctly
   - **Solution**: Check for errors in serialization/deserialization

### TypeScript Issues

1. **Problem**: Type errors with event handlers
   - **Solution**: Use proper event types (React.ChangeEvent<HTMLInputElement>, etc.)
   - **Solution**: Ensure consistent typing between props and handlers
   - **Solution**: Use type inference with generic hooks when possible

2. **Problem**: Type errors with API data
   - **Solution**: Define explicit interfaces for API responses
   - **Solution**: Use proper typing for loading/error states
   - **Solution**: Consider partial types for loading states

## Implementation Review Checklist

Use this checklist to validate your implementation before considering it complete:

### Functionality

- [ ] All requirements are implemented
- [ ] Edge cases are handled appropriately
- [ ] Error states are implemented and tested
- [ ] Loading states are implemented and tested
- [ ] Empty states are implemented and tested

### Code Quality

- [ ] Code follows ZenReact Coding Standards
- [ ] TypeScript is used properly with appropriate interfaces
- [ ] Component structure follows ZenReact Component Rules
- [ ] State management follows ZenReact State Rules
- [ ] No unnecessary re-renders or performance issues

### Accessibility

- [ ] Semantic HTML is used appropriately
- [ ] ARIA attributes are added where necessary
- [ ] Keyboard navigation works correctly
- [ ] Color contrast is sufficient
- [ ] Screen reader testing passes

### Testing

- [ ] Unit tests cover all components
- [ ] State management is tested
- [ ] Edge cases are tested
- [ ] Integration tests verify component interactions
- [ ] Test coverage meets ZenReact standards

### Documentation

- [ ] Components have JSDoc comments
- [ ] Props are documented
- [ ] Complex logic has explanatory comments
- [ ] Usage examples are provided
- [ ] Special behaviors or edge cases are documented

## Conclusion

Following this standardized implementation workflow ensures that your code meets ZenReact standards and is consistent, maintainable, and robust. Adapt the process as needed for specific tasks, but always adhere to the core principles of structure, organization, and quality that define the ZenReact framework. 