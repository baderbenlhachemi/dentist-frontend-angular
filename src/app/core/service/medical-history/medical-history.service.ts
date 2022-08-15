import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicalHistoryService {
  private baseUrl = 'http://localhost:8080/api/medical-history';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getByPatientId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${id}`);
  }

  create(patient: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/save`, patient);
  }

  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
