import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  showMenu = true;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void{
    this.usuariosService.logout();
  }

  toggleMenu(): void{
    this.showMenu ? this.showMenu = false : this.showMenu = true;
  }

}
