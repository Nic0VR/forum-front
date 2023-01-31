import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountDto } from '../models/count-dto';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  url = environment.api_back + '/api/post';

  save(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }

  saveWithImage(formdata: FormData): Observable<Post> {
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': undefined,
      },
    };
    return this.http.post<Post>(this.url + '/files', formdata, {}).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }

  findPageByThreadId(threadId: number, page?: number, max?: number) {
    let params = new HttpParams();
    params = params.set('thread', threadId);
    if (page) {
      params = params.set('page', page);
    }
    if (max) {
      params = params.set('max', max);
    }

    return this.http.get<Post[]>(this.url + '/page', { params }).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }

  countByThreadId(threadId: number) {
    return this.http.get<CountDto>(this.url + '/' + threadId + '/count').pipe(
      catchError((e) => {
        throw e;
      })
    );
  }
}
