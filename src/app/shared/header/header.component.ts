import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  showMenu = true;
  usuario: Usuario;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuario = this.usuariosService.usuario;
  }

  cerrarSesion(): void{
    this.usuariosService.logout();
  }

  toggleMenu(): void{
    this.showMenu ? this.showMenu = false : this.showMenu = true;
  }

}
