# Component Development for Autonomous React Development

This guide outlines the process for developing React components with AI assistance in the ZenReact framework, with a focus on maintaining proper context and following established patterns.

## Component Development Process

### 1. Component Planning

Before creating a component, define its purpose and requirements:

1. **Define Component Purpose**: What specific role will this component fulfill?
2. **Identify Component Type**: UI, Layout, Feature, Page, or Compound?
3. **Determine Props Interface**: What inputs will the component accept?
4. **Plan State Management**: What state does the component need to manage?
5. **Consider Component Composition**: How will this component interact with others?
6. **Identify Reuse Opportunities**: Can existing components be leveraged?

**Example Planning Request to AI**:
```
"I need to create a ProductCard component that:
- Displays a product image, name, price, and rating
- Shows a badge for products on sale
- Handles click events to navigate to product detail
- Has hover and focus states
- Shows loading state while image loads
- Follows our design system for cards

This component will be used in both grid and list views.
Let's plan the component structure and props interface."
```

### 2. Component Skeleton Creation

Create the component skeleton with proper TypeScript typing:

1. **Define props interface** with detailed JSDoc comments
2. **Create the component file** following the component template
3. **Establish styled-components** structure
4. **Add placeholder implementation** for key functionality

**Example Skeleton Request to AI**:
```
"Based on our planning, let's create the skeleton for the ProductCard component.
Include:
- Complete props interface with JSDoc comments
- Component basic structure
- Styled components setup
- Type definitions for any internal state

Follow our component template structure."
```

### 3. Component Implementation

Implement the component functionality:

1. **Add state management** for component-specific state
2. **Implement event handlers** for user interactions
3. **Create conditional rendering logic** for different states
4. **Implement styled-components** for visual appearance
5. **Add accessibility attributes** for inclusive UX

**Example Implementation Request to AI**:
```
"Now let's implement the ProductCard component functionality:
1. Add state for image loading
2. Implement the click handler for navigation
3. Create styles for regular, hover, and focus states
4. Add conditional rendering for the sale badge
5. Ensure accessibility with proper aria attributes
6. Implement responsive styling for both grid and list views

Follow our existing patterns for card components and ensure it matches our design system."
```

### 4. Component Testing

Create comprehensive tests for the component:

1. **Test rendering with different props**
2. **Test user interactions**
3. **Test edge cases** (empty data, loading states, errors)
4. **Test accessibility**

**Example Testing Request to AI**:
```
"Let's create tests for the ProductCard component:
1. Test rendering with all required props
2. Test optional props like the sale badge
3. Test click handler functionality
4. Test loading state
5. Test responsive behavior

Use our testing template and React Testing Library patterns."
```

### 5. Component Optimization

Optimize the component for performance:

1. **Implement memoization** for expensive calculations
2. **Add React.memo** for pure components
3. **Optimize re-renders** with useCallback
4. **Consider virtualization** for lists of components

**Example Optimization Request to AI**:
```
"Now let's optimize the ProductCard component:
1. Apply React.memo since this is a pure component
2. Use useCallback for the click handler
3. Ensure we're not causing unnecessary re-renders
4. Add comments explaining the optimization choices

Focus particularly on optimization since this component will be rendered many times in a list."
```

## Component Development with Context Awareness

### Maintaining Project Context

When developing components, maintain awareness of the broader project context:

1. **Design System Consistency**: Follow the project's design system
2. **Pattern Consistency**: Use established patterns for similar components
3. **State Management Consistency**: Follow project's state management approach
4. **Folder Structure Adherence**: Place components in the correct locations
5. **Naming Convention Consistency**: Use consistent naming patterns

**Example Context-Aware Request**:
```
"Let's ensure our ProductCard component is consistent with the rest of the project:
1. It should use our Card component from the UI library as a base
2. It should use our standardized image loading pattern with Skeleton
3. It should follow our naming convention for props (onClick vs handleClick)
4. It should use theme values for all spacing, colors, and typography
5. It should match our other card components in structure"
```

### Component Hierarchy Context

Consider the component's place in the component hierarchy:

1. **Parent-Child Relationships**: How will this component receive data?
2. **Sibling Relationships**: How will this component interact with siblings?
3. **Composition Patterns**: How will this component compose with others?

**Example Hierarchy-Aware Request**:
```
"Our ProductCard will be used in the ProductGrid and ProductList components.
Let's ensure it:
1. Accepts consistent props that both parent components can provide
2. Emits events in a way that both parents can handle
3. Has responsive styling that works in both contexts
4. Has appropriate composition patterns for both use cases"
```

## Autonomous Component Development Examples

### Example 1: Simple UI Component

**Request**:
```
"Let's create a Button component for our UI library.
It should:
- Support primary, secondary, and tertiary variants
- Have small, medium, and large sizes
- Support disabled state
- Support loading state with a spinner
- Be fully accessible
- Use our design system tokens
- Follow our component template structure"
```

**Steps**:
1. Plan component purpose and props
2. Create TypeScript interface
3. Implement basic component structure
4. Add styled-components with theme
5. Implement variants and states
6. Add accessibility attributes
7. Create tests
8. Optimize if necessary

### Example 2: Feature Component

**Request**:
```
"We need to create a UserProfileForm component for our profile feature.
It should:
- Display user data in editable form fields
- Handle form validation
- Show validation errors
- Submit changes to the API
- Show loading states during submission
- Handle API errors
- Support both create and edit modes

This should use our Form components and follow our form patterns with React Hook Form."
```

**Steps**:
1. Plan component with more detailed state management
2. Create skeleton with proper interface
3. Implement form with React Hook Form
4. Add validation schema
5. Implement API submission
6. Handle loading and error states
7. Add tests for form behavior
8. Optimize form rendering

### Example 3: Compound Component

**Request**:
```
"Let's create a Dropdown component using the compound component pattern.
It should include:
- Dropdown.Trigger component
- Dropdown.Menu component
- Dropdown.Item component
- Support for controlled and uncontrolled usage
- Keyboard navigation
- Proper focus management
- Accessibility features
- Animation for open/close

This should follow our compound component pattern and match our design system."
```

**Steps**:
1. Plan the compound component structure
2. Create context for internal state
3. Implement parent Dropdown component
4. Implement child components
5. Add keyboard navigation
6. Implement accessibility features
7. Add animation with styled-components
8. Create comprehensive tests
9. Optimize internal state updates

## Component Development Best Practices

### 1. Start with a Clear Interface

Define the component props interface before implementation:

```typescript
interface ButtonProps {
  /** The visual style of the button */
  variant: 'primary' | 'secondary' | 'tertiary';
  /** The size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Click event handler */
  onClick?: () => void;
  /** Button contents */
  children: React.ReactNode;
}
```

### 2. Follow Progressive Enhancement

Start with core functionality, then enhance:

1. **Core Rendering**: Basic structure and appearance
2. **Props Handling**: Proper handling of all props
3. **State Management**: Internal state for interactions
4. **Event Handling**: User interaction logic
5. **Edge Case Handling**: Loading, error, empty states
6. **Accessibility Enhancement**: ARIA attributes, keyboard support
7. **Performance Optimization**: Memoization, preventing re-renders

### 3. Use Clear Component Organization

Organize component files consistently:

```
src/
  components/
    ui/
      Button/
        Button.tsx         # Main component
        Button.styles.ts   # Styled components
        Button.test.tsx    # Tests
        index.ts           # Export file
```

### 4. Apply Context-Based Styling

Use theme values from context rather than hardcoded values:

```typescript
const StyledButton = styled.button<ButtonStyleProps>`
  padding: ${({ theme, size }) => theme.spacing[size]};
  background-color: ${({ theme, variant }) => theme.colors.button[variant].background};
  color: ${({ theme, variant }) => theme.colors.button[variant].text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme, size }) => theme.typography.fontSizes[size]};
  
  &:hover {
    background-color: ${({ theme, variant }) => theme.colors.button[variant].hover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

### 5. Follow Established Patterns

Maintain consistent patterns across similar components:

- Use same prop naming conventions (isDisabled vs disabled)
- Follow same event handler patterns (onChange, onUpdate, etc.)
- Use consistent composition patterns (children vs render props)
- Apply same state management approaches

## Common Component Development Challenges

### Challenge 1: Prop Explosion

**Problem**: Too many props making component unwieldy.

**Solution**: 
- Group related props into objects
- Use composition instead of configuration
- Create specialized components for different use cases

**Example Request**:
```
"Our ProductCard component has too many props. Let's refactor it to:
1. Group product data props into a 'product' object
2. Use composition for customizable elements
3. Create specialized versions for different contexts"
```

### Challenge 2: Component Reusability

**Problem**: Component too specific to one use case.

**Solution**:
- Extract business logic to custom hooks
- Make styling more flexible with theme
- Use render props or children for customization

**Example Request**:
```
"The UserList component is too specific to the Admin panel. Let's refactor it to be more reusable:
1. Extract data fetching to a custom hook
2. Make the UI more configurable
3. Allow custom rendering of list items
4. Remove admin-specific functionality to a wrapper component"
```

### Challenge 3: Performance Issues

**Problem**: Component causes performance issues.

**Solution**:
- Add memoization with React.memo
- Optimize render cycles with useMemo and useCallback
- Implement virtualization for large lists
- Defer expensive calculations

**Example Request**:
```
"Our DataTable component is causing performance issues with large datasets. Let's optimize it:
1. Implement virtualization with react-window
2. Memoize row rendering
3. Defer sorting calculations
4. Add pagination to limit rendered items"
```

## Conclusion

Effective component development with AI assistance requires clear communication of requirements and context. By following the ZenReact component development process and maintaining awareness of project patterns, you can create consistent, reusable, and maintainable components that integrate seamlessly with the rest of the application.

Always start with a clear understanding of the component's purpose, plan its structure and interface, implement it following established patterns, test it thoroughly, and optimize it for performance. With this approach, AI assistance can significantly accelerate component development while maintaining high quality and consistency. 