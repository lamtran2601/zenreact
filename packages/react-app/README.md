# Football Ticket App

A modern React application for buying football tickets, built with the latest web technologies and AI-assisted development.

## Technologies

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 with DaisyUI 5
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **AI Assistant Tooling**: Autonomous development workflow

## Features

- Browse football matches and available tickets
- Filter tickets by team, date, price range
- User authentication and profile management
- Shopping cart and checkout flow
- Secure payment processing
- Order history and ticket management

## Getting Started

### Prerequisites

- Node.js 16.x or later
- pnpm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/football-ticket-app.git
cd football-ticket-app
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm run dev
```

4. Open your browser at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Shared components like buttons, inputs
│   ├── layout/       # Layout components like header, footer
│   └── tickets/      # Ticket-specific components
├── pages/            # Page components for routing
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── services/         # API services and data fetching
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── __tests__/        # Test files
```
## Development Approach

This project uses an autonomous development workflow powered by AI assistant tooling. The workflow is guided by:

- **Self-Context Guide**: Project structure and patterns
- **Decision Frameworks**: Architectural and implementation decisions
- **Self-Review Checklists**: Code quality verification
- **Automated Testing Guide**: Test generation and standards

These guides are located in the `.ai-assistant/guides` directory.

### Context Management

The project utilizes Context Management to help AI assistants maintain understanding across development sessions:

- **Context Storage**: Project structure and patterns are stored in `.ai-assistant/context/project-context.json`
- **Context Prompts**: Generated AI prompts based on the context in `.ai-assistant/prompts/`
- **Cursor Integration**: Keyboard shortcuts for context refreshing and generation

#### Using Context in Development

When working with AI assistants:

1. **Refresh Context**: After making significant changes to the codebase, refresh the context:
   ```
   npx context-analyzer
   ```
   
2. **Generate Prompts**: Create AI-readable prompts based on the context:
   ```
   npx generate-prompt . overview
   ```
   
3. **Reference Context**: Ask the AI to use the context in conversations:
   ```
   Using the project context in .ai-assistant/context/project-context.json, help me create a new component that follows our patterns.
   ```

#### Cursor Keyboard Shortcuts

- `Ctrl+Shift+C`: Refresh project context
- `Ctrl+Shift+O`: Generate and show project overview
- `Ctrl+Shift+N`: Create new component
- `Ctrl+Shift+R`: Review code with checklists
- `Ctrl+Shift+T`: Generate tests 

## Available Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview the production build
- `pnpm run test` - Run tests
- `pnpm run lint` - Run linter

## License

This project is licensed under the MIT License - see the LICENSE file for details.
