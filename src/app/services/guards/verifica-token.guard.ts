import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {
  // se necesita el token y se lo obtiene del usuarioService
  constructor ( public _usuarioService: UsuarioService,
                public router: Router) {

  }
  canActivate():  Promise<boolean> | boolean {
    console.log('inicio de verifica token guard');
    const token = this._usuarioService.token;
    // pero el token esta encriptado con base 64 para esto se tiene que utilizar el payload
    // entiendase por payload el contenido del token 
    // JSON.parse() sirve para evaluar un string
    // atob es una funcion que decodifica un string encriptado en base 64
    const payload = JSON.parse ( atob( token.split('.')[1]) );
    const expirado = this.verificacionTiempoExpiracionToken( payload.err);

    if ( expirado ) {
      // aqui se saca el usuario al login
      // this.router.navigate(['./login'])
      this._usuarioService.logout();
      return false; // se va a salir inmediatamente
    } 
     console.log(payload);
    return this.verificarSiHayQueRenovarToken( payload.exp);
  }

  verificarSiHayQueRenovarToken( valorExpiacionSegundos: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
          // // traer el token al tiempo actual 
          // const  fechaExp = new Date(valorExpiacionSegundos * 1000); // se necesita la fecha en millisegundos
          // const ahora = new Date(); // esta fecha es la del navegador web si se neceista mas control
          //                           // se puede traer la fecha de la bdd esto es un poco mas seguro
          // ahora.setTime( ahora.getTime() * 4 * 60 * 60 * 1000);

          // // verifica si el token tiene mas de 4 horas para su expiracion no hay que realizar nada 
          // if ( fechaExp.getTime() > ahora.getTime()) {
          //   resolve( true );
          // } else {
          //   // queire decir que el token esta por expirar y debemos renovarlo
          //   this._usuarioService.renuevaToken()
          //   .subscribe ( () => {
          //     resolve( true );
          //   }, () => {
          //     // aqui tambien sacamos al usuario
          //     this._usuarioService.logout();
          //     reject( false ); 
          //   }
          //   );
          // }
          resolve(true);                                    
    });
  }

  verificacionTiempoExpiracionToken( valorExpiacionSegundos: number ): boolean {
    const ahora = new Date().getTime() / 1000;
    if ( valorExpiacionSegundos < ahora ) {
      return true;
    } else {
      return false; // quiere decir que no esta expirado
    }
  }
}
