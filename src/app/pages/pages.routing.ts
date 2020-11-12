import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SemaforosComponent } from './semaforos/semaforos.component';
import { NuevoSemaforoComponent } from './semaforos/nuevo-semaforo.component';
import { EditarSemaforoComponent } from './semaforos/editar-semaforo.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', canActivate: [AuthGuard], component: DashboardComponent },
            { path: 'usuarios', canActivate: [AuthGuard], component: UsuariosComponent },
            { path: 'usuarios/nuevo', canActivate: [AuthGuard], component: NuevoUsuarioComponent },
            { path: 'semaforos', canActivate: [AuthGuard], component: SemaforosComponent },
            { path: 'semaforos/nuevo', canActivate: [AuthGuard], component: NuevoSemaforoComponent },
            { path: 'semaforos/editar/:id', canActivate: [AuthGuard], component: EditarSemaforoComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
