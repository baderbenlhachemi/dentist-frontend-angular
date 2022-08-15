import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class PlanCategoryService {

  private baseUrl = 'http://localhost:8080/api/PlanCategory';
  constructor(private http: HttpClient,
              private storageService: StorageService) {

  }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
