import { environment } from 'src/environments/environment';
import { Foncier } from './../../models/Foncier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoncierService {
  constructor(private http: HttpClient) {}

  param_url: string = 'foncier';

  // Get list of all fonciers from database
  getFonciers(matricule: any): Observable<Foncier[]> {
    return this.http.get<Foncier[]>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/all/${matricule}`
    );
  }

  // Post foncier
  addFoncier(data: FormData, matricule: any): Observable<Foncier> {
    return this.http.post<Foncier>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${matricule}`,
      data
    );
  }

  // Get foncier by id
  getFoncierById(id: string, matricule: any): Observable<Foncier> {
    return this.http.get<Foncier>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/${id}/${matricule}`
    );
  }

  updateFoncier(id: any, data: any, matricule: any): Observable<any> {
    return this.http.patch<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/modifier/${id}/${matricule}`,
      data
    );
  }

  deleteFoncier(id: any, data: any, matricule: any): Observable<Foncier> {
    return this.http.patch<Foncier>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/delete/${id}/${matricule}`,
      data
    );
  }
}
