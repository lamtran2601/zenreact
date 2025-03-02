import React from 'react';
import { WithOptimization } from '../types';
import { simpleCompare } from '../utils/compare';

/**
 * A Higher Order Component that optimizes component re-renders using React.memo
 * with a simple comparison strategy.
 *
 * Features:
 * - Prevents unnecessary re-renders
 * - Uses shallow comparison for props
 * - Preserves component display name
 * - Type-safe implementation
 *
 * @param Component - The React component to optimize
 * @returns A memoized version of the component that only re-renders when props change
 *
 * @example
 * ```tsx
 * // Basic usage
 * interface UserCardProps {
 *   name: string;
 *   email: string;
 * }
 *
 * const UserCard = ({ name, email }: UserCardProps) => (
 *   <div>
 *     <h3>{name}</h3>
 *     <p>{email}</p>
 *   </div>
 * );
 *
 * // Create optimized version
 * const OptimizedUserCard = withOptimization(UserCard);
 *
 * // Usage in parent component
 * function UserList() {
 *   return (
 *     <div>
 *       {users.map(user => (
 *         <OptimizedUserCard
 *           key={user.id}
 *           name={user.name}
 *           email={user.email}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 *
 * // With conditional rendering
 * interface ToggleCardProps {
 *   isVisible: boolean;
 *   content: string;
 * }
 *
 * const ToggleCard = ({ isVisible, content }: ToggleCardProps) => (
 *   isVisible ? <div>{content}</div> : null
 * );
 *
 * // Only re-renders when isVisible or content actually change
 * const OptimizedToggleCard = withOptimization(ToggleCard);
 * ```
 */
export const withOptimization: WithOptimization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // Create a wrapped component that preserves the original props type
  const WrappedComponent: React.FC<P> = (props) => {
    return React.createElement(Component, props);
  };

  // Set display name for development tools
  WrappedComponent.displayName = `ZenReact_Wrapped(${
    Component.displayName || Component.name || 'Component'
  })`;

  const MemoizedComponent = React.memo(WrappedComponent, simpleCompare);

  // Set display name for the memoized component
  MemoizedComponent.displayName = `ZenReact(${
    Component.displayName || Component.name || 'Component'
  })`;

  return MemoizedComponent;
};
