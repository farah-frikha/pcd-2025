import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl + 'api/login';  // pour login

  constructor(private httpClient: HttpClient) { }

  authenticate(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.apiUrl, userData, { headers }).pipe(
      tap(response => {
        if (response.success) {
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    const url = environment.apiUrl + 'api/register';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(url, userData, { headers });
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  logOut(): void {
    sessionStorage.removeItem('user');
  }
}
