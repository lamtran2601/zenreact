# AI Implementation Sequence: MANDATORY PROCESS

## 🚨 CRITICAL: REQUIRED SEQUENCE 🚨

All AI agents MUST follow this implementation sequence for ANY task in ZenTask:

1. **Context Assessment** - Complete contextual analysis BEFORE any implementation
2. **Documentation Review** - Document current project state and progress
3. **Planning Phase** - Create detailed implementation plan
4. **Rule Validation** - Verify against ZenTask standards
5. **Implementation** - Follow the plan step-by-step
6. **Quality Validation** - Verify implementation meets standards

⚠️ **IMPLEMENTATION MUST NEVER BEGIN BEFORE STEPS 1-4 ARE COMPLETED**

## 1. Context Assessment Framework

### Required Questions Before ANY Implementation

```json
{
  "task_context": {
    "task_type": "[Feature development / Bug fix / Refactoring / Performance]",
    "related_features": ["List all related features"],
    "integration_points": ["List components/services this will interact with"],
    "requirements": ["List specific requirements"]
  },
  "project_state": {
    "current_phase": "[Development phase]",
    "completed_features": ["List completed features"],
    "in_progress_features": ["List in-progress features"],
    "existing_patterns": ["List relevant patterns in codebase"]
  },
  "implementation_constraints": {
    "technical_constraints": ["List technical limitations/requirements"],
    "dependency_requirements": ["List required libraries/versions"],
    "architectural_guidelines": ["List architectural rules to follow"]
  }
}
```

### Additional Context Collection

- Review existing components in the same feature area
- Check current implementation patterns and coding style
- Review relevant documentation
- Identify project-specific rules that apply to this task

## 2. Documentation and Current State

Create or update these documents BEFORE implementation:

- Update `development-progress.md` with current task
- Review and update `project-context.json` if needed
- Document any new decisions in appropriate context files
- Create feature-specific context if implementing a new feature

## 3. Implementation Planning

Create a detailed, step-by-step plan:

```
## Implementation Plan for [Task Name]

1. [Specific step 1]
   - [Sub-step 1.1]
   - [Sub-step 1.2]
2. [Specific step 2]
   - [Sub-step 2.1]
   - [Sub-step 2.2]
3. [Specific step 3]
...

## Integration Points
- [How this connects to component/feature X]
- [How this interacts with store Y]

## Testing Plan
- [How this will be tested]
- [Specific test cases]
```

## 4. Rule Validation

Verify the plan against:

- ZenTask Component Rules
- ZenTask State Rules
- ZenTask Architecture Rules
- ZenTask Coding Standards
- Any feature-specific guidelines

## 5. Implementation

- Follow plan step-by-step
- Update documentation as implementation progresses
- Document any deviations from the plan
- Create required tests as specified

## 6. Quality Validation

Use implementation checklists to verify:

- Code meets ZenTask standards
- Components follow proper patterns
- State management follows guidelines
- Testing is comprehensive
- Documentation is complete

## Enforcement Mechanisms

To ensure AI agents always follow this sequence:

1. **Stop Statement**: If you find yourself implementing without completing steps 1-4, STOP IMMEDIATELY
2. **Context Check**: Before any code writing, verify context assessment is complete
3. **Plan Verification**: Verify a detailed plan exists before implementation
4. **Implementation Checklist**: Use checklists to verify quality after implementation

## When Updating Context

When updating context documents:

1. Ensure all current project state is reflected accurately
2. Document all implementation decisions and their rationale
3. Update development progress to reflect current state
4. Ensure all feature context files are consistent

Context must be treated as a living document that's continually maintained throughout development. 