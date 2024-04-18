import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegionService {
  private apiUrl = 'https://api.first.org/data/v1/countries';

  constructor(private http: HttpClient) { }

  getRegion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
