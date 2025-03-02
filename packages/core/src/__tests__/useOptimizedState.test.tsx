import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOptimizedState } from '../index';

describe('useOptimizedState', () => {
  it('handles basic state updates', () => {
    function TestComponent() {
      const [count, setCount] = useOptimizedState(0);
      return <button onClick={() => setCount(count + 1)}>{count}</button>;
    }

    const { getByText } = render(<TestComponent />);
    expect(getByText('0')).toBeInTheDocument();

    fireEvent.click(getByText('0'));
    expect(getByText('1')).toBeInTheDocument();
  });

  it('prevents unnecessary updates with same value', () => {
    const renderCount = jest.fn();

    function TestComponent() {
      const [count, setCount] = useOptimizedState(0);
      renderCount();
      return <button onClick={() => setCount(0)}>{count}</button>;
    }

    const { getByText } = render(<TestComponent />);
    expect(renderCount).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('0'));
    expect(renderCount).toHaveBeenCalledTimes(1); // Should not re-render
  });

  it('handles object state', () => {
    function TestComponent() {
      const [state, setState] = useOptimizedState({ count: 0 });
      return <button onClick={() => setState({ count: state.count + 1 })}>{state.count}</button>;
    }

    const { getByText } = render(<TestComponent />);
    expect(getByText('0')).toBeInTheDocument();

    fireEvent.click(getByText('0'));
    expect(getByText('1')).toBeInTheDocument();
  });
});
