# ZenTask: AI-Assisted Task Management Application

ZenTask is a modern task management application built using the ZenReact framework, demonstrating best practices for autonomous React development.

## 🌟 Features

- Task management with customizable categories and priorities
- Authentication and user profile management
- Theme customization and application settings
- Responsive design for all device sizes

## 🛠️ Technology Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **UI Components**: DaisyUI with Tailwind CSS
- **State Management**: Zustand
- **Server State**: React Query
- **Routing**: React Router
- **Testing**: Vitest and React Testing Library

## 📁 Project Structure

```
zentask/
├── public/              # Static assets
├── src/
│   ├── features/        # Feature-based modules
│   │   ├── auth/        # Authentication related components and logic
│   │   ├── tasks/       # Task management features
│   │   └── profile/     # User profile management
│   ├── components/      # Shared components
│   │   ├── ui/          # Base UI components
│   │   ├── layout/      # Layout components
│   │   ├── feedback/    # Notifications, alerts
│   │   └── form/        # Form components
│   ├── hooks/           # Shared hooks
│   ├── api/             # API client and utilities
│   ├── utils/           # Utility functions
│   ├── types/           # Shared TypeScript types
│   ├── store/           # Zustand stores
│   ├── constants/       # Application constants
│   ├── routes/          # Route definitions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── docs/                # Project documentation
├── tests/               # Test setup and utilities
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Package dependencies
```

## 🧠 AI-Assisted Development

This project showcases AI-assisted development practices following the ZenReact framework:

- Context-rich development workflow
- Template-based component architecture
- Clear state management boundaries
- Autonomous implementation with AI collaboration

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Development Workflow](./docs/workflows/development-workflow.md)
- [Context Management](./docs/context/context-management.md)
- [AI Autonomous Guides](./docs/ai-guides/README.md)
- [Component Architecture](./docs/components/README.md)
- [State Management Approach](./docs/architecture/state-management.md)

## 🔄 Development Workflow

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start development server with `pnpm dev`
4. Run tests with `pnpm test`
5. Build for production with `pnpm build`

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./docs/CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 