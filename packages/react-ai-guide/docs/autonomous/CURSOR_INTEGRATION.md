# Cursor AI Integration for Autonomous Development

This guide explains how to configure and use Cursor AI with the autonomous development guides to create a standardized, efficient workflow.

## Initial Setup

### 1. Project Structure Setup

Create the following structure in your React project:

```
your-react-project/
├── .ai-assistant/
│   ├── context/
│   │   └── project-context.json  # Stored AI context
│   │   └── prompts/                  # Generated context prompts
│   │   │   ├── project-overview.md
│   │   │   └── create-component-*.md
│   │   ├── config.json
│   │   └── guides/
│   │   │   ├── SELF_CONTEXT_GUIDE.md
│   │   │   ├── DECISION_FRAMEWORKS.md
│   │   │   ├── SELF_REVIEW_CHECKLISTS.md
│   │   │   └── AUTOMATED_TESTING_GUIDE.md
│   │   └── scripts/
│   │   │   ├── autonomous-workflow.js
│   │   │   └── verify-autonomous-workflow.js
```

### 2. Configuration File

Create a `.ai-assistant/config.json` file with the following content:

```json
{
  "projectName": "your-project-name",
  "framework": "react",
  "guides": {
    "contextGuide": ".ai-assistant/guides/SELF_CONTEXT_GUIDE.md",
    "decisionFrameworks": ".ai-assistant/guides/DECISION_FRAMEWORKS.md",
    "selfReviewChecklists": ".ai-assistant/guides/SELF_REVIEW_CHECKLISTS.md",
    "testingGuide": ".ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md"
  },
  "projectStructure": {
    "components": "src/components",
    "hooks": "src/hooks",
    "utilities": "src/utils",
    "tests": "src/__tests__"
  },
  "patterns": {
    "componentPatterns": [
      "../../patterns/components"
    ],
    "hookPatterns": [
      "../../patterns/hooks"
    ]
  },
  "cursorRules": {
    "applyAutonomousWorkflow": true,
    "enforceReview": true,
    "enforceTests": true,
    "contextRefreshFrequency": "project-change"
  }
}
```

### 3. Cursor Workspace Settings

In Cursor, create a `.cursor/settings.json` file with:

```json
{
  "aiAssistant": {
    "useAutonomousWorkflow": true,
    "guidesPath": ".ai-assistant/guides",
    "configPath": ".ai-assistant/config.json",
    "defaultPrompts": {
      "newComponent": "Create a new React component using the Decision Frameworks guide, then review with Self-Review Checklists.",
      "newHook": "Create a custom React hook using the Decision Frameworks guide, then review with Self-Review Checklists.",
      "testGeneration": "Generate tests for this code using the Automated Testing Guide.",
      "refactoring": "Analyze this code and suggest improvements using the Decision Frameworks and Self-Review Checklists."
    }
  },
  "commands": {
    "refreshContext": {
      "description": "Analyze project and refresh AI context",
      "command": "npx context-analyzer && echo 'Context updated. I will now use the latest project context to better understand your codebase.'",
      "keybinding": "ctrl+shift+c"
    },
    "showProjectContext": {
      "description": "Generate and show project context overview",
      "command": "npx generate-prompt . overview && echo 'I have analyzed your project context and will use it for our conversation.'",
      "keybinding": "ctrl+shift+o"
    }
  }
}
```

## Cursor Rules for Autonomous Workflow

To ensure consistent application of the autonomous workflow in Cursor AI, follow these rules:

### Rule 1: Project Context Initialization

**When to apply**: When starting work on a new project or after significant project changes.

**Rule implementation**: 
1. Add this to the top of your conversation with Cursor:
   ```
   Please analyze this project using the Self-Context Guide in .ai-assistant/guides/SELF_CONTEXT_GUIDE.md. Create a project context summary that you can reference throughout our work.
   ```

2. For configuration in your `.cursor/settings.json`, add:
   ```json
   "contextCommands": {
     "refreshContext": "Analyze this project using the Self-Context Guide and update your understanding."
   }
   ```

3. Set up a refresh schedule:
   - After major dependency updates
   - After architecture changes
   - When starting new major features

### Rule 2: Component Creation Protocol

**When to apply**: When creating any new React component.

**Rule implementation**:
1. Standard component creation prompt template:
   ```
   Create a [ComponentName] component that [description of purpose and functionality].
   
   Requirements:
   - [List specific requirements]
   
   Please:
   1. Use the Decision Frameworks guide to determine the appropriate component pattern
   2. Implement the component following our project's patterns
   3. Review the implementation using the Self-Review Checklists
   4. Generate tests using the Automated Testing Guide
   ```

2. For configuration in your `.cursor/settings.json`, add:
   ```json
   "componentCreation": {
     "enforceFrameworks": true,
     "enforceReview": true,
     "enforceTests": true,
     "template": "components/DEFAULT_TEMPLATE.tsx"
   }
   ```

### Rule 3: Architectural Decision Protocol

**When to apply**: When making significant architectural choices.

**Rule implementation**:
1. Standard architectural decision prompt template:
   ```
   I need to implement [feature/system]. Please use the Decision Frameworks guide to help determine the best architectural approach.
   
   Requirements:
   - [List specific requirements]
   
   Please provide:
   1. Analysis of different architectural options
   2. Recommended approach with rationale
   3. Implementation plan
   ```

2. For configuration in your `.cursor/settings.json`, add:
   ```json
   "architecturalDecisions": {
     "enforceFrameworks": true,
     "documentDecisions": true
   }
   ```

### Rule 4: Code Review Protocol

**When to apply**: After generating or modifying code.

**Rule implementation**:
1. Standard review prompt template:
   ```
   Please review this [component/hook/utility] using the Self-Review Checklists. Focus particularly on:
   - [Any specific areas of concern]
   ```

2. For configuration in your `.cursor/settings.json`, add:
   ```json
   "codeReview": {
     "autoReviewGenerated": true,
     "checklistLevel": "comprehensive"
   }
   ```

### Rule 5: Test Generation Protocol

**When to apply**: After component or hook implementation.

**Rule implementation**:
1. Standard test generation prompt template:
   ```
   Please generate tests for this [component/hook/utility] using the Automated Testing Guide. 
   
   Include tests for:
   - [Specific functionalities to test]
   - Edge cases
   - Error scenarios
   ```

2. For configuration in your `.cursor/settings.json`, add:
   ```json
   "testGeneration": {
     "autoGenerateForComponents": true,
     "framework": "jest",
     "enforceComplexity": "medium"
   }
   ```

## Workflow Automation with Cursor

To automate the autonomous workflow in Cursor, you can set up keyboard shortcuts and command palette entries:

### 1. Add Custom Commands to Cursor

Add these to your Cursor settings:

```json
"commands": {
  "refreshContext": {
    "description": "Refresh project context analysis",
    "command": "Please analyze this project using the Self-Context Guide and update your understanding.",
    "keybinding": "ctrl+shift+c"
  },
  "createComponent": {
    "description": "Create new component with autonomous workflow",
    "command": "Create a new React component called {input} that {input}. Use the Decision Frameworks guide and Self-Review Checklists.",
    "keybinding": "ctrl+shift+n"
  },
  "reviewCode": {
    "description": "Review current file with checklists",
    "command": "Review this code using the Self-Review Checklists.",
    "keybinding": "ctrl+shift+r"
  },
  "generateTests": {
    "description": "Generate tests for current file",
    "command": "Generate tests for this code using the Automated Testing Guide.",
    "keybinding": "ctrl+shift+t"
  }
}
```

### 2. Create Workflow Scripts

Create a script in your project to automatically set up files with the correct guidance:

```javascript
// scripts/autonomous-workflow.js
const fs = require('fs');
const path = require('path');

function createComponentWithWorkflow(componentName, description = '') {
  const componentDir = path.join(process.cwd(), 'src/components', componentName);
  fs.mkdirSync(componentDir, { recursive: true });
  
  // Create component file with guide references in comments
  const componentContent = `/**
 * ${componentName} Component
 * 
 * ${description}
 * 
 * @guide Decision Frameworks: .ai-assistant/guides/DECISION_FRAMEWORKS.md
 * @guide Self-Review: .ai-assistant/guides/SELF_REVIEW_CHECKLISTS.md
 * @guide Testing: .ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md
 */
import React from 'react';

// Component implementation
`;
  
  fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
  
  // Create test file with guide reference
  const testContent = `/**
 * Tests for ${componentName} Component
 * 
 * @guide Testing: .ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md
 */
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

// Test implementation
`;
  
  fs.writeFileSync(path.join(componentDir, `${componentName}.test.tsx`), testContent);
  
  console.log(`Created component ${componentName} with autonomous workflow setup`);
}

// Example usage
const [,, componentName, description] = process.argv;
if (componentName) {
  createComponentWithWorkflow(componentName, description);
} else {
  console.log('Please provide a component name');
}
```

## Enforcing the Autonomous Workflow

To ensure team-wide adoption of the autonomous workflow in Cursor:

### 1. Pre-commit Hooks

Set up a pre-commit hook to verify that new components have references to the autonomous guides:

```javascript
// scripts/verify-autonomous-workflow.js
const fs = require('fs');
const path = require('path');

function verifyFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for guide references
  const hasDecisionFrameworks = content.includes('DECISION_FRAMEWORKS.md');
  const hasSelfReview = content.includes('SELF_REVIEW_CHECKLISTS.md');
  const hasTestingGuide = content.includes('AUTOMATED_TESTING_GUIDE.md');
  
  if (!hasDecisionFrameworks || !hasSelfReview || !hasTestingGuide) {
    console.warn(`File ${filePath} is missing autonomous guide references`);
    return false;
  }
  
  return true;
}

// Add to your pre-commit hook configuration
```

### 2. Project Templates

Create project templates with the autonomous workflow already set up:

```
project-template/
├── .ai-assistant/
│   ├── config.json
│   └── guides/
│       ├── SELF_CONTEXT_GUIDE.md
│       ├── DECISION_FRAMEWORKS.md
│       ├── SELF_REVIEW_CHECKLISTS.md
│       └── AUTOMATED_TESTING_GUIDE.md
├── .cursor/
│   └── settings.json
└── scripts/
    ├── autonomous-workflow.js
    └── verify-autonomous-workflow.js
```

## Practical Workflow Example

Here's a practical example of using these Cursor rules for a complete feature development:

### 1. Project Context Initialization

```
[Press Ctrl+Shift+C or run refreshContext command]

Cursor: I'll analyze this project using the Self-Context Guide...

[Cursor provides project analysis]
```

### 2. Feature Planning with Decision Frameworks

```
I need to implement a shopping cart feature. Please use the Decision Frameworks guide to determine the best architectural approach.

Requirements:
- Must support adding/removing items
- Must calculate totals
- Must persist between sessions
- Must sync with backend API

Cursor: I'll analyze the options using the Decision Frameworks guide...

[Cursor provides architectural recommendations]
```

### 3. Component Creation

```
[Press Ctrl+Shift+N or run createComponent command]

Create a ShoppingCart component that displays cart items, totals, and checkout button.

Cursor: I'll create this component using the Decision Frameworks guide...

[Cursor generates component code]

Cursor: I've now reviewed this component using the Self-Review Checklists and made the following improvements...

[Cursor shows improvements made based on checklists]
```

### 4. Test Generation

```
[Press Ctrl+Shift+T or run generateTests command]

Cursor: I'll generate tests for this component using the Automated Testing Guide...

[Cursor generates tests]
```

## Context Saving and Management

To enable persistent context for AI assistants across sessions, the following context management features have been added:

### 1. Context Structure

The context is saved in the following structure:

```
your-react-project/
├── .ai-assistant/
│   ├── context/
│   │   └── project-context.json  # Stored AI context
│   │   └── prompts/                  # Generated context prompts
│   │   │   ├── project-overview.md
│   │   │   └── create-component-*.md
│   │   ├── config.json
│   │   └── guides/
│   │   │   ├── SELF_CONTEXT_GUIDE.md
│   │   │   ├── DECISION_FRAMEWORKS.md
│   │   │   ├── SELF_REVIEW_CHECKLISTS.md
│   │   │   └── AUTOMATED_TESTING_GUIDE.md
│   │   └── scripts/
│   │   │   ├── autonomous-workflow.js
│   │   │   └── verify-autonomous-workflow.js
```

### 2. Context Analyzer Tool

The Context Analyzer tool scans your project and builds a comprehensive understanding of your codebase:

```bash
# Analyze your project and store the context
npx context-analyzer

# Analyze a specific project
npx context-analyzer /path/to/your/project
```

This creates a `project-context.json` file containing:
- Components (with types, patterns, and dependencies)
- Hooks (with types and purposes)
- Stores (with types and persistence status)
- Services (with types and endpoints)
- Domain model entities

### 3. Context-Based Prompt Generator

The Prompt Generator creates AI prompts based on the stored context:

```bash
# Generate a project overview prompt
npx generate-prompt . overview

# Generate a component creation prompt
npx generate-prompt . component MyComponent "A component for user profiles"
```

### 4. Integration with Cursor AI

To use context saving with Cursor AI, add these commands to your `.cursor/settings.json`:

```json
"commands": {
  "refreshContext": {
    "description": "Analyze project and refresh AI context",
    "command": "npx context-analyzer && echo 'Context updated. I will now use the latest project context to better understand your codebase.'",
    "keybinding": "ctrl+shift+c"
  },
  "showProjectContext": {
    "description": "Generate and show project context overview",
    "command": "npx generate-prompt . overview && echo 'I have analyzed your project context and will use it for our conversation.'",
    "keybinding": "ctrl+shift+o"
  }
}
```

### 5. Using Context in AI Conversations

When starting a new conversation with Cursor AI, use one of these prompts:

1. **Initialize with project context**:
   ```
   Please analyze my project context in .ai-assistant/context/project-context.json and provide a summary of your understanding.
   ```

2. **Use context for specific tasks**:
   ```
   Using the project context in .ai-assistant/context/project-context.json, help me create a new component that follows our existing patterns.
   ```

3. **Reference context prompts**:
   ```
   Please read the project overview at .ai-assistant/prompts/project-overview.md and use that context for our conversation.
   ```

### 6. Maintaining Context

Best practices for context maintenance:

1. **Refresh regularly**: Run the context analyzer after significant changes
2. **Update before complex tasks**: Refresh before starting major features
3. **Verify understanding**: Ask the AI to summarize its understanding periodically
4. **Supplement with specifics**: Add domain-specific details the analyzer might miss

## Conclusion

Following these Cursor rules for the autonomous development workflow ensures consistent application of the AI assistant tooling throughout your development process. By standardizing the workflow with concrete rules and automation, you can:

1. Ensure all team members benefit from the autonomous guides
2. Maintain consistent quality across AI-generated and human-written code
3. Streamline the development process with fewer manual steps
4. Create a framework that evolves with your project's needs

Remember to regularly update your project's context when making significant changes to ensure the AI assistant maintains an accurate understanding of your codebase. 