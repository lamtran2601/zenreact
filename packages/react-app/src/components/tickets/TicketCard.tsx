/**
 * TicketCard Component
 * 
 * Displays a single ticket with match information, price, and actions.
 * 
 * @guide Decision Frameworks: .ai-assistant/guides/DECISION_FRAMEWORKS.md
 * @guide Self-Review: .ai-assistant/guides/SELF_REVIEW_CHECKLISTS.md
 * @guide Testing: .ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md
 * 
 * @ai-pattern presentation-component
 * @ai-conventions
 * - Props interface named [Component]Props
 * - Use React.FC with TypeScript
 * - Use React.memo for optimization
 * - Local state only for UI concerns
 */
import React, { useState } from 'react';
import { Ticket, CartItem } from '../../types/ticket';
import useCartStore from '../../stores/cartStore';

interface TicketCardProps {
  ticket: Ticket;
  onSelect?: (ticketId: string) => void;
}

// Use React.memo for performance optimization on presentation components
const TicketCard: React.FC<TicketCardProps> = React.memo(({ ticket, onSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  
  const { match, category, available } = ticket;
  const { homeTeam, awayTeam, date, time, stadium, competition } = match;
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ticketId: ticket.id,
      matchId: match.id,
      quantity,
      category,
      match
    };
    
    addToCart(cartItem);
    
    if (onSelect) {
      onSelect(ticket.id);
    }
  };
  
  // Calculate availability status
  const availabilityStatus = (): { text: string; color: string } => {
    if (available === 0) {
      return { text: 'Sold Out', color: 'text-red-500' };
    }
    if (available < 10) {
      return { text: 'Almost Sold Out', color: 'text-amber-500' };
    }
    return { text: 'Available', color: 'text-green-500' };
  };
  
  const status = availabilityStatus();
  
  return (
    <div className="card bg-base-100 shadow-xl" data-testid="ticket-card">
      <div className="card-body p-6">
        <div className="flex justify-between items-center">
          <span className="badge badge-accent">{competition}</span>
          <span className={`badge ${status.color}`}>{status.text}</span>
        </div>
        
        <h2 className="card-title text-xl">
          {homeTeam.name} vs {awayTeam.name}
        </h2>
        
        <div className="flex items-center space-x-4 my-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={homeTeam.logo} alt={homeTeam.name} />
            </div>
          </div>
          <div className="text-xl font-bold">VS</div>
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={awayTeam.logo} alt={awayTeam.name} />
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate} at {time}
          </p>
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {stadium}
          </p>
        </div>
        
        <div className="divider my-2"></div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{category.name}</div>
            <div className="text-xl font-bold">${category.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500">{category.description}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              className="select select-bordered select-sm" 
              value={quantity}
              onChange={handleQuantityChange}
              disabled={available === 0}
            >
              {[...Array(Math.min(available, ticket.maxPerPurchase))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={available === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TicketCard; 