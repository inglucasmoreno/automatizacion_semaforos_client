import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Semaforo } from '../../models/semaforo.model';
import { SemaforosService } from '../../services/semaforos.service';

@Component({
  selector: 'app-semaforos',
  templateUrl: './semaforos.component.html',
  styles: [
  ]
})
export class SemaforosComponent implements OnInit {

  public semaforos: Semaforo[] = [];
  public total = 0;
  public limit = 5;
  public desde = 0;
  public hasta = 5;
  public hastaReal = 5;

  constructor(private semaforosService: SemaforosService) { }

  ngOnInit(): void {
    this.listarSemaforos();
  }

  listarSemaforos(): void{
    this.semaforosService.listarSemaforos(this.limit, this.desde).subscribe( resp => {
      this.semaforos = resp.semaforos;
      this.total = resp.total;
    });
  }

  actualizarSemaforo(semaforo, selector): void{
    const {_id, codigo, intermitente, activo} = semaforo;
    const data = {
      codigo,
      activo: false,
      intermitente: false
    };
    if (selector === 'activo'){
      data.activo = !activo;
      data.intermitente = intermitente;
    }else{
      data.activo = activo;
      data.intermitente = !intermitente;
    }
    this.semaforosService.actualizarSemaforo(_id, data).subscribe(resp => {
      this.listarSemaforos();
    }, ({error}) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.msg,
        confirmButtonText: 'Entendido'
      });
    });
  }

  actualizarDesdeHasta(selector): void {

    if (selector === 'siguiente'){ // Incrementar
      if (this.hasta < this.total){
        this.desde += this.limit;
        this.hasta += this.limit;
      }
    }else{                         // Decrementar
      this.desde -= this.limit;
      if (this.desde < 0){
        this.desde = 0;
      }else{
        this.hasta -= this.limit;
      }
    }

    this.listarSemaforos();
  }

}
