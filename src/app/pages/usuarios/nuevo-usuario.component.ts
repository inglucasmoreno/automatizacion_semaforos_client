import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {

  public usuarioForm = this.fb.group({
    dni: ['', Validators.required],
    apellido: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    repetir: ['', Validators.required],
    role: ['USER_ROLE', Validators.required],
    activo: [true, Validators.required],
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  regresar(): void{
    this.router.navigateByUrl('/dashboard/usuarios');
  }

  nuevoUsuario(): void | boolean{
    const {dni, apellido, nombre, password, repetir, email} = this.usuarioForm.value;

    // Se verifica que todos los campos esten rellenos
    if (
        dni.trim() === '' ||
        apellido.trim() === '' ||
        nombre.trim() === '' ||
        email.trim() === ''  ||
        password.trim() === '' ||
        repetir.trim() === ''
        ){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Debes completar todos los campos',
        confirmButtonText: 'Entendido'
      });
      return false;
    }

    // Se verifica que los password sean iguales
    if (password.trim() !== repetir.trim()){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Las contraseñas deben coincidir',
        confirmButtonText: 'Entendido'
      });
      return false;
    }

    this.usuariosService.nuevoUsuario(this.usuarioForm.value).subscribe( () => {
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: 'Usuario creado correctamente',
        confirmButtonText: 'Entendido'
      });
      this.router.navigateByUrl('/dashboard/usuarios');
    }, ({error}) => {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: error.msg,
        confirmButtonText: 'Entendido'
      });
    });
  }
}
