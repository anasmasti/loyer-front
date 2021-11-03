import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  getChartCircl() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}chart/circl`
    );
  }

  getChartAdvancedCircl() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}chart/advanced-circl`
    );
  }

  getChartBarH() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}chart/bar-h`
    );
  }

  getChartBarV() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}chart/bar-v`
    );
  }

}
