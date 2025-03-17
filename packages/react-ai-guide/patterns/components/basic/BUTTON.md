# Button Component Pattern

## Overview

The Button component pattern provides a consistent, accessible, and flexible way to implement button elements throughout a React application. This pattern supports various visual variants, sizes, states, and accessibility features to ensure buttons are both visually appealing and functionally robust.

## Use Cases

- Form submission buttons
- Action triggers in dialogs and modals
- Toggle controls for UI states
- Navigation controls
- Call-to-action elements
- In-line actions within lists or tables
- Toolbar buttons

## Structure

### Core Elements

1. **Container**: The button element itself
2. **Label**: Text content describing the action
3. **Icon** (optional): Visual indicator of the action
4. **Loading Indicator** (optional): Visual feedback during async operations
5. **Visual State Indicators**: Style changes for hover, focus, active, and disabled states

### Visual Hierarchy

- Primary buttons have the strongest visual weight
- Secondary buttons have moderate visual weight
- Tertiary/text buttons have minimal visual weight
- Icon-only buttons maintain sufficient tap/click targets
- Disabled states clearly indicate non-interactivity

## TypeScript Interface

```typescript
interface ButtonProps {
  /**
   * The content to display inside the button
   */
  children: React.ReactNode;
  
  /**
   * The visual variant of the button
   * - primary: High emphasis, main actions
   * - secondary: Medium emphasis, secondary actions
   * - outline: Low emphasis, secondary actions with reduced visual weight
   * - text: Minimal emphasis, tertiary actions
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Icon to display alongside the button text
   */
  icon?: React.ReactNode;
  
  /**
   * Position of the icon relative to the text
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Whether the button fills the width of its container
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is in a disabled state
   */
  disabled?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * The type of the button element
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Callback fired when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Additional CSS class to apply
   */
  className?: string;
  
  /**
   * Accessible label for icon-only buttons
   */
  ariaLabel?: string;
  
  /**
   * Additional props to spread to the button element
   */
  [key: string]: any;
}
```

## Implementation Example

### Basic Implementation

```tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  [key: string]: any;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ariaLabel,
  ...restProps
}: ButtonProps): React.ReactElement {
  // Combine the class names
  const buttonClassName = `
    button 
    button--${variant} 
    button--${size} 
    ${fullWidth ? 'button--full-width' : ''} 
    ${loading ? 'button--loading' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Determine if the button is icon-only
  const isIconOnly = icon && !children;
  
  // If the button is icon-only, it needs an aria-label
  if (isIconOnly && !ariaLabel) {
    console.warn('Icon-only buttons must have an ariaLabel prop for accessibility');
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={isIconOnly ? ariaLabel : undefined}
      aria-busy={loading}
      {...restProps}
    >
      {loading && (
        <span className="button__loading-indicator">
          <span className="button__loading-spinner" aria-hidden="true" />
        </span>
      )}
      
      {icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">
          {icon}
        </span>
      )}
      
      {children && (
        <span className="button__label">
          {children}
        </span>
      )}
      
      {icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">
          {icon}
        </span>
      )}
    </button>
  );
}
```

### CSS Styling

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
  user-select: none;
}

/* Variant styles */
.button--primary {
  background-color: #0066cc;
  color: white;
  border-color: #0066cc;
}

.button--primary:hover {
  background-color: #0052a3;
  border-color: #0052a3;
}

.button--primary:focus {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
}

.button--secondary {
  background-color: #f0f0f0;
  color: #333333;
  border-color: #e0e0e0;
}

.button--secondary:hover {
  background-color: #e0e0e0;
  border-color: #d0d0d0;
}

.button--secondary:focus {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.button--outline {
  background-color: transparent;
  color: #0066cc;
  border-color: #0066cc;
}

.button--outline:hover {
  background-color: rgba(0, 102, 204, 0.05);
}

.button--outline:focus {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
}

.button--text {
  background-color: transparent;
  color: #0066cc;
  border-color: transparent;
  padding-left: 8px;
  padding-right: 8px;
}

.button--text:hover {
  background-color: rgba(0, 102, 204, 0.05);
}

.button--text:focus {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
}

/* Size styles */
.button--small {
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  height: 2rem;
}

.button--medium {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
}

.button--large {
  font-size: 1.125rem;
  padding: 0.625rem 1.25rem;
  height: 3rem;
}

/* Full width */
.button--full-width {
  width: 100%;
}

/* Disabled state */
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
.button--loading {
  color: transparent !important;
}

.button--loading .button__label,
.button--loading .button__icon {
  visibility: hidden;
}

.button__loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__loading-spinner {
  width: 1.25em;
  height: 1.25em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: button-spinner 0.8s linear infinite;
}

@keyframes button-spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Icon positioning */
.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
  line-height: 0;
}

.button__icon--left {
  margin-right: 0.5em;
}

.button__icon--right {
  margin-left: 0.5em;
}

/* Icon-only buttons */
.button:not(.button--small):has(.button__icon:only-child) {
  padding: 0.5rem;
  aspect-ratio: 1/1;
}

.button--small:has(.button__icon:only-child) {
  padding: 0.375rem;
  aspect-ratio: 1/1;
}

/* Focus visible state */
.button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

## Usage Example

### Standard Button Variants

```tsx
import React from 'react';
import { Button } from './Button';
import { ArrowRight, Save, Trash } from './icons';

export function ButtonExamples() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="button-examples">
      <h2>Button Variants</h2>
      <div className="example-row">
        <Button variant="primary" onClick={handleClick}>
          Primary Button
        </Button>
        
        <Button variant="secondary" onClick={handleClick}>
          Secondary Button
        </Button>
        
        <Button variant="outline" onClick={handleClick}>
          Outline Button
        </Button>
        
        <Button variant="text" onClick={handleClick}>
          Text Button
        </Button>
      </div>

      <h2>Button Sizes</h2>
      <div className="example-row">
        <Button size="small">Small Button</Button>
        <Button size="medium">Medium Button</Button>
        <Button size="large">Large Button</Button>
      </div>

      <h2>Buttons with Icons</h2>
      <div className="example-row">
        <Button icon={<Save />}>Save</Button>
        <Button icon={<ArrowRight />} iconPosition="right">
          Continue
        </Button>
        <Button icon={<Trash />} variant="outline">
          Delete
        </Button>
        <Button icon={<ArrowRight />} ariaLabel="Next page" />
      </div>

      <h2>Button States</h2>
      <div className="example-row">
        <Button disabled>Disabled Button</Button>
        <Button loading>Loading Button</Button>
        <Button fullWidth>Full Width Button</Button>
      </div>
    </div>
  );
}
```

### Form Submit Button Example

```tsx
import React, { useState } from 'react';
import { Button } from './Button';
import { Send } from './icons';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Show success message, reset form, etc.
      alert('Form submitted successfully!');
    } catch (error) {
      // Handle error
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Form fields would go here */}
      <div className="form-actions">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button 
          type="submit"
          loading={loading}
          icon={<Send />}
          iconPosition="right"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
```

## Accessibility Considerations

1. **Keyboard Navigation**
   - Ensure buttons are focusable and activated with Enter or Space keys
   - Maintain focus visibility for keyboard users
   - Preserve tab order for logical navigation

2. **Screen Readers**
   - Use appropriate button type (button, submit, reset)
   - Provide aria-label for icon-only buttons
   - Use aria-busy for loading states
   - Ensure disabled buttons communicate their state

3. **Visual Design**
   - Maintain 4.5:1 color contrast ratio for text/background
   - Ensure focus states are clearly visible
   - Make disabled states distinguishable
   - Size buttons appropriately for touch targets (minimum 44x44px)

4. **Cognitive Considerations**
   - Use consistent button styling across the application
   - Make button actions clear from their labels
   - Provide appropriate feedback for actions
   - Group related buttons logically

## Best Practices

1. **Button Text**
   - Use clear, concise, action-oriented text
   - Start with verbs for action buttons
   - Avoid generic text like "Click Here"
   - Be specific about the action (e.g., "Save Changes" not just "Save")

2. **Visual Hierarchy**
   - Use primary buttons sparingly for main actions
   - Group related buttons together
   - Maintain consistent button styling
   - Establish clear visual priority (primary > secondary > tertiary)

3. **Loading States**
   - Disable the button during loading to prevent double-submissions
   - Provide visual feedback during loading
   - Preserve button width during loading state to prevent layout shifts
   - Restore focus appropriately after loading completes

4. **Implementation**
   - Avoid using `<div>` or other elements styled as buttons
   - Use proper button elements with appropriate type attributes
   - Separate presentation from functionality
   - Handle both mouse and keyboard interactions

5. **Performance**
   - Memoize complex icon components
   - Use CSS transitions for hover/focus effects instead of JavaScript
   - Prevent handler recreation with useCallback when appropriate
   - Optimize loading indicators for performance

## Common Pitfalls

1. **Accessibility Issues**
   - Missing labels for icon-only buttons
   - Insufficient color contrast
   - Non-interactive appearance in disabled state
   - Poor keyboard focus management

2. **UX Problems**
   - Inconsistent button styling causing user confusion
   - Unclear button purpose or action
   - Poor placement of buttons in the interface
   - Insufficient visual feedback for interactions

3. **Implementation Errors**
   - Using non-button elements without proper ARIA roles
   - Not preventing default form submission
   - Not disabling buttons during form submission
   - Inconsistent handling of click events

4. **Design Inconsistencies**
   - Inconsistent padding or sizing
   - Improper icon alignment or spacing
   - Inconsistent use of variants
   - Mixed button styles within the same context

## Related Patterns

- **Form Pattern**: Buttons are often used within forms for submission and cancellation
- **Card Pattern**: Action buttons often appear in card footers
- **Modal Pattern**: Buttons are used for confirming or dismissing modals
- **Toolbar Pattern**: Buttons are organized in toolbars for related actions
- **Icon Button Pattern**: Specialized variant for icon-only buttons
- **Loading Indicator Pattern**: Used within buttons during async operations

## References

- [WCAG 2.1 Success Criterion 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [Material Design: Buttons](https://material.io/components/buttons)
- [Inclusive Components: Button](https://inclusive-components.design/buttons-and-links/)
- [Smashing Magazine: Button Design Best Practices](https://www.smashingmagazine.com/2016/11/a-quick-guide-for-designing-better-buttons/)
- [Ant Design: Button Component](https://ant.design/components/button/) 