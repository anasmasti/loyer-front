import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Header globale setup
    const header = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Api-Key-Access': environment.API_ACCESS_KEY,
      })
    })

    return next.handle(request);
  }
  
}
