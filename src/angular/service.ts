import { Injectable, signal, computed } from '@angular/core';
import { loadingManager } from '../core/manager';
import { progressController } from '../core/progress';
import { overlayController } from '../core/overlay';
import veil from '../core/controller';
import { VeilGlobalConfig } from '../core/types';

@Injectable({
  providedIn: 'root',
})
export class VeilService {
  private _loadingCount = signal(0);

  public readonly isLoading = computed(() => this._loadingCount() > 0);
  public readonly activeCount = computed(() => this._loadingCount());

  constructor() {
    loadingManager.subscribe((_, count) => {
      this._loadingCount.set(count);
    });
  }

  public configure(config: VeilGlobalConfig): void {
    veil.configure(config);
  }

  public start(id?: string): string {
    return loadingManager.start(id);
  }

  public stop(id?: string): void {
    loadingManager.stop(id);
  }

  public progress = progressController;
  public overlay = overlayController;
  public core = veil;
}
