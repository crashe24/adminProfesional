import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  // localhost:3000/hospital?desde=1
  url: string = URL_SERVICIOS;
  // token: string = '';
  usuario: Usuario;

  totalHospitales: number;

  constructor(public http: HttpClient, public _subirArchivo: SubirArchivoService,
  public _usuarioService: UsuarioService) { 
    // this.cargarStorage();
  }


  /*===========================
  CARGAR TODOS LOS HOSPITALES
  ===========================*/

  cargarHospitales () { 
      const urlBusquedaHospitales  = `${this.url}/hospital`;
       return this.http.get(urlBusquedaHospitales)
       .map( (resp: any) => {
         this.totalHospitales = resp.total;
         return resp.hospitales;

       });

  }


  /*===========================
  CREAR HOSPITAL
  ===========================*/
  crearHospital (nombre: string) {
    const urlCrearHospital = this.url + '/hospital/?token=' + this._usuarioService.token; // this.token;
    console.log(urlCrearHospital);
    return this.http.post(urlCrearHospital, {nombre})
    .map((respuesta: any) => {
      console.log(respuesta);
      swal('Hospital Creado:', nombre, 'success');
      return respuesta.hospital;
});
  }

  /*===========================
  BUSCAR HOSPITAL
  localhost:3000/hospital/5b07227207083042f2de44f6
  ===========================*/
  buscarHospital( id: any ) {
    const urlBuscarHospital = `${this.url}/hospital/${id}`;
    return this.http.get(urlBuscarHospital); 
  }

  /*
  ===========================
    BUSQUEDA POR COLECCION 
  ==========================  
  */
 buscarHospitales( termino: string) {
  const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
  // vamos a filtrar para que solo nos envie los usuarios para eso se tiene que hacer un map
  return this.http.get( url )
  .map( (resp: any) => {
      console.log(resp);
      return resp.hospital;
  });
 }

  /*===========================
  BORRAR HOSPITAL
  localhost:3000/hospital/5b05d8882fb6f5408dbb4843?token=
  ===========================*/

  borrarHospital(hospital: Hospital) {
    const urlBorrarHospital = 
    this.url + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.delete(urlBorrarHospital)
    .map(resp => {
      swal('Usuario borrado', 'El usuario ha sido borrado', 'success');
      return true;
  });

  }


    /*===========================
  ACTUALIZAR HOSPITAL
localhost:3000/hospital/5b05d8882fb6f5408dbb4843?token=
  ===========================*/
  actualizarHospital(hospital: Hospital) {
    const urlActualizarHospital = 
    this.url + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    hospital.usuario = this.usuario;
    return this.http.put(urlActualizarHospital, hospital)
    .map( (resp: any) => {

          console.log(resp);
          swal('Hospital Actualizado', 'Se actualiza correctamente', 'success');
          return resp.hospitales;
    });
  }

  /*
  CARGAR IMAGEN DEL HOSPITAL
  */ 
 cambiarImagen (file: File, id: string) {
  let  hospitalTemporal: Hospital;
  this._subirArchivo.subirArchivo(file, 'hospitales', id)
  .then( (resp: any ) => {
        console.log(resp);
          this.buscarHospital(id)
          .subscribe( (hosp: any) => hospitalTemporal = hosp);
        hospitalTemporal.img = resp.hospital.img;
        swal('Imagen actualizada', hospitalTemporal.nombre, 'success');
       
  })
  .catch ( (resp: any) => {
        console.log(resp);      
  });
}
}
