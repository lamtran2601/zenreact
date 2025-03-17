# Minimal Prompt Templates for React Components

## Overview

This document contains ready-to-use minimal prompt templates for generating common React components and features using AI assistants like Cursor. These templates follow the minimal-input approach outlined in the Minimal-Input Development Guide.

## How to Use These Templates

1. Copy the template for the component or feature you need
2. Fill in the placeholders with your specific requirements
3. Send the prompt to your AI assistant
4. Review, refine, and integrate the generated code

## Component Templates

### Basic Component

```
Create a React [component name] component that [primary function].
It should accept props for [list main props].
Style it using [styling approach].
```

**Example:**
```
Create a React Alert component that displays notification messages.
It should accept props for message content, type (success, error, warning, info), and an optional onClose function.
Style it using CSS modules with a clean, minimal design.
```

### Data Display Component

```
Create a React component to display [type of data].
It should show [list of fields/properties] and support [any special features].
Include proper loading and error states.
```

**Example:**
```
Create a React component to display user profile information.
It should show the user's avatar, name, email, bio, and join date, and support toggling between a compact and expanded view.
Include proper loading and error states.
```

### Form Component

```
Create a React form component for [purpose].
Include fields for [list fields] with appropriate validation.
The form should [describe submission behavior].
```

**Example:**
```
Create a React form component for user registration.
Include fields for username, email, password, password confirmation, and terms acceptance with appropriate validation.
The form should disable the submit button until all fields are valid and show inline validation messages.
```

### List Component

```
Create a React component to display a list of [items].
Each item should show [item properties].
Include support for [list features like filtering, sorting, etc].
```

**Example:**
```
Create a React component to display a list of products.
Each item should show the product image, name, price, and rating.
Include support for filtering by category, sorting by price or rating, and a grid/list view toggle.
```

### Navigation Component

```
Create a React [navigation type] component for [application type].
It should include links to [list pages/sections].
Make it responsive with [describe mobile behavior].
```

**Example:**
```
Create a React header navigation component for an e-commerce application.
It should include links to Home, Products, Categories, Cart, and User Account.
Make it responsive with a hamburger menu on mobile devices and include a search bar that expands/collapses.
```

### Modal/Dialog Component

```
Create a React modal component for [purpose].
It should support [describe content/features].
Ensure it's accessible and can be closed via [closing methods].
```

**Example:**
```
Create a React modal component for confirming dangerous actions.
It should support customizable title, message, and action buttons.
Ensure it's accessible and can be closed via a close button, clicking outside, or pressing Escape.
```

## Feature Templates

### Authentication Feature

```
Create a React authentication system with [list auth features].
Use [specify auth approach/library if any] and handle state with [state management approach].
Include proper error handling and loading states.
```

**Example:**
```
Create a React authentication system with login, registration, password reset, and persistent sessions.
Use Firebase Authentication and handle state with Context API.
Include proper error handling and loading states.
```

### Data Fetching Feature

```
Create a custom React hook for fetching [type of data] from [API/source].
It should handle [list requirements like caching, pagination, etc].
Make it type-safe with TypeScript and reusable across components.
```

**Example:**
```
Create a custom React hook for fetching product data from a REST API.
It should handle loading states, error handling, caching, and pagination.
Make it type-safe with TypeScript and reusable across components.
```

### Theme Switching Feature

```
Create a React theme switching feature supporting [list themes/modes].
It should [persistence requirements] and apply themes via [styling approach].
Make the transitions smooth and respect user system preferences.
```

**Example:**
```
Create a React theme switching feature supporting light, dark, and system modes.
It should persist user preference in local storage and apply themes via CSS variables.
Make the transitions smooth and respect user system preferences.
```

### Search Feature

```
Create a React search feature for [content type].
It should support [search capabilities] and display results as [result display].
Include [any special requirements like debouncing, highlighting, etc].
```

**Example:**
```
Create a React search feature for product catalog.
It should support instant search with keyword highlighting and display results as cards with images.
Include debounced input, search history, and filtering options.
```

## Complex UI Patterns

### Dashboard Layout

```
Create a React dashboard layout with [layout description].
Include [components like sidebar, header, etc] and make it [responsive requirements].
Support [any special features like collapsible sections].
```

**Example:**
```
Create a React dashboard layout with a fixed sidebar and flexible content area.
Include a sidebar navigation, header with user info, and main content area with a grid layout for widgets.
Make it fully responsive with a collapsible sidebar on mobile devices.
```

### Infinite Scroll

```
Create a React infinite scroll component for [content type].
It should load more items when [trigger condition] and support [features].
Handle loading and error states appropriately.
```

**Example:**
```
Create a React infinite scroll component for a social media feed.
It should load more posts when the user scrolls near the bottom and support both initial loading and subsequent page loading.
Handle loading and error states appropriately with a retry mechanism for failed loads.
```

### Drag and Drop

```
Create a React drag and drop interface for [purpose].
Users should be able to drag [items] to [destination] to perform [action].
Make it accessible and mobile-friendly if possible.
```

**Example:**
```
Create a React drag and drop interface for a kanban board.
Users should be able to drag task cards between columns to change their status.
Make it accessible and mobile-friendly with touch support if possible.
```

## Tips for Best Results

1. **Add context**: Briefly mention your application type or domain
2. **Specify technologies**: Mention specific libraries or approaches you prefer
3. **Prioritize requirements**: Start with the most important aspects
4. **Request examples**: Ask for usage examples if needed
5. **Iterative refinement**: Start simple, then add complexity in follow-up prompts

## When to Use More Detailed Prompts

While minimal prompts work well for common patterns, consider more detailed prompts for:

1. **Complex business logic**: When implementation details matter for business rules
2. **Integration with existing systems**: When matching existing patterns is critical
3. **Accessibility requirements**: When specific accessibility techniques are required
4. **Performance-critical components**: When optimization is a primary concern

## Conclusion

These minimal templates provide a starting point for rapidly generating React components and features with AI assistance. Adapt them to your specific needs, and remember that the best results often come from an iterative process where you review and refine the AI's output through conversation. 