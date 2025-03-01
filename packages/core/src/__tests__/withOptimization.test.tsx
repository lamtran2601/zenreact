import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withOptimization, getOptimizationStats } from '../index';

describe('withOptimization', () => {
  // Basic component that displays its props
  const TestComponent: React.FC<{ data: unknown }> = ({ data }) => (
    <div data-testid="test-component">{JSON.stringify(data)}</div>
  );

  // Reset performance tracking between tests
  beforeEach(() => {
    jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    jest.spyOn(performance, 'now').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders component with initial props', () => {
    const OptimizedComponent = withOptimization(TestComponent);
    render(<OptimizedComponent data={{ test: 'value' }} />);
    expect(screen.getByTestId('test-component')).toHaveTextContent('{"test":"value"}');
  });

  it('updates when props change', () => {
    const OptimizedComponent = withOptimization(TestComponent);
    const { rerender } = render(<OptimizedComponent data={{ test: 'initial' }} />);
    expect(screen.getByTestId('test-component')).toHaveTextContent('{"test":"initial"}');

    rerender(<OptimizedComponent data={{ test: 'updated' }} />);
    expect(screen.getByTestId('test-component')).toHaveTextContent('{"test":"updated"}');
  });

  it('prevents re-renders with same props', () => {
    const renderMock = jest.fn();
    const MockComponent: React.FC<{ value: string }> = ({ value }) => {
      renderMock();
      return <div>{value}</div>;
    };

    const OptimizedComponent = withOptimization(MockComponent);

    const { rerender } = render(<OptimizedComponent value="test" />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(<OptimizedComponent value="test" />);
    expect(renderMock).toHaveBeenCalledTimes(1); // Should not re-render

    // Re-render with different props
    rerender(<OptimizedComponent value="changed" />);
    expect(renderMock).toHaveBeenCalledTimes(2); // Should re-render
  });

  it('tracks performance metrics when enabled', () => {
    const debugSpy = jest.spyOn(console, 'debug');
    const OptimizedComponent = withOptimization(TestComponent, { track: true });

    const { rerender } = render(<OptimizedComponent data={{ test: 'initial' }} />);
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ZenReact]'),
      expect.stringContaining('Renders: 1'),
      expect.any(String),
      expect.any(String)
    );

    rerender(<OptimizedComponent data={{ test: 'initial' }} />);
    const stats = getOptimizationStats(debugSpy.mock.calls[0][0].split(' ')[1].replace(':', ''));
    expect(stats).toBeDefined();
    if (stats) {
      expect(stats.totalRenders).toBeGreaterThan(0);
      expect(stats.preventedRenders).toBeGreaterThan(0);
    }
  });

  it('handles deep object comparisons correctly', () => {
    const renderMock = jest.fn();
    const DeepComponent: React.FC<{ nested: { deep: { value: number } } }> = ({ nested }) => {
      renderMock();
      return <div>{nested.deep.value}</div>;
    };

    const OptimizedComponent = withOptimization(DeepComponent);

    const { rerender } = render(<OptimizedComponent nested={{ deep: { value: 1 } }} />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Re-render with same deep structure
    rerender(<OptimizedComponent nested={{ deep: { value: 1 } }} />);
    expect(renderMock).toHaveBeenCalledTimes(1); // Should not re-render

    // Re-render with different deep value
    rerender(<OptimizedComponent nested={{ deep: { value: 2 } }} />);
    expect(renderMock).toHaveBeenCalledTimes(2); // Should re-render
  });

  it('supports custom comparison functions', () => {
    const renderMock = jest.fn();
    const ArrayComponent: React.FC<{ items: number[] }> = ({ items }) => {
      renderMock();
      return <div>{items.join(',')}</div>;
    };

    // Custom compare that only cares about array length
    const lengthCompare = (prev: { items: number[] }, next: { items: number[] }) =>
      prev.items.length === next.items.length;

    const OptimizedComponent = withOptimization(ArrayComponent, { compare: lengthCompare });

    const { rerender } = render(<OptimizedComponent items={[1, 2]} />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Re-render with different numbers but same length
    rerender(<OptimizedComponent items={[3, 4]} />);
    expect(renderMock).toHaveBeenCalledTimes(1); // Should not re-render (same length)

    // Re-render with different length
    rerender(<OptimizedComponent items={[1, 2, 3]} />);
    expect(renderMock).toHaveBeenCalledTimes(2); // Should re-render
  });

  it('handles array props correctly', () => {
    const renderMock = jest.fn();
    const ListComponent: React.FC<{ items: string[] }> = ({ items }) => {
      renderMock();
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    };

    const OptimizedComponent = withOptimization(ListComponent);

    const { rerender } = render(<OptimizedComponent items={['a', 'b']} />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Re-render with same array contents
    rerender(<OptimizedComponent items={['a', 'b']} />);
    expect(renderMock).toHaveBeenCalledTimes(1); // Should not re-render

    // Re-render with different array
    rerender(<OptimizedComponent items={['a', 'b', 'c']} />);
    expect(renderMock).toHaveBeenCalledTimes(2); // Should re-render
  });
});
