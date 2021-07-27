import { Lieu } from 'src/app/models/Lieu';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  constructor(private http: HttpClient) { }

  param_url: string = 'lieu';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all proprietaires from database
  getLieux(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all-lieu`,
      { headers: this.httpOptions.headers }
    );
  }

  // get specific "lieu" by his id
  getLieuById(id: String): Observable<Lieu> {
    return this.http.get<Lieu>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}` + id);
  }

  addLieu(data: Lieu): Observable<Lieu> {
    return this.http.post<Lieu>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter`, data);
  }

  // Update the proprietaire
  updateLieux(id: string, data: Lieu): Observable<Lieu> {
    return this.http.put<Lieu>(
      `${environment.API_URL + environment.API_VERSION + this.param_url}/edit/${id}`, data);
  }







}
