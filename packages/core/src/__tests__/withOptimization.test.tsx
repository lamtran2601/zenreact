import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withOptimization } from '../index';

describe('withOptimization', () => {
  // Test component that displays a count prop
  const Counter: React.FC<{ count: number }> = ({ count }) => {
    return <div data-testid="counter">{count}</div>;
  };

  // Optimized version of the counter
  const OptimizedCounter = withOptimization(Counter);

  it('renders component with initial props', () => {
    render(<OptimizedCounter count={1} />);
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
  });

  it('updates when props change', () => {
    const { rerender } = render(<OptimizedCounter count={1} />);
    expect(screen.getByTestId('counter')).toHaveTextContent('1');

    rerender(<OptimizedCounter count={2} />);
    expect(screen.getByTestId('counter')).toHaveTextContent('2');
  });

  it('prevents unnecessary re-renders with same props', () => {
    // Create a mock component to track renders
    const renderMock = jest.fn();
    const MockComponent: React.FC<{ value: string }> = ({ value }) => {
      renderMock();
      return <div>{value}</div>;
    };

    const OptimizedMock = withOptimization(MockComponent);

    const { rerender } = render(<OptimizedMock value="test" />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(<OptimizedMock value="test" />);
    expect(renderMock).toHaveBeenCalledTimes(1); // Should not re-render

    // Re-render with different props
    rerender(<OptimizedMock value="changed" />);
    expect(renderMock).toHaveBeenCalledTimes(2); // Should re-render
  });
});
