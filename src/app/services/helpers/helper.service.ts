import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };
  

  refrechPage() {
    location.reload();
  }

  getAllCount() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/count-all`,
      { headers: this.httpOptions.headers }
    );
  }
}
