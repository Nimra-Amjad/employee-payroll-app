import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<any> {
    return this.http.get('http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
  }

  createEmployee(obj: any): Observable<any> {
    return this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee", obj)
  }

}
