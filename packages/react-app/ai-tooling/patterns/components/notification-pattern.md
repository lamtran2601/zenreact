# Notification Component Pattern

## Overview

The Notification Component pattern provides a structured approach to building notification components in React applications. It ensures consistent notification design, behavior, and user experience across the application.

## Pattern: NotificationComponent

```tsx
/**
 * @pattern NotificationComponent
 * @rule EfficientRendering
 * Notification component with auto-dismiss functionality
 */
export const ErrorAlert: FC<ErrorAlertProps> = ({ onClose }) => {
  const error = useError();
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, onClose]);
  
  if (!error) return null;
  
  return (
    <div className="alert alert-error">
      <span>{error}</span>
      <button className="btn btn-sm" onClick={onClose}>Dismiss</button>
    </div>
  );
};
```

## Key Characteristics

1. **Consistent Design**: Maintains consistent notification design
2. **Auto-Dismiss**: Implements automatic dismissal after a timeout
3. **Manual Dismissal**: Allows manual dismissal by the user
4. **Accessibility**: Ensures notifications are accessible to all users
5. **Performance**: Optimizes rendering of notification components

## Implementation Rules

### EfficientRendering

- Minimize DOM nesting
- Use conditional rendering to show/hide notifications
- Prevent unnecessary re-renders
- Clean up timers and event listeners

### StableReferences

- Use useCallback for event handlers
- Maintain stable references for callbacks
- Prevent unnecessary re-renders

## Best Practices

1. **Clear Messaging**: Provide clear, concise notification messages
2. **Appropriate Timing**: Set appropriate auto-dismiss timing
3. **Visual Hierarchy**: Establish clear visual hierarchy for different notification types
4. **Accessibility**: Ensure notifications are accessible to screen readers
5. **Non-Intrusive**: Design notifications to be informative but not intrusive

## Anti-Patterns

1. **Excessive Notifications**: Overwhelming users with too many notifications
2. **No Dismissal Option**: Not providing a way to manually dismiss notifications
3. **Unclear Messages**: Vague or technical error messages
4. **Permanent Notifications**: Notifications that don't auto-dismiss or can't be dismissed
5. **Inaccessible Notifications**: Notifications that aren't accessible to screen readers 