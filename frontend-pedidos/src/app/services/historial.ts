import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  // Aquí pondremos la IP de tu servidor de AWS
  private apiUrl = 'http://54.123.45.67:8080/api/historial';

  constructor(private http: HttpClient) { }

  obtenerHistorial(token: string): Observable<any> {
    // Aquí le inyectamos tu JWT para que AWS te deje pasar
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
