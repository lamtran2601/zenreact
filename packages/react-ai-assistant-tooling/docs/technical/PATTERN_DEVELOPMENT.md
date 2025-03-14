# Pattern Development Guide

This guide explains how to create effective React patterns that work well with AI assistants like Cursor. Well-documented patterns enable both human developers and AI tools to implement consistent, high-quality components.

## What Makes an Effective Pattern?

Effective patterns for AI-assisted development have several key characteristics:

1. **Clear Structure**: Well-defined components with distinct purposes
2. **Explicit Conventions**: Clearly stated naming and organization rules
3. **Complete Examples**: Fully implemented code examples
4. **Edge Case Handling**: Guidance for unusual scenarios
5. **AI-Optimized Documentation**: Content structured for both human and AI understanding

## Pattern Documentation Template

When creating new patterns, use this consistent structure:

```markdown
# Pattern Name

## Overview
Brief description of what the pattern does and its purpose (1-3 sentences).

## Use Cases
List of common situations where this pattern should be applied.

## Structure
Description of the component's structure, parts, and organization.

## TypeScript Interface
The TypeScript interface(s) that define the pattern's API.

## Implementation Example
Complete code example of the pattern implementation.

## CSS Styling
Styling guidance and examples.

## Usage Example
Example of how to use the pattern in a real application.

## Accessibility Considerations
Guidance for ensuring the pattern is accessible.

## Best Practices
Recommendations for effective implementation.

## Common Pitfalls
Issues to avoid when implementing the pattern.

## Related Patterns
Links to related patterns.

## References
External resources and documentation.
```

## Development Process

### 1. Identify Pattern Needs

Start by identifying common UI or logic patterns in your React applications:

- Review existing components for repeated structures
- Note common challenges that developers face
- Identify areas where consistency is lacking
- Look for complex implementations that could be standardized

Questions to ask:
- What components do we frequently rebuild?
- Where do developers spend significant time making decisions?
- What aspects of our UI need more consistency?
- What patterns would benefit from standardization?

### 2. Research Existing Solutions

Before creating a new pattern:

- Review existing design systems and component libraries
- Search for best practices in the React community
- Check accessibility guidelines for the pattern type
- Look at how similar UI patterns are implemented in popular libraries

Research sources:
- Material Design, Ant Design, Chakra UI documentation
- React community articles and discussions
- WCAG accessibility guidelines
- Open source component implementations

### 3. Define Pattern Requirements

Clearly define what the pattern must accomplish:

- **Functional Requirements**: What the pattern must do
- **API Requirements**: How developers will interact with it
- **Customization Points**: Where flexibility is needed
- **Constraints**: Limitations and boundaries

Example requirements for a Modal pattern:
```
1. Functional Requirements:
   - Display content in a focused overlay
   - Provide open/close functionality
   - Block interaction with content underneath
   - Support keyboard navigation and focus trapping

2. API Requirements:
   - Simple open/close API
   - Customizable content
   - Header, body, footer structure
   - Control over backdrop behavior

3. Customization Points:
   - Visual styling (colors, shapes, animations)
   - Size and positioning
   - Close behavior (backdrop click, escape key)
   - Transition effects

4. Constraints:
   - Must be fully accessible
   - Must work on all supported browsers
   - Must handle content overflow appropriately
   - Must manage focus correctly
```

### 4. Create Implementation Example

Develop a complete, working implementation:

- Start with the TypeScript interface
- Implement the component with all required functionality
- Ensure it meets accessibility requirements
- Add comprehensive comments
- Include variations for different use cases

Guidelines for implementation:
- Prioritize simplicity and readability
- Follow React best practices
- Use modern React patterns (hooks, context, etc.)
- Include comprehensive error handling
- Provide sensible defaults

### 5. Document the Pattern

Create comprehensive documentation following the template:

- Use clear, concise language
- Include complete code examples
- Provide usage examples for different scenarios
- Document edge cases and how to handle them
- Explain the rationale behind design decisions

Documentation tips:
- Write for both beginner and advanced developers
- Organize content with clear headings
- Use bullet points for lists of requirements or considerations
- Include code comments that explain "why" not just "what"
- Highlight critical information (accessibility, performance)

### 6. Test with AI Assistants

Verify that AI tools can effectively implement your pattern:

- Use your pattern documentation in prompts to AI assistants
- Test whether the AI can produce correct implementations
- Identify gaps or ambiguities in your documentation
- Refine the documentation based on AI output

Testing approach:
1. Create a prompt based on your pattern documentation
2. Ask the AI to implement the pattern
3. Evaluate the output against your requirements
4. Identify which aspects were implemented correctly or incorrectly
5. Revise documentation to address any issues

### 7. Refine Based on Feedback

Continuously improve the pattern:

- Collect feedback from human developers
- Analyze AI-generated implementations
- Update documentation to address common issues
- Add more examples for edge cases
- Refine the TypeScript interface based on usage

Feedback questions:
- Is the pattern easy to understand and implement?
- Does the pattern solve the intended problem effectively?
- Are there edge cases not covered in the documentation?
- Is the TypeScript interface intuitive and complete?
- Can AI assistants accurately implement the pattern?

## AI Optimization Tips

### Structuring Documentation for AI

AI assistants process documentation differently than humans. Optimize your patterns with these techniques:

1. **Use Clear Headings and Structure**
   - Organize content hierarchically with consistent headings
   - Group related information together
   - Use structured formats (tables, lists) for comparison data

2. **Provide Explicit Examples**
   - Include complete code examples, not just snippets
   - Show both simple and complex implementations
   - Demonstrate edge case handling

3. **Define Terms Clearly**
   - Avoid ambiguous terminology
   - Define project-specific terms
   - Use consistent naming across documentation

4. **Include Context and Reasoning**
   - Explain why certain approaches are recommended
   - Provide context for decisions
   - Link to related patterns and concepts

### Effective Code Examples

Code examples for AI should be:

1. **Complete**: Include all necessary imports, type definitions, and component code
2. **Well-Commented**: Add explanatory comments for complex logic
3. **Focused**: Demonstrate one concept clearly without extraneous code
4. **Varied**: Show different implementation options and variations
5. **Realistic**: Use realistic props, state, and data structures

Example of a well-structured code example:

```tsx
// Import necessary dependencies
import React, { useState, useCallback } from 'react';
import './DataCard.css';

// Define the component's props interface
interface DataCardProps<T> {
  /** The data item to display */
  item: T;
  /** Optional custom renderer for the header */
  renderHeader?: (item: T) => React.ReactNode;
  /** Optional custom renderer for the content */
  renderContent?: (item: T) => React.ReactNode;
  /** Optional click handler */
  onClick?: (item: T) => void;
  /** Whether the card is currently selected */
  isSelected?: boolean;
  /** Additional class name for custom styling */
  className?: string;
}

/**
 * DataCard component displays a data item in a card format.
 * 
 * @example
 * ```tsx
 * <DataCard 
 *   item={product}
 *   renderHeader={(product) => <h3>{product.name}</h3>}
 *   renderContent={(product) => <p>{product.description}</p>}
 *   onClick={handleProductSelect}
 * />
 * ```
 */
export function DataCard<T>({
  item,
  renderHeader,
  renderContent,
  onClick,
  isSelected = false,
  className = '',
}: DataCardProps<T>): React.ReactElement {
  // Create callback for click handling
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(item);
    }
  }, [item, onClick]);

  // Combine class names for styling
  const cardClassName = `data-card ${isSelected ? 'is-selected' : ''} ${className}`;

  return (
    <div className={cardClassName} onClick={handleClick}>
      {/* Render header if provided */}
      {renderHeader && (
        <div className="data-card-header">
          {renderHeader(item)}
        </div>
      )}
      
      {/* Render content if provided */}
      {renderContent && (
        <div className="data-card-content">
          {renderContent(item)}
        </div>
      )}
    </div>
  );
}
```

## Common Pattern Types

When developing patterns, consider these common categories:

### UI Component Patterns

Patterns for visual UI elements:

1. **Display Patterns**: For showing data (cards, tables, lists)
2. **Input Patterns**: For collecting user input (forms, inputs, selectors)
3. **Navigation Patterns**: For moving between views (menus, tabs, breadcrumbs)
4. **Feedback Patterns**: For user notifications (alerts, toasts, loaders)
5. **Layout Patterns**: For page organization (grids, sidebars, panels)

### Logic Patterns

Patterns for component behavior and logic:

1. **State Management Patterns**: For handling component or application state
2. **Data Fetching Patterns**: For API interactions and data loading
3. **Form Handling Patterns**: For input validation and submission
4. **Event Handling Patterns**: For user interaction logic
5. **Lifecycle Patterns**: For component initialization and cleanup

### Architecture Patterns

Patterns for application structure:

1. **Component Composition Patterns**: For combining components
2. **Code Organization Patterns**: For file and folder structure
3. **Data Flow Patterns**: For passing and transforming data
4. **Performance Patterns**: For optimizing rendering and calculations
5. **Testing Patterns**: For effective component testing

## Case Study: Developing a Pattern

Let's walk through developing a "Data Display Card" pattern:

### 1. Identify the Need

We notice many teams are creating similar card components with inconsistent APIs and varying levels of accessibility compliance.

### 2. Research Existing Solutions

We review card implementations in Material UI, Ant Design, and our own codebase to identify common patterns and best practices.

### 3. Define Requirements

```
1. Functional Requirements:
   - Display an item with visual boundaries
   - Support media (image/icon), primary content, secondary content, and actions
   - Handle loading and empty states
   - Support interactive (clickable) and non-interactive modes

2. API Requirements:
   - Generic typing for different data types
   - Customizable rendering for each section
   - Consistent event handling
   - Accessibility props

3. Customization Points:
   - Visual styling (via CSS)
   - Content rendering (via render props)
   - Interactive behavior
   - Layout variations

4. Constraints:
   - Must be fully accessible
   - Must support responsive layouts
   - Must handle content overflow
```

### 4. Create Implementation

We develop a TypeScript implementation with all required functionality, including proper accessibility attributes and comprehensive prop types.

### 5. Document the Pattern

We create comprehensive documentation following our template, with multiple examples, accessibility guidance, and best practices.

### 6. Test with AI

We provide the documentation to Cursor AI and ask it to implement the pattern for specific use cases. We identify that our examples didn't clearly show how to handle empty states, so we add more examples.

### 7. Refine and Finalize

We update the documentation based on developer feedback and AI testing results, adding more examples and clarifying the API usage.

## Conclusion

Creating effective patterns for AI-assisted React development requires careful attention to documentation structure, implementation details, and real-world usage. By following this guide, you can develop patterns that both human developers and AI assistants can effectively implement, leading to more consistent and higher-quality applications. 