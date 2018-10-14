import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';

@Injectable()
export class MedicoService {

  totalMedicos: number;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
    .map( (resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
    });
  }

  buscarMedico ( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
     return this.http.get( url )
    .map( (resp: any) => {
        return resp.medico;
    });
}
    // localhost:3000/medico/5b0725fd1a12a643a373b0d0?token=
  borrarMedico (medico: Medico ) {
    const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;
    return this.http.delete(url)
      .map( (resp: any) => {
          console.log(resp);
            swal ('Medico Borrado', 'Se borro el medico correctamente', 'success');
            return resp;
      });
  }

  guardarMedico ( medico: Medico) {
    let  url = URL_SERVICIOS + '/medico';
    // validacion para crear o actualizar medico

    if ( medico._id) {
      // actualizar 
      // localhost:3000/medico/5b0725fd1a12a643a373b0d0?token=
      url +=  '/' + medico._id;
      url += '?token=' + this._usuarioService.token; 
      return this.http.put (url, medico)
      .map((resp: any) => {
        console.log( resp);
        swal('Medico Actualizado', 'Medico Listo', 'success');
        return resp.medico;
      });
    } else { 
      // crear si no existe el id por que este se crea por el mongo automaticamente
      url +=  '?token=' + this._usuarioService.token; 
      return this.http.post(url, medico._id) 
      .map( (resp: any) => {
          swal('Medico Creado', 'Nombre: ' +  resp.medico.nombre, 'success');
          return resp.medico;
      }); 
    }

  }

  cargarMEdico (id: string) { 
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map( (resp: any) => {
        return resp.medico;
        
      }); 
  }
}
