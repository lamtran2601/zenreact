# Complexity Assessment Rules

## Overview

This document defines patterns and rules for assessing task complexity in development projects. These guidelines ensure consistent evaluation of task difficulty, resource requirements, and implementation challenges.

## Table of Contents

1. [Complexity Factors](#complexity-factors)
2. [Assessment Framework](#assessment-framework)
3. [Complexity Levels](#complexity-levels)
4. [Estimation Patterns](#estimation-patterns)
5. [Resource Allocation](#resource-allocation)
6. [Best Practices](#best-practices)

## Complexity Factors

```yaml
complexity_factors:
  technical:
    - Implementation difficulty
    - Technical knowledge required
    - Algorithmic complexity
    - Performance considerations
    
  integration:
    - Number of dependencies
    - System coupling
    - Interface complexity
    - Cross-cutting concerns
    
  scope:
    - Feature breadth
    - Implementation depth
    - Edge cases
    - Configuration options
    
  quality:
    - Testing requirements
    - Documentation needs
    - Performance expectations
    - Security considerations
```

### Factor Weighting

```yaml
factor_weighting:
  calculation: |
    Weighted Complexity = Σ(Factor Weight × Factor Score)
    
  default_weights:
    technical: 0.35
    integration: 0.25
    scope: 0.20
    quality: 0.20
    
  adjustment:
    - Project-specific priorities may adjust weights
    - Critical path items may receive higher weights
    - Novel technology areas may increase technical weight
```

## Assessment Framework

### Complexity Scoring

```yaml
complexity_scoring:
  scale:
    - 1: Trivial - Simple, well-understood, minimal dependencies
    - 2: Easy - Straightforward, few dependencies, clear requirements
    - 3: Moderate - Some complexity, multiple dependencies, standard patterns
    - 4: Complex - Significant complexity, many dependencies, advanced patterns
    - 5: Very Complex - Highly complex, extensive dependencies, novel solutions
    
  dimensions:
    - Technical difficulty (1-5)
    - Integration complexity (1-5)
    - Scope breadth (1-5)
    - Quality requirements (1-5)
```

### Assessment Process

```yaml
assessment_process:
  steps: 1. Identify all complexity factors
    2. Score each dimension
    3. Apply appropriate weights
    4. Calculate weighted score
    5. Determine complexity level
    
  validation:
    - Peer review of assessment
    - Historical comparison
    - Expert validation
    - Iterative refinement
```

## Complexity Levels

### Level Definitions

```yaml
complexity_levels:
  trivial:
    score: 1.0 - 1.5
    characteristics:
      - Well-understood problem
      - No significant dependencies
      - Standard implementation
      - Minimal testing required
    examples:
      - Simple UI text changes
      - Basic configuration updates
      - Documentation improvements
      
  easy:
    score: 1.6 - 2.5
    characteristics:
      - Clear requirements
      - Few dependencies
      - Established patterns
      - Standard testing
    examples:
      - Simple component creation
      - Basic feature implementation
      - Standard API integration
      
  moderate:
    score: 2.6 - 3.5
    characteristics:
      - Some ambiguity
      - Multiple dependencies
      - Some novel elements
      - Comprehensive testing
    examples:
      - Complex component implementation
      - State management integration
      - Performance optimization
      
  complex:
    score: 3.6 - 4.5
    characteristics:
      - Significant ambiguity
      - Many dependencies
      - Advanced patterns
      - Extensive testing
    examples:
      - System architecture changes
      - Complex state management
      - Performance-critical features
      
  very_complex:
    score: 4.6 - 5.0
    characteristics:
      - High ambiguity
      - Extensive dependencies
      - Novel solutions required
      - Comprehensive validation
    examples:
      - Core architecture redesign
      - Complex algorithm implementation
      - System-wide optimization
```

### Level Indicators

```yaml
level_indicators:
  visual:
    trivial: 🟢
    easy: 🟢
    moderate: 🟡
    complex: 🟠
    very_complex: 🔴
    
  labeling:
    trivial: "T1"
    easy: "E2"
    moderate: "M3"
    complex: "C4"
    very_complex: "V5"
```

## Estimation Patterns

### Time Estimation

```yaml
time_estimation:
  baseline:
    trivial: 0.5 - 1 day
    easy: 1 - 3 days
    moderate: 3 - 7 days
    complex: 1 - 3 weeks
    very_complex: 3+ weeks
    
  adjustment_factors:
    - Developer experience
    - Familiarity with domain
    - Available documentation
    - Similar previous work
    - Technical debt
```

### Effort Calculation

```yaml
effort_calculation:
  formula: |
    Effort (person-days) = Base Estimate × Complexity Factor × Risk Factor
    
  complexity_factor:
    trivial: 1.0
    easy: 1.2
    moderate: 1.5
    complex: 2.0
    very_complex: 3.0
    
  risk_factor:
    low: 1.0
    medium: 1.3
    high: 1.8
```

## Resource Allocation

### Skill Requirements

```yaml
skill_requirements:
  levels:
    trivial: Junior developer
    easy: Junior/mid-level developer
    moderate: Mid-level developer
    complex: Senior developer
    very_complex: Senior/architect level
    
  considerations:
    - Domain knowledge
    - Technical expertise
    - Previous experience
    - System familiarity
```

### Team Composition

```yaml
team_composition:
  trivial:
    - Single developer
    - Minimal oversight
    
  easy:
    - Single developer
    - Standard review
    
  moderate:
    - Primary developer
    - Technical reviewer
    - QA support
    
  complex:
    - Lead developer
    - Supporting developers
    - Technical reviewers
    - QA team
    
  very_complex:
    - Technical lead
    - Development team
    - Architecture review
    - Specialized testing
    - Stakeholder involvement
```

## Best Practices

### Assessment Guidelines

```yaml
assessment_guidelines:
  principles:
    - Be consistent in scoring
    - Consider all dimensions
    - Use historical comparisons
    - Validate with peers
    - Refine over time
    
  pitfalls:
    - Underestimating dependencies
    - Overlooking quality requirements
    - Ignoring technical debt
    - Assuming perfect knowledge
    - Neglecting risk factors
```

### Continuous Improvement

```yaml
improvement_process:
  steps: 1. Track actual vs. estimated complexity
    2. Identify assessment gaps
    3. Refine scoring criteria
    4. Update estimation factors
    5. Document learnings
    
  metrics:
    - Estimation accuracy
    - Complexity distribution
    - Resource allocation efficiency
    - Project predictability
```

## Implementation Example

### Task Complexity Assessment

```markdown
# Task Complexity Assessment: User Authentication System

## Overview

Task: Implement OAuth2 authentication with role-based access control
Complexity Score: 4.2 (Complex)
Estimated Effort: 12 person-days

## Dimension Scores

| Dimension | Score | Justification |
|-----------|-------|---------------|
| Technical | 4 | Requires secure implementation of OAuth2 protocols |
| Integration | 5 | Integrates with multiple system components |
| Scope | 4 | Includes authentication, authorization, and user management |
| Quality | 4 | Requires extensive security testing and documentation |

## Resource Requirements

- Senior developer with security experience
- Security review
- Comprehensive testing plan
- Documentation for developers and users

## Risk Factors

- Security vulnerabilities (High)
- Integration complexity (Medium)
- Performance impact (Low)

## Implementation Plan

1. Research and design (3 days)
2. Core implementation (5 days)
3. Integration (2 days)
4. Testing and security review (2 days)
5. Documentation and deployment (1 day)
``` 