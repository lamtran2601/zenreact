# File and Folder Organization Rules

## Purpose

This document outlines standards for organizing files and folders in React applications. Consistent file organization improves developer efficiency, reduces cognitive load, and makes it easier for AI assistants to understand and navigate your codebase.

## Core Principles

1. **Discoverability**: Files should be easy to find based on their purpose
2. **Predictability**: Similar files should be organized in consistent ways
3. **Scalability**: Structure should accommodate project growth
4. **Cohesion**: Related files should be grouped together
5. **Separation of concerns**: Different types of logic should be appropriately separated

## Rule 1: Project Structure

### Description

Organize your React application with a clear top-level structure that separates application code from configuration and documentation.

### Good Example

```
my-react-app/
├── src/                  # Application source code
├── public/               # Static assets
├── config/               # Configuration files
├── scripts/              # Build and utility scripts
├── docs/                 # Documentation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
└── README.md             # Project overview
```

### Bad Example

```
my-react-app/
├── app.tsx
├── components.tsx
├── styles.css
├── utils.ts
├── images/
└── package.json
```

### Rationale

A well-structured project makes it easier to:
- Find specific types of files
- Understand the organization at a glance
- Separate source code from configuration
- Scale the project as it grows

## Rule 2: Feature-Based Organization

### Description

Organize application code by feature or domain rather than by technical role. Each feature should contain all related components, hooks, utilities, and tests.

### Good Example

```
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── types/
│   │   └── tests/
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── types/
│   │   └── tests/
│   └── checkout/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── utils/
│       ├── types/
│       └── tests/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── utils/
└── app/
    ├── App.tsx
    ├── routes.tsx
    └── providers.tsx
```

### Bad Example

```
src/
├── components/
│   ├── Button.tsx
│   ├── ProductList.tsx
│   ├── LoginForm.tsx
│   └── Checkout.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── useCheckout.ts
├── api/
│   ├── auth.ts
│   ├── products.ts
│   └── orders.ts
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── helpers.ts
```

### Rationale

Feature-based organization:
- Groups related code together
- Makes it easier to understand a complete feature
- Improves code isolation and modularity
- Facilitates team ownership of features
- Allows for easier deletion of unused features

### Exceptions

Very small applications or libraries might benefit from a simpler structure. In such cases, organize by technical role until the application grows.

## Rule 3: Component Organization

### Description

Structure components with a consistent file organization that promotes reusability, testability, and maintainability.

### Good Example

```
components/Button/
├── Button.tsx            # The component implementation
├── Button.module.css     # Component-specific styles
├── Button.test.tsx       # Component tests
├── Button.stories.tsx    # Component stories (if using Storybook)
├── useButtonLogic.ts     # Component-specific hook (optional)
├── types.ts              # Component type definitions
└── index.ts              # Re-export for cleaner imports
```

Where `index.ts` contains:

```typescript
export { Button } from './Button';
export type { ButtonProps } from './types';
```

### Bad Example

```
components/
├── Button.tsx            # Contains component, types, and logic
├── ButtonStyles.css      # Separate file for styles
└── ButtonTests.test.tsx  # Separate file with different naming convention
```

### Rationale

This organization:
- Keeps related files together
- Makes it clear what belongs to each component
- Simplifies testing and development
- Provides clean exports through index files
- Supports component-specific hooks and types

## Rule 4: Import Organization

### Description

Organize imports in a consistent order with clear separation between different types of imports.

### Good Example

```typescript
// External dependencies (libraries)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

// Internal modules (from other features or shared)
import { useAuth } from '@/shared/hooks/useAuth';
import { Button } from '@/shared/components/Button';

// Current feature imports
import { ProductCard } from '../ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';

// Styles, types, and assets
import { ProductListProps } from './types';
import styles from './ProductList.module.css';
import productIcon from './assets/product-icon.svg';
```

### Bad Example

```typescript
import styles from './ProductList.module.css';
import { Button } from '@/shared/components/Button';
import productIcon from './assets/product-icon.svg';
import React, { useState, useEffect } from 'react';
import { useProductFilters } from '../hooks/useProductFilters';
import classnames from 'classnames';
import { ProductListProps } from './types';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
```

### Rationale

Consistent import organization:
- Makes it easier to understand dependencies
- Groups imports logically by origin
- Helps identify potential circular dependencies
- Improves readability and maintainability

## Rule 5: Path Aliases

### Description

Use path aliases to simplify imports and avoid deep nesting of relative paths.

### Good Example

```typescript
// Using path aliases
import { Button } from '@/shared/components/Button';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { formatCurrency } from '@/utils/formatters';
```

### Bad Example

```typescript
// Deep relative paths
import { Button } from '../../../../shared/components/Button';
import { useAuth } from '../../../authentication/hooks/useAuth';
import { formatCurrency } from '../../../../utils/formatters';
```

### Rationale

Path aliases:
- Reduce the complexity of import paths
- Make imports more resilient to file moves
- Improve code readability
- Make it easier to understand file relationships

### Implementation

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/shared/components/*"],
      "@features/*": ["src/features/*"],
      "@utils/*": ["src/shared/utils/*"]
    }
  }
}
```

And update your build configuration (webpack, Vite, etc.) accordingly.

## Rule 6: Index Files

### Description

Use index files strategically to simplify imports and create clear public APIs for modules and features.

### Good Example

Feature-level index file (`features/products/index.ts`):

```typescript
// Re-export public components
export { ProductList } from './components/ProductList';
export { ProductDetail } from './components/ProductDetail';
export { ProductCard } from './components/ProductCard';

// Re-export hooks that are part of the public API
export { useProducts } from './hooks/useProducts';
export { useProductFilters } from './hooks/useProductFilters';

// Re-export types that are part of the public API
export type { Product, ProductFilter } from './types';
```

Usage:

```typescript
// Clean import from feature
import { ProductList, useProducts } from '@/features/products';
```

### Bad Example

```typescript
// Direct imports from deep paths
import { ProductList } from '@/features/products/components/ProductList';
import { useProducts } from '@/features/products/hooks/useProducts';
```

### Rationale

Strategic use of index files:
- Creates clear public APIs for features and modules
- Hides internal implementation details
- Simplifies refactoring
- Reduces import verbosity
- Facilitates feature boundaries

### Guidelines

- Don't create index files that export everything from a directory
- Only re-export what should be part of the public API
- Use index files at feature boundaries and for complex components
- Avoid deeply nested index files that import from other index files

## Rule 7: File Naming Conventions

### Description

Use consistent file naming conventions throughout the project.

### Rules

1. **Components**:
   - Use PascalCase for component files: `Button.tsx`, `ProductCard.tsx`
   - Use the same name for the component and its file

2. **Hooks**:
   - Prefix with `use` and use camelCase: `useAuth.ts`, `useWindowSize.ts`

3. **Contexts**:
   - Use PascalCase and suffix with `Context`: `AuthContext.tsx`, `ThemeContext.tsx`

4. **Utilities**:
   - Use camelCase: `formatDate.ts`, `validators.ts`

5. **Types/Interfaces**:
   - When in a separate file, use the name they apply to: `types.ts`, `Product.types.ts`

6. **Tests**:
   - Match the file they test with `.test` or `.spec` suffix: `Button.test.tsx`

7. **Style files**:
   - Match the component name: `Button.module.css`, `Button.styles.ts`

### Good Example

```
features/products/
├── components/
│   ├── ProductList/
│   │   ├── ProductList.tsx
│   │   ├── ProductList.test.tsx
│   │   ├── ProductList.module.css
│   │   └── index.ts
│   └── ProductCard/
│       ├── ProductCard.tsx
│       ├── ProductCard.test.tsx
│       ├── ProductCard.module.css
│       └── index.ts
├── hooks/
│   ├── useProducts.ts
│   └── useProductFilters.ts
├── context/
│   └── ProductContext.tsx
├── utils/
│   ├── productFormatters.ts
│   └── productValidators.ts
├── types/
│   └── index.ts
└── index.ts
```

### Bad Example

```
features/products/
├── components/
│   ├── product-list.jsx
│   ├── productCardComponent.tsx
│   └── FILTER_BAR.tsx
├── hooks/
│   ├── Products.js
│   └── product_filters.ts
└── utils/
    ├── Helpers.ts
    └── formatting.js
```

### Rationale

Consistent file naming:
- Makes files easier to find
- Clearly communicates file purpose and content
- Works better with code completion
- Reduces confusion and cognitive load

## Rule 8: Asset Organization

### Description

Organize assets (images, icons, fonts, etc.) in a structured and consistent way.

### Good Example

```
src/
├── assets/
│   ├── images/
│   │   ├── backgrounds/
│   │   └── photos/
│   ├── icons/
│   │   ├── navigation/
│   │   └── actions/
│   └── fonts/
└── features/
    └── products/
        ├── components/
        └── assets/
            └── product-specific-images/
```

### Bad Example

```
src/
├── img/
├── pictures/
├── icons.svg
└── features/
    └── products/
        └── images.js
```

### Rationale

Structured asset organization:
- Makes assets easier to find and manage
- Allows for feature-specific assets when needed
- Prevents asset duplication
- Simplifies asset optimization

### Guidelines

1. Use the global `assets` directory for shared assets
2. Place feature-specific assets in the feature directory
3. Group assets by type (images, icons, fonts)
4. Further categorize by purpose when the number of assets grows

## Rule 9: Route Organization

### Description

Structure routes in a clear, consistent way that aligns with the feature organization.

### Good Example

```typescript
// src/app/routes.tsx
import { RouteObject } from 'react-router-dom';
import { AuthLayout } from '@/features/authentication/layouts/AuthLayout';
import { ProductsLayout } from '@/features/products/layouts/ProductsLayout';
import { CheckoutLayout } from '@/features/checkout/layouts/CheckoutLayout';

// Import feature routes
import { authRoutes } from '@/features/authentication/routes';
import { productRoutes } from '@/features/products/routes';
import { checkoutRoutes } from '@/features/checkout/routes';

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: '/products',
    element: <ProductsLayout />,
    children: productRoutes,
  },
  {
    path: '/checkout',
    element: <CheckoutLayout />,
    children: checkoutRoutes,
  },
];
```

Feature routes (`features/products/routes.tsx`):

```typescript
import { RouteObject } from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

export const productRoutes: RouteObject[] = [
  {
    index: true,
    element: <ProductList />,
  },
  {
    path: ':id',
    element: <ProductDetail />,
  },
];
```

### Bad Example

```typescript
// All routes defined in a single file, mixed with components
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
```

### Rationale

Feature-aligned route organization:
- Makes routes more maintainable as the application grows
- Keeps routing logic close to the related feature
- Allows for better code splitting
- Makes it easier to understand the application structure

## Rule 10: Test File Organization

### Description

Organize test files in a way that makes them easy to find and run, while keeping them close to the code they test.

### Good Example

Co-located tests:

```
components/Button/
├── Button.tsx
├── Button.test.tsx
└── index.ts
```

Or for feature integration tests:

```
features/checkout/
├── components/
├── hooks/
├── api/
└── tests/
    ├── checkout-flow.test.tsx
    └── payment-integration.test.tsx
```

### Bad Example

Completely separate test directory:

```
src/
├── components/
│   └── Button.tsx
└── tests/
    └── components/
        └── Button.test.tsx
```

### Rationale

Effective test organization:
- Keeps tests close to the code they're testing
- Makes it easy to find and update tests when code changes
- Encourages developers to write tests
- Allows for different types of tests (unit, integration) at different levels

### Guidelines

1. Co-locate unit tests with the files they test
2. Place integration or feature tests in a tests directory within the feature
3. Use consistent naming patterns (`.test.tsx` or `.spec.tsx`)
4. Group test utilities and mocks appropriately

## Enforcement

To enforce these rules:

1. Use ESLint with appropriate plugins for import organization
2. Set up directory structure linting with tools like eslint-plugin-folders
3. Create project templates that follow these conventions
4. Include file organization in code reviews
5. Document exceptions when they're necessary

## References

- [React Project Structure](https://react.dev/learn/thinking-in-react)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- [Redux Style Guide on File Structure](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-or-ducks) 