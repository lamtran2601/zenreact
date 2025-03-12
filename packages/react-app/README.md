# Football Ticket Booking Application

A modern, responsive web application for booking football match tickets, built with React, TypeScript, and TailwindCSS.

## Features

- Browse available football matches
- Filter matches by date, team, and price range
- Book tickets with real-time price calculation
- Receive booking confirmations
- Mobile-first responsive design
- Offline support with data persistence

## Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS + DaisyUI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Virtualization**: React Virtual
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Project Structure

```
packages/react-app/
├── ai-tooling/          # AI Tooling Integration
│   ├── rules/          # Implementation rules
│   ├── patterns/       # Common implementation patterns
│   └── quality/        # Quality validation system
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Layout components
│   │   ├── matches/    # Match-related components
│   │   └── booking/    # Booking-related components
│   ├── types/          # TypeScript interfaces
│   ├── store/          # Zustand store
│   ├── data/           # Mock data
│   ├── utils/          # Helper functions
│   ├── hooks/          # Custom hooks
│   ├── constants/      # App constants
│   ├── services/       # API services
│   └── App.tsx         # Root component
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## Performance Optimizations

- Virtual scrolling for match list
- Memoized components
- Lazy loading
- Optimized state management with selectors
- Mobile-first responsive design

## Offline Support

The application uses localStorage for data persistence, allowing users to:

- View previously loaded matches
- See their booking history
- Continue browsing when offline

## Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly UI elements
- Optimized layout for mobile devices
- Fast loading times

## AI Tooling Integration

This project uses an AI Tooling system with a rule-based approach for consistent, high-quality development:

- **Automated Context Loading**: Context is loaded automatically based on task
- **Pattern-Based Implementation**: Components follow established patterns
- **Rule-Driven Quality Validation**: All code meets defined standards
- **AI-Optimized Documentation**: Documentation is clear and comprehensive

## License

MIT
