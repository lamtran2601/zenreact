# System Pattern Recognition for AI Assistance

## Overview

This guide helps you effectively communicate your existing codebase patterns to AI assistants like Cursor. By teaching the AI about your system's patterns, you can receive code suggestions that better align with your existing architecture, coding style, and conventions, resulting in more seamless integration.

## Why Pattern Recognition Matters

AI assistants like Cursor can generate code based on requirements, but they work best when they understand the patterns and conventions of your existing system. Benefits include:

1. **Consistency**: Generated code follows your established patterns
2. **Reduced refactoring**: Less need to adjust AI-generated code
3. **Better architecture alignment**: Solutions that respect your system design
4. **Faster integration**: Code that fits into your existing system
5. **Reduced cognitive load**: Less mental translation between patterns

## How to Communicate System Patterns

### 1. Show Representative Examples

The most effective way to teach AI about your patterns is to show examples. When requesting new features, include snippets of similar existing components or features.

**Good Example:**
```
I need a UserProfile component similar to our existing ProductCard component. Here's how we structure our components:

```jsx
// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import styles from './ProductCard.module.css';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button 
          className={styles.button}
          onClick={() => onAddToCart(product.id)}
        >
          {t('product.addToCart')}
        </button>
      </div>
    </div>
  );
};
```

### 2. Describe Architecture Patterns

Explain your application's architecture patterns in concise terms.

**Good Example:**
```
Our React application follows a feature-based organization pattern. Each feature has its own directory with the following structure:

- features/
  - featureName/
    - components/ (React components specific to this feature)
    - hooks/ (Custom hooks for this feature)
    - api/ (API-related functions)
    - utils/ (Utility functions)
    - types.ts (TypeScript types/interfaces)
    - index.ts (Public API exports)

Components use CSS modules for styling, and we use React Query for data fetching. State is managed with Context API for feature-specific state and Redux for global application state.
```

### 3. Highlight Naming Conventions

Explicitly mention your naming conventions for files, components, functions, and variables.

**Good Example:**
```
Our naming conventions are:
- Components: PascalCase (UserProfile.tsx)
- Component directories: PascalCase (UserProfile/)
- Hooks: camelCase with 'use' prefix (useAuth.ts)
- Utility functions: camelCase (formatDate.ts)
- CSS module files: ComponentName.module.css
- Test files: ComponentName.test.tsx
```

### 4. Explain State Management Approach

Describe how you manage state in your application.

**Good Example:**
```
We manage state in our application using:
1. Local component state with useState for component-specific state
2. React Context for feature-level shared state
3. Redux for global application state
4. React Query for server state

Here's how we typically structure a context provider:

```jsx
// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  // Implementation...
  
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 5. Share Type Definitions

Show how you structure your TypeScript types and interfaces.

**Good Example:**
```
We define our TypeScript interfaces like this:

```typescript
// Component props use the 'Props' suffix
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Data models don't use a suffix
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// We use type for unions and complex types
type UserRole = 'admin' | 'editor' | 'viewer';
type Nullable<T> = T | null;
```

## Pattern Recognition Checklist

When requesting AI assistance for new features, consider sharing information about:

1. **File Structure**: How are files organized and named?
2. **Component Architecture**: How are components structured?
3. **State Management**: How is state handled at different levels?
4. **Styling Approach**: How are styles implemented?
5. **API Interaction**: How does the application communicate with APIs?
6. **Routing**: How is navigation handled?
7. **Form Handling**: How are forms implemented and validated?
8. **Error Handling**: How are errors managed and displayed?
9. **Testing Strategy**: How are components and functions tested?
10. **Internationalization**: How is language support implemented?

## Template: Communicating System Patterns

Use this template when asking AI to generate code that matches your system:

```
I need [feature description].

Here's how our system is structured:

1. File organization: [describe structure]
2. Component pattern: [show example component]
3. State management: [describe approach]
4. Styling: [describe approach]
5. Key conventions: [list important conventions]

The new feature should follow these existing patterns while implementing [specific requirements].
```

## Example: Complete Pattern Recognition Prompt

```
I need a user settings page that allows users to update their profile information, change their password, and manage notification preferences.

Here's how our system is structured:

1. File organization:
   We use a feature-based structure. This should go in features/userSettings/.

2. Component pattern:
```jsx
// Example of our component pattern
import React from 'react';
import styles from './ComponentName.module.css';
import { useTranslation } from 'react-i18next';

interface ComponentNameProps {
  // Props...
}

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  const { t } = useTranslation();
  
  // Implementation...
  
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
};
```

3. State management:
   We use React Query for data fetching and mutations:
```jsx
// Example of our data fetching pattern
const { data, isLoading, error } = useQuery(
  ['user', userId],
  () => fetchUser(userId),
  { staleTime: 5 * 60 * 1000 }
);

const mutation = useMutation(updateUser, {
  onSuccess: () => {
    queryClient.invalidateQueries(['user', userId]);
    toast.success('Profile updated');
  },
  onError: (error) => {
    toast.error(`Error: ${error.message}`);
  }
});
```

4. Styling:
   We use CSS modules with this naming convention:
```css
/* ComponentName.module.css */
.container {
  /* Base styles */
}

.title {
  /* Title styles */
}

.form {
  /* Form styles */
}

.error {
  /* Error styles */
}
```

5. Key conventions:
   - Form components use Formik and Yup for validation
   - API endpoints are defined in /src/api/endpoints.ts
   - We use react-router-dom for navigation
   - We show toast notifications using react-toastify

The settings page should have tabs for different setting categories and follow our existing form validation patterns.
```

## Best Practices

1. **Start with clear examples**: Real code from your codebase is more effective than descriptions
2. **Be specific about preferences**: Mention explicit requirements rather than assuming the AI will infer them
3. **Show don't tell**: Include patterns for things that matter most to your codebase
4. **Prioritize information**: Focus on the most important patterns for the task at hand
5. **Provide context**: Explain why certain patterns exist when relevant
6. **Be consistent**: Use the same terminology consistently across requests

## Common Pattern Areas to Address

### Component Composition Patterns

Explain how components are composed in your application:

- Do you use containers and presentational components?
- How do you handle component composition and shared layouts?
- Do you use higher-order components (HOCs) or render props?

### Data Flow Patterns

Describe how data flows through your application:

- How is data passed between components?
- Do you use context, props drilling, or other techniques?
- How do you handle loading, error, and empty states?

### Hook Usage Patterns

Show how custom hooks are structured in your system:

- Do you use hook composition?
- How do you name and organize hooks?
- What common patterns do your hooks follow?

### Form Handling Patterns

Explain your approach to forms:

- Do you use form libraries or custom solutions?
- How do you handle validation?
- How do you structure form state?

## Conclusion

By effectively communicating your system patterns to AI assistants, you can significantly improve the quality and consistency of generated code. Take the time to show examples and explain key conventions, and you'll receive suggestions that require less modification and integrate more seamlessly with your existing codebase.

Remember that AI assistants learn from the information you provide, so the more relevant context you share about your specific patterns, the better the AI can adapt its suggestions to match your needs. 