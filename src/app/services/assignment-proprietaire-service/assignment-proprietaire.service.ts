import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AssignmentProprietaire } from 'src/app/models/AssignmentProprietaire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentProprietaireService {
  param_url: string = 'affectation-proprietaire';
  
  constructor(private http: HttpClient) { }

    // Push the proprietaire data to database
    assignProprietaire(data: any, id_contrat: any, matricule: any): Observable<AssignmentProprietaire> {
      return this.http.post<AssignmentProprietaire>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/ajouter/${id_contrat}/${matricule}`,
        data
      ).pipe(shareReplay());
    }
  
    // Update the proprietaire
    updateassignmentProprietaire(id: string, data: AssignmentProprietaire, matricule: any): Observable<AssignmentProprietaire> {
      return this.http.put<AssignmentProprietaire>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/modifier/${id}/${matricule}`,
        data
      );
    }

    // Get all assignment by proprietaire ID
    getProprietaireAssagnments(proprietaireID: string, userMatricule: string): Observable<AssignmentProprietaire[]> {
      return this.http.get<AssignmentProprietaire[]>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/affectations/${proprietaireID}/${userMatricule}`
      )
    }

    getSelectedProprietaire(contratId: string, matricule: any){
      return this.http.get<AssignmentProprietaire[]>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/libre-proprietaires/${contratId}/${matricule}`
      )
    }

  // Delete assignment proprietaire
  deleteAssignmentProprietaire(proprietaireID: string, data: any, userMatricule: any): Observable<AssignmentProprietaire> {
    return this.http.put<AssignmentProprietaire>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/supprimer/${proprietaireID}/${userMatricule}`,
      data
    );
  }
}
