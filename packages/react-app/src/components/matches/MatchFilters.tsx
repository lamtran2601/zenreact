import { FC, useState, useEffect } from 'react';
import { useFilters, useTicketActions, useMatches } from '../../store/ticketStore';
import { format, parseISO } from 'date-fns';

/**
 * @pattern ListComponent
 * @rule EfficientRendering
 * Filter component for match listings with optimized rendering
 */
export const MatchFilters: FC = () => {
  const matches = useMatches();
  const filters = useFilters();
  const { applyFilters } = useTicketActions();
  
  const [dateFilter, setDateFilter] = useState(filters.date || '');
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, 500]
  );
  
  // Get unique dates from matches
  const uniqueDates = [...new Set(matches.map(match => match.date))].sort();
  
  // Get min and max prices
  const prices = matches.map(match => match.price);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 500);
  
  useEffect(() => {
    // Update local state when filters change
    setDateFilter(filters.date || '');
    setPriceRange(filters.priceRange || [minPrice, maxPrice]);
  }, [filters, minPrice, maxPrice]);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDateFilter(value);
    applyFilters({ date: value || undefined });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const newRange: [number, number] = [...priceRange];
    
    if (e.target.id === 'min-price') {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    
    setPriceRange(newRange);
    applyFilters({ priceRange: newRange });
  };
  
  const handleReset = () => {
    setDateFilter('');
    setPriceRange([minPrice, maxPrice]);
    applyFilters({ date: undefined, priceRange: undefined, team: undefined });
  };
  
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-4">Filter Matches</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <select 
            className="select select-bordered w-full" 
            value={dateFilter}
            onChange={handleDateChange}
          >
            <option value="">All Dates</option>
            {uniqueDates.map(date => (
              <option key={date} value={date}>
                {format(parseISO(date), 'MMMM dd, yyyy')}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min Price: ${priceRange[0]}</span>
          </label>
          <input 
            type="range" 
            min={minPrice} 
            max={maxPrice} 
            value={priceRange[0]}
            className="range range-primary" 
            step="10"
            id="min-price"
            onChange={handlePriceChange}
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Max Price: ${priceRange[1]}</span>
          </label>
          <input 
            type="range" 
            min={minPrice} 
            max={maxPrice} 
            value={priceRange[1]}
            className="range range-primary" 
            step="10"
            id="max-price"
            onChange={handlePriceChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button className="btn btn-outline btn-sm" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}; 