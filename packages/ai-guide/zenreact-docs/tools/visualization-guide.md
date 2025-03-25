# ZenReact Visualization Guide for AI Assistants

This guide provides visual aids designed to help AI assistants navigate the ZenReact documentation effectively. These visualizations serve as quick reference tools for decision-making and understanding relationships between different aspects of the framework.

## Decision Trees

### 1. Component Selection Decision Tree

```mermaid
graph TD
    A[New Component Needed] --> B{What is the purpose?}
    B -->|Display UI elements| C[UI Component]
    B -->|Arrange other components| D[Layout Component]
    B -->|Fetch/process data| E[Container Component]
    B -->|Represent a route| F[Page Component]
    B -->|Related components with shared state| G[Compound Component]
    
    C --> H{Is it reusable?}
    H -->|Yes| I[Create in shared UI library]
    H -->|No| J[Create in feature directory]
    
    E --> K{Data source?}
    K -->|API| L[Use React Query]
    K -->|Local state| M[Use useState/useReducer]
    K -->|Global state| N[Use Zustand]
```

### 2. State Management Selection Tree

```mermaid
graph TD
    A[State Management Need] --> B{What type of state?}
    B -->|Component UI state| C[UI State]
    B -->|Business data| D[Application State]
    B -->|Server data| E[Server State]
    B -->|Form inputs| F[Form State]
    
    C --> G{Scope?}
    G -->|Single component| H[useState]
    G -->|Complex logic| I[useReducer]
    G -->|Multiple components| J[Context API]
    
    D --> K{Scope?}
    K -->|Application-wide| L[Zustand]
    K -->|Feature-scoped| M[Context + useReducer]
    
    E --> N[React Query/SWR]
    
    F --> O{Complexity?}
    O -->|Simple| P[useState]
    O -->|Complex validation| Q[React Hook Form]
```

### 3. Testing Approach Decision Tree

```mermaid
graph TD
    A[Test Requirement] --> B{What are you testing?}
    B -->|UI Component| C[Component Test]
    B -->|Custom Hook| D[Hook Test]
    B -->|API Integration| E[API Integration Test]
    B -->|User Flow| F[User Flow Test]
    B -->|Utility Function| G[Unit Test]
    
    C --> H{Test priorities?}
    H -->|Rendering| I[Snapshot Test]
    H -->|Interactivity| J[User Event Test]
    H -->|Accessibility| K[Accessibility Test]
    
    E --> L{Test approach?}
    L -->|Mock API| M[MSW Setup]
    L -->|Test data handling| N[Loading/Error/Success States]
```

## Knowledge Graphs

### 1. ZenReact Documentation Relationships

```mermaid
graph LR
    A[ZenReact Docs] --> B[Guides]
    A --> C[Templates]
    A --> D[Rules]
    
    B --> B1[Development Workflow]
    B --> B2[Context Management]
    B --> B3[Component Development]
    B --> B4[State Management]
    B --> B5[Testing Strategy]
    
    C --> C1[Component Template]
    C --> C2[Hook Template]
    C --> C3[Store Template]
    C --> C4[Context Template]
    C --> C5[Test Template]
    
    D --> D1[Coding Standards]
    D --> D2[Component Rules]
    D --> D3[State Rules]
    D --> D4[Architecture Rules]
    D --> D5[AI Collaboration Rules]
    
    B3 -.-> D2
    B3 -.-> C1
    B4 -.-> D3
    B4 -.-> C2
    B4 -.-> C3
    B4 -.-> C4
    B5 -.-> C5
    
    D1 -.-> D2
    D1 -.-> D3
    D1 -.-> D4
```

### 2. Component Structure Map

```mermaid
graph TD
    A[React Component] --> B[Props Interface]
    A --> C[Internal Organization]
    A --> D[Rendering Logic]
    
    B --> B1[Required Props]
    B --> B2[Optional Props]
    B --> B3[Event Handler Props]
    B --> B4[Styling Props]
    
    C --> C1[Hook Declarations]
    C --> C2[Derived State]
    C --> C3[Event Handlers]
    C --> C4[Effects]
    
    D --> D1[JSX Structure]
    D --> D2[Conditional Rendering]
    D --> D3[List Rendering]
    D --> D4[Component Composition]
```

### 3. State Management Map

```mermaid
graph TD
    A[State Management] --> B[UI State]
    A --> C[Application State]
    A --> D[Server State]
    A --> E[Form State]
    
    B --> B1[useState]
    B --> B2[useReducer]
    
    C --> C1[Zustand]
    C --> C2[Context API]
    
    D --> D1[React Query]
    D --> D2[SWR]
    
    E --> E1[React Hook Form]
    E --> E2[Formik]
    
    B1 --> F[Component-Scoped State]
    C1 --> G[Global State]
    D1 --> H[Cache Management]
    E1 --> I[Validation]
```

## Implementation Flow Diagrams

### 1. Feature Development Flow

```mermaid
sequenceDiagram
    participant U as User
    participant AI as AI Assistant
    participant D as Documentation
    
    U->>AI: Request new feature implementation
    AI->>D: Consult development workflow guide
    AI->>U: Ask clarifying questions
    U->>AI: Provide feature details
    AI->>D: Check component & state rules
    AI->>AI: Plan implementation structure
    AI->>U: Propose implementation approach
    U->>AI: Approve or modify plan
    AI->>AI: Implement component structure
    AI->>AI: Implement state management
    AI->>AI: Add error handling & accessibility
    AI->>AI: Create tests
    AI->>U: Present complete implementation
    U->>AI: Request adjustments
    AI->>D: Reference relevant standards
    AI->>AI: Make adjustments
    AI->>U: Present final implementation
```

### 2. Component Development Process

```mermaid
graph TD
    A[Start Component Development] --> B[Classify Component Type]
    B --> C[Create Props Interface]
    C --> D[Set Up Component Structure]
    D --> E[Implement State Management]
    E --> F[Add Event Handlers]
    F --> G[Implement Rendering Logic]
    G --> H[Add Error Handling]
    H --> I[Ensure Accessibility]
    I --> J[Optimize Performance]
    J --> K[Write Tests]
    K --> L[Complete Documentation]
    L --> M[Component Complete]
```

## Reference Tables

### Component Types Quick Reference

| Component Type | Primary Purpose | State Approach | Example Use Cases |
|----------------|----------------|----------------|-------------------|
| UI Component | Display UI elements | Local state only | Buttons, Cards, Inputs |
| Layout Component | Arrange other components | Minimal/layout state | Grid, Flex, Container |
| Container Component | Data fetching & processing | External state | Data listings, forms with submission |
| Page Component | Route-level component | Combines other components | Product page, settings page |
| Compound Component | Related components with shared state | Context API | Tabs, Accordion, Select |

### State Management Quick Reference

| State Type | When to Use | Recommended Technology | Key Considerations |
|------------|------------|------------------------|-------------------|
| UI State | Component appearance/behavior | useState, useReducer | Keep local, reset on unmount |
| Application State | Business data across components | Zustand | Organize by domain, normalize data |
| Server State | API data with caching | React Query, SWR | Handle loading/error states |
| Form State | User input with validation | React Hook Form | Implement validation, track dirty/touched |

### Testing Types Quick Reference

| Test Type | Primary Focus | Tools | Key Patterns |
|-----------|--------------|-------|--------------|
| Component Tests | Rendering, interactions | React Testing Library | User-centric testing, accessibility |
| Hook Tests | Custom hook behavior | React Hooks Testing Library | Initialize, act, assert pattern |
| API Tests | Data fetching, mutations | MSW | Mock responses, test states |
| Integration Tests | Component interactions | React Testing Library | User flows, state changes |
| Unit Tests | Utility functions | Jest | Input/output testing |

## Tool Selection Guide

### Choosing the Right State Management Tool

```mermaid
flowchart TD
    A[Do you need state management?] -->|Yes| B{What is the scope?}
    A -->|No| Z[Use props]
    
    B -->|Single component| C{Is it complex?}
    B -->|Across components| D{How many components?}
    B -->|Application-wide| E[Zustand]
    
    C -->|Simple| F[useState]
    C -->|Complex logic| G[useReducer]
    
    D -->|Few related components| H[Context API]
    D -->|Many components| I[Zustand]
    
    J[Is it server data?] -->|Yes| K[React Query/SWR]
    J -->|No| L[See other options]
    
    M[Is it form data?] -->|Yes| N{Form complexity?}
    M -->|No| O[See other options]
    
    N -->|Simple form| P[useState]
    N -->|Complex validation| Q[React Hook Form]
    N -->|Many fields/forms| R[React Hook Form]
```

## Conclusion

These visualization tools are designed to help AI assistants navigate the ZenReact documentation more effectively. Use them as quick references when making decisions about implementation approaches, but always refer to the detailed documentation for comprehensive guidance.

Remember that these visualizations are simplifications of more complex relationships and decision processes. When in doubt, consult the relevant documentation sections for detailed guidance. 