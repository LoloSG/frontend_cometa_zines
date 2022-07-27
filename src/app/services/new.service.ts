import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class NewService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/new'
  };

  registro(values: { name: string, surname: string, username: string, email: string, password: string }): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, values)
    );
  };

  login(values: { email: string, password: string }): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    );
  };

  getAll(): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!
      })
    };

    return lastValueFrom(
      this.httpClient.get<User[]>(this.baseUrl, httpOptions)
    );
  };

  create(values: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post(this.baseUrl, values)
    );
  };






} 