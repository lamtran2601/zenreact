import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { MatchList } from './components/matches/MatchList';
import { MatchFilters } from './components/matches/MatchFilters';
import { BookingForm } from './components/booking/BookingForm';
import { BookingConfirmation } from './components/booking/BookingConfirmation';
import { ErrorAlert } from './components/layout/ErrorAlert';
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

  return (
    <Layout>
      <ErrorAlert />

      <h1 className="text-3xl font-bold mb-6">Football Ticket Booking</h1>

      {!showBookingForm && !showConfirmation && (
        <>
          <MatchFilters />
          <MatchList matches={matches} onSelectMatch={handleSelectMatch} />
        </>
      )}

      {showBookingForm && selectedMatch && (
        <BookingForm
          match={selectedMatch}
          onSuccess={handleBookingSuccess}
          onCancel={handleCloseBookingForm}
        />
      )}

      {showConfirmation && lastBooking && selectedMatch && (
        <BookingConfirmation
          booking={lastBooking}
          match={selectedMatch}
          onClose={handleCloseConfirmation}
        />
      )}
    </Layout>
  );
}

export default App;
