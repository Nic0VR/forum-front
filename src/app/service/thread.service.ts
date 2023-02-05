import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountDto } from '../models/count-dto';
import { Thread } from '../models/thread';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {


  constructor(private http:HttpClient,
    private localService:LocalStorageService) {

      this.prefSubscription = localService.getPreferences().subscribe( p =>{
        this.max=p?.maxThreadFetch;

        
      })
  }

  prefSubscription:Subscription;
  url = environment.api_back+"/api/thread"
  private max:number|undefined;
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
    else if(this.max){
      params = params.set("max",this.max)
    }
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

  saveWithImage(formdata:FormData):Observable<Thread>{
    let config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': undefined
      }
  }; 
    return this.http.post<Thread>(this.url+"/files",formdata,{}).pipe(
      catchError((e =>{
        throw e;
      }))
    )
  }

  countByBoardId(boardId: number) {
    return this.http.get<CountDto>(this.url + '/' + boardId + '/count').pipe(
      catchError((e) => {
        throw e;
      })
    );
  }

  ngOnDestroy(){
    this.prefSubscription.unsubscribe();
  }
}
