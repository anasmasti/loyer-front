import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  param_url: string = 'reporting';

  constructor(private http: HttpClient) {}

  // Generate reportings
  generateReportings(route: any): Observable<any> {
    return this.http.get<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION
      }generate/${route}`
    );
  }

  getReportings(route: string, data: string): Observable<any> {
    return this.http.post<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION 
      }${route}`, data
    );
  }
}


