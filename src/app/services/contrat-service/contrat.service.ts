import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ContratService {
  constructor(private http: HttpClient) {}

  param_url: string = 'contrat';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all proprietaires from database
  getContrat(): Observable<Contrat> {
    return this.http.get<Contrat>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/tous`,
      { headers: this.httpOptions.headers }
    );
  }

  //get details contrat by id
  getSelectedContrat(id: String, matricule: any) {
    return this.http.get(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/details/${id}/${matricule}`,
      { headers: this.httpOptions.headers }
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

  // updateContratNvEtat(id: String, contrat: Contrat, nvEtatContrat: any, oldEtatContrat: any) {
  //   return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/modifierNvEtat/${id}`, {
  //     oldEtat: oldEtatContrat,
  //     NewEtat: nvEtatContrat,
  //     contrat: contrat
  //   }, { headers: this.httpOptions.headers });
  // }

  addContrat(formdata: any, matricule: any): Observable<any> {
    return this.http.post<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${matricule}`,
      formdata
    );
  }

  deleteContrat(id: String, matricule: any) {
    return this.http.put(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/supprimer/${id}/${matricule}`,
      { deleted: true },
      { headers: this.httpOptions.headers }
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


}
