# UI Components Context

This document outlines the shared UI components used throughout the ZenTask application. These components provide consistent visual elements that adhere to our design system and accessibility standards.

## Button Component

### Purpose
Provides clickable button elements with consistent styling across the application.

### Usage
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Props
```typescript
interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
}
```

### Implementation Notes
- Uses DaisyUI button classes with customizations
- Displays a loading spinner when `isLoading` is true
- Properly handles disabled state
- Supports keyboard accessibility

## Card Component

### Purpose
Container component for grouping related content with consistent styling.

### Usage
```tsx
<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

### Props
```typescript
interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional card title */
  title?: string;
  /** Optional action buttons to display in header */
  actions?: React.ReactNode;
  /** Whether the card has a border */
  bordered?: boolean;
  /** Whether the card has a shadow */
  shadow?: boolean;
  /** Whether the card has padding */
  padded?: boolean;
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses DaisyUI card component
- Supports header with title and actions
- Configurable styling with borders and shadows

## Input Component

### Purpose
Text input field with consistent styling and behavior.

### Usage
```tsx
<Input
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
/>
```

### Props
```typescript
interface InputProps {
  /** Input label */
  label?: string;
  /** Input name */
  name: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Error message */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Additional class names */
  className?: string;
  /** Whether the input is required */
  required?: boolean;
}
```

### Implementation Notes
- Displays label, input, helper text, and error message
- Provides visual feedback for error states
- Supports disabled state
- Includes accessibility attributes

## Select Component

### Purpose
Dropdown selection component with consistent styling.

### Usage
```tsx
<Select
  label="Status"
  name="status"
  value={status}
  onChange={handleChange}
  options={[
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ]}
/>
```

### Props
```typescript
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  /** Select label */
  label?: string;
  /** Select name */
  name: string;
  /** Selected value */
  value: string;
  /** Options array */
  options: SelectOption[];
  /** Change handler */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Error message */
  error?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Additional class names */
  className?: string;
  /** Whether the select is required */
  required?: boolean;
}
```

### Implementation Notes
- Uses DaisyUI select component
- Supports placeholder option
- Provides visual feedback for error states
- Includes accessibility attributes

## Modal Component

### Purpose
Displays content in a modal dialog with overlay.

### Usage
```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirmation"
>
  <p>Are you sure you want to continue?</p>
  <div className="flex justify-end gap-2 mt-4">
    <Button variant="outline" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </div>
</Modal>
```

### Props
```typescript
interface ModalProps {
  /** Modal content */
  children: React.ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses DaisyUI modal component
- Traps focus within modal when open
- Closes on escape key or overlay click
- Provides smooth animations
- Ensures accessibility compliance

## Alert Component

### Purpose
Displays feedback messages to the user.

### Usage
```tsx
<Alert 
  type="success"
  title="Success!"
  message="Operation completed successfully."
  onClose={handleClose}
/>
```

### Props
```typescript
interface AlertProps {
  /** Alert type/severity */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Alert title */
  title?: string;
  /** Alert message */
  message: string;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses DaisyUI alert component
- Color-coded by alert type
- Optional dismiss button
- Role="alert" for accessibility

## Badge Component

### Purpose
Small status indicator component.

### Usage
```tsx
<Badge type="success">Completed</Badge>
```

### Props
```typescript
interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Badge type/color */
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses DaisyUI badge component
- Color-coded by badge type
- Different sizes for various contexts

## Skeleton Component

### Purpose
Loading placeholder component for content.

### Usage
```tsx
<Skeleton type="text" lines={3} />
```

### Props
```typescript
interface SkeletonProps {
  /** Skeleton type */
  type?: 'text' | 'circle' | 'rect' | 'card';
  /** Number of lines for text skeleton */
  lines?: number;
  /** Width for custom sizing */
  width?: string;
  /** Height for custom sizing */
  height?: string;
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses Tailwind classes for styling
- Pulse animation for loading state
- Support multiple shapes for different content types

## Shared Design Patterns

### Form Field Pattern
All form input components (Input, Select, Checkbox, etc.) follow a consistent pattern:
- Label above the input (with optional asterisk for required fields)
- Input with consistent height and padding
- Helper text below input
- Error message below helper text
- Consistent focus and hover states

### Spacing System
Components use a consistent spacing system based on Tailwind's spacing scale:
- Extra small (`gap-1`): 0.25rem
- Small (`gap-2`): 0.5rem
- Medium (`gap-4`): 1rem
- Large (`gap-6`): 1.5rem
- Extra large (`gap-8`): 2rem

### Color System
Components use the DaisyUI color system with our custom theme:
- Primary: Brand color for primary actions
- Secondary: Secondary actions
- Accent: Highlighting specific elements
- Neutral: Default text color
- Base: Background colors
- Info/Success/Warning/Error: Status colors 