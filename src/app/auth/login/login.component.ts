import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    dni: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  login(): void | boolean{

    const {dni, password} = this.loginForm.value; 

    if (!dni.trim() || !password.trim){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Se deben completar todos los campos',
        confirmButtonText: 'Entendido'
      });
      return false;
    }

    this.usuariosService.login(this.loginForm.value).subscribe( resp => {
      this.router.navigateByUrl('dashboard');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
