import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;


  constructor( public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuarioRecibido: Usuario) {
    console.log( usuarioRecibido );
    // listo con eso nosotros podemos actualizar 
    this.usuario.nombre = usuarioRecibido.nombre;
    // para validar el usuario de google 
    if (!this.usuario.google) {
      this.usuario.email = usuarioRecibido.email;

    }

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe();



  }

  seleccionImagen( archivo: File ) {
      console.log(archivo);
      if ( !archivo ) {
        this.imagenSubir = null;
        return;
      }
      console.log(archivo);
      if (archivo.type.indexOf('image') < 0  ) {
        swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
        this.imagenSubir = null;
        return ;
      }
      this.imagenSubir = archivo;

      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL( archivo );
      reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
