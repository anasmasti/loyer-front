import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentProprietaire } from 'src/app/models/AssignmentProprietaire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentProprietaireService {
  param_url: string = 'assignment';
  
  constructor(private http: HttpClient) { }

    // Push the proprietaire data to database
    assignProprietaire(data: any, id_contrat: any, matricule: any): Observable<AssignmentProprietaire> {
      return this.http.post<AssignmentProprietaire>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/ajouter/${id_contrat}/${matricule}`,
        data
      );
    }
  
    // Update the proprietaire
    updateassignmentProprietaire(id: string, data: AssignmentProprietaire, matricule: any): Observable<AssignmentProprietaire> {
      return this.http.put<AssignmentProprietaire>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/modifier/${id}/${matricule}`,
        data
      );
    }
}