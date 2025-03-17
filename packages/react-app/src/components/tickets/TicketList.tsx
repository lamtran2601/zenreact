/**
 * TicketList Component
 * 
 * Displays a list of tickets with filtering capability.
 * 
 * @guide Decision Frameworks: .ai-assistant/guides/DECISION_FRAMEWORKS.md
 * @guide Self-Review: .ai-assistant/guides/SELF_REVIEW_CHECKLISTS.md
 * @guide Testing: .ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md
 */
import React, { useState } from 'react';
import { useTickets } from '../../services/ticketService';
import TicketCard from './TicketCard';
import { Ticket, TicketFilter } from '../../types/ticket';

interface TicketListProps {
  initialFilter?: TicketFilter;
}

const TicketList: React.FC<TicketListProps> = ({ initialFilter = {} }) => {
  const [filter, setFilter] = useState<TicketFilter>(initialFilter);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch tickets
  const { data: tickets, isLoading, isError } = useTickets();
  
  // Filter tickets client-side
  const filteredTickets = React.useMemo(() => {
    if (!tickets) return [];
    
    return tickets.filter(ticket => {
      // Filter by search term (team names)
      if (searchTerm && 
          !ticket.match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !ticket.match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply other filters (can be expanded later)
      return true;
    });
  }, [tickets, searchTerm]);
  
  // Group tickets by match for better display
  const ticketsByMatch = React.useMemo(() => {
    const grouped: Record<string, Ticket[]> = {};
    
    filteredTickets.forEach(ticket => {
      const matchId = ticket.match.id;
      if (!grouped[matchId]) {
        grouped[matchId] = [];
      }
      grouped[matchId].push(ticket);
    });
    
    return grouped;
  }, [filteredTickets]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading tickets. Please try again later.</span>
      </div>
    );
  }
  
  // Empty state
  if (filteredTickets.length === 0) {
    return (
      <div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by team name..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No tickets found. Please try a different search.</span>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by team name..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-col gap-6">
        {Object.entries(ticketsByMatch).map(([matchId, tickets]) => (
          <div key={matchId} className="match-group">
            <h3 className="text-lg font-bold mb-2">
              {tickets[0].match.homeTeam.name} vs {tickets[0].match.awayTeam.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList; 