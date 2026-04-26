"use client";

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production you could ship this to Sentry / LogRocket.
    if (process.env.NODE_ENV !== 'production') console.error("[ErrorBoundary] Section crashed:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 text-center text-slate-500">
          <p className="text-sm">This section failed to load. Refresh to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
