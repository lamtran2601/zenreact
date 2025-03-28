# ZenTask: Task Management for ZenReact Applications

Welcome to ZenTask, a task management package designed to integrate with ZenReact applications. This documentation guides both developers and AI assistants on effective implementation and collaboration.

## Documentation Purpose

This guide establishes clear patterns, workflows, and expectations for implementing ZenTask within ZenReact applications. By following these guidelines, developers and AI assistants can:

1. Implement ZenTask features efficiently and consistently
2. Maintain proper architecture and state management
3. Follow ZenTask-specific best practices
4. Ensure proper integration with ZenReact applications

## Core Documentation Sections

### Guides
- [Installation Guide](./guides/01-installation-guide.md) - Setting up ZenTask in a ZenReact application
- [Task Management](./guides/02-task-management.md) - Core concepts of task data handling
- [UI Components](./guides/03-ui-components.md) - ZenTask component usage
- [State Management](./guides/04-state-management.md) - Task state architecture
- [Testing Strategy](./guides/05-testing-strategy.md) - Testing ZenTask implementations

### Templates
- [Task Component Template](./templates/task-component-template.md) - Standard structure for task components
- [Task Hook Template](./templates/task-hook-template.md) - Pattern for task-related hooks
- [Task Store Template](./templates/task-store-template.md) - Structure for task state stores
- [Task Context Template](./templates/task-context-template.md) - Pattern for task contexts
- [Task Test Template](./templates/task-test-template.md) - Structure for task component tests

### Rules
- [ZenTask Coding Standards](./rules/coding-standards.md) - Syntax and style guidelines
- [ZenTask Component Rules](./rules/component-rules.md) - Rules for task component development
- [ZenTask State Rules](./rules/state-rules.md) - Guidelines for task state management
- [ZenTask Architecture Rules](./rules/architecture-rules.md) - Project structure guidelines

### AI Resources
- [AI Assistant Guide](./ai-assistant-guide.md) - Comprehensive guide for AI assistants working with ZenTask
- [AI Implementation Toolkit](./ai-implementation-toolkit.md) - Tools and techniques for AI-assisted implementation

## Implementing ZenTask

### For New Projects
1. Start by reading the [Installation Guide](./guides/01-installation-guide.md)
2. Set up your project structure following the [Architecture Rules](./rules/architecture-rules.md)
3. Create your first task components using the [Task Component Template](./templates/task-component-template.md)
4. Implement state management following the [State Management](./guides/04-state-management.md) guide
5. Set up testing using the [Testing Strategy](./guides/05-testing-strategy.md)

### For Existing Projects
1. Begin by reviewing the [ZenTask Coding Standards](./rules/coding-standards.md)
2. Gradually integrate task components following the [Component Rules](./rules/component-rules.md)
3. Adapt your state management to align with [State Rules](./rules/state-rules.md)
4. Add tests according to the [Task Test Template](./templates/task-test-template.md)

## For AI Assistants

AI agents should:
1. **MANDATORY**: Follow the [AI Implementation Sequence](./tools/ai-implementation-sequence.md) for all tasks
2. Review the [AI Assistant Guide](./ai-assistant-guide.md) for comprehensive guidance
3. Maintain awareness of the task component hierarchy and architecture
4. Follow the established patterns in the templates directory
5. Adhere to the rules in the rules directory
6. Ask clarifying questions when context is insufficient
7. Suggest improvements that align with ZenTask standards

### Critical Workflow Requirements

AI assistants **MUST**:
- Complete context assessment before any implementation
- Document project state using the Context Maintenance Structure
- Create a detailed implementation plan before writing code
- Validate plans against ZenTask standards
- Follow implementation plans step-by-step
- Complete quality validation after implementation

Failure to follow this sequence will result in poor code quality, inconsistent architecture, and maintenance challenges.

## Contributing

This documentation evolves with the project. Propose changes that improve clarity, address gaps, or incorporate new best practices as they emerge. 