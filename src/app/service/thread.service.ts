import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Thread } from '../models/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http:HttpClient) { }

  url = environment.api_back+"/api/thread"
  findById(id:number):Observable<Thread>{
    return this.http.get<Thread>(this.url+"/"+id).pipe(
      catchError((e =>{
        throw e;
      }))
    )
  }

  findPageByBoardId(boardId:number,page?:number,max?:number,search?:string):Observable<Thread[]>{
    let params = new HttpParams();
    params = params.set("board",boardId)
    if(max){ params = params.set("max",max)}
    if(page){params = params.set("page",page)}
    if(search){params = params.set("search",search)}
    return this.http.get<Thread[]>(this.url+"/page",{params}).pipe(
      catchError((e =>{
        throw e;
      }))
    )
  }

  save(thread:Thread){
    return this.http.post<Thread>(this.url,thread).pipe( 
      catchError((e =>{
      throw e;
    })))
  }
}
