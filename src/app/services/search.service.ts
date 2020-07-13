import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  header: any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.header = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
  }
  findFalcone(reqestBody) {
    return this.http.post(`${environment.servers.play}find`, reqestBody, this.header);
  }
}
