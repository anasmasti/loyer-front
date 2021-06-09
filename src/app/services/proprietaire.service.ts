import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proprietaire } from '../models/proprietaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProprietaireService {
  constructor(private http: HttpClient) {}

  getProprietaire(): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(`${environment.API_URL}proprietaire`);
  }

  getProprietaireById(id: string): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(`${environment.API_URL}proprietaire/${id}`);
  }

  PostProprietaire(data: Proprietaire): Observable<Proprietaire> {
    return this.http.post<Proprietaire>(environment.API_URL, data);
  }
}
