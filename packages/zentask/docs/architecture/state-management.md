# State Management in ZenTask

This guide outlines the state management approach for the ZenTask application, explaining how different types of state are handled using Zustand, React Query, and React's built-in state management.

## State Management Philosophy

ZenTask follows these core principles for state management:

1. **Appropriate Scope**: Place state at the appropriate level of the component hierarchy
2. **Clear Boundaries**: Establish clear boundaries between different types of state
3. **Consistent Patterns**: Use consistent patterns for each type of state
4. **Explicit Relationships**: Make data flow and state relationships explicit
5. **Optimized Updates**: Minimize unnecessary re-renders from state changes

## State Categories

### 1. UI State

**Definition**: State that controls UI elements and interactions.

**Examples**:
- Form input values
- Modal open/closed status
- Accordion expanded/collapsed state
- Tab selection
- Hover/focus states

**Approach**: 
- Local component state with `useState` or `useReducer`
- Lifted state for shared UI elements

**Example**:
```tsx
function TaskForm() {
  // Simple form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createTask({ title, description });
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 2. Feature State

**Definition**: State that is specific to a feature but may be shared across multiple components within that feature.

**Examples**:
- Active task filters
- Selected task
- Task category selection
- Task sorting options

**Approach**: 
- Zustand feature store

**Example**:
```tsx
// src/features/tasks/store/tasksStore.ts
import { create } from 'zustand';
import { TaskFilters } from '../types';

interface TasksState {
  filters: TaskFilters;
  selectedTaskId: string | null;
  
  setFilter: (key: keyof TaskFilters, value: string | undefined) => void;
  resetFilters: () => void;
  selectTask: (id: string | null) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  filters: {},
  selectedTaskId: null,
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  resetFilters: () => set({ filters: {} }),
  
  selectTask: (id) => set({ selectedTaskId: id }),
}));
```

### 3. Global Application State

**Definition**: State that affects multiple features across the application.

**Examples**:
- User authentication
- Theme settings
- Global notifications
- Application settings

**Approach**: 
- Zustand global store

**Example**:
```tsx
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setToken: (token) => set({ token }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
```

### 4. Server State

**Definition**: Data fetched from APIs that represents server-side state.

**Examples**:
- Task data
- User profile data
- Categories
- Activity history

**Approach**: 
- React Query

**Example**:
```tsx
// src/features/tasks/api/tasksApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { Task, TaskFilters } from '../types';

export function useTasksQuery(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>('/tasks', { params: filters });
      return data;
    },
  });
}

export function useTaskMutations() {
  const queryClient = useQueryClient();
  
  const createTask = useMutation({
    mutationFn: async (task: Omit<Task, 'id'>) => {
      const { data } = await apiClient.post<Task>('/tasks', task);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  return { createTask };
}
```

## State Management Decision Tree

Use this decision tree to determine where to place state:

```
Is the state only used by a single component and not persisted?
├── Yes: Use React's useState/useReducer
└── No: Is the state specific to a single feature?
    ├── Yes: Use a feature-specific Zustand store
    └── No: Is the state from a server?
        ├── Yes: Use React Query
        └── No: Use a global Zustand store
```

## Implementing Zustand Stores

### Global Stores

Global stores are placed in the `/src/store` directory and export hooks for consuming the store:

```tsx
// src/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  sidebarCollapsed: false,
  
  setTheme: (theme) => set({ theme }),
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
}));
```

### Feature Stores

Feature stores are placed within each feature directory in the `/src/features/{feature}/store` directory:

```tsx
// src/features/tasks/store/categoriesStore.ts
import { create } from 'zustand';
import { Category } from '../types';

interface CategoriesState {
  categories: Category[];
  selectedCategoryId: string | null;
  
  setCategories: (categories: Category[]) => void;
  selectCategory: (id: string | null) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  selectedCategoryId: null,
  
  setCategories: (categories) => set({ categories }),
  
  selectCategory: (id) => set({ selectedCategoryId: id }),
  
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category]
  })),
  
  updateCategory: (id, updates) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === id ? { ...category, ...updates } : category
    )
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id),
    selectedCategoryId: state.selectedCategoryId === id ? null : state.selectedCategoryId
  })),
}));
```

## Using State in Components

### Using Zustand Stores

```tsx
import { useTasksStore } from '@/features/tasks/store/tasksStore';
import { useCategoriesStore } from '@/features/tasks/store/categoriesStore';
import { useUIStore } from '@/store/uiStore';

function TaskFilters() {
  // Select only the necessary pieces of state
  const { filters, setFilter, resetFilters } = useTasksStore();
  const { categories } = useCategoriesStore();
  const { theme } = useUIStore();
  
  // Component implementation
}
```

### Using React Query

```tsx
import { useTasksQuery } from '@/features/tasks/api/tasksApi';
import { useTasksStore } from '@/features/tasks/store/tasksStore';

function TaskList() {
  // Get filters from Zustand store
  const filters = useTasksStore((state) => state.filters);
  
  // Use filters with React Query
  const { data: tasks, isLoading, error } = useTasksQuery(filters);
  
  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }
  
  if (error) {
    return <div className="error">Error loading tasks</div>;
  }
  
  return (
    <div className="task-list">
      {tasks?.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
```

## State Synchronization

### Synchronizing Zustand with React Query

```tsx
import { useEffect } from 'react';
import { useTasksQuery } from '@/features/tasks/api/tasksApi';
import { useTasksStore } from '@/features/tasks/store/tasksStore';

function TaskSynchronizer() {
  const { data: tasks } = useTasksQuery();
  const setTasks = useTasksStore((state) => state.setTasks);
  
  // Sync tasks from React Query to Zustand
  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks, setTasks]);
  
  return null; // This is a non-rendering component
}
```

### Synchronizing State with URL Parameters

```tsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTasksStore } from '@/features/tasks/store/tasksStore';

function TaskFiltersSynchronizer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilter, resetFilters } = useTasksStore();
  
  // URL to state
  useEffect(() => {
    resetFilters();
    
    const status = searchParams.get('status');
    if (status) setFilter('status', status);
    
    const priority = searchParams.get('priority');
    if (priority) setFilter('priority', priority);
    
    const categoryId = searchParams.get('categoryId');
    if (categoryId) setFilter('categoryId', categoryId);
  }, [searchParams, setFilter, resetFilters]);
  
  // State to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    if (filters.categoryId) params.set('categoryId', filters.categoryId);
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  
  return null; // This is a non-rendering component
}
```

## State Persistence

### Local Storage Persistence with Zustand

```tsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  language: string;
  notifications: boolean;
  // Other settings
  
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      notifications: true,
      
      setLanguage: (language) => set({ language }),
      setNotifications: (notifications) => set({ notifications }),
    }),
    {
      name: 'user-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

## Advanced Patterns

### Computed Values

```tsx
// In a Zustand store
export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  filters: {},
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  // Computed values
  get filteredTasks() {
    const { tasks, filters } = get();
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      // Additional filtering logic
      return true;
    });
  },
  
  get tasksByStatus() {
    const { filteredTasks } = get();
    return {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      inProgress: filteredTasks.filter(task => task.status === 'in-progress'),
      completed: filteredTasks.filter(task => task.status === 'completed'),
    };
  },
}));
```

### Combining Multiple Stores

```tsx
import { useEffect } from 'react';
import { useTasksStore } from '@/features/tasks/store/tasksStore';
import { useCategoriesStore } from '@/features/tasks/store/categoriesStore';
import { useAuthStore } from '@/store/authStore';

function TaskDashboard() {
  const { tasks, setTasks } = useTasksStore();
  const { categories } = useCategoriesStore();
  const { user } = useAuthStore();
  
  // Example of combining multiple stores for complex logic
  useEffect(() => {
    if (user && categories.length && !tasks.length) {
      // Fetch tasks specific to the user, considering categories
      fetchUserTasksWithCategories(user.id, categories)
        .then(setTasks);
    }
  }, [user, categories, tasks, setTasks]);
  
  // Component implementation
}
```

## State Management Best Practices

1. **Select Specific State**: 
   - Only select the specific state needed by components to avoid unnecessary re-renders
   - Use selector functions: `const count = useCountStore((state) => state.count)`

2. **Granular Updates**: 
   - Update only the specific parts of state that change
   - Avoid large state objects that cause unnecessary re-renders

3. **Separate Read/Write Concerns**: 
   - Separate components that read state from those that update state when possible
   - Consider the container/presenter pattern for complex components

4. **Handle Side Effects Outside Components**: 
   - Use React Query for data fetching
   - Consider using store middleware for complex side effects

5. **Memoize Expensive Calculations**: 
   - Use `useMemo` for expensive derived state
   - Consider store-level computed values for shared derived state

6. **Avoid State Duplication**: 
   - Don't duplicate state across different stores
   - Use a single source of truth for each piece of state

7. **Keep State Normalized**: 
   - For complex relational data, keep state normalized (similar to a database)
   - Use IDs to reference related entities

8. **Optimize React Query**:
   - Set appropriate staleTime and cacheTime values
   - Use query keys strategically
   - Implement proper error handling

## Conclusion

ZenTask's state management approach leverages the strengths of different libraries for different types of state:

- **Component State**: React's useState/useReducer for local UI state
- **Feature State**: Zustand feature stores for state shared within a feature
- **Global State**: Zustand global stores for application-wide state
- **Server State**: React Query for API data with caching and synchronization

By following these patterns consistently, ZenTask maintains a predictable, maintainable state management architecture that scales with the application's complexity. 