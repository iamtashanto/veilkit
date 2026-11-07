/**
 * Veilkit - Global Loading Manager
 * Manages concurrent requests using request IDs and counter.
 * Ensures loader remains active until all pending operations finish.
 */

type Listener = (isLoading: boolean, count: number) => void;

export class LoadingManager {
  private activeIds = new Set<string>();
  private counter: number = 0;
  private listeners = new Set<Listener>();

  /**
   * Start a loading operation. Optionally associate with a unique ID.
   */
  public start(id?: string): string {
    const key = id || `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    if (!this.activeIds.has(key)) {
      this.activeIds.add(key);
      this.counter++;
      this.notify();
    }
    return key;
  }

  /**
   * Complete a loading operation by ID or decrement counter.
   */
  public stop(id?: string): void {
    if (id) {
      if (this.activeIds.has(id)) {
        this.activeIds.delete(id);
        this.counter = Math.max(0, this.counter - 1);
        this.notify();
      }
    } else {
      if (this.counter > 0) {
        this.counter--;
        // Remove an arbitrary id if any
        const first = this.activeIds.values().next().value;
        if (first) this.activeIds.delete(first);
        this.notify();
      }
    }
  }

  /**
   * True if there is at least one active operation
   */
  public isLoading(): boolean {
    return this.counter > 0;
  }

  /**
   * Current number of concurrent operations
   */
  public getCount(): number {
    return this.counter;
  }

  /**
   * Subscribe to state changes
   */
  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Initial emission
    listener(this.isLoading(), this.counter);

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Reset all active requests
   */
  public reset(): void {
    this.activeIds.clear();
    this.counter = 0;
    this.notify();
  }

  private notify(): void {
    const loading = this.isLoading();
    for (const listener of this.listeners) {
      listener(loading, this.counter);
    }
  }
}

export const loadingManager = new LoadingManager();
