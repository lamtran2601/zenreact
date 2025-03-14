# Component Generation Prompts

This document provides optimized prompts for generating React components using AI assistants like Cursor. These prompts are designed to produce high-quality, consistent components that follow best practices and project conventions.

## Basic Component Prompt

Use this prompt for generating simple React components:

```
Generate a React component named {{ComponentName}} that {{description}}.

Requirements:
- Use {{functional|class}} component syntax
- {{Include TypeScript types|Use JavaScript}}
- Follow project naming conventions (PascalCase for components)
- Include proper JSDoc comments
- Follow accessibility best practices

Additional details:
{{any additional requirements}}
```

### Example:

```
Generate a React component named Button that acts as a reusable button element with different variants.

Requirements:
- Use functional component syntax
- Include TypeScript types
- Follow project naming conventions (PascalCase for components)
- Include proper JSDoc comments
- Follow accessibility best practices

Additional details:
- Support primary, secondary, and outline variants
- Include size options (small, medium, large)
- Handle disabled states
- Include loading state with a spinner
```

## Pattern-Based Component Prompt

Use this prompt when implementing specific patterns from the pattern library:

```
Generate a React component named {{ComponentName}} following the "{{PatternName}}" pattern from our pattern library.

Pattern key requirements:
{{list key pattern requirements}}

Component requirements:
- {{component-specific requirements}}
- Use {{functional|class}} component syntax
- {{Include TypeScript types|Use JavaScript}}
- Include proper comments and documentation
- Follow accessibility best practices

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React component named ProductCard following the "Data Display Card" pattern from our pattern library.

Pattern key requirements:
- Clear visual hierarchy with main and supporting information
- Contained interactive elements
- Consistent spacing and styling
- Responsive behavior
- Accessible structure

Component requirements:
- Display product image, name, price, and description
- Include "Add to Cart" button
- Show availability status
- Use functional component syntax
- Include TypeScript types
- Include proper comments and documentation
- Follow accessibility best practices

Additional details:
- Style using CSS modules
- Add hover effects for better user feedback
- Include skeleton loading state
```

## Form Component Prompt

Use this prompt for generating form components:

```
Generate a React form component named {{FormName}} that {{description}}.

Form requirements:
- Handle the following fields: {{list fields}}
- Include validation for: {{list validation requirements}}
- Use {{controlled|uncontrolled}} form approach
- Include form submission handling
- Display appropriate error messages
- Use {{formik|react-hook-form|native form elements}}

Component requirements:
- Use functional component syntax
- Include TypeScript types
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React form component named ContactForm that allows users to submit contact information.

Form requirements:
- Handle the following fields: name, email, phone (optional), message
- Include validation for: required fields, email format, message length (min 10 chars)
- Use controlled form approach
- Include form submission handling
- Display appropriate error messages
- Use react-hook-form

Component requirements:
- Use functional component syntax
- Include TypeScript types
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Additional details:
- Add a loading state during form submission
- Include success and error messages after submission
- Reset form after successful submission
```

## Data-Driven Component Prompt

Use this prompt for components that display or manipulate data:

```
Generate a React component named {{ComponentName}} that displays/manipulates {{dataType}} data.

Data handling requirements:
- Data source: {{API|props|context|state}}
- Include loading states
- Handle error conditions
- Support {{pagination|filtering|sorting}} (if applicable)

Component requirements:
- Use functional component syntax
- Include TypeScript types and interfaces for the data
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Data structure:
```typescript
{{data interface here}}
```

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React component named UserList that displays user data from an API.

Data handling requirements:
- Data source: API (fetch from '/api/users')
- Include loading states
- Handle error conditions
- Support pagination and filtering by name

Component requirements:
- Use functional component syntax
- Include TypeScript types and interfaces for the data
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Data structure:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  lastActive: string; // ISO date string
}

interface UserListProps {
  initialFilter?: string;
  itemsPerPage?: number;
  onUserSelect?: (user: User) => void;
}
```

Additional details:
- Add a search input for filtering
- Show last active status with a relative time format
- Include a way to sort by name or last active date
```

## Layout Component Prompt

Use this prompt for generating layout components:

```
Generate a React layout component named {{ComponentName}} that {{description}}.

Layout requirements:
- Support the following layout structure: {{describe structure}}
- Handle responsive behavior for {{list device sizes}}
- Include proper spacing and alignment
- Support {{optional layout features}}

Component requirements:
- Use functional component syntax
- Include TypeScript types
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Additional details:
{{any additional details}}
```

### Example:

```
Generate a React layout component named TwoColumnLayout that arranges content in two columns.

Layout requirements:
- Support the following layout structure: sidebar on left, main content on right
- Handle responsive behavior for mobile (stack columns), tablet (30/70 split), and desktop (25/75 split)
- Include proper spacing and alignment
- Support optional header and footer sections
- Allow reversing column order on mobile

Component requirements:
- Use functional component syntax
- Include TypeScript types
- Follow project naming conventions
- Include proper comments
- Follow accessibility best practices

Additional details:
- Use CSS Grid or Flexbox for layout
- Include options to control sidebar width
- Add a collapsed sidebar mode for semi-hidden state
```

## Best Practices for Using These Prompts

1. **Be Specific**: The more detailed your requirements, the better the generated component will match your needs.

2. **Reference Patterns**: Always reference specific patterns from the pattern library when applicable.

3. **Include Context**: Provide information about where and how the component will be used.

4. **Specify Technologies**: Explicitly mention which libraries or frameworks to use (e.g., styled-components, CSS modules).

5. **Review and Refine**: Always review generated components and refine the prompt if needed.

6. **Iterate**: For complex components, consider generating the basic structure first, then iteratively adding more complex features.

## Customizing Prompts

Feel free to combine and customize these prompt templates based on your specific needs. Add relevant details from:

- Project-specific conventions
- Design system requirements
- Team coding standards
- Performance considerations

## Troubleshooting

If the generated components don't meet expectations:

1. **Add More Specificity**: Provide more detailed requirements.
2. **Include Examples**: Reference existing similar components.
3. **Break Down Complexity**: Generate complex components in parts.
4. **Specify Edge Cases**: Explicitly mention how to handle edge cases. 