# Project Structure for ZenTask

This guide outlines the recommended project structure for the ZenTask application. Following this structure ensures a consistent, maintainable codebase that aligns with the ZenReact framework principles.

## Core Structure

The ZenTask application follows a feature-based architecture with clear separation of concerns:

```
zentask/
├── public/              # Static assets
├── src/
│   ├── features/        # Feature modules
│   ├── components/      # Shared components
│   ├── hooks/           # Shared hooks
│   ├── api/             # API client and utilities
│   ├── utils/           # Utility functions
│   ├── types/           # Shared TypeScript types
│   ├── store/           # Global Zustand stores
│   ├── constants/       # Application constants
│   ├── routes/          # Route definitions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── tests/               # Test setup and utilities
├── docs/                # Project documentation
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Package dependencies
```

## Feature Module Structure

Each feature is organized in a self-contained module with all related components, state, and logic:

```
src/features/
├── auth/                # Authentication feature
│   ├── components/      # Feature-specific components
│   ├── hooks/           # Feature-specific hooks
│   ├── api/             # Feature-specific API
│   ├── types.ts         # Feature-specific types
│   ├── store/           # Feature-specific stores
│   └── utils/           # Feature-specific utilities
├── tasks/               # Tasks feature
│   ├── components/      # Feature-specific components
│   ├── hooks/           # Feature-specific hooks
│   ├── api/             # Feature-specific API
│   ├── types.ts         # Feature-specific types
│   ├── store/           # Feature-specific stores
│   └── utils/           # Feature-specific utilities
└── profile/             # Profile feature
    ├── components/      # Feature-specific components
    ├── hooks/           # Feature-specific hooks
    ├── api/             # Feature-specific API
    ├── types.ts         # Feature-specific types
    ├── store/           # Feature-specific stores
    └── utils/           # Feature-specific utilities
```

## Shared Components Structure

Shared components are organized by their type and purpose:

```
src/components/
├── ui/                  # Base UI components
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   └── ...
├── layout/              # Layout components
│   ├── MainLayout/
│   ├── Sidebar/
│   ├── Header/
│   └── ...
├── feedback/            # Feedback components
│   ├── Toast/
│   ├── Alert/
│   ├── ErrorBoundary/
│   └── ...
└── form/                # Form components
    ├── TextField/
    ├── Select/
    ├── Checkbox/
    └── ...
```

## Component File Structure

Individual components follow a consistent structure:

```
src/components/ui/Button/
├── Button.tsx           # Main component
├── Button.test.tsx      # Component tests
└── index.ts             # Export file
```

For more complex components:

```
src/features/tasks/components/TaskList/
├── TaskList.tsx         # Main component
├── TaskList.test.tsx    # Component tests
├── TaskListItem.tsx     # Sub-component
├── TaskListFilter.tsx   # Sub-component
└── index.ts             # Export file
```

## API Structure

The API layer uses a centralized client with feature-specific modules:

```
src/api/
├── client.ts            # Base API client with interceptors
├── types.ts             # Common API types
└── utils/               # API utilities
    ├── errorHandling.ts
    ├── caching.ts
    └── ...

src/features/tasks/api/
├── tasksApi.ts          # Task-specific API hooks
└── tasksMock.ts         # Mock data for development
```

## State Management Structure

State is organized into global and feature-specific stores:

```
src/store/               # Global stores
├── uiStore.ts           # UI state (theme, sidebar)
├── authStore.ts         # Authentication state
└── index.ts             # Store exports

src/features/tasks/store/
├── tasksStore.ts        # Task-specific state
└── filtersStore.ts      # Task filters state
```

## Routing Structure

Routes are defined in a central location:

```
src/routes/
├── index.tsx            # Route configuration
├── paths.ts             # Route path constants
└── guards/              # Route guards
    ├── AuthGuard.tsx
    └── RoleGuard.tsx
```

## Naming Conventions

ZenTask follows these naming conventions:

- **Files and folders**: Use `PascalCase` for components, `camelCase` for utilities, hooks, and services
- **Component files**: Named same as the component (e.g., `Button.tsx` for `Button` component)
- **Hooks**: Prefixed with `use` (e.g., `useTasksStore.ts`)
- **Store files**: Suffixed with `Store` (e.g., `tasksStore.ts`)
- **Type files**: Named `types.ts` or suffixed with `.types.ts` for component-specific types
- **Test files**: Suffixed with `.test.tsx` or `.test.ts`

## Import Structure

Use absolute imports with path aliases to improve readability:

```tsx
// Instead of relative imports like:
import Button from '../../../components/ui/Button';

// Use path aliases:
import Button from '@/components/ui/Button';
import { Task } from '@/features/tasks/types';
import { useTasksStore } from '@/features/tasks/store/tasksStore';
```

## Why This Structure?

This project structure provides several benefits:

1. **Feature Isolation**: Each feature is self-contained, making it easier to understand and modify
2. **Clear Boundaries**: Separation between shared and feature-specific code
3. **Discoverable Code**: Consistent organization makes code easier to find
4. **Scale-friendly**: Structure scales well as the application grows
5. **Developer Experience**: Improves developer experience with logical organization
6. **AI-friendly**: Clear structure helps AI understand the codebase

## Feature Development Flow

When adding a new feature to ZenTask:

1. Create a new feature folder under `src/features/`
2. Add subdirectories for components, hooks, API, and types
3. Implement feature-specific logic and UI
4. Connect to global state or API as needed
5. Add routes in the central routing configuration

## Adding New Components

When adding components, follow these guidelines:

1. Determine if the component is feature-specific or shared
2. Place in the appropriate directory (`src/components/` or `src/features/*/components/`)
3. Create a folder with the component name
4. Add the main component file, tests, and export index
5. Follow the standard component structure

## Conclusion

The ZenTask project structure is designed for maintainability, scalability, and developer experience. By following this structure consistently, we create a codebase that is easy to understand, extend, and maintain for both human developers and AI assistants.

Remember that while structure is important, the ultimate goal is to create a coherent, functional application. Use this structure as a guide, but be flexible when specific needs arise. 