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

  getProprietaire(): Observable<Proprietaire> {
    const url: string = 'posts';
    return this.http.get<Proprietaire>(environment.API_TEST + '/' + url);
  }

  PostProprietaire(data: Proprietaire): Observable<Proprietaire> {
    const url: string = 'posts';
    return this.http.post<Proprietaire>(environment.API_TEST + '/' + url, data);
  }
}
