# ZenReact Decision Trees

This document provides visual decision trees to guide AI assistants and developers through common decisions in ZenReact development. These trees represent the decision-making logic embedded throughout the ZenReact documentation in an easy-to-follow format.

## How to Use Decision Trees

1. **Start at the top** of the relevant decision tree
2. **Follow the path** by answering questions about your current task
3. **Arrive at a recommendation** for your specific situation
4. **Reference the related documentation** for more detailed guidance

The trees are presented using Mermaid syntax, which can be rendered in compatible Markdown viewers.

## Component Classification Decision Tree

Use this tree to determine the appropriate component type for a new component.

```mermaid
flowchart TD
    A[New Component] --> B{Does it contain\nbusiness logic?}
    B -->|Yes| C{Does it fetch data\nor manage complex state?}
    B -->|No| D{Is it primarily for\nlayout/styling?}
    
    C -->|Yes| E[Container Component]
    C -->|No| F[UI Component with\ncomplex logic]
    
    D -->|Yes| G{Does it determine\noverall page structure?}
    D -->|No| H[UI Component]
    
    G -->|Yes| I[Page Component]
    G -->|No| J[Layout Component]
    
    H --> K{Does it compose multiple\ncomponents with shared context?}
    K -->|Yes| L[Compound Component]
    K -->|No| M[Simple UI Component]
    
    E --> N[Reference:\nComponent Rules Section 2.2]
    F --> N
    I --> O[Reference:\nComponent Rules Section 2.4]
    J --> P[Reference:\nComponent Rules Section 2.3]
    L --> Q[Reference:\nComponent Rules Section 2.5]
    M --> R[Reference:\nComponent Rules Section 2.1]
```

## State Management Decision Tree

Use this tree to determine the appropriate state management approach.

```mermaid
flowchart TD
    A[State Management\nDecision] --> B{What type of state?}
    
    B -->|UI interactions/visual state| C[UI State]
    B -->|Core business data| D[Application State]
    B -->|Server data| E[Server State]
    B -->|Form inputs/validation| F[Form State]
    
    C --> G{Is it isolated to\na component?}
    G -->|Yes| H[useState]
    G -->|No| I{Is it complex?}
    I -->|Yes| J[useReducer]
    I -->|No| K[Context API]
    
    D --> L{Needed across\nmultiple features?}
    L -->|Yes| M[Zustand]
    L -->|No| N{Complex with\nmany reducers?}
    N -->|Yes| O[Zustand]
    N -->|No| P[Context + useReducer]
    
    E --> Q[React Query / SWR]
    
    F --> R{Is it a complex form?}
    R -->|Yes| S[React Hook Form]
    R -->|No| T{Does it need validation?}
    T -->|Yes| U[React Hook Form]
    T -->|No| V[useState]
    
    H --> W[Reference:\nState Rules Section 1.1]
    J --> X[Reference:\nState Rules Section 1.2]
    K --> Y[Reference:\nState Rules Section 1.3]
    M --> Z[Reference:\nState Rules Section 2.1]
    P --> AA[Reference:\nState Rules Section 2.2]
    Q --> AB[Reference:\nState Rules Section 3]
    S --> AC[Reference:\nState Rules Section 4]
    U --> AC
    V --> W
```

## Performance Optimization Decision Tree

Use this tree to determine appropriate performance optimizations.

```mermaid
flowchart TD
    A[Performance\nConcern] --> B{What's the issue?}
    
    B -->|Unnecessary\nRe-renders| C{Component type?}
    B -->|Slow initial\nloading| D[Code Splitting]
    B -->|Expensive\ncomputations| E[Memoization]
    
    C -->|Pure UI\nComponent| F[React.memo]
    C -->|Component with\nProps/State| G{Are props\ncomplex objects?}
    
    G -->|Yes| H[Custom equality\nfunction with React.memo]
    G -->|No| I[React.memo]
    
    E --> J{Is it inside\nrender function?}
    J -->|Yes| K[useMemo]
    J -->|No| L{Is it an\nevent handler?}
    
    L -->|Yes| M[useCallback]
    L -->|No| N[Compute outside\ncomponent]
    
    F --> O[Reference:\nComponent Rules Section 7.1]
    H --> O
    I --> O
    K --> P[Reference:\nComponent Rules Section 7.2]
    M --> Q[Reference:\nComponent Rules Section 7.3]
    D --> R[Reference:\nComponent Rules Section 7.4]
    N --> S[Reference:\nComponent Rules Section 7.5]
```

## Error Handling Decision Tree

Use this tree to determine the appropriate error handling strategy.

```mermaid
flowchart TD
    A[Error Handling\nDecision] --> B{What kind of error?}
    
    B -->|Component Rendering\nError| C[Error Boundary]
    B -->|Data Fetching\nError| D[React Query\nError States]
    B -->|User Input\nError| E[Form Validation]
    B -->|Network/API\nError| F[Try/Catch with\nError State]
    
    C --> G{Scope of error?}
    G -->|Feature-level| H[Feature Error Boundary]
    G -->|Component-level| I[Component Error Boundary]
    G -->|Application-level| J[Global Error Boundary]
    
    D --> K[Error state in\nQuery hook]
    
    E --> L{Form library?}
    L -->|React Hook Form| M[RHF Validation]
    L -->|Custom| N[Validation state]
    
    F --> O{Is it recoverable?}
    O -->|Yes| P[Retry mechanism]
    O -->|No| Q[User feedback\n+ fallback]
    
    H --> R[Reference:\nError Handling Section 1.1]
    I --> R
    J --> S[Reference:\nError Handling Section 1.2]
    K --> T[Reference:\nError Handling Section 2]
    M --> U[Reference:\nError Handling Section 3.1]
    N --> V[Reference:\nError Handling Section 3.2]
    P --> W[Reference:\nError Handling Section 4.1]
    Q --> X[Reference:\nError Handling Section 4.2]
```

## Testing Strategy Decision Tree

Use this tree to determine the appropriate testing approach.

```mermaid
flowchart TD
    A[Testing\nDecision] --> B{What to test?}
    
    B -->|UI Component| C[Component Tests]
    B -->|Container Component| D[Integration Tests]
    B -->|Custom Hook| E[Hook Tests]
    B -->|Utility Function| F[Unit Tests]
    B -->|User Flow| G[E2E Tests]
    
    C --> H{What to verify?}
    H -->|Rendering| I[Snapshot + DOM Tests]
    H -->|Interaction| J[User Event Tests]
    H -->|Accessibility| K[Axe/Jest-Axe Tests]
    
    D --> L[Mock API +\nVerify Rendering]
    
    E --> M{Hook type?}
    M -->|State Hook| N[renderHook +\nAct Tests]
    M -->|Side Effect Hook| O[Mock + Verify\nSide Effects]
    
    F --> P[Pure Function\nTests]
    
    G --> Q[Cypress/Playwright\nTests]
    
    I --> R[Reference:\nTesting Rules Section 2.1]
    J --> S[Reference:\nTesting Rules Section 2.2]
    K --> T[Reference:\nTesting Rules Section 2.3]
    L --> U[Reference:\nTesting Rules Section 3]
    N --> V[Reference:\nTesting Rules Section 4.1]
    O --> W[Reference:\nTesting Rules Section 4.2]
    P --> X[Reference:\nTesting Rules Section 5]
    Q --> Y[Reference:\nTesting Rules Section 6]
```

## Component Composition Decision Tree

Use this tree to determine the appropriate component composition pattern.

```mermaid
flowchart TD
    A[Component\nComposition] --> B{What's the relationship?}
    
    B -->|Container/Presentation| C[Container Pattern]
    B -->|Parent/Child| D{How tightly coupled?}
    B -->|Shared Functionality| E[Higher-Order Component\nor Custom Hook]
    
    D -->|Tightly Coupled| F[Compound Component]
    D -->|Loosely Coupled| G[Composition Pattern]
    
    F --> H{Needs context?}
    H -->|Yes| I[Context-based\nCompound Component]
    H -->|No| J[Prop-based\nCompound Component]
    
    E --> K{Is it UI or logic?}
    K -->|UI| L[Higher-Order Component]
    K -->|Logic| M[Custom Hook]
    
    C --> N[Reference:\nArchitecture Rules Section 3.1]
    G --> O[Reference:\nArchitecture Rules Section 3.2]
    I --> P[Reference:\nArchitecture Rules Section 3.3]
    J --> Q[Reference:\nArchitecture Rules Section 3.4]
    L --> R[Reference:\nArchitecture Rules Section 4.1]
    M --> S[Reference:\nArchitecture Rules Section 4.2]
```

## API Integration Decision Tree

Use this tree to determine the appropriate API integration strategy.

```mermaid
flowchart TD
    A[API Integration] --> B{What kind of data?}
    
    B -->|Read-only Data| C[React Query]
    B -->|Read-write Data| D[React Query Mutations]
    B -->|Real-time Data| E[WebSocket/SSE]
    
    C --> F{Caching needs?}
    F -->|Standard| G[Default Configuration]
    F -->|Custom| H[Custom Configuration]
    
    D --> I{Optimistic Updates?}
    I -->|Yes| J[Optimistic Updates Pattern]
    I -->|No| K[Standard Mutation]
    
    E --> L{Update frequency?}
    L -->|High| M[Custom Real-time Hook]
    L -->|Low| N[Polling with React Query]
    
    G --> O[Reference:\nState Rules Section 3.1]
    H --> P[Reference:\nState Rules Section 3.2]
    J --> Q[Reference:\nState Rules Section 3.3]
    K --> R[Reference:\nState Rules Section 3.4]
    M --> S[Reference:\nState Rules Section 3.5]
    N --> T[Reference:\nState Rules Section 3.6]
```

## Accessibility Implementation Decision Tree

Use this tree to determine the appropriate accessibility implementation.

```mermaid
flowchart TD
    A[Accessibility\nImplementation] --> B{Component type?}
    
    B -->|Interactive Element| C[Keyboard + Focus]
    B -->|Static Content| D[Semantic HTML]
    B -->|Complex Widget| E[ARIA + Keyboard]
    B -->|Form Element| F[Labels + Validation]
    
    C --> G{Keyboard interaction?}
    G -->|Tab Navigation| H[tabIndex + Focus\nManagement]
    G -->|Custom Keys| I[Key Handlers +\nARIA]
    
    E --> J{Similar to native?}
    J -->|Yes| K[ARIA Role +\nProperties]
    J -->|No| L[Custom ARIA +\nKeyboard]
    
    F --> M[Form Accessibility]
    
    H --> N[Reference:\nAccessibility Rules Section 2.1]
    I --> O[Reference:\nAccessibility Rules Section 2.2]
    D --> P[Reference:\nAccessibility Rules Section 1]
    K --> Q[Reference:\nAccessibility Rules Section 3.1]
    L --> R[Reference:\nAccessibility Rules Section 3.2]
    M --> S[Reference:\nAccessibility Rules Section 4]
```

## Implementation Strategy Decision Tree

Use this tree to determine the overall implementation strategy for a new feature.

```mermaid
flowchart TD
    A[New Feature\nImplementation] --> B{Development phase?}
    
    B -->|Planning| C[Requirements Analysis]
    B -->|Design| D[Component Hierarchy]
    B -->|Implementation| E[Implementation Order]
    B -->|Testing| F[Test Strategy]
    
    C --> G[Document Requirements\nand Constraints]
    
    D --> H[Identify Component\nTypes and Relationships]
    
    E --> I{Feature scope?}
    I -->|Large| J[Bottom-up Implementation]
    I -->|Small| K[Top-down Implementation]
    
    F --> L[Test Pyramid\nImplementation]
    
    G --> M[Reference:\nArchitecture Rules Section 1]
    H --> N[Reference:\nArchitecture Rules Section 2]
    J --> O[Reference:\nImplementation Guide Section 3.1]
    K --> P[Reference:\nImplementation Guide Section 3.2]
    L --> Q[Reference:\nTesting Strategy Section 1]
```

## Using Decision Trees with Context

Decision trees are most effective when combined with the Context Tracking system. Consider the following workflow:

1. Analyze the current context from the Context Tracking document
2. Identify the decision points relevant to the current task
3. Navigate the appropriate decision tree
4. Document the decision and rationale in the Context Tracking system
5. Apply the recommendation from the decision tree

## Extending Decision Trees

These decision trees can be extended as the ZenReact framework evolves. To add a new decision tree:

1. Identify a common decision point in ZenReact development
2. Map out the decision logic with clear questions and paths
3. Include references to relevant documentation sections
4. Add the tree to this document using Mermaid syntax

## Conclusion

Decision trees provide a structured approach to navigating the many decisions in ZenReact development. By following these visual guides, AI assistants and developers can make consistent, well-informed choices that align with ZenReact best practices. The trees serve as a complement to the detailed documentation, offering a quick reference for common decisions while encouraging deeper exploration of the relevant guidelines. 