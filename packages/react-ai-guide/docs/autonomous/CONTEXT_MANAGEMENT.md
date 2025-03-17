# Context Management for AI Assistants

This guide explains how to implement flexible context management for AI-assisted development, enabling AI agents to maintain an understanding of your project across development sessions.

## Why Context Management Matters

Traditional AI assistants only understand your project within a single conversation. When you start a new conversation, that context is lost, forcing you to re-explain your project structure, patterns, and conventions.

Effective context management solves this problem by providing persistent understanding of:
- Your codebase structure and organization
- Component patterns and naming conventions
- State management approaches
- API integration patterns
- Domain model and business logic

## Flexible Context Strategies

Rather than relying on scripts and rigid tools, we recommend these flexible approaches:

### 1. Embeddings-Based Context

Instead of analyzing and storing context in predefined structures:

```
Project Directory
├── .zen/
│   ├── embeddings/
│   │   └── [automatically generated vector representations]
│   └── context.json
```

The AI agent can:
- Dynamically scan and analyze your codebase
- Generate vector embeddings of key files and patterns
- Store these embeddings for retrieval in future sessions
- Perform semantic search to find relevant patterns when needed

### 2. Context Prompts in Documentation

Maintain a set of living documentation files that AI agents can reference:

```
Project Directory
├── docs/
│   ├── context/
│   │   ├── architecture.md
│   │   ├── component-patterns.md
│   │   ├── state-management.md
│   │   └── api-integration.md
```

These files:
- Can be maintained by developers or the AI itself
- Serve as both human and AI documentation
- Provide important context without strict schema requirements
- Can evolve organically with your project

### 3. In-Code Context Markers

Use special comments or JSDoc annotations that AI agents can recognize:

```tsx
/**
 * @ai-pattern presentation-component
 * @ai-conventions
 * - Use function declaration syntax
 * - Props interface named [Component]Props
 * - Use React.memo for optimization
 */
const UserCard: React.FC<UserCardProps> = React.memo(({ user, onSelect }) => {
  // Implementation
});
```

This approach:
- Keeps context directly with the code
- Makes patterns explicit for both humans and AI
- Updates automatically when code changes
- Doesn't require separate schema files

## AI Agent Integration

### Direct Agent Scanning

Instead of running scripts, instruct the AI agent to scan your codebase directly:

```
Please scan my codebase to understand our component patterns, 
focusing on src/components and src/features directories.
```

The agent can:
- Examine file structure and naming patterns
- Read key files to understand conventions
- Identify recurring patterns in components, hooks, etc.
- Maintain this understanding throughout your session

### Context Files Reference

Create simple, flexible JSON or markdown files the agent can reference:

`project-context.md`:
```md
# Project Context

## Component Patterns
- Presentational components are in src/components
- Feature components are in src/features
- We use function components with TypeScript
- Props interfaces are exported

## State Management
- Zustand for global state
- React Query for server state
- useState and useReducer for local state
```

### Hybrid Approach

The most flexible solution is a hybrid approach:

1. **Lightweight Context Files**: Maintain minimal context files in `.zen/context/`
2. **In-Code Documentation**: Use JSDoc or specially formatted comments
3. **AI Scanning**: Allow the AI to scan and understand your codebase
4. **Dynamic Updates**: Let the AI suggest updates to context files

## Implementation

To implement this flexible context management:

1. Create a basic `.zen/context/` directory for initial context
2. Document key patterns in markdown files
3. Add context markers to important components and utilities
4. When working with AI, reference these context files
5. Let the AI update and maintain the context files

## Example Usage

When working with an AI assistant:

```
I'd like to create a new component for displaying user profiles.
Please reference our context in .zen/context/ and follow our
established patterns for presentation components.
```

Or more flexibly:

```
Can you scan our src/components directory to understand our
component patterns, then create a new UserProfile component 
following the same conventions?
```

The AI will:
1. Access the context directories or scan the codebase
2. Identify relevant patterns and conventions
3. Apply those patterns to generate or modify code
4. Maintain this understanding throughout your development session

## Benefits of Flexible Context

This approach:
- **Adapts to Your Workflow**: No rigid tools or scripts needed
- **Evolves Naturally**: Context grows with your project
- **Reduces Friction**: AI works within your existing environment
- **Improves Over Time**: AI builds a better understanding with each interaction
- **Works Across Tools**: Compatible with Cursor, GitHub Copilot, and other AI assistants 