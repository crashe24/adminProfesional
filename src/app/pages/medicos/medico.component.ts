import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { UsuarioService, MedicoService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('',  '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _usuarioService: UsuarioService,
    public _medicoService: MedicoService,
    public _modalUpload: ModalUploadService,
    public router: Router, 
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe( params => { // el params devuelve un observable
          const id = params ['id'];   // el nombre es el que pusimos como parametro de entrada en el backend 
          console.log(id);
          if ( id !== 'nuevo') {
                this.cargarMedico( id);
          } 
    }); 
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {
      this.hospitales = resp;

    });
    this._modalUpload.notificacion.subscribe( (resp: any) => {
          // respuesta de una data actualizada
          this.medico.img = resp.medico.img;
    });
  }
 
  guardarMedico(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);

    if (!forma.valid) {
      return;
    }
    this.medico.usuario = this._usuarioService.usuario._id;
    this._medicoService.guardarMedico( this.medico )
    .subscribe ( (medico: any ) => {

      this.medico._id = medico._id;
      this.router.navigate (['/medico', medico._id]);
    });
  }

  cambioHospital( id: string ) { 
      this._hospitalService.buscarHospital(id)
      .subscribe ( (resp: any) => {
        this.hospital = resp.hospital;
        console.log(resp.hospital);
      });
  }

  cargarMedico ( id: string ) { 
    this._medicoService.cargarMEdico(id)
      .subscribe ( medico => { 
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  cambiarFoto() {
      this._modalUpload.mostrarModal( this.medico._id, 'medicos');
  }
}
