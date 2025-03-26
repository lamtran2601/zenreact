# ZenReact Context Questionnaire

This context questionnaire is designed for AI assistants to gather essential information at the beginning of a project or task. By collecting this information upfront, assistants can make more informed decisions and provide more tailored recommendations based on ZenReact standards.

## Project Overview Questionnaire

```markdown
## Project Basics

1. **Project Name**: 
2. **Project Description**: (Brief overview of the project's purpose)
3. **Project Stage**:
   - [ ] New project setup
   - [ ] Adding features to existing project
   - [ ] Refactoring existing code
   - [ ] Bug fixing
   - [ ] Performance optimization

4. **Tech Stack**:
   - React Version: 
   - TypeScript Version:
   - State Management: (Zustand/Redux/Context API/etc.)
   - UI Library: (Material UI/Chakra UI/custom/etc.)
   - Routing: (React Router/Next.js/TanStack Router/etc.)
   - API Fetching: (React Query/SWR/Apollo/etc.)
   - Testing: (Jest/React Testing Library/Cypress/etc.)
   - Styling: (CSS Modules/Styled Components/Tailwind/etc.)

5. **Repository Structure**:
   - Monorepo: Yes/No
   - Main directories structure: (e.g., src/components, src/hooks, etc.)
   - Component organization approach: (feature-based/type-based/etc.)

## Current Task Requirements

1. **Task Type**:
   - [ ] New component creation
   - [ ] Feature implementation
   - [ ] State management implementation
   - [ ] API integration
   - [ ] Testing implementation
   - [ ] Bug fixing
   - [ ] Refactoring
   - [ ] Performance optimization
   - [ ] Other: ___________

2. **Task Description**: (Detailed description of what needs to be done)

3. **User Stories/Requirements**: (List of requirements or user stories)

4. **Design References**: (Links to designs, mockups, or examples)

5. **Related Components/Features**: (Existing components or features this task relates to)

6. **Technical Constraints**: (Any technical limitations or requirements)

7. **Performance Requirements**: (Any specific performance goals)

8. **Accessibility Requirements**: (Any specific accessibility needs)

9. **Browser/Device Support**: (Target browsers and devices)

10. **Internationalization Requirements**: (Any i18n considerations)

## Component-Specific Questions (if applicable)

1. **Component Type**:
   - [ ] UI Component (pure presentation)
   - [ ] Layout Component (arrangement of elements)
   - [ ] Container Component (data handling/business logic)
   - [ ] Page Component (route-level component)
   - [ ] Compound Component (related components with shared state)

2. **Component Variants Required**: (Different visual or functional variants)

3. **Component States**: (Different states like loading, error, empty, etc.)

4. **Interactivity Requirements**: (User interactions, events, animations)

5. **Reusability Scope**: (Where this component will be reused)

## State Management Questions (if applicable)

1. **State Type**:
   - [ ] UI State (component appearance/behavior)
   - [ ] Application State (business data)
   - [ ] Server State (API data)
   - [ ] Form State (user input)

2. **State Complexity**:
   - [ ] Simple (few properties, simple updates)
   - [ ] Medium (several properties, some derived state)
   - [ ] Complex (many properties, complex updates, normalization needed)

3. **State Persistence**: (Does state need to persist across sessions?)

4. **State Sharing**: (Which components need access to this state?)

5. **Update Frequency**: (How often will state change?)

6. **Optimistic Updates**: (Are optimistic UI updates needed?)

## API Integration Questions (if applicable)

1. **API Endpoints**: (List of endpoints to be used)

2. **Authentication Requirements**: (How API requests are authenticated)

3. **Data Transformation Needs**: (Any data transformation requirements)

4. **Caching Requirements**: (Caching behavior needed)

5. **Error Handling Strategy**: (How API errors should be handled)

6. **Loading State Handling**: (How loading states should be presented)

## Testing Requirements (if applicable)

1. **Test Coverage Goals**: (Minimum coverage percentage)

2. **Test Types Needed**:
   - [ ] Unit tests
   - [ ] Component tests
   - [ ] Integration tests
   - [ ] E2E tests
   - [ ] Performance tests
   - [ ] Accessibility tests

3. **Edge Cases to Test**: (Specific edge cases to cover)

4. **Test Data Requirements**: (Mock data needs)

## User Experience Requirements

1. **Loading States**: (How loading should be handled)

2. **Error States**: (How errors should be presented)

3. **Empty States**: (How empty data should be handled)

4. **Success Feedback**: (How to confirm successful actions)

5. **Animations/Transitions**: (Required motion design)

## Additional Context

1. **Related Documentation**: (Links to relevant docs)

2. **Similar Examples**: (Links to similar implementations)

3. **Known Challenges**: (Any anticipated challenges)

4. **Timeline/Priority**: (Urgency and importance of the task)
```

## Feature Development Context Template

For more focused feature development tasks, use this streamlined template:

```markdown
## Feature Development Context

### Feature Overview
- **Feature Name**: 
- **Purpose**: (What problem does this feature solve?)
- **Target Users**: (Who will use this feature?)
- **User Stories**:
  1. 
  2.

### Technical Requirements
- **Component Hierarchy**: (Main components needed)
- **State Requirements**: (State management approach)
- **API Integration**: (Backend requirements)
- **Data Flow**: (How data moves through the feature)
- **Dependencies**: (External libraries or internal dependencies)

### UI/UX Requirements
- **Key Screens/States**: (Main UI states to implement)
- **User Interactions**: (How users interact with the feature)
- **Responsive Requirements**: (Behavior across device sizes)
- **Accessibility Requirements**: (A11y considerations)

### Implementation Constraints
- **Performance Requirements**: (Speed/optimization needs)
- **Browser Support**: (Target browsers)
- **Feature Flags**: (Any feature flag requirements)
- **Analytics**: (Tracking requirements)

### Deliverables
- **Required Components**:
  1. 
  2.
- **Required Tests**:
  1. 
  2.
- **Documentation Needs**:
  1. 
  2.
```

## Bug Fix Context Template

For bug fixing tasks, use this template:

```markdown
## Bug Fix Context

### Bug Overview
- **Bug Description**: 
- **Steps to Reproduce**:
  1. 
  2.
- **Expected Behavior**: 
- **Actual Behavior**: 
- **Impact Level**: (Critical/High/Medium/Low)
- **Affected Users**: (All/Subset of users - describe)

### Technical Context
- **Affected Components**: 
- **Affected State/Data Flow**:
- **Environment Details**: (Browser, OS, device where bug occurs)
- **Console Errors**: (Any error messages)
- **Related Code Areas**: (Likely files/components involved)

### Investigation Path
- **Initial Hypothesis**: 
- **Verification Steps**:
  1. 
  2.
- **Potential Solutions**:
  1. 
  2.
- **Solution Trade-offs**: (Performance, maintainability considerations)

### Fix Requirements
- **Test Cases to Add**: (Test cases to prevent regression)
- **Documentation Updates**: (Docs to update after fix)
- **Related Issues**: (Similar bugs or related features)
```

## Using the Questionnaire

AI assistants should:

1. Select the appropriate template based on the task
2. Ask users to fill out relevant sections or gather information through conversation
3. Save the context information for reference throughout the task
4. Update context as new information becomes available
5. Use the gathered information to guide implementation decisions

When beginning a task, the AI assistant can prompt the user with:

> "To help me provide the best assistance with your [task type], I'd like to gather some context information. Would you prefer I ask questions conversationally, or would you like to see a structured questionnaire template that you can fill out?"

For conversational context gathering, the AI can adapt questions from the templates to flow naturally in the conversation.

## Context Maintenance

Throughout the project, maintain an updated context object with this structure:

```json
{
  "project_context": {
    "name": "Project Name",
    "description": "Brief project description",
    "stage": "Development/Refactoring/etc.",
    "tech_stack": {
      "react": "18.2.0",
      "typescript": "5.0.4",
      "state_management": "Zustand",
      "ui_library": "Custom components",
      "routing": "React Router 6",
      "api_fetching": "React Query",
      "testing": "React Testing Library + Jest",
      "styling": "CSS Modules"
    }
  },
  "current_task": {
    "type": "Feature implementation",
    "description": "Implementing user profile page",
    "requirements": [
      "Display user information",
      "Allow editing profile details",
      "Show user activity history"
    ],
    "components": [
      "UserProfilePage",
      "UserProfileForm",
      "ActivityHistoryList"
    ]
  },
  "active_components": [
    {
      "name": "UserProfilePage",
      "type": "Page Component",
      "status": "In progress",
      "path": "src/pages/UserProfile.tsx"
    }
  ],
  "current_state": {
    "user_profile": {
      "type": "Server State",
      "management": "React Query",
      "related_components": ["UserProfilePage", "UserProfileForm"]
    }
  }
}
```

This context should be updated throughout the implementation process to reflect the current state of development and ensure consistency in implementation decisions. 