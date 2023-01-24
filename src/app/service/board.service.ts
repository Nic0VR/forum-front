import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  url = environment.api_back + '/api/board';

  findPage(page?: number, max?: number, search?: string): Observable<Board[]> {
    let params = new HttpParams();

    if (page) {
      params= params.set('page', page);
    }
    if (max) {
      params= params.set('max', max);
    }
    if (search) {
      params=params.set('search', search);
    }
    console.log(params);
    
    return this.http.get<Board[]>(this.url+"/page",{params}).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }

  findById(id:number){
    return this.http.get<Board>(this.url+"/"+id).pipe(
      catchError((e =>{
        throw e;
      }))
    )
  }
}
