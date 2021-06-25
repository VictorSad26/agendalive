import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../model/user.model";
import {Router} from "@angular/router";


@Injectable({ providedIn: 'root' })
export class UserService {

  apiUrl = 'http://localhost:5000/user';

  constructor(
    private httpClient: HttpClient, private router: Router
  ) {}


  public postUser(user: any): Observable<User> {
    return this.httpClient.post<any>(this.apiUrl, user);
  }

}
