import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient, private pipeDate: DatePipe) {}

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

  getCities() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/cities`
    );
  }

  getCountries() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/countries`
    );
  }

  checkServerConnectivity(): Observable<Boolean> {
    return this.http.get<Boolean>(
      `${environment.API_URL_TEST + environment.API_VERSION}`
    );
  }

  booleanToText(value: boolean) {
    let text!: string;
    value ? (text = 'Oui') : (text = 'Non');
    return text;
  }

  formatDate(date: Date) {
    return this.pipeDate.transform(date, 'yyyy-MM-dd');
  }

  getNextClotureDate() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/next-cloture`
    );
  }

    // Check if all inputs has invalid errors
    // mainCheckInputsValidation(targetInput: any) {
    //   return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
    // }

}
