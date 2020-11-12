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
    const {dni, apellido, nombre} = this.usuarioForm.value;
    if (dni.trim() === '' || apellido.trim() === '' || nombre.trim() === ''){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Debes completar todos los campos',
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
    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: '',
        confirmButtonText: 'Entendido'
      });
    });
  }
}
