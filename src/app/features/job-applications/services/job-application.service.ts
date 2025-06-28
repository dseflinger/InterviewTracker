import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateApplication, JobApplication } from '../state/state';
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

  public add(createApp: CreateApplication): Observable<string> {
    return this.http.post<string>(this.baseurl, createApp)
  }

  public getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseurl}/${id}`)
  }
}
