import { useState, useEffect, lazy, Suspense } from 'react';
import { Layout } from './components/layout/Layout';
import { MatchList } from './components/matches/MatchList';
import { MatchFilters } from './components/matches/MatchFilters';
// Import large components lazily
const BookingForm = lazy(() => import('./components/booking/BookingForm').then(module => ({ default: module.BookingForm })));
const BookingConfirmation = lazy(() => import('./components/booking/BookingConfirmation').then(module => ({ default: module.BookingConfirmation })));
import { ErrorAlert } from './components/layout/ErrorAlert';
import { AccessibilityProvider } from './components/layout/AccessibilityProvider';
import { useTicketActions, useSelectedMatch, useBookings, useMatches } from './store/ticketStore';
import { Match, Booking } from './types';

/**
 * @pattern ApplicationRoot
 * @rule ApplicationIntegration
 * Main application component with state management integration
 */
function App() {
  const { fetchMatches } = useTicketActions();
  const selectedMatch = useSelectedMatch();
  const bookings = useBookings();
  const matches = useMatches();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    if (selectedMatch && !showBookingForm && !showConfirmation) {
      setShowBookingForm(true);
    }
  }, [selectedMatch, showBookingForm, showConfirmation]);

  const handleSelectMatch = (match: Match) => {
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);

    // Get the latest booking
    const latestBooking = bookings[bookings.length - 1];
    if (latestBooking) {
      setLastBooking(latestBooking);
      setShowConfirmation(true);
    }
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setLastBooking(null);
  };

  /**
   * @pattern LoadingFallback
   * @rule UserFeedback
   * Fallback component while code-split components are loading
   */
  const renderLoadingFallback = () => (
    <div 
      className="p-4 animate-pulse rounded shadow-lg bg-base-100"
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <AccessibilityProvider>
      <Layout>
        <ErrorAlert />

        <h1 className="text-3xl font-bold mb-6" id="main-content">Football Ticket Booking</h1>

        {!showBookingForm && !showConfirmation && (
          <>
            <MatchFilters />
            <MatchList matches={matches} onSelectMatch={handleSelectMatch} />
          </>
        )}

        {showBookingForm && selectedMatch && (
          <Suspense fallback={renderLoadingFallback()}>
            <BookingForm
              match={selectedMatch}
              onSuccess={handleBookingSuccess}
              onCancel={handleCloseBookingForm}
            />
          </Suspense>
        )}

        {showConfirmation && lastBooking && selectedMatch && (
          <Suspense fallback={renderLoadingFallback()}>
            <BookingConfirmation
              booking={lastBooking}
              match={selectedMatch}
              onClose={handleCloseConfirmation}
            />
          </Suspense>
        )}
      </Layout>
    </AccessibilityProvider>
  );
}

export default App;
