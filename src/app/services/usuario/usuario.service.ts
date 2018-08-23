import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
// import { SubirArchivoService } from '../services.index';

@Injectable()
export class UsuarioService {

      // variables para identificar que me encuentro logeado 
      usuario: Usuario;
      token: string;

  constructor(public http: HttpClient, public router: Router,
   public _subirArchivo: SubirArchivoService) { 
    console.log('Usuario del servicio listo!!!!');
    this.cargarStorage();
  }
  // centralizando el localStorage 
      guardandoUsuarioLocalStorage(id: string, token: string, usuario: Usuario) {
            localStorage.setItem('id', id);
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));

            this.usuario = usuario;
            this.token = token;
      }

  //
  // verificar si se encuentra logeado
  //
  estaLogeado() {
        return ( this.token.length > 2) ? true : false;
  }

  cargarStorage() {
        if ( localStorage.getItem('token')) {
              this.token = localStorage.getItem('token');
              // recuperar el objeto usando el JSON.parce
              this.usuario = JSON.parse( localStorage.getItem('usuario') );
        } else { 
              this.token = '';
              this.usuario = null;
        }
  }

  //
  // loginGoogle
  //
      loginGoogle(token: string) {
            const url = URL_SERVICIOS + '/login/google';
            return this.http.post(url, { token}).
            map( (resp: any) => {
                  this.guardandoUsuarioLocalStorage(resp.id, resp.token, resp.usuario );
                  return true;
            }); // como es ES6 no hace falta poner token:token
      }

  //
  // CREAR EL LOGIN
  //

  login(usuario: Usuario, recordar: boolean = false ) {
          const url = URL_SERVICIOS + '/login';
          // cuando se pone recuerdame en true 
          if ( recordar ) {
              localStorage.setItem('email', usuario.email);
          } else {
               // si esta en false el recuerdame se tiene que borrar lo del localstorage
                localStorage.removeItem('email');
          }
          return this.http.post( url, usuario )
          .map( (resp: any) => {
            this.guardandoUsuarioLocalStorage(resp.id, resp.token, resp.usuario );
            //     localStorage.setItem('id', resp.id);
            //     localStorage.setItem('token', resp.token);
            //     localStorage.setItem('usuario', JSON.stringify(resp.id));
                return true;
          });
  }

  // para poder utilizar el switalert debemos utilizar
  // el map
  // el map toma la respuesta y se la puede transformar
  crearUsuario( usuario: Usuario ) {
        const url = URL_SERVICIOS + '/usuario';
        return this.http.post( url, usuario )
        .map((respuesta: any) => {
              swal('Usuario Creado:', usuario.email, 'success');
              return respuesta.usuario;
        });
  }


  logout() {
        this.usuario = null;
        this.token = '';
        // localStorage.clear();
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'usuario' );
        this.router.navigate(['/login']);
  }

// actualizar el usuario el rol 
  actualizarUsuario(usuario: Usuario) { 
        let  url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;
        
        return this.http.put( url, usuario)
        .map( (resp: any ) => { 

            if ( usuario._id === this.usuario._id) { 
                  
                  this.guardandoUsuarioLocalStorage(resp.usuario._id, 
                   this.token, resp.usuario);

                  }

                  swal('Usuario actualizado', usuario.nombre, 'success');
                  return true;

        });

         
  }

  cambiarImagen (file: File, id: string) {
            this._subirArchivo.subirArchivo(file, 'usuarios', id)
            .then( (resp: any ) => {
                  console.log(resp);
                 this.usuario.img = resp.usuarioActualizado.img;
                  swal('Imagen actualizada', this.usuario.nombre, 'success');
                  this.guardandoUsuarioLocalStorage( id, this.token, this.usuario);
                
            })
            .catch ( (resp: any) => {
                  console.log(resp);      
            });
  }

  // funcion para cargar usuario
  // si necesitariamos transformar la data utilizamos el map
  cargarUsuarios( desde: number = 0 ) {
            const url = URL_SERVICIOS + '/usuario?desde=' + desde;
            return this.http.get(url);

  }

  buscarUsuarios ( termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
        // vamos a filtrar para que solo nos envie los usuarios para eso se tiene que hacer un map
        return this.http.get( url )
        .map( (resp: any) => {
            console.log(resp);
            return resp.usuario;
        });
  }
  // borrar usuarios 
  borrarUsuario ( usuarioABorrar: Usuario) {
        console.log('this.token :', this.token);
        const url = URL_SERVICIOS + '/usuario/' + usuarioABorrar._id + '?token=' + this.token;
        console.log('object :', url);
        return this.http.delete( url )
        .map(resp => {
            swal('Usuario borrado', 'El usuario ha sido borrado', 'success');
            return true;
        });
  }
  
 
}
