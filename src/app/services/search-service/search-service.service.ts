import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  constructor() {}

  mainSearch(filter: any) {
    return filter;
  }
}
