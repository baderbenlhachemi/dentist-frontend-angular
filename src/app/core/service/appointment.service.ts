import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointment';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPendingAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`);
  }

  getAcceptedAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/accepted`);
  }

  getCompletedAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/completed`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getByPatient(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/get_by_patient/${id}`);
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
