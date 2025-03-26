# Context Template

This template provides the standard structure for creating and using React Context in the ZenReact framework. Context is used for providing shared state that doesn't require the global scope of a store but needs to be accessible by multiple components in a specific part of the component tree.

## Context Structure

Every context should follow this file structure and organization:

```typescript
// 1. Imports
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

// 2. Type definitions for context value
interface ThemeContextValue {
  // State
  theme: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    // ...other color tokens
  };
  
  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Utilities
  getContrastColor: (color: string) => string;
}

// 3. Create context with default values
// The default value is used when a component calls useContext without a provider
const defaultContextValue: ThemeContextValue = {
  theme: 'light',
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    text: '#333333',
  },
  toggleTheme: () => {
    // This will be replaced by the actual implementation
    console.warn('ThemeContext used without Provider');
  },
  setTheme: () => {
    console.warn('ThemeContext used without Provider');
  },
  getContrastColor: () => '#000000',
};

// 4. Create the context
const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

// 5. Provider props type
interface ThemeProviderProps {
  initialTheme?: 'light' | 'dark';
  children: ReactNode;
}

// 6. Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  initialTheme = 'light',
  children 
}) => {
  // 7. State
  const [theme, setThemeState] = useState<'light' | 'dark'>(initialTheme);
  
  // 8. Memoized derived values
  const colors = useMemo(() => {
    return theme === 'light' 
      ? {
          primary: '#3498db',
          secondary: '#2ecc71',
          background: '#ffffff',
          text: '#333333',
        }
      : {
          primary: '#2980b9',
          secondary: '#27ae60',
          background: '#1a1a1a',
          text: '#f5f5f5',
        };
  }, [theme]);
  
  // 9. Actions
  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);
  
  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  }, []);
  
  // 10. Utilities
  const getContrastColor = useCallback((color: string) => {
    // Simple contrast determination
    // In a real implementation, you would use a proper color contrast algorithm
    return color.startsWith('#f') || color.startsWith('#e') ? '#000000' : '#ffffff';
  }, []);
  
  // 11. Memoize the context value to prevent unnecessary renders
  const contextValue = useMemo<ThemeContextValue>(() => ({
    theme,
    colors,
    toggleTheme,
    setTheme,
    getContrastColor,
  }), [theme, colors, toggleTheme, setTheme, getContrastColor]);
  
  // 12. Return the provider with the memoized value
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 13. Custom hook for consuming the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// 14. Optional: Export the context for direct usage
export { ThemeContext };
```

## Context Templates by Type

### 1. UI Context

Use UI Context for theme, layout configurations, and UI state that affects multiple components:

```typescript
// contexts/UIContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface UIContextValue {
  isSidebarOpen: boolean;
  isMobileView: boolean;
  activeModal: string | null;
  
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setMobileView: (isMobile: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

const defaultUIContext: UIContextValue = {
  isSidebarOpen: true,
  isMobileView: false,
  activeModal: null,
  
  toggleSidebar: () => {},
  setSidebarOpen: () => {},
  setMobileView: () => {},
  openModal: () => {},
  closeModal: () => {},
};

const UIContext = createContext<UIContextValue>(defaultUIContext);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileView, setMobileView] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);
  
  const openModal = useCallback((modalId: string) => {
    setActiveModal(modalId);
  }, []);
  
  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);
  
  // Effect to detect mobile view
  React.useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const value = useMemo(() => ({
    isSidebarOpen,
    isMobileView,
    activeModal,
    toggleSidebar,
    setSidebarOpen,
    setMobileView,
    openModal,
    closeModal,
  }), [isSidebarOpen, isMobileView, activeModal, toggleSidebar, openModal, closeModal]);
  
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  
  return context;
};

export { UIContext };
```

### 2. Feature Context

Use Feature Context to share state within a specific feature:

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { User, AuthService } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;
}

const defaultAuthContext: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  clearError: () => {},
};

const AuthContext = createContext<AuthContextValue>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
  authService: AuthService;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children,
  authService
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize: check for existing session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        // Don't set error on initial load, just clear the user
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, [authService]);
  
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await authService.login(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);
  
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during logout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);
  
  const signup = useCallback(async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await authService.signup(email, password, name);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during signup');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    signup,
    clearError,
  }), [user, isLoading, error, login, logout, signup, clearError]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export { AuthContext };
```

### 3. Form Context

Use Form Context to manage form state within a form and its child components:

```typescript
// contexts/FormContext.tsx
import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';

// Define the form state type
interface FormState<T> {
  values: T;
  touched: Partial<Record<keyof T, boolean>>;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Define the form actions
type FormAction<T> =
  | { type: 'SET_VALUE'; field: keyof T; value: any }
  | { type: 'SET_TOUCHED'; field: keyof T; value: boolean }
  | { type: 'SET_ERROR'; field: keyof T; error: string | null }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'VALIDATE_FORM' };

// Define the form context value type
interface FormContextValue<T> {
  // State
  values: T;
  touched: Partial<Record<keyof T, boolean>>;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  
  // Actions
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: <K extends keyof T>(field: K, isTouched?: boolean) => void;
  setError: <K extends keyof T>(field: K, error: string | null) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  handleSubmit: (e?: React.FormEvent) => void;
}

// Create a factory function to create the form context
function createFormContext<T>() {
  // Create context with a default value
  const FormContext = createContext<FormContextValue<T> | undefined>(undefined);
  
  // Form reducer
  function formReducer(state: FormState<T>, action: FormAction<T>): FormState<T> {
    switch (action.type) {
      case 'SET_VALUE':
        return {
          ...state,
          values: {
            ...state.values,
            [action.field]: action.value
          }
        };
      case 'SET_TOUCHED':
        return {
          ...state,
          touched: {
            ...state.touched,
            [action.field]: action.value
          }
        };
      case 'SET_ERROR':
        const newErrors = { ...state.errors };
        if (action.error) {
          newErrors[action.field] = action.error;
        } else {
          delete newErrors[action.field];
        }
        return {
          ...state,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0
        };
      case 'SET_SUBMITTING':
        return {
          ...state,
          isSubmitting: action.value
        };
      case 'VALIDATE_FORM':
        return {
          ...state,
          isValid: Object.keys(state.errors).length === 0
        };
      case 'RESET_FORM':
        return {
          ...state,
          values: { ...state.values }, // Keep initial values
          touched: {},
          errors: {},
          isSubmitting: false,
          isValid: true
        };
      default:
        return state;
    }
  }
  
  // Provider props type
  interface FormProviderProps {
    initialValues: T;
    onSubmit: (values: T) => void | Promise<void>;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    children: ReactNode;
  }
  
  // Provider component
  const FormProvider: React.FC<FormProviderProps> = ({
    initialValues,
    onSubmit,
    validate,
    children
  }) => {
    const [state, dispatch] = useReducer(formReducer, {
      values: initialValues,
      touched: {},
      errors: {},
      isSubmitting: false,
      isValid: true
    });
    
    // Set a single form value
    const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
      dispatch({ type: 'SET_VALUE', field, value });
      
      // Run validation if provided
      if (validate) {
        const newValues = { ...state.values, [field]: value };
        const errors = validate(newValues);
        
        if (errors[field]) {
          dispatch({ type: 'SET_ERROR', field, error: errors[field] });
        } else {
          dispatch({ type: 'SET_ERROR', field, error: null });
        }
      }
    }, [state.values, validate]);
    
    // Set a field as touched
    const setTouched = useCallback(<K extends keyof T>(field: K, isTouched = true) => {
      dispatch({ type: 'SET_TOUCHED', field, value: isTouched });
    }, []);
    
    // Set an error for a field
    const setError = useCallback(<K extends keyof T>(field: K, error: string | null) => {
      dispatch({ type: 'SET_ERROR', field, error });
    }, []);
    
    // Validate the entire form
    const validateForm = useCallback(() => {
      if (!validate) return true;
      
      const errors = validate(state.values);
      const hasErrors = Object.keys(errors).length > 0;
      
      // Set errors for each field
      Object.entries(errors).forEach(([field, error]) => {
        dispatch({ 
          type: 'SET_ERROR', 
          field: field as keyof T, 
          error 
        });
      });
      
      dispatch({ type: 'VALIDATE_FORM' });
      return !hasErrors;
    }, [state.values, validate]);
    
    // Reset the form
    const resetForm = useCallback(() => {
      dispatch({ type: 'RESET_FORM' });
    }, []);
    
    // Handle form submission
    const handleSubmit = useCallback((e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      
      const isValid = validateForm();
      
      if (isValid) {
        dispatch({ type: 'SET_SUBMITTING', value: true });
        
        Promise.resolve(onSubmit(state.values))
          .finally(() => {
            dispatch({ type: 'SET_SUBMITTING', value: false });
          });
      }
    }, [onSubmit, state.values, validateForm]);
    
    // Memoize the context value
    const value = useMemo<FormContextValue<T>>(() => ({
      ...state,
      setValue,
      setTouched,
      setError,
      validateForm,
      resetForm,
      handleSubmit
    }), [
      state,
      setValue,
      setTouched,
      setError,
      validateForm,
      resetForm,
      handleSubmit
    ]);
    
    return (
      <FormContext.Provider value={value}>
        {children}
      </FormContext.Provider>
    );
  };
  
  // Custom hook for consuming the context
  const useForm = () => {
    const context = useContext(FormContext);
    
    if (context === undefined) {
      throw new Error('useForm must be used within a FormProvider');
    }
    
    return context;
  };
  
  return { FormProvider, useForm, FormContext };
}

// Usage example:
// interface UserFormValues {
//   name: string;
//   email: string;
//   password: string;
// }
// 
// export const { FormProvider: UserFormProvider, useForm: useUserForm } = createFormContext<UserFormValues>();
```

## Context Testing

Each context should have a comprehensive test file:

```typescript
// contexts/__tests__/ThemeContext.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme, ThemeContext } from '../ThemeContext';

// Test component that uses the context
const ThemeConsumer: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <div data-testid="primary-color">{colors.primary}</div>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('should provide default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#3498db');
  });
  
  it('should provide dark theme when initialTheme is set to dark', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#2980b9');
  });
  
  it('should toggle theme when toggle button is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    // Initially light theme
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Now dark theme
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#2980b9');
    
    // Click toggle button again
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Back to light theme
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#3498db');
  });
  
  it('should throw error when useTheme is used outside of ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});
```

## Context Best Practices

### 1. Structure and Organization

- **Keep Context Focused**: Each context should have a single responsibility
- **Separate UI from Data**: Use different contexts for UI state and data state
- **Use Typed Interfaces**: Always define TypeScript interfaces for your context values
- **Create Custom Hooks**: Always provide a custom hook to consume the context

### 2. Performance Optimization

- **Memoize Context Values**: Always use `useMemo` for the context value
- **Memoize Callbacks**: Use `useCallback` for functions in the context value
- **Memoize Derived Values**: Use `useMemo` for values derived from state
- **Avoid Unnecessary Renders**: Split contexts that change at different rates

### 3. API Design

- **Provide Complete Defaults**: Always include reasonable defaults for all context values
- **Error Handling**: Throw helpful errors when contexts are used outside providers
- **Composable Providers**: Design contexts to be easily composed with other providers
- **Context Dependencies**: Clearly document dependencies between different contexts

### 4. Testing

- **Test Provider Behavior**: Test that state changes correctly within the provider
- **Test Consumer Behavior**: Test that consumers react appropriately to context changes
- **Test Error Handling**: Ensure proper error handling when context is misused

## Context vs. Store Decision Tree

When deciding whether to use Context or a Store:

- **Use Context when**:
  - State is only needed by a specific subtree of components
  - State changes are infrequent
  - The component tree is deep and prop drilling would be cumbersome
  - You need to provide configuration or theme data to descendants

- **Use a Store when**:
  - State needs to be accessed from anywhere in the application
  - State changes are frequent
  - Complex state logic needs to be centralized
  - You need persistence, devtools, or time-travel debugging

## AI Collaboration for Context

When working with AI on context development:

### 1. Define the Context Purpose

```
"Let's create a LocalizationContext that will:
1. Provide language selection capability
2. Manage translations for the UI
3. Handle formatting of dates, numbers, and currencies
4. Support right-to-left languages"
```

### 2. Define Dependencies and Integration

```
"The LocalizationContext should work with:
1. The existing AuthContext to get the user's preferred language
2. The existing UIContext to adjust layout for RTL languages
3. The i18next library for translation lookups"
```

### 3. Describe Context API

```
"The LocalizationContext should expose:
1. currentLanguage: string - The active language code
2. availableLanguages: string[] - List of supported language codes
3. setLanguage(lang: string): void - Function to change the language
4. t(key: string, options?: object): string - Translation function
5. formatDate(date: Date): string - Date formatting helper
6. formatNumber(num: number): string - Number formatting helper
7. isRTL: boolean - Whether the current language is RTL"
```

## Conclusion

Following this context template ensures consistent, maintainable context implementation across your ZenReact application. By clearly organizing your context files, memoizing values, and providing custom hooks, you can create performant shared state that is easily consumed by components throughout the application. 