import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, throttleTime, take, pluck, mergeMap, debounceTime } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Reload page
  refrechPage() {
    location.reload();
  }

  toTheUp() {
    window.scroll(0, 0);
  }

  // Get all counts from server
  getAllCounts() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/count-all`,
      { headers: this.httpOptions.headers }
    );
  }

  getCities(isoCode: string) {
    return this.http
      .get(
        `${
          environment.API_URL_TEST + environment.API_VERSION
        }/cities/${isoCode}`
      )
      
  }

  getCountries() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/countries`
    );
  }
}
