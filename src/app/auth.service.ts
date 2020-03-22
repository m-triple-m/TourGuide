import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
url="http://localhost:3000/user"
  constructor(private http: HttpClient ) { }

  getUser(username) :Observable<any>
  {
   return this.http.get(this.url+`/getbyusername/${username}`)

  }
}
