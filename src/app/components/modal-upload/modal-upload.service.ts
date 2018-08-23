import { Injectable, EventEmitter } from '@angular/core';
// Servicio para la carga de imagen del modal
// se importara en el service.module

@Injectable()
export class ModalUploadService {

  // poder recibir de cualquier pagina el tipo de archivo que se desea subit
  tipo: string = '';
  // poder recibir de cualquier pagina el id del medico usuario u hospital
  id: string = '';

  // controlar si esta oculto o habilitador el modal
  oculto: string = 'oculto';

  // poder notificar que ya se subio el modal
  // se va a emitir el objeto respuesta de la carga
  notificacion = new EventEmitter<any>();

  constructor() { 
    console.log('servicio modal listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal( id: string, tipo: string) {
      this.oculto = '';
      this.id = id;
      this.tipo = tipo;
  }
}
