---
name: Zod
version: 3.22.4
type: runtime
category: data
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: enhancedBy
      target: react-hook-form
    - type: enhancedBy
      target: typescript
  features:
    - name: Schema Validation
      category: core
      status: stable
    - name: Type Inference
      category: core
      status: stable
    - name: Custom Validation
      category: core
      status: stable
  compatibility:
    node: '>=14.0.0'
    typescript: '>=4.5.0'
---

# Zod

## Overview

```metadata
{
  "description": "A TypeScript-first schema declaration and validation library",
  "primaryUse": "Runtime data validation with static type inference",
  "ecosystemRole": "Core data validation and type safety layer"
}
```

## Core Concepts

```concepts
{
  "fundamentals": [
    {
      "name": "Schema Definition",
      "description": "Declarative way to define data structures and validation rules",
      "importance": "Ensures type safety and runtime validation"
    },
    {
      "name": "Type Inference",
      "description": "Automatic TypeScript type generation from schemas",
      "importance": "Maintains single source of truth for types and validation"
    },
    {
      "name": "Validation Pipeline",
      "description": "Chain of validation and transformation steps",
      "importance": "Enables complex validation scenarios and data transformation"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install zod@^3.22.4
```

### Basic Configuration

```typescript
// TypeScript configuration (tsconfig.json)
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true
  }
}

// Basic schema setup
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(0).max(120).optional(),
});

type User = z.infer<typeof UserSchema>;
```

## API Reference

```api
{
  "mainExports": [
    {
      "name": "z.object",
      "type": "function",
      "description": "Creates an object schema",
      "parameters": [
        {
          "name": "shape",
          "type": "Record<string, ZodType>",
          "description": "Object schema definition"
        }
      ],
      "returnType": "ZodObject",
      "examples": ["z.object({ name: z.string() })"]
    },
    {
      "name": "z.string",
      "type": "function",
      "description": "Creates a string schema",
      "parameters": [],
      "returnType": "ZodString",
      "examples": ["z.string().email().min(5)"]
    },
    {
      "name": "safeParse",
      "type": "method",
      "description": "Validates data and returns success/error result",
      "parameters": [
        {
          "name": "data",
          "type": "unknown",
          "description": "Data to validate"
        }
      ],
      "returnType": "SafeParseReturnType",
      "examples": ["schema.safeParse(data)"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Form Validation

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof FormSchema>;

function Form() {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
}
```

```pattern-metadata
{
  "name": "Form Validation",
  "useCase": "Validating form inputs with React Hook Form",
  "benefits": ["Type-safe form handling", "Runtime validation", "Automatic error handling"],
  "tradeoffs": ["Additional setup required", "Learning curve for complex validations"]
}
```

## Best Practices

```best-practices
{
  "categories": [
    {
      "name": "Schema Design",
      "practices": [
        {
          "rule": "Keep schemas modular and composable",
          "rationale": "Enables reuse and maintainability",
          "example": "const BaseSchema = z.object({}); const UserSchema = BaseSchema.extend({});"
        },
        {
          "rule": "Use meaningful error messages",
          "rationale": "Improves user experience",
          "example": "z.string().email('Please enter a valid email address')"
        }
      ]
    },
    {
      "name": "Type Safety",
      "practices": [
        {
          "rule": "Always use type inference",
          "rationale": "Maintains single source of truth",
          "example": "type User = z.infer<typeof UserSchema>"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With API Routes

```typescript
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().min(1).max(100),
});

async function handler(req: Request) {
  const result = QuerySchema.safeParse(req.query);
  if (!result.success) {
    return { status: 400, body: result.error.flatten() };
  }
  // Handle valid data
}
```

```integration-metadata
{
  "technology": "API Routes",
  "complexity": "low",
  "requirements": ["TypeScript", "API Router"]
}
```

## Error Handling

```error-handling
{
  "commonErrors": [
    {
      "type": "ValidationError",
      "cause": "Invalid data structure or values",
      "solution": "Use safeParse and handle error cases",
      "example": "const result = schema.safeParse(data); if (!result.success) { /* handle error */ }"
    },
    {
      "type": "TypeMismatch",
      "cause": "Data type doesn't match schema",
      "solution": "Ensure correct types or add type coercion",
      "example": "z.coerce.number().int()"
    }
  ]
}
```

## Performance Considerations

```performance
{
  "metrics": [
    {
      "aspect": "Validation Speed",
      "impact": "Linear with schema complexity",
      "optimization": "Keep schemas simple and avoid deep nesting"
    },
    {
      "aspect": "Bundle Size",
      "impact": "Minimal due to tree-shaking",
      "optimization": "Import only needed validators"
    }
  ]
}
```

## Resources

```resources
{
  "official": [
    {
      "type": "documentation",
      "url": "https://zod.dev",
      "description": "Official Zod documentation"
    },
    {
      "type": "repository",
      "url": "https://github.com/colinhacks/zod",
      "description": "Zod GitHub repository"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://react-hook-form.com/get-started#SchemaValidation",
      "description": "React Hook Form integration guide"
    }
  ]
}
```

## Version History

```versions
{
  "latest": "3.22.4",
  "breaking": [
    {
      "version": "3.0.0",
      "changes": [
        "New error formatting system",
        "Improved TypeScript inference",
        "Changed method names for consistency",
        "Updated error message structure"
      ]
    }
  ]
}
```
