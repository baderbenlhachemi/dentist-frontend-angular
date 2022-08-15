import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorInterventionService {
  private baseUrl = 'http://localhost:8080/api/doctor_intervention';
  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(consultation: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/save`, consultation);
  }
  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  delete(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  getByConsultation(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_by_consultation/${id}`);
  }
}
