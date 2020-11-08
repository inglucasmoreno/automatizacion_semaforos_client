import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(data: LoginForm): Observable<any>{
    return this.http.post(`${base_url}/auth`, data)
                    .pipe(
                      tap( resp => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  validarToken(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/auth`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        const { dni, apellido, nombre, email, role, uid} = resp.usuario;
        this.usuario = new Usuario(dni, apellido, nombre, email, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false)) // El of permite crear un observable<boolean>(false)
    );
  }
}
