import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  
  // Get list of all proprietaires from database
  getContrat(){
    return this.http.get('http://localhost:5000/api/v1/contrat');
  }

  // get specific "lieu" by his id 
  getContratById(id:any){
    return this.http.get('http://localhost:5000/api/v1/contrat/'+id);
  }


  

}
