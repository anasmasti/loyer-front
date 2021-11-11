import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClotureService {

  constructor(private http: HttpClient) { }

  param_url: string = 'cloture';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  Cloture(date: any, matricule: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${matricule}`, date);
  }
}
