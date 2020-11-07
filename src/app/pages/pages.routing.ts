import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SemaforosComponent } from './semaforos/semaforos.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', canActivate: [AuthGuard], component: DashboardComponent },
            { path: 'usuarios', canActivate: [AuthGuard], component: UsuariosComponent },
            { path: 'semaforos', canActivate: [AuthGuard], component: SemaforosComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
