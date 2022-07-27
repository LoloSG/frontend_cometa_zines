import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/posts/all'
  }

  getAll(): Promise<Post[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!
      })
    }

    return lastValueFrom(
      this.httpClient.get<Post[]>(this.baseUrl, httpOptions)
    );
  };

  // create(values: any): Promise<any> {
  //   return lastValueFrom(
  //     this.httpClient.post(this.baseUrl, values)
  //   );
  // };
}
