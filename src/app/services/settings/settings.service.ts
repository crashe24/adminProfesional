import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };


  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  // metodo para guardar ajustes
  guardarAjustes() { 
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  // metodo para cargar ajustes
  cargarAjustes() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse (localStorage.getItem('ajustes'));
      this.aplicarTema( this.ajustes.tema);
    } else {
      this.aplicarTema( this.ajustes.tema);
    }
  }

  aplicarTema( tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    // seteamos los valores de url y del tema 
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    // grabar los datos
    this.guardarAjustes();

  }

}


interface Ajustes {
  temaUrl: string;
  tema: string;
}
