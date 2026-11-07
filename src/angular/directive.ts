import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { createAutoMeasureOverlay } from '../core/measure';
import { injectStyles } from '../core/css';

@Directive({
  selector: '[veil]',
  standalone: true,
})
export class VeilDirective implements OnChanges, OnDestroy {
  @Input('veil') loading: boolean = false;
  @Input('veilCacheKey') cacheKey?: string;
  @Input('veilPersistCache') persistCache?: boolean;
  @Input('veilReveal') reveal?: 'fade' | 'blur-in' | 'slide-up' | 'scale' | 'none';

  private overlayInstance: ReturnType<typeof createAutoMeasureOverlay> | null = null;

  constructor(private el: ElementRef<HTMLElement>) {
    injectStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.updateState();
    }
  }

  private updateState(): void {
    const nativeEl = this.el.nativeElement;
    if (this.loading && !this.overlayInstance) {
      this.overlayInstance = createAutoMeasureOverlay(nativeEl, {
        cacheKey: this.cacheKey,
        persistCache: this.persistCache,
        reveal: this.reveal || 'fade',
      });
      nativeEl.setAttribute('aria-busy', 'true');
    } else if (!this.loading && this.overlayInstance) {
      this.overlayInstance.destroy();
      this.overlayInstance = null;
      nativeEl.removeAttribute('aria-busy');
    }
  }

  ngOnDestroy(): void {
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
      this.overlayInstance = null;
    }
  }
}
