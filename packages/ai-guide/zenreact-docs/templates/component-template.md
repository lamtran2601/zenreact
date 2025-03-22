# React Component Template

This template provides the standard structure for creating React components in the ZenReact framework. Follow this pattern to ensure consistency across the codebase.

## Component Structure

Every component should follow this file structure and organization:

```typescript
// 1. Imports
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// 2. Import components and hooks
import { Button } from '@/components/ui/Button';
import { useComponentSpecificHook } from './useComponentSpecificHook';

// 3. Type definitions
interface ComponentProps {
  /** Description of the prop */
  requiredProp: string;
  /** Description of the optional prop */
  optionalProp?: number;
  /** Description of the callback */
  onSomething?: (value: string) => void;
  /** Description of the children */
  children?: React.ReactNode;
}

// 4. Type definitions for internal state (if needed)
interface ComponentState {
  isOpen: boolean;
  selectedItem: string | null;
}

// 5. Component definition
export const Component: React.FC<ComponentProps> = ({
  requiredProp,
  optionalProp = 0, // Default values for optional props
  onSomething,
  children
}) => {
  // 6. Hooks
  const { t } = useTranslation();
  const { componentSpecificData } = useComponentSpecificHook();
  
  // 7. State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // 8. Memoized values
  const processedData = useMemo(() => {
    // Process data in a memoized way
    return requiredProp.toUpperCase();
  }, [requiredProp]);
  
  // 9. Callback functions
  const handleClick = useCallback(() => {
    setIsOpen(prev => !prev);
    if (onSomething) {
      onSomething(requiredProp);
    }
  }, [requiredProp, onSomething]);
  
  // 10. Effects
  useEffect(() => {
    // Side effect logic
    const cleanup = () => {
      // Cleanup logic
    };
    
    return cleanup;
  }, [requiredProp, optionalProp]);
  
  // 11. Conditional rendering helpers
  const renderContent = () => {
    if (!componentSpecificData) {
      return <div>{t('common.loading')}</div>;
    }
    
    return (
      <div>
        {componentSpecificData.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  };
  
  // 12. Main render
  return (
    <StyledComponent>
      <h2>{processedData}</h2>
      <Button onClick={handleClick}>
        {t('component.action.toggle')}
      </Button>
      <ContentContainer isOpen={isOpen}>
        {renderContent()}
        {children}
      </ContentContainer>
    </StyledComponent>
  );
};

// 13. Styled components
const StyledComponent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

interface ContentContainerProps {
  isOpen: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// 14. Default export
export default Component;
```

## Component Types

### 1. UI Components

Basic, reusable UI components should:
- Be function components with TypeScript interfaces
- Use styled-components for styling
- Accept children and event handlers
- Be highly reusable
- Not contain business logic
- Be placed in `src/components/ui/`

Example: `Button`, `Input`, `Card`, `Modal`

### 2. Layout Components

Components that define page structure should:
- Focus on arrangement and positioning
- Use CSS Grid or Flexbox via styled-components
- Accept children and composition elements
- Be placed in `src/components/layout/`

Example: `Container`, `Grid`, `Column`, `Section`

### 3. Feature Components

Components specific to a feature should:
- Contain feature-specific business logic
- Connect to state management
- Compose UI components together
- Be placed in `src/features/[feature-name]/components/`

Example: `UserDashboard`, `ProductList`, `CheckoutForm`

### 4. Page Components

Components that represent entire pages should:
- Compose feature components together
- Handle page-level state and effects
- Connect to routing
- Be placed in `src/pages/`

Example: `HomePage`, `ProductDetailPage`, `UserProfilePage`

### 5. Compound Components

For complex component sets that work together:

```typescript
// Example of compound component pattern
import React, { createContext, useContext, useState } from 'react';

// Create a context
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// Parent component
interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultTab = '', children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabContext.Provider>
  );
};

// Child component
interface TabProps {
  tabId: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ tabId, children }) => {
  const context = useContext(TabContext);
  
  if (!context) {
    throw new Error('Tab must be used within Tabs');
  }
  
  const { activeTab, setActiveTab } = context;
  
  return (
    <div 
      className={`tab ${activeTab === tabId ? 'active' : ''}`}
      onClick={() => setActiveTab(tabId)}
    >
      {children}
    </div>
  );
};

// Usage component
export const TabPanel: React.FC<TabProps> = ({ tabId, children }) => {
  const context = useContext(TabContext);
  
  if (!context) {
    throw new Error('TabPanel must be used within Tabs');
  }
  
  const { activeTab } = context;
  
  if (activeTab !== tabId) {
    return null;
  }
  
  return <div className="tab-panel">{children}</div>;
};

// Export as a unit
export const TabsComponent = {
  Tabs,
  Tab,
  TabPanel
};
```

## Component Testing Template

Each component should have a corresponding test file:

```typescript
// Component.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'; // Import test i18n instance
import { theme } from '@/styles/theme';
import Component from './Component';

// Mock any hooks or dependencies
jest.mock('./useComponentSpecificHook', () => ({
  useComponentSpecificHook: () => ({
    componentSpecificData: [
      { id: '1', name: 'Test Item 1' },
      { id: '2', name: 'Test Item 2' }
    ]
  })
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </I18nextProvider>
  );
};

describe('Component', () => {
  it('renders correctly with required props', () => {
    renderWithProviders(<Component requiredProp="test" />);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
  
  it('calls onSomething when button is clicked', () => {
    const onSomethingMock = jest.fn();
    renderWithProviders(
      <Component requiredProp="test" onSomething={onSomethingMock} />
    );
    
    fireEvent.click(screen.getByText('component.action.toggle'));
    expect(onSomethingMock).toHaveBeenCalledWith('test');
  });
  
  it('toggles content visibility when button is clicked', () => {
    renderWithProviders(<Component requiredProp="test" />);
    
    // Content should be hidden initially
    expect(screen.queryByText('Test Item 1')).not.toBeVisible();
    
    // Click the button to show content
    fireEvent.click(screen.getByText('component.action.toggle'));
    
    // Content should be visible now
    expect(screen.getByText('Test Item 1')).toBeVisible();
  });
});
```

## Component Documentation Guidelines

Add JSDoc comments to:
- The component interface
- Each prop
- Complex functions
- Non-obvious state variables

Example:

```typescript
/**
 * A select dropdown that allows single or multiple selection
 * 
 * @example
 * <Select
 *   options={[{ value: '1', label: 'Option 1' }]}
 *   value="1"
 *   onChange={handleChange}
 *   isMulti={false}
 * />
 */
interface SelectProps {
  /** Array of options for the select dropdown */
  options: Option[];
  /** Currently selected value(s) */
  value: string | string[];
  /** Called when selection changes */
  onChange: (value: string | string[]) => void;
  /** Whether multiple selections are allowed */
  isMulti?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
}
```

## Component Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Limit component size**: If a component file exceeds 200 lines, consider splitting it
3. **Minimize props**: Group related props into objects
4. **Use destructuring**: Destructure props and state for clarity
5. **Implement React.memo for pure components**: Prevent unnecessary re-renders
6. **Use composition over configuration**: Prefer children over complex props
7. **Handle all error and loading states**: Never assume happy path
8. **Implement accessibility**: Ensure ARIA attributes and keyboard navigation
9. **Avoid inline styles**: Use styled-components or theme values
10. **Write tests**: Test rendering, interactions, and edge cases 