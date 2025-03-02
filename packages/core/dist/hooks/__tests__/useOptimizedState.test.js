import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOptimizedState } from '../useOptimizedState';
describe('useOptimizedState', () => {
    it('initializes with provided value', () => {
        function TestComponent() {
            const [state] = useOptimizedState('initial');
            return React.createElement("div", null, state);
        }
        const { getByText } = render(React.createElement(TestComponent, null));
        expect(getByText('initial')).toBeInTheDocument();
    });
    it('updates state when value changes', () => {
        function TestComponent() {
            const [state, setState] = useOptimizedState('initial');
            return React.createElement("button", { onClick: () => setState('updated') }, state);
        }
        const { getByText } = render(React.createElement(TestComponent, null));
        fireEvent.click(getByText('initial'));
        expect(getByText('updated')).toBeInTheDocument();
    });
    it('prevents re-renders with same value', () => {
        const renderCount = jest.fn();
        function TestComponent() {
            const [state, setState] = useOptimizedState('test');
            renderCount();
            return React.createElement("button", { onClick: () => setState('test') }, state);
        }
        const { getByText } = render(React.createElement(TestComponent, null));
        expect(renderCount).toHaveBeenCalledTimes(1);
        fireEvent.click(getByText('test'));
        expect(renderCount).toHaveBeenCalledTimes(1); // Should not re-render
    });
    it('handles object state updates', () => {
        function TestComponent() {
            const [state, setState] = useOptimizedState({ count: 0 });
            return (React.createElement("button", { onClick: () => setState({ count: state.count + 1 }), "data-testid": "button" }, state.count));
        }
        const { getByTestId } = render(React.createElement(TestComponent, null));
        const button = getByTestId('button');
        expect(button).toHaveTextContent('0');
        fireEvent.click(button);
        expect(button).toHaveTextContent('1');
    });
    it('handles array state updates', () => {
        function TestComponent() {
            const [state, setState] = useOptimizedState([]);
            return (React.createElement("button", { onClick: () => setState([...state, state.length]), "data-testid": "button" }, state.join(',')));
        }
        const { getByTestId } = render(React.createElement(TestComponent, null));
        const button = getByTestId('button');
        expect(button).toHaveTextContent('');
        fireEvent.click(button);
        expect(button).toHaveTextContent('0');
        fireEvent.click(button);
        expect(button).toHaveTextContent('0,1');
    });
});
//# sourceMappingURL=useOptimizedState.test.js.map