import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SemaforosService } from '../../services/semaforos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-semaforo',
  templateUrl: './nuevo-semaforo.component.html',
  styles: [
  ]
})
export class NuevoSemaforoComponent implements OnInit {

  public semaforoForm = this.fb.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private semaforosService: SemaforosService) { }

  ngOnInit(): void {
  }

  nuevoSemaforo(): void | boolean{

    const { codigo, descripcion } = this.semaforoForm.value;

    // No se aceptan campos vacios
    if (!codigo.trim() || !descripcion.trim()){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Se deben completar todos los campos',
        confirmButtonText: 'Entendido'
      });
      return false;
    }

    // El codigo debe tener 3 digitos
    if (codigo.length !== 3){
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'El codigo debe tener 3 digitos',
        confirmButtonText: 'Entendido'
      });
      return false;
    }

    this.semaforosService.nuevoSemaforo(this.semaforoForm.value).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: 'Semaforo creado correctamente',
        confirmButtonText: 'Entendido'
      });
      this.router.navigateByUrl('/dashboard/semaforos');
    }, (err) => {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: err.error.msg,
        confirmButtonText: 'Entendido'
      });
    });

  }

  regresar(): void{
    this.router.navigateByUrl('/dashboard/semaforos');
  }

}
