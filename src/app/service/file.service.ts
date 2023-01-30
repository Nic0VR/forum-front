import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  url = environment.api_back+"/api/files/"
  public downloadFile(filename:String):Observable<Blob>{
    return this.http.get(this.url+filename,{responseType:'blob'});
  }

}
