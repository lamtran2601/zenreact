# Comparison Functions Refactor Plan

## 1. New File Structure

```
packages/core/src/
├── utils/
│   └── compare.ts      # New file for comparison functions
├── __tests__/
│   ├── utils/
│   │   └── compare.test.ts  # New test file
│   └── withOptimization.test.tsx
└── index.ts
```

## 2. Function Migration

- Move from index.ts to utils/compare.ts:
  - isPlainObject type guard
  - defaultCompare function
- Update exports/imports

## 3. Test Coverage Plan

### isPlainObject Tests

- Basic types
  - Plain objects
  - Arrays
  - null
  - undefined
  - primitives
- Complex objects
  - Class instances
  - Built-in objects (Date, RegExp)
  - Functions

### defaultCompare Tests

1. Reference Equality

   - Same reference objects
   - Different objects with same content

2. Array Comparisons

   - Empty arrays
   - Arrays with primitives
   - Arrays with objects
   - Arrays with different lengths
   - Arrays with same content different order

3. Object Comparisons

   - Empty objects
   - Flat objects with primitive values
   - Objects with different key orders
   - Objects with undefined values
   - Objects with null values

4. Nested Structure Tests

   - Objects with nested objects
   - Objects with nested arrays
   - Deep recursive structures
   - Mixed nested types

5. Edge Cases
   - Very large objects
   - Circular references (handled by recursion limit)
   - Special types (Date, RegExp, etc)

## 4. Implementation Steps

1. Create utils directory
2. Create compare.ts with migrated functions
3. Create compare.test.ts with comprehensive tests
4. Update index.ts imports
5. Verify all existing tests still pass
6. Run new comparison specific tests

## 5. Benefits

- Better code organization
- Improved testability
- Clearer separation of concerns
- More maintainable codebase
- Comprehensive test coverage for core comparison logic

Would you like to proceed with implementing this plan?
