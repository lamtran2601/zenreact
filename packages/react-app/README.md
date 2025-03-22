# React App

A modern React application built with Vite, TypeScript, and following the best practices from the React AI Guide.

## Features

- **TypeScript Support** - Full TypeScript support for type safety
- **Component Patterns** - Consistent component structure following best practices
- **Custom Hooks** - Reusable hooks for common patterns
- **Performance Optimized** - Built with performance in mind
- **Accessibility** - Follows accessibility best practices

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 8 or later

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
react-app/
├── docs/               # Documentation
│   └── context/        # AI context files
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── ui/         # UI components (buttons, cards, etc.)
│   │   ├── layout/     # Layout components
│   │   └── feature/    # Feature-specific components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

## Development Guidelines

### Component Creation

Components should:
- Use TypeScript with proper type definitions
- Follow functional component pattern
- Implement proper error handling
- Be accessible
- Have proper testing

### Custom Hooks

Hooks should:
- Follow the React hooks API design
- Handle cleanup to prevent memory leaks
- Provide TypeScript types
- Follow the naming convention `use[Name]`

## Contributing

1. Follow the established patterns and conventions
2. Ensure code passes linting and type checking
3. Write tests for new features
4. Document complex logic with comments

## License

MIT
