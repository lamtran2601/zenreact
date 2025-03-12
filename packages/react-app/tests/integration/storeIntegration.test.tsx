/**
 * @pattern IntegrationTest
 * @rule ComponentStoreIntegration
 * Integration test for store with components
 */
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTicketStore } from '../../src/store/ticketStore';
import { mockMatches } from '../../src/data/mockData';

// Mock date-fns
vi.mock('date-fns', () => ({
  format: () => '2023-05-01',
  addDays: () => new Date('2023-05-01'),
}));

// Create a simple test component that uses the store
const TestComponent = () => {
  const matches = useTicketStore(state => state.matches);
  const selectedMatch = useTicketStore(state => state.selectedMatch);
  const isLoading = useTicketStore(state => state.isLoading);
  const error = useTicketStore(state => state.error);
  const fetchMatches = useTicketStore(state => state.fetchMatches);
  const selectMatch = useTicketStore(state => state.selectMatch);

  return (
    <div>
      <h1>Football Tickets</h1>
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      <button onClick={() => fetchMatches()} data-testid="fetch-button">
        Fetch Matches
      </button>
      <div data-testid="matches-count">{matches.length} matches</div>
      <ul>
        {matches.map((match) => (
          <li key={match.id} data-testid={`match-${match.id}`}>
            <button onClick={() => selectMatch(match)} data-testid={`select-${match.id}`}>
              {match.homeTeam} vs {match.awayTeam}
            </button>
          </li>
        ))}
      </ul>
      {selectedMatch && (
        <div data-testid="selected-match">
          Selected: {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
        </div>
      )}
    </div>
  );
};

describe('Store Integration', () => {
  /**
   * @pattern TestSetup
   * @rule CleanState
   * Reset store before each test
   */
  beforeEach(() => {
    const { reset } = useTicketStore.getState();
    reset();
  });

  /**
   * @pattern IntegrationTest
   * @rule FetchDataTest
   * Test fetching data and updating UI
   */
  it('should fetch matches and update UI', async () => {
    // Arrange
    render(<TestComponent />);
    
    // Act
    fireEvent.click(screen.getByTestId('fetch-button'));
    
    // Assert - first loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Assert - matches displayed
    expect(screen.getByTestId('matches-count')).toHaveTextContent(`${mockMatches.length} matches`);
    
    // Check if all matches are rendered
    mockMatches.forEach((match) => {
      expect(screen.getByTestId(`match-${match.id}`)).toBeInTheDocument();
    });
  });

  /**
   * @pattern IntegrationTest
   * @rule SelectionTest
   * Test selecting a match
   */
  it('should select a match and update UI', async () => {
    // Arrange - first fetch matches
    const { fetchMatches } = useTicketStore.getState();
    await fetchMatches();
    
    // Render component
    render(<TestComponent />);
    
    // Act - select first match
    const firstMatch = mockMatches[0];
    fireEvent.click(screen.getByTestId(`select-${firstMatch.id}`));
    
    // Assert
    expect(screen.getByTestId('selected-match')).toHaveTextContent(
      `Selected: ${firstMatch.homeTeam} vs ${firstMatch.awayTeam}`
    );
  });

  /**
   * @pattern IntegrationTest
   * @rule ErrorHandlingTest
   * Test error handling
   */
  it('should handle and display errors', async () => {
    // Arrange
    const mockError = new Error('Failed to fetch');
    
    // Mock implementation to throw error
    vi.spyOn(useTicketStore.getState(), 'fetchMatches').mockImplementationOnce(async () => {
      useTicketStore.setState({ isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      useTicketStore.setState({ 
        isLoading: false, 
        error: 'Failed to fetch' 
      });
    });
    
    // Render component
    render(<TestComponent />);
    
    // Act
    fireEvent.click(screen.getByTestId('fetch-button'));
    
    // Assert - first loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch');
    });
  });
}); 