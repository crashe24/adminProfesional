import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalRegistros: number;
  medicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos() ;
  }

  buscarMedico( termino: string) { 
      if (termino) {
        this._medicoService.buscarMedico(termino)
        .subscribe( (resp: any) => {
              this.medicos = resp;
        });
      } else {
        this.cargarMedicos();
        return;
      }
      
  }

  crearMedico() {} 

  cargarMedicos() {
    this._medicoService.cargarMedicos()
    .subscribe( (resp) => {
        console.log('resp :', resp);
        this.medicos = resp;
        this.totalRegistros = this._medicoService.totalMedicos;
    });

  }

  actualizarMedico(medico: Medico) {

  }

  borrarMedico (medico: Medico) { 
      const medicosNueva: Medico[] = [];
      this._medicoService.borrarMedico( medico)
        .subscribe( () => {
          // this.cargarMedicos();
          this.medicos.forEach( (medicoTmp: Medico) => {
                  if (medico._id !== medicoTmp._id) {
                    console.log( 'medico diferente');
                    medicosNueva.push(medicoTmp);
                  } else {
                    console.log( 'medico encontrado');
                  }
          });
          this.medicos = [];
          this.medicos = medicosNueva;
        });
  }

}
