import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  constructor(private http: HttpClient) { }
 
  getProprietaire(){

    const url: string = 'posts';

   return this.http.get(environment.API_TEST +'/'+url)
  }

  PostProprietaire(data:any){
    const url: string = 'posts';

    return this.http.post(environment.API_TEST +'/'+url,data);
  }
}
