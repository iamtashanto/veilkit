import { describe, it, expect } from 'vitest';
import { VeilService } from '../../src/angular/service';
import { VeilSkeletonComponent } from '../../src/angular/components';
import { veilHttpInterceptor } from '../../src/angular/interceptor';
import { of } from 'rxjs';

describe('Angular Adapter', () => {
  it('should initialize VeilService with signals and track loading state', () => {
    const service = new VeilService();
    expect(service.isLoading()).toBe(false);
    expect(service.activeCount()).toBe(0);

    const id = service.start();
    expect(service.isLoading()).toBe(true);
    expect(service.activeCount()).toBe(1);

    service.stop(id);
    expect(service.isLoading()).toBe(false);
    expect(service.activeCount()).toBe(0);
  });

  it('should render VeilSkeletonComponent into DOM', () => {
    const host = document.createElement('veil-skeleton');
    document.body.appendChild(host);

    const comp = new VeilSkeletonComponent({ nativeElement: host } as any);
    comp.type = 'heading';
    comp.width = '240px';
    comp.height = '32px';
    comp.animation = 'aurora';
    comp.theme = 'glass';

    comp.ngOnInit();

    const inner = host.querySelector('.veil-skeleton');
    expect(inner).not.toBeNull();
    expect(inner?.getAttribute('data-veil-shape')).toBe('heading');
    expect(inner?.getAttribute('data-veil-anim')).toBe('aurora');
    expect(inner?.getAttribute('data-veil-theme')).toBe('glass');

    host.remove();
  });

  it('should export veilHttpInterceptor function and track requests', () => {
    expect(typeof veilHttpInterceptor).toBe('function');
    const service = new VeilService();
    const fakeNext = () => of({ status: 200, data: 'test' });

    const id = service.start();
    expect(service.isLoading()).toBe(true);

    const fakeNext$ = fakeNext();
    let completed = false;
    fakeNext$.subscribe({
      complete: () => {
        service.stop(id);
        completed = true;
      },
    });

    expect(completed).toBe(true);
    expect(service.isLoading()).toBe(false);
  });
});
