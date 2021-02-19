import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public imgURL: string = '';
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    // this.imgURL = usuarioService.usuario?.imagenURL;
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit(): void {}
}
