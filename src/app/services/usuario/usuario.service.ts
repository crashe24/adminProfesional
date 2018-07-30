import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

      // variables para identificar que me encuentro logeado 
      usuario: Usuario;
      token: string;

  constructor(public http: HttpClient, public router: Router) { 
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
}
