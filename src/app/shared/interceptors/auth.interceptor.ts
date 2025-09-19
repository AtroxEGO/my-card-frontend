import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const cloned = req.clone({
      // headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
    });
    return next(cloned);
  }

  return next(req);
};
