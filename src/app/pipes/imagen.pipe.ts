import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { ignoreElements } from 'rxjs/operators';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img/';
    if ( !img) {
      return url + '/usuarios/xxx';
    }
    // si viene un https es una de google
    if (img.indexOf('https:') > -1 ) {
      return img;
    } 
    
    switch (tipo) {
      case  'usuario':  url += '/usuarios/' + img; break;
      case  'medico': url += '/medicos/' + img; break;
      case  'hospital': url += '/hospital/' + img; break;
      default: console.log('tip de imagen no existe');
      url += '/usuarios/xxx';   
    }
    return url;
  }

}
