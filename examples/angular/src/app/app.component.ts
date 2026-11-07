import { Component } from '@angular/core';
import {
  VeilSkeletonComponent,
  VeilSpinnerComponent,
  VeilProgressBarComponent,
  VeilDirective,
  VeilService,
} from 'veilkit/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VeilSkeletonComponent,
    VeilSpinnerComponent,
    VeilProgressBarComponent,
    VeilDirective,
  ],
  template: `
    <div style="max-width: 800px; margin: 40px auto; font-family: system-ui; padding: 20px;">
      <h1>Veilkit + Angular Standalone Example</h1>

      <div style="display: flex; gap: 12px; margin-bottom: 24px;">
        <button (click)="loading = !loading">Toggle [veil] Directive</button>
        <button (click)="veil.progress.start()">Start Progress</button>
        <button (click)="veil.progress.done()">Done</button>
      </div>

      <h2>1. [veil] Directive</h2>
      <div [veil]="loading" style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h3>Angular Signals & Zoneless Ready</h3>
        <p>Measured and masked seamlessly with Angular 17/18/19.</p>
        <button>Details</button>
      </div>

      <h2>2. Standalone Components</h2>
      <div style="display: flex; gap: 16px; align-items: center; margin-top: 20px;">
        <veil-skeleton type="heading" [width]="'200px'" [height]="'24px'" animation="aurora"></veil-skeleton>
        <veil-spinner type="ios-activity" [size]="'32px'"></veil-spinner>
      </div>
    </div>
  `,
})
export class AppComponent {
  loading = true;
  constructor(public veil: VeilService) {}
}
