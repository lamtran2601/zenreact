import { FC } from 'react';
import { Booking, Match } from '../../types';
import { format, parseISO } from 'date-fns';

/**
 * @pattern CardComponent
 * @rule EfficientRendering
 * Booking confirmation component with optimized rendering
 */
interface BookingConfirmationProps {
  booking: Booking;
  match: Match;
  onClose: () => void;
}

export const BookingConfirmation: FC<BookingConfirmationProps> = ({ booking, match, onClose }) => {
  const formattedDate = format(parseISO(match.date), 'MMMM dd, yyyy');
  const formattedBookingDate = format(parseISO(booking.bookingDate), 'MMMM dd, yyyy');
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-success">Booking Confirmed!</h2>
          <div className="badge badge-success">Confirmed</div>
        </div>
        
        <div className="divider"></div>
        
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">{match.homeTeam} vs {match.awayTeam}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-base-content/70">Match Date</p>
              <p className="font-semibold">{formattedDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Venue</p>
              <p className="font-semibold">{match.venue}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Booking Reference</p>
              <p className="font-semibold">{booking.id}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Booking Date</p>
              <p className="font-semibold">{formattedBookingDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Customer</p>
              <p className="font-semibold">{booking.customerName}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Email</p>
              <p className="font-semibold">{booking.customerEmail}</p>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-base-content/70">Tickets</p>
              <p className="font-semibold">{booking.quantity} x ${match.price.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-base-content/70">Total</p>
              <p className="font-bold text-lg">${booking.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm">
          <p>A confirmation email has been sent to {booking.customerEmail}</p>
          <p className="mt-2">Please arrive at least 30 minutes before the match starts.</p>
        </div>
        
        <div className="card-actions justify-end mt-6">
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}; 