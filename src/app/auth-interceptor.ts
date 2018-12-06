import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2' +
    'NsYWltcy9zaWQiOiIzMyIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lc' +
    'i5jb20iLCJuYmYiOjE1MzgxNDgzMDcsImV4cCI6MTU5ODE0ODI0NywiaWF0IjoxNTM4MTQ4MzA3fQ.jbjbrc0A1nb-HdjIZV0FNVcFGs808jPSzs6fH_XAUY4';

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
    });

    return next.handle(req1);
  }

}
