# ReactAI Assist Web Dashboard

The web-based dashboard for ReactAI Assist, providing user management, analytics, and subscription services.

## Features

- User account management
- Team management and collaboration
- Usage analytics and insights
- Subscription management
- Component library and sharing
- Documentation and learning resources

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **API Communication**: React Query
- **Routing**: React Router
- **Testing**: Jest, React Testing Library, Playwright
- **Build Tools**: Vite

## Development

### Prerequisites

- Node.js >= 16
- pnpm >= 7

### Setup

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

This will start a development server at `http://localhost:3000`.

### Building

```bash
pnpm build
```

The build output will be in the `dist` directory.

### Testing

```bash
# Unit and integration tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## Project Structure

- `src/app` - Application initialization and core providers
- `src/components` - Reusable UI components
- `src/features` - Feature-specific components and logic
  - `src/features/auth` - Authentication
  - `src/features/dashboard` - Main dashboard
  - `src/features/settings` - User and account settings
  - `src/features/analytics` - Usage analytics
  - `src/features/library` - Component library
- `src/api` - API client and hooks
- `src/utils` - Utility functions
- `src/types` - TypeScript type definitions
- `src/assets` - Static assets (images, icons, etc.)
- `src/styles` - Global styles and Tailwind configuration

## Architecture

The dashboard follows a feature-based architecture with the following principles:

- Features are self-contained with their own components, hooks, and utilities
- Shared components are in the `components` directory
- API communication is abstracted through hooks
- State management is handled with Zustand stores
- Routing is defined in a central location

## Environment Variables

- `VITE_API_URL` - The URL of the ReactAI Assist API
- `VITE_AUTH_DOMAIN` - Authentication provider domain
- `VITE_AUTH_CLIENT_ID` - Authentication client ID
- `VITE_TELEMETRY_ENABLED` - Enable/disable telemetry

## License

Proprietary - All Rights Reserved 