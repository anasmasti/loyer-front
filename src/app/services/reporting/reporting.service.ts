import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  param_url: string = 'reporting';

  constructor(private http: HttpClient) { }

  // Generate reportings
  generateReportings(matricule: any, data: any,type_reporting: any): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/generate/${matricule}/${type_reporting}`, data
    );
  }

  downloadLieuxReporting() {
    console.log('done');
  }

  downloadContratReporting() {
    console.log('done');
  }

}
