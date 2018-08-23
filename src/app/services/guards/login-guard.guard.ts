import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  // cuando se bloquee por el guard se tiene que redirigir a una pagina del login 
  constructor(public _usuarioServicio: UsuarioService,
              public router: Router) {
    
  }
  canActivate(): boolean {
    console.log( 'Paso por el login Guard' );
    if ( this._usuarioServicio.estaLogeado() ) {
       // console.log('paso el guard');
        return true;
    } else {
       console.log( ' Bloqueado por el guard' );
      this.router.navigate(['/login']);
      return false;
    }
   
  }
}
