# AI Collaboration Rules for React Development

This document defines the rules and best practices for effectively collaborating with AI assistants when developing React applications in the ZenReact framework.

## Core Principles

1. **Context is King**: Always provide sufficient context for AI to make informed decisions
2. **Pattern Consistency**: Ensure AI follows established project patterns
3. **Progressive Disclosure**: Build understanding incrementally rather than all at once
4. **Feedback Loops**: Provide feedback on AI suggestions to improve future interactions
5. **Clear Boundaries**: Establish clear areas of responsibility between developer and AI

## Communication Rules

### Rule 1: Provide Context-Rich Requests

**Do**:
```
"Create a Button component that follows our design system, using styled-components and our theme. 
It should support primary, secondary, and outline variants, different sizes, and have proper type definitions."
```

**Don't**:
```
"Create a button component."
```

### Rule 2: Reference Existing Patterns

**Do**:
```
"Implement form validation following the same pattern we used in the RegistrationForm component, 
with field-level validation and form-level submission checks."
```

**Don't**:
```
"Add validation to the form."
```

### Rule 3: Use Precise Terminology

**Do**:
```
"Create a custom hook that manages pagination state for our data table, with functions to change page, 
adjust page size, and track total pages."
```

**Don't**:
```
"Make something to handle the table pages."
```

### Rule 4: Establish Clear Requirements

**Do**:
```
"Create a ProductCard component that:
- Displays product image, name, price, and rating
- Shows a badge for sale items
- Has hover and focus states
- Supports a 'quick view' button
- Is fully accessible
- Works in both grid and list layouts"
```

**Don't**:
```
"Make a card to show products."
```

### Rule 5: Provide Technical Constraints

**Do**:
```
"Implement a data fetching solution for the Products feature using React Query, 
with proper TypeScript typing, error handling, and loading states."
```

**Don't**:
```
"Add code to fetch the products."
```

## Code Quality Rules

### Rule 1: Enforce TypeScript Usage

Always ensure AI generates properly typed React components:

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // Implementation
};
```

### Rule 2: Ensure Proper Component Structure

Components should follow this structure:
1. Import statements
2. Type definitions
3. Component function
4. Helper functions (if small) or import them if complex
5. Styled components (if using styled-components)
6. Default export

```typescript
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface UserProfileProps {
  userId: string;
  showSettings?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, showSettings = false }) => {
  // Implementation
};

const ProfileContainer = styled.div`
  // Styles
`;

export default UserProfile;
```

### Rule 3: Enforce Hooks Rules

Ensure AI follows React Hooks rules:
- Only call hooks at the top level
- Only call hooks from React functions
- Use custom hooks for shared stateful logic
- Name hooks with 'use' prefix

### Rule 4: Maintain Proper Error Handling

All async operations should include proper error handling:

```typescript
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await api.getData();
    setData(response.data);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
  }
};
```

### Rule 5: Follow Performance Best Practices

AI should implement performance optimizations:
- Memoize expensive calculations with useMemo
- Memoize callbacks with useCallback when passed as props
- Use React.memo for pure functional components
- Avoid unnecessary re-renders

## Collaborative Development Workflow

### Rule 1: Incremental Development

Break down features into smaller steps:

1. Define component interfaces
2. Create component skeleton
3. Implement basic functionality
4. Add styling
5. Enhance with advanced features
6. Optimize performance
7. Add tests

### Rule 2: Component-First Approach

Always build from components up, not pages down:

1. Identify the smallest reusable components
2. Build these components with proper props interface
3. Compose smaller components into larger ones
4. Assemble page from components

### Rule 3: State Management Clarity

Be explicit about state management approaches:

```
"For this feature, we will:
1. Use React Query for server state (products data)
2. Use Zustand for global UI state (filters, sorting)
3. Use local component state for component-specific UI state (expanded/collapsed)"
```

### Rule 4: Consistent Naming Conventions

Enforce naming consistency:

- **Components**: PascalCase (UserProfile)
- **Hooks**: camelCase with 'use' prefix (useUserData)
- **Context**: PascalCase with 'Context' suffix (UserContext)
- **Files**: Match the component/hook name (UserProfile.tsx, useUserData.ts)
- **Styled components**: PascalCase with descriptive name (StyledButton, ProfileContainer)
- **Event handlers**: camelCase with 'handle' prefix (handleSubmit)

### Rule 5: Code Review Approach

When reviewing AI-generated code, check for:

1. Type safety and proper interfaces
2. Adherence to component patterns
3. Proper error handling
4. Performance considerations
5. Accessibility implementation
6. Test coverage

## AI Collaboration Scenarios

### Scenario 1: Feature Planning

**Developer**:
```
"We need to build a user dashboard that shows statistics, recent activity, and user settings. 
Let's plan the component structure and state management approach."
```

**Expected AI Response**:
A comprehensive plan including:
- Component hierarchy
- State management strategy
- API integration points
- Potential performance considerations
- Suggested implementation steps

### Scenario 2: Component Implementation

**Developer**:
```
"Let's implement the ActivityFeed component for our dashboard that:
- Shows a list of recent user activities
- Supports loading more activities on scroll
- Groups activities by date
- Allows filtering by activity type
- Uses our existing Card and Badge components"
```

**Expected AI Response**:
A well-structured implementation that:
- Follows the component pattern
- Uses proper TypeScript interfaces
- Implements the required functionality
- Follows project styling patterns
- Includes appropriate performance optimizations

### Scenario 3: Bug Fixing

**Developer**:
```
"There's a bug in our ProductList component where the filters aren't being applied correctly when the user changes categories. 
Here's the current implementation: [code]"
```

**Expected AI Response**:
An analysis that:
- Identifies the root cause of the bug
- Explains the issue clearly
- Proposes a specific fix
- Suggests preventative measures for similar bugs

### Scenario 4: Code Optimization

**Developer**:
```
"The UserDashboard component is rendering too frequently. Let's optimize it to reduce unnecessary renders."
```

**Expected AI Response**:
Optimization suggestions that:
- Identify specific causes of re-renders
- Implement appropriate memoization
- Restructure component if necessary
- Add appropriate comments explaining the optimizations

## Troubleshooting Collaboration Issues

### Issue 1: AI Misunderstands Project Patterns

**Solution**: Provide a concrete example from the codebase:
```
"The approach you've suggested doesn't match our project patterns. 
Here's how we've implemented similar functionality in the ProductCard component: [example code]"
```

### Issue 2: AI Generates Overly Complex Solutions

**Solution**: Request simplification with specific constraints:
```
"This solution is more complex than needed. Let's simplify by:
1. Using our existing hooks instead of creating new ones
2. Reducing the component nesting to at most 2 levels
3. Leveraging our UI component library instead of custom components"
```

### Issue 3: AI Misses Edge Cases

**Solution**: Explicitly request edge case handling:
```
"This implementation looks good, but we need to handle these edge cases:
1. Empty data state
2. Error state from API
3. User permission restrictions
4. Mobile responsive behavior"
```

### Issue 4: Inconsistent State Management

**Solution**: Clarify state management boundaries:
```
"Let's clarify our state management approach for this feature:
1. User preferences should use the global UserStore (Zustand)
2. Form state should use local component state
3. API data should use React Query
4. UI state (expanded/collapsed) should use local component state"
```

## Final Checklist for AI Collaboration

Before completing a feature with AI assistance, ensure:

- [ ] Component follows proper TypeScript typing
- [ ] State management follows project patterns
- [ ] Error handling is implemented for all edge cases
- [ ] Performance optimizations are applied where necessary
- [ ] Accessibility requirements are met
- [ ] Code follows project styling conventions
- [ ] Tests are implemented for key functionality

## Conclusion

Effective collaboration with AI assistants requires clear communication, consistent patterns, and structured workflows. By following these rules, development teams can maximize the benefits of AI assistance while maintaining high-quality, consistent React applications. 