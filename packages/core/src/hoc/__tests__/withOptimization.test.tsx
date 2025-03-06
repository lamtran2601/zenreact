import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withOptimization } from '../withOptimization';

interface TestProps {
  text: string;
}

describe('withOptimization', () => {
  const TestComponent: React.FC<TestProps> = ({ text }) => <div>{text}</div>;

  it('should render the wrapped component', () => {
    const OptimizedComponent = withOptimization(TestComponent);
    const { getByText } = render(<OptimizedComponent text="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('should preserve the displayName', () => {
    const TestComponentWithName = TestComponent;
    TestComponentWithName.displayName = 'TestComponent';

    const OptimizedComponent = withOptimization(TestComponentWithName);
    expect(OptimizedComponent.displayName).toBe('withOptimization(TestComponent)');
  });

  it('should use custom name from options', () => {
    const OptimizedComponent = withOptimization(TestComponent, { name: 'CustomName' });
    expect(OptimizedComponent.displayName).toBe('withOptimization(CustomName)');
  });

  it('should apply memoization', () => {
    const renderSpy = jest.fn();
    const MemoTestComponent: React.FC<TestProps> = (props) => {
      renderSpy();
      return <TestComponent {...props} />;
    };

    const OptimizedComponent = withOptimization(MemoTestComponent);
    const { rerender } = render(<OptimizedComponent text="test" />);

    expect(renderSpy).toHaveBeenCalledTimes(1);

    // Rerender with same props
    rerender(<OptimizedComponent text="test" />);
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // Rerender with different props
    rerender(<OptimizedComponent text="different" />);
    expect(renderSpy).toHaveBeenCalledTimes(2);
  });
});
