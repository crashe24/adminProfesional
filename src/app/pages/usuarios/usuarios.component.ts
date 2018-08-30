import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// esto nos quita le error marcado en la parte del borrado del usuario

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // setear los usuarios
  usuarios: Usuario[] =  [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();  

    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
        this.cargando = true;
         this._usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.usuarios = resp.usuarios;
              this.cargando = false;
         });   
  }
  cambiarDesde( valor: number ) {
    
      const desdeTemporal  = this.desde + valor;
      console.log(desdeTemporal );
      if (desdeTemporal < 0 ) {
        return;
      } 
      if (desdeTemporal >= this.totalRegistros) {
        return;
      }
      this.desde += valor;
      this.cargarUsuarios();
   
  }

buscarUsuario (termino: string) {
    if ( termino.length < 1) {
      this.cargarUsuarios();
      return;
    }
      this._usuarioService.buscarUsuarios ( termino )
    .subscribe( (usuarios: Usuario[]) => {
       this.usuarios = usuarios;
    });
    
    
}

// borrar usuario 
  borrarUsuario ( usuarioABorrar: Usuario ) {
    // validacion para que el usuario logeado no se pueda borrar 
    if (usuarioABorrar._id === this._usuarioService.usuario._id) {
      swal( 'Borrar usuario', 'No se puede borrar a si mismo', 'error' );
      return;
    }
      
      // mensaje de confirmacion 
      swal ({ 
        title: 'Esta seguro?',
        text: 'Esta a punto de borrar al usuario : ' + usuarioABorrar.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then( (borrar) => {
        console.log('');

        if ( borrar ) {
             this._usuarioService.borrarUsuario(usuarioABorrar)
             .subscribe ( resp => {
               console.log('usuario :', resp);
               this.cargarUsuarios();
             });
        }
      }); 
  }
  actualizarUsuario( usuario: Usuario ) { 
          this._usuarioService.actualizarUsuario (usuario )
          .subscribe ( resp => {
            console.log('resp :', resp);
          }
          );
  }

  mostrarModal(usuario: Usuario ) {
    // no me voy a suscribir por que simpelmente debe aparecer al modal
    this._modalUploadService.mostrarModal(usuario._id, 'usuarios');
  }
}
