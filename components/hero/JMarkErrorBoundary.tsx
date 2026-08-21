"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { hasError: boolean };

/** Sem isto, um GLB ausente derruba a árvore R3F inteira em vez de cair pro fallback. */
export class JMarkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silencioso de propósito: a ausência do GLB é o caminho esperado
    // até alguém colocar um modelo real em /public/models.
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
