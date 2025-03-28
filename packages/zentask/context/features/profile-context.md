# Profile Feature Context

## Feature Overview
The Profile feature allows users to manage their account information, application preferences, and personalize their ZenTask experience.

## User Stories
- As a user, I want to view and edit my profile information
- As a user, I want to change my password
- As a user, I want to set my preferred theme (light/dark)
- As a user, I want to configure notification preferences
- As a user, I want to customize application settings
- As a user, I want to view my account usage statistics

## Components
### ProfileForm
**Purpose**: Display and edit user profile information
**Props**:
- `user`: User data
- `onSubmit`: Callback when form is submitted
- `onCancel`: Callback when form is cancelled

**State**:
- Form input values
- Form validation state
- Form submission state

**Behavior**:
- Display current user information
- Allow editing of user details
- Validate input fields
- Submit updated profile to API
- Handle success/error states

### PasswordChangeForm
**Purpose**: Allow users to change their password
**Props**:
- `onSubmit`: Callback when form is submitted
- `onCancel`: Callback when form is cancelled

**State**:
- Form input values (current password, new password, confirm password)
- Form validation state
- Form submission state

**Behavior**:
- Validate password fields
- Ensure new password meets requirements
- Confirm password match
- Submit password change to API
- Handle success/error states

### ThemeSettings
**Purpose**: Configure application theme preferences
**Props**: None

**State**:
- Current theme
- Theme options

**Behavior**:
- Display available themes
- Allow selection of theme
- Apply theme change immediately
- Save preferences to store

### NotificationSettings
**Purpose**: Configure notification preferences
**Props**: None

**State**:
- Current notification settings
- Available notification options

**Behavior**:
- Display notification options
- Allow toggling of different notification types
- Save preferences to store
- Apply changes immediately

### UserStats
**Purpose**: Display user activity statistics
**Props**: None

**State**:
- Statistics data
- Loading state
- Error state

**Behavior**:
- Fetch user statistics from API
- Display key metrics (tasks completed, on time completion rate, etc.)
- Handle loading and error states
- Provide visual representation of data

## State Management
### profileStore (Zustand)
**State**:
```typescript
interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}
```

### uiStore (Zustand)
**State**:
```typescript
interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  notificationSettings: {
    email: boolean;
    push: boolean;
    taskReminders: boolean;
    weeklyDigest: boolean;
  };
  
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  updateNotificationSetting: (key: keyof UIState['notificationSettings'], value: boolean) => void;
}
```

## API Endpoints
| Endpoint | Method | Purpose | Payload | Response |
|----------|--------|---------|---------|----------|
| `/api/users/me` | GET | Get user profile | - | `UserProfile` |
| `/api/users/me` | PUT | Update user profile | `Partial<UserProfile>` | `UserProfile` |
| `/api/users/me/password` | PUT | Change password | `PasswordChangeData` | Success message |
| `/api/users/me/settings` | GET | Get user settings | - | `UserSettings` |
| `/api/users/me/settings` | PUT | Update user settings | `Partial<UserSettings>` | `UserSettings` |
| `/api/users/me/stats` | GET | Get user statistics | - | `UserStats` |

## Data Structures
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  timezone: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    taskReminders: boolean;
    weeklyDigest: boolean;
  };
  sidebarCollapsed: boolean;
  defaultTaskView: 'list' | 'board';
  defaultTaskSort: 'dueDate' | 'priority' | 'createdAt';
}

interface UserStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  onTimeCompletionRate: number;
  averageTasksPerDay: number;
  mostActiveDay: string;
  mostProductiveTimeOfDay: string;
  tasksByCategory: Array<{
    category: string;
    count: number;
  }>;
  tasksByPriority: Array<{
    priority: string;
    count: number;
  }>;
}
```

## Dependencies
- React Hook Form for form management
- Zod for schema validation
- React Query for API requests
- Chart.js for statistics visualization

## Test Scenarios
1. User can view their profile information
2. User can update their profile information
3. User can change their password
4. User can toggle between light and dark themes
5. User can update notification preferences
6. User can customize application settings
7. User can view their statistics
8. Settings persist between sessions

## Edge Cases
- Handle network errors during profile updates
- Validate current password correctly before allowing password change
- Handle image upload for avatar
- Validate email uniqueness when updating
- Handle theme changes without UI flickering
- Ensure settings synchronization across devices

## Implementation Notes
- Use controlled forms for all user inputs
- Implement proper loading states for all API calls
- Consider optimistic updates for settings changes
- Use lazy loading for statistics visualizations
- Ensure all settings are persisted across sessions
- Ensure accessibility of all settings inputs
- Provide clear feedback for all user actions 