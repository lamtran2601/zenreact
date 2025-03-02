import React from 'react';
import { render } from '@testing-library/react';
import { withOptimization } from '../withOptimization';
describe('withOptimization', () => {
    it('renders component with initial props', () => {
        const TestComponent = ({ text }) => React.createElement("div", null, text);
        const OptimizedComponent = withOptimization(TestComponent);
        const { getByText } = render(React.createElement(OptimizedComponent, { text: "Hello" }));
        expect(getByText('Hello')).toBeInTheDocument();
    });
    it('updates when props change', () => {
        const TestComponent = ({ text }) => React.createElement("div", null, text);
        const OptimizedComponent = withOptimization(TestComponent);
        const { getByText, rerender } = render(React.createElement(OptimizedComponent, { text: "Hello" }));
        expect(getByText('Hello')).toBeInTheDocument();
        rerender(React.createElement(OptimizedComponent, { text: "World" }));
        expect(getByText('World')).toBeInTheDocument();
    });
    it('prevents re-renders with same props', () => {
        const renderCount = jest.fn();
        const TestComponent = ({ text }) => {
            renderCount();
            return React.createElement("div", null, text);
        };
        const OptimizedComponent = withOptimization(TestComponent);
        const { rerender } = render(React.createElement(OptimizedComponent, { text: "Test" }));
        expect(renderCount).toHaveBeenCalledTimes(1);
        rerender(React.createElement(OptimizedComponent, { text: "Test" }));
        expect(renderCount).toHaveBeenCalledTimes(1); // Should not re-render
    });
    it('preserves component display name', () => {
        const TestComponent = ({ text }) => React.createElement("div", null, text);
        TestComponent.displayName = 'CustomTestComponent';
        const OptimizedComponent = withOptimization(TestComponent);
        expect(OptimizedComponent.displayName).toBe('ZenReact(CustomTestComponent)');
    });
});
//# sourceMappingURL=withOptimization.test.js.map