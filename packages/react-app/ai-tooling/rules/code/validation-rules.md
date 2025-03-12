# Validation Rules

## Overview

These rules define standards for implementing validation in React applications. They cover form validation, data validation, and error handling patterns.

## Rule: ValidationHandling

Ensures consistent validation handling across the application.

### Implementation

- Use schema-based validation with Zod or similar libraries
- Display validation errors clearly next to relevant fields
- Provide real-time validation feedback when appropriate
- Handle server-side validation errors

### Example

```tsx
/**
 * @pattern FormComponent
 * @rule ValidationHandling
 * Form with comprehensive validation handling
 */
const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data) => {
    try {
      await submitBooking(data);
      // Success handling
    } catch (error) {
      if (error.validationErrors) {
        // Handle server-side validation errors
        setServerErrors(error.validationErrors);
      } else {
        // Handle other errors
        setError('submission', { message: 'An error occurred' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && (
          <span className="error">{errors.name.message}</span>
        )}
      </div>
      
      {/* Other form fields */}
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Best Practices

1. **Schema Definition**: Define validation schemas separately from components
2. **Error Messaging**: Provide clear, user-friendly error messages
3. **Validation Timing**: Choose appropriate validation timing (blur, change, submit)
4. **Field Dependencies**: Handle fields that depend on other fields
5. **Accessibility**: Ensure validation errors are accessible to screen readers

## Anti-Patterns

1. **Inconsistent Validation**: Using different validation approaches across the application
2. **Unclear Errors**: Displaying technical or cryptic error messages
3. **Missing Feedback**: Not providing immediate feedback for validation errors
4. **Redundant Validation**: Duplicating validation logic between client and server
5. **Blocking Valid Input**: Overly restrictive validation that prevents valid input 