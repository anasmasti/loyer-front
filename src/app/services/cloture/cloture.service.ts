import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClotureService {

  constructor(private http: HttpClient) { }

  param_url: string = 'cloture';
  param_url1: string = 'situation-cloture';
  param_url2: string = 'all-etats/';
  // param_url3: string = 'etat-taxes/';
  // param_url4: string = 'etat-virement/';
  // all-etats/:matricule

  // Cloture this month
  Cloture(date: any, matricule: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${matricule}`, date);
  }

  situationCloture(date: any, matricule: any){
    return this.http.post<any>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url1}/${matricule}`, date);
  }

  getPathSituationCloture(mois: any, annee: any, data: any){
    return this.http.post<any>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url2 + mois + '/' + annee}`, data);
  }
}
