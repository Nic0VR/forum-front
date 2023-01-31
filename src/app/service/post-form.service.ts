import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostFormService {

  constructor() { }

  private _lastPostSource = new Subject<number>();
  lastPost$ = this._lastPostSource.asObservable();
  
  changePost(id:number){
    this._lastPostSource.next(id);
  }
}
