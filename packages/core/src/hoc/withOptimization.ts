import React, { ComponentType, memo, PropsWithChildren } from 'react';
import type { WithOptimization } from '../types';
import { simpleCompare } from '../utils/compare';

export const withOptimization: WithOptimization = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const Wrapped: ComponentType<P> = (props: PropsWithChildren<P>) =>
    React.createElement(Component, props);

  const name = Component.displayName || Component.name || 'Component';
  const MemoizedComponent = memo(Wrapped, simpleCompare);

  if (process.env.NODE_ENV !== 'production') {
    MemoizedComponent.displayName = `ZenReact(${name})`;
  }

  return MemoizedComponent;
};
