import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SemaforosComponent } from './semaforos/semaforos.component';
import { NuevoSemaforoComponent } from './semaforos/nuevo-semaforo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarSemaforoComponent } from './semaforos/editar-semaforo.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsuariosComponent,
    SemaforosComponent,
    NuevoSemaforoComponent,
    EditarSemaforoComponent,
    NuevoUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
