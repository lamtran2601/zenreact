import { useState } from 'react';
import { simpleCompare } from '../utils/compare';
export function useOptimizedState(initialState) {
    const [state, setState] = useState(initialState);
    function setOptimizedState(value) {
        if (!simpleCompare(state, value)) {
            setState(value);
        }
    }
    return [state, setOptimizedState];
}
//# sourceMappingURL=useOptimizedState.js.map