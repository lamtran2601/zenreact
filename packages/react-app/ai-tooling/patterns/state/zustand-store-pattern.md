# Zustand Store Pattern

## Structure Template

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the store state interface
interface StoreState {
  // State properties
  items: Item[];
  selectedItem: Item | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchItems: () => Promise<void>;
  selectItem: (item: Item) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  
  // Reset state
  reset: () => void;
}

// Define initial state
const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

// Create the store
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,
      
      // Actions
      fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
          // API call or data fetching logic
          const items = await fetchItemsFromAPI();
          set({ items, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error', 
            isLoading: false 
          });
        }
      },
      
      selectItem: (item) => {
        set({ selectedItem: item });
      },
      
      addItem: (item) => {
        set((state) => ({ 
          items: [...state.items, item] 
        }));
      },
      
      removeItem: (id) => {
        set((state) => ({ 
          items: state.items.filter(item => item.id !== id) 
        }));
      },
      
      updateItem: (id, updates) => {
        set((state) => ({ 
          items: state.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
          ) 
        }));
      },
      
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'store-storage', // Storage key
      partialize: (state) => ({
        // Only persist these fields
        items: state.items,
        selectedItem: state.selectedItem,
      }),
    }
  )
);

// Selectors
export const useItems = () => useStore((state) => state.items);
export const useSelectedItem = () => useStore((state) => state.selectedItem);
export const useIsLoading = () => useStore((state) => state.isLoading);
export const useError = () => useStore((state) => state.error);

// Action hooks
export const useStoreActions = () => {
  const { fetchItems, selectItem, addItem, removeItem, updateItem, reset } = useStore();
  return { fetchItems, selectItem, addItem, removeItem, updateItem, reset };
};
```

## Usage Example

```tsx
import { useItems, useSelectedItem, useStoreActions } from './store';

const MyComponent = () => {
  const items = useItems();
  const selectedItem = useSelectedItem();
  const { fetchItems, selectItem } = useStoreActions();
  
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  
  return (
    <div>
      {items.map(item => (
        <div 
          key={item.id}
          onClick={() => selectItem(item)}
          className={selectedItem?.id === item.id ? 'selected' : ''}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

## Validation Rules

- Must use TypeScript interfaces for type safety
- Must handle loading and error states
- Must implement selectors for performance
- Must include persistence configuration
- Must provide reset functionality
- Must separate actions from state access 