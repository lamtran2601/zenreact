// Re-export hooks
export { useOptimizedState } from './hooks/useOptimizedState';

// Re-export HOCs
export { withOptimization } from './hoc/withOptimization';

// Feature flags for initial release
export const VERSION = '0.1.0';
export const FEATURES = {
  optimizedState: true,
  optimizedHOC: true,
  // Additional features to be added in future releases
  monitoring: false,
  modes: false,
};
