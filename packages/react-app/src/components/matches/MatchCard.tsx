/**
 * @pattern MemoizedComponent
 * @rule PreventReRenders
 * Match card component with memoization for performance
 */
import { FC, memo, useCallback } from 'react';
import { Match } from '../../types';
import { format, parseISO } from 'date-fns';

interface MatchCardProps {
  match: Match;
  onSelect?: (match: Match) => void;
}

/**
 * @pattern OptimizedImages
 * @rule EfficientLoading
 * Match card with optimized rendering and image loading
 */
export const MatchCard: FC<MatchCardProps> = memo(({ match, onSelect }) => {
  const { id, homeTeam, awayTeam, date, venue, availableTickets, price } = match;
  
  /**
   * @pattern MemoizedCallback
   * @rule StableReferences
   * Memoized callback to prevent unnecessary re-renders
   */
  const handleSelect = useCallback(() => {
    onSelect?.(match);
  }, [match, onSelect]);

  const formattedDate = format(parseISO(date), 'MMMM dd, yyyy');

  return (
    <div 
      className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={handleSelect}
      data-testid={`match-card-${id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect();
        }
      }}
    >
      <figure>
        <img 
          src={match.image} 
          alt={`${homeTeam} vs ${awayTeam}`} 
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-lg font-bold">
            {homeTeam} vs {awayTeam}
          </h2>
          <span className="badge badge-primary badge-lg">${price}</span>
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{venue}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span>{availableTickets} tickets available</span>
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}); 