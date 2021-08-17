import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  param_url: string = 'contrat';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all proprietaires from database
  getContrat(): Observable<Contrat> {
    return this.http.get<Contrat>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/tous/`, { headers: this.httpOptions.headers });
  }

  //get details contrat by id
  getSelectedContrat(id: String) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/details/${id}`, { headers: this.httpOptions.headers });
  }

  updateContrat(id: String, contrat: Contrat) {
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/modifier/${id}`, contrat, { headers: this.httpOptions.headers });
  }

  updateContratNvEtat(id: String, contrat: Contrat, nvEtatContrat: any, oldEtatContrat: any) {
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/modifierNvEtat/${id}`, {
      oldEtat: oldEtatContrat,
      NewEtat: nvEtatContrat,
      contrat: contrat
    }, { headers: this.httpOptions.headers });
  }

  addContrat(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter`, formdata, { headers: this.httpOptions.headers });
  }

  deleteContrat(id: String) {
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/supprimer/${id}`, { deleted: true }, { headers: this.httpOptions.headers });
  }



}
