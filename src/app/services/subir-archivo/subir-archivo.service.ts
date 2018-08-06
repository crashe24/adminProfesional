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
          
          if ( xhr.readyState === 4) {
                if ( xhr.status === 200 ) {
                 resolve( JSON.parse( xhr.response));
                
                } else {
                  console.log('fallo la subida');
                  reject ( xhr.response );
                }
          }
        });
        const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

        xhr.open('PUT', url, true);
        xhr.send ( formData ); 
      });

  }
}
