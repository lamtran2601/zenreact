import { ComponentType } from 'react';
export type OptimizedStateSetter<T> = (value: T) => void;
export type OptimizedStateHookResult<T> = [T, OptimizedStateSetter<T>];
export type WithOptimization = <P extends object>(Component: ComponentType<P>) => ComponentType<P>;
export type CompareFunction = <T>(val1: T, val2: T) => boolean;
