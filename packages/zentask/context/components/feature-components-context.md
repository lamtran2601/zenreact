# Feature Components Context

This document outlines the feature-specific components used throughout the ZenTask application. These components are tailored to specific functional areas and provide domain-specific functionality.

## Authentication Feature Components

### LoginForm
- **Purpose**: Allow users to log in to the application
- **Location**: `src/features/auth/components/LoginForm`
- **Dependencies**: 
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Button, Alert)
  - authStore for authentication state
- **API Interactions**: Calls login API endpoint

### RegistrationForm
- **Purpose**: Allow users to register for a new account
- **Location**: `src/features/auth/components/RegistrationForm`
- **Dependencies**:
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Button, Alert)
  - authStore for authentication state
- **API Interactions**: Calls registration API endpoint

### PasswordResetForm
- **Purpose**: Allow users to reset their password
- **Location**: `src/features/auth/components/PasswordResetForm`
- **Dependencies**:
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Button, Alert)
  - authStore for authentication state
- **API Interactions**: Calls password reset API endpoints

## Task Management Feature Components

### TaskList
- **Purpose**: Display a list of tasks with filtering capabilities
- **Location**: `src/features/tasks/components/TaskList`
- **Dependencies**:
  - tasksStore for task state
  - UI components (Card, Badge, Button)
  - TaskItem component
- **API Interactions**: Uses React Query to fetch tasks
- **Unique Aspects**: 
  - Handles empty state
  - Provides visual indication of task status
  - Supports various sorting and filtering options

### TaskItem
- **Purpose**: Display individual task with actions
- **Location**: `src/features/tasks/components/TaskItem`
- **Dependencies**:
  - tasksStore for task state
  - UI components (Card, Badge, Dropdown)
- **API Interactions**: Handles status updates and task deletion
- **Unique Aspects**:
  - Quick status toggle
  - Context menu for actions
  - Hover state with actions

### TaskForm
- **Purpose**: Create or edit tasks
- **Location**: `src/features/tasks/components/TaskForm`
- **Dependencies**:
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Select, DatePicker)
  - tasksStore and categoriesStore
- **API Interactions**: Creates or updates tasks
- **Unique Aspects**:
  - Handles both creation and editing
  - Category selection
  - Due date picking
  - Priority selection

### TaskFilters
- **Purpose**: Filter tasks by various criteria
- **Location**: `src/features/tasks/components/TaskFilters`
- **Dependencies**:
  - filtersStore for filter state
  - UI components (Select, Input)
- **API Interactions**: Updates query parameters for task fetching
- **Unique Aspects**:
  - Multiple filter types
  - Filter synchronization with URL
  - Clear filters functionality

### StatusFilter
- **Purpose**: Filter tasks by status
- **Location**: `src/features/tasks/components/filters/StatusFilter`
- **Dependencies**:
  - filtersStore for filter state
  - UI components (Select)
- **API Interactions**: None (updates store)
- **Unique Aspects**:
  - Visual indicators for status options
  - Default "All" option

### PriorityFilter
- **Purpose**: Filter tasks by priority
- **Location**: `src/features/tasks/components/filters/PriorityFilter`
- **Dependencies**:
  - filtersStore for filter state
  - UI components (Badge, ButtonGroup)
- **API Interactions**: None (updates store)
- **Unique Aspects**:
  - Color-coded priority indicators
  - Toggle button interface

### CategoryFilter
- **Purpose**: Filter tasks by category
- **Location**: `src/features/tasks/components/filters/CategoryFilter`
- **Dependencies**:
  - filtersStore for filter state
  - categoriesStore for categories
  - UI components (Select)
- **API Interactions**: Fetches categories
- **Unique Aspects**:
  - Dynamically populated based on user's categories
  - Color indicators for categories

### TaskStats
- **Purpose**: Display statistics about tasks
- **Location**: `src/features/tasks/components/TaskStats`
- **Dependencies**:
  - tasksStore for task data
  - UI components (Card, Badge)
- **API Interactions**: None (uses store data)
- **Unique Aspects**:
  - Visual charts for task distribution
  - Completion percentage
  - Status breakdown

### CategoryList
- **Purpose**: Display and manage task categories
- **Location**: `src/features/tasks/components/CategoryList`
- **Dependencies**:
  - categoriesStore for category state
  - UI components (List, Badge, Button)
- **API Interactions**: CRUD operations for categories
- **Unique Aspects**:
  - Color selection for categories
  - Drag and drop reordering
  - Create/edit/delete functionality

## User Profile Feature Components

### ProfileForm
- **Purpose**: Edit user profile information
- **Location**: `src/features/profile/components/ProfileForm`
- **Dependencies**:
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Button, Avatar)
  - profileStore for user profile state
- **API Interactions**: Updates user profile
- **Unique Aspects**:
  - Avatar upload and cropping
  - Form field validation
  - Success/error handling

### PasswordChangeForm
- **Purpose**: Allow password changes
- **Location**: `src/features/profile/components/PasswordChangeForm`
- **Dependencies**:
  - React Hook Form for form management
  - Zod for validation
  - UI components (Input, Button)
  - profileStore for user profile state
- **API Interactions**: Changes user password
- **Unique Aspects**:
  - Password strength validation
  - Current password verification
  - Password confirmation matching

### ThemeSettings
- **Purpose**: Customize application theme
- **Location**: `src/features/profile/components/ThemeSettings`
- **Dependencies**:
  - uiStore for theme state
  - UI components (Card, RadioGroup)
- **API Interactions**: None (local settings)
- **Unique Aspects**:
  - Theme preview
  - System theme detection
  - Immediate application of theme changes

### NotificationSettings
- **Purpose**: Configure notification preferences
- **Location**: `src/features/profile/components/NotificationSettings`
- **Dependencies**:
  - uiStore for notification settings
  - UI components (Card, Switch)
- **API Interactions**: Updates user settings
- **Unique Aspects**:
  - Multiple notification channels
  - Grouped settings by type
  - Explanation of notification purposes

### UserStats
- **Purpose**: Display user activity statistics
- **Location**: `src/features/profile/components/UserStats`
- **Dependencies**:
  - UI components (Card, Chart)
  - React Query for data fetching
- **API Interactions**: Fetches user statistics
- **Unique Aspects**:
  - Visual charts and graphs
  - Time period selection
  - Key metrics highlighting

## Shared Feature Component Patterns

### Form Components Pattern
All form components follow this pattern:
- Use React Hook Form for form state management
- Use Zod for schema validation
- Include loading and error states
- Provide consistent submission handling
- Use shared UI form components

### List Components Pattern
All list components follow this pattern:
- Handle empty states gracefully
- Include loading states (skeletons)
- Support pagination or virtualization when appropriate
- Provide consistent item rendering

### Filter Components Pattern
All filter components follow this pattern:
- Connect to appropriate filter store
- Synchronize with URL parameters
- Provide clear/reset functionality
- Allow multiple filter combinations

### Settings Components Pattern
All settings components follow this pattern:
- Show current setting value
- Provide intuitive controls for changes
- Apply changes immediately when possible
- Show confirmation or feedback after changes

## Component Relationships

### Authentication Component Relationships
```
AuthLayout
└── LoginForm/RegistrationForm/PasswordResetForm
```

### Task Management Component Relationships
```
TaskDashboard
├── TaskStats
├── TaskFilters
│   ├── StatusFilter
│   ├── PriorityFilter
│   ├── CategoryFilter
│   └── SearchInput
└── TaskList
    └── TaskItem

TaskModal
└── TaskForm
```

### Profile Component Relationships
```
ProfilePage
├── ProfileForm
├── PasswordChangeForm
├── ThemeSettings
├── NotificationSettings
└── UserStats
```

## Implementation Notes

### State Management Approach
- Feature components connect to their respective Zustand stores
- Components select only the state they need
- Actions are called directly from components

### API Integration Approach
- React Query is used for data fetching
- Loading and error states are handled consistently
- Data transformations happen in query hooks

### Accessibility Considerations
- All interactive elements have appropriate ARIA attributes
- Focus management for modals and dropdowns
- Keyboard navigation support
- Color contrast compliance

### Performance Optimizations
- Memoization of expensive calculations
- List virtualization for large datasets
- Optimistic UI updates
- Debounced inputs for filters and search 