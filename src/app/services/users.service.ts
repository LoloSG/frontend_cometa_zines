import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient

  ) {
    this.baseUrl = 'http://localhost:3000/api/users'
  }

  getByUser(): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!
      })
    }

    return lastValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/:user`, httpOptions)
    );
  };

  getAll(): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!
      })
    };

    return lastValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/all`, httpOptions)
    );
  };


  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': <any>localStorage.getItem('token')
      })
    }
  }

  getById(): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!
      })
    };

    return lastValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/user/iduser`, this.createHeaders())
    );
  };

  // tokenDecode() {
  //   const token = localStorage.getItem('token');
  //   const decode = jwt_decode(token)
  //   const id = decode['user_id']
  //   return id;
  // }
}
