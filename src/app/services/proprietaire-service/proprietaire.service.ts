import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proprietaire } from '../../models/proprietaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProprietaireService {
  param_url: string = 'proprietaire';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  constructor(private http: HttpClient) {}

  // Get list of all proprietaires from database
  getProprietaire(matricule: any): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/tous/${matricule}`,
      { headers: this.httpOptions.headers }
    );
  }

  // Get one proprietaire by id from database
  getProprietaireById(id: string, matricule: any): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${id}/${matricule}`,
      { headers: this.httpOptions.headers }
    );
  }

  // Push the proprietaire data to database
  postProprietaire(data: any, id_lieu: any, matricule: any): Observable<Proprietaire> {
    return this.http.post<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${id_lieu}/${matricule}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  // Update the proprietaire
  updateProprietaire(id: string, data: Proprietaire, matricule: any): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/modifier/${id}/${matricule}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  // Delete the proprietaire
  deleteProprietaire(id: string, data: any, matricule: any): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/supprimer/${id}/${matricule}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  getLieuIdByProprietaire(id: string, matricule: any): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/lieu/lieubyproprietaire/${id}/${matricule}`,
      { headers: this.httpOptions.headers }
    );
  }
}
