# Component Rules

This document outlines specific rules and best practices for creating React components in the ZenReact framework. Following these guidelines ensures components are consistent, maintainable, and optimized for both developer and AI collaboration.

## Component Classification

All components in ZenReact applications should be classified into one of these categories:

### 1. UI Components

UI components are the building blocks of the interface and should be highly reusable.

**Rules:**
- Must be pure presentational components with no business logic
- Should accept data and callbacks as props
- Must not directly connect to stores or context (except UI context for theme)
- Should be composable and focused on a single responsibility
- Must include comprehensive prop validation
- Must be fully tested in isolation

**Examples:** Button, Card, Modal, TextField, Dropdown

```typescript
// ✅ Good UI Component
function Button({
  variant = 'primary',
  size = 'medium',
  label,
  onClick,
  disabled = false,
  icon,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
```

### 2. Layout Components

Layout components are responsible for arranging UI components and managing the structure of the page.

**Rules:**
- Must focus solely on layout concerns (spacing, positioning, alignment)
- Should use CSS Grid or Flexbox for layout
- Must be responsive by default
- Should accept children or content sections as props
- Must not contain business logic
- Should implement appropriate semantic HTML structure

**Examples:** Grid, Container, Section, Sidebar, PageLayout

```typescript
// ✅ Good Layout Component
function TwoColumnLayout({
  sidebar,
  main,
  reversed = false,
}: TwoColumnLayoutProps): JSX.Element {
  return (
    <div className={`layout-two-column ${reversed ? 'reversed' : ''}`}>
      <aside className="sidebar-column">{sidebar}</aside>
      <main className="main-column">{main}</main>
    </div>
  );
}
```

### 3. Container Components

Container components connect presentation components to data sources and handle business logic.

**Rules:**
- Must separate business logic from presentation
- Should fetch and manage data from stores or context
- Must handle loading, error, and success states
- Should pass data down to presentation components as props
- Must handle all side effects (API calls, subscriptions)
- Should implement proper cleanup in useEffect hooks

**Examples:** UserProfileContainer, ProductListContainer, OrderFormContainer

```typescript
// ✅ Good Container Component
function UserProfileContainer({ userId }: { userId: string }): JSX.Element {
  const { data: user, isLoading, error } = useUser(userId);
  const { updateUser } = useUserActions();
  
  const handleUpdateUser = async (updatedData: Partial<User>) => {
    try {
      await updateUser(userId, updatedData);
      // Handle success
    } catch (err) {
      // Handle error
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  
  if (!user) {
    return <EmptyState message="User not found" />;
  }
  
  return <UserProfile user={user} onUpdate={handleUpdateUser} />;
}
```

### 4. Page Components

Page components combine layout and container components to create complete pages.

**Rules:**
- Must correspond to a route in the application
- Should compose container and layout components (not UI components directly)
- Must handle page-level state and effects
- Should implement proper page titles and meta tags
- Must handle permissions and access control
- Should implement error boundaries for page-level error handling

**Examples:** UserProfilePage, ProductListPage, CheckoutPage

```typescript
// ✅ Good Page Component
function UserProfilePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { checkPermission } = usePermissions();
  const hasEditPermission = checkPermission('users.edit');
  
  useEffect(() => {
    document.title = `User Profile | ${APP_NAME}`;
    
    // Analytics tracking
    trackPageView('user_profile', { id });
  }, [id]);
  
  if (!id) {
    return <NotFoundPage />;
  }
  
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <PageLayout
        header={<PageHeader title="User Profile" />}
        sidebar={<UserNavSidebar />}
        main={
          <UserProfileContainer 
            userId={id} 
            editable={hasEditPermission} 
          />
        }
      />
    </ErrorBoundary>
  );
}
```

### 5. Compound Components

Compound components provide a flexible API for complex UI patterns using React.Context.

**Rules:**
- Must use React.Context to share state between components
- Should export multiple related components as a cohesive unit
- Must include a clear parent-child relationship
- Should handle their own internal state
- Must document the expected component structure
- Should include sensible defaults for typical usage

**Examples:** Tabs, Select, Menu, Form

```typescript
// ✅ Good Compound Component
const TabContext = createContext<TabContextValue | undefined>(undefined);

function Tabs({ children, defaultTab, onChange }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  }, [onChange]);
  
  const value = useMemo(() => ({
    activeTab,
    onTabChange: handleTabChange
  }), [activeTab, handleTabChange]);
  
  return (
    <TabContext.Provider value={value}>
      <div className="tabs-container">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="tabs-list" role="tablist">{children}</div>;
}

function Tab({ id, children }: TabProps): JSX.Element {
  const context = useContext(TabContext);
  
  if (!context) {
    throw new Error('Tab must be used within a Tabs component');
  }
  
  const { activeTab, onTabChange } = context;
  const isActive = activeTab === id;
  
  return (
    <button
      role="tab"
      id={`tab-${id}`}
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => onTabChange(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }: TabPanelProps): JSX.Element {
  const context = useContext(TabContext);
  
  if (!context) {
    throw new Error('TabPanel must be used within a Tabs component');
  }
  
  const { activeTab } = context;
  const isActive = activeTab === id;
  
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={!isActive}
      className="tab-panel"
    >
      {isActive && children}
    </div>
  );
}

// Export as a unit
export { Tabs, TabList, Tab, TabPanels, TabPanel };

// Usage:
// <Tabs defaultTab="tab1" onChange={handleTabChange}>
//   <TabList>
//     <Tab id="tab1">First Tab</Tab>
//     <Tab id="tab2">Second Tab</Tab>
//   </TabList>
//   <TabPanels>
//     <TabPanel id="tab1">Content for first tab</TabPanel>
//     <TabPanel id="tab2">Content for second tab</TabPanel>
//   </TabPanels>
// </Tabs>
```

## Component Structure

All components must follow these structural rules:

### 1. File Organization

- Each component must be in its own file named according to the component
- Complex components may be organized in a directory with an index.ts file
- Test files must be co-located with the components they test
- Styles should be co-located with components (using CSS modules or styled components)

```
Button/
├── Button.tsx       # Component implementation
├── Button.test.tsx  # Component tests
├── Button.styles.ts # Styled components
└── index.ts         # Re-export for easier imports
```

### 2. Component Declaration

- Use function declarations for components, not arrow functions
- Export components as named exports, not default exports
- Include JSDoc comments for all component props and the component itself

```typescript
// ✅ Good
/**
 * Primary button component with multiple variants
 */
export function Button({ variant, label }: ButtonProps): JSX.Element {
  // Implementation
}

// ❌ Bad
const Button = ({ variant, label }) => {
  // Implementation
};

export default Button;
```

### 3. Props Structure

- Use TypeScript interfaces for prop definitions
- Place prop interface directly above the component
- Use destructuring in the function parameter
- Provide default values for optional props
- Group related props into sub-objects for complex components

```typescript
// ✅ Good
interface ButtonProps {
  /** The visual style of the button */
  variant: 'primary' | 'secondary' | 'tertiary';
  /** Text content of the button */
  label: string;
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick: () => void;
}

export function Button({
  variant,
  label,
  icon,
  disabled = false,
  onClick,
}: ButtonProps): JSX.Element {
  // Implementation
}
```

### 4. Internal Structure

Components should organize their code in the following order:

1. Interface/Type definitions
2. Component function declaration
3. Hooks (useState, useRef, etc.)
4. Derived state calculations
5. Event handlers and other functions
6. Effect hooks
7. Render logic with return statement

```typescript
// ✅ Good Structure
interface CounterProps {
  initialCount?: number;
  step?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function Counter({
  initialCount = 0,
  step = 1,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
}: CounterProps): JSX.Element {
  // 1. Hooks
  const [count, setCount] = useState(initialCount);
  
  // 2. Derived state
  const isAtMax = count >= max;
  
  // 3. Event handlers
  const increment = () => {
    if (!isAtMax) {
      const newCount = Math.min(count + step, max);
      setCount(newCount);
      onChange?.(newCount);
    }
  };
  
  const decrement = () => {
    const newCount = Math.max(count - step, 0);
    setCount(newCount);
    onChange?.(newCount);
  };
  
  const reset = () => {
    setCount(initialCount);
    onChange?.(initialCount);
  };
  
  // 4. Effects
  useEffect(() => {
    // Log count changes
    console.log(`Count changed to ${count}`);
  }, [count]);
  
  // 5. Render
  return (
    <div className="counter">
      <p>Count: {count}</p>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment} disabled={isAtMax}>+</button>
      </div>
    </div>
  );
}
```

## Performance Guidelines

All components must follow these performance guidelines:

### 1. Memoization

- Use `React.memo()` for pure components that render frequently
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers passed as props
- Avoid premature optimization - only memoize when necessary

```typescript
// ✅ Good
export const UserItem = React.memo(function UserItem({
  user,
  onSelect,
}: UserItemProps): JSX.Element {
  return (
    <li onClick={() => onSelect(user.id)}>
      <Avatar src={user.avatar} />
      <span>{user.name}</span>
    </li>
  );
});

function UserList({ users }: { users: User[] }): JSX.Element {
  // Memoize sorted users
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);
  
  // Memoize selection handler
  const handleSelect = useCallback((userId: string) => {
    console.log(`Selected user: ${userId}`);
  }, []);
  
  return (
    <ul>
      {sortedUsers.map(user => (
        <UserItem key={user.id} user={user} onSelect={handleSelect} />
      ))}
    </ul>
  );
}
```

### 2. Rendering Optimization

- Keep component trees shallow when possible
- Use virtualization for long lists (react-window or react-virtualized)
- Avoid anonymous function creation in render methods
- Prevent unnecessary re-renders with proper dependency arrays

```typescript
// ✅ Good - Virtualized list
import { FixedSizeList } from 'react-window';

function VirtualizedUserList({ users }: { users: User[] }): JSX.Element {
  const itemSize = 50; // Height of each item in pixels
  
  const renderRow = useCallback(({ index, style }) => {
    const user = users[index];
    return (
      <div style={style} key={user.id}>
        <UserItem user={user} />
      </div>
    );
  }, [users]);
  
  return (
    <FixedSizeList
      height={400}
      width="100%"
      itemCount={users.length}
      itemSize={itemSize}
    >
      {renderRow}
    </FixedSizeList>
  );
}
```

### 3. State Management

- Keep state as local as possible
- Split complex state into smaller pieces
- Use `useReducer` for complex state logic
- Avoid storing derived state - calculate it during render

```typescript
// ✅ Good - State is split into logical pieces
function UserForm({ onSubmit }: { onSubmit: (user: User) => void }): JSX.Element {
  // Split into logical state pieces
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // Derived state - calculated during render
  const isValid = firstName.trim() !== '' && 
    lastName.trim() !== '' && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({
        firstName,
        lastName,
        email,
        fullName: `${firstName} ${lastName}`, // Derived value
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}
```

## Error Handling

All components must implement proper error handling:

### 1. Error Boundaries

- Wrap complex components with error boundaries
- Implement specialized error boundaries for different sections of the app
- Log errors to a monitoring service

```typescript
// ✅ Good - Component with error boundary
import { ErrorBoundary } from '../ErrorBoundary';

function DashboardPage(): JSX.Element {
  return (
    <ErrorBoundary
      fallback={<DashboardErrorState />}
      onError={(error, info) => logError(error, info)}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}
```

### 2. Prop Validation

- Use TypeScript for static type checking
- Include runtime validation for critical props
- Provide meaningful error messages for invalid props

```typescript
// ✅ Good - Runtime validation for critical props
function CreditCardInput({ cardNumber, onChange }: CreditCardInputProps): JSX.Element {
  // Validate cardNumber format
  useEffect(() => {
    if (cardNumber && !/^[0-9]{13,19}$/.test(cardNumber.replace(/\s/g, ''))) {
      console.warn('Invalid card number format provided to CreditCardInput');
    }
  }, [cardNumber]);
  
  // Component implementation
}
```

### 3. Fallback States

- Always handle loading, error, and empty states
- Provide fallback UI for missing or invalid data
- Include retry mechanisms for failed operations

```typescript
// ✅ Good - Handling all states
function UserProfile({ userId }: { userId: string }): JSX.Element {
  const { data, error, isLoading, refetch } = useUser(userId);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <ErrorState 
        message="Failed to load user profile" 
        onRetry={() => refetch()} 
      />
    );
  }
  
  if (!data) {
    return <EmptyState message="User not found" />;
  }
  
  return (
    <div className="user-profile">
      {/* Render user profile */}
    </div>
  );
}
```

## Accessibility Guidelines

All components must follow these accessibility guidelines:

### 1. Semantic HTML

- Use semantic HTML elements (`button`, `nav`, `article`, etc.)
- Follow proper heading hierarchy (h1-h6)
- Implement appropriate ARIA attributes when semantic HTML is insufficient
- Ensure keyboard navigability for all interactive elements

```typescript
// ✅ Good - Semantic accordion component
function Accordion({ items }: { items: AccordionItem[] }): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headingId = `accordion-heading-${index}`;
        const panelId = `accordion-panel-${index}`;
        
        return (
          <div key={index} className="accordion-item">
            <h3>
              <button
                id={headingId}
                className="accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.title}
                <span className="accordion-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className="accordion-panel"
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### 2. Focus Management

- Manage focus for dynamic content
- Trap focus in modals and other overlays
- Provide visible focus indicators
- Support keyboard shortcuts where appropriate

```typescript
// ✅ Good - Modal with focus management
function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store the previously focused element
      const previousFocus = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current.focus();
      
      // Return focus when modal closes
      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);
  
  // Close on ESC key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

## Testing Requirements

All components must meet these testing requirements:

### 1. Test Coverage

- All UI components must have 90%+ code coverage
- Test all component states (loading, error, empty, success)
- Test user interactions and event handlers
- Test accessibility features

```typescript
// ✅ Good Test Suite for a Button Component
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with required props', () => {
    render(<Button variant="primary" label="Click me" onClick={() => {}} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });
  
  it('applies different variants correctly', () => {
    const { rerender } = render(
      <Button variant="primary" label="Primary" onClick={() => {}} />
    );
    
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary" label="Secondary" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button 
        variant="primary" 
        label="Click me" 
        onClick={handleClick}
        disabled 
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('renders with an icon when provided', () => {
    render(
      <Button 
        variant="primary" 
        label="Click me" 
        onClick={() => {}}
        icon={<span data-testid="test-icon">★</span>} 
      />
    );
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
  
  it('is accessible via keyboard', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    button.focus();
    expect(document.activeElement).toBe(button);
    
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Visual Regression Testing

- Implement snapshot or visual regression tests for UI components
- Test across different themes and states
- Include responsive behavior tests

```typescript
// ✅ Good - Visual Regression Testing
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Button.stories';

// Import all stories as composed components
const { Primary, Secondary, Disabled, WithIcon } = composeStories(stories);

describe('Button Visual Regression', () => {
  it('matches primary button snapshot', () => {
    const { container } = render(<Primary />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches secondary button snapshot', () => {
    const { container } = render(<Secondary />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches disabled button snapshot', () => {
    const { container } = render(<Disabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches button with icon snapshot', () => {
    const { container } = render(<WithIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Documentation Requirements

All components must meet these documentation requirements:

### 1. Component Documentation

- Include JSDoc comments for the component and props
- Document all props including types, defaults, and descriptions
- Provide examples of typical usage
- Document accessibility features

```typescript
/**
 * Pagination component for navigating through multi-page content.
 * 
 * Accessibility:
 * - Uses proper ARIA attributes for pagination controls
 * - Supports keyboard navigation
 * - Announces page changes to screen readers
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(`Page changed to ${page}`)}
 * />
 * ```
 */
interface PaginationProps {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Maximum number of visible page buttons */
  maxVisible?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Whether the pagination is disabled */
  disabled?: boolean;
}
```

### 2. Storybook Stories

- Create Storybook stories for all UI components
- Include stories for different states and variants
- Document props in the stories
- Include accessibility checks in stories

```typescript
// ✅ Good - Comprehensive Storybook stories
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'tertiary'] },
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  label: 'Secondary Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: 'tertiary',
  label: 'Tertiary Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  variant: 'primary',
  label: 'Small Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  variant: 'primary',
  label: 'Disabled Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  label: 'Button with Icon',
  icon: '★',
};
```

## AI Collaboration

Follow these rules when working with AI to develop components:

### 1. Component Specifications

When asking AI to create a component, provide:

- Component purpose and classification
- Required props and behavior
- Design system constraints
- Accessibility requirements
- Integration points with other components

```
// ✅ Good component specification for AI
"Create a Tooltip component with the following specifications:

Classification: UI Component

Props:
- content: ReactNode (the tooltip text/content)
- position: 'top' | 'right' | 'bottom' | 'left' (default: 'top')
- children: ReactNode (the element that triggers the tooltip)
- delay?: number (delay before showing in ms, default: 300)
- maxWidth?: number (maximum width in pixels, default: 200)

Behavior:
- Show tooltip on hover or focus of children
- Position tooltip according to the position prop
- Handle overflow and positioning near screen edges
- Support keyboard accessibility (focus triggers tooltip)
- Prevent tooltip from being cut off by viewport

Design constraints:
- Follow our design system's color palette (use ThemeContext)
- Use subtle animation for appearing/disappearing
- Support dark/light modes

Accessibility:
- Use aria-describedby to associate tooltip with triggering element
- Ensure keyboard navigability
- Proper focus management

Please provide the component implementation with TypeScript types, styles, and example usage."
```

### 2. Component Iteration

When refining a component with AI:

- Provide specific feedback about what needs improvement
- Reference existing patterns in the codebase
- Include any edge cases that need handling
- Share test results or visual issues

```
// ✅ Good iteration request for AI
"The Tooltip component looks good, but we need to make these improvements:

1. The positioning logic doesn't handle all edge cases - when the tooltip is near
   the right edge of the screen, it gets cut off instead of repositioning.

2. We need to add support for custom tooltip themes that extend our base theme.
   See how we implemented this in the Modal component (modal.tsx).

3. The animation is too abrupt - can we use a fade-in effect with a
   duration of 200ms?

4. We're missing a test case for when the tooltip content contains
   interactive elements like links.

5. Let's add the ability to manually control the tooltip visibility with
   an optional 'isOpen' prop and 'onOpenChange' callback."
```

### 3. Component Integration

When asking AI to help integrate a component:

- Explain how the component fits into the larger architecture
- Identify data sources and state management needs
- Specify any performance considerations
- Detail expected interaction with other components

```
// ✅ Good integration request for AI
"Let's integrate the UserAvatar component into our UserProfilePage.
The component should:

1. Get user data from the useUser hook (see hooks/use-user.ts)
2. Handle loading, error, and empty states
3. Connect to the PhotoUploadModal for avatar updates
4. Cache avatar images using our ImageCacheContext
5. Track avatar view/update events using the analytics hook

For performance, we should:
1. Memoize the component since it appears multiple times in the UI
2. Use proper dependency arrays in hooks
3. Implement load priority for visible avatars

Here's the existing code structure:
- User profile page: pages/user-profile.tsx
- Avatar component: components/user/avatar.tsx
- Upload modal: components/modals/photo-upload-modal.tsx"
```

## Component Checklist

Use this checklist to verify that a component meets all ZenReact standards:

- [ ] Component is classified correctly (UI, Layout, Container, Page, or Compound)
- [ ] Component follows file and code organization rules
- [ ] Props are properly typed with TypeScript interfaces
- [ ] Component includes comprehensive prop validation
- [ ] Internal logic is organized according to the recommended structure
- [ ] Performance optimizations are applied where necessary
- [ ] Error handling is implemented for all edge cases
- [ ] Accessibility features are properly implemented
- [ ] Component has 90%+ test coverage for all functionality
- [ ] Visual regression tests or snapshots are included
- [ ] Component is fully documented with JSDoc and examples
- [ ] Storybook stories demonstrate all component states and variants
- [ ] Component follows the project's design system
- [ ] All dependencies are properly declared in the dependency arrays
- [ ] The component cleans up any side effects properly

## Conclusion

Following these component rules ensures consistency, maintainability, and a high-quality user experience across ZenReact applications. These standards facilitate effective collaboration between developers and AI assistants by providing clear guidelines for component creation and organization. 