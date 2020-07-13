import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  header: any;

  constructor(private http: HttpClient) {
    this.header = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
  }
  getAuthToken() {
    return this.http.post(`${environment.servers.play}token`, {}, this.header);
  }
}
