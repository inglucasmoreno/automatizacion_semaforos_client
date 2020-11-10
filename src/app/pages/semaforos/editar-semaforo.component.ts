import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SemaforosService } from '../../services/semaforos.service';
import { Semaforo } from 'src/app/models/semaforo.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-editar-semaforo',
  templateUrl: './editar-semaforo.component.html',
  styles: [
  ]
})
export class EditarSemaforoComponent implements OnInit {

  public semaforoForm: FormGroup;
  private semaforo: Semaforo;

  constructor(private router: Router,
              private fb: FormBuilder,
              private semaforosService: SemaforosService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getSamforo(id) );
    console.log(this.semaforo);
    this.semaforoForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  getSamforo(id: string): void {
    this.semaforosService.getSemaforo(id).subscribe( semaforo => {
      this.semaforo = semaforo;
      this.semaforoForm.setValue({codigo: this.semaforo.codigo, descripcion: this.semaforo.descripcion});
    });
  }

  regresar(): void{
    this.router.navigateByUrl('/dashboard/semaforos');
  }

  actualizarSemaforo(): void{
    console.log('actualizando semaforo...');
  }

}
