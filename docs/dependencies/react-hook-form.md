---
name: React Hook Form
version: 7.50.1
type: runtime
category: data
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: react
      version: '>=16.8'
    - type: enhancedBy
      target: zod
    - type: enhancedBy
      target: yup
  features:
    - name: form-validation
      category: core
      status: stable
    - name: field-arrays
      category: core
      status: stable
    - name: typescript-support
      category: core
      status: stable
  compatibility:
    node: '>=12'
    typescript: '>=4.5'
---

# React Hook Form

## Overview

<!-- AI: Key information block for quick parsing -->

```metadata
{
  "description": "Performance-focused React form validation library with minimal re-renders",
  "primaryUse": "Building performant forms with minimal boilerplate",
  "ecosystemRole": "Core form handling solution for React applications"
}
```

## Core Concepts

<!-- AI: Structured knowledge representation -->

```concepts
{
  "fundamentals": [
    {
      "name": "Uncontrolled Components",
      "description": "Native form handling without state management",
      "importance": "Maximizes performance by minimizing re-renders"
    },
    {
      "name": "Form State",
      "description": "Centralized form state management",
      "importance": "Provides consistent access to form data and errors"
    },
    {
      "name": "Validation",
      "description": "Built-in and custom validation rules",
      "importance": "Ensures data integrity and user feedback"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install react-hook-form@^7.50.1
```

### Basic Configuration

```typescript
interface FormConfig<T extends object> {
  mode?: 'onSubmit' | 'onChange' | 'onBlur' | 'onTouched';
  defaultValues?: Partial<T>;
  resolver?: Resolver<T>;
  context?: object;
  criteriaMode?: 'firstError' | 'all';
  shouldFocusError?: boolean;
}

// Example configuration
const config: FormConfig<FormData> = {
  mode: 'onChange',
  defaultValues: {
    email: '',
    password: '',
  },
  shouldFocusError: true,
};
```

## API Reference

<!-- AI: Structured API documentation -->

```api
{
  "mainExports": [
    {
      "name": "useForm",
      "type": "hook",
      "description": "Core form management hook",
      "parameters": [
        {
          "name": "config",
          "type": "UseFormConfig",
          "description": "Form configuration options"
        }
      ],
      "returnType": "UseFormReturn",
      "examples": ["const { register, handleSubmit } = useForm()"]
    },
    {
      "name": "useFieldArray",
      "type": "hook",
      "description": "Dynamic form array management",
      "parameters": [
        {
          "name": "config",
          "type": "UseFieldArrayConfig",
          "description": "Field array configuration"
        }
      ],
      "returnType": "UseFieldArrayReturn",
      "examples": ["const { fields, append, remove } = useFieldArray()"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Form Validation

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
    firstName: '',
    email: ''
  },
  mode: 'onChange'
});

<input
  {...register('firstName', {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'Min length is 2'
    }
  })}
/>
{errors.firstName && <p>{errors.firstName.message}</p>}
```

<!-- AI: Pattern metadata -->

```pattern-metadata
{
  "name": "Form Validation",
  "useCase": "Input validation with real-time feedback",
  "benefits": [
    "Immediate user feedback",
    "Type-safe validation rules",
    "Custom validation support"
  ],
  "tradeoffs": [
    "Additional validation overhead",
    "More complex setup for advanced cases"
  ]
}
```

## Best Practices

<!-- AI: Structured best practices -->

```best-practices
{
  "categories": [
    {
      "name": "Performance",
      "practices": [
        {
          "rule": "Use uncontrolled components",
          "rationale": "Minimizes re-renders",
          "example": "Use register() instead of controlled inputs"
        },
        {
          "rule": "Implement watch selectively",
          "rationale": "Prevents unnecessary updates",
          "example": "watch() only required fields"
        }
      ]
    },
    {
      "name": "Validation",
      "practices": [
        {
          "rule": "Use schema validation",
          "rationale": "Centralized validation logic",
          "example": "Implement Zod or Yup schemas"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With Zod

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

<!-- AI: Integration metadata -->

```integration-metadata
{
  "technology": "Zod",
  "complexity": "medium",
  "requirements": [
    "Zod installation",
    "@hookform/resolvers package"
  ]
}
```

## Error Handling

<!-- AI: Error patterns -->

```error-handling
{
  "commonErrors": [
    {
      "type": "ValidationError",
      "cause": "Invalid form input",
      "solution": "Display validation messages",
      "example": "errors.field?.message"
    },
    {
      "type": "SubmissionError",
      "cause": "Server-side validation failure",
      "solution": "Set form errors with setError",
      "example": "setError('root.serverError', { message: error.message })"
    }
  ]
}
```

## Performance Considerations

<!-- AI: Performance insights -->

```performance
{
  "metrics": [
    {
      "aspect": "Re-renders",
      "impact": "Minimal due to uncontrolled inputs",
      "optimization": "Use register without controlled state"
    },
    {
      "aspect": "Form State Updates",
      "impact": "Depends on form complexity",
      "optimization": "Selective watching and validation"
    }
  ]
}
```

## Resources

<!-- AI: Structured resources -->

```resources
{
  "official": [
    {
      "type": "documentation",
      "url": "https://react-hook-form.com/",
      "description": "Official documentation"
    },
    {
      "type": "api",
      "url": "https://react-hook-form.com/api",
      "description": "API reference"
    }
  ],
  "community": [
    {
      "type": "examples",
      "url": "https://github.com/react-hook-form/react-hook-form/tree/master/examples",
      "description": "Official examples repository"
    }
  ]
}
```

## Version History

<!-- AI: Version tracking -->

```versions
{
  "latest": "7.50.1",
  "breaking": [
    {
      "version": "7.0.0",
      "changes": [
        "New register API",
        "Improved TypeScript support",
        "Changed error structure"
      ]
    }
  ]
}
```
