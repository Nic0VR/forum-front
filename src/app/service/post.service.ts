import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  url = environment.api_back + '/api/post';

  findPageByThreadId(threadId: number, page?: number, max?: number) {
    let params = new HttpParams();
    params = params.set('thread', threadId);
    if (page) {
      params = params.set('page', page);
    }
    if (max) {
      params = params.set('max', max);
    }

    return this.http.get<Post[]>(this.url + '/page',{params}).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }
}
