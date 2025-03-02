import React, { memo } from 'react';
import { simpleCompare } from '../utils/compare';
export const withOptimization = (Component) => {
    const Wrapped = (props) => React.createElement(Component, props);
    const name = Component.displayName || Component.name || 'Component';
    const MemoizedComponent = memo(Wrapped, simpleCompare);
    if (process.env.NODE_ENV !== 'production') {
        MemoizedComponent.displayName = `ZenReact(${name})`;
    }
    return MemoizedComponent;
};
//# sourceMappingURL=withOptimization.js.map