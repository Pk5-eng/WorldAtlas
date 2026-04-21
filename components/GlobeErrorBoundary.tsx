'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class GlobeErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Globe render failed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-slate-400">
          The globe could not render. Your browser may not support WebGL — try a recent desktop Chrome, Safari, or Firefox.
        </div>
      );
    }
    return this.props.children;
  }
}
