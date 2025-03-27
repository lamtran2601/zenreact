# AI Assistant Guide for ZenTask

This guide is designed for AI assistants working on the ZenTask application. It provides structured approaches to navigate the codebase, maintain context, and ensure adherence to ZenTask standards and best practices.

## 1. Understanding ZenTask Architecture

### Project Structure

ZenTask follows a feature-based architecture:

```
src/
  features/        # Feature-based modules
    auth/          # Authentication related components and logic
    tasks/         # Task management features
    profile/       # User profile management
  components/      # Shared components
    ui/            # Base UI components
    layout/        # Layout components
    feedback/      # Notifications, alerts
    form/          # Form components
  hooks/           # Shared hooks
  api/             # API client and utilities
  utils/           # Utility functions
  types/           # Shared TypeScript types
  store/           # Zustand stores
  constants/       # Application constants
  routes/          # Route definitions
  App.tsx          # Main App component
  main.tsx         # Entry point
```

### Component Hierarchy

ZenTask has the following main component hierarchy:

```
App
├── AuthenticatedLayout
│   ├── Header
│   │   ├── Logo
│   │   ├── MainNav
│   │   └── UserMenu
│   ├── Sidebar
│   │   ├── CategoryList
│   │   └── FilterOptions
│   └── MainContent
│       ├── TaskDashboard
│       │   ├── TaskStats
│       │   ├── TaskFilters
│       │   └── TaskList
│       │       └── TaskItem
│       ├── TaskDetail
│       │   ├── TaskHeader
│       │   ├── TaskDescription
│       │   └── TaskActions
│       └── Profile
│           ├── UserInfo
│           ├── ThemeSettings
│           └── AppSettings
└── UnauthenticatedLayout
    ├── Header
    │   └── Logo
    └── AuthForms
        ├── LoginForm
        ├── RegistrationForm
        └── PasswordResetForm
```

### Technology Stack

ZenTask uses the following technologies:

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **UI Components**: DaisyUI with Tailwind CSS
- **State Management**: Zustand
- **Server State**: React Query
- **Routing**: React Router
- **Testing**: Vitest and React Testing Library

## 2. Decision Framework for ZenTask

### Component Classification

Use this decision tree to determine the appropriate component type:

```
Component Purpose
├── Display UI without logic → UI Component
│   ├── Presentational only → src/components/ui/
│   └── With simple state → src/components/ui/
├── Layout structure → Layout Component
│   ├── Page layout → src/components/layout/
│   └── Component layout → src/components/layout/
├── Domain-specific UI → Feature Component
│   ├── Auth related → src/features/auth/components/
│   ├── Task related → src/features/tasks/components/
│   └── Profile related → src/features/profile/components/
└── Reusable behavior → Utility Component
    ├── Feedback → src/components/feedback/
    └── Form → src/components/form/
```

### State Management Classification

Use this decision tree to determine the appropriate state management approach:

```
State Purpose
├── UI Component State → useState/useReducer
├── Feature-specific State → Zustand Feature Store
│   ├── Auth related → src/features/auth/store/
│   ├── Task related → src/features/tasks/store/
│   └── Profile related → src/features/profile/store/
├── Application-wide State → Global Zustand Store
│   ├── Theme/UI → src/store/uiStore.ts
│   └── User → src/store/userStore.ts
└── Server Data → React Query
    ├── Auth data → src/features/auth/api/
    ├── Task data → src/features/tasks/api/
    └── Profile data → src/features/profile/api/
```

## 3. Context Assessment Framework

Before implementing any solution, gather this critical information:

### Initial Context Questionnaire

```
1. Feature Area:
   □ Authentication
   □ Task Management
   □ User Profile
   □ UI Components
   □ Other

2. Component Requirements:
   □ What UI elements are needed?
   □ What interactions should be supported?
   □ What states should be managed?
   □ What data sources are required?

3. State Management Needs:
   □ UI State (component appearance/behavior)
   □ Feature State (domain-specific business logic)
   □ Application State (global settings/user info)
   □ Server State (API data)

4. Integration Points:
   □ What existing components will this interact with?
   □ What existing stores will this use?
   □ What APIs will be called?
   □ What routes will be affected?

5. Technical Constraints:
   □ Accessibility requirements
   □ Performance considerations
   □ Browser compatibility needs
   □ Mobile responsiveness requirements
```

### Context Maintenance Structure

Maintain this structure throughout the conversation:

```json
{
  "project_context": {
    "current_feature": "[Feature name]",
    "active_components": ["ComponentA", "ComponentB"],
    "related_files": ["path/to/component.tsx", "path/to/store.ts"],
    "component_hierarchy": ["App > Layout > FeatureComponent"],
    "state_dependencies": ["useTasksStore", "useUserQuery"]
  },
  "development_progress": {
    "completed": ["Component structure", "Props interface"],
    "in_progress": ["State management", "Event handlers"],
    "pending": ["Styling", "Testing", "Documentation"]
  },
  "implementation_decisions": [
    {
      "decision": "[Decision made]",
      "rationale": "[Reasoning]",
      "alternatives_considered": ["Alternative A", "Alternative B"]
    }
  ]
}
```

## 4. Implementation Workflow Process

Follow this consistent workflow for all ZenTask implementations:

### Phase 1: Context Gathering

1. **Analyze Request**
   - Identify the core task (feature, bug fix, refactoring)
   - Note specific requirements or constraints
   - Determine the feature area (Auth, Tasks, Profile)

2. **Explore Existing Code** (if applicable)
   - Understand component hierarchy
   - Identify state management patterns in use
   - Note coding patterns and conventions

3. **Complete Context Questionnaire**
   - Fill out the context framework
   - Identify missing information
   - Ask targeted questions to complete context

### Phase 2: Planning

1. **Component Classification**
   - Determine appropriate component type using decision tree
   - Decide on component organization
   - Plan component interface (props)

2. **State Management Strategy**
   - Categorize state needs using decision tree
   - Select appropriate state management approach
   - Plan state structure and update patterns

3. **Integration Planning**
   - Identify dependencies and integration points
   - Plan hooks and store connections
   - Consider error handling and edge cases

### Phase 3: Implementation

1. **Structure Definition**
   - Create file/directory structure
   - Define interfaces and types
   - Outline component structure

2. **Core Implementation**
   - Implement component logic
   - Implement state management
   - Implement API integration
   - Add styles using Tailwind/DaisyUI

3. **Testing**
   - Create unit tests for components
   - Test state management logic
   - Verify functionality against requirements

4. **Documentation**
   - Add JSDoc comments
   - Update relevant documentation

### Phase 4: Validation

1. **Standards Compliance**
   - Verify adherence to coding standards
   - Check component naming conventions
   - Ensure consistent state management

2. **Performance Review**
   - Check for unnecessary re-renders
   - Verify proper memoization
   - Ensure efficient API data handling

3. **Accessibility Verification**
   - Verify semantic HTML
   - Check keyboard navigation
   - Ensure proper ARIA attributes

## 5. Component Implementation Patterns

### UI Component Pattern

```tsx
// src/components/ui/Button.tsx
import React from 'react';

export interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** The variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  // Class mapping for variants
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  return (
    <button
      className={`btn ${variantClasses[variant]}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
```

### Feature Component Pattern

```tsx
// src/features/tasks/components/TaskList.tsx
import React from 'react';
import { useTasksStore } from '../store/tasksStore';
import { useTasksQuery } from '../api/tasksApi';
import TaskItem from './TaskItem';
import { Card, Spinner, EmptyState } from '@/components/ui';

function TaskList() {
  const { filters } = useTasksStore();
  const { data: tasks, isLoading, error } = useTasksQuery(filters);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <EmptyState message="Error loading tasks" />;
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyState message="No tasks found" />;
  }

  return (
    <Card>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}

export default TaskList;
```

### Zustand Store Pattern

```ts
// src/features/tasks/store/tasksStore.ts
import { create } from 'zustand';

interface TaskFilters {
  status?: 'todo' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  categoryId?: string;
}

interface TasksState {
  filters: TaskFilters;
  setFilter: (key: keyof TaskFilters, value: string | undefined) => void;
  resetFilters: () => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  filters: {},
  setFilter: (key, value) => 
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  resetFilters: () => set({ filters: {} }),
}));
```

### React Query Pattern

```ts
// src/features/tasks/api/tasksApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData } from '../types';

export function useTasksQuery(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>('/tasks', { params: filters });
      return data;
    },
  });
}

export function useTaskMutation() {
  const queryClient = useQueryClient();
  
  return {
    createTask: useMutation({
      mutationFn: async (taskData: CreateTaskData) => {
        const { data } = await apiClient.post<Task>('/tasks', taskData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    }),
    
    updateTask: useMutation({
      mutationFn: async ({ id, ...taskData }: UpdateTaskData) => {
        const { data } = await apiClient.put<Task>(`/tasks/${id}`, taskData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    }),
    
    deleteTask: useMutation({
      mutationFn: async (id: string) => {
        await apiClient.delete(`/tasks/${id}`);
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    }),
  };
}
```

## 6. Common Implementation Scenarios

### Feature Development

For developing a new feature:

1. Analyze the feature requirements
2. Create necessary types in `features/{feature}/types.ts`
3. Implement API integration in `features/{feature}/api/`
4. Create state management in `features/{feature}/store/`
5. Implement components in `features/{feature}/components/`
6. Add routes in `routes/` if needed
7. Integrate with the rest of the application

### Bug Fixing

For fixing bugs:

1. Understand the bug and its context
2. Locate the affected components and files
3. Identify the root cause
4. Implement the fix following existing patterns
5. Add tests to prevent regression

### Refactoring

For refactoring code:

1. Understand the current implementation
2. Identify improvement opportunities
3. Plan the refactoring strategy
4. Implement changes incrementally
5. Verify functionality with tests

## 7. Troubleshooting Guide

Common issues and their solutions:

1. **Component re-rendering too often**
   - Check dependency arrays in useEffect/useMemo/useCallback
   - Verify memoization of expensive calculations
   - Ensure proper use of React.memo for components

2. **State updates not working correctly**
   - Verify proper use of state setters
   - Check for async state updates that might be overwritten
   - Ensure correct use of state updater functions

3. **API data not refreshing**
   - Check React Query invalidation logic
   - Verify query keys are correctly structured
   - Ensure proper error handling

4. **UI inconsistencies**
   - Verify correct use of Tailwind/DaisyUI classes
   - Check responsive design rules
   - Review component composition

## 8. Best Practices

1. **Follow established patterns**
   - Refer to existing components for similar use cases
   - Use the same state management approach for similar needs
   - Maintain consistent file structure and naming

2. **Focus on maintainability**
   - Keep components small and focused
   - Extract complex logic to custom hooks
   - Use descriptive naming for functions and variables

3. **Prioritize type safety**
   - Define comprehensive interfaces for props and state
   - Avoid using any or unknown types
   - Use proper TypeScript utilities

4. **Ensure performant implementations**
   - Memoize expensive calculations
   - Use proper React Query options for caching
   - Implement virtualization for long lists

5. **Write comprehensive tests**
   - Test component rendering
   - Test state management logic
   - Test edge cases and error scenarios

## Conclusion

This guide provides a framework for AI assistants to effectively contribute to the ZenTask project. By following these patterns and practices, AI can help maintain a consistent, high-quality codebase while accelerating development. 