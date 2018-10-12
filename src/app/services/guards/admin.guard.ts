import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate() {
    if (  this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this._usuarioService.logout();
      // this.router.navigate(['/login']);
      console.log('bloqueado por el admin guard');
      return false;
    }
  }

  constructor( public _usuarioService: UsuarioService) {
    
  }
}
