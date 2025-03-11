---
name: React Virtual
version: 2.10.4
type: runtime
category: ui
lastUpdated: 2025-03-11
aiMetadata:
  relationships:
    - type: requires
      target: react
      version: '>=16.8'
    - type: enhancedBy
      target: react-dom
  features:
    - name: virtualization
      category: core
      status: stable
    - name: dynamic-measurement
      category: core
      status: stable
    - name: grid-support
      category: core
      status: stable
  compatibility:
    node: '>=12'
    typescript: '>=4.2'
---

# React Virtual

## Overview

<!-- AI: Key information block for quick parsing -->

```metadata
{
  "description": "A headless virtualization solution for efficiently rendering large scrollable lists and grids",
  "primaryUse": "Rendering large datasets with minimal DOM nodes",
  "ecosystemRole": "Core performance optimization library for list and grid virtualization"
}
```

## Core Concepts

<!-- AI: Structured knowledge representation -->

```concepts
{
  "fundamentals": [
    {
      "name": "Virtualization",
      "description": "Render only visible items in the viewport",
      "importance": "Drastically reduces DOM nodes and memory usage"
    },
    {
      "name": "Dynamic Measurement",
      "description": "Support for variable-sized items",
      "importance": "Enables flexible content layouts"
    },
    {
      "name": "Headless Design",
      "description": "UI-agnostic implementation",
      "importance": "Maximum flexibility in styling and structure"
    }
  ]
}
```

## Installation & Setup

### Package Installation

```bash
npm install @tanstack/react-virtual@^2.10.4
```

### Basic Configuration

```typescript
interface VirtualizerOptions {
  count: number;
  getScrollElement: () => HTMLElement | null;
  estimateSize: (index: number) => number;
  overscan?: number;
  horizontal?: boolean;
  scrollToFn?: ScrollToFn;
  scrollMargin?: number;
}

// Example configuration
const options: VirtualizerOptions = {
  count: 10000,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 50,
  overscan: 5,
};
```

## API Reference

<!-- AI: Structured API documentation -->

```api
{
  "mainExports": [
    {
      "name": "useVirtualizer",
      "type": "hook",
      "description": "Core virtualization hook",
      "parameters": [
        {
          "name": "options",
          "type": "VirtualizerOptions",
          "description": "Virtualization configuration"
        }
      ],
      "returnType": "VirtualizerReturn",
      "examples": ["const virtualizer = useVirtualizer(options)"]
    }
  ]
}
```

## Common Usage Patterns

### Pattern: Fixed Size List

```typescript
function FixedSizeList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
              height: `${virtualItem.size}px`,
            }}
          >
            Row {virtualItem.index}
          </div>
        ))}
      </div>
    </div>
  );
}
```

<!-- AI: Pattern metadata -->

```pattern-metadata
{
  "name": "Fixed Size List",
  "useCase": "Lists with consistent item heights",
  "benefits": [
    "Predictable performance",
    "Simplified implementation",
    "Optimal memory usage"
  ],
  "tradeoffs": [
    "Less flexible than variable size",
    "May not suit dynamic content"
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
          "rule": "Use appropriate overscan",
          "rationale": "Prevents blank spaces during fast scrolling",
          "example": "overscan: 5"
        },
        {
          "rule": "Cache measurements",
          "rationale": "Reduces recalculations",
          "example": "measureElement with memoization"
        }
      ]
    },
    {
      "name": "Implementation",
      "practices": [
        {
          "rule": "Handle scroll events efficiently",
          "rationale": "Prevents jank",
          "example": "Use throttling/debouncing"
        }
      ]
    }
  ]
}
```

## Integration Examples

### Grid Implementation

```typescript
function VirtualGrid() {
  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const columnVirtualizer = useVirtualizer({
    count: columns,
    horizontal: true,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  return (
    <div ref={parentRef} style={{ overflow: 'auto' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `${columnVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={`${virtualRow.key}-${virtualColumn.key}`}
              style={{
                position: 'absolute',
                top: virtualRow.start,
                left: virtualColumn.start,
                width: virtualColumn.size,
                height: virtualRow.size,
              }}
            >
              Cell {virtualRow.index}-{virtualColumn.index}
            </div>
          ))
        ))}
      </div>
    </div>
  );
}
```

## Error Handling

<!-- AI: Error patterns -->

```error-handling
{
  "commonErrors": [
    {
      "type": "ScrollContainer",
      "cause": "Missing or invalid scroll container",
      "solution": "Ensure scroll container has dimensions and overflow",
      "example": "style={{ height: '400px', overflow: 'auto' }}"
    },
    {
      "type": "Measurement",
      "cause": "Incorrect size estimation",
      "solution": "Provide accurate size estimates or measurements",
      "example": "estimateSize: () => actualItemHeight"
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
      "aspect": "DOM Nodes",
      "impact": "Significant reduction in nodes",
      "optimization": "Only render visible items"
    },
    {
      "aspect": "Memory Usage",
      "impact": "Minimal memory footprint",
      "optimization": "Clean up unmounted items"
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
      "url": "https://tanstack.com/virtual/v2/docs/introduction",
      "description": "Official documentation"
    },
    {
      "type": "repository",
      "url": "https://github.com/tanstack/virtual",
      "description": "GitHub repository"
    }
  ],
  "community": [
    {
      "type": "examples",
      "url": "https://tanstack.com/virtual/v2/docs/examples/basic",
      "description": "Basic usage examples"
    }
  ]
}
```

## Version History

<!-- AI: Version tracking -->

```versions
{
  "latest": "2.10.4",
  "breaking": [
    {
      "version": "2.0.0",
      "changes": [
        "New measurement API",
        "Improved scroll handling",
        "Enhanced TypeScript support"
      ]
    }
  ]
}
```
