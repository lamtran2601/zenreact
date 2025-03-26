# ZenReact Context Tracking System

This document defines a standardized format for tracking development context throughout conversations between AI assistants and developers. Consistent context tracking ensures that AI assistants maintain awareness of the project state, make informed decisions, and provide relevant assistance throughout development sessions.

## Purpose of Context Tracking

Effective context tracking serves several critical purposes:

1. **Knowledge Persistence**: Maintains understanding across conversation turns
2. **Decision Continuity**: Ensures consistent reasoning throughout development
3. **Reference Efficiency**: Provides quick access to relevant information
4. **Collaboration Enhancement**: Enables smooth transitions between work sessions
5. **Quality Assurance**: Reduces errors by maintaining contextual awareness

## Context Structure

The ZenReact context tracking system uses a structured JSON format with the following components:

```json
{
  "project_metadata": {
    "name": "Project name",
    "description": "Brief project description",
    "repository": "Repository URL or path",
    "zenreact_version": "Version of ZenReact being used"
  },
  "tech_stack": {
    "react": "18.2.0",
    "typescript": "5.0.4",
    "state_management": "Zustand 4.3.8",
    "routing": "React Router 6.14.0",
    "api_management": "React Query 4.29.5",
    "ui_library": "Custom components",
    "testing": "Jest 29.5.0 + RTL 14.0.0",
    "styling": "CSS Modules/Tailwind 3.3.2"
  },
  "current_development_context": {
    "current_feature": {
      "name": "Feature name",
      "description": "Brief description of feature",
      "status": "planning|implementing|testing|refactoring",
      "requirements": [
        "Requirement 1",
        "Requirement 2"
      ],
      "constraints": [
        "Constraint 1",
        "Constraint 2"
      ]
    },
    "current_task": {
      "type": "component_creation|state_implementation|api_integration|testing|bug_fix|refactoring",
      "description": "Detailed task description",
      "status": "planning|in_progress|reviewing|complete",
      "priority": "low|medium|high|critical",
      "parent_feature": "Feature name",
      "acceptance_criteria": [
        "Criterion 1",
        "Criterion 2"
      ]
    }
  },
  "code_context": {
    "active_files": [
      {
        "path": "src/components/SomeComponent.tsx",
        "last_action": "viewing|editing|creating",
        "last_modified": "ISO timestamp"
      }
    ],
    "component_hierarchy": [
      "AppRoot > FeaturePage > FeatureContainer > ComponentA"
    ],
    "active_components": [
      {
        "name": "ComponentA",
        "type": "UI|Layout|Container|Page|Compound",
        "status": "planning|implementing|testing|complete",
        "path": "src/components/ComponentA.tsx",
        "dependencies": [
          "ComponentB",
          "useFeatureHook"
        ]
      }
    ],
    "state_management": [
      {
        "name": "useFeatureStore",
        "type": "Zustand store",
        "category": "UI|Application|Server|Form",
        "path": "src/stores/featureStore.ts",
        "consumers": [
          "ComponentA",
          "ComponentB"
        ]
      }
    ],
    "api_endpoints": [
      {
        "path": "/api/some-endpoint",
        "method": "GET|POST|PUT|DELETE",
        "status": "implemented|needs-implementation|needs-testing",
        "data_structures": [
          "FeatureData",
          "FeatureRequest"
        ]
      }
    ]
  },
  "implementation_context": {
    "implementation_phase": "context_gathering|planning|implementation|validation",
    "implementation_steps": [
      {
        "name": "Step description",
        "status": "todo|in_progress|complete",
        "details": "Additional information about this step"
      }
    ],
    "outstanding_questions": [
      {
        "question": "Question that needs answering",
        "status": "asked|answered|deferred",
        "answer": "Answer if provided"
      }
    ],
    "decisions": [
      {
        "description": "Decision made",
        "reasoning": "Reasoning behind decision",
        "alternatives_considered": [
          "Alternative 1",
          "Alternative 2"
        ],
        "rule_references": [
          "Component Rule 2.3",
          "State Rule 1.1"
        ],
        "timestamp": "ISO timestamp"
      }
    ]
  },
  "documentation_context": {
    "referenced_documents": [
      {
        "document": "Component Rules",
        "section": "UI Components",
        "relevance": "Direct guidance for current task"
      }
    ],
    "zenreact_standards_applied": [
      "Component Rule 2.3: Use function declarations for components",
      "State Rule 1.1: Single source of truth"
    ]
  }
}
```

## Context Maintenance Workflow

### Initial Context Gathering

At the start of a new conversation or project, gather essential context:

1. Collect project metadata and tech stack information
2. Understand the current feature and task requirements
3. Identify active files and components
4. Determine the current implementation phase
5. Reference relevant ZenReact documentation

Use the [Context Questionnaire](./context-questionnaire.md) to gather this information if it's not readily available.

### Continuous Context Updates

Throughout the conversation, update the context as new information emerges:

1. **After Requirements Clarification**:
   - Update feature requirements and constraints
   - Refine acceptance criteria
   - Document outstanding questions

2. **During Planning**:
   - Document component hierarchy decisions
   - Record state management approaches
   - Update implementation steps

3. **During Implementation**:
   - Track active files and components
   - Update implementation step statuses
   - Document decisions and rule applications

4. **During Validation**:
   - Track identified issues
   - Document solutions to problems
   - Update component and feature statuses

### Context Transition

When ending a conversation or transitioning between AI assistants:

1. Provide a comprehensive context summary
2. Highlight outstanding tasks and questions
3. Document the current implementation phase
4. Share the full context object for continuity

## Practical Implementation

### Context Initialization

Begin with a minimal context and expand as information becomes available:

```json
{
  "project_metadata": {
    "name": "E-commerce Platform",
    "description": "Online store with product catalog and checkout"
  },
  "current_development_context": {
    "current_feature": {
      "name": "Shopping Cart",
      "status": "planning"
    },
    "current_task": {
      "type": "state_implementation",
      "description": "Implement shopping cart state management",
      "status": "planning"
    }
  },
  "code_context": {
    "active_files": [],
    "active_components": [],
    "state_management": []
  },
  "implementation_context": {
    "implementation_phase": "context_gathering",
    "implementation_steps": [],
    "outstanding_questions": [],
    "decisions": []
  },
  "documentation_context": {
    "referenced_documents": [],
    "zenreact_standards_applied": []
  }
}
```

### Progressive Context Building

As the conversation progresses, build the context incrementally. For example, after discussing state management:

```json
{
  "state_management": [
    {
      "name": "useCartStore",
      "type": "Zustand store",
      "category": "Application",
      "path": "src/stores/cartStore.ts",
      "consumers": ["CartPage", "CartWidget", "ProductDetail"]
    }
  ],
  "decisions": [
    {
      "description": "Use Zustand for cart state",
      "reasoning": "Application-wide state with persistence needs",
      "alternatives_considered": ["Context API", "Redux"],
      "rule_references": ["State Rule 2.2: Use Zustand for application state"],
      "timestamp": "2023-06-10T14:35:22Z"
    }
  ]
}
```

### Context Summarization

Periodically summarize the context to ensure shared understanding:

```
Current Context Summary:
- Feature: Shopping Cart (implementation)
- Task: State implementation with Zustand (in_progress)
- Active Components: CartWidget (UI), CartPage (Page)
- Key Decisions: 
  * Using Zustand for cart state
  * Implementing localStorage persistence
- Next Steps:
  * Create UI components for cart
  * Implement cart operations (add, remove, update)
  * Add persistence with localStorage
```

## Examples of Context Tracking

### Example 1: Feature Development Context

```json
{
  "project_metadata": {
    "name": "Health Tracker App",
    "description": "Mobile-first app for tracking fitness and health metrics"
  },
  "tech_stack": {
    "react": "18.2.0",
    "typescript": "5.0.4",
    "state_management": "Zustand 4.3.8",
    "routing": "React Router 6.14.0",
    "api_management": "React Query 4.29.5",
    "ui_library": "Custom components",
    "testing": "Jest 29.5.0 + RTL 14.0.0",
    "styling": "Tailwind 3.3.2"
  },
  "current_development_context": {
    "current_feature": {
      "name": "Activity Dashboard",
      "description": "Main dashboard showing user's activity summaries and metrics",
      "status": "implementing",
      "requirements": [
        "Display daily step count with progress toward goal",
        "Show weekly activity summary with charts",
        "Allow filtering data by date range",
        "Support multiple activity types (walking, running, cycling)"
      ],
      "constraints": [
        "Must be responsive for mobile and desktop",
        "Should work offline with data syncing when online",
        "Must be accessible (WCAG AA compliant)"
      ]
    },
    "current_task": {
      "type": "component_creation",
      "description": "Implement ActivityChart component for visualizing activity data",
      "status": "in_progress",
      "priority": "high",
      "parent_feature": "Activity Dashboard",
      "acceptance_criteria": [
        "Displays activity data in bar chart format",
        "Supports different activity types with color coding",
        "Shows goal thresholds with indicator lines",
        "Provides interactive tooltips on hover/touch",
        "Accessible with keyboard navigation and screen readers"
      ]
    }
  },
  "code_context": {
    "active_files": [
      {
        "path": "src/components/ActivityDashboard/ActivityChart.tsx",
        "last_action": "editing",
        "last_modified": "2023-06-10T15:42:12Z"
      },
      {
        "path": "src/stores/activityStore.ts",
        "last_action": "viewing",
        "last_modified": "2023-06-09T11:23:45Z"
      }
    ],
    "component_hierarchy": [
      "App > DashboardLayout > ActivityDashboard > ActivitySummary > ActivityChart"
    ],
    "active_components": [
      {
        "name": "ActivityChart",
        "type": "UI",
        "status": "implementing",
        "path": "src/components/ActivityDashboard/ActivityChart.tsx",
        "dependencies": [
          "useActivityData",
          "ChartTooltip"
        ]
      },
      {
        "name": "ActivitySummary",
        "type": "Container",
        "status": "implementing",
        "path": "src/components/ActivityDashboard/ActivitySummary.tsx",
        "dependencies": [
          "ActivityChart",
          "ActivityMetrics",
          "useActivityStore"
        ]
      }
    ],
    "state_management": [
      {
        "name": "useActivityStore",
        "type": "Zustand store",
        "category": "Application",
        "path": "src/stores/activityStore.ts",
        "consumers": [
          "ActivityDashboard",
          "ActivitySummary",
          "ActivityFilters"
        ]
      },
      {
        "name": "useActivityData",
        "type": "React Query hook",
        "category": "Server",
        "path": "src/hooks/useActivityData.ts",
        "consumers": [
          "ActivitySummary",
          "ActivityChart"
        ]
      }
    ],
    "api_endpoints": [
      {
        "path": "/api/activities",
        "method": "GET",
        "status": "implemented",
        "data_structures": [
          "ActivityData",
          "ActivityFilters"
        ]
      }
    ]
  },
  "implementation_context": {
    "implementation_phase": "implementation",
    "implementation_steps": [
      {
        "name": "Create ActivityChart component structure",
        "status": "complete",
        "details": "Basic component with props interface defined"
      },
      {
        "name": "Implement chart visualization with recharts",
        "status": "in_progress",
        "details": "Bar chart implemented, need to add goal thresholds"
      },
      {
        "name": "Add tooltip interaction",
        "status": "todo",
        "details": "Custom tooltip with activity details"
      },
      {
        "name": "Implement accessibility features",
        "status": "todo",
        "details": "Keyboard navigation and screen reader support"
      }
    ],
    "outstanding_questions": [
      {
        "question": "Should the chart support zooming into specific time periods?",
        "status": "asked",
        "answer": ""
      },
      {
        "question": "What is the preferred color scheme for different activity types?",
        "status": "answered",
        "answer": "Use the activityColors object from the theme system"
      }
    ],
    "decisions": [
      {
        "description": "Use recharts library for chart visualization",
        "reasoning": "Built-in accessibility support and React integration",
        "alternatives_considered": [
          "D3.js (more complex, less React-friendly)",
          "Chart.js (less customizable)",
          "Victory (slower performance with large datasets)"
        ],
        "rule_references": [
          "Component Rule 6.2: Prefer accessible libraries"
        ],
        "timestamp": "2023-06-09T14:30:00Z"
      },
      {
        "description": "Implement responsive design with container queries",
        "reasoning": "Component needs to adapt to different container sizes, not just viewport",
        "alternatives_considered": [
          "Media queries (viewport-based)",
          "Resize observers (more complex implementation)"
        ],
        "rule_references": [
          "Component Rule 5.1: Make components responsive"
        ],
        "timestamp": "2023-06-10T10:15:32Z"
      }
    ]
  },
  "documentation_context": {
    "referenced_documents": [
      {
        "document": "Component Rules",
        "section": "UI Components",
        "relevance": "Guidelines for creating presentational components"
      },
      {
        "document": "Accessibility Guidelines",
        "section": "Interactive Elements",
        "relevance": "Requirements for making charts accessible"
      }
    ],
    "zenreact_standards_applied": [
      "Component Rule 2.1: Each component in its own file",
      "Component Rule 3.1: Use TypeScript interfaces for props",
      "Component Rule 4.1: Hooks first in component body",
      "Component Rule 5.1: Make components responsive",
      "Accessibility Rule 3.2: Provide keyboard interaction for interactive elements"
    ]
  }
}
```

### Example 2: Bug Fix Context

```json
{
  "project_metadata": {
    "name": "Invoice Management System",
    "description": "Internal tool for managing client invoices"
  },
  "current_development_context": {
    "current_feature": {
      "name": "Invoice Generator",
      "status": "bug_fix"
    },
    "current_task": {
      "type": "bug_fix",
      "description": "Fix issue where tax calculations are incorrect when changing currency",
      "status": "in_progress",
      "priority": "critical",
      "acceptance_criteria": [
        "Tax calculations remain correct when currency is changed",
        "Existing invoices are not affected",
        "Unit tests cover the fixed behavior"
      ]
    }
  },
  "code_context": {
    "active_files": [
      {
        "path": "src/components/InvoiceForm/TaxCalculator.tsx",
        "last_action": "editing"
      },
      {
        "path": "src/utils/currencyUtils.ts",
        "last_action": "viewing"
      },
      {
        "path": "src/hooks/useTaxCalculation.ts",
        "last_action": "viewing"
      }
    ],
    "active_components": [
      {
        "name": "TaxCalculator",
        "type": "UI",
        "status": "fixing",
        "path": "src/components/InvoiceForm/TaxCalculator.tsx"
      }
    ],
    "state_management": [
      {
        "name": "useInvoiceStore",
        "type": "Zustand store",
        "category": "Application"
      },
      {
        "name": "useTaxCalculation",
        "type": "Custom hook",
        "category": "UI"
      }
    ]
  },
  "implementation_context": {
    "implementation_phase": "implementation",
    "bug_details": {
      "description": "When changing currency, tax calculations use the new currency rate but don't recalculate against the original amounts",
      "steps_to_reproduce": [
        "Create new invoice in USD",
        "Add line items with taxes",
        "Change currency to EUR",
        "Observe incorrect tax calculations"
      ],
      "root_cause": "Tax calculations are performed after currency conversion rather than before",
      "affected_components": [
        "TaxCalculator",
        "useTaxCalculation hook"
      ]
    },
    "fix_approach": {
      "description": "Refactor tax calculation to happen before currency conversion",
      "steps": [
        "Move tax calculation before currency conversion in useTaxCalculation hook",
        "Update TaxCalculator component to display correct values",
        "Add unit tests for currency changes"
      ],
      "risks": [
        "Could affect existing invoices if not implemented carefully",
        "Might impact other parts of the application that depend on tax calculation"
      ]
    },
    "outstanding_questions": [
      {
        "question": "Should the fix be applied to existing saved invoices or only new ones?",
        "status": "answered",
        "answer": "Only to new invoices and edits to existing ones, don't modify saved invoice data"
      }
    ],
    "decisions": [
      {
        "description": "Store tax amounts in base currency and convert for display only",
        "reasoning": "Keeps the financial calculations consistent regardless of display currency",
        "rule_references": ["State Rule 5.2: Maintain data consistency"],
        "timestamp": "2023-06-10T11:05:22Z"
      }
    ]
  },
  "documentation_context": {
    "referenced_documents": [
      {
        "document": "State Rules",
        "section": "Data Consistency",
        "relevance": "Guidelines for maintaining consistent state"
      },
      {
        "document": "Testing Strategy",
        "section": "Bug Fix Testing",
        "relevance": "Testing requirements for bug fixes"
      }
    ]
  }
}
```

## Context Visualization

For ease of reference, AI assistants should periodically present simplified visual representations of the development context:

### Component Hierarchy Visualization

```
App
├── DashboardLayout
│   ├── Sidebar
│   ├── Header
│   └── ActivityDashboard (current feature)
│       ├── ActivityFilters
│       ├── ActivitySummary (current component's parent)
│       │   ├── ActivityMetrics
│       │   └── ActivityChart (⭐ current component)
│       └── ActivityDetails
```

### State Dependencies Visualization

```
useActivityStore (Application State)
├── ActivityDashboard
├── ActivitySummary
│   └── ActivityChart (⭐ current component)
└── ActivityFilters

useActivityData (Server State)
├── ActivitySummary
└── ActivityChart (⭐ current component)
```

## Context Tracking Best Practices

1. **Keep Context Current**: Update the context object after significant decisions or changes
2. **Prioritize Relevance**: Focus on the most relevant context for the current task
3. **Surface Important Context**: Highlight context that directly impacts current decisions
4. **Track Decision History**: Document decisions with reasoning and rule references
5. **Maintain Consistency**: Ensure context tracking is consistent across conversations
6. **Automate Where Possible**: Infer context from code and conversations when possible
7. **Verify Context Accuracy**: Periodically confirm context correctness with developers

## Implementation in AI Assistants

AI assistants should:

1. Initialize context tracking at the start of new conversations
2. Update context continuously throughout the conversation
3. Persist context between conversation sessions
4. Present relevant context when making recommendations
5. Use context to guide decision-making and implementations
6. Provide context summaries during transitions or when requested

## Conclusion

Consistent context tracking is essential for effective AI-assisted development in ZenReact projects. By maintaining a structured representation of the development context, AI assistants can provide more relevant, consistent, and helpful guidance throughout the development process. The standardized context format ensures that all essential information is tracked and accessible when needed, leading to higher quality implementations and more effective collaboration. 