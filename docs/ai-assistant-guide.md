# AI Assistant Implementation Guide for ZenReact

## ⚠️ CRITICAL: MANDATORY PREREQUISITE STEPS ⚠️

Before beginning any implementation task in ZenReact, you MUST complete the following steps in order:

1. **Context Assessment** - Complete the Context Assessment Framework questionnaire in full
2. **Document Current State** - Record the current project state using the Context Maintenance Structure
3. **Create Implementation Plan** - Outline the specific steps for implementation before writing any code
4. **Validate Against Rules** - Verify the plan adheres to ZenReact standards and rules

❌ **DO NOT SKIP THESE STEPS UNDER ANY CIRCUMSTANCES** - Implementation should never begin without completing proper planning and context management first. Following these steps is not optional.

This guide is designed for AI assistants working with developers on ZenReact projects. It provides structured approaches to navigate the documentation, maintain context, and ensure adherence to ZenReact standards and best practices.

## 1. Documentation Navigation System

### Master Decision Tree

Use this decision tree to determine which ZenReact documentation to reference first based on the task:

```
Task Request
├── New Feature Development
│   ├── Planning Phase → Development Workflow + Context Management
│   ├── Component Creation → Component Rules + Component Template
│   ├── State Management → State Rules + appropriate template
│   └── Testing → Testing Strategy + Test Template
├── Bug Fix
│   ├── UI Issue → Component Rules + Component Template
│   ├── State Issue → State Rules + relevant state documentation
│   └── Integration Issue → Architecture Rules + Context Management
├── Refactoring
│   ├── Component Refactoring → Component Rules + Coding Standards
│   ├── State Refactoring → State Rules + Coding Standards
│   └── Architecture Refactoring → Architecture Rules
└── Performance Optimization
    ├── Component Performance → Component Rules (Performance section)
    ├── State Performance → State Rules (memoization/selectors)
    └── Application Performance → Architecture Rules
```

### Documentation Map

These are the core documents and their primary focus areas:

1. **Guides**
   - **Development Workflow**: Overall process for AI-assisted development
   - **Context Management**: Maintaining and communicating project context
   - **Component Development**: Patterns for component creation
   - **State Management**: Approaches to state organization
   - **Testing Strategy**: Test-driven development with AI

2. **Templates**
   - **Component Template**: Standard component structure
   - **Hook Template**: Pattern for custom hooks
   - **Store Template**: Structure for state stores
   - **Context Template**: Pattern for React contexts
   - **Test Template**: Structure for test files

3. **Rules**
   - **Coding Standards**: Syntax and style guidelines
   - **Component Rules**: Rules for component development
   - **State Rules**: Guidelines for state management
   - **AI Collaboration Rules**: Best practices for AI interaction
   - **Architecture Rules**: Project structure guidelines

## 2. Context Assessment Framework

⚠️ **MANDATORY REQUIREMENT**: This framework MUST be completed before any implementation begins. Skip this step at your peril.

Before implementing any solution, gather this critical information:

### Initial Context Questionnaire

```
1. Project Phase:
   □ New project setup
   □ Feature development
   □ Refactoring
   □ Bug fixing
   □ Performance optimization

2. Component Requirements:
   □ What user interface elements are needed?
   □ What interactions should be supported?
   □ What accessibility requirements exist?
   □ What variants or states are needed?

3. Component Classification:
   □ UI Component
   □ Layout Component
   □ Container Component
   □ Page Component
   □ Compound Component

4. State Management Needs:
   □ UI State (component appearance/behavior)
   □ Application State (business data across components)
   □ Server State (API data with caching)
   □ Form State (user input with validation)

5. Integration Requirements:
   □ What existing components will this interact with?
   □ What API endpoints will be used?
   □ What state stores will be accessed?
   □ What contexts are needed?

6. Technical Constraints:
   □ Browser compatibility requirements
   □ Performance requirements
   □ Accessibility standards
   □ SEO considerations
```

### Context Maintenance Structure

Maintain this structure throughout the conversation:

```json
{
  "project_context": {
    "current_feature": "[Feature name]",
    "active_components": ["ComponentA", "ComponentB"],
    "related_files": ["path/to/component.tsx", "path/to/hook.ts"],
    "component_hierarchy": ["App > PageComponent > FeatureComponent"],
    "state_dependencies": ["useFeatureStore", "useDataQuery"]
  },
  "decision_history": [
    {"decision": "[Decision made]", "reason": "[Reasoning]", "rule_reference": "[Rule citation]"},
    {"decision": "[Decision made]", "reason": "[Reasoning]", "rule_reference": "[Rule citation]"}
  ],
  "implementation_progress": {
    "completed": ["Component structure", "Props interface"],
    "in_progress": ["State management", "Event handlers"],
    "pending": ["Accessibility", "Testing", "Documentation"]
  }
}
```

## 3. Implementation Workflow Process

⚠️ **WARNING**: Phase 1 (Context Gathering) and Phase 2 (Planning) are REQUIRED prerequisites. Never proceed to Phase 3 (Implementation) until Phases 1 and 2 are fully documented.

Follow this consistent workflow for all ZenReact implementations:

### Phase 1: Context Gathering

1. **Analyze Request**
   - Identify the core task (feature, bug fix, refactoring)
   - Note specific requirements or constraints
   - Identify which documentation to reference (using decision tree)

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
   - Determine appropriate component type (UI, Layout, Container, Page, Compound)
   - Reference Component Rules documentation
   - Decide on component organization (single file vs. directory)

2. **State Management Strategy**
   - Categorize state needs (UI, Application, Server, Form)
   - Select appropriate state management approach using decision tree
   - Plan state structure and update patterns

3. **Integration Planning**
   - Identify dependencies and integration points
   - Plan prop interfaces and state connections
   - Consider error handling and edge cases

### Phase 3: Implementation

⚠️ **STOP AND CHECK**: Before proceeding, ensure you have:
1. Completed and documented the Context Assessment Framework
2. Populated the Context Maintenance Structure
3. Created a detailed implementation plan
4. Validated the plan against ZenReact standards

If any of these are incomplete, STOP and complete them before writing any code.

1. **Structure Definition**
   - Create file/directory structure
   - Define interfaces and types
   - Outline component structure following templates

2. **Core Implementation**
   - Implement component following Component Rules
   - Implement state management following State Rules
   - Ensure proper error handling and accessibility

3. **Testing**
   - Create tests following Testing Strategy
   - Test all states and interactions
   - Verify accessibility compliance

4. **Documentation**
   - Add comprehensive JSDoc comments
   - Include usage examples
   - Document props and state

### Phase 4: Validation

1. **Standards Compliance**
   - Verify adherence to Coding Standards
   - Check Component Rules compliance
   - Verify State Rules compliance

2. **Checklist Verification**
   - Run through Implementation Checklists
   - Verify all requirements are met
   - Check for edge cases and error handling

3. **Improvement Opportunities**
   - Identify potential optimizations
   - Note areas for future enhancement
   - Suggest best practices that could be applied

## 4. Implementation Checklists

Use these checklists to ensure comprehensive implementation:

### Component Implementation Checklist

```
□ Component Classification
  □ Correctly identified component type (UI, Layout, Container, Page, Compound)
  □ Applied appropriate patterns for the component type
  □ Component has single responsibility

□ Component Structure
  □ Used function declaration (not arrow function)
  □ Followed proper file organization
  □ Used proper naming conventions
  □ Structured internal logic correctly (hooks, derived state, effects, render)

□ Props Interface
  □ Defined TypeScript interface with descriptive comments
  □ Used proper types (avoid any)
  □ Included default values where appropriate
  □ Grouped related props logically

□ State Management
  □ Used appropriate state management approach
  □ Kept state as local as possible
  □ Implemented immutable state updates
  □ Properly memoized values and callbacks

□ Error Handling
  □ Handled loading, error, and empty states
  □ Implemented appropriate error boundaries
  □ Provided fallbacks for missing data
  □ Included retry mechanisms where appropriate

□ Performance
  □ Applied memoization where beneficial
  □ Avoided unnecessary re-renders
  □ Used proper dependency arrays
  □ Implemented lazy loading if needed

□ Accessibility
  □ Used semantic HTML elements
  □ Added proper ARIA attributes
  □ Ensured keyboard navigation
  □ Managed focus appropriately

□ Testing
  □ Created tests for all component behavior
  □ Tested all component states
  □ Included accessibility tests
  □ Added snapshot or visual regression tests

□ Documentation
  □ Added JSDoc comments
  □ Documented all props
  □ Included usage examples
  □ Noted any performance considerations
```

### State Management Checklist

```
□ State Classification
  □ Identified correct state category (UI, Application, Server, Form)
  □ Applied appropriate technology based on category
  □ Followed state decision tree

□ State Structure
  □ Defined clear interfaces for state
  □ Normalized complex data structures
  □ Avoided duplication of data
  □ Used appropriate naming conventions

□ State Updates
  □ Implemented immutable update patterns
  □ Created clear actions/setters
  □ Encapsulated complex logic
  □ Handled optimistic updates if needed

□ State Access
  □ Limited access to necessary components
  □ Used selectors for optimal re-rendering
  □ Implemented custom hooks for complex access
  □ Provided type safety for all access

□ Performance
  □ Applied proper memoization
  □ Implemented efficient selectors
  □ Optimized for minimal re-renders
  □ Used appropriate caching strategies

□ Error Handling
  □ Managed loading, error, success states
  □ Implemented proper error recovery
  □ Added retry mechanisms
  □ Handled edge cases

□ Testing
  □ Tested initial state
  □ Tested all state transitions
  □ Tested selectors and derived state
  □ Tested error scenarios

□ Documentation
  □ Documented state structure
  □ Documented available actions
  □ Included usage examples
  □ Noted performance considerations
```

## 5. ZenReact Knowledge Graph

This knowledge graph shows the relationships between different ZenReact concepts and documentation. Use it to navigate related documentation:

```
Component Development Guide
├── Component Rules
│   ├── Component Classification
│   │   ├── UI Components
│   │   ├── Layout Components
│   │   ├── Container Components
│   │   ├── Page Components
│   │   └── Compound Components
│   ├── Component Structure
│   ├── Performance Guidelines
│   ├── Error Handling
│   ├── Accessibility Guidelines
│   └── Testing Requirements
└── Component Template
    ├── File Structure
    ├── Props Interface
    ├── Internal Organization
    └── Documentation Requirements

State Management Guide
├── State Rules
│   ├── State Categories
│   │   ├── UI State
│   │   ├── Application State
│   │   ├── Server State
│   │   └── Form State
│   ├── State Management Principles
│   └── Technology-Specific Rules
├── Hook Template
│   ├── Hook Structure
│   ├── State Declaration
│   ├── Effect Cleanup
│   └── Return Object
├── Store Template
│   ├── Store Structure
│   ├── Actions
│   └── Selectors
└── Context Template
    ├── Context Structure
    ├── Provider Component
    └── Custom Hooks
```

## 6. Example-Based Learning Scenarios

### Scenario 1: Creating a Button Component

**User Request:** "I need a Button component with different variants and sizes."

**AI Assistant Process:**
1. Classify as UI Component (Component Rules)
2. Reference Component Template for structure
3. Implement variants and sizes as props
4. Follow accessibility guidelines for buttons
5. Create tests for all variants and states
6. Document props and usage examples

**Example Implementation:**

```typescript
// 1. Imports
import React from 'react';
import styles from './Button.module.css';

// 2. Props Interface
interface ButtonProps {
  /** The button's visual style */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** The button's size */
  size?: 'small' | 'medium' | 'large';
  /** The button's label text */
  children: React.ReactNode;
  /** Called when the button is clicked */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Type of button */
  type?: 'button' | 'submit' | 'reset';
}

// 3. Component
export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps): JSX.Element {
  // 4. Render
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Scenario 2: Implementing a User Profile Feature

**User Request:** "Create a user profile page that fetches user data and allows editing."

**AI Assistant Process:**
1. Identify component hierarchy (Page + Container + UI components)
2. Plan state management (Server state with React Query + Form state)
3. Design component interfaces
4. Implement with proper loading/error states
5. Add form validation and submission handling
6. Create tests for all scenarios

**Example Planning:**

```
Component Hierarchy:
- UserProfilePage (Page Component)
  - UserProfileContainer (Container Component)
    - UserProfileForm (UI Component)
      - Input, Button (UI Components)
    - UserAvatar (UI Component)

State Management:
- Server State: useUserQuery from React Query
- Form State: React Hook Form
- UI State: useState for edit mode

Implementation Steps:
1. Create UserProfilePage with routing parameters
2. Create UserProfileContainer with data fetching
3. Implement UserProfileForm with validation
4. Add update mutation with optimistic updates
5. Implement error handling and loading states
6. Add tests for each component
```

## 7. Real-Time Rule Application Guide

When writing code, explicitly reference the rules being applied:

### Component Example:

```typescript
// Applying Component Rule 2.1: Each component in its own file
// Applying Component Rule 2.2: Use function declarations for components

// Applying Component Rule 3.1: Use TypeScript interfaces for prop definitions
interface CounterProps {
  // Applying Coding Standard 1.3: Add JSDoc comments for all props
  /** Initial count value */
  initialCount?: number;
  /** Step size for incrementing/decrementing */
  step?: number;
  /** Maximum allowed value */
  max?: number;
  /** Callback when count changes */
  onChange?: (count: number) => void;
}

// Applying Component Rule 2.3: Export as named export
export function Counter({
  // Applying Component Rule 3.4: Provide default values for optional props
  initialCount = 0,
  step = 1,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
}: CounterProps): JSX.Element {
  // Applying Component Rule 4.1: Hooks first
  // Applying State Rule.1.1: UI state with useState
  const [count, setCount] = useState(initialCount);
  
  // Applying Component Rule 4.2: Derived state next
  const isAtMax = count >= max;
  
  // Applying Component Rule 4.3: Event handlers next
  // Applying State Rule 4.1: Immutable state updates
  const increment = useCallback(() => {
    if (!isAtMax) {
      setCount(prev => {
        const newCount = Math.min(prev + step, max);
        onChange?.(newCount);
        return newCount;
      });
    }
  }, [isAtMax, max, onChange, step]);
  
  // Applying Component Rule 4.4: Effects after handlers
  useEffect(() => {
    // Applying State Rule 1.4: Reset UI state on unmount
    return () => {
      // Cleanup
    };
  }, []);
  
  // Applying Component Rule 4.5: Render logic last
  return (
    // Applying Accessibility Guideline 1.1: Semantic HTML
    <div className="counter">
      <p>Count: {count}</p>
      <div className="counter-controls">
        <button onClick={() => setCount(Math.max(count - step, 0))}>-</button>
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={increment} disabled={isAtMax}>+</button>
      </div>
    </div>
  );
}
```

### State Management Example:

```typescript
// Applying State Rule 2.2: Zustand for global application state
// Applying Coding Standard 1.1: Explicit types for all declarations

// Applying State Rule 1.2: Clear interface for state
interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Applying State Rule 1.1: Single source of truth
export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Applying State Rule 4.2: Immutable state updates
  login: async (credentials) => {
    // Applying State Rule 4.1: Batch related state updates
    set({ isLoading: true, error: null });
    
    try {
      const user = await authApi.login(credentials);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // Applying State Rule 3.4: Proper error handling
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      });
    }
  },
  
  // Other actions...
}));
```

## 8. Task-Specific Guidance

### Creating New Components

1. **Identify Component Type** (Component Rules)
   - UI Component: Presentational, no business logic
   - Layout Component: Focused on arrangement
   - Container Component: Data fetching, business logic
   - Page Component: Corresponds to a route
   - Compound Component: Multiple related components

2. **Create Component Structure** (Component Template)
   - File organization (single file or directory)
   - Props interface with JSDoc
   - Component declaration
   - Internal organization

3. **Implement State Management** (State Rules)
   - Choose appropriate state category
   - Select state management approach
   - Implement state updates

4. **Add Error Handling**
   - Loading states
   - Error states
   - Empty states
   - Validation

5. **Ensure Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation
   - Focus management

6. **Add Tests** (Testing Strategy)
   - Component rendering
   - User interactions
   - State changes
   - Accessibility

### Implementing Features

1. **Plan Component Hierarchy**
   - Page Component
   - Container Components
   - UI Components

2. **Design Data Flow**
   - API interactions
   - State management
   - Prop passing

3. **Implement Components** (Component Rules)
   - Start with UI components
   - Implement containers
   - Create page component

4. **Add State Management** (State Rules)
   - Server state with React Query
   - Application state with Zustand
   - Form state with React Hook Form

5. **Implement Error Handling**
   - API errors
   - Validation errors
   - Edge cases

6. **Add Testing** (Testing Strategy)
   - Component tests
   - Integration tests
   - E2E tests if needed

## 9. Communication Guidelines

### Explaining Implementation Choices

When explaining implementation choices to a user, always:

1. **Reference the Specific Rule**
   - "I've used a Container/Presenter pattern here, following the Component Rules that recommend separating data fetching from presentation."

2. **Explain the Reasoning**
   - "This approach makes the UI component reusable and easier to test, while keeping data fetching logic isolated and maintainable."

3. **Highlight Alternatives Considered**
   - "We could have used a single component with everything combined, but that would make it harder to test and reuse the UI portions."

4. **Connect to Best Practices**
   - "This pattern is widely used in React applications to maintain separation of concerns, improving maintainability and testability."

### Proposing Solutions

When proposing solutions:

1. **Provide Context**
   - Acknowledge the current state of the code
   - Reference relevant documentation

2. **Present a Clear Implementation Plan**
   - Outline the components to create/modify
   - Explain state management approach
   - Detail the implementation steps

3. **Explain Benefits**
   - Performance benefits
   - Maintainability improvements
   - Adherence to project standards

4. **Note Tradeoffs**
   - Any performance considerations
   - Complexity tradeoffs
   - Migration challenges

## 10. Continuous Improvement

As an AI assistant, continuously improve your understanding:

1. **Update Mental Model**
   - Note patterns in the codebase
   - Recognize project-specific conventions
   - Build on previous interactions

2. **Apply Feedback**
   - Incorporate user feedback on implementations
   - Adjust approach based on user preferences
   - Note exceptions to standard rules

3. **Suggest Improvements**
   - Identify opportunities for refactoring
   - Suggest pattern optimizations
   - Recommend documentation enhancements

## 11. Error Prevention System

To prevent common mistakes in the development process:

### Mandatory Pre-Implementation Checklist

Every task MUST begin with this checklist before implementation:

```
□ Context Assessment Framework completed and documented
□ Current state recorded in Context Maintenance Structure
□ Component classification and requirements identified
□ State management approach defined
□ Implementation plan created with specific steps
□ Plan validated against relevant ZenReact rules
□ Integration points with existing code identified
```

### Implementation Safety Barriers

The following safety barriers must be in place:

1. **No Implementation Without Context** - Never begin coding without completing context assessment
2. **Document First, Code Second** - Always document the approach before implementation
3. **Plan-Driven Implementation** - Follow the documented plan step by step
4. **Continuous Context Updating** - Update context documentation as implementation progresses

### Recovery Process

If you find yourself implementing without proper planning:

1. **Stop immediately** - Do not continue with implementation
2. **Return to Context Assessment** - Complete the framework
3. **Document Current Progress** - Update the Context Maintenance Structure
4. **Create/Update Implementation Plan** - Plan remaining steps
5. **Resume Implementation** - Follow the plan methodically

### Implementation Quality Validation

After implementation, validate against these criteria:

```
□ Implementation follows the pre-defined plan
□ Code adheres to ZenReact standards and rules
□ Context documentation is complete and up-to-date
□ Implementation checklists have been completed
□ Documentation is comprehensive and accurate
```

## Conclusion

This guide is designed to help AI assistants effectively navigate and apply the ZenReact documentation. By following these structured approaches, maintaining context, and applying the appropriate rules and patterns, you can provide consistent, high-quality assistance for React development in the ZenReact framework.

Remember that the primary goal is to help developers create maintainable, performant, and accessible React applications while maintaining consistent patterns that support both human and AI collaboration. 