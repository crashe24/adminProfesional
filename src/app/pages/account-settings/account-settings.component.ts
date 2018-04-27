import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // inyectar el servicio para la persistencia de nuestros ajustes 

  // hacer una referencia al document
  constructor( private _settingServices: SettingsService) { }

  ngOnInit() {
    this.colocarChek();
  }

  cambiarColor(tema: string, link: any) {
    console.log(link);
    this.aplicarCheck(link);
    this._settingServices.aplicarTema(tema);
    
  }

  aplicarCheck(link: any) {
      // esto es js puro 
      const selectores: any = document.getElementsByClassName('selector');

      for ( const ref of selectores) {
            ref.classList.remove('working');

      }
      link.classList.add('working');
  }

  colocarChek() {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores) {
      if ( ref.getAttribute('data-theme') ===  this._settingServices.ajustes.tema) {
            ref.classList.add('working');
            break;
      }
    }
  }
}
