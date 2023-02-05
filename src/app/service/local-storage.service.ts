import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preference } from '../models/preference';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { 
    
    let str =localStorage.getItem("userPref");
    let savedPref :Preference;
    if(str){
      savedPref= JSON.parse(str);
    }else{
      savedPref = this.defaultPref;
    }
    this.prefSubject = new BehaviorSubject<Preference|undefined>(savedPref);
    this.pref$=this.prefSubject.asObservable();

  }
  defaultPref:Preference={
    displayImages:true,maxPostFetch:20,maxThreadFetch:10
  }
  private prefSubject:BehaviorSubject<Preference|undefined>;
  private pref$: Observable<Preference|undefined>;

  saveData(key:string,value:string){
    localStorage.setItem(key,value);
  }

  getData(key:string){
    return localStorage.getItem(key);
  }

  getPreferences(){
    return this.pref$;
  }

  savePreferences(pref:Preference){
    localStorage.setItem("userPref", JSON.stringify(pref) );
    this.prefSubject.next(pref);
  }

  deletePreferences(){
    // localStorage.removeItem("userPref");
    localStorage.setItem("userPref",JSON.stringify(this.defaultPref))
    this.prefSubject.next(this.defaultPref);
  }
  
}
