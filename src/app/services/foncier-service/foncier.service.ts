import { environment } from 'src/environments/environment';
import { Foncier } from './../../models/Foncier';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoncierService {

  constructor(private http: HttpClient) { }

  param_url: string = 'foncier';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all fonciers from database
  getFonciers(): Observable<Foncier[]> {
    return this.http.get<Foncier[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all`,
      { headers: this.httpOptions.headers }
    );
  }
}
