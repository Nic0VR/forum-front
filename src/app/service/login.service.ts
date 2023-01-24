import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<LoginResponse>;

  url = environment.api_back + '/api/login';

  constructor(private httpClient: HttpClient) {
    let lsVal = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(
      JSON.parse(lsVal!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(this.url, { email, password }).pipe(
      map((result) => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject.next(result);
        return result;
      }),
      catchError((error) => {
        throw error.error.message;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}
