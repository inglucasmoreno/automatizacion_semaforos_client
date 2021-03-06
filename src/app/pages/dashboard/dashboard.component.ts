import { Component, OnInit } from '@angular/core';
import { Semaforo } from '../../models/semaforo.model';
import { SemaforosService } from '../../services/semaforos.service';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public semaforos: Semaforo[];
  public cuatroFilas = true;
  public dosFilas = false;
  public tresFilas = false;
  public intermitente = '';
  public descripcion = '';
  public mostrarFiltros = false;

  constructor(private semaforosService: SemaforosService,
              private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.listarSemaforos();
    // Se espera codigo desde el topico intermitencia
    this.webSocketService.listen('intermitencia').subscribe(direccion => {
      this.listarSemaforos();
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: `Semáforo ${direccion} intermitente!`
      });
    });
  }

  listarSemaforos(): void{
    this.semaforosService.listarSemaforos(0, 0, '', this.intermitente, this.descripcion).subscribe( resp => {
      this.semaforos = resp.semaforos.filter(semaforos => semaforos.activo === true);
    });
  }

  cambiarEstado(semaforo: Semaforo): void{
    const data = {
      codigo: semaforo.codigo,
      intermitente: false
    };
    semaforo.intermitente ? data.intermitente = false : data.intermitente = true;
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas por cambiar el estado de un semáforo',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No actualizar',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.semaforosService.actualizarSemaforo(semaforo._id, data).subscribe( resp => {
          Swal.fire(
            'Completado!',
            'Estado actualizado',
            'success'
          );
          this.listarSemaforos();
        });
      }
    });
  }

  cambiarFilas(cantidad: number): void {
    cantidad === 2 ? this.dosFilas = true : this.dosFilas = false;
    cantidad === 3 ? this.tresFilas = true : this.tresFilas = false;
    cantidad === 4 ? this.cuatroFilas = true : this.cuatroFilas = false;
    this.listarSemaforos();
  }

  filtradoLista(intermitente: any): void{
    this.intermitente = intermitente;
    this.listarSemaforos();
  }

  filtradoDescripcion(descripcion: string): void{
    this.descripcion = descripcion;
    this.listarSemaforos();
  }

  visionFiltro(): void{
    this.mostrarFiltros = this.mostrarFiltros ? false : true;
  }

}
