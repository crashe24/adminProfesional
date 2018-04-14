import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  // vamos a quitar en el inter para eso se tiene que realizar el ctr p
  // buscamos tslint.json y buscamos el el error con ctrl f y lo ponemos en false 

  porcentajeAzul: number = 40;
  porcentajeVerde: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // cambiarValor(valor: number ) {
  //   if ( this.porcentaje >= 100 || this.porcentaje <= 0 ) {
  //     return;
  //   }
  //   this.porcentaje = this.porcentaje + valor;
  // }

  // este es el metodo para el output
  // tambien se puede hacer de la siguiente manera
  actualizarValorProgress(evento: number) {
    this.porcentajeAzul = evento;
  }
}
