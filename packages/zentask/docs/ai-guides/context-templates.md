# Context Templates for AI-Assisted Development

This guide provides standardized templates for providing context to AI assistants when working on the ZenTask application. Using these templates consistently ensures clear communication and effective AI assistance.

## Why Context Templates Matter

Context templates provide structured ways to:
1. **Communicate Requirements**: Clearly express what needs to be built
2. **Establish Constraints**: Define boundaries and requirements
3. **Share Domain Knowledge**: Provide business logic and rules
4. **Convey Technical Context**: Share architectural patterns and existing code
5. **Maintain Continuity**: Keep track of progress and decisions

## Feature Development Template

Use this template when developing a new feature:

```markdown
## Feature: [Feature Name]

### Overview
[Brief description of the feature and its purpose]

### User Stories
- As a [user type], I want to [action], so that [benefit]
- As a [user type], I want to [action], so that [benefit]
- As a [user type], I want to [action], so that [benefit]

### Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### UI/UX Requirements
- [UI requirement 1]
- [UI requirement 2]
- [UI requirement 3]

### Technical Requirements
- [Technical requirement 1]
- [Technical requirement 2]
- [Technical requirement 3]

### Component Structure
- [Parent Component]
  - [Child Component 1]
  - [Child Component 2]
  - [Child Component 3]

### State Management
- [State item 1]: [Purpose and location]
- [State item 2]: [Purpose and location]
- [State item 3]: [Purpose and location]

### API Integration
- Endpoint: [Endpoint URL]
  - Method: [HTTP Method]
  - Request: [Request format]
  - Response: [Response format]
- Endpoint: [Endpoint URL]
  - Method: [HTTP Method]
  - Request: [Request format]
  - Response: [Response format]

### Related Files
- [File path 1]: [Purpose]
- [File path 2]: [Purpose]
- [File path 3]: [Purpose]

### References
- [Design mockup link]
- [Documentation link]
- [Related feature link]
```

### Example Feature Development Context

```markdown
## Feature: Task Filtering

### Overview
The Task Filtering feature allows users to filter their tasks by various criteria including status, priority, category, and search text.

### User Stories
- As a user, I want to filter tasks by status, so that I can focus on tasks that are in a specific state
- As a user, I want to filter tasks by priority, so that I can focus on high-priority items first
- As a user, I want to search tasks by text, so that I can quickly find specific tasks
- As a user, I want to filter tasks by category, so that I can work on related tasks together

### Requirements
- Filters should be applied immediately when changed
- Multiple filters can be applied simultaneously
- Filters should be reflected in the URL for shareable links
- Filters should persist across page refreshes
- A "Reset Filters" option should be available

### UI/UX Requirements
- Filters should be displayed at the top of the task list
- Status filter should be a dropdown with All, Todo, In Progress, Completed options
- Priority filter should be buttons for All, Low, Medium, High
- Category filter should be a dropdown with all available categories
- Search should be a text input with a search icon

### Technical Requirements
- Use Zustand for managing filter state
- Synchronize filters with URL query parameters
- Use React Query for fetching filtered tasks
- Debounce search input to prevent excessive API calls

### Component Structure
- TaskDashboard
  - TaskFilters
    - StatusFilter
    - PriorityFilter
    - CategoryFilter
    - SearchInput
  - TaskList
    - TaskItem

### State Management
- tasksStore.filters: Object containing all active filters
- tasksStore.setFilter: Action to update a specific filter
- tasksStore.resetFilters: Action to reset all filters

### API Integration
- Endpoint: /api/tasks
  - Method: GET
  - Query Parameters:
    - status: string (todo, in-progress, completed)
    - priority: string (low, medium, high)
    - categoryId: string
    - search: string
  - Response: Array of Task objects

### Related Files
- src/features/tasks/components/TaskFilters/: Container for all filter components
- src/features/tasks/store/tasksStore.ts: Store for task filters state
- src/features/tasks/api/tasksApi.ts: API hooks for fetching tasks
- src/features/tasks/types.ts: TypeScript interfaces for tasks and filters

### References
- [Task Filter Design Mockup](link-to-mockup)
- [API Documentation for Tasks Endpoint](link-to-api-docs)
```

## Component Implementation Template

Use this template when implementing a specific component:

```markdown
## Component: [Component Name]

### Purpose
[Brief description of what this component does]

### Location
[File path where this component should be created]

### Props Interface
```tsx
interface [ComponentName]Props {
  /** [Prop description] */
  [propName1]: [propType];
  /** [Prop description] */
  [propName2]: [propType];
  /** [Prop description] */
  [propName3]?: [propType];
}
```

### State
- [State item 1]: [Purpose]
- [State item 2]: [Purpose]
- [State item 3]: [Purpose]

### Behaviors
- [Behavior 1]: [Description]
- [Behavior 2]: [Description]
- [Behavior 3]: [Description]

### UI/UX Requirements
- [UI requirement 1]
- [UI requirement 2]
- [UI requirement 3]

### External Dependencies
- [Dependency 1]: [Purpose]
- [Dependency 2]: [Purpose]
- [Dependency 3]: [Purpose]

### Similar Components
- [Similar component 1]: [How it's similar/different]
- [Similar component 2]: [How it's similar/different]

### Test Requirements
- [Test case 1]
- [Test case 2]
- [Test case 3]
```

### Example Component Implementation Context

```markdown
## Component: StatusFilter

### Purpose
The StatusFilter component allows users to filter tasks by their status (todo, in-progress, completed).

### Location
src/features/tasks/components/TaskFilters/StatusFilter.tsx

### Props Interface
```tsx
interface StatusFilterProps {
  /** Currently selected status */
  value?: 'todo' | 'in-progress' | 'completed';
  /** Callback when status is changed */
  onChange?: (status: 'todo' | 'in-progress' | 'completed' | undefined) => void;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** CSS class to apply to the component */
  className?: string;
}
```

### State
- No local state needed, component is controlled through props

### Behaviors
- When a status option is selected, call the onChange handler with the new status
- When "All" is selected, call onChange with undefined
- Visually indicate the currently selected status

### UI/UX Requirements
- Use DaisyUI's select component
- Include an "All" option that clears the filter
- Display friendly names: "To Do", "In Progress", "Completed"
- Use appropriate icons for each status
- Ensure the component is accessible with proper ARIA attributes

### External Dependencies
- tasksStore: For getting/setting the status filter
- Icons for each status option

### Similar Components
- PriorityFilter: Similar filter but for priority, uses buttons instead of dropdown
- CategoryFilter: Similar dropdown filter but for categories, fetches categories from API

### Test Requirements
- Should render with default "All" selected
- Should call onChange when a status is selected
- Should display the correct selected status
- Should be accessible via keyboard navigation
```

## Bug Fix Template

Use this template when fixing a bug:

```markdown
## Bug: [Bug Title]

### Description
[Detailed description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Root Cause Analysis
[Analysis of what's causing the bug]

### Proposed Solution
[Description of how to fix the bug]

### Affected Files
- [File path 1]: [Changes needed]
- [File path 2]: [Changes needed]
- [File path 3]: [Changes needed]

### Testing Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Related Issues
- [Link to related issue 1]
- [Link to related issue 2]
```

### Example Bug Fix Context

```markdown
## Bug: Task Status Not Updating in UI

### Description
When a user marks a task as completed, the status is updated in the database but the UI doesn't reflect the change until the page is refreshed.

### Steps to Reproduce
1. Log in to the application
2. Navigate to the task list
3. Click the checkbox to mark a task as completed
4. Observe that the task remains in the "Todo" section

### Expected Behavior
The task should immediately move from the "Todo" section to the "Completed" section.

### Actual Behavior
The task remains in the "Todo" section until the page is refreshed, although the API call succeeds.

### Root Cause Analysis
The updateTask mutation is correctly updating the task on the server, but is not properly invalidating the React Query cache, so the UI doesn't update.

### Proposed Solution
Modify the updateTask mutation in tasksApi.ts to properly invalidate the tasks query:

```tsx
updateTask: useMutation({
  mutationFn: async ({ id, ...updates }) => {
    const { data } = await apiClient.put<Task>(`/tasks/${id}`, updates);
    return data;
  },
  onSuccess: (data) => {
    // Add this line to invalidate the correct queries
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    queryClient.invalidateQueries({ queryKey: ['task', data.id] });
  },
})
```

### Affected Files
- src/features/tasks/api/tasksApi.ts: Update the onSuccess handler for the updateTask mutation

### Testing Steps
1. Make the proposed change
2. Log in to the application
3. Mark a task as completed
4. Verify that the task immediately moves to the "Completed" section

### Related Issues
- Issue #42: Tasks not updating in real-time
- Issue #35: React Query cache invalidation issues
```

## Refactoring Template

Use this template when refactoring existing code:

```markdown
## Refactoring: [Refactoring Title]

### Overview
[Description of what's being refactored and why]

### Current Implementation
[Description of the current implementation and its issues]

### Proposed Changes
[Description of the proposed changes]

### Benefits
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

### Affected Files
- [File path 1]: [Changes needed]
- [File path 2]: [Changes needed]
- [File path 3]: [Changes needed]

### Risks and Mitigations
- [Risk 1]: [Mitigation]
- [Risk 2]: [Mitigation]
- [Risk 3]: [Mitigation]

### Testing Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### Example Refactoring Context

```markdown
## Refactoring: Task List State Management

### Overview
Refactor the TaskList component to use Zustand for state management instead of local component state, improving reusability and sharing state across components.

### Current Implementation
Currently, the TaskList component uses useState and useEffect to fetch and store tasks. This results in duplicate data fetching when the component is used in multiple places, and doesn't allow for sharing task state across components.

```tsx
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  // Component rendering
}
```

### Proposed Changes
1. Create a tasksStore using Zustand in src/features/tasks/store/tasksStore.ts
2. Implement React Query hooks in src/features/tasks/api/tasksApi.ts
3. Refactor TaskList to use the store and React Query

```tsx
// New implementation
function TaskList() {
  const filters = useTasksStore(state => state.filters);
  const { data: tasks, isLoading, error } = useTasksQuery(filters);
  
  // Component rendering
}
```

### Benefits
- Eliminates duplicate data fetching
- Enables sharing task state across components
- Allows for more advanced features like filtering and sorting
- Improves performance by leveraging React Query's caching
- Makes testing easier by separating data fetching from rendering

### Affected Files
- src/features/tasks/components/TaskList/TaskList.tsx: Refactor to use store and React Query
- src/features/tasks/store/tasksStore.ts: Create new Zustand store
- src/features/tasks/api/tasksApi.ts: Implement React Query hooks
- src/features/tasks/types.ts: Add types for store and API

### Risks and Mitigations
- Risk: Breaking existing functionality
  Mitigation: Comprehensive tests before and after refactoring
- Risk: Performance impact during transition
  Mitigation: Implement changes incrementally, monitor performance
- Risk: Learning curve for team members
  Mitigation: Document new patterns thoroughly

### Testing Steps
1. Verify tasks load correctly with the new implementation
2. Test that filtering works as expected
3. Verify that tasks are shared properly between components
4. Check performance before and after the refactoring
```

## API Integration Template

Use this template when implementing API integration:

```markdown
## API Integration: [Feature Name]

### Overview
[Description of the API integration]

### Endpoints
- **Endpoint**: [URL]
  - **Method**: [HTTP Method]
  - **Purpose**: [Description]
  - **Request Format**:
  ```json
  {
    "field1": "type",
    "field2": "type"
  }
  ```
  - **Response Format**:
  ```json
  {
    "field1": "type",
    "field2": "type"
  }
  ```
  - **Error Handling**:
    - [Error code 1]: [Handling approach]
    - [Error code 2]: [Handling approach]

### React Query Implementation
```tsx
// Hook definitions
```

### State Integration
[Description of how the API data integrates with application state]

### Caching Strategy
- **staleTime**: [Value and rationale]
- **cacheTime**: [Value and rationale]
- **Invalidation Strategy**: [Description]

### Offline Support
[Description of offline support strategy, if applicable]

### Testing Strategy
- [Test case 1]
- [Test case 2]
- [Test case 3]
```

### Example API Integration Context

```markdown
## API Integration: Task Management

### Overview
Implement React Query hooks for fetching, creating, updating, and deleting tasks, integrating with our task management API.

### Endpoints
- **Endpoint**: `/api/tasks`
  - **Method**: GET
  - **Purpose**: Fetch tasks with optional filtering
  - **Query Parameters**:
    - `status`: 'todo' | 'in-progress' | 'completed'
    - `priority`: 'low' | 'medium' | 'high'
    - `categoryId`: string
    - `search`: string
  - **Response Format**:
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "todo | in-progress | completed",
      "priority": "low | medium | high",
      "dueDate": "string (ISO date)",
      "categoryId": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
  ```
  - **Error Handling**:
    - 401: Redirect to login
    - 403: Display permission error
    - 500: Display server error with retry option

- **Endpoint**: `/api/tasks/{id}`
  - **Method**: GET
  - **Purpose**: Fetch a single task by ID
  - **Response Format**: Same as task object above
  - **Error Handling**:
    - 404: Show task not found message
    - Other errors: Same as above

- **Endpoint**: `/api/tasks`
  - **Method**: POST
  - **Purpose**: Create a new task
  - **Request Format**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "todo | in-progress | completed",
    "priority": "low | medium | high",
    "dueDate": "string (ISO date)",
    "categoryId": "string"
  }
  ```
  - **Response Format**: Created task object
  - **Error Handling**:
    - 400: Display validation errors
    - Other errors: Same as above

- **Endpoint**: `/api/tasks/{id}`
  - **Method**: PUT
  - **Purpose**: Update an existing task
  - **Request Format**: Same as create, all fields optional
  - **Response Format**: Updated task object
  - **Error Handling**: Same as create

- **Endpoint**: `/api/tasks/{id}`
  - **Method**: DELETE
  - **Purpose**: Delete a task
  - **Response Format**: Success message or deleted task ID
  - **Error Handling**: Same as fetch single task

### React Query Implementation
```tsx
// src/features/tasks/api/tasksApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData } from '../types';

// Query hook for fetching tasks with filters
export function useTasksQuery(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>('/tasks', { params: filters });
      return data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

// Query hook for fetching a single task
export function useTaskQuery(id: string | null) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apiClient.get<Task>(`/tasks/${id}`);
      return data;
    },
    enabled: !!id, // Only run if id exists
    staleTime: 60 * 1000, // 1 minute
  });
}

// Mutation hooks for task operations
export function useTaskMutations() {
  const queryClient = useQueryClient();
  
  const createTask = useMutation({
    mutationFn: async (newTask: CreateTaskData) => {
      const { data } = await apiClient.post<Task>('/tasks', newTask);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  const updateTask = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateTaskData) => {
      const { data } = await apiClient.put<Task>(`/tasks/${id}`, updates);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
    },
  });
  
  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/tasks/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', id], null);
    },
  });
  
  return { createTask, updateTask, deleteTask };
}
```

### State Integration
- Task data will be used directly from React Query in components
- For components that need to manipulate tasks locally before saving, we'll synchronize with the tasksStore
- Tasks selected for detailed view will be cached in both React Query and the store

### Caching Strategy
- **staleTime**: 60000ms (1 minute) - Balance between freshness and network efficiency
- **cacheTime**: 300000ms (5 minutes) - Keep data available for quick navigation
- **Invalidation Strategy**:
  - Invalidate tasks list after any mutation
  - Invalidate specific task after update/delete
  - Prefetch related tasks when viewing a task

### Offline Support
- Not implemented in initial version
- Future enhancement will use service workers to queue mutations when offline

### Testing Strategy
- Mock API responses for consistent testing
- Test loading, success, and error states
- Test cache invalidation after mutations
- Test filter functionality with different parameters
- Test error handling for various error scenarios
```

## Using Context Templates Effectively

1. **Fill in the Relevant Sections**: Adapt templates to your specific needs, adding or removing sections as needed
2. **Be Specific**: Provide detailed information, avoid vague descriptions
3. **Include Examples**: Add code snippets or examples where helpful
4. **Reference Existing Code**: Point to similar implementations or relevant files
5. **Update as You Go**: Keep the context document updated as development progresses
6. **Share Decisions**: Document key decisions and their rationale

## Conclusion

By using these context templates consistently, you provide AI assistants with the information they need to deliver high-quality implementations that align with ZenTask's architecture, patterns, and requirements. The time invested in creating good context pays off in more accurate, efficient AI assistance. 