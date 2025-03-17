# Rule Creation Guide

This guide explains how to create effective development rules for React projects that can be easily understood and applied by both human developers and AI assistants like Cursor.

## Purpose of Rules

Rules serve several critical purposes in a development ecosystem:

1. **Consistency**: Ensure code follows the same patterns and conventions
2. **Quality**: Maintain minimum quality standards across the codebase
3. **Efficiency**: Reduce decision fatigue and unnecessary debates
4. **Onboarding**: Help new team members understand expectations
5. **AI Guidance**: Provide clear instructions for AI code generation

Well-crafted rules create guardrails that promote best practices while still allowing for creativity and innovation within those boundaries.

## Rule Categories

Rules typically fall into these major categories:

### 1. Code Organization Rules

Rules for how code is structured and organized:
- File and folder naming conventions
- Component structure and composition
- Import ordering and grouping
- Export patterns

### 2. Styling Rules

Rules for how components are styled:
- CSS methodology (CSS Modules, Styled Components, etc.)
- Theme usage and customization
- Responsive design approaches
- Design token usage

### 3. TypeScript Rules

Rules for effective TypeScript usage:
- Interface and type definition standards
- Generics usage guidelines
- Type imports and exports
- Type vs. interface decisions

### 4. Quality Rules

Rules for ensuring code quality:
- Testing requirements
- Performance optimization
- Error handling
- Logging standards

### 5. Accessibility Rules

Rules for maintaining accessibility:
- ARIA attribute usage
- Keyboard navigation
- Color contrast requirements
- Screen reader compatibility

## Rule Structure

Each rule document should follow this consistent structure:

```markdown
# Rule Name

## Description
Brief description of what the rule addresses.

## Rationale
Explanation of why this rule is important and what problems it solves.

## Guidelines
Clear, specific guidelines to follow.

## Examples

### Good Examples
Examples of code that follows the rule correctly.

### Bad Examples
Examples of code that violates the rule, with explanations of what's wrong.

## Exceptions
Situations where the rule may be relaxed or doesn't apply.

## Enforcement
How to verify compliance with the rule (linting, code review, etc.).

## Related Rules
Links to related rules.

## References
External resources and documentation.
```

## Writing Effective Rules

### Be Clear and Specific

Rules should be clear and unambiguous:

❌ **Unclear Rule:**
```
Components should be properly structured.
```

✅ **Clear Rule:**
```
React components should:
1. Use functional components with TypeScript
2. Destructure props in the function signature
3. Define prop types using interfaces (not types)
4. Export the component as the default export
5. Place helper functions outside the component when not dependent on props/state
```

### Provide Context and Rationale

Always explain why a rule exists:

❌ **Missing Rationale:**
```
Always use React.memo for list item components.
```

✅ **With Rationale:**
```
Always use React.memo for list item components.

Rationale: List components often render many items, and re-rendering all items when only one changes can cause performance issues. React.memo prevents unnecessary re-renders by performing a shallow comparison of props, which is especially important for components rendered in loops.
```

### Include Both Good and Bad Examples

Demonstrate both correct and incorrect implementations:

```typescript
// ✅ Good Example
function UserCard({ name, email, role }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
}

// ❌ Bad Example
function UserCard(props) {  // Missing type definitions
  return (
    <div className="user-card">
      <h3>{props.name}</h3>  // Not destructuring props
      <p>{props.email}</p>
      <span>{props.role}</span>
    </div>
  );
}
```

### Document Exceptions

Acknowledge when rules may not apply:

```
Exceptions:
- Very simple components with 1-2 props may omit interface definitions
- Third-party component wrappers may follow the structure of the wrapped component
- Legacy components may be exempt until scheduled for refactoring
```

### Prioritize Rules

Indicate which rules are most important:

```
Priority: Critical
This rule addresses critical accessibility requirements. Violations could make the application unusable for people with disabilities.
```

## Optimizing Rules for AI Usage

### Use Clear, Precise Language

AI assistants work best with clear, unambiguous language:

❌ **Vague for AI:**
```
Try to make sure components are typed well.
```

✅ **Clear for AI:**
```
All React components must:
1. Define a TypeScript interface for their props
2. Use proper React.FC<PropsType> typing or function Component(props: PropsType)
3. Specify return types explicitly (React.ReactElement, JSX.Element, etc.)
4. Define proper types for event handlers (React.MouseEvent<HTMLButtonElement>, etc.)
```

### Provide Machine-Readable Formats

Structured formats help AI parse and apply rules:

```
Rule: COMP-01
Title: Component Props Interface
Description: All component props must be defined in a TypeScript interface
Applies To: All React components
Exceptions: None
Enforcement: ESLint rule react-typescript/props-interface
Priority: High
```

### Include Complete Examples

AI models learn better from complete examples:

❌ **Incomplete Example:**
```typescript
// Use interfaces for props
interface ButtonProps {
  // ...props here
}
```

✅ **Complete Example:**
```typescript
// Import necessary dependencies
import React from 'react';

// Define interface for props
interface ButtonProps {
  /** Text to display in the button */
  label: string;
  /** Function called when button is clicked */
  onClick: () => void;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

// Implement component with proper typing
export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps): React.ReactElement {
  // Construct class name based on variant
  const buttonClass = `button button--${variant} ${className}`;
  
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
}
```

### Reference Specific Tools

Mention specific tools that enforce the rules:

```
This rule is enforced using:
- ESLint rule 'react/function-component-definition'
- Typescript-eslint rule 'explicit-function-return-type'
- Automated tests that validate component structure
```

## Rule Creation Process

Follow this process to create new rules:

### 1. Identify the Need

Start by identifying patterns that need standardization:

- Review existing code for inconsistencies
- Note recurring issues in code reviews
- Identify areas where developers have questions
- Look for quality issues that repeat across the codebase

Questions to ask:
- What aspects of our code are most inconsistent?
- Where do we spend time debating approaches?
- What issues do we keep fixing in code reviews?
- What confuses new team members?

### 2. Research Best Practices

Before defining a rule:

- Research industry best practices
- Review React and TypeScript documentation
- Check popular style guides (Airbnb, Google, etc.)
- Look at common patterns in respected libraries

Resources to consult:
- React documentation
- TypeScript best practices
- Accessibility guidelines (WCAG)
- Style guides from major tech companies

### 3. Draft the Rule

Create a clear, specific rule following the template:

- Use precise language
- Include specific requirements
- Define success criteria
- Note any exceptions

### 4. Create Examples

Develop clear examples of:

- Correct implementation (multiple variations if relevant)
- Incorrect implementation with explanations
- Edge cases and how to handle them

### 5. Test with Developers

Verify the rule is effective:

- Have developers apply the rule to existing code
- Note any confusion or questions
- Refine the rule based on feedback
- Check if the rule achieves its goals

### 6. Test with AI

Verify AI assistants can understand and apply the rule:

- Provide the rule to AI assistants like Cursor
- Ask them to generate code following the rule
- Evaluate if the generated code complies with the rule
- Refine rule language to improve AI understanding

### 7. Implement Enforcement

Determine how to enforce the rule:

- Configure linting tools
- Add to code review checklists
- Create automated tests
- Add to documentation

### 8. Communicate and Train

Ensure the team understands the rule:

- Document the rule thoroughly
- Present it to the team
- Provide training if needed
- Address questions and concerns

## Example Rules

### Component Naming Rule

```markdown
# Component Naming

## Description
Defines standards for naming React components and their files.

## Rationale
Consistent naming improves code organization, makes files easier to find, and clarifies the purpose of components.

## Guidelines

1. **Component Names**
   - Use PascalCase for component names (e.g., `UserProfile`, `DataTable`)
   - Names should be descriptive and reflect the component's purpose
   - Avoid abbreviations unless universally understood
   - Prefixes/suffixes should indicate component type where appropriate (e.g., `UserForm`, `ProductList`)

2. **File Names**
   - Component file names should match the component name exactly
   - Use `.tsx` extension for all React component files with TypeScript
   - Index files should export components with their proper names, not default exports

3. **Folder Names**
   - Use kebab-case for folder names (e.g., `user-profile`, `data-table`)
   - Organize by feature or component type, not by file type
   - Group related components in a folder named after the primary component

## Examples

### Good Examples

```tsx
// UserProfile.tsx
export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

Folder structure:
```
/components
  /user-profile
    /UserProfile.tsx
    /UserAvatar.tsx
    /UserStats.tsx
    /index.ts  (exports all components)
```

### Bad Examples

```tsx
// profile.tsx (❌ should be PascalCase)
export function userProfile({ user }) {  // ❌ function name should be PascalCase
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

Folder structure:
```
/components
  /User
    /Profile.jsx  // ❌ File extension should be .tsx
    /avatar.tsx   // ❌ Should be PascalCase
```

## Exceptions

- HOCs may use camelCase with a 'with' prefix (e.g., `withAuth`)
- Context providers may use PascalCase with a 'Provider' suffix (e.g., `ThemeProvider`)
- Utility files that don't export React components may use camelCase with `.ts` extension

## Enforcement

- ESLint rule for component naming (react/pascal-case)
- Directory structure linting with custom script
- Code review checklist item

## Related Rules

- [File Organization Rule](./FILE_ORGANIZATION.md)
- [Component Structure Rule](./COMPONENT_STRUCTURE.md)

## References

- [React documentation on component naming](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)
- [TypeScript file naming conventions](https://typescript-eslint.io/rules/)
```

### TypeScript Props Rule

```markdown
# TypeScript Props Definition

## Description
Standards for defining and typing React component props using TypeScript.

## Rationale
Consistent props typing improves code readability, enables better IDE support, ensures proper component usage, and prevents runtime errors.

## Guidelines

1. **Interface Declaration**
   - Use interfaces (not types) for defining component props
   - Name interfaces with the component name followed by "Props" (e.g., `ButtonProps`)
   - Place interfaces directly above the component definition
   - Export interfaces that are used by multiple components

2. **Props Structure**
   - Destructure props in the component parameter list
   - Provide default values in the parameter destructuring when appropriate
   - Group related props logically within the interface
   - Order props with required props first, then optional props

3. **Documentation**
   - Add JSDoc comments to all props in the interface
   - Include type information, purpose, and constraints in comments
   - Document any special behaviors or interactions

4. **Type Safety**
   - Use specific types instead of `any`
   - Use union types for props with multiple allowed types
   - Define enums or string literals for props with specific allowed values
   - Use proper event types for event handlers (e.g., `React.MouseEvent<HTMLButtonElement>`)

## Examples

### Good Example

```tsx
/**
 * Props for the Button component
 */
interface ButtonProps {
  /** Text to display inside the button */
  label: string;
  /** Function called when button is clicked */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Whether the button is in a disabled state */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
}

/**
 * Button component that follows our design system guidelines
 */
export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  icon,
}: ButtonProps): React.ReactElement {
  const buttonClassName = `button button--${variant} ${className}`;
  
  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__label">{label}</span>
    </button>
  );
}
```

### Bad Example

```tsx
// ❌ No interface defined
export function Button(props) {  // ❌ No type definition
  // ❌ No props destructuring
  // ❌ No default values
  
  return (
    <button
      className={`button ${props.type || 'primary'} ${props.className}`}  // ❌ Uses 'type' instead of 'variant'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}  // ❌ Accessing props directly
    </button>
  );
}
```

## Exceptions

- Very simple components with 1-2 props may use inline types
- HOCs may use generics for component props
- Prop types shared across many components should be in a separate types file

## Enforcement

- ESLint with typescript-eslint rules
- React TypeScript prop-types linting
- Code review checklist

## Related Rules

- [Component Structure Rule](./COMPONENT_STRUCTURE.md)
- [TypeScript Generics Rule](./TYPESCRIPT_GENERICS.md)

## References

- [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
```

## Implementing Rules in Your System

To effectively implement rules in your development system:

### 1. Start Small

Begin with a small set of critical rules:

- Focus on areas with the most inconsistency
- Address the most important quality concerns
- Implement rules that provide immediate value

### 2. Create a Rules Library

Organize rules in a consistent structure:

- Group by category (code organization, TypeScript, etc.)
- Create an index or summary document
- Add cross-references between related rules

### 3. Integrate with Automation

Connect rules to automated tools where possible:

- Configure ESLint and TypeScript to enforce rules
- Set up pre-commit hooks to check compliance
- Create custom scripts for rules not covered by standard tools

### 4. Monitor Effectiveness

Regularly evaluate rule effectiveness:

- Track rule violations in code reviews
- Note questions or confusion about rules
- Identify rules that may need refinement
- Monitor impact on code quality and consistency

### 5. Evolve Over Time

Treat rules as living documents:

- Update based on team feedback
- Refine as technology evolves
- Add new rules as patterns emerge
- Retire rules that no longer provide value

## Conclusion

Well-crafted rules are a key component of an effective React development system. By creating clear, specific, and well-documented rules, you can improve code consistency, reduce decision fatigue, and enable both human developers and AI assistants to produce high-quality code more efficiently. Follow this guide to develop rules that serve as helpful guardrails rather than restrictive constraints. 