import { Injectable, inject, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private toastIdCounter = 0;

  /**
   * Show success toast notification
   */
  success(message: string, duration = 3000): string {
    return this.show(message, 'success', duration);
  }

  /**
   * Show error toast notification
   */
  error(message: string, duration = 4000): string {
    return this.show(message, 'error', duration);
  }

  /**
   * Show info toast notification
   */
  info(message: string, duration = 3000): string {
    return this.show(message, 'info', duration);
  }

  /**
   * Show warning toast notification
   */
  warning(message: string, duration = 3000): string {
    return this.show(message, 'warning', duration);
  }

  /**
   * Add toast notification
   */
  private show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration = 3000
  ): string {
    const id = `toast-${++this.toastIdCounter}`;
    const toast: Toast = { id, message, type, duration };

    this.toasts.update((current) => [...current, toast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  /**
   * Remove toast by ID
   */
  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts.set([]);
  }
}
