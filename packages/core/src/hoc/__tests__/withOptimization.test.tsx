import React from 'react';
import { render } from '@testing-library/react';
import { withOptimization } from '../withOptimization';

describe('withOptimization', () => {
  it('renders component with initial props', () => {
    const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;
    const OptimizedComponent = withOptimization(TestComponent);

    const { getByText } = render(<OptimizedComponent text="Hello" />);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('updates when props change', () => {
    const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;
    const OptimizedComponent = withOptimization(TestComponent);

    const { getByText, rerender } = render(<OptimizedComponent text="Hello" />);
    expect(getByText('Hello')).toBeInTheDocument();

    rerender(<OptimizedComponent text="World" />);
    expect(getByText('World')).toBeInTheDocument();
  });

  it('prevents re-renders with same props', () => {
    const renderCount = jest.fn();
    const TestComponent = ({ text }: { text: string }) => {
      renderCount();
      return <div>{text}</div>;
    };

    const OptimizedComponent = withOptimization(TestComponent);

    const { rerender } = render(<OptimizedComponent text="Test" />);
    expect(renderCount).toHaveBeenCalledTimes(1);

    rerender(<OptimizedComponent text="Test" />);
    expect(renderCount).toHaveBeenCalledTimes(1); // Should not re-render
  });

  it('preserves component display name', () => {
    const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;
    TestComponent.displayName = 'CustomTestComponent';

    const OptimizedComponent = withOptimization(TestComponent);
    expect(OptimizedComponent.displayName).toBe('ZenReact(CustomTestComponent)');
  });
});
