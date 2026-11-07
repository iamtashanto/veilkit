import { inject } from '@angular/core';
import { VeilService } from './service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * Functional HTTP Interceptor for Angular 17+ (provideHttpClient(withInterceptors([veilHttpInterceptor])))
 */
export function veilHttpInterceptor(req: any, next: any): Observable<any> {
  const veilService = inject(VeilService);
  const id = veilService.start();

  return next(req).pipe(
    finalize(() => {
      veilService.stop(id);
    }),
  );
}
