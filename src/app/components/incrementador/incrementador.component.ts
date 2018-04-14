import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Referencia de los elementos
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() porcentaje: number = 50;
  // si queremos trabajar con otro nombre en leyenda por ejemplo nmbre lo podemos hacer 
  // de la siguiente manera   @Input('nombre') porcentaje: number = 50; con esto en el 
  // html se lo pondria [nombre] = "Progress Azul" por ejemplo 
  @Input() leyenda: string = 'leyenda';


// outputs
// sintaxis para crear un output 
// @Output() cambiaValor: EventEmitter<number> = new EventEmitter();
@Output() cambiaValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // pasamos la funcion del progress aqui
  cambiarValor(valor: number ) {
    if ( this.porcentaje >= 100 || this.porcentaje <= 0 ) {
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambiaValor.emit(this.porcentaje);
  }

  // creamos la funcion para utilizar la propiedad onModelChange
  cambio(nuevoValorEvento: number) {
       // console.log(nuevoValorEvento);
        // para prevenir q el nos muestre basura por ejm(1234433) y que siempre salga 100
       
       // let elementoHtml: number = document.getElementsByName('porcentaje')[0];

        // controlamos los valores 
        this.porcentaje = (nuevoValorEvento >= 100) ? 100 : ( nuevoValorEvento <= 0 ) ? 0 : nuevoValorEvento ;
        this.txtProgress.nativeElement.value = this.porcentaje;
        // solo necesitamos llamar nuevamente a la emision del valor
        // para que el padre coja este valor y lo ponga en la 
        // barra del progress
        
        //   elementoHtml =  this.porcentaje ;
       
        this.cambiaValor.emit(this.porcentaje);

        // Por ultimo para poner el foco 
        this.txtProgress.nativeElement.focus();
  }
}
