import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
      const formData = new FormData();
      const  xhr = new XMLHttpRequest();

      return new Promise ( (resolve, reject ) => { 
       
        formData.append('imagen', archivo, archivo.name );
        // configurar la peticion ajax
        xhr.onreadystatechange = (() => {
          console.log( xhr);
          if ( xhr.readyState === 4) {
                if ( xhr.status === 200 ) {
                 resolve( JSON.parse( xhr.response));
                
                } else {
                  console.log('fallo la subida');
                  reject ( xhr.response );
                }
          }
        });
        // http://localhost:3000/upload/usuarios/5b218731410d850f86c32949
        const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

        xhr.open('PUT', url, true);
        xhr.send ( formData ); 
      });

  }
}
