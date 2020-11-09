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

  listarSemaforos(): Observable<any>{
    return this.http.get(`${base_url}/semaforos`, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).pipe(
      map( (resp: any) => resp.semaforos )
    );
  }

  actualizarSemaforo(id, data): Observable<any>{
    return this.http.put(`${base_url}/semaforos/${id}`, data, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });
  }


}
