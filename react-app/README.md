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