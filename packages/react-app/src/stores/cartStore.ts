import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/ticket';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addToCart: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find(i => i.ticketId === item.ticketId);
        
        if (existingItem) {
          // Update quantity if item already exists
          return get().updateQuantity(
            item.ticketId, 
            Math.min(existingItem.quantity + item.quantity, 10) // Limit to 10 tickets per item
          );
        }
        
        // Add new item and recalculate totals
        set(state => {
          const newItems = [...state.items, item];
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems)
          };
        });
      },
      
      removeFromCart: (ticketId: string) => {
        set(state => {
          const newItems = state.items.filter(item => item.ticketId !== ticketId);
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems)
          };
        });
      },
      
      updateQuantity: (ticketId: string, quantity: number) => {
        set(state => {
          const newItems = state.items.map(item => 
            item.ticketId === ticketId 
              ? { ...item, quantity: Math.max(1, Math.min(quantity, 10)) } // Ensure quantity is between 1 and 10
              : item
          );
          
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems)
          };
        });
      },
      
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      }
    }),
    {
      name: 'football-ticket-cart', // Local storage key
    }
  )
);

// Helper functions for calculations
const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.category.price * item.quantity), 0);
};

export default useCartStore; 