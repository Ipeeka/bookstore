import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.currentUserSubject()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.currentUserSubject()?.token}`,
      },
    });
  }

  return next(req);
};
