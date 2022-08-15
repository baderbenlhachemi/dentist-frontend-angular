import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PatientAuthService {
  private baseUrl = 'http://localhost:8080/api/auth/public/';

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signin', body, httpOptions);
  }

  register(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', body, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.baseUrl + 'signout', {}, httpOptions);
  }
}
