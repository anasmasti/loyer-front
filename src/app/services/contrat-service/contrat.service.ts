import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContratService {
  constructor(private http: HttpClient) {}

  param_url: string = 'contrat';

  // Get list of all proprietaires from database
  getContrat(): Observable<Contrat> {
    return this.http.get<Contrat>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/tous`
    );
  }

  //get details contrat by id
  getSelectedContrat(id: String) {
    return this.http.get(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/details/${id}`
    );
  }

  updateContrat(id: String, formdata: any): Observable<any> {
    return this.http.patch<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/modifier/${id}`,
      formdata
    );
  }

  addContrat(formdata: any, matricule: any, IdFoncier: any): Observable<any> {
    return this.http.post<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${IdFoncier}/${matricule}`,
      formdata
    );
  }

  deleteContrat(id: String, matricule: any) {
    return this.http.put(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/supprimer/${id}/${matricule}`,
      { deleted: true }
    );
  }

  updateValidation1Contrat(id: string, matricule: any): Observable<any> {
    return this.http.put<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/validation1/${id}/${matricule}`,
      ''
    );
  }

  updateValidation2Contrat(id: string, matricule: any): Observable<any> {
    return this.http.put<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/validation2/${id}/${matricule}`,
      ''
    );
  }

  updateSoumettre(id: string, matricule: any): Observable<any> {
    return this.http.put<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/soumettre/${id}/${matricule}`,
      ''
    );
  }

  annulerContrat(id: string, matricule: any): Observable<any> {
    return this.http.put<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/annuler-contrat/${id}/${matricule}`,
      ''
    );
  }
}
