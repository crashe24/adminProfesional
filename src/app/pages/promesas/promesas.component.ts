import { Component, OnInit } from '@angular/core';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
   

    this.contarTres().then(
      mensaje => console.log('Termino', mensaje),
     // () => console.log( 'Error' )
    )
    .catch( error => {
      console.error('Error en la promesa', error);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> { 
    
     // notificar cuando un iervalo de tiempo cumple 3 segundos
    // creamos la promesa 
    // toda promesa recibe el resolve que es llamada cuando la promesa se resuelve correctamente
    // reject cuando la promesa tiene o sale con algun error 

    return  new Promise<boolean>( (resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        console.log( contador);
        if ( 
          contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
  } );
  // aqui termina la promesa
   // return promesa;
  }
}
