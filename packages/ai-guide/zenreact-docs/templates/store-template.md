# Store Template

This template provides the standard structure for creating state stores in the ZenReact framework using Zustand as the primary state management library.

## Store Structure

Every store should follow this file structure and organization:

```typescript
// 1. Imports
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 2. Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// 3. Store state interface
interface UserState {
  // State properties
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions (methods that modify state)
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  
  // Derived state (computed values)
  isAdmin: () => boolean;
}

// 4. Store creation
export const useUserStore = create<UserState>()(
  // 5. Optional middleware (persist, immer, etc.)
  persist(
    immer((set, get) => ({
      // 6. Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // 7. Actions
      login: async (email: string, password: string) => {
        try {
          set(state => {
            state.isLoading = true;
            state.error = null;
          });
          
          // API call would go here
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) {
            throw new Error('Login failed');
          }
          
          const userData: User = await response.json();
          
          set(state => {
            state.user = userData;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
        } catch (error) {
          set(state => {
            state.isLoading = false;
            state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          });
        }
      },
      
      logout: async () => {
        try {
          set(state => {
            state.isLoading = true;
          });
          
          // API call would go here
          await fetch('/api/logout', {
            method: 'POST',
          });
          
          set(state => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          });
        } catch (error) {
          set(state => {
            state.isLoading = false;
            state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          });
        }
      },
      
      updateUser: async (userData: Partial<User>) => {
        try {
          set(state => {
            state.isLoading = true;
            state.error = null;
          });
          
          // Ensure user exists
          if (!get().user) {
            throw new Error('No authenticated user');
          }
          
          // API call would go here
          const response = await fetch(`/api/users/${get().user!.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update user');
          }
          
          const updatedUser: User = await response.json();
          
          set(state => {
            state.user = updatedUser;
            state.isLoading = false;
          });
        } catch (error) {
          set(state => {
            state.isLoading = false;
            state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          });
        }
      },
      
      clearError: () => {
        set(state => {
          state.error = null;
        });
      },
      
      // 8. Derived state (getters)
      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },
    })),
    {
      // 9. Persistence configuration (if needed)
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// 10. Optional: Re-export selectors for better performance
export const useUser = () => useUserStore(state => state.user);
export const useIsAuthenticated = () => useUserStore(state => state.isAuthenticated);
export const useIsAdmin = () => useUserStore(state => state.isAdmin());
```

## Store Types and Patterns

### 1. Feature Store

Store for a specific feature (e.g., shopping cart):

```typescript
// stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  // State
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Derived state
  itemCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,
      
      // Actions
      addItem: (item) => {
        set(state => {
          const existingItem = state.items.find(i => i.id === item.id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.items.push({ ...item, quantity: 1 });
          }
        });
      },
      
      removeItem: (id) => {
        set(state => {
          state.items = state.items.filter(item => item.id !== id);
        });
      },
      
      updateQuantity: (id, quantity) => {
        set(state => {
          const item = state.items.find(i => i.id === id);
          if (item) {
            item.quantity = Math.max(1, quantity);
          }
        });
      },
      
      clearCart: () => {
        set(state => {
          state.items = [];
        });
      },
      
      // Derived state
      itemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      
      totalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    })),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 2. UI State Store

Store for managing global UI state:

```typescript
// stores/uiStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ThemeMode = 'light' | 'dark' | 'system';
type SidebarState = 'expanded' | 'collapsed' | 'hidden';

interface UIState {
  // State
  themeMode: ThemeMode;
  sidebarState: SidebarState;
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    autoDismiss: boolean;
  }>;
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  setSidebarState: (state: SidebarState) => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    // Initial state
    themeMode: 'system',
    sidebarState: 'expanded',
    notifications: [],
    
    // Actions
    setThemeMode: (mode) => {
      set(state => {
        state.themeMode = mode;
      });
    },
    
    toggleThemeMode: () => {
      set(state => {
        state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      });
    },
    
    setSidebarState: (state) => {
      set(draft => {
        draft.sidebarState = state;
      });
    },
    
    toggleSidebar: () => {
      set(state => {
        state.sidebarState = state.sidebarState === 'expanded' ? 'collapsed' : 'expanded';
      });
    },
    
    addNotification: (notification) => {
      const id = Date.now().toString();
      
      set(state => {
        state.notifications.push({
          ...notification,
          id,
        });
      });
      
      if (notification.autoDismiss) {
        setTimeout(() => {
          get().removeNotification(id);
        }, 5000);
      }
      
      return id;
    },
    
    removeNotification: (id) => {
      set(state => {
        state.notifications = state.notifications.filter(n => n.id !== id);
      });
    },
    
    clearNotifications: () => {
      set(state => {
        state.notifications = [];
      });
    },
  }))
);
```

### 3. Entity Store

Store for managing domain entities with normalization:

```typescript
// stores/entityStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface EntityState {
  // Normalized entities
  products: Record<string, Product>;
  categories: Record<string, Category>;
  
  // Loading states
  productsLoading: boolean;
  categoriesLoading: boolean;
  
  // Error states
  productsError: string | null;
  categoriesError: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  upsertProduct: (product: Product) => void;
  upsertCategory: (category: Category) => void;
  removeProduct: (id: string) => void;
  removeCategory: (id: string) => void;
  
  // Selectors
  getProductsByCategory: (categoryId: string) => Product[];
}

export const useEntityStore = create<EntityState>()(
  immer((set, get) => ({
    // Initial state
    products: {},
    categories: {},
    productsLoading: false,
    categoriesLoading: false,
    productsError: null,
    categoriesError: null,
    
    // Actions
    fetchProducts: async () => {
      try {
        set(state => {
          state.productsLoading = true;
          state.productsError = null;
        });
        
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const products: Product[] = await response.json();
        
        set(state => {
          state.productsLoading = false;
          // Normalize products
          state.products = products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
          }, {} as Record<string, Product>);
        });
      } catch (error) {
        set(state => {
          state.productsLoading = false;
          state.productsError = error instanceof Error ? error.message : 'An unknown error occurred';
        });
      }
    },
    
    fetchCategories: async () => {
      try {
        set(state => {
          state.categoriesLoading = true;
          state.categoriesError = null;
        });
        
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const categories: Category[] = await response.json();
        
        set(state => {
          state.categoriesLoading = false;
          // Normalize categories
          state.categories = categories.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
          }, {} as Record<string, Category>);
        });
      } catch (error) {
        set(state => {
          state.categoriesLoading = false;
          state.categoriesError = error instanceof Error ? error.message : 'An unknown error occurred';
        });
      }
    },
    
    upsertProduct: (product) => {
      set(state => {
        state.products[product.id] = product;
      });
    },
    
    upsertCategory: (category) => {
      set(state => {
        state.categories[category.id] = category;
      });
    },
    
    removeProduct: (id) => {
      set(state => {
        delete state.products[id];
      });
    },
    
    removeCategory: (id) => {
      set(state => {
        delete state.categories[id];
      });
    },
    
    // Selectors
    getProductsByCategory: (categoryId) => {
      const { products } = get();
      return Object.values(products).filter(product => product.category === categoryId);
    },
  }))
);
```

## Store Testing

Each store should have a corresponding test file:

```typescript
// stores/userStore.test.ts
import { act, renderHook } from '@testing-library/react-hooks';
import { useUserStore } from './userStore';
import fetchMock from 'jest-fetch-mock';

// Setup fetch mock
fetchMock.enableMocks();

describe('UserStore', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Reset the store state before each test
    act(() => {
      useUserStore.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    });
  });
  
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUserStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isAdmin()).toBe(false);
  });
  
  it('should handle successful login', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    };
    
    fetchMock.mockResponseOnce(JSON.stringify(mockUser));
    
    const { result, waitForNextUpdate } = renderHook(() => useUserStore());
    
    act(() => {
      result.current.login('john@example.com', 'password');
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    expect(fetchMock).toHaveBeenCalledWith('/api/login', expect.any(Object));
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
  
  it('should handle login error', async () => {
    fetchMock.mockRejectOnce(new Error('Invalid credentials'));
    
    const { result, waitForNextUpdate } = renderHook(() => useUserStore());
    
    act(() => {
      result.current.login('wrong@example.com', 'wrong');
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
  });
  
  it('should handle logout', async () => {
    // Setup logged in state
    act(() => {
      useUserStore.setState({
        user: { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
        isAuthenticated: true,
      });
    });
    
    fetchMock.mockResponseOnce(JSON.stringify({}));
    
    const { result, waitForNextUpdate } = renderHook(() => useUserStore());
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    expect(fetchMock).toHaveBeenCalledWith('/api/logout', expect.any(Object));
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
  
  it('should check admin status correctly', () => {
    // Not authenticated
    expect(useUserStore.getState().isAdmin()).toBe(false);
    
    // Regular user
    act(() => {
      useUserStore.setState({
        user: { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
        isAuthenticated: true,
      });
    });
    
    expect(useUserStore.getState().isAdmin()).toBe(false);
    
    // Admin user
    act(() => {
      useUserStore.setState({
        user: { id: '2', name: 'Admin', email: 'admin@example.com', role: 'admin' },
        isAuthenticated: true,
      });
    });
    
    expect(useUserStore.getState().isAdmin()).toBe(true);
  });
});
```

## Store Best Practices

### 1. Structure

- **Separate State and Actions**: Clearly differentiate between state properties and actions
- **Use Typed Interfaces**: Always define TypeScript interfaces for your state
- **Follow Naming Conventions**: 
  - State properties: nouns (user, items, isLoading)
  - Actions: verbs (login, addItem, clearCart)
  - Derived state: getters (isAdmin, totalPrice)

### 2. State Management

- **Use Immer for Complex Updates**: Makes updating nested state easier
- **Keep State Minimal**: Only store what's needed, derive values when possible
- **Add Loading and Error States**: Always include isLoading and error states for async operations
- **Use Normalization for Collections**: Store collections as records with IDs as keys

### 3. Actions

- **Make Actions Self-Contained**: Include all logic needed for a state change
- **Handle Async Operations**: Include proper loading and error handling
- **Return Values When Useful**: Return data from actions when helpful (e.g., created IDs)
- **Validate Inputs**: Add validation to prevent invalid state

### 4. Persistence

- **Be Selective About Persistence**: Only persist data that needs to survive refreshes
- **Exclude Sensitive Data**: Never persist sensitive information like API keys
- **Handle Migrations**: Add version control for breaking changes in persisted state

### 5. Selectors

- **Extract Complex Selectors**: Move complex state derivation to dedicated selector functions
- **Memoize Expensive Selectors**: Use useMemo or createSelector for expensive computations
- **Re-export Selectors**: For performance optimization, export selectors separately

## Combining Stores

For complex applications, compose multiple stores together:

```typescript
// stores/rootStore.ts
import { useUserStore } from './userStore';
import { useCartStore } from './cartStore';
import { useUIStore } from './uiStore';

// Export individual stores
export { useUserStore, useCartStore, useUIStore };

// Composed selectors and actions
export const useUserCart = () => {
  const user = useUserStore(state => state.user);
  const cart = useCartStore(state => state.items);
  const cartTotal = useCartStore(state => state.totalPrice());
  
  return {
    user,
    cart,
    cartTotal,
  };
};

// Combined actions
export const useCheckout = () => {
  const clearCart = useCartStore(state => state.clearCart);
  const addNotification = useUIStore(state => state.addNotification);
  
  const checkout = async () => {
    try {
      // Checkout logic...
      
      // Clear cart after successful checkout
      clearCart();
      
      // Show success notification
      addNotification({
        message: 'Order placed successfully!',
        type: 'success',
        autoDismiss: true,
      });
      
      return true;
    } catch (error) {
      // Show error notification
      addNotification({
        message: error instanceof Error ? error.message : 'Checkout failed',
        type: 'error',
        autoDismiss: true,
      });
      
      return false;
    }
  };
  
  return { checkout };
};
```

## AI Collaboration for Stores

When working with AI on store development:

### 1. Define Clear Responsibilities

```
"Let's create a products store that will:
1. Manage the product catalog data
2. Handle filtering and sorting products
3. Manage the product loading and error states
4. Cache product data to minimize API calls"
```

### 2. Specify Dependencies

```
"The products store should interact with the cart store for checking if items are in the cart, but cart operations should remain in the cart store."
```

### 3. Outline API Integration

```
"The store should fetch data from these endpoints:
- GET /api/products for the product list
- GET /api/products/:id for individual product details
- POST /api/products/:id/reviews for adding reviews"
```

### 4. Describe State Structure

```
"The products state should include:
- A normalized map of products by ID
- Current filter criteria (category, price range, etc.)
- Sort order (newest, price high-low, etc.)
- Loading and error states for different operations"
```

## Conclusion

Following this store template ensures consistent, maintainable state management across your ZenReact application. By clearly separating state, actions, and derived state, while following best practices for async operations and state updates, both developers and AI can effectively collaborate on state management. 