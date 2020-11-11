import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SemaforosService } from '../../services/semaforos.service';
import { Semaforo } from 'src/app/models/semaforo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-semaforo',
  templateUrl: './editar-semaforo.component.html',
  styles: [
  ]
})
export class EditarSemaforoComponent implements OnInit {

  public semaforoForm: FormGroup;
  public semaforo: Semaforo = { _id: '', codigo: '' };
  private id: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private semaforosService: SemaforosService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => {
      this.id = id;
      this.getSamforo(id);
    });
    this.semaforoForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      intermitente: [false, Validators.required],
      activo: [false, Validators.required]
    });
  }

  getSamforo(id: string): void {
    this.semaforosService.getSemaforo(id).subscribe( semaforo => {
      this.semaforo = semaforo;
      console.log(this.semaforo);
      this.semaforoForm.setValue({
          codigo: this.semaforo.codigo,
          descripcion: this.semaforo.descripcion,
          intermitente: this.semaforo.intermitente,
          activo: this.semaforo.activo});
    });
  }

  regresar(): void{
    this.router.navigateByUrl('/dashboard/semaforos');
  }

  actualizarSemaforo(): void{
    this.semaforosService.actualizarSemaforo(this.id, this.semaforoForm.value).subscribe(resp => {
      Swal.fire({
        title: 'Completado',
        text: 'Actualización correcta!',
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      this.router.navigateByUrl('/dashboard/semaforos');
    }, ({error}) => {
      Swal.fire({
        title: 'Información',
        text: error.msg,
        icon: 'info',
        confirmButtonText: 'Entendido'
      });
    });
  }

}
