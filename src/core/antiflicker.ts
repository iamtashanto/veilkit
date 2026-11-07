/**
 * Veilkit - Anti-Flicker Timing Controller
 * Prevents UI flicker:
 * 1. delay (default 150ms): suppresses loading state if task completes very quickly
 * 2. minVisible (default 300ms): guarantees loader stays visible long enough to avoid rapid flashing
 */

export interface AntiFlickerOptions {
  delay?: number; // ms to wait before showing loader
  minVisible?: number; // min ms loader remains once shown
  onShow?: () => void;
  onHide?: () => void;
}

export class AntiFlickerController {
  private delay: number;
  private minVisible: number;
  private onShow?: () => void;
  private onHide?: () => void;

  private delayTimer: any = null;
  private minVisibleTimer: any = null;
  private shownTimestamp: number | null = null;
  private isVisible: boolean = false;
  private isPending: boolean = false;

  constructor(options: AntiFlickerOptions = {}) {
    this.delay = options.delay !== undefined ? options.delay : 150;
    this.minVisible = options.minVisible !== undefined ? options.minVisible : 300;
    this.onShow = options.onShow;
    this.onHide = options.onHide;
  }

  /**
   * Request loader to be shown (subject to delay)
   */
  public start(): void {
    if (this.isPending || this.isVisible) return;
    this.isPending = true;

    if (this.delay <= 0) {
      this.display();
      return;
    }

    this.delayTimer = setTimeout(() => {
      this.delayTimer = null;
      if (this.isPending) {
        this.display();
      }
    }, this.delay);
  }

  private display(): void {
    this.isPending = false;
    this.isVisible = true;
    this.shownTimestamp = Date.now();
    if (this.onShow) this.onShow();
  }

  /**
   * Request loader to be hidden (subject to minVisible)
   */
  public finish(callback?: () => void): void {
    // If it hasn't even shown yet, cancel the delay timer
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
      this.isPending = false;
      if (callback) callback();
      return;
    }

    if (!this.isVisible) {
      this.isPending = false;
      if (callback) callback();
      return;
    }

    const elapsed = this.shownTimestamp ? Date.now() - this.shownTimestamp : 0;
    const remaining = Math.max(0, this.minVisible - elapsed);

    if (remaining <= 0) {
      this.hide();
      if (callback) callback();
    } else {
      this.minVisibleTimer = setTimeout(() => {
        this.minVisibleTimer = null;
        this.hide();
        if (callback) callback();
      }, remaining);
    }
  }

  private hide(): void {
    this.isVisible = false;
    this.isPending = false;
    this.shownTimestamp = null;
    if (this.onHide) this.onHide();
  }

  public active(): boolean {
    return this.isVisible;
  }

  public destroy(): void {
    if (this.delayTimer) clearTimeout(this.delayTimer);
    if (this.minVisibleTimer) clearTimeout(this.minVisibleTimer);
    this.delayTimer = null;
    this.minVisibleTimer = null;
    this.isVisible = false;
    this.isPending = false;
  }
}
