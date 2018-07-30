import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_pluggins();
// libreria para el logeo
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  correoRecordado: string;
  // variable para el logeo con el google
  auth2: any;



  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

    ngOnInit() {
     init_pluggins();
     this.googleInit();

    this.correoRecordado = localStorage.getItem('email') || ''; 
    
    if (this.correoRecordado.length > 0) {
      this.recuerdame = true;
    }
  }

  // metodo para el google 
  googleInit() {
      
      gapi.load('auth2', () => { 
        // console.log('entro hasta aqui');
        this.auth2 =   gapi.auth2.init( { 
          client_id: '909337274748-qpd8fostsf6q8opep5rtjog784jp9cmr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        
        this.attachGooglein(document.getElementById('btnGoogle'));

      });


  }

  attachGooglein( element) {
   
      this.auth2.attachClickHandler( element, {}, (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token;
        // console.log('Perfil', profile);
       
        this._usuarioService.loginGoogle(token).subscribe( respuesta => window.location.href = '#/dasboard');
        // console.log('toke: ', token);
        // this._usuarioService.loginGoogle(token).subscribe( respuesta => this.router.navigate(['/dasboard']));
        // console.log('toke: ', token);
        // llamar a nuestro servicio para autenticarnos con goolgle


      });
  }

  ingresar(forma: NgForm) {
    if ( forma.invalid) {
      return;
    }

      const usuario = new Usuario( null, forma.value.email, forma.value.password );
      
      this._usuarioService.login( usuario, forma.value.recuerdame)
      .subscribe( respuesta => this.router.navigate(['/dasboard'])
      );
    // this.router.navigate(['/dasboard']);
  }
}
