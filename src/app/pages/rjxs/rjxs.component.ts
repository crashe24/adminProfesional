import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styles: []
})
export class RjxsComponent implements OnInit, OnDestroy {

  subcription: Subscription;
  constructor() {
    
  this.subcription =   this.regresaObservable().
   // se va a cambiar de lugar retry(1). // se debe evitar el uso de retry por que se debe saber cual fue el error 
    subscribe( numero => {
        console.log( 'subs', numero);
        
    }, 
    error => { 
      console.log( 'Error en el obs' , error ); 
    },
    
    () => {
      console.log('El observador termino' );
    }
    );

   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
     console.log('La pagina se va a llamar');
     this.subcription.unsubscribe();
  }
 
  // esta es una funcion que se devuelve un observable 
   
  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
            contador += 1;
            // si tenemos un cambio en la funcion sobre la repsueta se romperia el codigo 
            // y para tener la misma salida sin afectar al codigo entonces deberiamos utilizar el map 
            const salida = { 
              valor: contador
            }; 

            observer.next(salida);
            // completando el observador
            // se comenta esta porcion de codigo para ver el unsubscribe
            /*
            if ( contador === 3 ) {
                  clearInterval(contador);
                  observer.complete();
            }*/
            /*
            // para enviar un error
            if ( contador  === 2 ) {
                  // clearInterval(contador);
                  observer.error( 'Error del observer' ) ; 
            }*/

      }, 1000 );
    }).retry(1)
    .map ( (resp: any) => { // el operador map jamas se va a ejecutar si el observador no esta suscrito
          return resp.valor ;
    }).filter( (valor, index) => {
      console.log('Filter :', valor, index);
      if ( (valor % 2 ) === 1 ) {
        // valor impar
        return true;
      } else {
        // valor par
        return false;
      }
     
    }) ; // si es que esta funcion viniese de un servicio, aqui se deberia tener todos lo del observable
   
  }

}
