/**
 * @pattern StoreTest
 * @rule TestCoverage
 * Test suite for the ticket store
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useTicketStore, useTicketActions, useMatches, useFilteredMatches } from '../../../src/store/ticketStore';
import { mockMatches } from '../../../src/data/mockData';
import { act } from '@testing-library/react';

// Mock React hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useSyncExternalStore: vi.fn((subscribe, getSnapshot) => getSnapshot()),
  };
});

// Mock date-fns format function
vi.mock('date-fns', () => ({
  format: () => '2023-05-01',
  addDays: () => new Date('2023-05-01'),
}));

describe('Ticket Store', () => {
  /**
   * @pattern TestSetup
   * @rule CleanState
   * Reset store before each test
   */
  beforeEach(() => {
    // Clear the store before each test
    const { reset } = useTicketStore.getState();
    act(() => {
      reset();
    });
  });

  /**
   * @pattern TestTeardown
   * @rule CleanupMocks
   * Clean up mocks after each test
   */
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * @pattern ActionTest
   * @rule AsyncActionTest
   * Test fetchMatches action
   */
  describe('fetchMatches', () => {
    it('should fetch matches and update state', async () => {
      // Arrange
      const { fetchMatches } = useTicketStore.getState();
      
      // Act
      await act(async () => {
        await fetchMatches();
      });
      
      // Assert
      const { matches, isLoading, error } = useTicketStore.getState();
      expect(matches).toEqual(mockMatches);
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });

    it('should handle errors when fetching matches', async () => {
      // Arrange
      const { fetchMatches } = useTicketStore.getState();
      const mockError = new Error('Network error');
      
      // Mock implementation to throw error
      vi.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
        throw mockError;
      });
      
      // Act
      await act(async () => {
        await fetchMatches();
      });
      
      // Assert
      const { matches, isLoading, error } = useTicketStore.getState();
      expect(matches).toEqual([]);
      expect(isLoading).toBe(false);
      expect(error).toBe('Network error');
    });
  });

  /**
   * @pattern ActionTest
   * @rule SimpleActionTest
   * Test selectMatch action
   */
  describe('selectMatch', () => {
    it('should select a match', () => {
      // Arrange
      const { selectMatch } = useTicketStore.getState();
      const match = mockMatches[0];
      
      // Act
      act(() => {
        selectMatch(match);
      });
      
      // Assert
      const { selectedMatch } = useTicketStore.getState();
      expect(selectedMatch).toEqual(match);
    });
  });

  /**
   * @pattern ActionTest
   * @rule AsyncActionTest
   * Test bookTickets action
   */
  describe('bookTickets', () => {
    it('should book tickets successfully', async () => {
      // Arrange
      const { fetchMatches, bookTickets } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      const match = mockMatches[0];
      const bookingData = {
        matchId: match.id,
        quantity: 2,
        totalPrice: match.price * 2,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
      };
      
      // Act
      await act(async () => {
        await bookTickets(bookingData);
      });
      
      // Assert
      const { bookings, matches } = useTicketStore.getState();
      expect(bookings).toHaveLength(1);
      expect(bookings[0]).toMatchObject({
        ...bookingData,
        status: 'confirmed',
      });
      
      // Check if available tickets were reduced
      const updatedMatch = matches.find(m => m.id === match.id);
      expect(updatedMatch?.availableTickets).toBe(match.availableTickets - bookingData.quantity);
    });

    it('should handle not enough tickets error', async () => {
      // Arrange
      const { fetchMatches, bookTickets } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      const match = mockMatches[0];
      const bookingData = {
        matchId: match.id,
        quantity: match.availableTickets + 10, // More than available
        totalPrice: match.price * (match.availableTickets + 10),
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
      };
      
      // Act
      await act(async () => {
        await bookTickets(bookingData);
      });
      
      // Assert
      const { bookings, error } = useTicketStore.getState();
      expect(bookings).toHaveLength(0);
      expect(error).toBe('Not enough tickets available');
    });
  });

  /**
   * @pattern ActionTest
   * @rule FilterActionTest
   * Test applyFilters action
   */
  describe('applyFilters', () => {
    it('should apply filters correctly', async () => {
      // Arrange
      const { fetchMatches, applyFilters } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      // Act
      act(() => {
        applyFilters({ team: 'Manchester' });
      });
      
      // Assert
      const { filters } = useTicketStore.getState();
      expect(filters).toEqual({ team: 'Manchester' });
    });
  });

  /**
   * @pattern SelectorTest
   * @rule ComputedSelectorTest
   * Test getFilteredMatches selector
   */
  describe('getFilteredMatches', () => {
    it('should return filtered matches based on team', async () => {
      // Arrange
      const { fetchMatches, applyFilters } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      // Apply filter
      act(() => {
        applyFilters({ team: 'Manchester' });
      });
      
      // Act
      const filteredMatches = useTicketStore.getState().getFilteredMatches();
      
      // Assert
      expect(filteredMatches.length).toBeGreaterThan(0);
      expect(filteredMatches.length).toBeLessThan(mockMatches.length);
      filteredMatches.forEach(match => {
        expect(match.homeTeam.includes('Manchester') || match.awayTeam.includes('Manchester')).toBe(true);
      });
    });

    it('should use cache for repeated calls with same filters', async () => {
      // Arrange
      const { fetchMatches, applyFilters } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      // Apply filter
      act(() => {
        applyFilters({ team: 'Manchester' });
      });
      
      // Act - first call
      const firstResult = useTicketStore.getState().getFilteredMatches();
      
      // Spy on filter function
      const getFilteredMatchesSpy = vi.spyOn(useTicketStore.getState(), 'getFilteredMatches');
      
      // Act - second call
      const secondResult = useTicketStore.getState().getFilteredMatches();
      
      // Assert
      expect(secondResult).toBe(firstResult); // Same reference due to caching
      expect(getFilteredMatchesSpy).toHaveReturnedWith(firstResult);
    });
  });

  /**
   * @pattern SelectorTest
   * @rule HookTest
   * Test selector hooks
   */
  describe('Selector Hooks', () => {
    it('should provide access to matches via store state', async () => {
      // Arrange
      const { fetchMatches } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      // Act
      const matches = useTicketStore.getState().matches;
      
      // Assert
      expect(matches).toEqual(mockMatches);
    });

    it('should provide access to filtered matches via store state', async () => {
      // Arrange
      const { fetchMatches, applyFilters } = useTicketStore.getState();
      
      // First fetch matches
      await act(async () => {
        await fetchMatches();
      });
      
      // Apply filter
      act(() => {
        applyFilters({ team: 'Manchester' });
      });
      
      // Act
      const filteredMatches = useTicketStore.getState().getFilteredMatches();
      
      // Assert
      expect(filteredMatches.length).toBeGreaterThan(0);
      filteredMatches.forEach(match => {
        expect(match.homeTeam.includes('Manchester') || match.awayTeam.includes('Manchester')).toBe(true);
      });
    });
  });

  /**
   * @pattern HookTest
   * @rule ActionHookTest
   * Test action hooks
   */
  describe('Action Hooks', () => {
    it('should provide access to actions via store state', () => {
      // Act
      const store = useTicketStore.getState();
      
      // Assert
      expect(store).toHaveProperty('fetchMatches');
      expect(store).toHaveProperty('selectMatch');
      expect(store).toHaveProperty('bookTickets');
      expect(store).toHaveProperty('applyFilters');
      expect(store).toHaveProperty('cancelBooking');
      expect(store).toHaveProperty('reset');
    });
  });
}); 