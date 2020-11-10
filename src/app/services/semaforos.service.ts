import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SemaforosService {
  constructor(private http: HttpClient) { }

  getSemaforo(id: string): Observable<any>{
    return this.http.get(`${base_url}/semaforos/${id}`, {
      headers: { 'x-token': localStorage.getItem('token')}
    }).pipe(
      map((resp: any) => resp.semaforo)
    );
  }

  listarSemaforos(limit = 0, desde = 0): Observable<any>{
    return this.http.get(`${base_url}/semaforos`, {
      params: {
        desde: String(desde),
        limit: String(limit)
      },
      headers: {
        'x-token': localStorage.getItem('token')
      },
    });
  }

  nuevoSemaforo(data): Observable<any>{
    return this.http.post(`${base_url}/semaforos`, data, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });
  }

  actualizarSemaforo(id, data): Observable<any>{
    return this.http.put(`${base_url}/semaforos/${id}`, data, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });
  }


}
