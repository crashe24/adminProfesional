import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = ''; lo va a manejar el servicio modalUploadService
  imagenSubir: File;
  imagenTemporal: string;

  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
   
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemporal = null;

    this._modalUploadService.ocultarModal();
  }
  seleccionImagen( archivo: File ) {
    console.log(archivo);
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    console.log(archivo);
    if (archivo.type.indexOf('image') < 0  ) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return ;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemporal = reader.result;
}

subirImagen() {
  // regresa una promesa
    this._subirArchivoService.subirArchivo(this.imagenSubir,
      this._modalUploadService.tipo, this._modalUploadService.id)
      .then (resp => {
        // tengo que emitir que la imagen ya se subio 
        this._modalUploadService.notificacion.emit( resp );
        // por ultimo se debe ocultar el modal 
        this.cerrarModal();
      })
      .catch (resp => {
          console.log('Error en la carga del archivo');
      }); 
}

}
