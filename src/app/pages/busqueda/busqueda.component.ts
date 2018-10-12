import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  usuarios: Usuario[] = [];
  
  

  constructor(public activateRoute: ActivatedRoute, public http: HttpClient) { 
    this.activateRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar( termino );
    });
  }

  ngOnInit() {
    
  }

  buscar( termino ) {
      const URL = URL_SERVICIOS + '/busqueda/todo/' + termino;
      this.http.get( URL )
      .subscribe ( (resp: any ) => {
         // para la busqueda
         this.medicos = resp.medicos;
         this.hospitales = resp.hospitales;
         this.usuarios = resp.usuarios;

      });
  }
}
