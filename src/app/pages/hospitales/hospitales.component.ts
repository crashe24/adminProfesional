import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  
  cargando: boolean = true;
  totalRegistros: number = 0;
  usuario: Usuario;
  constructor(public _hospitalService: HospitalService, 
              public _uploadModal: ModalUploadService) { }

  ngOnInit() {
    this.mostrarHospitales();
    // para que el modal aparesca se tiene que subcribir y para lograr eso se tiene que realizar la notificacion
    this._uploadModal.notificacion.subscribe( () => this.mostrarHospitales());
  }

  mostrarHospitales() {
      this.cargando = true;
      this._hospitalService.cargarHospitales()
      .subscribe( (resp: any) => {
          this.hospitales = resp;
          this.totalRegistros = this._hospitalService.totalHospitales;
          this.cargando = false;
      });
  }
  
  
  actualizarHospital(hospital: Hospital ) {
      this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  borrarHospital(hospital: Hospital) {
      this._hospitalService.borrarHospital(hospital)
      .subscribe( resp => {
        this.mostrarHospitales();
      });
  }

  buscarHospital(hospital: Hospital) {
    this._hospitalService.buscarHospital( hospital )
    .subscribe();
  }

  buscarHospitales( termino: string) { 
    if (termino.length <= 0) {
        this.mostrarHospitales();
        return;
    } else {
      this._hospitalService.buscarHospitales(termino)
      .subscribe( resp => {
        this.hospitales = resp;
      });
      
    }

  }

  crearHospital() {
        swal( {
            title: 'Crear Hospital',
            text: 'Ingrese el nombre de un hospital',
            content: 'input',
            icon: 'info',
            buttons: true,
            dangerMode: true
        }).then( (valor: string) => {  // es una promesa
              if (!valor || valor.length === 0) {
                return;
            }
            this._hospitalService.crearHospital(valor)
              .subscribe ( () => {
                this.mostrarHospitales();
              });
            

        }); 
 
  }
  actualizarImagenHospital(hospital: Hospital) {
      // servicio para actualizar los hospitales
      // public _uploadModal: ModalUploadService
      this._uploadModal.mostrarModal(hospital._id, 'hospitales');

  }
}
