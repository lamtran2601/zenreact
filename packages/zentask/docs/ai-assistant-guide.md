# ZenTask AI Assistant Implementation Guide

## ⚠️ CRITICAL: MANDATORY PREREQUISITE STEPS ⚠️

Before beginning any implementation task in ZenTask, you MUST complete the following steps in order:

1. **Context Assessment** - Complete the Context Assessment Framework questionnaire in full
2. **Document Current State** - Record the current project state using the Context Maintenance Structure
3. **Create Implementation Plan** - Outline the specific steps for implementation before writing any code
4. **Validate Against Rules** - Verify the plan adheres to ZenTask standards and rules

❌ **DO NOT SKIP THESE STEPS UNDER ANY CIRCUMSTANCES** - Implementation should never begin without completing proper planning and context management first. Following these steps is not optional.

This guide is designed for AI assistants working with developers on ZenTask implementations. It provides structured approaches to navigate the documentation, maintain context, and ensure adherence to ZenTask standards and best practices for task management functionality.

## 1. ZenTask Documentation Navigation System

### Task Decision Tree

Use this decision tree to determine which ZenTask documentation to reference based on the task:

```
Task Request
├── Task Feature Development
│   ├── Planning Phase → Installation Guide + Task Management
│   ├── Task Component Creation → Component Rules + Task Component Template
│   ├── Task State Management → State Rules + Task Store Template
│   └── Testing → Testing Strategy + Task Test Template
├── Task Feature Bug Fix
│   ├── UI Issue → Component Rules + Task Component Template
│   ├── State Issue → State Rules + Task State documentation
│   └── Integration Issue → Architecture Rules + Task Management
├── Task Feature Refactoring
│   ├── Component Refactoring → Component Rules + Coding Standards
│   ├── State Refactoring → State Rules + Coding Standards
│   └── Architecture Refactoring → Architecture Rules
└── Task Performance Optimization
    ├── Component Performance → Component Rules (Performance section)
    ├── State Performance → State Rules (memoization/selectors)
    └── Application Performance → Architecture Rules
```

### Documentation Map

These are the core ZenTask documents and their primary focus areas:

1. **Guides**
   - **Installation Guide**: Setting up ZenTask in a ZenReact application
   - **Task Management**: Core concepts of task data handling
   - **UI Components**: ZenTask component usage
   - **State Management**: Task state architecture
   - **Testing Strategy**: Testing ZenTask implementations

2. **Templates**
   - **Task Component Template**: Standard structure for task components
   - **Task Hook Template**: Pattern for task-related hooks
   - **Task Store Template**: Structure for task state stores
   - **Task Context Template**: Pattern for task contexts
   - **Task Test Template**: Structure for task component tests

3. **Rules**
   - **Coding Standards**: Syntax and style guidelines for ZenTask
   - **Component Rules**: Rules for task component development
   - **State Rules**: Guidelines for task state management
   - **Architecture Rules**: Project structure guidelines for ZenTask

## 2. Context Assessment Framework for ZenTask

⚠️ **MANDATORY REQUIREMENT**: This framework MUST be completed before any implementation begins. Skip this step at your peril.

Before implementing any task management solution, gather this critical information:

### Initial Task Context Questionnaire

```
1. Project Phase:
   □ New ZenTask integration
   □ Task feature development
   □ Task feature refactoring
   □ Task feature bug fixing
   □ Task performance optimization

2. Task Component Requirements:
   □ What task UI elements are needed?
   □ What task interactions should be supported?
   □ What accessibility requirements exist for tasks?
   □ What task states and variations are needed?

3. Task Component Classification:
   □ Task Display Component
   □ Task Input Component
   □ Task List Component
   □ Task Management Component
   □ Task Dashboard Component

4. Task State Management Needs:
   □ Task UI State (component appearance/behavior)
   □ Task Application State (task data across components)
   □ Task Server State (API data with caching)
   □ Task Form State (user input with validation)

5. Task Integration Requirements:
   □ What existing components will tasks interact with?
   □ What API endpoints will be used for tasks?
   □ What state stores will be accessed for tasks?
   □ What contexts are needed for tasks?

6. Task Technical Constraints:
   □ Browser compatibility requirements
   □ Task performance requirements
   □ Task accessibility standards
   □ Task-related SEO considerations
```

### Task Context Maintenance Structure

Maintain this structure throughout the conversation:

```json
{
  "task_project_context": {
    "current_task_feature": "[Feature name]",
    "active_task_components": ["TaskComponentA", "TaskComponentB"],
    "related_task_files": ["path/to/task-component.tsx", "path/to/task-hook.ts"],
    "task_component_hierarchy": ["App > TaskPage > TaskFeature"],
    "task_state_dependencies": ["useTaskStore", "useTaskQuery"]
  },
  "task_decision_history": [
    {"decision": "[Decision made]", "reason": "[Reasoning]", "rule_reference": "[Rule citation]"},
    {"decision": "[Decision made]", "reason": "[Reasoning]", "rule_reference": "[Rule citation]"}
  ],
  "task_implementation_progress": {
    "completed": ["Task component structure", "Task props interface"],
    "in_progress": ["Task state management", "Task event handlers"],
    "pending": ["Task accessibility", "Task testing", "Task documentation"]
  }
}
```

## 3. Implementation Workflow Process for ZenTask

⚠️ **WARNING**: Phase 1 (Context Gathering) and Phase 2 (Planning) are REQUIRED prerequisites. Never proceed to Phase 3 (Implementation) until Phases 1 and 2 are fully documented.

Follow this consistent workflow for all ZenTask implementations:

### Phase 1: Context Gathering

1. **Analyze Task Request**
   - Identify the core task management feature or issue
   - Note specific task requirements or constraints
   - Identify which documentation to reference (using decision tree)

2. **Explore Existing Task Code** (if applicable)
   - Understand task component hierarchy
   - Identify task state management patterns in use
   - Note task coding patterns and conventions

3. **Complete Task Context Questionnaire**
   - Fill out the task context framework
   - Identify missing task information
   - Ask targeted questions to complete task context

### Phase 2: Task Planning

1. **Task Component Classification**
   - Determine appropriate task component type
   - Reference Component Rules documentation
   - Decide on task component organization

2. **Task State Management Strategy**
   - Categorize task state needs
   - Select appropriate task state management approach
   - Plan task state structure and update patterns

3. **Task Integration Planning**
   - Identify task dependencies and integration points
   - Plan task prop interfaces and state connections
   - Consider task error handling and edge cases

### Phase 3: Task Implementation

⚠️ **STOP AND CHECK**: Before proceeding, ensure you have:
1. Completed and documented the Task Context Assessment Framework
2. Populated the Task Context Maintenance Structure
3. Created a detailed task implementation plan
4. Validated the plan against ZenTask standards

If any of these are incomplete, STOP and complete them before writing any code.

1. **Task Structure Definition**
   - Create task file/directory structure
   - Define task interfaces and types
   - Outline task component structure following templates

2. **Core Task Implementation**
   - Implement task component following Component Rules
   - Implement task state management following State Rules
   - Ensure proper task error handling and accessibility

3. **Task Testing**
   - Create task tests following Testing Strategy
   - Test all task states and interactions
   - Verify task accessibility compliance

4. **Task Documentation**
   - Add comprehensive JSDoc comments for tasks
   - Include task usage examples
   - Document task props and state

### Phase 4: Task Validation

1. **Standards Compliance**
   - Verify adherence to ZenTask Coding Standards
   - Check ZenTask Component Rules compliance
   - Verify ZenTask State Rules compliance

2. **Task Checklist Verification**
   - Run through Task Implementation Checklists
   - Verify all task requirements are met
   - Check for task edge cases and error handling

3. **Task Improvement Opportunities**
   - Identify potential task optimizations
   - Note areas for future task enhancement
   - Suggest best practices that could be applied to tasks

## 4. Task Implementation Checklists

Use these checklists to ensure comprehensive task implementation:

### Task Component Implementation Checklist

```
□ Task Component Classification
  □ Correctly identified task component type
  □ Applied appropriate patterns for the task component type
  □ Task component has single responsibility

□ Task Component Structure
  □ Used function declaration (not arrow function)
  □ Followed proper task file organization
  □ Used proper task naming conventions
  □ Structured internal task logic correctly

□ Task Props Interface
  □ Defined TypeScript interface with descriptive comments
  □ Used proper types for task properties (avoid any)
  □ Included default values where appropriate
  □ Grouped related task props logically

□ Task State Management
  □ Used appropriate task state management approach
  □ Kept task state as local as possible
  □ Implemented immutable task state updates
  □ Properly memoized task values and callbacks

□ Task Error Handling
  □ Handled task loading, error, and empty states
  □ Implemented appropriate task error boundaries
  □ Provided fallbacks for missing task data
  □ Included retry mechanisms for task operations

□ Task Performance
  □ Applied memoization where beneficial for tasks
  □ Avoided unnecessary task re-renders
  □ Used proper dependency arrays in task components
  □ Implemented lazy loading for task features if needed

□ Task Accessibility
  □ Used semantic HTML elements for tasks
  □ Added proper ARIA attributes to task elements
  □ Ensured keyboard navigation for tasks
  □ Managed focus appropriately in task interactions

□ Task Testing
  □ Created tests for all task component behavior
  □ Tested all task component states
  □ Included task accessibility tests
  □ Added task snapshot or visual regression tests

□ Task Documentation
  □ Added JSDoc comments for task components
  □ Documented all task props
  □ Included task usage examples
  □ Noted any task performance considerations
```

### Task State Management Checklist

```
□ Task State Classification
  □ Identified correct task state category
  □ Applied appropriate technology based on task category
  □ Followed task state decision tree

□ Task State Structure
  □ Defined clear interfaces for task state
  □ Normalized complex task data structures
  □ Avoided duplication of task data
  □ Used appropriate task naming conventions

□ Task State Updates
  □ Implemented immutable task update patterns
  □ Created clear task actions/setters
  □ Encapsulated complex task logic
  □ Handled optimistic updates for task operations

□ Task State Access
  □ Limited access to necessary task components
  □ Used selectors for optimal task re-rendering
  □ Implemented custom hooks for complex task access
  □ Provided type safety for all task access

□ Task Performance
  □ Applied proper memoization for task state
  □ Implemented efficient task selectors
  □ Optimized for minimal task re-renders
  □ Used appropriate caching strategies for tasks

□ Task Error Handling
  □ Managed task loading, error, success states
  □ Implemented proper task error recovery
  □ Added retry mechanisms for task operations
  □ Handled task edge cases

□ Task Testing
  □ Tested initial task state
  □ Tested all task state transitions
  □ Tested task selectors and derived state
  □ Tested task error scenarios

□ Task Documentation
  □ Documented task state structure
  □ Documented available task actions
  □ Included task usage examples
  □ Noted task performance considerations
```

## 5. ZenTask Component Examples

### Example: Task Item Component

```typescript
// Task.tsx
import React from 'react';
import { useTaskActions } from '../hooks/useTaskActions';
import styles from './Task.module.css';

// Task Props Interface
interface TaskProps {
  /** Unique identifier for the task */
  id: string;
  /** The task title */
  title: string;
  /** Whether the task is completed */
  completed: boolean;
  /** Task priority level */
  priority?: 'low' | 'medium' | 'high';
  /** Due date for the task */
  dueDate?: Date;
  /** Optional CSS class names */
  className?: string;
}

// Task Component
export function Task({
  id,
  title,
  completed,
  priority = 'medium',
  dueDate,
  className = '',
}: TaskProps): JSX.Element {
  // Task state and hooks
  const { toggleTaskComplete, deleteTask } = useTaskActions();
  
  // Task event handlers
  const handleToggle = () => {
    toggleTaskComplete(id);
  };
  
  const handleDelete = () => {
    deleteTask(id);
  };
  
  // Render task
  return (
    <div className={`${styles.task} ${styles[priority]} ${completed ? styles.completed : ''} ${className}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'complete'}`}
      />
      <div className={styles.taskContent}>
        <h3 className={styles.taskTitle}>{title}</h3>
        {dueDate && (
          <div className={styles.taskDueDate}>
            Due: {dueDate.toLocaleDateString()}
          </div>
        )}
      </div>
      <button 
        onClick={handleDelete}
        className={styles.deleteButton}
        aria-label={`Delete task "${title}"`}
      >
        Delete
      </button>
    </div>
  );
}
```

### Example: Task List Component

```typescript
// TaskList.tsx
import React, { useMemo } from 'react';
import { Task } from './Task';
import { useTaskStore } from '../store/taskStore';
import styles from './TaskList.module.css';

// TaskList Props Interface
interface TaskListProps {
  /** Filter to show 'all', 'active', or 'completed' tasks */
  filter?: 'all' | 'active' | 'completed';
  /** Sort tasks by 'dueDate', 'priority', or 'title' */
  sortBy?: 'dueDate' | 'priority' | 'title';
  /** Optional CSS class names */
  className?: string;
}

// TaskList Component
export function TaskList({
  filter = 'all',
  sortBy = 'dueDate',
  className = '',
}: TaskListProps): JSX.Element {
  // Get tasks from store
  const tasks = useTaskStore(state => state.tasks);
  
  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    // Filter tasks
    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
    
    // Sort tasks
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'dueDate' && a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (sortBy === 'priority') {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return priorityValues[b.priority || 'medium'] - priorityValues[a.priority || 'medium'];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [tasks, filter, sortBy]);
  
  // Render task list
  return (
    <div className={`${styles.taskList} ${className}`}>
      {filteredAndSortedTasks.length === 0 ? (
        <div className={styles.emptyState}>No tasks to display</div>
      ) : (
        filteredAndSortedTasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            priority={task.priority}
            dueDate={task.dueDate}
          />
        ))
      )}
    </div>
  );
}
```

## 11. Error Prevention System for ZenTask

To prevent common mistakes in the task implementation process:

### Mandatory Pre-Implementation Checklist for Tasks

Every task feature implementation MUST begin with this checklist:

```
□ Task Context Assessment Framework completed and documented
□ Current task state recorded in Task Context Maintenance Structure
□ Task component classification and requirements identified
□ Task state management approach defined
□ Task implementation plan created with specific steps
□ Plan validated against relevant ZenTask rules
□ Integration points with existing ZenReact code identified
```

### Implementation Safety Barriers for Tasks

The following safety barriers must be in place:

1. **No Implementation Without Context** - Never begin coding task features without completing context assessment
2. **Document First, Code Second** - Always document the task approach before implementation
3. **Plan-Driven Implementation** - Follow the documented task plan step by step
4. **Continuous Context Updating** - Update task context documentation as implementation progresses

### Recovery Process for Task Implementation

If you find yourself implementing task features without proper planning:

1. **Stop immediately** - Do not continue with task implementation
2. **Return to Task Context Assessment** - Complete the framework
3. **Document Current Task Progress** - Update the Task Context Maintenance Structure
4. **Create/Update Task Implementation Plan** - Plan remaining steps
5. **Resume Task Implementation** - Follow the plan methodically

### Implementation Quality Validation for Tasks

After task implementation, validate against these criteria:

```
□ Task implementation follows the pre-defined plan
□ Task code adheres to ZenTask standards and rules
□ Task context documentation is complete and up-to-date
□ Task implementation checklists have been completed
□ Task documentation is comprehensive and accurate
```

## Conclusion

This guide is designed to help AI assistants effectively navigate and apply the ZenTask documentation. By following these structured approaches, maintaining context, and applying the appropriate rules and patterns, you can provide consistent, high-quality assistance for task management feature development in ZenReact applications.

Remember that the primary goal is to help developers create maintainable, performant, and accessible task management features while maintaining consistent patterns that support both human and AI collaboration. 