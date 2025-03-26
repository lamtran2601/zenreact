# ZenReact Training Scenarios

This document provides detailed scenarios designed to test an AI assistant's ability to apply ZenReact documentation correctly. Each scenario represents a typical development task that requires familiarity with different aspects of the ZenReact framework.

## Basic Training Scenarios

### Scenario 1: Component Classification and Structure

**User Request:**
> "I need to create a button component that has primary, secondary, and disabled states. It should also support icons and loading states."

**Required Knowledge:**
- Component Rules
- Component Templates
- Accessibility Guidelines

**Expected Reasoning Process:**
1. Identify this as a UI Component from the classification guidelines
2. Apply proper TypeScript interfaces for props
3. Implement proper accessibility attributes
4. Add appropriate test coverage

**Success Criteria:**
- Correctly classifies the component as a UI Component
- Creates appropriate prop interfaces with proper TypeScript types
- Implements accessibility features (ARIA attributes, keyboard interaction)
- Follows the component file structure from the template
- Implements test coverage for all states

### Scenario 2: State Management Selection

**User Request:**
> "I'm building a shopping cart feature. Users should be able to add/remove items, and the cart should persist between page refreshes. The cart information needs to be accessible from multiple components."

**Required Knowledge:**
- State Rules
- Store Template
- Implementation Guide

**Expected Reasoning Process:**
1. Analyze the state requirements (global persistence, shared across components)
2. Apply the State Decision Tree to determine appropriate state management
3. Identify this as Application State requiring Zustand
4. Implement persistence with appropriate storage mechanism

**Success Criteria:**
- Selects Zustand for state management with proper justification
- Implements proper store structure with TypeScript types
- Adds persistence layer using localStorage or similar
- Creates appropriate actions for cart operations
- Follows proper normalization patterns for cart items

## Intermediate Training Scenarios

### Scenario 3: API Integration with Server State

**User Request:**
> "I need to fetch a list of products from our API endpoint at /api/products. The data should be cached, and we should show loading and error states. Users should be able to filter products by category."

**Required Knowledge:**
- State Rules (Server State)
- Context Management
- Error Handling Guidelines

**Expected Reasoning Process:**
1. Identify this as Server State
2. Select React Query as the appropriate tool
3. Implement proper loading, error, and success states
4. Set up appropriate caching configuration
5. Create a clean abstraction for the API call

**Success Criteria:**
- Uses React Query with proper configuration
- Implements loading, error, and success states
- Creates a custom hook for the data fetching logic
- Adds appropriate TypeScript interfaces for the data
- Handles filtering without unnecessary refetching

### Scenario 4: Form State Implementation

**User Request:**
> "I need to create a registration form with email, password, and confirmation fields. It should validate all fields, show error messages, and only enable the submit button when valid."

**Required Knowledge:**
- State Rules (Form State)
- Component Rules
- Hook Template

**Expected Reasoning Process:**
1. Identify this as Form State
2. Select React Hook Form as the appropriate tool
3. Implement proper validation rules
4. Create appropriate form state management
5. Structure the component with accessibility in mind

**Success Criteria:**
- Uses React Hook Form with validation
- Implements appropriate error messages
- Makes the form accessible with proper ARIA attributes
- Creates a clean abstraction of form logic in a custom hook
- Follows the component structure guidelines

## Advanced Training Scenarios

### Scenario 5: Performance Optimization

**User Request:**
> "Our product list component is re-rendering too often. It renders 100 product items and each has price, name, and an add-to-cart button. Can you help optimize it?"

**Required Knowledge:**
- Component Rules (Performance Section)
- State Rules
- Architecture Guidelines

**Expected Reasoning Process:**
1. Analyze rendering performance issues
2. Apply memoization strategies
3. Implement virtualization for long lists
4. Optimize state updates to minimize renders
5. Use proper event handling patterns

**Success Criteria:**
- Uses React.memo appropriately
- Implements virtualization for the product list
- Optimizes state updates to reduce renders
- Uses useCallback for event handlers
- Explains performance improvements with rationale

### Scenario 6: Complex Component Composition

**User Request:**
> "I need to create a data table component that supports sorting, filtering, pagination, row selection, and expandable rows. It should be reusable across the application."

**Required Knowledge:**
- Component Rules
- State Rules
- Architecture Guidelines

**Expected Reasoning Process:**
1. Design a component composition strategy
2. Select appropriate state management approach
3. Create clean abstractions for complex functionality
4. Apply compound component pattern
5. Ensure accessibility compliance

**Success Criteria:**
- Implements compound component pattern effectively
- Uses appropriate state management for table features
- Makes the table fully accessible with ARIA and keyboard support
- Provides clear documentation for the component
- Creates proper test coverage for all features

## Integration Scenarios

### Scenario 7: Feature Implementation from Scratch

**User Request:**
> "I need to implement a complete product review feature. Users should be able to read reviews, write new reviews, edit their own reviews, and see average ratings. The feature should integrate with our existing product detail page."

**Required Knowledge:**
- All ZenReact documentation
- Integration patterns
- Context Management

**Expected Reasoning Process:**
1. Break down the feature into components and state
2. Design appropriate component hierarchy
3. Select state management strategies for different aspects
4. Plan API integration
5. Create a complete implementation plan

**Success Criteria:**
- Creates a comprehensive implementation plan
- Properly separates concerns between components
- Selects appropriate state management for different aspects
- Designs accessible and performant components
- Follows all ZenReact guidelines consistently

### Scenario 8: Accessibility Compliance

**User Request:**
> "Our application needs to be WCAG AA compliant. Can you help us identify and fix accessibility issues in our current components? Specifically, our dropdown menus, modal dialogs, and form components need review."

**Required Knowledge:**
- Accessibility Guidelines
- Component Rules
- Testing Strategy

**Expected Reasoning Process:**
1. Apply accessibility heuristics to identify issues
2. Suggest specific fixes for each component type
3. Reference appropriate WCAG criteria
4. Implement accessible patterns for interaction
5. Create tests for accessibility requirements

**Success Criteria:**
- Identifies common accessibility issues
- Proposes specific, implementable solutions
- References appropriate accessibility guidelines
- Creates proper keyboard navigation patterns
- Implements proper ARIA attributes and roles

## Project-Level Scenarios

### Scenario 9: Refactoring Legacy Components

**User Request:**
> "We have several legacy class components that need to be refactored to functional components with hooks. They're currently using Redux but we want to move to Zustand. How should we approach this refactoring?"

**Required Knowledge:**
- Component Rules
- State Rules
- Migration Strategies

**Expected Reasoning Process:**
1. Create a refactoring strategy
2. Design a state migration plan
3. Apply patterns for hook conversions
4. Plan incremental implementation
5. Ensure test coverage throughout

**Success Criteria:**
- Outlines a clear step-by-step refactoring plan
- Creates appropriate migration patterns for state
- Preserves functionality while improving code quality
- Follows ZenReact guidelines for the refactored code
- Maintains or improves test coverage

### Scenario 10: Real-time Collaborative Feature

**User Request:**
> "We need to implement a real-time collaborative editor where multiple users can edit a document simultaneously. Changes should be synchronized in real-time, and we need to show which user is making which changes."

**Required Knowledge:**
- State Rules
- Architecture Guidelines
- Performance Guidelines

**Expected Reasoning Process:**
1. Design a real-time state synchronization strategy
2. Select appropriate libraries and patterns
3. Plan for optimistic updates and conflict resolution
4. Design appropriate UI for real-time collaboration
5. Consider performance implications

**Success Criteria:**
- Proposes an effective real-time synchronization strategy
- Addresses key challenges like conflict resolution
- Considers performance implications
- Designs appropriate UI for collaborative features
- Creates a maintainable and extensible solution

## How to Use These Scenarios

These training scenarios can be used in several ways:

1. **Self-assessment**: AI assistants can use these scenarios to evaluate their understanding of ZenReact guidelines.

2. **Guided Learning**: Developers can present these scenarios to AI assistants to help them understand specific aspects of ZenReact.

3. **Capability Testing**: Evaluate an AI assistant's capabilities by presenting these scenarios and assessing the responses.

4. **Documentation Improvement**: Use the scenarios to identify areas where ZenReact documentation could be clearer or more comprehensive.

For each scenario, the AI assistant should:

1. Identify which ZenReact documents are relevant to the scenario
2. Apply the appropriate rules and guidelines
3. Generate a solution that meets all success criteria
4. Explain the reasoning behind the implementation choices
5. Reference specific ZenReact rules and guidelines that informed the solution

## Scoring Rubric

For evaluating AI assistant responses to these scenarios:

### 5 - Exceptional
- Fully addresses all aspects of the scenario
- Demonstrates complete understanding of ZenReact guidelines
- Proposes innovative yet compliant solutions
- Clearly explains reasoning with appropriate rule references
- Anticipates potential issues and offers mitigation strategies

### 4 - Strong
- Addresses all key aspects of the scenario
- Shows strong understanding of ZenReact guidelines
- Provides a complete solution
- Explains reasoning with some rule references
- Considers most relevant factors

### 3 - Satisfactory
- Addresses most aspects of the scenario
- Shows basic understanding of ZenReact guidelines
- Provides a workable solution
- Explains some reasoning
- Misses some optimization opportunities

### 2 - Needs Improvement
- Partially addresses the scenario
- Shows incomplete understanding of ZenReact guidelines
- Provides a solution with notable gaps
- Limited explanation of reasoning
- Misses important considerations

### 1 - Unsatisfactory
- Fails to address the core needs of the scenario
- Shows minimal understanding of ZenReact guidelines
- Provides an incomplete or incorrect solution
- No clear explanation of reasoning
- Contradicts ZenReact guidelines

## Example Response Format

For AI assistants responding to these scenarios, the following format is recommended:

```
# Response to Scenario [Number]: [Name]

## Understanding of the Request
[Brief restatement of what the user is asking for]

## Relevant ZenReact Documentation
- [Document 1]: [Why it's relevant]
- [Document 2]: [Why it's relevant]
...

## Implementation Approach
[Detailed explanation of the proposed solution]

## Key ZenReact Rules Applied
1. [Rule reference]: [How it was applied]
2. [Rule reference]: [How it was applied]
...

## Implementation Details
[Code examples or detailed implementation steps]

## Testing and Validation Strategy
[How the implementation would be tested]

## Additional Considerations
[Edge cases, performance implications, accessibility concerns, etc.]
```

This structured format ensures that responses are comprehensive and clearly demonstrate the application of ZenReact guidelines.

## Conclusion

These training scenarios are designed to exercise an AI assistant's understanding of the ZenReact framework across a range of complexity levels and application areas. By working through these scenarios, AI assistants can develop proficiency in applying ZenReact principles to real-world development tasks. 