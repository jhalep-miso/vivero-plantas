import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from './plant';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }
}
