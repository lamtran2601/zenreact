/**
 * @pattern VirtualizedList
 * @rule EfficientRendering
 * Match list component with virtualization for efficient rendering
 */
import { FC, memo, useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';
import { useFilteredMatches, useIsLoading, useTicketActions } from '../../store/ticketStore';

interface MatchListProps {
  matches: Match[];
  onSelectMatch?: (match: Match) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

/**
 * @pattern MemoizedComponent
 * @rule PreventReRenders
 * Virtualized list of matches with efficient rendering
 */
export const MatchList: FC<MatchListProps> = memo(({ 
  matches, 
  onSelectMatch,
  isLoading = false,
  emptyMessage = "No matches found" 
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtual({
    size: matches.length,
    parentRef,
    estimateSize: useCallback(() => 150, []), // Estimated height of each match card
    overscan: 5, // Number of items to render outside of the visible area
  });

  const { selectMatch } = useTicketActions();

  const handleSelectMatch = (match: Match) => {
    selectMatch(match);
    onSelectMatch?.(match);
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={index} 
            className="h-36 bg-gray-200 animate-pulse rounded-lg"
            aria-label="Loading matches"
          />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div 
        className="flex items-center justify-center h-64 text-gray-500"
        data-testid="empty-matches"
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div 
      ref={parentRef} 
      className="h-[calc(100vh-200px)] overflow-auto"
      data-testid="match-list"
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <MatchCard 
              match={matches[virtualRow.index]} 
              onSelect={handleSelectMatch} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}); 