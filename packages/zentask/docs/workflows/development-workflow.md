# Development Workflow for ZenTask

This guide outlines the recommended workflow for developing the ZenTask application with AI assistance. Following this workflow ensures consistent, high-quality implementation while maximizing the benefits of AI collaboration.

## Core Workflow Principles

1. **Context-First Development**: Always establish and maintain clear context
2. **Template-Based Components**: Use consistent patterns for predictability
3. **Incremental Implementation**: Build features in small, testable increments
4. **Continuous Validation**: Test and verify at each development step
5. **Clear Communication**: Express requirements with sufficient context

## The ZenTask Development Cycle

### 1. Planning Phase

**Activities:**
- Define feature requirements and user stories
- Break down into component hierarchy
- Identify state management needs
- Document expected behavior
- Create acceptance criteria

**AI Collaboration Points:**
- Feature breakdown assistance
- Component structure suggestions
- State management approach planning
- Identification of reusable patterns

**Example Prompt:**
```
"I need to build a task filtering feature that allows users to:
- Filter tasks by status (todo, in-progress, completed)
- Filter tasks by priority (low, medium, high)
- Filter tasks by category
- Search tasks by text

This should integrate with our existing TaskList component and use our Zustand tasks store.
Let's plan the component structure and state management approach."
```

### 2. Component Skeleton Creation

**Activities:**
- Create component file structure
- Define TypeScript interfaces for props and state
- Establish basic component relationships
- Create empty test files

**AI Collaboration Points:**
- Generating TypeScript interfaces
- Setting up component file structure
- Creating test skeletons
- Defining prop contracts

**Example Prompt:**
```
"Let's create the skeleton for our TaskFilters feature with TypeScript interfaces.
The components should include:
- TaskFilters (container)
- StatusFilter (dropdown)
- PriorityFilter (buttons)
- CategoryFilter (dropdown)
- SearchInput

Follow our component structure with proper typing for all props."
```

### 3. State Management Implementation

**Activities:**
- Update or create necessary Zustand stores
- Define state structure and actions
- Implement state selectors
- Connect query parameters to state

**AI Collaboration Points:**
- Store implementation
- State structure design
- Action implementation
- Query parameter synchronization

**Example Prompt:**
```
"Now let's implement the state management for our TaskFilters feature.
We need to:
1. Add filter-related state to our tasksStore in features/tasks/store/tasksStore.ts
2. Create actions to update filter state
3. Add selectors for filtered tasks
4. Synchronize filter state with URL query parameters

Follow our Zustand patterns for state management."
```

### 4. Component Implementation

**Activities:**
- Implement component rendering logic
- Connect components to state stores
- Add event handlers and interactions
- Style components with Tailwind and DaisyUI

**AI Collaboration Points:**
- Component logic implementation
- Store connection
- Event handler implementation
- Tailwind/DaisyUI styling

**Example Prompt:**
```
"Let's implement the StatusFilter component for our TaskFilters feature.
It should:
- Display a dropdown using DaisyUI's 'select' component
- Show options for All, Todo, In Progress, and Completed
- Connect to the tasksStore for getting/setting the status filter
- Have a clear, accessible design following our UI patterns
- Update the filter state when a selection is made"
```

### 5. API Integration

**Activities:**
- Implement or update React Query hooks
- Add loading, error, and success states
- Implement data transformations
- Handle edge cases for data fetching

**AI Collaboration Points:**
- React Query hook implementation
- Loading/error state handling
- Data transformation logic
- Edge case handling

**Example Prompt:**
```
"We need to update our useTasksQuery hook to support the new filters.
The hook should:
1. Accept our filter parameters (status, priority, categoryId, search)
2. Update the query key to include these filters
3. Pass the filters to the API request
4. Handle edge cases like empty strings or undefined filters
5. Follow our existing React Query patterns"
```

### 6. Testing

**Activities:**
- Implement unit tests for components
- Test state management logic
- Test API integration
- Test user interactions and edge cases

**AI Collaboration Points:**
- Test case implementation
- Mock creation for stores and API
- Edge case identification
- Complex interaction testing

**Example Prompt:**
```
"Now let's write tests for the StatusFilter component:
1. Test initial rendering with default state
2. Test option selection updating the store
3. Test proper rendering of selected state
4. Test accessibility features

Use Vitest and React Testing Library following our testing patterns."
```

### 7. Review and Refinement

**Activities:**
- Review component functionality
- Optimize performance
- Enhance accessibility
- Refine styling and interactions

**AI Collaboration Points:**
- Performance optimization suggestions
- Accessibility improvements
- Code quality enhancements
- UX improvement suggestions

**Example Prompt:**
```
"Please review our TaskFilters implementation for:
1. Performance issues (unnecessary re-renders, memoization needs)
2. Accessibility gaps (keyboard navigation, ARIA attributes, color contrast)
3. Code quality improvements
4. Potential edge cases we haven't handled
5. UX improvements that could enhance usability"
```

## Context Maintenance Throughout Development

### Context Refreshing

Regularly update AI on changes to project context:

```
"I've just updated the tasks API endpoint to support filtering directly on the server.
The updated endpoint now accepts query parameters for status, priority, and categoryId.
Let's update our useTasksQuery hook to leverage this server-side filtering."
```

### Context Switching

When moving between features, provide context transition:

```
"We're now switching from the TaskFilters feature to work on the TaskDetail feature.
The TaskDetail will display expanded information for a selected task and provide edit capabilities.
It will use the taskId URL parameter and fetch data with React Query."
```

### Expanding Context

Gradually expand AI's understanding of the codebase:

```
"For reference, here's our current component hierarchy for the tasks feature:
- TaskDashboard
  - TaskHeader (with TaskStats)
  - TaskFilters
    - StatusFilter
    - PriorityFilter
    - CategoryFilter
    - SearchInput
  - TaskList
    - TaskItem (with TaskActions)
  - TaskDetail (opens on selection)"
```

## Best Practices for AI Collaboration

1. **Be Specific About Patterns**: "Follow our existing pattern for filter components as shown in CategoryFilter"

2. **Provide Example References**: "Structure this similar to how we implemented the PriorityFilter component"

3. **Explain Constraints**: "We need to ensure this works with URL sharing, so filters should sync with query parameters"

4. **Highlight Priority Concerns**: "Focus particularly on making sure the filters are keyboard accessible"

5. **Give Design Context**: "This should follow our spacing system with 'gap-2' between filter elements"

## Feature Development Checklist

Use this checklist to ensure thorough feature implementation:

### Planning ✓
- [ ] Feature requirements defined
- [ ] Component hierarchy planned
- [ ] State management approach selected
- [ ] API requirements identified
- [ ] Acceptance criteria established

### Component Structure ✓
- [ ] TypeScript interfaces defined
- [ ] Component files created
- [ ] Basic component structure implemented
- [ ] Props and state interfaces defined
- [ ] Test files created

### State Management ✓
- [ ] Store structure defined
- [ ] Actions implemented
- [ ] Selectors created
- [ ] Store connected to components
- [ ] URL synchronization implemented (if needed)

### Component Implementation ✓
- [ ] Component rendering logic implemented
- [ ] Event handlers connected
- [ ] Styling applied
- [ ] Error states handled
- [ ] Loading states implemented

### Testing ✓
- [ ] Component rendering tests
- [ ] State management tests
- [ ] User interaction tests
- [ ] Edge case tests
- [ ] Accessibility tests

### Review ✓
- [ ] Code quality reviewed
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] UX evaluated
- [ ] Documentation updated

## Troubleshooting Common Workflow Issues

### Misaligned Understanding

**Issue**: AI has misunderstood project patterns or requirements.

**Solution**: Provide explicit examples from existing code:
```
"The component structure you suggested doesn't match our pattern. 
For reference, here's how we structure filter components:
[Example code from existing filter component]"
```

### Context Fragmentation

**Issue**: Context has become fragmented across multiple conversations.

**Solution**: Provide consolidated context summary:
```
"Let me recap our current approach for the TaskFilters feature:
1. We're using the tasksStore Zustand store for filter state
2. Filters are synchronized with URL query parameters
3. The StatusFilter, PriorityFilter, and CategoryFilter components are used
4. The filters affect the TaskList component's data display"
```

### Pattern Drift

**Issue**: Inconsistent application of patterns across the codebase.

**Solution**: Create or reference documentation for the pattern:
```
"Let's make sure we're consistent with our filter handling pattern.
All filters should:
1. Connect to the tasksStore
2. Use the setFilter action for updates
3. Handle the 'All' or empty state correctly
4. Be keyboard accessible"
```

## Conclusion

The ZenTask development workflow is designed to maximize productivity when working with AI assistance. By following this structured approach and maintaining clear context, teams can effectively leverage AI to build high-quality React applications efficiently while maintaining consistency and quality.

Remember that this workflow is iterative—plan, implement, test, refine, and repeat for each feature or component until the application meets all requirements. 