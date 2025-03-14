# ReactAI Assist VS Code Extension

A powerful VS Code extension that brings AI-assisted React development directly to your editor.

## Features

- Generate complete React components from natural language descriptions
- Get intelligent code suggestions and completions
- Identify and fix common React anti-patterns
- Access documentation and best practices directly in the editor
- Optimize performance with smart refactoring suggestions
- TypeScript-aware assistance for type definitions and interfaces

## Installation

The extension will be available on the VS Code Marketplace once released.

During development, you can install it locally:

1. Clone the repository
2. Run `pnpm install` in the extension directory
3. Run `pnpm package` to create a VSIX file
4. Install the VSIX file in VS Code using the "Install from VSIX" command

## Usage

### Component Generation

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "ReactAI: Generate Component"
3. Enter a description of the component you want to create
4. Review and accept the generated component

### Code Suggestions

As you write React code, the extension will provide intelligent suggestions directly in the editor. Look for the ReactAI icon in the suggestion popups.

### Refactoring

1. Select code you want to improve
2. Right-click and select "ReactAI: Suggest Improvements"
3. Review the suggestions and apply the ones you want

## Configuration

The extension can be configured through VS Code settings:

- `reactAiAssist.enabled`: Enable/disable the extension
- `reactAiAssist.suggestionsEnabled`: Enable/disable inline suggestions
- `reactAiAssist.apiKey`: Your ReactAI Assist API key
- `reactAiAssist.anonymousTelemetry`: Enable/disable anonymous usage telemetry

## Development

### Prerequisites

- Node.js >= 16
- pnpm >= 7
- VS Code

### Setup

```bash
pnpm install
```

### Running the Extension Locally

1. Open the project in VS Code
2. Press `F5` to start debugging
3. A new VS Code window will open with the extension loaded

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Packaging

```bash
pnpm package
```

## Project Structure

- `src/extension.ts` - Extension entry point
- `src/commands` - Command implementations
- `src/providers` - VS Code providers (completions, diagnostics, etc.)
- `src/views` - WebView implementations
- `src/utils` - Utility functions

## License

Proprietary - All Rights Reserved 