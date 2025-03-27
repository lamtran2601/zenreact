# AI Implementation Techniques for ZenTask

This guide provides specific techniques for AI assistants to effectively implement features, fix bugs, and enhance the ZenTask application. It focuses on practical approaches for working with the ZenTask architecture, patterns, and technologies.

## Component Implementation Techniques

### Creating New Components

Follow this step-by-step process when implementing new components:

#### 1. Determine Component Type

Based on the component's purpose, categorize it as:
- **UI Component**: Reusable, presentational, minimal logic (Button, Card, etc.)
- **Layout Component**: Structure for page or content organization
- **Feature Component**: Domain-specific with business logic (TaskList, TaskForm, etc.)
- **Utility Component**: Functional behaviors (Toast, Modal, etc.)

#### 2. Create Component File Structure

For UI Components:
```
src/components/ui/ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.test.tsx # Tests
└── index.ts               # Export file
```

For Feature Components:
```
src/features/featureName/components/ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.test.tsx # Tests
└── index.ts               # Export file
```

#### 3. Define Component Interface

Start with a clear TypeScript interface:

```tsx
export interface ButtonProps {
  /** Description of what children should be */
  children: React.ReactNode;
  /** Description of the variant property */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Description of the size property */
  size?: 'sm' | 'md' | 'lg';
  /** Description of the onClick handler */
  onClick?: () => void;
  /** Description of the disabled state */
  disabled?: boolean;
}
```

Key techniques:
- Use JSDoc comments for each prop
- Make props optional when appropriate
- Use specific types rather than `any`
- Group related props into sub-objects if complex

#### 4. Implement Component Structure

Template for a functional component:

```tsx
import React from 'react';

export interface ComponentNameProps {
  // Props definition
}

function ComponentName({ prop1, prop2, prop3 = defaultValue }: ComponentNameProps) {
  // Hooks at the top
  const [state, setState] = useState(initialState);
  
  // Event handlers
  const handleEvent = () => {
    // Implementation
  };
  
  // Derived values/Conditional logic
  const derivedValue = useMemo(() => {
    // Calculation
    return result;
  }, [dependencies]);
  
  // Conditional rendering
  if (someCondition) {
    return <AlternateView />;
  }
  
  // Main return
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
}

export default ComponentName;
```

#### 5. Add Styling

Use Tailwind CSS with DaisyUI following these patterns:

```tsx
<button 
  className={`
    btn 
    ${variant === 'primary' ? 'btn-primary' : 
      variant === 'secondary' ? 'btn-secondary' : 'btn-outline'}
    ${size === 'sm' ? 'btn-sm' : 
      size === 'lg' ? 'btn-lg' : ''}
    ${className}
  `}
  disabled={disabled}
  onClick={onClick}
>
  {children}
</button>
```

Key techniques:
- Use Tailwind's utility classes directly
- Leverage DaisyUI components for common UI elements
- Use template literals with conditional classes
- Allow className prop for customization

#### 6. Export Component

Use a clean export in index.ts:

```tsx
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### Creating Interactive Components

For components with user interactions:

#### 1. Define Event Handlers

```tsx
// Internal handler
const handleClick = () => {
  // Internal state updates
  setIsOpen(!isOpen);
  // Then call passed handler if it exists
  if (onClick) {
    onClick();
  }
};
```

#### 2. Manage Local State

```tsx
// Simple toggle state
const [isOpen, setIsOpen] = useState(false);

// Complex state with useReducer
type State = {
  isOpen: boolean;
  activeIndex: number;
  error: string | null;
};

type Action = 
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_INDEX'; payload: number }
  | { type: 'SET_ERROR'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET_INDEX':
      return { ...state, activeIndex: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, {
  isOpen: false,
  activeIndex: 0,
  error: null,
});
```

#### 3. Implement Keyboard Accessibility

```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick();
    event.preventDefault();
  } else if (event.key === 'Escape') {
    setIsOpen(false);
    event.preventDefault();
  }
};

return (
  <div 
    role="button"
    tabIndex={0}
    onKeyDown={handleKeyDown}
    onClick={handleClick}
    aria-expanded={isOpen}
  >
    {/* Component content */}
  </div>
);
```

## State Management Techniques

### Implementing Zustand Stores

#### 1. Define Store Types

```tsx
// src/features/tasks/types.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  categoryId?: string;
}

export interface TaskFilters {
  status?: 'todo' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  categoryId?: string;
}
```

#### 2. Create Store Structure

```tsx
// src/features/tasks/store/tasksStore.ts
import { create } from 'zustand';
import { Task, TaskFilters } from '../types';

interface TasksState {
  // State properties
  tasks: Task[];
  filters: TaskFilters;
  selectedTaskId: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  setFilter: (key: keyof TaskFilters, value: string | undefined) => void;
  resetFilters: () => void;
  selectTask: (id: string | null) => void;
  
  // Selectors (optional, can also use computed values in components)
  filteredTasks: Task[];
}

export const useTasksStore = create<TasksState>((set, get) => ({
  // Initial state
  tasks: [],
  filters: {},
  selectedTaskId: null,
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  resetFilters: () => set({ filters: {} }),
  
  selectTask: (id) => set({ selectedTaskId: id }),
  
  // Computed values
  get filteredTasks() {
    const { tasks, filters } = get();
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.categoryId && task.categoryId !== filters.categoryId) return false;
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }
}));
```

#### 3. Use Zustand Store in Components

```tsx
import { useTasksStore } from '../store/tasksStore';

function TaskList() {
  // Use specific selections from the store rather than the whole store
  const { filteredTasks, selectedTaskId, selectTask } = useTasksStore();
  
  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          isSelected={task.id === selectedTaskId}
          onSelect={() => selectTask(task.id)}
        />
      ))}
    </div>
  );
}
```

### Implementing React Query Hooks

#### 1. Create API Client

```tsx
// src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., authentication)
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

#### 2. Create Feature API Hooks

```tsx
// src/features/tasks/api/tasksApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData } from '../types';

// Query hook for fetching tasks
export function useTasksQuery(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>('/tasks', { 
        params: filters 
      });
      return data;
    },
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

#### 3. Use React Query in Components

```tsx
import { useTasksQuery, useTaskMutations } from '../api/tasksApi';
import { useTasksStore } from '../store/tasksStore';

function TaskList() {
  // Get filters from store
  const { filters } = useTasksStore();
  
  // Use React Query for data fetching
  const { data: tasks, isLoading, error } = useTasksQuery(filters);
  const { deleteTask } = useTaskMutations();
  
  // Handle loading state
  if (isLoading) {
    return <div className="loading"><span className="loading-spinner"></span></div>;
  }
  
  // Handle error state
  if (error) {
    return <div className="error">Error loading tasks: {error.message}</div>;
  }
  
  // Handle empty state
  if (!tasks?.length) {
    return <div className="empty-state">No tasks found</div>;
  }
  
  // Render tasks
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onDelete={() => {
            deleteTask.mutate(task.id);
          }}
        />
      ))}
    </div>
  );
}
```

## Common Implementation Patterns

### Error Handling

#### Component Error Boundaries

```tsx
// src/components/feedback/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button 
            className="btn btn-primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### Form Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
  categoryId: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

function TaskForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: 'todo',
      priority: 'medium',
    },
  });
  
  const submitHandler = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
          {...register('title')}
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">{errors.title.message}</span>
        )}
      </div>
      
      {/* Other form fields */}
      
      <button type="submit" className="btn btn-primary mt-4">
        Save Task
      </button>
    </form>
  );
}
```

### Performance Optimization

#### Memoization

```tsx
import React, { useMemo, useCallback } from 'react';

function TaskList({ tasks, onTaskSelect }) {
  // Memoize expensive calculations
  const tasksByStatus = useMemo(() => {
    const result = {
      todo: [],
      inProgress: [],
      completed: [],
    };
    
    tasks.forEach(task => {
      if (task.status === 'todo') result.todo.push(task);
      else if (task.status === 'in-progress') result.inProgress.push(task);
      else if (task.status === 'completed') result.completed.push(task);
    });
    
    return result;
  }, [tasks]);
  
  // Memoize event handlers
  const handleTaskSelect = useCallback((taskId: string) => {
    onTaskSelect(taskId);
  }, [onTaskSelect]);
  
  return (
    <div className="task-columns">
      <div className="task-column">
        <h3>To Do ({tasksByStatus.todo.length})</h3>
        {tasksByStatus.todo.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onSelect={() => handleTaskSelect(task.id)}
          />
        ))}
      </div>
      {/* Other columns */}
    </div>
  );
}

// Memoize the component itself if needed
export default React.memo(TaskList);
```

#### Virtualized Lists

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function VirtualizedTaskList({ tasks }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // estimated row height
  });
  
  return (
    <div 
      ref={parentRef}
      className="task-list-container"
      style={{ height: '400px', overflow: 'auto' }}
    >
      <div 
        style={{ 
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <TaskItem task={tasks[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Testing Techniques

### Component Testing

```tsx
// src/features/tasks/components/TaskItem/TaskItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskItem from './TaskItem';

const mockTask = {
  id: '1',
  title: 'Test Task',
  status: 'todo',
  priority: 'medium',
  description: 'This is a test task',
};

describe('TaskItem', () => {
  test('renders task details correctly', () => {
    render(<TaskItem task={mockTask} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });
  
  test('calls onSelect when clicked', () => {
    const handleSelect = vi.fn();
    render(<TaskItem task={mockTask} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Test Task'));
    expect(handleSelect).toHaveBeenCalledWith('1');
  });
  
  test('displays the correct status indicator', () => {
    render(<TaskItem task={mockTask} />);
    
    const statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass('bg-blue-500'); // Assuming todo = blue
  });
});
```

### Store Testing

```tsx
// src/features/tasks/store/tasksStore.test.ts
import { beforeEach, describe, expect, it } from 'vitest';
import { useTasksStore } from './tasksStore';

describe('tasksStore', () => {
  beforeEach(() => {
    useTasksStore.setState({
      tasks: [],
      filters: {},
      selectedTaskId: null,
    });
  });
  
  it('should set tasks', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', status: 'todo', priority: 'low' },
      { id: '2', title: 'Task 2', status: 'in-progress', priority: 'medium' },
    ];
    
    useTasksStore.getState().setTasks(mockTasks);
    
    expect(useTasksStore.getState().tasks).toEqual(mockTasks);
  });
  
  it('should set filters correctly', () => {
    useTasksStore.getState().setFilter('status', 'completed');
    useTasksStore.getState().setFilter('priority', 'high');
    
    expect(useTasksStore.getState().filters).toEqual({
      status: 'completed',
      priority: 'high',
    });
  });
  
  it('should reset filters', () => {
    useTasksStore.getState().setFilter('status', 'completed');
    useTasksStore.getState().resetFilters();
    
    expect(useTasksStore.getState().filters).toEqual({});
  });
  
  it('should filter tasks correctly', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', status: 'todo', priority: 'low' },
      { id: '2', title: 'Task 2', status: 'in-progress', priority: 'medium' },
      { id: '3', title: 'Task 3', status: 'completed', priority: 'high' },
    ];
    
    useTasksStore.setState({ tasks: mockTasks });
    useTasksStore.getState().setFilter('status', 'completed');
    
    const filteredTasks = useTasksStore.getState().filteredTasks;
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe('3');
  });
});
```

## Integration Techniques

### Route Configuration

```tsx
// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import UnauthenticatedLayout from '@/components/layout/UnauthenticatedLayout';
import TaskDashboard from '@/features/tasks/components/TaskDashboard';
import TaskDetail from '@/features/tasks/components/TaskDetail';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import ProfileSettings from '@/features/profile/components/ProfileSettings';
import ProtectedRoute from '@/components/routing/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <TaskDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tasks/:taskId',
        element: (
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <UnauthenticatedLayout />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
```

### URL Synchronization with State

```tsx
// src/features/tasks/hooks/useUrlFilters.ts
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTasksStore } from '../store/tasksStore';
import { TaskFilters } from '../types';

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilter, resetFilters } = useTasksStore();
  
  // Update URL from state
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.status) newParams.set('status', filters.status);
    if (filters.priority) newParams.set('priority', filters.priority);
    if (filters.categoryId) newParams.set('categoryId', filters.categoryId);
    if (filters.search) newParams.set('search', filters.search);
    
    setSearchParams(newParams, { replace: true });
  }, [filters, setSearchParams]);
  
  // Update state from URL on mount
  useEffect(() => {
    resetFilters();
    
    const status = searchParams.get('status') as TaskFilters['status'];
    const priority = searchParams.get('priority') as TaskFilters['priority'];
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    
    if (status) setFilter('status', status);
    if (priority) setFilter('priority', priority);
    if (categoryId) setFilter('categoryId', categoryId);
    if (search) setFilter('search', search);
  }, [searchParams, setFilter, resetFilters]);
}
```

## Conclusion

These implementation techniques provide a structured approach to developing the ZenTask application. By following these patterns consistently, AI assistants can ensure high-quality, maintainable code that aligns with the established architecture and best practices.

Remember to:
1. Follow the established component structure and naming conventions
2. Use appropriate state management for different types of state
3. Apply error handling and loading states consistently
4. Optimize performance where needed
5. Write comprehensive tests for components and state management
6. Maintain proper separation of concerns between UI, state, and business logic 