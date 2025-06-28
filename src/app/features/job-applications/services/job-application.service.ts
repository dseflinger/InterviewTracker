import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplication } from '../state/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private baseurl = "https://localhost:7016/api/JobApplications";
  constructor(private http: HttpClient) { }

  public getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.baseurl);
  }
}
