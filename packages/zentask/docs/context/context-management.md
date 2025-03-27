# Context Management for ZenTask

Effective context management is essential for successful AI-assisted development of the ZenTask application. This guide outlines approaches for establishing, maintaining, and refreshing context throughout the development process.

## Why Context Matters

In AI-assisted development, context includes:

1. **Project Structure**: How files and components are organized
2. **Design Patterns**: Established approaches for solving common problems
3. **State Management**: How application state is managed
4. **Component Relationships**: How components interact with each other
5. **Current Development Focus**: What's being worked on right now

Good context management helps AI:
- Make appropriate implementation decisions
- Follow established patterns consistently
- Avoid introducing bugs or inconsistencies
- Focus on the right level of abstraction

## Context Layers

ZenTask context is organized in layers, from general to specific:

### 1. Project Context

**What It Is**: High-level understanding of the project architecture, patterns, and conventions.

**How to Provide**:
- Reference project structure documentation
- Explain architectural decisions
- Provide overview of technology choices
- Share component hierarchy diagrams

**Example**:
```
"ZenTask follows a feature-based architecture with these main areas:
- Authentication (user login, registration)
- Task Management (task CRUD, filters, categories)
- User Profile (settings, preferences)

We're using Zustand for application state, React Query for server state, and 
DaisyUI with Tailwind CSS for UI components."
```

### 2. Feature Context

**What It Is**: Information about a specific feature area being developed.

**How to Provide**:
- Describe feature purpose and requirements
- Show component relationships within the feature
- Explain state management for the feature
- Share API endpoints and data structures

**Example**:
```
"The Task Management feature consists of:
- TaskDashboard (main view showing task list and filters)
- TaskDetail (expanded view of a single task)
- TaskForm (form for creating/editing tasks)

Tasks have status (todo, in-progress, completed), priority (low, medium, high),
a category, title, description, and due date. Tasks are stored in the tasksStore
and fetched using React Query."
```

### 3. Component Context

**What It Is**: Specific details about individual components being worked on.

**How to Provide**:
- Share component interface (props)
- Explain component behavior and states
- Describe UI appearance and styling
- Show relationships with parent/child components

**Example**:
```
"The TaskItem component:
- Receives a task object as a prop
- Displays task title, status, priority, and due date
- Shows a checkbox for marking task complete
- Has hover actions for edit and delete
- Uses DaisyUI's card component with custom styling
- Opens the TaskDetail component when clicked"
```

### 4. Implementation Context

**What It Is**: Details specific to the current implementation task.

**How to Provide**:
- Define what specifically needs to be implemented
- Explain constraints or requirements
- Reference similar implementations elsewhere
- Specify expected behavior

**Example**:
```
"We need to implement the 'mark as complete' functionality in the TaskItem component.
This should:
1. Call the updateTask mutation from useTaskMutation
2. Update the task status to 'completed'
3. Show a loading indicator while the API call is in progress
4. Handle success/error states appropriately
5. Update the UI to reflect the completed state"
```

## Context Management Strategies

### 1. Initial Context Setting

When starting a new development session, provide comprehensive context:

```
"We're working on the ZenTask application, a task management app built with React,
TypeScript, Zustand, React Query, and DaisyUI.

Today we're focusing on the task filtering feature, which allows users to filter
tasks by status, priority, and category. The main components involved are:
- TaskFilters (container)
- StatusFilter, PriorityFilter, CategoryFilter (individual filters)
- TaskList (displays filtered results)

The filters use the tasksStore Zustand store for state management and are 
synchronized with URL parameters for sharing and bookmarking."
```

### 2. Context Refreshing

Periodically refresh context, especially after making significant changes:

```
"To update on our progress: we've now completed the StatusFilter and PriorityFilter
components. Both are connected to the tasksStore and updating the filter state
correctly. We still need to implement the CategoryFilter component, which will
need to fetch categories from the API and then filter tasks based on the selected
category."
```

### 3. Context Expansion

Gradually expand context as development progresses:

```
"Let me provide some additional context about how categories work in our application:

Categories are user-defined groupings for tasks. Each category has:
- id (string)
- name (string)
- color (string - hex color code)

Categories are managed through the categoriesStore and fetched using the
useCategoriesQuery hook. A task can belong to one category or no category at all."
```

### 4. Context Switching

When moving between features, clearly signal context switches:

```
"We're now switching from the TaskFilters feature to the TaskForm feature.

The TaskForm is used for both creating new tasks and editing existing ones.
It's a modal dialog that includes fields for:
- Title (text input)
- Description (textarea)
- Status (select)
- Priority (radio buttons)
- Category (select)
- Due Date (date picker)

It uses React Hook Form for form management and validation."
```

## Context Templates

### Feature Development Context Template

```
Feature Name: [Feature name]
Purpose: [Brief description of what the feature does]

User Stories:
- [User story 1]
- [User story 2]
- [User story 3]

Components:
- [Component 1]: [Brief description]
- [Component 2]: [Brief description]
- [Component 3]: [Brief description]

State Management:
- [State source 1]: [What state it manages]
- [State source 2]: [What state it manages]

API Endpoints:
- [Endpoint 1]: [Purpose]
- [Endpoint 2]: [Purpose]

Related Files:
- [File path 1]: [Purpose]
- [File path 2]: [Purpose]

Design References:
- [Link or description of design]
```

### Component Implementation Context Template

```
Component: [Component name]
Location: [File path]
Purpose: [What the component does]

Props:
- [Prop name 1] ([type]): [Description]
- [Prop name 2] ([type]): [Description]

State:
- [State item 1]: [Purpose]
- [State item 2]: [Purpose]

Dependencies:
- [Component/Hook/Store 1]: [How it's used]
- [Component/Hook/Store 2]: [How it's used]

Behavior:
- [Behavior 1]: [Description]
- [Behavior 2]: [Description]

Edge Cases:
- [Edge case 1]: [How it's handled]
- [Edge case 2]: [How it's handled]
```

### Bug Fix Context Template

```
Bug Description: [Brief description of the bug]
Reproduction Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior: [What should happen]
Actual Behavior: [What actually happens]

Affected Components:
- [Component 1]: [How it's affected]
- [Component 2]: [How it's affected]

Related State/Data:
- [State/Data source]: [Relevance to bug]

Possible Causes:
- [Possible cause 1]: [Why it might cause the bug]
- [Possible cause 2]: [Why it might cause the bug]
```

## Context Maintenance Tools

### 1. Project Context JSON

Maintain a structured JSON representation of the current context:

```json
{
  "project": "ZenTask",
  "current_feature": "Task Filtering",
  "active_components": [
    "TaskFilters",
    "StatusFilter",
    "PriorityFilter",
    "CategoryFilter"
  ],
  "state_dependencies": [
    "tasksStore.filters",
    "tasksStore.setFilter",
    "useCategoriesQuery"
  ],
  "api_endpoints": [
    "/api/tasks",
    "/api/categories"
  ],
  "current_task": "Implement CategoryFilter component",
  "progress_status": {
    "StatusFilter": "completed",
    "PriorityFilter": "completed",
    "CategoryFilter": "in-progress",
    "URL synchronization": "pending"
  }
}
```

### 2. Component Hierarchy Diagrams

Use ASCII diagrams to visualize component relationships:

```
TaskDashboard
├── TaskHeader
│   └── TaskStats
├── TaskFilters
│   ├── StatusFilter
│   ├── PriorityFilter
│   ├── CategoryFilter
│   └── SearchInput
└── TaskList
    └── TaskItem
```

### 3. State Flow Diagrams

Use ASCII diagrams to visualize state flow:

```
User Interaction
    │
    ▼
StatusFilter.onChange
    │
    ▼
tasksStore.setFilter
    │
    ▼
URL Updated (via effect)
    │
    ▼
useTasksQuery refetched
    │
    ▼
TaskList re-rendered
```

## Best Practices for Context Management

1. **Start with Clear Context**: Begin each development session with clear context
2. **Update Incrementally**: Refresh context as development progresses
3. **Be Explicit About Changes**: Clearly state when you've modified code or added new components
4. **Use Consistent Structure**: Follow templates for providing context
5. **Visualize Relationships**: Use diagrams to show component hierarchies and state flow
6. **Reference Documentation**: Link to relevant documentation when available
7. **Highlight Patterns**: Point out patterns that should be followed
8. **Signal Context Switches**: Clearly indicate when switching between features or components

## Conclusion

Effective context management is the foundation of successful AI-assisted development. By consistently providing clear, structured context throughout the development process, you can maximize the value of AI assistance while maintaining high-quality code and consistent patterns. Use the strategies and templates in this guide to establish effective context management practices for your ZenTask development workflow.