import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl = 'http://localhost:8080/api/prescription';
  private baseUrlM = 'http://localhost:8080/api/MedicationRule';


  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getByConsultation(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getByConsultationId/${id}`);
  }

  getAllMedicationRule(): Observable<any> {
    return this.http.get(this.baseUrlM);
  }

  getAllByPrescription(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlM}/prescription/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.storageService.getUser().accessToken}`,
      },
    });
  }

  create(prescription: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/save`, prescription);
  }

  createMedicationRule(MedicationRule: Object): Observable<Object> {
    return this.http.post(`${this.baseUrlM}/save`, MedicationRule);
  }

  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
