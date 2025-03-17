# AI Self-Context Guide

## Purpose

This guide helps AI assistants autonomously analyze and understand React project structures, patterns, and conventions without requiring extensive human explanations. By following these instructions, an AI can build its own mental model of a codebase to provide more contextually appropriate assistance.

## When to Use This Guide

AI assistants should use this guide when:

1. First encountering a new React project
2. Asked to implement a feature without sufficient context
3. Needing to understand existing patterns before making suggestions
4. Preparing for a series of related development tasks

## Project Analysis Process

### 1. Initial Project Structure Analysis

```
I'll analyze the project structure to understand its organization:

1. Examine the directory structure to identify:
   - Project architecture (monorepo, standard create-react-app, Next.js, etc.)
   - Main organizational approach (feature-based, type-based, etc.)
   - Test organization (co-located, separate directory, etc.)

2. Check package.json for:
   - Major dependencies and their versions
   - Build tools and configuration
   - Scripts and workflows

3. Look for configuration files:
   - TypeScript configuration
   - Linting and formatting rules
   - Build configuration

4. Identify the state management approach:
   - Redux, Context API, Recoil, Zustand, etc.
   - Store organization
   - Action and reducer patterns
```

### 2. Component Pattern Analysis

```
I'll examine representative components to identify patterns:

1. Find and analyze 2-3 components in different areas of the application:
   - Import organization and conventions
   - Component declaration style (function, arrow function, etc.)
   - Props definition approach
   - Internal organization (hooks first, JSX last, etc.)
   - Error handling patterns

2. Identify styling methodology:
   - CSS/SCSS modules, styled-components, emotion, tailwind, etc.
   - Class naming conventions
   - Theme implementation

3. Analyze component composition patterns:
   - How components are nested and composed
   - Usage of children vs. explicit props
   - HOC usage vs. hooks
   - Render props vs. composition
```

### 3. Data Flow Analysis

```
I'll analyze how data flows through the application:

1. Identify data fetching patterns:
   - REST APIs, GraphQL, etc.
   - Fetch libraries (axios, fetch, react-query, etc.)
   - Loading and error state management
   - Caching strategies

2. Examine state management:
   - Local state vs. global state usage
   - Context organization
   - Redux store structure
   - Selector patterns

3. Look for form handling approaches:
   - Form libraries (Formik, React Hook Form, etc.)
   - Validation strategies
   - Submission handling
```

### 4. Code Style and Conventions

```
I'll identify code style patterns:

1. Naming conventions:
   - File and folder naming (camelCase, PascalCase, kebab-case)
   - Component naming 
   - Function and variable naming
   - Type and interface naming

2. TypeScript usage:
   - Type vs. interface preferences
   - Type composition patterns
   - Generic usage patterns
   - Type safety approach

3. Documentation style:
   - JSDoc comments vs. inline comments
   - Documentation thoroughness
   - README patterns
```

### 5. Testing Patterns

```
I'll analyze testing approaches:

1. Identify testing frameworks and tools:
   - Jest, React Testing Library, Cypress, etc.
   - Mock strategies
   - Test organization

2. Examine test patterns:
   - Test naming conventions
   - Test structure and organization
   - Coverage expectations
   - Common testing utilities
```

## Creating a Project Context Summary

After analysis, the AI should create a structured summary of findings:

```markdown
# Project Context Summary

## Architecture Overview
- Project type: [Type of React project]
- Organization: [Feature-based, component-type-based, etc.]
- Key technologies: [List of main libraries and frameworks]

## Component Patterns
- Declaration style: [Function components, class components, etc.]
- Props pattern: [Interface/type patterns, naming conventions]
- Styling: [CSS approach, naming conventions]
- Composition: [How components are typically composed]

## Data Flow
- State management: [Main state management approach]
- API interaction: [Data fetching patterns]
- Form handling: [Form management approach]

## Development Conventions
- Naming: [File, component, function, and variable naming conventions]
- TypeScript: [How types are defined and used]
- Documentation: [Documentation approaches]

## Testing Approach
- Framework: [Testing frameworks and tools]
- Pattern: [How tests are structured]
- Coverage: [Apparent testing standards]

## Key Example Patterns
[Include 2-3 representative code snippets that exemplify the project patterns]
```

## Using The Context Summary

The AI should refer to this context summary when:

1. Generating new components or features
2. Suggesting architectural changes
3. Reviewing code
4. Answering questions about best practices for the project

The context summary should be treated as a living document, updated when:

1. New patterns are discovered
2. Project conventions change
3. New areas of the codebase are explored

## Example Analysis Dialogue

Below is an example of how the AI can conduct this analysis through dialogue with a developer:

```
AI: I'd like to understand your project structure better to provide more relevant assistance. Would it be helpful if I analyze the codebase to identify patterns and conventions?

Developer: Yes, that would be great.

AI: I'll analyze your project structure. This will help me understand your coding patterns and provide more contextual assistance.

[AI performs analysis following the guide above]

AI: Based on my analysis, I've created a project context summary:

# Project Context Summary

## Architecture Overview
- Project type: Next.js application
- Organization: Feature-based with shared components
- Key technologies: Next.js, TypeScript, styled-components, SWR

## Component Patterns
- Declaration style: Function components with arrow function syntax
- Props pattern: TypeScript interfaces with 'Props' suffix
- Styling: styled-components with theme provider
- Composition: Composition pattern with specialized child components

[...continues with full summary...]

Would you like me to adjust or expand any part of this analysis before we proceed?
```

## Autonomous Context Updates

The AI should proactively update its understanding of the project when:

1. New files or patterns are encountered
2. The developer mentions a convention not previously observed
3. The developer corrects an assumption about project patterns

When updating context, the AI should:

1. Acknowledge the new information
2. Update the internal context model
3. Adjust future code generation to reflect this understanding

## Conclusion

By following this self-context guide, AI assistants can autonomously build a comprehensive understanding of React projects, leading to more contextually appropriate assistance without requiring extensive human explanation. This represents a key step toward more autonomous AI development assistance.

The context gathering process should be:
1. Proactive - Initiated by the AI when context is lacking
2. Transparent - The AI should explain what it's analyzing and why
3. Iterative - Context understanding should evolve over time
4. Collaborative - Developers should be able to correct or enhance the AI's understanding 