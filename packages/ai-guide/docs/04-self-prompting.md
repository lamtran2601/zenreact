# Self-Prompting for Autonomous AI Agents

## Overview

Self-prompting is the ability of AI agents to generate effective prompts for themselves to guide their own problem-solving process. This document outlines techniques, patterns, and best practices for autonomous AI agents to craft prompts that help them navigate complex software development tasks.

## Core Principles

### 1. Task-Specific Prompting

Agents should tailor prompts to the specific task at hand:

- Generate different prompt structures for different activities (planning, coding, debugging)
- Include relevant context and constraints
- Focus prompts on specific, immediate objectives
- Adapt prompt complexity to match task complexity

### 2. Progressive Refinement

Self-prompting should follow an iterative approach:

- Start with broad, exploratory prompts
- Analyze responses for quality and relevance
- Refine prompts to address gaps or misunderstandings
- Progressively narrow focus as understanding improves

### 3. Meta-Cognitive Awareness

Agents should maintain awareness of their own capabilities and limitations:

- Recognize when current prompting approach is ineffective
- Identify knowledge gaps requiring additional information
- Adapt prompting strategy based on success patterns
- Maintain memory of effective prompting patterns for similar tasks

## Prompt Engineering Patterns

### Context-Setting Pattern

```
Background: [Relevant project information]
Current System State: [Description of the current code/system]
Objective: [Specific goal to accomplish]
Constraints: [Technical or business limitations]
Available Resources: [Tools, libraries, or knowledge available]
```

### Problem-Solving Pattern

```
Problem Statement: [Clear description of the issue]
Relevant Information:
- [Key fact 1]
- [Key fact 2]
Expected Outcome: [Description of desired solution]
Evaluation Criteria: [How to judge success]
Step-by-Step Approach:
1. [Step 1]
2. [Step 2]
```

### Code Generation Pattern

```
Task: [Description of code to generate]
Language: [Programming language]
Framework: [Any specific frameworks]
Input: [Description of inputs]
Output: [Description of expected outputs]
Error Handling: [How errors should be handled]
Performance Considerations: [Any performance requirements]
Example Usage: [How the code will be used]
```

### Debugging Pattern

```
Issue Description: [Observed problem]
Expected Behavior: [What should happen]
Actual Behavior: [What's actually happening]
Relevant Code:
```
[Snippet of problematic code]
```
Error Messages: [Any error output]
Reproduction Steps:
1. [Step 1]
2. [Step 2]
Attempted Solutions:
- [Solution 1]: [Result]
- [Solution 2]: [Result]
```

## Prompting Techniques

### Chain of Thought Prompting

Guide the agent's reasoning process step by step:

```
To solve this problem, I need to:
1. Understand the requirements by [approach]
2. Identify the key components that need to be implemented
3. For each component, determine:
   a. Its purpose
   b. Its interfaces
   c. Its internal design
4. Plan the implementation sequence
5. Implement each component
6. Test the implementation
```

### Role-Based Prompting

Adopt different perspectives to approach the problem:

```
As a system architect, I would approach this by...
As a security expert, I would consider...
As a performance engineer, I would optimize...
As a user experience designer, I would ensure...
As a quality assurance tester, I would verify...
```

### Constraint-Oriented Prompting

Focus on working within specific constraints:

```
Design a solution that:
- Operates within [memory/CPU/network] constraints
- Meets security requirements including [requirements]
- Can scale to handle [metric] without degradation
- Maintains compliance with [standards]
- Can be implemented within [timeframe]
```

## Best Practices

- **Explicit Objectives**: Clearly state what needs to be accomplished
- **Contextual Relevance**: Include only information relevant to the current task
- **Precision**: Use specific, unambiguous language
- **Structure**: Organize prompts logically to guide thinking
- **Reflection**: Include prompts for evaluating output quality
- **Alternative Perspectives**: Consider multiple approaches in prompts
- **Knowledge Boundaries**: Acknowledge limitations in understanding

## Templates

### Task Analysis Prompt Template

```
Task Analysis:
- What is the core problem to solve? [Answer]
- What domain knowledge is required? [Answer]
- What are the key constraints? [Answer]
- What are potential solution approaches? [Answer]
- What are the evaluation criteria? [Answer]
- What risks need to be mitigated? [Answer]
- What dependencies exist? [Answer]
```

### Implementation Planning Prompt Template

```
Implementation Planning:
- What components need to be created? [Answer]
- What existing code can be leveraged? [Answer]
- What is the appropriate implementation order? [Answer]
- What interfaces need to be defined? [Answer]
- How will the components interact? [Answer]
- What testing approach is appropriate? [Answer]
- How will success be measured? [Answer]
```

### Self-Review Prompt Template

```
Implementation Review:
- Does the solution meet all requirements? [Answer]
- Are there any edge cases not handled? [Answer]
- Is the code maintainable and well-structured? [Answer]
- Are there performance concerns? [Answer]
- Are there security vulnerabilities? [Answer]
- Is the solution adequately tested? [Answer]
- What improvements could be made? [Answer]
```

## Anti-Patterns to Avoid

- **Vague Prompting**: Imprecise language leading to unfocused responses
- **Overloaded Prompts**: Including too much information in a single prompt
- **Biased Prompting**: Directing toward predetermined solutions
- **Inconsistent Terminology**: Using different terms for the same concepts
- **Missing Context**: Omitting critical information needed for task completion
- **Prompt Sprawl**: Lack of focus leading to tangential exploration
- **Binary Thinking**: Failing to consider a spectrum of approaches

## Advanced Techniques

### Meta-Prompting

Use prompts to improve future prompts:

```
Analyze the effectiveness of my previous prompt:
- What aspects of the prompt were effective?
- What aspects could be improved?
- How should I modify my prompting strategy for similar tasks?
- Generate a more effective prompt template for this type of task.
```

### Multi-Stage Prompting

Break complex tasks into sequential prompting stages:

```
Stage 1: Problem Exploration
[Exploratory prompt to understand the problem space]

Stage 2: Solution Brainstorming
[Creative prompt to generate multiple approaches]

Stage 3: Solution Analysis
[Analytical prompt to evaluate approach trade-offs]

Stage 4: Implementation Planning
[Structured prompt to plan the implementation]

Stage 5: Implementation
[Detailed prompt for code generation]

Stage 6: Verification
[Testing prompt to validate the solution]
``` 