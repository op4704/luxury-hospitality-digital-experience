"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches render-time errors from the 3D scene (e.g. a WebGL context loss,
 * or any future reconciler edge case) so a single bad frame never takes
 * down the whole page in production. Falls back to the 2D map.
 */
export class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D explorer failed, falling back to map view:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
