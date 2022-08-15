import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private baseUrl = 'http://localhost:8080/api/medication';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getUser().accessToken}`,
      },
    });
  }

  create(medication: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/save`, medication);
  }

  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
