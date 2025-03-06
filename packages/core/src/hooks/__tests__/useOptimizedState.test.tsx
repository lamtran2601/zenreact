import { renderHook, act } from '@testing-library/react-hooks';
import { useOptimizedState } from '../useOptimizedState';

describe('useOptimizedState', () => {
  it('should initialize with the given value', () => {
    const { result } = renderHook(() => useOptimizedState(0));
    expect(result.current[0]).toBe(0);
  });

  it('should update state when value changes', () => {
    const { result } = renderHook(() => useOptimizedState(0));

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('should not update state when same value is set', () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useOptimizedState(0);
    });

    const initialRenderCount = renderCount;

    act(() => {
      result.current[1](0);
    });

    expect(renderCount).toBe(initialRenderCount);
    expect(result.current[0]).toBe(0);
  });

  it('should work with object values', () => {
    const initialObj = { count: 0 };
    const { result } = renderHook(() => useOptimizedState(initialObj));

    const newObj = { count: 1 };
    act(() => {
      result.current[1](newObj);
    });

    expect(result.current[0]).toEqual(newObj);
  });

  it('should work with null and undefined', () => {
    const { result } = renderHook(() => useOptimizedState<number | null>(null));

    act(() => {
      result.current[1](0);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toBe(null);
  });
});
