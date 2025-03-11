---
name: date-fns
version: 2.30.0
type: runtime
category: utils
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: enhancedBy
      target: date-fns-tz
    - type: enhancedBy
      target: date-fns-jalali
  features:
    - name: date-manipulation
      category: core
      status: stable
    - name: formatting
      category: core
      status: stable
    - name: i18n
      category: core
      status: stable
  compatibility:
    node: '>=8'
    typescript: '>=4.3'
---

# date-fns

## Overview

<!-- AI: Key information block for quick parsing -->

```metadata
{
  "description": "A comprehensive and modular date utility library for JavaScript",
  "primaryUse": "Date manipulation and formatting in modern JavaScript applications",
  "ecosystemRole": "Core date handling utility with functional programming approach"
}
```

## Core Concepts

<!-- AI: Structured knowledge representation -->

```concepts
{
  "fundamentals": [
    {
      "name": "Immutability",
      "description": "All operations return new Date objects",
      "importance": "Prevents side effects and improves predictability"
    },
    {
      "name": "Modularity",
      "description": "Individual function imports",
      "importance": "Enables tree-shaking and smaller bundles"
    },
    {
      "name": "Type Safety",
      "description": "Complete TypeScript support",
      "importance": "Ensures correct date handling at compile time"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install date-fns@^2.30.0
```

### Basic Configuration

```typescript
// TypeScript type definitions
import { Duration, Interval } from 'date-fns';

interface DateConfig {
  format: string;
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

// Example configuration
const config: DateConfig = {
  format: 'yyyy-MM-dd',
  weekStartsOn: 1, // Monday
};
```

## API Reference

<!-- AI: Structured API documentation -->

```api
{
  "mainExports": [
    {
      "name": "format",
      "type": "function",
      "description": "Formats a date according to a specified pattern",
      "parameters": [
        {
          "name": "date",
          "type": "Date | Number",
          "description": "The date to format"
        },
        {
          "name": "formatString",
          "type": "string",
          "description": "The format pattern"
        }
      ],
      "returnType": "string",
      "examples": ["format(new Date(), 'yyyy-MM-dd')"]
    },
    {
      "name": "addDays",
      "type": "function",
      "description": "Adds specified number of days to given date",
      "parameters": [
        {
          "name": "date",
          "type": "Date | Number",
          "description": "The date to modify"
        },
        {
          "name": "amount",
          "type": "number",
          "description": "The number of days to add"
        }
      ],
      "returnType": "Date",
      "examples": ["addDays(new Date(), 1)"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Date Validation

```typescript
import { isValid, parseISO } from 'date-fns';

function validateDate(dateString: string): Date | null {
  const parsed = parseISO(dateString);
  return isValid(parsed) ? parsed : null;
}
```

<!-- AI: Pattern metadata -->

```pattern-metadata
{
  "name": "Date Validation",
  "useCase": "Safely parsing and validating date strings",
  "benefits": [
    "Type safety",
    "Error handling",
    "Consistent validation"
  ],
  "tradeoffs": [
    "Additional parsing overhead",
    "Need to handle null returns"
  ]
}
```

### Pattern: Date Range Operations

```typescript
import { eachDayOfInterval, isWithinInterval } from 'date-fns';

const getDaysInRange = (start: Date, end: Date) => eachDayOfInterval({ start, end });

const isDateInRange = (date: Date, start: Date, end: Date) =>
  isWithinInterval(date, { start, end });
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
          "rule": "Import only needed functions",
          "rationale": "Reduces bundle size",
          "example": "import { format } from 'date-fns'"
        },
        {
          "rule": "Cache formatted results",
          "rationale": "Prevents unnecessary calculations",
          "example": "const formattedDate = useMemo(() => format(date), [date])"
        }
      ]
    },
    {
      "name": "Code Organization",
      "practices": [
        {
          "rule": "Centralize date handling",
          "rationale": "Consistent date management",
          "example": "Create date utility modules"
        }
      ]
    }
  ]
}
```

## Integration Examples

### With React

```typescript
import { format, parseISO } from 'date-fns';

function DateDisplay({ isoDate }: { isoDate: string }) {
  const date = parseISO(isoDate);
  return <time dateTime={isoDate}>{format(date, 'MMMM d, yyyy')}</time>;
}
```

<!-- AI: Integration metadata -->

```integration-metadata
{
  "technology": "React",
  "complexity": "low",
  "requirements": ["React installation", "TypeScript support"]
}
```

## Error Handling

<!-- AI: Error patterns -->

```error-handling
{
  "commonErrors": [
    {
      "type": "InvalidDate",
      "cause": "Parsing invalid date string",
      "solution": "Use isValid to check parsed dates",
      "example": "if (!isValid(parsed)) throw new Error('Invalid date')"
    },
    {
      "type": "InvalidFormat",
      "cause": "Incorrect format string",
      "solution": "Use format tokens reference",
      "example": "format(date, 'yyyy-MM-dd')"
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
      "aspect": "Bundle Size",
      "impact": "Varies with imported functions",
      "optimization": "Use tree-shaking and selective imports"
    },
    {
      "aspect": "Date Calculations",
      "impact": "CPU-intensive for large ranges",
      "optimization": "Cache results when possible"
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
      "url": "https://date-fns.org/",
      "description": "Official documentation"
    },
    {
      "type": "repository",
      "url": "https://github.com/date-fns/date-fns",
      "description": "GitHub repository"
    }
  ],
  "community": [
    {
      "type": "guide",
      "url": "https://date-fns.org/docs/Getting-Started",
      "description": "Getting started guide"
    },
    {
      "type": "examples",
      "url": "https://date-fns.org/docs/Examples",
      "description": "Usage examples"
    }
  ]
}
```

## Version History

<!-- AI: Version tracking -->

```versions
{
  "latest": "2.30.0",
  "breaking": [
    {
      "version": "2.0.0",
      "changes": [
        "New FP-style function signatures",
        "Improved TypeScript support",
        "Removed legacy format tokens"
      ]
    }
  ]
}
```
