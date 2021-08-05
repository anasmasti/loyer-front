import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proprietaire } from '../../models/Proprietaire';
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

  getProps(){
    return this.http.get('http://192.168.11.118:5000/api/v1/proprietaire/tous');
  }

  // Get list of all proprietaires from database
  getProprietaire(): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/tous`,
      { headers: this.httpOptions.headers }
    );
  }

  // Get one proprietaire by id from database
  getProprietaireById(id: string): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${id}`,
      { headers: this.httpOptions.headers }
    );
  }

  // Push the proprietaire data to database
  postProprietaire(data: Proprietaire): Observable<Proprietaire> {
    return this.http.post<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  // Update the proprietaire
  updateProprietaire(id: string, data: Proprietaire): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/modifier/${id}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  // Delete the proprietaire
  deleteProprietaire(id: string, data: any): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/supprimer/${id}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }
}
