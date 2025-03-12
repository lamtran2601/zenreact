/**
 * @pattern FormComponent
 * @rule ValidationHandling
 * Booking form component with validation and error handling
 */
import { FC, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Match } from '../../types';
import { useTicketActions, useIsLoading } from '../../store/ticketStore';

// Form validation schema
const bookingSchema = z.object({
  customerName: z.string().min(3, 'Name must be at least 3 characters'),
  customerEmail: z.string().email('Please enter a valid email'),
  quantity: z.number()
    .int('Quantity must be a whole number')
    .min(1, 'Minimum 1 ticket required')
    .max(10, 'Maximum 10 tickets allowed'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  match: Match;
  onSuccess: () => void;
  onCancel: () => void;
}

/**
 * @pattern MemoizedComponent
 * @rule PreventReRenders
 * Booking form with validation and optimized rendering
 */
export const BookingForm: FC<BookingFormProps> = ({ match, onSuccess, onCancel }) => {
  const { bookTickets } = useTicketActions();
  const isLoading = useIsLoading();
  const [quantity, setQuantity] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      quantity: 1,
    },
  });
  
  // Watch quantity for real-time total calculation
  const watchedQuantity = watch('quantity');
  
  /**
   * @pattern MemoizedValue
   * @rule ComputedValues
   * Memoized calculation of total price
   */
  const totalPrice = useMemo(() => {
    return (watchedQuantity || 1) * match.price;
  }, [watchedQuantity, match.price]);
  
  /**
   * @pattern MemoizedCallback
   * @rule StableReferences
   * Memoized form submission handler
   */
  const onSubmitForm = useCallback(async (data: BookingFormData) => {
    try {
      await bookTickets({
        matchId: match.id,
        quantity: Number(data.quantity),
        totalPrice,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
      });
      onSuccess();
    } catch (error) {
      // Error is handled by the store
    }
  }, [bookTickets, match.id, totalPrice, onSuccess]);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">Book Tickets</h2>
        <h3 className="text-lg font-semibold mb-2">{match.homeTeam} vs {match.awayTeam}</h3>
        <p className="text-sm mb-4">
          {match.date} at {match.venue}
        </p>
        
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4" data-testid="booking-form">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.customerName ? 'input-error' : ''}`}
              {...register('customerName')}
              data-testid="customer-name-input"
            />
            {errors.customerName && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.customerName.message}</span>
              </label>
            )}
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className={`input input-bordered ${errors.customerEmail ? 'input-error' : ''}`}
              {...register('customerEmail')}
              data-testid="customer-email-input"
            />
            {errors.customerEmail && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.customerEmail.message}</span>
              </label>
            )}
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Number of Tickets</span>
            </label>
            <div className="flex items-center">
              <button 
                type="button"
                className="btn btn-square btn-sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className={`input input-bordered w-20 mx-2 text-center ${errors.quantity ? 'input-error' : ''}`}
                min="1"
                max={match.availableTickets}
                {...register('quantity', { valueAsNumber: true })}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                data-testid="quantity-input"
              />
              <button 
                type="button"
                className="btn btn-square btn-sm"
                onClick={() => setQuantity(Math.min(match.availableTickets, quantity + 1))}
                disabled={quantity >= match.availableTickets}
              >
                +
              </button>
              <span className="ml-4">
                Available: <span className="font-semibold">{match.availableTickets}</span>
              </span>
            </div>
            {errors.quantity && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.quantity.message}</span>
              </label>
            )}
          </div>
          
          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Price per ticket:</span>
              <span className="text-lg font-semibold">${match.price}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg">Total price:</span>
              <span className="text-xl font-bold">${totalPrice}</span>
            </div>
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading || match.availableTickets < 1}
              data-testid="submit-booking-button"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                'Book Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 