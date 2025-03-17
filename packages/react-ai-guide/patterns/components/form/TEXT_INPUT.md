# Text Input Component Pattern

## Overview

The Text Input component pattern provides a consistent, accessible, and flexible way to collect text input from users. This pattern supports various input types, validation states, and accessibility features to ensure form inputs are both user-friendly and functionally robust across your React application.

## Use Cases

- User login and registration forms
- Search fields
- Contact forms
- Profile information forms
- Settings and preferences
- Content creation interfaces
- Filtering and sorting controls
- Comment and feedback forms
- Address and payment information collection

## Structure

### Core Elements

1. **Container**: Wrapper for the entire input component
2. **Label**: Text describing the input field
3. **Input**: The actual input element
4. **Helper Text**: Optional descriptive text or instructions
5. **Error Message**: Validation feedback when input is invalid
6. **Icons**: Optional leading or trailing icons (e.g., search icon)
7. **Character Counter**: Optional indicator for text length limits

### Visual States

- **Default**: Normal appearance when rendered
- **Focus**: Visual indicator when the input has focus
- **Filled**: When the input contains a value
- **Error**: When the input value is invalid
- **Disabled**: When the input is not interactive
- **Read-only**: When the value can be read but not edited

## TypeScript Interface

```typescript
interface TextInputProps {
  /**
   * Unique identifier for the input
   */
  id: string;
  
  /**
   * The input type
   */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  
  /**
   * The input's current value
   */
  value: string;
  
  /**
   * Callback fired when input value changes
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Label text for the input
   */
  label: string;
  
  /**
   * Whether the label should be visually hidden but still accessible to screen readers
   */
  hideLabel?: boolean;
  
  /**
   * Placeholder text shown when input is empty
   */
  placeholder?: string;
  
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  
  /**
   * Error message shown when input is invalid
   */
  errorMessage?: string;
  
  /**
   * Whether the input has an error
   */
  hasError?: boolean;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Icon displayed at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon displayed at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Maximum character count
   */
  maxLength?: number;
  
  /**
   * Whether to show character count
   */
  showCharCount?: boolean;
  
  /**
   * Additional CSS class for the input container
   */
  className?: string;
  
  /**
   * Callback fired when input is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Callback fired when input is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Autocomplete attribute for the input
   */
  autoComplete?: string;
  
  /**
   * Input size variant
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Additional props to spread to the input element
   */
  [key: string]: any;
}
```

## Implementation Example

```tsx
import React, { useState, useRef, useEffect } from 'react';
import './TextInput.css';

interface TextInputProps {
  id: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  hasError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxLength?: number;
  showCharCount?: boolean;
  className?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  size?: 'small' | 'medium' | 'large';
  [key: string]: any;
}

export function TextInput({
  id,
  type = 'text',
  value,
  onChange,
  label,
  hideLabel = false,
  placeholder = '',
  helperText,
  errorMessage,
  hasError = false,
  disabled = false,
  readOnly = false,
  required = false,
  startIcon,
  endIcon,
  maxLength,
  showCharCount = false,
  className = '',
  onBlur,
  onFocus,
  autoComplete,
  size = 'medium',
  ...restProps
}: TextInputProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(value.length);
  
  // Update character count when value changes
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  
  // Combine all class names
  const containerClassName = `
    text-input
    text-input--${size}
    ${hasError ? 'text-input--error' : ''}
    ${disabled ? 'text-input--disabled' : ''}
    ${readOnly ? 'text-input--readonly' : ''}
    ${isFocused ? 'text-input--focused' : ''}
    ${value ? 'text-input--filled' : ''}
    ${startIcon ? 'text-input--has-start-icon' : ''}
    ${endIcon ? 'text-input--has-end-icon' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Generate a unique ID for the helper/error text
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  
  // Handle focus events
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  
  // Handle blur events
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };
  
  // Handle change events and enforce maxLength
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
    onChange(event);
  };

  return (
    <div className={containerClassName}>
      <label 
        htmlFor={id} 
        className={`text-input__label ${hideLabel ? 'visually-hidden' : ''}`}
      >
        {label}
        {required && <span className="text-input__required-indicator">*</span>}
      </label>
      
      <div className="text-input__wrapper">
        {startIcon && (
          <div className="text-input__icon text-input__icon--start">
            {startIcon}
          </div>
        )}
        
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-required={required}
          aria-describedby={
            (helperText && !hasError ? helperId : '') || 
            (hasError && errorMessage ? errorId : '')
          }
          className="text-input__input"
          maxLength={maxLength}
          {...restProps}
        />
        
        {endIcon && (
          <div className="text-input__icon text-input__icon--end">
            {endIcon}
          </div>
        )}
        
        {maxLength && showCharCount && (
          <div className="text-input__char-count">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      
      {helperText && !hasError && (
        <div id={helperId} className="text-input__helper-text">
          {helperText}
        </div>
      )}
      
      {hasError && errorMessage && (
        <div id={errorId} className="text-input__error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
```

## CSS Styling

```css
.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-family: inherit;
}

.text-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
}

.text-input__required-indicator {
  color: #d32f2f;
  margin-left: 0.25rem;
}

.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.text-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.text-input__input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: #333;
  background-color: #fff;
}

.text-input__input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
}

.text-input--error .text-input__input {
  border-color: #d32f2f;
}

.text-input--error .text-input__input:focus {
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.2);
}

.text-input--disabled .text-input__input {
  background-color: #f5f5f5;
  color: #767676;
  cursor: not-allowed;
  border-color: #d0d0d0;
}

.text-input--readonly .text-input__input {
  background-color: #f9f9f9;
  border-color: #d0d0d0;
}

.text-input__helper-text,
.text-input__error-message {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.text-input__helper-text {
  color: #666;
}

.text-input__error-message {
  color: #d32f2f;
}

.text-input__icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  pointer-events: none;
}

.text-input__icon--start {
  left: 0.75rem;
}

.text-input__icon--end {
  right: 0.75rem;
}

.text-input--has-start-icon .text-input__input {
  padding-left: 2.5rem;
}

.text-input--has-end-icon .text-input__input {
  padding-right: 2.5rem;
}

.text-input__char-count {
  position: absolute;
  right: 0.75rem;
  bottom: -1.5rem;
  font-size: 0.75rem;
  color: #666;
}

/* Size variants */
.text-input--small .text-input__input {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
}

.text-input--large .text-input__input {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

/* Focus visible for keyboard users */
.text-input__input:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 1px;
}
```

## Usage Example

### Basic Text Input

```tsx
import React, { useState } from 'react';
import { TextInput } from './TextInput';

export function BasicExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  
  return (
    <TextInput
      id="username"
      label="Username"
      value={value}
      onChange={handleChange}
      placeholder="Enter your username"
      helperText="Choose a username between 3-20 characters"
      required
    />
  );
}
```

### Input with Validation

```tsx
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { validateEmail } from '../utils/validation';

export function ValidationExample() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmail(newValue);
    
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleBlur = () => {
    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address');
    }
  };
  
  return (
    <TextInput
      id="email"
      type="email"
      label="Email Address"
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="name@example.com"
      hasError={!!error}
      errorMessage={error}
      required
      autoComplete="email"
    />
  );
}
```

### Input with Icons

```tsx
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { SearchIcon, ClearIcon } from './icons';

export function SearchInputExample() {
  const [search, setSearch] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  
  const handleClear = () => {
    setSearch('');
  };
  
  return (
    <TextInput
      id="search"
      type="search"
      label="Search"
      hideLabel
      value={search}
      onChange={handleChange}
      placeholder="Search products..."
      startIcon={<SearchIcon />}
      endIcon={
        search ? (
          <div onClick={handleClear} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
            <ClearIcon />
          </div>
        ) : null
      }
    />
  );
}
```

### Password Input with Visibility Toggle

```tsx
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { EyeIcon, EyeOffIcon } from './icons';

export function PasswordInputExample() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <TextInput
      id="password"
      type={showPassword ? 'text' : 'password'}
      label="Password"
      value={password}
      onChange={handleChange}
      placeholder="Enter your password"
      helperText="Password must be at least 8 characters"
      required
      autoComplete="current-password"
      endIcon={
        <div 
          onClick={togglePasswordVisibility} 
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          role="button"
          tabIndex={0}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      }
    />
  );
}
```

## Accessibility Considerations

1. **Proper Labeling**
   - Always include a visible label unless there's a strong UX reason not to
   - When using `hideLabel`, ensure the input purpose is clear from context
   - Use aria-label when there's no visible label

2. **Input Identification**
   - Connect labels to inputs using the `for`/`id` attributes
   - Use aria-describedby to link helper/error text to inputs
   - Include proper aria roles and states (aria-invalid, aria-required)

3. **Error States**
   - Clearly communicate errors using color, text, and ARIA attributes
   - Make error messages descriptive and actionable
   - Add aria-invalid="true" when an input has an error

4. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Maintain proper focus states for keyboard users
   - Ensure custom interactions (like password visibility) are keyboard accessible

5. **Visual Considerations**
   - Maintain 4.5:1 color contrast ratio for text/background
   - Ensure error states don't rely solely on color
   - Make focus states clearly visible
   - Size inputs appropriately (touch targets at least 44x44px)

6. **Screen Readers**
   - Test with screen readers to ensure all information is announced
   - Use aria-live for dynamic content changes
   - Ensure error messages are properly announced
   - Test character counters and validation messages

## Best Practices

1. **Input Labels**
   - Use clear, concise labels
   - Position labels above inputs for better responsiveness
   - Use sentence case for labels
   - End question labels with a question mark

2. **Placeholder Text**
   - Use placeholders to provide examples, not as labels
   - Keep placeholder text concise
   - Ensure sufficient contrast with the background
   - Don't rely on placeholders for critical information

3. **Validation**
   - Validate on blur or form submission, not on every keystroke
   - Show validation errors inline near the relevant field
   - Provide clear, actionable error messages
   - Consider real-time validation for fields like passwords

4. **Field Organization**
   - Group related fields together
   - Maintain consistent spacing between fields
   - Use logical tab order
   - Consider field dependencies in the layout

5. **Input Types**
   - Use appropriate HTML input types (email, tel, etc.)
   - Add appropriate autocomplete attributes
   - Set proper inputmode for mobile keyboards
   - Use type="number" only for true numeric inputs, not identifiers

6. **Performance**
   - Memoize event handlers with useCallback
   - Consider debouncing for onChange handlers
   - Lazy load complex icon components
   - Use controlled components consistently

## Common Pitfalls

1. **Accessibility Issues**
   - Missing labels or improper label connections
   - Poor color contrast
   - Relying solely on color for error states
   - Inaccessible error messages
   - Keyboard traps with custom interactions

2. **UX Problems**
   - Validating too early (on every keystroke)
   - Unclear error messages
   - Inconsistent field layouts
   - Poor mobile experience
   - Unclear required vs. optional fields

3. **Implementation Errors**
   - Missing controlled component pattern
   - Not handling form submission properly
   - Missing or inconsistent validation
   - Forgetting to sanitize user input
   - Improper event bubbling with icons

4. **Design Inconsistencies**
   - Inconsistent spacing or sizing
   - Misaligned icons or text
   - Inconsistent focus states
   - Varying field widths without reason
   - Inconsistent error presentation

## Related Patterns

- **Form Pattern**: Text inputs are typically used within a form container
- **Select Input Pattern**: Similar pattern for dropdown selection fields
- **Checkbox Pattern**: For boolean or multiple selection inputs
- **Radio Button Pattern**: For single selection from multiple options
- **Form Validation Pattern**: For validating and submitting form data
- **Search Pattern**: Specialized text input pattern for search functionality
- **Textarea Pattern**: For multi-line text input

## References

- [WCAG 2.1 Success Criterion 3.3.2: Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [WCAG 2.1 Success Criterion 3.3.1: Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html)
- [Material Design: Text Fields](https://material.io/components/text-fields)
- [Nielsen Norman Group: Form Design Guidelines](https://www.nngroup.com/articles/form-design/)
- [Smashing Magazine: Form Design Patterns Book](https://www.smashingmagazine.com/printed-books/form-design-patterns/)
- [Baymard Institute: Form Usability Research](https://baymard.com/research/checkout-usability) 