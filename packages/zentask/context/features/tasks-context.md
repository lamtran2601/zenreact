# Tasks Feature Context

## Feature Overview
The Tasks feature is the core functionality of ZenTask, allowing users to create, view, update, delete, filter, and organize tasks.

## User Stories
- As a user, I want to create new tasks with title, description, due date, status, and priority
- As a user, I want to view all my tasks in a list format
- As a user, I want to filter tasks by status, priority, and category
- As a user, I want to search for tasks by title or description
- As a user, I want to mark tasks as complete
- As a user, I want to edit task details
- As a user, I want to delete tasks I no longer need
- As a user, I want to organize tasks into categories
- As a user, I want to see task statistics (completed vs. pending)

## Components
### TaskList
**Purpose**: Display a list of tasks with filtering capabilities
**Props**:
- `filter`: Optional filter parameters

**State**:
- List of tasks
- Loading state
- Error state
- Selected task

**Behavior**:
- Fetch tasks based on filter criteria
- Display tasks in a list format
- Handle loading and error states
- Allow selection of tasks for detailed view

### TaskItem
**Purpose**: Display individual task information in the list
**Props**:
- `task`: Task data
- `onSelect`: Callback when task is selected
- `onStatusChange`: Callback when task status is changed
- `onDelete`: Callback when task is deleted

**State**:
- Hover state
- Loading state for actions

**Behavior**:
- Display task information (title, status, priority, due date)
- Allow quick status change
- Provide actions for edit/delete
- Handle click for selection

### TaskForm
**Purpose**: Create or edit tasks
**Props**:
- `task`: Optional task for editing (null for creation)
- `onSubmit`: Callback when form is submitted
- `onCancel`: Callback when form is cancelled

**State**:
- Form input values
- Form validation state
- Form submission state

**Behavior**:
- Handle both creation and editing
- Validate all input fields
- Submit task data to API
- Handle success/error states
- Reset form or close modal on completion

### TaskFilters
**Purpose**: Provide filtering controls for the task list
**Props**:
- `onFilterChange`: Callback when filters change

**State**:
- Current filter values
- Available filter options

**Behavior**:
- Allow filtering by status
- Allow filtering by priority
- Allow filtering by category
- Allow text search
- Apply filters to the task list

### TaskStats
**Purpose**: Display statistics about tasks
**Props**:
- `tasks`: List of tasks to analyze

**State**: None (derived from props)

**Behavior**:
- Calculate and display count of total tasks
- Calculate and display counts by status
- Calculate and display counts by priority
- Show completion percentage

## State Management
### tasksStore (Zustand)
**State**:
```typescript
interface TasksState {
  tasks: Task[];
  selectedTaskId: string | null;
  isLoading: boolean;
  error: string | null;
  
  setTasks: (tasks: Task[]) => void;
  selectTask: (id: string | null) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  clearError: () => void;
}
```

### filtersStore (Zustand)
**State**:
```typescript
interface TaskFilters {
  status?: 'todo' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  categoryId?: string;
  search?: string;
}

interface FiltersState {
  filters: TaskFilters;
  
  setFilter: (key: keyof TaskFilters, value: string | undefined) => void;
  resetFilters: () => void;
}
```

## API Endpoints
| Endpoint | Method | Purpose | Payload | Response |
|----------|--------|---------|---------|----------|
| `/api/tasks` | GET | Get tasks with filters | Query params for filters | `Task[]` |
| `/api/tasks/:id` | GET | Get task by ID | - | `Task` |
| `/api/tasks` | POST | Create a new task | `Task` (without ID) | `Task` |
| `/api/tasks/:id` | PUT | Update task | `Partial<Task>` | `Task` |
| `/api/tasks/:id` | DELETE | Delete task | - | Success message |
| `/api/categories` | GET | Get all categories | - | `Category[]` |
| `/api/categories` | POST | Create category | `Category` (without ID) | `Category` |
| `/api/categories/:id` | PUT | Update category | `Partial<Category>` | `Category` |
| `/api/categories/:id` | DELETE | Delete category | - | Success message |

## Data Structures
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  categoryId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
}

interface TaskStats {
  total: number;
  byStatus: {
    todo: number;
    inProgress: number;
    completed: number;
  };
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  completionPercentage: number;
}
```

## React Query Integration
```typescript
// Task queries and mutations
const useTasksQuery = (filters: TaskFilters = {}) => 
  useQuery({
    queryKey: ['tasks', filters], 
    queryFn: () => fetchTasks(filters)
  });

const useTaskQuery = (id: string) => 
  useQuery({
    queryKey: ['task', id], 
    queryFn: () => fetchTask(id),
    enabled: !!id
  });

const useTaskMutations = () => {
  const queryClient = useQueryClient();
  
  return {
    createTask: useMutation({
      mutationFn: createTask,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }),
    updateTask: useMutation({
      mutationFn: updateTask,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }),
    deleteTask: useMutation({
      mutationFn: deleteTask,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
    })
  };
};

// Category queries and mutations
const useCategoriesQuery = () => 
  useQuery({
    queryKey: ['categories'], 
    queryFn: fetchCategories
  });
```

## Dependencies
- React Hook Form for form management
- Zod for schema validation
- React Query for API requests
- Date-fns for date handling and formatting

## Test Scenarios
1. User can create a new task with all required fields
2. User can view a list of tasks
3. User can filter tasks by status, priority, and category
4. User can search for tasks
5. User can edit an existing task
6. User can delete a task
7. User can mark a task as complete
8. User can create and manage categories
9. Task list properly updates when filters change
10. Task statistics correctly reflect the task data

## Edge Cases
- Handle empty task list gracefully
- Handle network errors during API calls
- Optimize for large numbers of tasks
- Handle task conflicts (simultaneous edits)
- Provide offline support with optimistic updates

## Implementation Notes
- Use virtualization for long task lists
- Implement optimistic updates for better UX
- Consider batch operations for multiple tasks
- Ensure keyboard accessibility for task management
- Implement proper loading states for all operations 